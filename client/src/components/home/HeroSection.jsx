import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Sparkles, Utensils } from 'lucide-react';
import { RESTAURANT } from '../../config/restaurant';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-ink">
      {/* Background with Ambient Glow */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/hero-bg.jpg"
          alt="Suku Japanese & Thai Restaurant interior and signature sushi"
          className="w-full h-full object-cover opacity-20 filter brightness-75 scale-105 transition-transform duration-1000"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-ink" />
      </div>

      {/* Decorative Kanji & Ambient Lights */}
      <div className="absolute top-1/4 right-8 md:right-24 font-serif text-[120px] md:text-[200px] font-bold text-white/[0.02] select-none pointer-events-none">
        寿司
      </div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-vermilion/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Verified Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ink-card/90 border border-ink-border text-xs text-gold font-medium mb-6 backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-spin-slow" />
          <span>HSR Layout's Premier Japanese &amp; Thai Kitchen</span>
          <span className="w-1 h-1 rounded-full bg-gold/50" />
          <div className="flex items-center gap-1 text-paper font-semibold">
            <Star className="w-3 h-3 text-gold fill-gold" />
            <span>{RESTAURANT.profile.rating}</span>
            <span className="text-ink-muted font-normal">({RESTAURANT.profile.reviewCount}+ Google reviews)</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-paper tracking-tight leading-[1.1] mb-6">
          Artisanal <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-paper to-gold">Sushi</span>, 
          Soulful <span className="text-vermilion">Ramen</span> &amp; Authentic Thai.
        </h1>

        {/* Subline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-paper/80 font-normal leading-relaxed mb-10">
          From fiery Dynamite Maki rolls to steaming 12-hour simmered broth and velvety Chiang Mai Khao Soi—experience the vibrant craft of Asian dining on the 3rd floor in HSR Layout.
        </p>

        {/* Two CTAs: View Menu, Order Online */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            to="/menu"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-vermilion hover:bg-vermilion-hover text-white font-semibold text-sm rounded-full transition-all shadow-xl hover:shadow-vermilion/25 hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-vermilion"
          >
            <span>Order Online</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/menu"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-ink-card/90 hover:bg-ink-surface text-paper border border-ink-border hover:border-gold/50 font-semibold text-sm rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <Utensils className="w-4 h-4 text-gold" />
            <span>View Full Menu</span>
          </Link>
        </div>

        {/* Mini Seed Features */}
        <div className="mt-12 pt-8 border-t border-ink-border/50 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-3xl mx-auto">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-vermilion" />
            <div>
              <p className="text-xs font-semibold text-paper">Dine-in &amp; Takeaway</p>
              <p className="text-[11px] text-ink-muted">Cozy 3rd floor venue</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <div>
              <p className="text-xs font-semibold text-paper">No Alcohol / No Buffet</p>
              <p className="text-[11px] text-ink-muted">Pure culinary focus</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <div>
              <p className="text-xs font-semibold text-paper">Veg &amp; Non-Veg</p>
              <p className="text-[11px] text-ink-muted">Dedicated selections</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <div>
              <p className="text-xs font-semibold text-paper">12:00 PM – 11:00 PM</p>
              <p className="text-[11px] text-ink-muted">Open daily</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
