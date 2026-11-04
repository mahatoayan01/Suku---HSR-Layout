import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  DollarSign,
  Download,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Mail,
  CreditCard,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RESTAURANT } from '../../config/restaurant';

export default function OwnerDashboardPage() {
  const { owner, isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'payments', 'messages'
  const [stats, setStats] = useState({
    todayOrders: 0,
    todayRevenue: 0,
    pendingOrders: 0,
    totalOrders: 0,
    totalRevenue: 0,
    unreadMessages: 0
  });

  // Orders State
  const [orders, setOrders] = useState([]);
  const [orderFilterStatus, setOrderFilterStatus] = useState('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderDateFrom, setOrderDateFrom] = useState('');
  const [orderDateTo, setOrderDateTo] = useState('');
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Payments State
  const [payments, setPayments] = useState([]);
  const [paymentTotals, setPaymentTotals] = useState({ collected: 0, pending: 0 });
  const [paymentFilterStatus, setPaymentFilterStatus] = useState('All');
  const [paymentsLoading, setPaymentsLoading] = useState(false);

  // Messages State
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Status update toast
  const [toastMessage, setToastMessage] = useState(null);

  // Protection check
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/owner/login', { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Load KPI Stats
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/owner/stats', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  // Load Orders
  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      let url = `/api/owner/orders?status=${orderFilterStatus}`;
      if (orderSearch.trim()) url += `&search=${encodeURIComponent(orderSearch.trim())}`;
      if (orderDateFrom) url += `&dateFrom=${orderDateFrom}`;
      if (orderDateTo) url += `&dateTo=${orderDateTo}`;

      const res = await fetch(url, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Load Payments
  const fetchPayments = async () => {
    setPaymentsLoading(true);
    try {
      let url = `/api/owner/payments?status=${paymentFilterStatus}`;
      const res = await fetch(url, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setPayments(data.payments || []);
        setPaymentTotals(data.totals || { collected: 0, pending: 0 });
      }
    } catch (err) {
      console.error('Failed to fetch payments:', err);
    } finally {
      setPaymentsLoading(false);
    }
  };

  // Load Messages
  const fetchMessages = async () => {
    setMessagesLoading(true);
    try {
      const res = await fetch('/api/owner/messages', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
      fetchOrders();
      fetchPayments();
      fetchMessages();
    }
  }, [isAuthenticated, orderFilterStatus, paymentFilterStatus]);

  // Update Order Status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/owner/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        setToastMessage(`Order ${orderId} marked as ${newStatus}.`);
        setTimeout(() => setToastMessage(null), 3000);
        fetchStats();
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  // Mark message as read
  const handleMarkMessageRead = async (id) => {
    try {
      await fetch(`/api/owner/messages/${id}/read`, {
        method: 'PATCH',
        credentials: 'include'
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: 1 } : m))
      );
      fetchStats();
    } catch (err) {
      console.error('Mark read failed:', err);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/owner/login');
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="pt-32 pb-20 bg-ink min-h-screen text-paper flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-vermilion border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-ink-muted">Verifying owner credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-ink min-h-screen text-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ink-border mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-vermilion/20 text-vermilion text-xs font-bold uppercase tracking-wider">
                Owner Portal
              </span>
              <span className="text-xs text-ink-muted">
                Logged in as <strong className="text-paper">{owner?.email}</strong>
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-1">
              Suku Operations Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchStats();
                fetchOrders();
                fetchPayments();
                fetchMessages();
              }}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-ink-card border border-ink-border hover:border-gold/50 text-paper transition-all"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4 text-gold" />
            </button>

            <button
              onClick={handleLogout}
              className="min-h-[44px] px-4 py-2.5 bg-ink-card hover:bg-vermilion/20 border border-ink-border hover:border-vermilion/50 text-paper rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4 text-vermilion" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Toast alert */}
        {toastMessage && (
          <div className="mb-6 p-4 rounded-xl bg-green-950/60 border border-green-800 text-green-200 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          
          <div className="p-5 rounded-2xl bg-ink-card border border-ink-border">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Today's Orders</span>
              <ShoppingBag className="w-4 h-4 text-gold" />
            </div>
            <p className="font-serif text-3xl font-bold text-paper">
              {stats.todayOrders}
            </p>
            <p className="text-[11px] text-ink-muted mt-1">All dine-in &amp; delivery</p>
          </div>

          <div className="p-5 rounded-2xl bg-ink-card border border-ink-border">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Today's Revenue</span>
              <DollarSign className="w-4 h-4 text-green-400" />
            </div>
            <p className="font-serif text-3xl font-bold text-paper">
              ₹{stats.todayRevenue.toFixed(2)}
            </p>
            <p className="text-[11px] text-ink-muted mt-1">Gross sales today</p>
          </div>

          <div className="p-5 rounded-2xl bg-ink-card border border-ink-border">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Pending</span>
              <Clock className="w-4 h-4 text-vermilion" />
            </div>
            <p className="font-serif text-3xl font-bold text-vermilion">
              {stats.pendingOrders}
            </p>
            <p className="text-[11px] text-ink-muted mt-1">Requires kitchen prep</p>
          </div>

          <div className="p-5 rounded-2xl bg-ink-card border border-ink-border">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Sales</span>
              <TrendingUp className="w-4 h-4 text-gold" />
            </div>
            <p className="font-serif text-3xl font-bold text-paper">
              ₹{stats.totalRevenue.toFixed(2)}
            </p>
            <p className="text-[11px] text-ink-muted mt-1">{stats.totalOrders} total completed orders</p>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-ink-border mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`min-h-[44px] px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-vermilion text-vermilion'
                : 'border-transparent text-ink-muted hover:text-paper'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Online Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`min-h-[44px] px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'payments'
                ? 'border-vermilion text-vermilion'
                : 'border-transparent text-ink-muted hover:text-paper'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payments History</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`min-h-[44px] px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'messages'
                ? 'border-vermilion text-vermilion'
                : 'border-transparent text-ink-muted hover:text-paper'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Inquiries &amp; Table Bookings ({messages.length})</span>
          </button>
        </div>

        {/* TAB 1: ONLINE ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Filter and CSV Toolbar */}
            <div className="bg-ink-card p-4 rounded-2xl border border-ink-border flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  type="text"
                  placeholder="Search ID, name, phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchOrders()}
                  className="w-full min-h-[40px] bg-ink-surface border border-ink-border rounded-xl pl-9 pr-3 text-xs text-paper placeholder-ink-muted focus:outline-none focus:border-gold"
                />
              </div>

              {/* Status Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
                {['All', 'New', 'Preparing', 'Ready', 'Delivered', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilterStatus(st)}
                    className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                      orderFilterStatus === st
                        ? 'bg-vermilion text-white'
                        : 'bg-ink-surface border border-ink-border text-paper/70 hover:text-paper'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* CSV Export Button */}
              <a
                href="/api/owner/export/orders.csv"
                download
                className="w-full md:w-auto min-h-[40px] px-4 py-2 bg-ink-surface hover:bg-ink-border/50 border border-ink-border text-paper rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                <Download className="w-4 h-4 text-gold" />
                <span>Export Orders CSV</span>
              </a>
            </div>

            {/* Orders Table */}
            <div className="bg-ink-card rounded-2xl border border-ink-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-ink-surface border-b border-ink-border text-gold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Order ID</th>
                      <th className="py-3.5 px-4 font-semibold">Date &amp; Time</th>
                      <th className="py-3.5 px-4 font-semibold">Customer</th>
                      <th className="py-3.5 px-4 font-semibold">Items</th>
                      <th className="py-3.5 px-4 font-semibold">Type</th>
                      <th className="py-3.5 px-4 font-semibold">Total</th>
                      <th className="py-3.5 px-4 font-semibold">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-border/60">
                    {ordersLoading ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-ink-muted">
                          Loading orders...
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-ink-muted">
                          No orders match the current filter criteria.
                        </td>
                      </tr>
                    ) : (
                      orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-ink-surface/40 transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-paper">
                            {ord.id}
                          </td>
                          <td className="py-4 px-4 text-ink-muted">
                            {new Date(ord.created_at).toLocaleString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-paper">{ord.customer_name}</p>
                            <p className="text-[11px] text-ink-muted">{ord.customer_phone}</p>
                            {ord.delivery_address && (
                              <p className="text-[10px] text-ink-muted truncate max-w-xs" title={ord.delivery_address}>
                                📍 {ord.delivery_address}
                              </p>
                            )}
                          </td>
                          <td className="py-4 px-4 max-w-xs">
                            <p className="font-medium text-paper">
                              {(ord.items || []).map((it) => `${it.quantity}x ${it.item_name}`).join(', ') || 'Item details'}
                            </p>
                            {ord.special_instructions && (
                              <p className="text-[10px] text-gold italic mt-0.5">
                                Note: {ord.special_instructions}
                              </p>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-ink-surface border border-ink-border text-paper">
                              {ord.order_type}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-bold text-gold text-sm">₹{ord.total_amount.toFixed(2)}</p>
                            <p className="text-[10px] text-ink-muted">{ord.payment_method}</p>
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                              className={`min-h-[34px] px-2.5 py-1 text-xs font-semibold rounded-lg bg-ink-surface border focus:outline-none cursor-pointer ${
                                ord.status === 'New'
                                  ? 'border-blue-500 text-blue-400'
                                  : ord.status === 'Preparing'
                                  ? 'border-amber-500 text-amber-400'
                                  : ord.status === 'Ready'
                                  ? 'border-purple-500 text-purple-400'
                                  : ord.status === 'Delivered'
                                  ? 'border-green-500 text-green-400'
                                  : 'border-red-500 text-red-400'
                              }`}
                            >
                              <option value="New" className="bg-ink text-paper">New</option>
                              <option value="Preparing" className="bg-ink text-paper">Preparing</option>
                              <option value="Ready" className="bg-ink text-paper">Ready</option>
                              <option value="Delivered" className="bg-ink text-paper">Delivered</option>
                              <option value="Cancelled" className="bg-ink text-paper">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            
            {/* Summary Banner & CSV */}
            <div className="bg-ink-card p-6 rounded-2xl border border-ink-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-ink-muted uppercase tracking-wider">Total Collected</p>
                  <p className="font-serif text-2xl font-bold text-green-400">
                    ₹{paymentTotals.collected.toFixed(2)}
                  </p>
                </div>
                <div className="h-8 w-px bg-ink-border" />
                <div>
                  <p className="text-xs text-ink-muted uppercase tracking-wider">Pending Settlement</p>
                  <p className="font-serif text-2xl font-bold text-amber-400">
                    ₹{paymentTotals.pending.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={paymentFilterStatus}
                  onChange={(e) => setPaymentFilterStatus(e.target.value)}
                  className="min-h-[40px] px-3 py-2 bg-ink-surface border border-ink-border rounded-xl text-xs text-paper focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Success">Success Only</option>
                  <option value="Pending">Pending Only</option>
                </select>

                <a
                  href="/api/owner/export/payments.csv"
                  download
                  className="min-h-[40px] px-4 py-2 bg-ink-surface hover:bg-ink-border/50 border border-ink-border text-paper rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-gold" />
                  <span>Export CSV</span>
                </a>
              </div>
            </div>

            {/* Payments Table */}
            <div className="bg-ink-card rounded-2xl border border-ink-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-ink-surface border-b border-ink-border text-gold uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Payment ID</th>
                      <th className="py-3.5 px-4 font-semibold">Order ID</th>
                      <th className="py-3.5 px-4 font-semibold">Customer</th>
                      <th className="py-3.5 px-4 font-semibold">Method</th>
                      <th className="py-3.5 px-4 font-semibold">Amount</th>
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      <th className="py-3.5 px-4 font-semibold">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-border/60">
                    {paymentsLoading ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-ink-muted">
                          Loading payments...
                        </td>
                      </tr>
                    ) : payments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-ink-muted">
                          No payments recorded yet.
                        </td>
                      </tr>
                    ) : (
                      payments.map((p) => (
                        <tr key={p.id} className="hover:bg-ink-surface/40 transition-colors">
                          <td className="py-4 px-4 font-mono font-medium text-paper">
                            {p.id}
                          </td>
                          <td className="py-4 px-4 font-mono text-gold">
                            {p.order_id}
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-paper">{p.customer_name}</p>
                            <p className="text-[11px] text-ink-muted">{p.customer_phone}</p>
                          </td>
                          <td className="py-4 px-4 text-paper font-medium">
                            {p.method}
                          </td>
                          <td className="py-4 px-4 font-bold text-sm text-paper">
                            ₹{p.amount.toFixed(2)}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                p.status === 'Success'
                                  ? 'bg-green-950 text-green-300 border border-green-800'
                                  : 'bg-amber-950 text-amber-300 border border-amber-800'
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-ink-muted">
                            {new Date(p.created_at).toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-paper mb-2">
              Patron Inquiries &amp; Table Reservation Requests
            </h2>

            {messagesLoading ? (
              <div className="p-8 text-center text-ink-muted">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="p-12 text-center bg-ink-card rounded-2xl border border-ink-border text-ink-muted">
                No customer inquiries received yet.
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      m.is_read
                        ? 'bg-ink-card/60 border-ink-border text-paper/80'
                        : 'bg-ink-card border-gold/40 text-paper shadow-md'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-serif text-lg font-bold text-paper">
                          {m.name}
                        </h4>
                        {!m.is_read && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-vermilion text-white uppercase tracking-wider">
                            New
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-ink-muted">
                        {new Date(m.created_at).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-paper/90 leading-relaxed mb-4">
                      "{m.message}"
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-ink-border/50 text-xs">
                      <div className="flex items-center gap-4 text-ink-muted">
                        <a href={`tel:${m.phone}`} className="hover:text-gold flex items-center gap-1 font-semibold">
                          📞 {m.phone}
                        </a>
                        {m.email && (
                          <a href={`mailto:${m.email}`} className="hover:text-gold">
                            ✉️ {m.email}
                          </a>
                        )}
                      </div>

                      {!m.is_read && (
                        <button
                          onClick={() => handleMarkMessageRead(m.id)}
                          className="px-3 py-1 bg-ink-surface hover:bg-ink-border border border-ink-border text-gold rounded-lg text-xs font-semibold"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
