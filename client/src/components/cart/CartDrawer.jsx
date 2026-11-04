import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, subtotal, itemCount } = useCart();
  const navigate = useNavigate();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Your Cart">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ink-card border-l border-ink-border text-paper shadow-2xl flex flex-col justify-between transform transition-all duration-300 ease-in-out">
          
          {/* Header */}
          <div className="p-5 border-b border-ink-border flex items-center justify-between bg-ink-surface/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h2 className="font-serif text-xl font-bold tracking-wide">
                Your Order ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-muted hover:text-paper rounded-full hover:bg-ink-border/50 transition-colors focus:outline-none focus:ring-2 focus:ring-vermilion"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-ink-surface border border-ink-border flex items-center justify-center text-ink-muted">
                  <ShoppingBag className="w-8 h-8 opacity-40 text-gold" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-medium text-paper">Your cart is empty</h3>
                  <p className="text-xs text-ink-muted max-w-xs">
                    Explore our handcrafted sushi, steaming ramen, and aromatic Thai specialties.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/menu');
                  }}
                  className="mt-2 min-h-[44px] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-vermilion hover:bg-vermilion-hover rounded-full transition-all shadow-md"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-ink-surface border border-ink-border/70 flex items-center gap-3 hover:border-ink-border transition-colors"
                  >
                    {/* Item Veg/Non-Veg Tag */}
                    <div className="flex-shrink-0">
                      <span
                        className={`inline-block w-3.5 h-3.5 border text-[8px] flex items-center justify-center rounded-sm ${
                          item.is_veg
                            ? 'border-green-600 text-green-600'
                            : 'border-red-600 text-red-600'
                        }`}
                        title={item.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}
                      >
                        ●
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-paper truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gold font-semibold mt-0.5">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-ink-card border border-ink-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center text-ink-muted hover:text-paper hover:bg-ink-border/40 transition-colors"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-vermilion" /> : <Minus className="w-3.5 h-3.5" />}
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-paper">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center text-ink-muted hover:text-paper hover:bg-ink-border/40 transition-colors"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-muted hover:text-vermilion transition-colors"
                      title="Remove from cart"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-ink-border bg-ink-surface/95 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-ink-muted">
                  <span>Items Subtotal</span>
                  <span className="text-paper font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-ink-muted">
                  <span>Taxes &amp; Delivery Fee</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="pt-2 border-t border-ink-border flex justify-between text-sm font-bold text-paper">
                  <span>Estimated Subtotal</span>
                  <span className="text-gold text-base">₹{subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full min-h-[48px] py-3 px-4 bg-vermilion hover:bg-vermilion-hover text-white font-semibold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-vermilion"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-ink-muted pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>Zero pre-payment required. Pay on delivery or at restaurant.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
