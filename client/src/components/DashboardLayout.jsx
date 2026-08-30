import { Link, useLocation } from 'react-router-dom';

export function DashboardLayout({ children }) {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'New Scan', href: '/scanner', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { name: 'Scan History', href: '/history', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <div className="min-h-screen bg-surface-bg flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border-subtle bg-surface-card flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-8 border-b border-border-subtle">
          <Link to="/" className="text-xl font-bold tracking-tighter text-ink-primary">
            FuzzGuard<span className="text-ink-secondary">.</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navigation.map((item) => {
            const active = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active 
                    ? 'bg-ink-primary text-surface-card' 
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-bg'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border-subtle">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-ink-primary flex items-center justify-center text-surface-card text-xs font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink-primary truncate">Jane Doe</p>
              <p className="text-xs text-ink-secondary truncate">jane@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-8 py-12">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
