import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { RESTAURANT } from '../../config/restaurant';

export default function HoursAndLocationBlock() {
  return (
    <section className="py-20 bg-ink-surface border-y border-ink-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Hours Card */}
          <div className="lg:col-span-6 bg-ink-card p-8 rounded-3xl border border-ink-border flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span>Visit Us</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-paper mb-6">
                Hours of Service
              </h3>

              <div className="divide-y divide-ink-border/50 text-sm">
                {RESTAURANT.hours.days.map((schedule, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between">
                    <span className="text-paper/90 font-medium">{schedule.day}</span>
                    <span className="text-gold font-semibold text-xs tracking-wider">
                      {schedule.open} – {schedule.close}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-ink-border/60 flex items-center justify-between text-xs text-ink-muted">
              <span>Kitchen open all day for lunch &amp; dinner</span>
              <span className="text-paper font-semibold">12:00 PM – 11:00 PM</span>
            </div>
          </div>

          {/* Mini Location Card */}
          <div className="lg:col-span-6 bg-ink-card p-8 rounded-3xl border border-ink-border flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-vermilion text-xs font-semibold uppercase tracking-widest mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>Location Details</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-paper mb-4">
                Suku - HSR Layout
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-paper/85 leading-relaxed">
                <p className="font-medium text-paper">
                  {RESTAURANT.location.fullAddress}
                </p>

                <div className="p-3.5 rounded-xl bg-ink-surface border border-ink-border space-y-1.5 text-xs">
                  <p className="text-gold font-semibold">
                    Floor Access: <span className="text-paper font-normal">{RESTAURANT.location.floorNote}</span>
                  </p>
                  <p className="text-gold font-semibold">
                    Parking: <span className="text-paper font-normal">{RESTAURANT.location.parkingNote}</span>
                  </p>
                  <p className="text-gold font-semibold">
                    Landmarks: <span className="text-paper font-normal">{RESTAURANT.location.landmarks}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-ink-border/60 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={RESTAURANT.location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 bg-vermilion hover:bg-vermilion-hover text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 flex-1"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <Link
                to="/location"
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 bg-ink-surface hover:bg-ink-border/40 text-paper border border-ink-border text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 flex-1"
              >
                <span>View Full Map</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
