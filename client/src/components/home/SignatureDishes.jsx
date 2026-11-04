import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight, Sparkles, Flame } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const SIGNATURE_DISHES = [
  {
    id: 1,
    name: "Chicken Dynamite Roll",
    category: "Sushi",
    description: "Crispy chicken katsu, avocado & scallions rolled in nori, topped with fiery Naga chili mayo and dried chili threads.",
    price: 410,
    is_veg: 0,
    is_signature: 1,
    spice_level: 3,
    image_url: "/images/dishes/dynamite-roll.jpg",
    is_price_estimated: 0
  },
  {
    id: 2,
    name: "Geisha Red Lips Roll",
    category: "Sushi",
    description: "Artfully plated signature roll with fresh tuna, avocado, beetroot-infused sushi rice, spicy aioli & microgreens.",
    price: 450,
    is_veg: 0,
    is_signature: 1,
    spice_level: 1,
    image_url: "/images/dishes/geisha-lips-roll.jpg",
    is_price_estimated: 1
  },
  {
    id: 6,
    name: "Chicken Katsu Ramen",
    category: "Ramen",
    description: "Deep, slow-simmered chicken broth, panko-crusted chicken cutlet, ajitsuke tamago soft egg, nori & scallions.",
    price: 420,
    is_veg: 0,
    is_signature: 1,
    spice_level: 1,
    image_url: "/images/dishes/katsu-ramen.jpg",
    is_price_estimated: 0
  },
  {
    id: 10,
    name: "Chiang Mai Khao Soi",
    category: "Thai",
    description: "Hearty Northern Thai golden coconut curry noodle soup with tender chicken, pickled greens, lime & crispy noodle crown.",
    price: 380,
    is_veg: 0,
    is_signature: 1,
    spice_level: 2,
    image_url: "/images/dishes/khao-soi.jpg",
    is_price_estimated: 0
  },
  {
    id: 12,
    name: "Thai Green Curry with Jasmine Rice",
    category: "Thai",
    description: "Aromatic herbs, fresh galangal, kaffir lime leaves & sweet Thai basil simmered in rich coconut milk.",
    price: 390,
    is_veg: 0,
    is_signature: 1,
    spice_level: 2,
    image_url: "/images/dishes/thai-green-curry.jpg",
    is_price_estimated: 1
  },
  {
    id: 13,
    name: "Pad Kra Pow Gai",
    category: "Thai",
    description: "Fiery wok-tossed minced chicken with Thai holy basil, garlic & bird's eye chili, served with jasmine rice & fried egg.",
    price: 360,
    is_veg: 0,
    is_signature: 1,
    spice_level: 3,
    image_url: "/images/dishes/pad-kra-pow.jpg",
    is_price_estimated: 1
  }
];

export default function SignatureDishes() {
  const { addItem } = useCart();

  return (
    <section className="py-20 bg-ink relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chef's Specialties</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-paper tracking-tight">
              Signature Dishes
            </h2>
            <p className="text-sm text-ink-muted mt-2 max-w-xl">
              The dishes that put Suku on Bangalore's culinary map. Handcrafted fresh daily with premium ingredients.
            </p>
          </div>

          <Link
            to="/menu"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold hover:text-white transition-colors py-2 min-h-[44px]"
          >
            <span>Explore All 22 Menu Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SIGNATURE_DISHES.map((dish) => (
            <div
              key={dish.id}
              className="group bg-ink-card rounded-2xl border border-ink-border overflow-hidden hover:border-gold/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-black/50"
            >
              {/* Image & Tags */}
              <div className="relative aspect-[16/10] overflow-hidden bg-ink-surface">
                <img
                  src={dish.image_url}
                  alt={`${dish.name} - Suku Japanese and Thai Restaurant`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-transparent to-transparent opacity-80" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-md bg-ink-card/90 border border-ink-border text-paper backdrop-blur-md">
                    {dish.category}
                  </span>
                  {dish.spice_level >= 2 && (
                    <span className="px-2 py-1 text-[11px] font-medium rounded-md bg-vermilion/90 text-white flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span>Spicy</span>
                    </span>
                  )}
                </div>

                {/* Veg/Non-Veg tag */}
                <div className="absolute top-3 right-3 bg-ink-card/90 p-1.5 rounded border border-ink-border">
                  <span
                    className={`inline-block w-3 h-3 border text-[7px] flex items-center justify-center rounded-sm ${
                      dish.is_veg
                        ? 'border-green-600 text-green-600'
                        : 'border-red-600 text-red-600'
                    }`}
                  >
                    ●
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-paper group-hover:text-gold transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed mt-2 line-clamp-2">
                    {dish.description}
                  </p>
                </div>

                {/* Pricing & Add to Cart */}
                <div className="mt-5 pt-4 border-t border-ink-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-paper font-sans">
                      ₹{dish.price}
                    </span>
                    {dish.is_price_estimated === 1 && (
                      <span className="block text-[10px] text-ink-muted -mt-0.5" title="Estimated price pending owner review">
                        approx.
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addItem(dish, 1)}
                    className="min-h-[44px] px-4 py-2 bg-vermilion hover:bg-vermilion-hover text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center gap-1.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-vermilion"
                    aria-label={`Add ${dish.name} to cart for ₹${dish.price}`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
