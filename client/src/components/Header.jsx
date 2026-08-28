import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme.jsx';

const NAV = [
  { to: '/', label: 'Overview', end: true },
  { to: '/scanner', label: 'Scanner Lab' },
  { to: '/history', label: 'Scan History' },
  { to: '/about', label: 'Architecture & Safe Use' },
];

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface-1/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-3.5">
        {/* Brand Logo & Title */}
        <NavLink to="/" className="group flex items-center gap-3">
          <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent transition-transform duration-200 group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3 5 6v5.5c0 4.2 2.9 8.1 7 9.5 4.1-1.4 7-5.3 7-9.5V6l-7-3Z" strokeLinejoin="round" />
              <path d="m9.5 12 1.8 1.8L15 10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-good/60 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-good"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-ink">AegisScan</span>
              <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted">
                v1.0 • Authorized
              </span>
            </div>
            <p className="text-xs text-ink-muted">Web Security & Vulnerability Scanner</p>
          </div>
        </NavLink>

        {/* Navigation & Theme Switcher */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-accent/10 font-semibold text-accent'
                          : 'text-ink-2 hover:bg-surface-2 hover:text-ink'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="h-4 w-px bg-line" aria-hidden="true" />

          {/* Theme Switcher */}
          <div className="flex items-center rounded-lg border border-line bg-surface-2/60 p-0.5" role="group" aria-label="Theme">
            <button
              type="button"
              onClick={() => setTheme('light')}
              title="Light mode"
              aria-label="Light mode"
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors ${
                theme === 'light'
                  ? 'bg-surface-1 font-medium text-ink shadow-xs'
                  : 'text-ink-muted hover:text-ink-2'
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">Light</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              title="Dark mode"
              aria-label="Dark mode"
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors ${
                theme === 'dark'
                  ? 'bg-surface-1 font-medium text-ink shadow-xs'
                  : 'text-ink-muted hover:text-ink-2'
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Dark</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('system')}
              title="Auto system theme"
              aria-label="Auto system theme"
              className={`rounded-md px-2 py-1 text-xs transition-colors ${
                theme === 'system'
                  ? 'bg-surface-1 font-medium text-ink shadow-xs'
                  : 'text-ink-muted hover:text-ink-2'
              }`}
            >
              Auto
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
