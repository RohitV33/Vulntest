import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a brief account creation delay, then go straight to the scanner
    setTimeout(() => navigate('/scanner'), 800);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center px-6 py-16 bg-surface-bg">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-secondary mb-4">FuzzGuard</p>
          <h1 className="text-3xl font-black text-ink-primary tracking-tight mb-2">Create your account.</h1>
          <p className="text-sm text-ink-secondary">Start securing your applications in minutes.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-ink-primary" htmlFor="name">Full name</label>
            <input
              type="text" id="name" placeholder="Jane Doe" required
              className="w-full bg-surface-card border border-border-subtle rounded-xl px-4 py-3 text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:border-ink-secondary focus:ring-2 focus:ring-ink-primary/10 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-ink-primary" htmlFor="email">Email</label>
            <input
              type="email" id="email" placeholder="you@example.com" required
              className="w-full bg-surface-card border border-border-subtle rounded-xl px-4 py-3 text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:border-ink-secondary focus:ring-2 focus:ring-ink-primary/10 transition-all font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-ink-primary" htmlFor="password">Password</label>
            <input
              type="password" id="password" placeholder="Minimum 8 characters" minLength={8} required
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
                Creating account…
              </>
            ) : (
              'Create free account →'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-[11px] text-ink-secondary leading-relaxed">
          By signing up, you agree to the{' '}
          <a href="#" className="text-ink-primary hover:underline font-medium">Terms</a>{' '}and{' '}
          <a href="#" className="text-ink-primary hover:underline font-medium">Privacy Policy</a>.
          <br />Only test websites you own or have permission to scan.
        </p>

        <p className="mt-6 text-center text-xs text-ink-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-ink-primary font-bold hover:underline">
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
}
