import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme.jsx';

const NAV = [
  { to: '/scanner', label: 'Scanner' },
  { to: '/reports', label: 'Reports' },
  { to: '/about', label: 'About' },
];

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 transition-colors">
      <div className="bg-surface-bg/70 backdrop-blur-2xl border-b border-border-subtle">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-ink-primary flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
              <svg className="w-3.5 h-3.5 text-surface-card" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight text-ink-primary">
              FuzzGuard
            </span>
          </Link>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-card/60 border border-border-subtle rounded-full px-2 py-1.5 backdrop-blur-sm">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-ink-primary text-surface-card shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-bg'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-ink-secondary hover:text-ink-primary rounded-lg hover:bg-surface-card transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            <Link to="/login" className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors hidden sm:block">
              Log in
            </Link>
            <Link to="/scanner" className="text-sm font-semibold bg-ink-primary text-surface-card px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
              Start scan
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
