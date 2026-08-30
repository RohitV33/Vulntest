import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a brief account creation delay, then go straight to the audit lab
    setTimeout(() => navigate('/scanner'), 600);
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
          <h1 className="text-2xl sm:text-3xl font-black text-ink-primary tracking-tight">Create your account</h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">Start running automated security audits in seconds.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-ink-primary uppercase tracking-wider" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Jane Doe"
              required
              className="w-full bg-surface-bg border border-border-subtle rounded-xl px-4 py-3 text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:border-ink-secondary focus:ring-2 focus:ring-ink-primary/10 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-ink-primary uppercase tracking-wider" htmlFor="email">
              Work Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="jane@company.com"
              required
              className="w-full bg-surface-bg border border-border-subtle rounded-xl px-4 py-3 text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:border-ink-secondary focus:ring-2 focus:ring-ink-primary/10 transition-all font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-ink-primary uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Minimum 8 characters"
              minLength={8}
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
                Creating account…
              </>
            ) : (
              'Create Free Account →'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] text-ink-muted leading-relaxed">
          By signing up, you agree to the{' '}
          <a href="#" className="text-ink-primary hover:underline font-medium">Terms</a>{' '}and{' '}
          <a href="#" className="text-ink-primary hover:underline font-medium">Privacy Policy</a>.
        </p>

        <p className="mt-6 text-center text-xs text-ink-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-ink-primary font-bold hover:underline underline-offset-4">
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
}
