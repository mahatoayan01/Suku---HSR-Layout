import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/db.js';
import { authenticateOwner } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'suku_secure_jwt_secret_dev_key_2026';

// -------------------------------------------------------------
// PUBLIC OWNER AUTH ROUTE
// -------------------------------------------------------------

// POST /api/owner/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = db.prepare('SELECT * FROM owner_users WHERE email = ?').get(email.trim().toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'owner' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set HTTP-only Cookie
    res.cookie('suku_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({
      success: true,
      message: 'Login successful.',
      user: { id: user.id, email: user.email },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Authentication failed.' });
  }
});

// POST /api/owner/logout
router.post('/logout', (req, res) => {
  res.clearCookie('suku_token');
  res.json({ success: true, message: 'Logged out successfully.' });
});

// GET /api/owner/me - Session probe
router.get('/me', (req, res) => {
  let token = req.cookies?.suku_token;
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  if (!token) {
    return res.json({ authenticated: false, user: null });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ authenticated: true, user: decoded });
  } catch (err) {
    res.json({ authenticated: false, user: null });
  }
});

// -------------------------------------------------------------
// PROTECTED ROUTES (Requires authenticateOwner)
// -------------------------------------------------------------
router.use(authenticateOwner);

// GET /api/owner/stats - Executive dashboard KPI cards
router.get('/stats', (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    // Today's orders & revenue
    const todayStats = db.prepare(`
      SELECT 
        COUNT(*) as today_orders,
        COALESCE(SUM(total_amount), 0) as today_revenue
      FROM orders
      WHERE DATE(created_at) = DATE(?)
    `).get(today);

    // Pending orders (New or Preparing)
    const pendingStats = db.prepare(`
      SELECT COUNT(*) as pending_orders
      FROM orders
      WHERE status IN ('New', 'Preparing')
    `).get();

    // All-time totals
    const allTimeStats = db.prepare(`
      SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(total_amount), 0) as total_revenue
      FROM orders
      WHERE status != 'Cancelled'
    `).get();

    // Total unread messages
    const unreadMessages = db.prepare(`
      SELECT COUNT(*) as count FROM contact_messages WHERE is_read = 0
    `).get().count;

    res.json({
      success: true,
      stats: {
        todayOrders: todayStats.today_orders,
        todayRevenue: Math.round(todayStats.today_revenue * 100) / 100,
        pendingOrders: pendingStats.pending_orders,
        totalOrders: allTimeStats.total_orders,
        totalRevenue: Math.round(allTimeStats.total_revenue * 100) / 100,
        unreadMessages
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard metrics.' });
  }
});

// GET /api/owner/orders - Filterable order list
router.get('/orders', (req, res) => {
  try {
    const { status, dateFrom, dateTo, search, limit = 50, offset = 0 } = req.query;

    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (status && status !== 'All') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (dateFrom) {
      query += ' AND DATE(created_at) >= DATE(?)';
      params.push(dateFrom);
    }

    if (dateTo) {
      query += ' AND DATE(created_at) <= DATE(?)';
      params.push(dateTo);
    }

    if (search && search.trim()) {
      const q = `%${search.trim()}%`;
      query += ' AND (id LIKE ? OR customer_name LIKE ? OR customer_phone LIKE ?)';
      params.push(q, q, q);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit, 10), parseInt(offset, 10));

    const orders = db.prepare(query).all(...params);

    // Fetch items for each order
    const getItemsStmt = db.prepare('SELECT * FROM order_items WHERE order_id = ?');
    const enrichedOrders = orders.map((o) => ({
      ...o,
      items: getItemsStmt.all(o.id)
    }));

    res.json({ success: true, count: enrichedOrders.length, orders: enrichedOrders });
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});

// PATCH /api/owner/orders/:id/status - Update order status
router.patch('/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['New', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    // If order delivered, update payment to Paid if it was pending
    if (status === 'Delivered') {
      db.prepare(`
        UPDATE orders 
        SET status = ?, payment_status = 'Paid' 
        WHERE id = ?
      `).run(status, order.id);

      db.prepare(`
        UPDATE payments 
        SET status = 'Success' 
        WHERE order_id = ?
      `).run(order.id);
    } else {
      db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, order.id);
    }

    res.json({ success: true, message: `Order status updated to ${status}.`, orderId: order.id, status });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ error: 'Failed to update order status.' });
  }
});

// GET /api/owner/payments - Payments history & reconciliation
router.get('/payments', (req, res) => {
  try {
    const { status, dateFrom, dateTo } = req.query;

    let query = `
      SELECT p.*, o.customer_name, o.customer_phone, o.order_type, o.status as order_status
      FROM payments p
      JOIN orders o ON p.order_id = o.id
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== 'All') {
      query += ' AND p.status = ?';
      params.push(status);
    }

    if (dateFrom) {
      query += ' AND DATE(p.created_at) >= DATE(?)';
      params.push(dateFrom);
    }

    if (dateTo) {
      query += ' AND DATE(p.created_at) <= DATE(?)';
      params.push(dateTo);
    }

    query += ' ORDER BY p.created_at DESC';

    const payments = db.prepare(query).all(...params);

    // Compute totals
    let totalCollected = 0;
    let totalPending = 0;
    for (const p of payments) {
      if (p.status === 'Success') totalCollected += p.amount;
      else if (p.status === 'Pending') totalPending += p.amount;
    }

    res.json({
      success: true,
      count: payments.length,
      totals: {
        collected: Math.round(totalCollected * 100) / 100,
        pending: Math.round(totalPending * 100) / 100
      },
      payments
    });
  } catch (error) {
    console.error('Fetch payments error:', error);
    res.status(500).json({ error: 'Failed to fetch payments.' });
  }
});

// GET /api/owner/messages - Contact messages list
router.get('/messages', (req, res) => {
  try {
    const messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
    res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// PATCH /api/owner/messages/:id/read - Mark message read
router.patch('/messages/:id/read', (req, res) => {
  try {
    db.prepare('UPDATE contact_messages SET is_read = 1 WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message.' });
  }
});

// GET /api/owner/export/orders.csv - CSV Download
router.get('/export/orders.csv', (req, res) => {
  try {
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    const getItems = db.prepare('SELECT item_name, quantity FROM order_items WHERE order_id = ?');

    let csv = 'Order ID,Date,Customer,Phone,Type,Items,Subtotal,Delivery Fee,Tax,Total,Status,Payment Method,Payment Status,Delivery Address\n';

    for (const o of orders) {
      const items = getItems.all(o.id).map(i => `${i.quantity}x ${i.item_name}`).join(' | ');
      const cleanAddress = (o.delivery_address || '').replace(/"/g, '""');
      const cleanItems = items.replace(/"/g, '""');
      csv += `"${o.id}","${o.created_at}","${o.customer_name}","${o.customer_phone}","${o.order_type}","${cleanItems}",${o.subtotal},${o.delivery_fee},${o.tax},${o.total_amount},"${o.status}","${o.payment_method}","${o.payment_status}","${cleanAddress}"\n`;
    }

    res.header('Content-Type', 'text/csv');
    res.attachment(`suku-orders-${new Date().toISOString().slice(0, 10)}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Export orders CSV error:', error);
    res.status(500).json({ error: 'Failed to generate CSV.' });
  }
});

// GET /api/owner/export/payments.csv - CSV Download
router.get('/export/payments.csv', (req, res) => {
  try {
    const payments = db.prepare(`
      SELECT p.*, o.customer_name, o.customer_phone
      FROM payments p
      JOIN orders o ON p.order_id = o.id
      ORDER BY p.created_at DESC
    `).all();

    let csv = 'Payment ID,Order ID,Customer,Phone,Method,Amount,Status,Ref,Date\n';

    for (const p of payments) {
      csv += `"${p.id}","${p.order_id}","${p.customer_name}","${p.customer_phone}","${p.method}",${p.amount},"${p.status}","${p.transaction_ref || ''}","${p.created_at}"\n`;
    }

    res.header('Content-Type', 'text/csv');
    res.attachment(`suku-payments-${new Date().toISOString().slice(0, 10)}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Export payments CSV error:', error);
    res.status(500).json({ error: 'Failed to generate CSV.' });
  }
});

export default router;
