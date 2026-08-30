import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6 animate-fade-in bg-surface-bg">
      <div className="w-full max-w-sm">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-ink-primary mb-2">Welcome back</h1>
          <p className="text-sm text-ink-secondary">Sign in to continue securing your applications.</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-ink-primary mb-1.5" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              className="w-full bg-surface-card border border-border-subtle rounded-md px-4 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-ink-secondary transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink-primary mb-1.5" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              className="w-full bg-surface-card border border-border-subtle rounded-md px-4 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-ink-secondary transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-ink-primary text-surface-card rounded-md px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity mt-2"
          >
            Log in
          </button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-border-subtle" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-surface-bg px-2 text-xs text-ink-secondary">Or</span>
          </div>
        </div>

        <button 
          type="button"
          className="w-full mt-6 bg-surface-card border border-border-subtle text-ink-primary rounded-md px-4 py-2.5 text-sm font-medium hover:bg-surface-bg transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <p className="mt-8 text-center text-xs text-ink-secondary">
          Don't have an account?{' '}
          <Link to="/signup" className="text-ink-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
