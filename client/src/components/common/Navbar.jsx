import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Phone, MapPin } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { RESTAURANT } from '../../config/restaurant';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Location', path: '/location' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-ink/95 backdrop-blur-md border-b border-ink-border shadow-lg py-3'
          : 'bg-gradient-to-b from-ink/90 via-ink/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-vermilion rounded-lg"
            aria-label="Suku Japanese & Thai Restaurant Home"
          >
            <div className="w-10 h-10 rounded-full bg-vermilion/20 border border-vermilion flex items-center justify-center text-vermilion font-serif font-bold text-xl transition-transform group-hover:scale-105">
              須
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wider text-paper group-hover:text-gold transition-colors">
                SUKU
              </span>
              <span className="text-[10px] tracking-[0.25em] text-ink-muted uppercase -mt-1 font-medium">
                Japanese &amp; Thai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors py-2 min-h-[44px] flex items-center ${
                  isActive(link.path)
                    ? 'text-gold font-semibold border-b-2 border-gold'
                    : 'text-paper/80 hover:text-paper hover:border-b-2 hover:border-paper/30'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Direct Call Quick Link (Desktop) */}
            <a
              href={`tel:${RESTAURANT.contact.primaryPhoneRaw}`}
              className="hidden lg:flex items-center gap-2 text-xs text-ink-muted hover:text-paper py-2 transition-colors min-h-[44px]"
              title="Call for Reservations"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>{RESTAURANT.contact.primaryPhone}</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-ink-card border border-ink-border hover:border-gold/50 text-paper transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label={`Open shopping cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-gold" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-vermilion text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Order Now Button */}
            <Link
              to="/menu"
              className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-vermilion hover:bg-vermilion-hover rounded-full transition-all shadow-md hover:shadow-vermilion/20 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-vermilion"
            >
              Order Online
            </Link>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-paper hover:bg-ink-card border border-transparent hover:border-ink-border focus:outline-none focus:ring-2 focus:ring-vermilion"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-vermilion" /> : <Menu className="w-6 h-6 text-paper" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-ink/98 border-b border-ink-border backdrop-blur-xl px-5 pt-4 pb-8 shadow-2xl transition-all animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium min-h-[44px] ${
                  isActive(link.path)
                    ? 'bg-vermilion/15 text-vermilion border border-vermilion/30'
                    : 'text-paper hover:bg-ink-card'
                }`}
              >
                <span>{link.name}</span>
                <span className="text-xs text-ink-muted">→</span>
              </Link>
            ))}

            <div className="pt-4 border-t border-ink-border flex flex-col gap-3">
              <Link
                to="/menu"
                className="w-full min-h-[44px] flex items-center justify-center font-semibold text-sm uppercase tracking-wider bg-vermilion text-white py-3 rounded-xl shadow-lg"
              >
                Order Online Now
              </Link>

              <a
                href={`tel:${RESTAURANT.contact.primaryPhoneRaw}`}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 text-sm text-paper bg-ink-card border border-ink-border py-3 rounded-xl hover:border-gold/50"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Call {RESTAURANT.contact.primaryPhone}</span>
              </a>

              <a
                href={RESTAURANT.location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs text-ink-muted hover:text-paper pt-1"
              >
                <MapPin className="w-3.5 h-3.5 text-vermilion" />
                <span>3rd Floor, 24th Main Road, HSR Layout</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
