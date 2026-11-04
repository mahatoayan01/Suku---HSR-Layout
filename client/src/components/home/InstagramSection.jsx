import React from 'react';
import { Instagram, ExternalLink, Heart } from 'lucide-react';
import { RESTAURANT } from '../../config/restaurant';

export default function InstagramSection() {
  return (
    <section className="py-20 bg-ink relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-3">
              <Instagram className="w-3.5 h-3.5" />
              <span>Follow Along</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-paper tracking-tight">
              Suku on Instagram
            </h2>
            <p className="text-sm text-ink-muted mt-2">
              Daily kitchen highlights, sushi crafting reels, and community stories at{' '}
              <a
                href={RESTAURANT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold font-medium hover:underline"
              >
                {RESTAURANT.social.instagramHandle}
              </a>
            </p>
          </div>

          <a
            href={RESTAURANT.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 min-h-[44px] px-6 py-2.5 bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:opacity-95 text-white font-semibold text-xs uppercase tracking-wider rounded-full transition-all shadow-md inline-flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow {RESTAURANT.social.instagramHandle}</span>
          </a>
        </div>

        {/* Responsive Grid of Curated Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESTAURANT.instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-2xl overflow-hidden border border-ink-border bg-ink-card aspect-square hover:border-gold/40 transition-all duration-300 shadow-lg"
              aria-label={`View Instagram post: ${post.caption}`}
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-5 backdrop-blur-[2px]">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Instagram className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-paper line-clamp-3 leading-relaxed font-medium">
                    {post.caption}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-gold font-semibold uppercase tracking-wider">
                    <span>View on Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
