import { Link } from 'react-router-dom';

export function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6 animate-fade-in bg-surface-bg">
      <div className="w-full max-w-sm">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-ink-primary mb-2">Start securing your website</h1>
          <p className="text-sm text-ink-secondary">Create a free account to begin.</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-ink-primary mb-1.5" htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name"
              className="w-full bg-surface-card border border-border-subtle rounded-md px-4 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-ink-secondary transition-colors"
              placeholder="Jane Doe"
            />
          </div>
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
            Create account
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-ink-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-ink-primary font-medium hover:underline">
            Log in
          </Link>
        </p>

        <p className="mt-6 text-center text-[10px] text-ink-secondary leading-relaxed max-w-xs mx-auto">
          By creating an account, you agree to our Terms of Service and Privacy Policy. Only scan websites you have permission to test.
        </p>
      </div>
    </div>
  );
}
