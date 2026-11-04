import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    title: "Chicken Dynamite Roll",
    subtitle: "Fiery Naga Chili Maki",
    image: "/images/dishes/dynamite-roll.jpg"
  },
  {
    title: "Chiang Mai Khao Soi",
    subtitle: "Rich Golden Coconut Broth",
    image: "/images/dishes/khao-soi.jpg"
  },
  {
    title: "Intimate Venue & Ambience",
    subtitle: "3rd Floor, HSR Layout",
    image: "/images/about/interior.jpg"
  },
  {
    title: "Chicken Katsu Ramen",
    subtitle: "Crispy Katsu & Ajitsuke Tamago",
    image: "/images/dishes/katsu-ramen.jpg"
  },
  {
    title: "Thai Bento Box",
    subtitle: "Complete Asian Meal Set",
    image: "/images/dishes/bento-box.jpg"
  },
  {
    title: "Mango Sticky Rice",
    subtitle: "Sweet Coconut & Alphonso Mango",
    image: "/images/dishes/mango-sticky-rice.jpg"
  }
];

export default function GallerySection() {
  return (
    <section className="py-20 bg-ink relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Showcase</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-paper tracking-tight">
            A Feast for the Senses
          </h2>
          <p className="text-sm text-ink-muted mt-3">
            Every dish is plated with attention to color, texture, and aroma.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden border border-ink-border bg-ink-card aspect-[4/3] cursor-pointer"
            >
              <img
                src={item.image}
                alt={`${item.title} at Suku HSR Layout`}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <p className="text-[11px] font-semibold tracking-widest uppercase text-gold">
                  {item.subtitle}
                </p>
                <h3 className="font-serif text-xl font-bold text-paper mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
