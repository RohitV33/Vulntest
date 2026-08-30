import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login, then go to dashboard
    setTimeout(() => navigate('/dashboard'), 700);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left — form panel */}
      <div className="flex-1 flex flex-col justify-center px-8 py-16 max-w-md mx-auto w-full">
        <div>
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-secondary mb-4">VulnTest</p>
            <h1 className="text-3xl font-bold text-ink-primary tracking-tight mb-2">Welcome back.</h1>
            <p className="text-sm text-ink-secondary">Sign in to continue securing your applications.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-ink-primary" htmlFor="email">Email</label>
              <input
                type="email" id="email" placeholder="you@example.com" required
                className="w-full bg-surface-card border border-border-subtle rounded-xl px-4 py-3 text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:border-ink-secondary focus:ring-2 focus:ring-ink-primary/10 transition-all font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold text-ink-primary" htmlFor="password">Password</label>
                <a href="#" className="text-[11px] text-ink-secondary hover:text-ink-primary transition-colors">Forgot?</a>
              </div>
              <input
                type="password" id="password" placeholder="••••••••" required
                className="w-full bg-surface-card border border-border-subtle rounded-xl px-4 py-3 text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:border-ink-secondary focus:ring-2 focus:ring-ink-primary/10 transition-all font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink-primary text-surface-card rounded-xl px-4 py-3 text-sm font-bold hover:opacity-90 transition-opacity mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-surface-card/30 border-t-surface-card animate-spin"/>
                  Signing in…
                </>
              ) : (
                'Sign in →'
              )}
            </button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-subtle" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface-bg px-3 text-[11px] text-ink-secondary font-medium">Or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => { setLoading(true); setTimeout(() => navigate('/dashboard'), 600); }}
            className="w-full mt-6 bg-surface-card border border-border-subtle text-ink-primary rounded-xl px-4 py-3 text-sm font-semibold hover:border-ink-secondary transition-colors flex items-center justify-center gap-2.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-xs text-ink-secondary">
            No account?{' '}
            <Link to="/signup" className="text-ink-primary font-bold hover:underline">
              Create one →
            </Link>
          </p>
        </div>
      </div>

      {/* Right — decorative panel (desktop only) */}
      <div className="hidden lg:flex flex-1 relative bg-ink-primary overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs><pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#g)"/>
          </svg>
        </div>
        {/* Floating preview cards */}
        <div className="relative z-10 w-72 space-y-4">
          <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-6 animate-float">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-3">Scan Complete</p>
            <div className="text-5xl font-bold text-white mb-1">87</div>
            <p className="text-xs text-white/60">Security Score</p>
            <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[87%] bg-emerald-400 rounded-full" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-5 animate-float2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-4">Findings</p>
            <div className="space-y-2.5 text-sm text-white/80">
              <div className="flex justify-between"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400"/>Critical</span><span className="font-bold">1</span></div>
              <div className="flex justify-between"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400"/>High</span><span className="font-bold">3</span></div>
              <div className="flex justify-between"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400"/>Medium</span><span className="font-bold">7</span></div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-4 animate-float">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot"/>
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">Live scan</span>
            </div>
            <p className="font-mono text-xs text-white/70 mb-2">example.com</p>
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[72%] bg-white/60 rounded-full"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
