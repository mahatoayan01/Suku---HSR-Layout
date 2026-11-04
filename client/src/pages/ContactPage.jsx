import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, AlertCircle, Instagram } from 'lucide-react';
import { RESTAURANT } from '../config/restaurant';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit message.');
      }

      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      setStatus({ submitting: false, success: false, error: err.message });
    }
  };

  return (
    <div className="pt-28 pb-20 bg-ink min-h-screen text-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>We'd Love To Hear From You</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Contact &amp; Inquiries
          </h1>
          <p className="text-sm sm:text-base text-ink-muted mt-3">
            For table bookings, catering requests, or feedback, reach out to our team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Quick Contact Methods */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-ink-card border border-ink-border space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-vermilion/15 text-vermilion flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-paper">Phone &amp; Reservations</h3>
                  <p className="text-xs text-ink-muted">Available 12:00 PM – 11:00 PM</p>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <a
                  href={`tel:${RESTAURANT.contact.primaryPhoneRaw}`}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-ink-surface border border-ink-border hover:border-gold/50 flex items-center justify-between text-xs sm:text-sm font-semibold transition-colors"
                >
                  <span>Primary: {RESTAURANT.contact.primaryPhone}</span>
                  <span className="text-xs text-gold">Call Now →</span>
                </a>
                <a
                  href={`tel:${RESTAURANT.contact.secondaryPhoneRaw}`}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-ink-surface border border-ink-border hover:border-gold/50 flex items-center justify-between text-xs sm:text-sm font-semibold transition-colors"
                >
                  <span>Secondary: {RESTAURANT.contact.secondaryPhone}</span>
                  <span className="text-xs text-gold">Call Now →</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-ink-card border border-ink-border space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/15 text-green-500 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-paper">WhatsApp Chat</h3>
                  <p className="text-xs text-ink-muted">Instant table reservations &amp; quick queries</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${RESTAURANT.contact.whatsapp}?text=${encodeURIComponent(RESTAURANT.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1fb855] text-white flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Email & Social */}
            <div className="p-6 rounded-2xl bg-ink-card border border-ink-border space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-paper">Customer Support Email</h4>
                  <a href={`mailto:${RESTAURANT.contact.email}`} className="text-gold hover:underline">
                    {RESTAURANT.contact.email}
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-ink-border/60 flex items-center justify-between">
                <span className="text-ink-muted">Official Instagram:</span>
                <a
                  href={RESTAURANT.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper hover:text-vermilion font-medium inline-flex items-center gap-1 min-h-[44px]"
                >
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <span>{RESTAURANT.social.instagramHandle}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-ink-card p-8 rounded-3xl border border-ink-border shadow-2xl">
            <h2 className="font-serif text-2xl font-bold text-paper mb-2">
              Send a Message
            </h2>
            <p className="text-xs text-ink-muted mb-6">
              Fill in your details below and our team will get back to you promptly. Messages are saved securely to our management database.
            </p>

            {status.success && (
              <div className="mb-6 p-4 rounded-xl bg-green-950/50 border border-green-800 text-green-200 text-xs sm:text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Thank you for your message!</p>
                  <p className="text-green-300/80 mt-0.5">We have received your inquiry and our restaurant team will call or message you shortly.</p>
                </div>
              </div>
            )}

            {status.error && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs sm:text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-paper/80 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full min-h-[44px] bg-ink-surface border border-ink-border rounded-xl px-4 text-xs sm:text-sm text-paper placeholder-ink-muted focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-paper/80 uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 9845012345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full min-h-[44px] bg-ink-surface border border-ink-border rounded-xl px-4 text-xs sm:text-sm text-paper placeholder-ink-muted focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-paper/80 uppercase tracking-wider mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full min-h-[44px] bg-ink-surface border border-ink-border rounded-xl px-4 text-xs sm:text-sm text-paper placeholder-ink-muted focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-paper/80 uppercase tracking-wider mb-1.5">
                  Message / Reservation Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Let us know date, time, number of guests, or any special culinary dietary request..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-ink-surface border border-ink-border rounded-xl p-4 text-xs sm:text-sm text-paper placeholder-ink-muted focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status.submitting}
                className="w-full min-h-[48px] py-3 px-6 bg-vermilion hover:bg-vermilion-hover disabled:opacity-50 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {status.submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Suku</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
