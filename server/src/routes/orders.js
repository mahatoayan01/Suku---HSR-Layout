import express from 'express';
import db from '../db/db.js';

const router = express.Router();

// Helper to generate readable Order ID: ORD-YYYYMMDD-XXXX
function generateOrderId() {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${dateStr}-${rand}`;
}

// Helper to generate Payment ID
function generatePaymentId() {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `PAY-${Date.now().toString().slice(-6)}-${rand}`;
}

// POST /api/orders - Create a new order
router.post('/', (req, res) => {
  try {
    const {
      customer_name,
      customer_phone,
      order_type,
      delivery_address,
      special_instructions,
      payment_method,
      items
    } = req.body;

    // Validation
    if (!customer_name || !customer_name.trim()) {
      return res.status(400).json({ error: 'Customer name is required.' });
    }
    if (!customer_phone || !customer_phone.trim()) {
      return res.status(400).json({ error: 'Phone number is required.' });
    }
    if (!order_type || !['delivery', 'pickup'].includes(order_type)) {
      return res.status(400).json({ error: 'Invalid order type. Must be delivery or pickup.' });
    }
    if (order_type === 'delivery' && (!delivery_address || !delivery_address.trim())) {
      return res.status(400).json({ error: 'Delivery address is required for home delivery.' });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item.' });
    }

    // Calculate subtotal from items
    let subtotal = 0;
    const validatedItems = [];

    for (const it of items) {
      const qty = parseInt(it.quantity, 10);
      const prc = parseFloat(it.price);
      if (isNaN(qty) || qty <= 0 || isNaN(prc) || prc < 0) {
        return res.status(400).json({ error: `Invalid item quantity or price for ${it.item_name || 'item'}.` });
      }
      const itemSubtotal = Math.round(qty * prc * 100) / 100;
      subtotal += itemSubtotal;
      validatedItems.push({
        menu_item_id: it.menu_item_id || null,
        item_name: it.item_name || 'Dish Item',
        price: prc,
        quantity: qty,
        is_veg: it.is_veg ? 1 : 0,
        subtotal: itemSubtotal
      });
    }

    const delivery_fee = order_type === 'delivery' ? 40 : 0;
    const tax = Math.round(subtotal * 0.05 * 100) / 100; // 5% GST
    const total_amount = Math.round((subtotal + delivery_fee + tax) * 100) / 100;

    const orderId = generateOrderId();
    const paymentId = generatePaymentId();

    const chosenPaymentMethod = payment_method || (order_type === 'delivery' ? 'Pay on delivery' : 'Pay at restaurant');
    const paymentStatus = (chosenPaymentMethod === 'Razorpay' && req.body.razorpay_payment_id) ? 'Paid' : 'Pending';

    // Execute atomic transaction in SQLite
    const createOrderTx = db.transaction(() => {
      // 1. Insert order
      db.prepare(`
        INSERT INTO orders (
          id, customer_name, customer_phone, order_type, delivery_address,
          special_instructions, subtotal, delivery_fee, tax, total_amount,
          status, payment_method, payment_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', ?, ?)
      `).run(
        orderId,
        customer_name.trim(),
        customer_phone.trim(),
        order_type,
        order_type === 'delivery' ? delivery_address.trim() : null,
        special_instructions ? special_instructions.trim() : null,
        subtotal,
        delivery_fee,
        tax,
        total_amount,
        chosenPaymentMethod,
        paymentStatus
      );

      // 2. Insert items
      const insertItemStmt = db.prepare(`
        INSERT INTO order_items (order_id, menu_item_id, item_name, price, quantity, is_veg, subtotal)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      for (const it of validatedItems) {
        insertItemStmt.run(orderId, it.menu_item_id, it.item_name, it.price, it.quantity, it.is_veg, it.subtotal);
      }

      // 3. Insert payment record
      db.prepare(`
        INSERT INTO payments (id, order_id, method, amount, status, transaction_ref)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        paymentId,
        orderId,
        chosenPaymentMethod,
        total_amount,
        paymentStatus === 'Paid' ? 'Success' : 'Pending',
        req.body.razorpay_payment_id || `REF-${orderId.slice(-4)}`
      );
    });

    createOrderTx();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      orderId,
      order: {
        id: orderId,
        customer_name,
        customer_phone,
        order_type,
        total_amount,
        status: 'New',
        payment_method: chosenPaymentMethod,
        payment_status: paymentStatus
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to place order. Please try again.' });
  }
});

// GET /api/orders/:id - Retrieve order confirmation details
router.get('/:id', (req, res) => {
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
    const payment = db.prepare('SELECT * FROM payments WHERE order_id = ? ORDER BY created_at DESC LIMIT 1').get(order.id);

    res.json({
      success: true,
      order: {
        ...order,
        items,
        payment
      }
    });
  } catch (error) {
    console.error('Fetch order error:', error);
    res.status(500).json({ error: 'Failed to retrieve order details.' });
  }
});

export default router;
