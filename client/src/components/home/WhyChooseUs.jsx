import React from 'react';
import { Utensils, Sparkles, Bike, ShieldCheck, HeartHandshake, Flame } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: <Utensils className="w-6 h-6 text-vermilion" />,
      title: "Artisanal Craft & Balanced Flavors",
      description: "From our delicate vinegared sushi rice to our 12-hour simmered chicken and pork broths, we never cut corners. Every order is prepared fresh on the spot with genuine Asian ingredients."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      title: "Intimate 3rd Floor Ambience",
      description: "Perched peacefully above 24th Main Road, Suku offers a warm, minimalist wooden interior with soft amber lighting—creating a relaxed, intimate sanctuary for dates and small group conversations."
    },
    {
      icon: <Bike className="w-6 h-6 text-vermilion" />,
      title: "Pristine Delivery Packaging",
      description: "Our ramen broths, curries, and sushi platters are securely packed in specialized food-grade containers to ensure broths arrive piping hot and sushi retains its perfect crisp texture."
    }
  ];

  return (
    <section className="py-20 bg-ink-surface border-y border-ink-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>The Suku Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-paper tracking-tight">
            Why Bangalore Loves Suku
          </h2>
          <p className="text-sm text-ink-muted mt-3">
            Honest culinary craftsmanship, heartfelt hospitality, and approachable pricing in the heart of HSR Layout.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-ink-card border border-ink-border hover:border-gold/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-ink-surface border border-ink-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-paper mb-3 group-hover:text-gold transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ink-border/50 flex items-center gap-2 text-[11px] font-medium text-gold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Quality Guaranteed</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
