import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { RESTAURANT } from '../../config/restaurant';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink-surface border-t border-ink-border text-paper/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-ink-border/80">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-vermilion/20 border border-vermilion flex items-center justify-center text-vermilion font-serif font-bold text-lg">
                須
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-paper">
                SUKU
              </span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              {RESTAURANT.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-ink-card border border-ink-border flex items-center justify-center text-paper hover:text-vermilion hover:border-vermilion transition-all min-h-[44px] min-w-[44px]"
                aria-label="Follow Suku on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-ink-card border border-ink-border flex items-center justify-center text-paper hover:text-gold hover:border-gold transition-all min-h-[44px] min-w-[44px]"
                aria-label="View Suku on Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-serif text-base font-semibold text-paper tracking-wider uppercase mb-4 text-gold">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-vermilion transition-colors inline-block py-1 min-h-[32px]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-vermilion transition-colors inline-block py-1 min-h-[32px]">
                  Full Menu &amp; Specials
                </Link>
              </li>
              <li>
                <Link to="/location" className="hover:text-vermilion transition-colors inline-block py-1 min-h-[32px]">
                  Find Us &amp; Hours
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-vermilion transition-colors inline-block py-1 min-h-[32px]">
                  Contact &amp; Reservations
                </Link>
              </li>
              <li>
                <a
                  href={RESTAURANT.orderLinks.swiggy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-vermilion transition-colors inline-flex items-center gap-1 py-1 min-h-[32px]"
                >
                  <span>Order on Swiggy</span>
                  <ExternalLink className="w-3 h-3 text-ink-muted" />
                </a>
              </li>
              <li>
                <a
                  href={RESTAURANT.orderLinks.zomato}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-vermilion transition-colors inline-flex items-center gap-1 py-1 min-h-[32px]"
                >
                  <span>Order on Zomato</span>
                  <ExternalLink className="w-3 h-3 text-ink-muted" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours of Operation */}
          <div>
            <h3 className="font-serif text-base font-semibold text-paper tracking-wider uppercase mb-4 text-gold flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              <span>Opening Hours</span>
            </h3>
            <div className="space-y-1.5 text-xs text-ink-muted">
              <div className="flex justify-between py-1 border-b border-ink-border/50">
                <span className="text-paper">Monday – Sunday</span>
                <span className="font-medium text-gold">{RESTAURANT.hours.display}</span>
              </div>
              <p className="pt-2 text-[11px] leading-relaxed text-ink-muted">
                Kitchen closes 30 minutes before closing time. Delivery orders are accepted till 10:45 PM.
              </p>
            </div>
          </div>

          {/* Col 4: Visit & Contact */}
          <div>
            <h3 className="font-serif text-base font-semibold text-paper tracking-wider uppercase mb-4 text-gold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" />
              <span>Location</span>
            </h3>
            <address className="not-italic text-xs text-ink-muted space-y-2 leading-relaxed">
              <p className="text-paper font-medium">
                {RESTAURANT.location.building}
              </p>
              <p>
                {RESTAURANT.location.street}, {RESTAURANT.location.locality}, {RESTAURANT.location.city} - {RESTAURANT.location.postalCode}
              </p>
              <p className="text-gold pt-1">
                {RESTAURANT.location.floorNote}
              </p>
              <div className="pt-2">
                <a
                  href={`tel:${RESTAURANT.contact.primaryPhoneRaw}`}
                  className="inline-flex items-center gap-2 text-paper hover:text-vermilion font-medium py-1 min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 text-vermilion" />
                  <span>{RESTAURANT.contact.primaryPhone}</span>
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <p>© {currentYear} {RESTAURANT.legalName}. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-vermilion inline fill-vermilion" /> in Bengaluru
            </span>
            <Link
              to="/owner/login"
              className="text-ink-muted hover:text-gold flex items-center gap-1 min-h-[44px] py-2 transition-colors"
              title="Restaurant Management Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Owner Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
