import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ShieldCheck, MapPin, Phone, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT } from '../config/restaurant';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'pickup'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    instructions: '',
    paymentMethod: 'Pay on delivery'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deliveryFee = orderType === 'delivery' ? 40 : 0;
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const total = Math.round((subtotal + deliveryFee + tax) * 100) / 100;

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 bg-ink min-h-screen text-paper flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-ink-card border border-ink-border">
          <div className="w-16 h-16 rounded-full bg-ink-surface border border-ink-border flex items-center justify-center text-gold mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 opacity-50" />
          </div>
          <h2 className="font-serif text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-xs text-ink-muted mb-6">
            Please add dishes from our menu before proceeding to checkout.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 bg-vermilion hover:bg-vermilion-hover text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-all"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        order_type: orderType,
        delivery_address: orderType === 'delivery' ? formData.address : null,
        special_instructions: formData.instructions,
        payment_method: orderType === 'delivery' ? formData.paymentMethod : 'Pay at restaurant',
        items: items.map((i) => ({
          menu_item_id: i.id,
          item_name: i.name,
          price: i.price,
          quantity: i.quantity,
          is_veg: i.is_veg
        }))
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order.');
      }

      clearCart();
      navigate(`/order/${data.orderId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-ink min-h-screen text-paper">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb back */}
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-xs font-semibold text-ink-muted hover:text-paper mb-6 transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </Link>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-8">
          Checkout &amp; Order
        </h1>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs sm:text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Customer & Delivery details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Delivery vs Pickup Choice */}
            <div className="bg-ink-card p-6 rounded-2xl border border-ink-border">
              <label className="block text-xs font-semibold text-gold uppercase tracking-wider mb-3">
                1. Select Order Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`min-h-[48px] py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border flex items-center justify-center gap-2 ${
                    orderType === 'delivery'
                      ? 'bg-vermilion text-white border-vermilion shadow-md'
                      : 'bg-ink-surface text-paper border-ink-border hover:border-ink-muted'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Home Delivery (₹40)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`min-h-[48px] py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border flex items-center justify-center gap-2 ${
                    orderType === 'pickup'
                      ? 'bg-vermilion text-white border-vermilion shadow-md'
                      : 'bg-ink-surface text-paper border-ink-border hover:border-ink-muted'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Takeaway Pickup (Free)</span>
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-ink-card p-6 rounded-2xl border border-ink-border space-y-4">
              <label className="block text-xs font-semibold text-gold uppercase tracking-wider mb-1">
                2. Contact &amp; Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-ink-muted mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full min-h-[44px] bg-ink-surface border border-ink-border rounded-xl px-4 text-xs sm:text-sm text-paper placeholder-ink-muted focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-ink-muted mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 9845012345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full min-h-[44px] bg-ink-surface border border-ink-border rounded-xl px-4 text-xs sm:text-sm text-paper placeholder-ink-muted focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-xs text-ink-muted mb-1">Complete Delivery Address *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Apartment/Flat No, Wing, Building Name, Street, Landmark, HSR Sector..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-ink-surface border border-ink-border rounded-xl p-3.5 text-xs sm:text-sm text-paper placeholder-ink-muted focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              )}

              {orderType === 'pickup' && (
                <div className="p-3.5 rounded-xl bg-ink-surface border border-ink-border text-xs text-ink-muted">
                  <p className="text-paper font-semibold">Pickup Location:</p>
                  <p>{RESTAURANT.location.fullAddress}</p>
                  <p className="text-gold mt-1">Ready for pickup approx. 20–25 minutes after confirmation.</p>
                </div>
              )}

              <div>
                <label className="block text-xs text-ink-muted mb-1">Kitchen Instructions / Spice Preference</label>
                <input
                  type="text"
                  placeholder="e.g. Please send extra wasabi, moderate spice, call upon arrival"
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full min-h-[44px] bg-ink-surface border border-ink-border rounded-xl px-4 text-xs sm:text-sm text-paper placeholder-ink-muted focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-ink-card p-6 rounded-2xl border border-ink-border space-y-3">
              <label className="block text-xs font-semibold text-gold uppercase tracking-wider mb-2">
                3. Payment Method
              </label>

              <div className="space-y-2">
                {orderType === 'delivery' ? (
                  <>
                    <label className="p-3.5 rounded-xl bg-ink-surface border border-ink-border flex items-center justify-between cursor-pointer hover:border-gold/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'Pay on delivery'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'Pay on delivery' })}
                          className="text-vermilion focus:ring-vermilion"
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-paper">Cash / UPI on Delivery</p>
                          <p className="text-[11px] text-ink-muted">Pay by cash or scan QR code when your rider arrives.</p>
                        </div>
                      </div>
                      <span className="text-xs text-gold font-semibold">Recommended</span>
                    </label>

                    <label className="p-3.5 rounded-xl bg-ink-surface border border-ink-border flex items-center justify-between cursor-pointer hover:border-gold/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'Razorpay'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'Razorpay' })}
                          className="text-vermilion focus:ring-vermilion"
                        />
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-paper">Online Payment (Razorpay)</p>
                          <p className="text-[11px] text-ink-muted">UPI, Cards, NetBanking (runs in test/demo mode)</p>
                        </div>
                      </div>
                    </label>
                  </>
                ) : (
                  <label className="p-3.5 rounded-xl bg-ink-surface border border-ink-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={true}
                        readOnly
                        className="text-vermilion"
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-paper">Pay at Restaurant Counter</p>
                        <p className="text-[11px] text-ink-muted">Pay via Card, UPI or Cash when collecting your food at Suku.</p>
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-ink-card p-6 rounded-2xl border border-ink-border space-y-5 sticky top-24 shadow-2xl">
            <h3 className="font-serif text-xl font-bold text-paper border-b border-ink-border pb-3">
              Order Summary ({items.length} items)
            </h3>

            {/* Items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((it) => (
                <div key={it.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="w-5 text-center text-ink-muted font-mono">{it.quantity}x</span>
                    <span className="text-paper truncate">{it.name}</span>
                  </div>
                  <span className="font-semibold text-paper shrink-0">₹{(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-ink-border/60 space-y-2 text-xs">
              <div className="flex justify-between text-ink-muted">
                <span>Subtotal</span>
                <span className="text-paper">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>Delivery Fee</span>
                <span className="text-paper">₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>GST (5%)</span>
                <span className="text-paper">₹{tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-ink-border flex justify-between text-base font-bold text-paper">
                <span>Total Amount</span>
                <span className="text-gold text-lg">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[50px] py-3.5 px-6 bg-vermilion hover:bg-vermilion-hover disabled:opacity-50 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"
            >
              {loading ? 'Processing Order...' : `Confirm & Place Order (₹${total.toFixed(2)})`}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-ink-muted pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Direct kitchen fulfillment • No hidden surcharges</span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
