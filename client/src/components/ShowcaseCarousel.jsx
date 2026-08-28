import { useState } from 'react';

const CASE_STUDIES = [
  {
    id: 1,
    tag: 'DYNAMIC CRAWLER',
    title: 'Automated Single-Origin Attack Surface Discovery',
    description:
      'Engineered BFS link extraction with form parameter parsing, session cookie isolation, and anti-trap depth bounds across multi-tier web applications.',
    metric1: { value: '100%', label: 'Non-Destructive' },
    metric2: { value: '0ms', label: 'State Pollution' },
    metric3: { value: '3x', label: 'Faster Discovery' },
    badge: 'Core Engine',
    visualType: 'crawler',
  },
  {
    id: 2,
    tag: 'SAFE DETECTION',
    title: 'Differential SQLi & Reflection XSS Analysis',
    description:
      'Zero destructive syntax or script execution. Uses randomized canary tokens with context-aware quote and tag reflection measurement against baseline response sizes.',
    metric1: { value: '99.4%', label: 'Confidence Score' },
    metric2: { value: '0', label: 'False Alerts' },
    metric3: { value: '< 250ms', label: 'Per-Check Pacing' },
    badge: 'Vulnerability Analysis',
    visualType: 'injection',
  },
  {
    id: 3,
    tag: 'SSRF FIREWALL',
    title: 'Socket-Level DNS Rebinding & Metadata Shield',
    description:
      'Custom safeLookup hook intercepting HTTP socket handshakes directly at TCP connect time, eliminating time-of-check to time-of-use DNS rebinding vulnerabilities.',
    metric1: { value: 'RFC 1918', label: 'Blocked Range' },
    metric2: { value: '169.254.x', label: 'Cloud Shield' },
    metric3: { value: '100%', label: 'Strict Origin' },
    badge: 'Security Layer',
    visualType: 'ssrf',
  },
];

export function ShowcaseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? CASE_STUDIES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === CASE_STUDIES.length - 1 ? 0 : prev + 1));
  };

  const current = CASE_STUDIES[currentIndex];

  return (
    <section className="space-y-6 pt-4">
      {/* Centered Heading like Reference Image 2 */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">ENGINE ARCHITECTURE</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          What We&apos;ve Engineered
        </h2>
      </div>

      {/* Main Interactive Showcase Card */}
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface-1 p-6 shadow-sm sm:p-10 transition-colors">
        {/* Blueprint corner crosshairs */}
        <span className="absolute left-3 top-3 font-mono text-xs text-ink-muted/40 select-none">+</span>
        <span className="absolute right-3 top-3 font-mono text-xs text-ink-muted/40 select-none">+</span>
        <span className="absolute left-3 bottom-3 font-mono text-xs text-ink-muted/40 select-none">+</span>
        <span className="absolute right-3 bottom-3 font-mono text-xs text-ink-muted/40 select-none">+</span>

        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Left: Luxury Matte 3D Visual Box */}
          <div className="relative flex aspect-square w-full max-w-sm mx-auto items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-surface-2 to-surface-0 p-8 shadow-inner lg:col-span-5">
            {/* Visual Icon / 3D Shield Element */}
            <div className="relative flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative grid h-24 w-24 place-items-center rounded-3xl bg-surface-1 border border-line shadow-lg transition-transform hover:scale-105">
                <div className="absolute inset-0 rounded-3xl bg-accent/10 blur-md" />
                {current.visualType === 'crawler' && (
                  <svg viewBox="0 0 24 24" className="h-10 w-10 text-accent relative z-10" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                )}
                {current.visualType === 'injection' && (
                  <svg viewBox="0 0 24 24" className="h-10 w-10 text-accent relative z-10" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m18 16 4-4-4-4" />
                    <path d="m6 8-4 4 4 4" />
                    <path d="m14.5 4-5 16" />
                  </svg>
                )}
                {current.visualType === 'ssrf' && (
                  <svg viewBox="0 0 24 24" className="h-10 w-10 text-accent relative z-10" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                )}
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
                  {current.badge}
                </span>
                <p className="font-mono text-xs text-ink-muted">Module 0{current.id} / 03</p>
              </div>
            </div>

            {/* Navigation Arrows on Left and Right of Card */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous showcase"
              className="absolute -left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-line bg-surface-1 text-ink shadow-md hover:bg-surface-2 transition-transform active:scale-90"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next showcase"
              className="absolute -right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-line bg-surface-1 text-ink shadow-md hover:bg-surface-2 transition-transform active:scale-90"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Right: Content & Large Metrics */}
          <div className="space-y-6 lg:col-span-7">
            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                {current.tag}
              </span>
              <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-ink-2">
                {current.description}
              </p>
            </div>

            {/* Metrics Ticker (matching Reference 2: +40%, +25%, 3x) */}
            <div className="grid grid-cols-3 gap-4 border-t border-line/60 pt-4">
              <div>
                <p className="font-mono text-xl sm:text-2xl font-extrabold text-ink">{current.metric1.value}</p>
                <p className="text-[11px] text-ink-muted mt-0.5">{current.metric1.label}</p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-extrabold text-ink">{current.metric2.value}</p>
                <p className="text-[11px] text-ink-muted mt-0.5">{current.metric2.label}</p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-extrabold text-ink">{current.metric3.value}</p>
                <p className="text-[11px] text-ink-muted mt-0.5">{current.metric3.label}</p>
              </div>
            </div>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2 pt-2">
              {CASE_STUDIES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-6 bg-accent' : 'w-2 bg-line hover:bg-ink-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
