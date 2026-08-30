import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme.jsx';

const NAV = [
  { to: '/scanner', label: 'Scanner' },
  { to: '/reports', label: 'Reports' },
  { to: '/docs', label: 'Documentation' },
  { to: '/enterprise', label: 'Enterprise' },
];

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-surface-bg/80 backdrop-blur-xl border-b border-border-subtle transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        {/* Left: Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <svg className="w-5 h-5 text-ink-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-lg font-semibold tracking-tight text-ink-primary">
            FuzzGuard
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-ink-primary ${
                      isActive ? 'text-ink-primary' : 'text-ink-secondary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-5">
          <Link to="/login" className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors hidden sm:block">
            Log in
          </Link>
          <Link to="/signup" className="text-sm font-medium bg-ink-primary text-surface-card px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Sign up
          </Link>
          
          <div className="w-px h-4 bg-border-subtle ml-2 mr-1"></div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 text-ink-secondary hover:text-ink-primary rounded-md transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
