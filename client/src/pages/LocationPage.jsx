import React from 'react';
import { MapPin, Navigation, Clock, Phone, Car, Compass, ExternalLink } from 'lucide-react';
import { RESTAURANT } from '../config/restaurant';

export default function LocationPage() {
  return (
    <div className="pt-28 pb-20 bg-ink min-h-screen text-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-vermilion text-xs font-semibold uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Find Suku In Bangalore</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Location &amp; Hours
          </h1>
          <p className="text-sm sm:text-base text-ink-muted mt-3">
            Perched on the 3rd floor along 24th Main Road, HSR Layout Sector 1.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Keyless Embedded Google Map */}
          <div className="lg:col-span-7 bg-ink-card p-3 sm:p-4 rounded-3xl border border-ink-border shadow-2xl">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-ink-border bg-ink-surface">
              <iframe
                title="Google Maps Location of Suku - HSR Layout"
                src={RESTAURANT.location.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
              <div>
                <p className="font-serif text-base font-bold text-paper">
                  Suku - HSR Layout
                </p>
                <p className="text-xs text-ink-muted">
                  3rd Floor, Building No. 1329, 24th Main Road
                </p>
              </div>

              <a
                href={RESTAURANT.location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-vermilion hover:bg-vermilion-hover text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Direct Actions */}
            <div className="bg-ink-card p-6 rounded-2xl border border-ink-border space-y-4">
              <h3 className="font-serif text-xl font-bold text-paper flex items-center gap-2 text-gold">
                <MapPin className="w-5 h-5 text-gold" />
                <span>Physical Address</span>
              </h3>
              
              <address className="not-italic text-xs sm:text-sm text-paper/85 leading-relaxed space-y-1">
                <p className="font-semibold text-paper text-base">{RESTAURANT.location.building}</p>
                <p>{RESTAURANT.location.street}</p>
                <p>{RESTAURANT.location.locality}, {RESTAURANT.location.city}</p>
                <p>{RESTAURANT.location.state} – {RESTAURANT.location.postalCode}, India</p>
              </address>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`tel:${RESTAURANT.contact.primaryPhoneRaw}`}
                  className="min-h-[44px] px-4 py-2.5 bg-ink-surface hover:bg-ink-border/50 border border-ink-border rounded-xl text-xs font-semibold text-paper flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-vermilion" />
                  <span>Call: {RESTAURANT.contact.primaryPhone}</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="bg-ink-card p-6 rounded-2xl border border-ink-border space-y-4">
              <h3 className="font-serif text-xl font-bold text-paper flex items-center gap-2 text-gold">
                <Clock className="w-5 h-5 text-gold" />
                <span>Service Schedule</span>
              </h3>

              <div className="divide-y divide-ink-border/50 text-xs">
                {RESTAURANT.hours.days.map((h, i) => (
                  <div key={i} className="py-2 flex items-center justify-between">
                    <span className="text-paper/80 font-medium">{h.day}</span>
                    <span className="text-gold font-semibold">{h.open} – {h.close}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-ink-muted pt-1">
                Last food orders are accepted 30 minutes before closing.
              </p>
            </div>

            {/* Parking & Landmarks */}
            <div className="bg-ink-card p-6 rounded-2xl border border-ink-border space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Car className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-paper">Parking Information</h4>
                  <p className="text-ink-muted mt-1 leading-relaxed">
                    {RESTAURANT.location.parkingNote}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-ink-border/60">
                <Compass className="w-4 h-4 text-vermilion shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-paper">Nearby Landmarks &amp; Access</h4>
                  <p className="text-ink-muted mt-1 leading-relaxed">
                    {RESTAURANT.location.landmarks} Look for elevator access to the 3rd floor.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
