import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme.jsx';

const NAV = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Audit Lab',
    href: '/scanner',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Audit Reports',
    href: '/history',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export function DashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col md:flex-row text-ink-primary">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-5 h-16 bg-surface-card border-b border-border-subtle sticky top-0 z-40">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-ink-primary flex items-center justify-center text-surface-card">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-sm font-black tracking-tight">FuzzGuard</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg border border-border-subtle text-ink-secondary hover:text-ink-primary"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface-card border-r border-border-subtle flex flex-col transition-transform duration-300 md:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border-subtle shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-ink-primary flex items-center justify-center text-surface-card transform group-hover:rotate-6 transition-transform">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-base font-black tracking-tight text-ink-primary">FuzzGuard</span>
          </Link>
          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            v2.4
          </span>
        </div>

        {/* Quick Launch CTA */}
        <div className="p-4 pb-2">
          <Link
            to="/scanner"
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-ink-primary text-surface-card rounded-xl py-2.5 px-4 text-xs font-bold hover:opacity-90 transition-opacity shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14m-7-7h14" strokeLinecap="round"/>
            </svg>
            Start Audit
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  active
                    ? 'bg-ink-primary text-surface-card shadow-xs'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-bg'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-surface-card/60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* System & Engine Status */}
        <div className="px-4 py-3 border-t border-border-subtle bg-surface-bg/50">
          <div className="flex items-center justify-between text-[10px] text-ink-secondary mb-1">
            <span className="font-semibold uppercase tracking-wider text-ink-muted">Scanner Engine</span>
            <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot"/>
              Online
            </span>
          </div>
          <p className="text-[10px] text-ink-muted">Ready for non-destructive fuzzing</p>
        </div>

        {/* User Profile & Theme Toggle */}
        <div className="p-3 border-t border-border-subtle space-y-2 shrink-0 bg-surface-card">
          <div className="flex items-center justify-between gap-2 px-2 py-1">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-2 text-xs font-medium text-ink-secondary hover:text-ink-primary py-1.5 px-2.5 rounded-lg hover:bg-surface-bg transition-colors"
            >
              {theme === 'dark' ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" strokeLinecap="round"/></svg>
                  <span>Light</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Dark</span>
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-500/10 py-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-1.5"
              title="Sign Out"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Exit</span>
            </button>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl bg-surface-bg border border-border-subtle">
            <div className="w-8 h-8 rounded-full bg-ink-primary text-surface-card flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-ink-primary truncate">Security Lead</p>
              <p className="text-[10px] text-ink-secondary truncate font-mono">admin@fuzzguard.io</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Content Workspace */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col bg-surface-bg">
        {/* Top Navbar */}
        <header className="h-16 border-b border-border-subtle bg-surface-card/70 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Workspace</span>
            <span className="text-xs text-ink-muted">/</span>
            <span className="text-xs font-semibold text-ink-primary font-mono">
              {location.pathname === '/dashboard' ? 'Overview' : location.pathname.replace('/', '')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-ink-secondary bg-surface-bg border border-border-subtle px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" />
              <span>Safe Sandbox Mode Active</span>
            </div>
            <Link
              to="/about"
              className="text-xs font-medium text-ink-secondary hover:text-ink-primary transition-colors"
            >
              Docs & Rules
            </Link>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 p-6 md:p-10 max-w-6xl w-full mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
