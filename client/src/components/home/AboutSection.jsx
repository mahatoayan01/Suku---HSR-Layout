import React from 'react';
import { Sparkles, Heart, Award, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT } from '../../config/restaurant';

export default function AboutSection() {
  return (
    <section className="py-20 bg-ink-surface border-y border-ink-border relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-vermilion/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Block */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-ink-border shadow-2xl aspect-[4/3] bg-ink-card group">
              <img
                src="/images/about/interior.jpg"
                alt="Suku restaurant dining ambience in HSR Layout"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-ink-card/85 backdrop-blur-md border border-ink-border flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold font-medium">Atmosphere</p>
                  <p className="font-serif text-sm font-semibold text-paper">Cozy, Calm &amp; Intimate</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-widest text-ink-muted font-medium">Floor</p>
                  <p className="text-xs font-semibold text-paper">3rd Floor Lift Access</p>
                </div>
              </div>
            </div>

            {/* Accent badge */}
            <div className="absolute -top-4 -left-4 bg-vermilion text-white p-3.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Bangalore Favorite</span>
            </div>
          </div>

          {/* Story Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Culinary Journey</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-paper tracking-tight leading-tight">
              Where Japanese Precision Meets the Vibrant Soul of Thailand.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-paper/80 leading-relaxed font-normal">
              <p>
                Tucked quietly on the 3rd floor along the bustling 24th Main Road in HSR Layout, <strong className="text-paper font-semibold">Suku</strong> was born from a simple passion: to serve genuine, comforting Asian food without pretension or shortcuts.
              </p>
              <p>
                We do not serve alcohol, nor do we run buffets. Every single maki roll is rolled fresh to order, our ramen broths are gently simmered for hours to extract deep umami, and our Thai curries are infused with bruised galangal, fragrant kaffir lime leaves, and sweet holy basil.
              </p>
              <p>
                Whether you are joining us for a quiet date night, a post-work bowl of comforting Khao Soi, or ordering our signature Chicken Dynamite Roll directly to your door, Suku promises food made with honesty and deep flavor.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-ink-border">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-vermilion/10 border border-vermilion/30 flex items-center justify-center text-vermilion shrink-0 mt-0.5">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-paper">Hand-Rolled Maki &amp; Sushi</h4>
                  <p className="text-xs text-ink-muted">Crispy veg katsu to fiery Naga chili dynamite rolls.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-paper">Generous Khao Soi &amp; Ramen</h4>
                  <p className="text-xs text-ink-muted">Hearty noodle bowls topped with authentic Asian condiments.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
