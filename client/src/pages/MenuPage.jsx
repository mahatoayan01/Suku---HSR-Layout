import React, { useState, useEffect } from 'react';
import { Search, Flame, Plus, Sparkles, Filter, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT } from '../config/restaurant';

const CATEGORIES = ['All', 'Sushi', 'Ramen', 'Thai', 'Bento', 'Desserts', 'Beverages'];

export default function MenuPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [vegFilter, setVegFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCart();

  // Fetch menu items from API or fallback
  useEffect(() => {
    let isMounted = true;
    async function loadMenu() {
      try {
        const res = await fetch('/api/menu');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setItems(data.items || []);
        }
      } catch (err) {
        console.error('Failed to fetch menu:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadMenu();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter items
  const filteredItems = items.filter((item) => {
    // Category check
    if (activeCategory !== 'All' && item.category !== activeCategory) {
      return false;
    }
    // Veg filter check
    if (vegFilter === 'veg' && item.is_veg !== 1) return false;
    if (vegFilter === 'non-veg' && item.is_veg === 1) return false;
    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = (item.description || '').toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCategory) return false;
    }
    return true;
  });

  return (
    <div className="pt-28 pb-20 bg-ink min-h-screen text-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Handcrafted In HSR Layout</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Our Menu
          </h1>
          <p className="text-sm sm:text-base text-ink-muted mt-3">
            Explore authentic Japanese maki rolls, rich broth ramens, fragrant Thai curries, and refreshing coolers.
          </p>
        </div>

        {/* Controls: Search & Veg Filters */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-ink-card p-4 rounded-2xl border border-ink-border">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              placeholder="Search dishes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[44px] bg-ink-surface border border-ink-border rounded-xl pl-10 pr-4 text-xs sm:text-sm text-paper placeholder-ink-muted focus:outline-none focus:border-gold transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-muted hover:text-paper"
              >
                Clear
              </button>
            )}
          </div>

          {/* Veg / Non-Veg Diet Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => setVegFilter('all')}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all border ${
                vegFilter === 'all'
                  ? 'bg-paper text-ink border-paper'
                  : 'bg-ink-surface text-paper border-ink-border hover:border-ink-muted'
              }`}
            >
              All Diet
            </button>

            <button
              onClick={() => setVegFilter('veg')}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all border flex items-center gap-1.5 ${
                vegFilter === 'veg'
                  ? 'bg-green-700 text-white border-green-600'
                  : 'bg-ink-surface text-green-500 border-ink-border hover:border-green-600/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>Veg Only</span>
            </button>

            <button
              onClick={() => setVegFilter('non-veg')}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all border flex items-center gap-1.5 ${
                vegFilter === 'non-veg'
                  ? 'bg-red-700 text-white border-red-600'
                  : 'bg-ink-surface text-red-400 border-ink-border hover:border-red-600/50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Non-Veg</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all ${
                activeCategory === cat
                  ? 'bg-vermilion text-white shadow-lg shadow-vermilion/20 scale-105'
                  : 'bg-ink-card border border-ink-border text-paper/70 hover:text-paper hover:border-ink-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-20 text-center text-ink-muted">
            <div className="w-10 h-10 border-2 border-vermilion border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm">Loading Suku kitchen menu...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-ink-card rounded-2xl border border-ink-border p-8">
            <p className="font-serif text-2xl text-paper mb-2">No matching dishes found</p>
            <p className="text-xs text-ink-muted max-w-sm mx-auto mb-6">
              Try adjusting your dietary filter or searching for another keyword like "maki", "khao soi", or "ramen".
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setVegFilter('all');
                setSearchQuery('');
              }}
              className="min-h-[44px] px-6 py-2 bg-vermilion text-white text-xs font-semibold uppercase tracking-wider rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Menu Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((dish) => (
              <div
                key={dish.id}
                className="group bg-ink-card rounded-2xl border border-ink-border overflow-hidden hover:border-gold/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-surface">
                  <img
                    src={dish.image_url}
                    alt={`${dish.name} - Suku HSR Layout`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded bg-ink-card/90 border border-ink-border text-paper backdrop-blur-md">
                      {dish.category}
                    </span>
                    {dish.is_signature === 1 && (
                      <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded bg-gold/90 text-ink font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Chef Pick</span>
                      </span>
                    )}
                    {dish.spice_level >= 2 && (
                      <span className="px-2 py-1 text-[10px] font-semibold rounded bg-vermilion/90 text-white flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        <span>Spicy</span>
                      </span>
                    )}
                  </div>

                  {/* Veg / Non-Veg Indicator */}
                  <div className="absolute top-3 right-3 bg-ink-card/90 p-1.5 rounded border border-ink-border">
                    <span
                      className={`inline-block w-3 h-3 border text-[7px] flex items-center justify-center rounded-sm ${
                        dish.is_veg
                          ? 'border-green-600 text-green-600'
                          : 'border-red-600 text-red-600'
                      }`}
                      title={dish.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}
                    >
                      ●
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-paper group-hover:text-gold transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed mt-2 line-clamp-3">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-5 pt-4 border-t border-ink-border/60 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-paper">
                        ₹{dish.price}
                      </span>
                      {dish.is_price_estimated === 1 && (
                        <span className="block text-[10px] text-ink-muted -mt-0.5">
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
        )}

      </div>
    </div>
  );
}
