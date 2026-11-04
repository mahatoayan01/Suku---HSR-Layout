import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, Phone, MapPin, ShoppingBag, ArrowRight, AlertCircle } from 'lucide-react';
import { RESTAURANT } from '../config/restaurant';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) {
          throw new Error('Order not found or has expired.');
        }
        const data = await res.json();
        if (isMounted) setOrder(data.order);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchOrder();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-ink min-h-screen text-paper flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-vermilion border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-ink-muted">Loading order confirmation...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="pt-32 pb-20 bg-ink min-h-screen text-paper flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-ink-card border border-ink-border">
          <AlertCircle className="w-12 h-12 text-vermilion mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-xs text-ink-muted mb-6">
            We couldn't locate order ID "{id}". Please check your link or contact our team.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center min-h-[44px] px-6 py-2.5 bg-vermilion text-white text-xs font-semibold uppercase tracking-wider rounded-full"
          >
            Go to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-ink min-h-screen text-paper">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="bg-ink-card rounded-3xl border border-ink-border p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="text-center max-w-lg mx-auto mb-8">
            <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 mx-auto mb-4 shadow-lg shadow-green-500/10">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            
            <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-1">
              Order Confirmed
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-paper">
              Thank You, {order.customer_name}!
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted mt-2">
              Your order has been received by our kitchen staff and is being prepared with utmost care.
            </p>
          </div>

          {/* Status Bar */}
          <div className="mb-8 p-4 rounded-2xl bg-ink-surface border border-ink-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-[11px] text-ink-muted uppercase tracking-wider">Order Reference</p>
              <p className="font-mono text-sm font-bold text-gold">{order.id}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-ink-muted uppercase tracking-wider">Current Status:</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-vermilion/20 text-vermilion border border-vermilion/40">
                {order.status}
              </span>
            </div>

            <div className="text-right">
              <p className="text-[11px] text-ink-muted uppercase tracking-wider">Estimated Time</p>
              <p className="text-xs font-semibold text-paper flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>25–35 Mins</span>
              </p>
            </div>
          </div>

          {/* Order Details Details */}
          <div className="space-y-6 text-xs sm:text-sm">
            
            {/* Delivery/Pickup metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-ink-surface/60 border border-ink-border/60">
              <div>
                <p className="text-ink-muted font-medium text-[11px] uppercase tracking-wider">Customer Details</p>
                <p className="text-paper font-semibold mt-1">{order.customer_name}</p>
                <p className="text-ink-muted">{order.customer_phone}</p>
              </div>

              <div>
                <p className="text-ink-muted font-medium text-[11px] uppercase tracking-wider">
                  {order.order_type === 'delivery' ? 'Delivery Address' : 'Fulfillment Type'}
                </p>
                <p className="text-paper mt-1">
                  {order.order_type === 'delivery'
                    ? order.delivery_address
                    : 'Customer Takeaway Pickup at Suku (3rd Floor, HSR Layout)'}
                </p>
              </div>
            </div>

            {/* Items Table */}
            <div>
              <h3 className="font-serif text-lg font-bold text-paper mb-3">
                Items Ordered
              </h3>
              <div className="divide-y divide-ink-border/50 border-y border-ink-border/50">
                {(order.items || []).map((it, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-ink-muted w-6">{it.quantity}x</span>
                      <span className="text-paper font-medium">{it.item_name}</span>
                    </div>
                    <span className="font-semibold text-paper">₹{it.subtotal.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 pt-2 border-t border-ink-border text-xs">
              <div className="flex justify-between text-ink-muted">
                <span>Subtotal</span>
                <span className="text-paper">₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>Delivery Fee</span>
                <span className="text-paper">₹{order.delivery_fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>GST (5%)</span>
                <span className="text-paper">₹{order.tax.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-ink-border flex justify-between text-base font-bold text-paper">
                <span>Total Paid / Payable</span>
                <span className="text-gold text-lg">₹{order.total_amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-ink-muted">
                <span>Payment Mode:</span>
                <span className="text-paper">{order.payment_method} ({order.payment_status})</span>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="mt-10 pt-6 border-t border-ink-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <a
              href={`tel:${RESTAURANT.contact.primaryPhoneRaw}`}
              className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-ink-surface hover:bg-ink-border/50 border border-ink-border rounded-xl text-xs font-semibold text-paper flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>Call Kitchen: {RESTAURANT.contact.primaryPhone}</span>
            </a>

            <Link
              to="/menu"
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-vermilion hover:bg-vermilion-hover text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Explore More Dishes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
