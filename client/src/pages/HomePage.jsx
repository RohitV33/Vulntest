import { Link } from 'react-router-dom';
import { RevealOnScroll } from '../components/RevealOnScroll.jsx';

export function HomePage() {
  return (
    <div className="bg-surface-bg flex flex-col justify-center w-full overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000"
            alt="Cybersecurity Abstract" 
            className="w-full h-full object-cover opacity-10 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-bg via-surface-bg/80 to-surface-bg" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <RevealOnScroll delay={0}>
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-ink-secondary mb-8 border border-border-subtle rounded-full px-4 py-1.5 bg-surface-card/50 backdrop-blur-md">
              Enterprise Web Security Platform
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <h1 className="text-5xl sm:text-7xl md:text-[90px] font-bold text-ink-primary tracking-tighter leading-[1.05] max-w-5xl">
              Find vulnerabilities before <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink-primary to-ink-secondary">attackers do.</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <p className="mt-8 text-lg sm:text-xl text-ink-secondary max-w-2xl leading-relaxed font-light">
              Automatically discover and analyze security vulnerabilities in your web applications with a fast, developer-focused fuzzing engine.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/scanner"
                className="flex items-center gap-3 bg-ink-primary text-surface-card px-10 py-5 rounded-md font-medium text-base hover:scale-105 transition-transform duration-300 w-full sm:w-auto justify-center shadow-2xl"
              >
                Start free assessment <span className="text-xl">→</span>
              </Link>
              <Link
                to="/enterprise"
                className="flex items-center gap-3 bg-surface-card/50 backdrop-blur-md border border-border-subtle text-ink-primary px-10 py-5 rounded-md font-medium text-base hover:bg-surface-card transition-colors duration-300 w-full sm:w-auto justify-center"
              >
                Book a demo
              </Link>
            </div>
          </RevealOnScroll>

          {/* Mouse scroll indicator */}
          <RevealOnScroll delay={600} className="mt-24">
            <div className="flex flex-col items-center gap-2 text-ink-secondary opacity-50 animate-bounce">
              <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-ink-secondary to-transparent" />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Floating Cards UI Showcase */}
      <section className="relative z-20 -mt-20 max-w-7xl mx-auto px-6 w-full hidden lg:block h-[500px] pointer-events-none">
        <RevealOnScroll delay={0} className="absolute top-[0%] left-[5%] bg-surface-card border border-border-subtle rounded-2xl p-6 shadow-2xl w-72 rotate-[-3deg] backdrop-blur-xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-4">Security Score</p>
          <div className="text-5xl font-light text-ink-primary mb-3 tabular-nums tracking-tighter">87<span className="text-xl text-ink-secondary ml-1">/100</span></div>
          <div className="flex gap-1.5 mb-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`h-2 flex-1 rounded-sm ${i < 8 ? 'bg-ink-primary' : 'bg-border-subtle'}`} />
            ))}
          </div>
          <p className="text-xs font-medium text-ink-secondary">Enterprise standard met</p>
        </RevealOnScroll>

        <RevealOnScroll delay={200} className="absolute top-[20%] right-[5%] bg-surface-card border border-border-subtle rounded-2xl p-6 shadow-2xl w-64 rotate-[2deg] backdrop-blur-xl">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-5">Active Findings</p>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>Critical</span>
              <span className="font-semibold text-ink-primary">1</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>High</span>
              <span className="font-semibold text-ink-primary">3</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></span>Medium</span>
              <span className="font-semibold text-ink-primary">7</span>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Feature Grid */}
      <section className="py-32 bg-surface-card relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-5xl font-bold text-ink-primary tracking-tight max-w-2xl mb-20">
              Uncompromising security analysis, beautifully designed.
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <RevealOnScroll delay={0}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-surface-bg border border-border-subtle flex items-center justify-center text-ink-primary mb-6">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-ink-primary">Deep Fuzzing</h3>
                <p className="text-ink-secondary leading-relaxed font-light">
                  Our proprietary engine mutates thousands of payloads per second to find obscure injection points and edge cases.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={150}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-surface-bg border border-border-subtle flex items-center justify-center text-ink-primary mb-6">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-ink-primary">Editorial Reports</h3>
                <p className="text-ink-secondary leading-relaxed font-light">
                  Export stunning, boardroom-ready PDF and JSON reports. Security shouldn't just be secure—it should look good.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-surface-bg border border-border-subtle flex items-center justify-center text-ink-primary mb-6">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-ink-primary">Zero Setup</h3>
                <p className="text-ink-secondary leading-relaxed font-light">
                  No agents to install, no complicated configurations. Just enter a URL and start scanning in seconds.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Large Image Showcase */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="rounded-3xl overflow-hidden border border-border-subtle shadow-2xl relative aspect-[16/9]">
            <img 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2000"
              alt="Cybersecurity Code Analysis"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-bg to-transparent flex items-end p-12">
              <div className="max-w-xl">
                <h3 className="text-3xl font-bold text-ink-primary mb-4">Precision Analysis</h3>
                <p className="text-ink-secondary text-lg">Every line of code, every endpoint, every parameter rigorously tested against modern threat vectors.</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Final CTA */}
      <section className="py-32 border-t border-border-subtle bg-surface-bg text-center px-6">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-6xl font-bold text-ink-primary tracking-tight mb-8">
            Ready to secure your stack?
          </h2>
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 bg-ink-primary text-surface-card px-12 py-5 rounded-md font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl"
          >
            Create free account
          </Link>
        </RevealOnScroll>
      </section>
    </div>
  );
}
