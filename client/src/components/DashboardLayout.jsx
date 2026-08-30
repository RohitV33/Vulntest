import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme.jsx';

const NAV = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    name: 'New Scan',
    href: '/scanner',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'History',
    href: '/history',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export function DashboardLayout({ children }) {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-surface-bg flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col fixed inset-y-0 left-0 z-40 border-r border-border-subtle bg-surface-card">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border-subtle shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-ink-primary flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
              <svg className="w-3.5 h-3.5 text-surface-card" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-sm font-bold text-ink-primary tracking-tight">FuzzGuard</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-ink-primary text-surface-card'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-bg'
                }`}
              >
                {item.icon}
                {item.name}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-surface-card/50" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: user + theme toggle */}
        <div className="p-3 border-t border-border-subtle space-y-2 shrink-0">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-secondary hover:text-ink-primary hover:bg-surface-bg transition-colors"
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" strokeLinecap="round"/></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>

          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface-bg border border-border-subtle">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-ink-primary to-ink-secondary flex items-center justify-center text-surface-card text-[10px] font-bold shrink-0">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-ink-primary truncate">Jane Doe</p>
              <p className="text-[10px] text-ink-secondary truncate">jane@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-60 min-h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
