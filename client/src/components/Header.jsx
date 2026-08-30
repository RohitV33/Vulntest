import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme.jsx';

const NAV = [
  { to: '/scanner', label: 'Scanner' },
  { to: '/reports', label: 'Reports' },
  { to: '/about', label: 'About' },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-bg/90 backdrop-blur-2xl border-b border-border-subtle shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 lg:px-12 h-16">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-ink-primary flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
            <svg className="w-3.5 h-3.5 text-surface-card" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-base font-black tracking-tight text-ink-primary">FuzzGuard</span>
        </Link>

        {/* Center nav */}
        <nav className={`hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 border transition-all duration-300 ${
          scrolled
            ? 'bg-surface-card border-border-subtle'
            : 'bg-surface-card/60 border-border-subtle/60 backdrop-blur-sm'
        }`}>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-150 ${
                  isActive
                    ? 'bg-ink-primary text-surface-card'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-surface-bg'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-ink-secondary hover:text-ink-primary rounded-lg hover:bg-surface-card/80 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          <Link to="/login" className="text-sm font-semibold text-ink-secondary hover:text-ink-primary transition-colors hidden sm:block">
            Log in
          </Link>
          <Link
            to="/scanner"
            className="text-sm font-bold bg-ink-primary text-surface-card px-5 py-2 rounded-full hover:opacity-90 transition-opacity shadow-sm"
          >
            Audit Website →
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
