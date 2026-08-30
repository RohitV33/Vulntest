import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login, then go to dashboard
    setTimeout(() => navigate('/dashboard'), 600);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-surface-bg animate-fade-in">
      <div className="w-full max-w-md bg-surface-card border border-border-subtle rounded-3xl p-8 sm:p-10 shadow-xl">
        <div className="mb-8 text-center">
          <div className="w-10 h-10 rounded-2xl bg-ink-primary text-surface-card flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-muted mb-1">VulnTest Platform</p>
          <h1 className="text-2xl sm:text-3xl font-black text-ink-primary tracking-tight">Welcome back</h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">Sign in to access your security audit workspace.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-ink-primary uppercase tracking-wider" htmlFor="email">
              Work Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              required
              className="w-full bg-surface-bg border border-border-subtle rounded-xl px-4 py-3 text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:border-ink-secondary focus:ring-2 focus:ring-ink-primary/10 transition-all font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-ink-primary uppercase tracking-wider" htmlFor="password">
                Password
              </label>
              <a href="#" className="text-[11px] text-ink-muted hover:text-ink-primary transition-colors">Forgot?</a>
            </div>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              className="w-full bg-surface-bg border border-border-subtle rounded-xl px-4 py-3 text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:border-ink-secondary focus:ring-2 focus:ring-ink-primary/10 transition-all font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink-primary text-surface-card rounded-xl px-4 py-3.5 text-xs font-bold hover:opacity-90 transition-opacity mt-2 disabled:opacity-60 flex items-center justify-center gap-2 shadow-xs"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-surface-card/30 border-t-surface-card animate-spin"/>
                Signing in…
              </>
            ) : (
              'Sign In to Dashboard →'
            )}
          </button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-subtle" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-surface-card px-3 text-[11px] text-ink-muted font-medium">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => { setLoading(true); setTimeout(() => navigate('/dashboard'), 500); }}
          className="w-full mt-6 bg-surface-bg border border-border-subtle text-ink-primary rounded-xl px-4 py-3 text-xs font-bold hover:border-ink-secondary transition-colors flex items-center justify-center gap-2.5"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google Workspace
        </button>

        <p className="mt-8 text-center text-xs text-ink-secondary">
          Don't have an account?{' '}
          <Link to="/signup" className="text-ink-primary font-bold hover:underline underline-offset-4">
            Create account →
          </Link>
        </p>
      </div>
    </div>
  );
}
