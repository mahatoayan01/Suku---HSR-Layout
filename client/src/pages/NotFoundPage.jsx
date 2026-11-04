import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="pt-32 pb-24 bg-ink min-h-screen text-paper flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center p-8 rounded-3xl bg-ink-card border border-ink-border shadow-2xl">
        <div className="font-serif text-8xl font-bold text-vermilion mb-2 tracking-widest">
          404
        </div>
        <div className="font-serif text-2xl font-bold text-paper mb-3">
          Page Not Found
        </div>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-8">
          The dish, page, or destination you were looking for seems to have moved or does not exist on our menu.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-vermilion hover:bg-vermilion-hover text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/menu"
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-ink-surface hover:bg-ink-border border border-ink-border text-paper text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2"
          >
            <span>View Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
