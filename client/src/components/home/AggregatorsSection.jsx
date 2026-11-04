import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';
import { RESTAURANT } from '../../config/restaurant';

export default function AggregatorsSection() {
  const hasSwiggy = Boolean(RESTAURANT.orderLinks.swiggy);
  const hasZomato = Boolean(RESTAURANT.orderLinks.zomato);

  if (!hasSwiggy && !hasZomato) return null;

  return (
    <section className="py-16 bg-ink relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-ink-card to-ink-surface border border-ink-border shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-vermilion/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vermilion/15 text-vermilion border border-vermilion/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Fast Home Delivery</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-paper tracking-tight mb-3">
            Prefer Your Favorite Delivery App?
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted max-w-xl mx-auto mb-8">
            You can order directly from our website with zero markup, or order Suku via verified delivery aggregators.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Direct In-house order */}
            <Link
              to="/menu"
              className="w-full sm:w-auto min-h-[48px] px-7 py-3 bg-vermilion hover:bg-vermilion-hover text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Direct on Suku</span>
            </Link>

            {/* Swiggy Button */}
            {hasSwiggy && (
              <a
                href={RESTAURANT.orderLinks.swiggy}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] px-7 py-3 bg-[#FC8019] hover:bg-[#e47214] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Order on Swiggy</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Zomato Button */}
            {hasZomato && (
              <a
                href={RESTAURANT.orderLinks.zomato}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] px-7 py-3 bg-[#E23744] hover:bg-[#cb2d39] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Order on Zomato</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-ink-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Official Suku - HSR Layout listings. Prepared fresh per order.</span>
          </div>

        </div>

      </div>
    </section>
  );
}
