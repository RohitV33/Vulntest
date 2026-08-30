import { Link } from 'react-router-dom';
import { useState } from 'react';
import { RevealOnScroll } from '../components/RevealOnScroll.jsx';

// Simple accordion component for FAQ
function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-border-subtle">
      <button 
        className="w-full text-left py-6 flex justify-between items-center text-ink-primary font-medium hover:text-ink-secondary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-ink-secondary leading-relaxed font-light text-sm">{children}</p>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <div className="bg-surface-bg flex flex-col justify-center w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
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
            <p className="mt-8 text-lg sm:text-xl text-ink-secondary max-w-2xl leading-relaxed font-light mx-auto">
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
                to="/about"
                className="flex items-center gap-3 bg-surface-card/50 backdrop-blur-md border border-border-subtle text-ink-primary px-10 py-5 rounded-md font-medium text-base hover:bg-surface-card transition-colors duration-300 w-full sm:w-auto justify-center"
              >
                Learn more
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

      {/* 2. LOGOS / CREDIBILITY */}
      <section className="py-12 border-y border-border-subtle bg-surface-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <p className="text-center text-xs font-medium text-ink-secondary uppercase tracking-widest mb-8">
              Trusted by innovative security teams worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-24 opacity-40 grayscale">
              {/* Placeholder SVGs for logos */}
              <svg className="h-8" viewBox="0 0 100 30" fill="currentColor"><path d="M10,20 h20 v-4 h-20 v-4 h20 v-4 h-20 v-4 h-10 v20 h10 z" /></svg>
              <svg className="h-6" viewBox="0 0 100 30" fill="currentColor"><circle cx="15" cy="15" r="10"/><rect x="35" y="5" width="40" height="20"/></svg>
              <svg className="h-7" viewBox="0 0 100 30" fill="currentColor"><polygon points="50,5 20,25 80,25"/></svg>
              <svg className="h-8" viewBox="0 0 100 30" fill="currentColor"><path d="M10 10 h 20 v 10 h -20 z M 40 10 h 20 v 10 h -20 z"/></svg>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 3. WORKING PROCESS (From Reference Image) */}
      <section className="py-32 bg-surface-bg relative">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <div className="mb-16">
              <span className="inline-block px-3 py-1 bg-surface-card border border-border-subtle text-ink-secondary text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                Workflow
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-ink-primary tracking-tight">
                Working <span className="text-ink-secondary">Process</span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="space-y-6">
            <RevealOnScroll delay={100}>
              <div className="flex items-start gap-6 p-8 rounded-2xl bg-surface-card border border-border-subtle shadow-sm hover:border-ink-secondary transition-colors group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-bg border border-border-subtle text-ink-primary font-mono text-sm group-hover:bg-ink-primary group-hover:text-surface-card transition-colors">
                  01
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-primary mb-2">Enter Target</h3>
                  <p className="text-ink-secondary font-light">User inputs the target URL or API endpoint to test. Our engine instantly verifies connectivity and reads basic configuration files like robots.txt.</p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <div className="flex items-start gap-6 p-8 rounded-2xl bg-surface-card border border-border-subtle shadow-sm hover:border-ink-secondary transition-colors group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-bg border border-border-subtle text-ink-primary font-mono text-sm group-hover:bg-ink-primary group-hover:text-surface-card transition-colors">
                  02
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-primary mb-2">Deep Fuzzing</h3>
                  <p className="text-ink-secondary font-light">The engine crawls the application, identifies attack surfaces, and mutates payloads to find SQLi, XSS, and other injection vulnerabilities at scale.</p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="flex items-start gap-6 p-8 rounded-2xl bg-surface-card border border-border-subtle shadow-sm hover:border-ink-secondary transition-colors group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-bg border border-border-subtle text-ink-primary font-mono text-sm group-hover:bg-ink-primary group-hover:text-surface-card transition-colors">
                  03
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-primary mb-2">Actionable Reporting</h3>
                  <p className="text-ink-secondary font-light">Receive a clean, beautifully formatted report detailing exactly where the vulnerabilities exist and how to remediate them before deployment.</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 4. HIGHLIGHTED FEATURES SECTION (Images/Video) */}
      <section className="py-32 bg-surface-card relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <RevealOnScroll className="flex-1 w-full">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border-subtle shadow-2xl relative bg-surface-bg">
                <img 
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200" 
                  alt="Code Analysis" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-bg to-transparent opacity-60" />
                
                {/* Floating UI Element */}
                <div className="absolute bottom-8 left-8 right-8 bg-surface-card/90 backdrop-blur border border-border-subtle rounded-xl p-4 shadow-xl">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-mono text-ink-secondary">Status: Scanning...</span>
                    <span className="text-ink-primary font-bold">86%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-bg rounded-full overflow-hidden">
                    <div className="h-full bg-ink-primary w-[86%]"></div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200} className="flex-1 space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink-secondary">Intelligent Fuzzing</span>
              <h3 className="text-3xl md:text-4xl font-bold text-ink-primary tracking-tight">Highlight what sets your security apart</h3>
              <p className="text-ink-secondary leading-relaxed font-light">
                Our proprietary scanning engine uses advanced heuristics to identify endpoints that traditional scanners miss. It intelligently mutates data payloads to bypass standard WAFs and expose underlying logical flaws.
              </p>
              <ul className="space-y-3 text-sm text-ink-secondary pt-4">
                <li className="flex items-center gap-3"><span className="text-ink-primary">✓</span> Payload Mutation Engine</li>
                <li className="flex items-center gap-3"><span className="text-ink-primary">✓</span> Automated Endpoint Discovery</li>
                <li className="flex items-center gap-3"><span className="text-ink-primary">✓</span> Zero-day heuristics mapping</li>
              </ul>
            </RevealOnScroll>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <RevealOnScroll className="flex-1 w-full">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border-subtle shadow-2xl relative bg-surface-bg">
                <img 
                  src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Reporting Dashboard" 
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-bg to-transparent opacity-60" />
                
                {/* Floating UI Element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-card/90 backdrop-blur border border-border-subtle rounded-xl p-6 shadow-xl w-64 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ink-secondary mb-2">Security Score</p>
                  <p className="text-5xl font-light text-ink-primary tabular-nums">92</p>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200} className="flex-1 space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink-secondary">Editorial Reports</span>
              <h3 className="text-3xl md:text-4xl font-bold text-ink-primary tracking-tight">Boardroom-ready security analytics</h3>
              <p className="text-ink-secondary leading-relaxed font-light">
                Security shouldn't just be secure—it should look good. FuzzGuard translates complex technical vulnerabilities into clear, actionable insights that both developers and executives can understand.
              </p>
              <Link to="/reports" className="inline-flex items-center gap-2 text-sm font-medium text-ink-primary hover:opacity-80 transition-opacity mt-4 border-b border-ink-primary pb-1">
                View sample report →
              </Link>
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-32 bg-surface-bg border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-5xl font-bold text-ink-primary tracking-tight mb-16">
              Why Choose FuzzGuard
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Lightning Fast", desc: "Optimized rust-based engine performs thousands of requests per second." },
              { title: "Zero Config", desc: "No agents, no complex setup. Just enter a URL and start." },
              { title: "CI/CD Ready", desc: "Integrate easily into your pipeline via our REST API." },
              { title: "Developer First", desc: "Clear remediation steps with precise code references." }
            ].map((item, idx) => (
              <RevealOnScroll key={item.title} delay={idx * 100}>
                <div className="text-center p-6 border border-transparent hover:border-border-subtle rounded-xl transition-colors h-full">
                  <div className="w-10 h-10 mx-auto rounded-full bg-surface-card border border-border-subtle flex items-center justify-center text-ink-primary mb-4 font-mono text-xs">
                    {idx + 1}
                  </div>
                  <h4 className="text-lg font-bold text-ink-primary mb-2">{item.title}</h4>
                  <p className="text-sm text-ink-secondary font-light">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 6. REVIEWS SECTION */}
      <section className="py-32 bg-surface-card border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-ink-primary tracking-tight max-w-lg">
                Let happy users convince the rest.
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Alex Chen", role: "CTO, FinTech Startup", text: "FuzzGuard caught 3 critical SSRF vulnerabilities right before our major launch. The interface is stunning and the reporting is unparalleled." },
              { name: "Sarah Jenkins", role: "Lead DevSecOps", text: "Finally, a scanner that developers actually want to use. The zero-config setup meant we deployed it across all 40 of our microservices in one afternoon." },
              { name: "Marcus Rodriguez", role: "Security Consultant", text: "I generate FuzzGuard's PDF reports directly for my clients. The presentation layer alone is worth the investment." }
            ].map((review, idx) => (
              <RevealOnScroll key={review.name} delay={idx * 150}>
                <div className="bg-surface-bg p-8 rounded-2xl border border-border-subtle h-full flex flex-col justify-between">
                  <p className="text-ink-secondary font-light italic mb-8">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-card border border-border-subtle flex items-center justify-center text-ink-primary text-xs font-bold uppercase">
                      {review.name.substring(0,2)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink-primary">{review.name}</p>
                      <p className="text-xs text-ink-secondary">{review.role}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-32 bg-surface-bg">
        <div className="max-w-3xl mx-auto px-6">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-ink-primary text-center mb-12">Frequently Asked Questions</h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100} className="border-t border-border-subtle">
            <AccordionItem title="Do I need to install any agents?">
              No. FuzzGuard is a fully cloud-based platform. You only need to verify ownership of your target application to begin scanning.
            </AccordionItem>
            <AccordionItem title="Is it safe to run on production environments?">
              We offer a specific "Safe Mode" for production environments which uses non-destructive payloads and carefully paces requests to avoid performance impacts.
            </AccordionItem>
            <AccordionItem title="How long does a typical scan take?">
              A standard scan usually takes between 5 to 15 minutes depending on the size of your application. Deep fuzzing on large apps may take longer.
            </AccordionItem>
            <AccordionItem title="Can I integrate this into GitHub Actions?">
              Yes, we provide a CLI tool and native CI/CD integrations for GitHub, GitLab, and Bitbucket.
            </AccordionItem>
          </RevealOnScroll>
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="py-32 border-t border-border-subtle bg-surface-card text-center px-6">
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 bg-ink-primary rounded-2xl mb-8 flex items-center justify-center transform rotate-12">
              <svg className="w-8 h-8 text-surface-card transform -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-ink-primary tracking-tight mb-6">
              Wrap up with a confident CTA.
            </h2>
            <p className="text-lg text-ink-secondary font-light max-w-2xl mb-10">
              Join thousands of developers securing their applications automatically. Start your free assessment today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-3 bg-ink-primary text-surface-card px-10 py-4 rounded-md font-bold text-sm hover:scale-105 transition-transform duration-300 shadow-xl"
              >
                Create free account
              </Link>
              <Link
                to="/scanner"
                className="inline-flex items-center justify-center gap-3 bg-surface-bg border border-border-subtle text-ink-primary px-10 py-4 rounded-md font-bold text-sm hover:border-ink-secondary transition-colors duration-300"
              >
                Try live demo
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
