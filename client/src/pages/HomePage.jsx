import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="min-h-screen bg-surface-bg flex flex-col justify-center animate-fade-in relative overflow-hidden">
      
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-full h-full max-w-4xl opacity-[0.03] bg-ink-primary rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-full h-full max-w-4xl opacity-[0.02] bg-ink-primary rounded-full blur-[120px]" />
      </div>

      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center">
        
        {/* Eyebrow */}
        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-ink-secondary mb-6 animate-slide-up">
          Web Security • Fuzzing • Vulnerability Assessment
        </p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-[80px] font-bold text-ink-primary tracking-tight leading-[1.05] max-w-4xl animate-slide-up" style={{ animationDelay: '50ms' }}>
          Find vulnerabilities before attackers do.
        </h1>

        {/* Supporting text */}
        <p className="mt-8 text-base sm:text-lg text-ink-secondary max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
          Automatically discover and analyze security vulnerabilities in your web applications with a fast, developer-focused web fuzzing platform.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '150ms' }}>
          <Link
            to="/scanner"
            className="flex items-center gap-2 bg-ink-primary text-surface-card px-8 py-4 rounded-md font-medium text-sm hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
          >
            Start a free scan <span>→</span>
          </Link>
          <Link
            to="/docs"
            className="flex items-center gap-2 bg-surface-card border border-border-subtle text-ink-primary px-8 py-4 rounded-md font-medium text-sm hover:border-ink-secondary transition-colors w-full sm:w-auto justify-center shadow-xs"
          >
            View documentation
          </Link>
        </div>

        {/* Under buttons note */}
        <p className="mt-6 text-xs text-ink-secondary animate-slide-up" style={{ animationDelay: '200ms' }}>
          No installation required · PDF & JSON reports
        </p>

      </section>

      {/* Floating Product Cards Area */}
      <div className="relative w-full max-w-7xl mx-auto h-[400px] lg:h-[600px] hidden md:block pointer-events-none mt-[-80px]">
        
        {/* Card 1 - Security Score */}
        <div className="absolute top-[10%] left-[5%] animate-float bg-surface-card border border-border-subtle rounded-xl p-5 shadow-xl w-64 rotate-[-2deg]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-3">Security Score</p>
          <div className="text-3xl font-semibold text-ink-primary mb-2">87 <span className="text-sm text-ink-secondary">/ 100</span></div>
          <div className="flex gap-1 mb-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-sm ${i < 8 ? 'bg-ink-primary' : 'bg-border-subtle'}`} />
            ))}
          </div>
          <p className="text-xs font-medium text-ink-secondary mt-1">Good</p>
        </div>

        {/* Card 2 - Findings */}
        <div className="absolute top-[20%] right-[8%] animate-float-delayed bg-surface-card border border-border-subtle rounded-xl p-5 shadow-xl w-56 rotate-[3deg]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-4">Findings</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Critical</span>
              <span className="font-semibold text-ink-primary">1</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>High</span>
              <span className="font-semibold text-ink-primary">3</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>Medium</span>
              <span className="font-semibold text-ink-primary">7</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>Low</span>
              <span className="font-semibold text-ink-primary">4</span>
            </div>
          </div>
        </div>

        {/* Card 3 - Scan Status */}
        <div className="absolute bottom-[20%] left-[12%] animate-float-reverse bg-surface-card border border-border-subtle rounded-xl p-5 shadow-xl w-64 rotate-[1deg]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-1">Scan Complete</p>
          <p className="text-sm font-medium text-ink-primary mb-4">example.com</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-semibold text-ink-primary">1,284</p>
              <p className="text-[10px] text-ink-secondary uppercase tracking-wider">Requests</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-ink-primary">86</p>
              <p className="text-[10px] text-ink-secondary uppercase tracking-wider">Endpoints</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-ink-primary">15</p>
              <p className="text-[10px] text-ink-secondary uppercase tracking-wider">Findings</p>
            </div>
          </div>
        </div>

        {/* Card 4 - Vulnerability */}
        <div className="absolute bottom-[25%] right-[15%] animate-float bg-surface-card border border-border-subtle rounded-xl p-5 shadow-xl w-72 rotate-[-1deg]">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-1.5 py-0.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase rounded">High</span>
            <p className="text-xs font-semibold text-ink-primary">Reflected XSS</p>
          </div>
          <p className="font-mono text-[11px] text-ink-secondary bg-surface-bg p-2 rounded mb-3 border border-border-subtle">
            /search?q=test
          </p>
          <button className="text-xs font-medium text-accent-blue hover:underline">
            View finding →
          </button>
        </div>

        {/* Card 5 - Report */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 animate-float-delayed bg-surface-card border border-border-subtle rounded-xl p-6 shadow-2xl w-80 rotate-[2deg] z-0 opacity-40 blur-[1px]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-1">Security Report</p>
          <p className="text-sm font-medium text-ink-primary mb-4">example.com</p>
          <div className="flex gap-3">
            <div className="flex-1 border border-border-subtle rounded flex items-center justify-center py-2 gap-2 text-xs font-medium text-ink-secondary bg-surface-bg">
              PDF
            </div>
            <div className="flex-1 border border-border-subtle rounded flex items-center justify-center py-2 gap-2 text-xs font-medium text-ink-secondary bg-surface-bg">
              JSON
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
