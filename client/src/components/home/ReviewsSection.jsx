import React from 'react';
import { Star, MessageSquare, ExternalLink, CheckCircle } from 'lucide-react';
import reviewsData from '../../data/reviews.json';
import { RESTAURANT } from '../../config/restaurant';

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-ink-surface border-y border-ink-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Verified Patron Feedback</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-paper tracking-tight">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(RESTAURANT.profile.rating)
                        ? 'fill-gold text-gold'
                        : 'fill-gold/40 text-gold/40'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-paper">
                {RESTAURANT.profile.rating} out of 5
              </span>
              <span className="text-xs text-ink-muted">
                (Based on {RESTAURANT.profile.reviewCount}+ Google reviews)
              </span>
            </div>
          </div>

          <a
            href={RESTAURANT.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold hover:text-white transition-colors py-2 min-h-[44px]"
          >
            <span>Read all reviews on Google</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 6 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-ink-card border border-ink-border flex flex-col justify-between hover:border-gold/30 transition-all duration-300"
            >
              <div>
                {/* Rating Stars & Source */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-gold text-gold' : 'text-ink-border fill-ink-border'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-ink-muted flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>{review.source}</span>
                  </span>
                </div>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-paper/90 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Name */}
              <div className="mt-6 pt-4 border-t border-ink-border/50 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-paper">
                    {review.name}
                  </h4>
                  <p className="text-[10px] text-ink-muted">Local Guide / Verified Diner</p>
                </div>
                <span className="text-xs font-serif text-gold font-bold">
                  {review.rating}.0 ★
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
