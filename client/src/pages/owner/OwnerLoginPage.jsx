import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function OwnerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/owner', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/owner', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-ink min-h-screen text-paper flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-ink-muted hover:text-paper mb-6 transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Website</span>
        </Link>

        <div className="p-8 rounded-3xl bg-ink-card border border-ink-border shadow-2xl relative">
          
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-vermilion/20 border border-vermilion flex items-center justify-center text-vermilion mx-auto mb-3">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-paper">
              Owner Management Portal
            </h1>
            <p className="text-xs text-ink-muted mt-1">
              Restricted access for Suku restaurant management and kitchen staff.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-paper/80 uppercase tracking-wider mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  type="email"
                  required
                  placeholder="owner@sukuhsr.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-h-[44px] bg-ink-surface border border-ink-border rounded-xl pl-10 pr-4 text-xs sm:text-sm text-paper placeholder-ink-muted focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-paper/80 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full min-h-[44px] bg-ink-surface border border-ink-border rounded-xl pl-10 pr-4 text-xs sm:text-sm text-paper placeholder-ink-muted focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[48px] py-3 px-6 bg-vermilion hover:bg-vermilion-hover disabled:opacity-50 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Owner Login</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-ink-border text-center">
            <p className="text-[11px] text-ink-muted">
              Credentials are encrypted using bcrypt &amp; authenticated via httpOnly cookie tokens.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
