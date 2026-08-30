import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ── helpers ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } },
};

/* ═══════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════ */
function MiniScannerUI() {
  const [p, setP] = useState(72);
  // Simulate progress
  useRef(() => {
    const t = setInterval(() => setP(v => (v >= 98 ? 40 : v + 1)), 160);
    return () => clearInterval(t);
  });

  return (
    <div className="bg-surface-card border border-border-subtle rounded-2xl shadow-xl overflow-hidden w-72">
      {/* browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-raised border-b border-border-subtle">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70"/>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"/>
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70"/>
        </div>
        <div className="flex-1 bg-surface-card rounded-md px-3 py-1 text-[9px] font-mono text-ink-muted text-center">
          fuzzguard.app
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-1.5">Target</p>
          <div className="font-mono text-[11px] text-ink-secondary bg-surface-raised rounded-lg px-3 py-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot shrink-0"/>
            example.com
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-ink-muted">Scanning…</span>
            <span className="text-sm font-black text-ink-primary tabular-nums">{p}%</span>
          </div>
          <div className="h-1.5 bg-surface-raised rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-ink-primary rounded-full"
              animate={{ width: `${p}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[['86', 'Endpoints'], ['15', 'Findings']].map(([v, l]) => (
            <div key={l} className="bg-surface-raised rounded-xl p-3 text-center">
              <p className="text-lg font-black text-ink-primary">{v}</p>
              <p className="text-[8px] text-ink-muted uppercase tracking-wider mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 pb-16">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none"/>

      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center gap-16">
        {/* Text */}
        <div className="flex-1 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted mb-6 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-ink-muted"/>About VulnTest
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-[82px] font-black tracking-[-0.04em] leading-[0.95] text-ink-primary"
          >
            Security testing,<br/>
            <em className="not-italic font-light text-ink-secondary">made</em><br/>
            understandable.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-8 text-base text-ink-secondary leading-relaxed max-w-lg font-light"
          >
            VulnTest is a web fuzzing tool designed to help developers discover common vulnerabilities, understand what went wrong, and generate a clear security report.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.34 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/scanner"
              className="group inline-flex items-center gap-2.5 bg-ink-primary text-surface-card px-7 py-4 rounded-full font-bold text-sm hover:scale-[1.03] transition-transform duration-200 shadow-lg"
            >
              Try the scanner
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14m-7-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Mini Scanner UI */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: -1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="shrink-0 hidden lg:block animate-float"
        >
          <MiniScannerUI />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   WHY FUZZGUARD — large typographic statement
═══════════════════════════════════════════════════ */
const FLOW_STAGES = [
  { label: 'TARGET',    content: 'example.com', sub: null },
  { label: 'DISCOVERY', content: '/login · /search · /api/users · /products', sub: null },
  { label: 'FUZZING',   content: 'Parameters tested', sub: 'SQLi · XSS · Path Traversal' },
  { label: 'FINDING',   content: 'Reflected XSS', sub: 'High · /search?q=' },
  { label: 'REPORT',    content: 'PDF + JSON', sub: 'Severity · Evidence · Fix' },
];

function WhySection() {
  const { ref, inView } = useReveal();

  return (
    <section ref={ref} className="py-32 bg-ink-primary text-surface-card relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)', backgroundSize: '48px 48px' }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-surface-card/40 mb-6 flex items-center gap-3">
            <span className="w-6 h-px bg-surface-card/30"/>Why FuzzGuard
          </p>
          <h2 className="text-5xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95] max-w-3xl">
            Most security tools show you the problem.<br/>
            <span className="text-surface-card/50 font-light italic">FuzzGuard helps you</span><br/>
            understand it.
          </h2>
        </motion.div>

        {/* Visual flow */}
        <div className="flex flex-col items-start max-w-2xl space-y-0">
          {FLOW_STAGES.map((stage, i) => (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
              className="flex items-stretch w-full"
            >
              <div className="flex flex-col items-center mr-6">
                <div className="w-8 h-8 rounded-full bg-surface-card/10 border border-surface-card/20 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-surface-card/60 font-mono">{String(i+1).padStart(2,'0')}</span>
                </div>
                {i < FLOW_STAGES.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                    transition={{ delay: i * 0.1 + 0.5, duration: 0.4 }}
                    className="w-px flex-1 bg-surface-card/20 my-1 origin-top"
                  />
                )}
              </div>
              <div className={`py-3 ${i < FLOW_STAGES.length - 1 ? 'mb-0' : ''}`}>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-surface-card/40 mb-0.5">{stage.label}</p>
                <p className="text-lg font-bold text-surface-card font-mono leading-tight">{stage.content}</p>
                {stage.sub && <p className="text-xs text-surface-card/50 mt-0.5">{stage.sub}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HOW IT WORKS — progressive scanner visualization
═══════════════════════════════════════════════════ */
const HOW_STEPS = [
  {
    num: '01', label: 'Discover',
    title: 'Endpoints are identified.',
    desc: 'The crawler follows links and form actions from the starting URL, building a map of the entire accessible surface.',
    visual: (
      <div className="space-y-1.5">
        {['/login','/search','/api/users','/products','/contact'].map((ep, i) => (
          <motion.div key={ep}
            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-2 font-mono text-[10px] text-ink-secondary bg-surface-raised border border-border-subtle rounded-lg px-3 py-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"/>
            {ep}
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    num: '02', label: 'Test',
    title: 'Common checks are performed.',
    desc: 'Safe, controlled payloads are injected into every parameter. Responses are compared to baseline to detect anomalies.',
    visual: (
      <div className="space-y-2">
        {[
          { ep: '/search?q=', payload: "'OR 1=1--", status: 'testing', type: 'SQLi' },
          { ep: '/search?q=', payload: '<script>x</script>', status: 'found', type: 'XSS' },
          { ep: '/file?n=',   payload: '../../etc/', status: 'safe', type: 'Traversal' },
        ].map((r,i) => (
          <div key={i} className="flex items-center gap-2 text-[10px] bg-surface-raised border border-border-subtle rounded-lg px-3 py-2.5">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${r.status==='found'?'bg-orange-500':r.status==='testing'?'bg-yellow-500 animate-pulse-dot':'bg-border-subtle'}`}/>
            <span className="font-mono text-ink-muted flex-1 truncate">{r.ep}<span className="text-ink-secondary">{r.payload}</span></span>
            <span className={`font-bold uppercase text-[8px] px-1.5 py-0.5 rounded ${r.status==='found'?'badge-high':r.status==='testing'?'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20':''}`}>
              {r.status==='found'?r.type:r.status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '03', label: 'Analyze',
    title: 'Responses reveal the truth.',
    desc: 'The engine compares how the application behaves with and without injected data. Differences in response length, status codes, or body content confirm vulnerabilities.',
    visual: (
      <div className="space-y-3">
        <div className="bg-surface-raised border border-border-subtle rounded-xl p-4">
          <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-3">Response Comparison</p>
          <div className="grid grid-cols-2 gap-3 text-[10px]">
            <div>
              <p className="text-ink-muted mb-1">Baseline</p>
              <div className="font-mono text-ink-secondary bg-surface-card rounded-lg p-2">200 · 1,248 bytes</div>
            </div>
            <div>
              <p className="text-ink-muted mb-1">With payload</p>
              <div className="font-mono text-orange-500 border border-orange-500/20 bg-orange-500/5 rounded-lg p-2">200 · 1,891 bytes</div>
            </div>
          </div>
          <p className="text-[9px] text-ink-secondary mt-3">Δ 643 bytes — XSS reflection detected</p>
        </div>
      </div>
    ),
  },
  {
    num: '04', label: 'Report',
    title: 'Everything in one clear report.',
    desc: 'Findings are ranked by severity, with the exact request that triggered each issue and plain-language guidance for remediation.',
    visual: (
      <div className="bg-surface-raised border border-border-subtle rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border-subtle flex justify-between items-center">
          <span className="text-[9px] font-bold uppercase tracking-wider text-ink-muted">Report Summary</span>
          <span className="text-lg font-black text-emerald-500">87<span className="text-xs text-ink-muted font-normal">/100</span></span>
        </div>
        <div className="p-4 space-y-2">
          {[{sev:'high',t:'Reflected XSS',ep:'/search'},{sev:'medium',t:'Missing CSP',ep:'All'},{sev:'low',t:'X-Frame-Options',ep:'All'}].map((f,i)=>(
            <div key={i} className="flex items-center gap-2.5">
              <span className={`badge-${f.sev} text-[8px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0`}>{f.sev}</span>
              <span className="text-[10px] font-semibold text-ink-primary flex-1">{f.t}</span>
              <span className="font-mono text-[9px] text-ink-muted">{f.ep}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useReveal();

  return (
    <section ref={ref} className="py-32 border-t border-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-ink-muted"/>How It Works
          </p>
          <h2 className="text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-tight text-ink-primary">
            From a URL to a<br/>
            <span className="text-ink-secondary font-light italic">useful security report.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Steps */}
          <div className="lg:w-72 shrink-0 space-y-2">
            {HOW_STEPS.map((step, i) => (
              <motion.button key={step.num} onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 + 0.2 }}
                className={`w-full text-left flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                  active===i ? 'border-ink-primary bg-surface-card shadow-md' : 'border-transparent hover:border-border-subtle hover:bg-surface-card/50'
                }`}
              >
                <span className={`text-xs font-mono font-bold shrink-0 mt-0.5 ${active===i?'text-ink-primary':'text-ink-muted'}`}>{step.num}</span>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${active===i?'text-ink-muted':'text-ink-muted/50'}`}>{step.label}</p>
                  <p className={`text-sm font-bold ${active===i?'text-ink-primary':'text-ink-secondary'}`}>{step.title}</p>
                </div>
                {active===i && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-ink-primary mt-1.5 shrink-0"/>}
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="bg-surface-raised border border-border-subtle rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row gap-8 items-start"
              >
                <div className="flex-1 space-y-4">
                  <p className="text-5xl font-black tracking-[-0.03em] text-ink-primary leading-tight">
                    {HOW_STEPS[active].title}
                  </p>
                  <p className="text-ink-secondary leading-relaxed">{HOW_STEPS[active].desc}</p>
                </div>
                <div className="lg:w-72 w-full shrink-0">
                  {HOW_STEPS[active].visual}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-2 mt-5 px-2">
              {HOW_STEPS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i===active?'w-8 bg-ink-primary':'w-4 bg-border-subtle hover:bg-ink-muted'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SECURITY CHECKS — interactive hover categories
═══════════════════════════════════════════════════ */
const CHECKS = [
  {
    num: '01', label: 'SQL Injection',
    severity: 'critical',
    endpoint: '/api/users?id=',
    detection: 'Boolean-based differential analysis',
    explanation: 'Payloads like OR 1=1 are compared against baseline responses. Length and similarity differences confirm injection.',
  },
  {
    num: '02', label: 'Cross-Site Scripting',
    severity: 'high',
    endpoint: '/search?q=',
    detection: 'Reflection analysis with canary tokens',
    explanation: 'Randomized tokens are injected and the response body is scanned for their reflection, without executing any scripts.',
  },
  {
    num: '03', label: 'Path Traversal',
    severity: 'high',
    endpoint: '/file?name=',
    detection: 'Pattern matching in response body',
    explanation: 'Probes use randomized nonexistent paths with ../ sequences to detect disclosure without accessing real sensitive files.',
  },
  {
    num: '04', label: 'Security Configuration',
    severity: 'medium',
    endpoint: 'All HTTP responses',
    detection: 'Passive header inspection',
    explanation: 'Response headers already fetched during crawling are evaluated for CSP, HSTS, X-Frame-Options, and cookie flags.',
  },
];

function SecurityChecksSection() {
  const [hovered, setHovered] = useState(null);
  const { ref, inView } = useReveal();

  return (
    <section ref={ref} className="py-32 bg-surface-card border-y border-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-ink-muted"/>What We Look For
          </p>
          <h2 className="text-5xl lg:text-6xl font-black tracking-[-0.03em] text-ink-primary">
            What we look for.
          </h2>
        </motion.div>

        <div className="space-y-0 border-t border-border-subtle">
          {CHECKS.map((check, i) => (
            <motion.div
              key={check.num}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`border-b border-border-subtle cursor-pointer transition-all duration-300 ${hovered===i?'bg-surface-bg':''}`}
            >
              <div className="flex items-start lg:items-center gap-6 lg:gap-12 py-8 px-2">
                <span className="text-[10px] font-mono font-bold text-ink-muted shrink-0 pt-1 lg:pt-0">{check.num}</span>
                <div className="flex-1">
                  <h3 className={`text-3xl lg:text-4xl font-black tracking-[-0.02em] transition-colors duration-200 ${hovered===i?'text-ink-primary':'text-ink-secondary'}`}>
                    {check.label}
                  </h3>
                </div>
                <span className={`badge-${check.severity} text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shrink-0 hidden sm:inline-block`}>
                  {check.severity}
                </span>
              </div>

              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-10 pb-8 flex flex-col lg:flex-row gap-6">
                      <div className="flex-1 space-y-1">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-1">Endpoint</p>
                        <p className="font-mono text-sm text-ink-secondary">{check.endpoint}</p>
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-1">Detection Method</p>
                        <p className="text-sm text-ink-secondary font-medium">{check.detection}</p>
                      </div>
                      <div className="flex-[2] space-y-1">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-1">How It Works</p>
                        <p className="text-sm text-ink-secondary leading-relaxed">{check.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   RESPONSIBLE SCANNING — scope diagram
═══════════════════════════════════════════════════ */
function ResponsibleSection() {
  const { ref, inView } = useReveal();

  return (
    <section ref={ref} className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -32 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-72">
              {/* Origin box */}
              <div className="border-2 border-ink-primary rounded-2xl p-6">
                <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-3">Scan scope</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"/>
                  <span className="font-mono text-sm font-bold text-ink-primary">example.com</span>
                </div>
                {/* Allowed paths */}
                <div className="space-y-1.5 ml-4">
                  {['/login', '/search', '/api', '/products'].map((path, i) => (
                    <motion.div key={path}
                      initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.1 + 0.4 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-ink-muted text-[10px]">├──</span>
                      <span className="font-mono text-[11px] text-ink-secondary">{path}</span>
                      <span className="ml-auto text-[8px] font-bold text-emerald-500 uppercase">allowed</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* External domain — blocked */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="mt-3 border border-border-subtle rounded-xl px-4 py-3 flex items-center gap-3 opacity-40"
              >
                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6m0-6 6 6" strokeLinecap="round"/>
                </svg>
                <span className="font-mono text-xs text-ink-muted">external-domain.com</span>
                <span className="ml-auto text-[8px] font-bold text-red-500 uppercase">blocked</span>
              </motion.div>

              {/* Label */}
              <p className="text-[10px] text-ink-muted text-center mt-4">Links outside origin are never followed</p>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 32 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 space-y-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted flex items-center gap-3">
              <span className="w-6 h-px bg-ink-muted"/>Responsible Testing
            </p>
            <h2 className="text-5xl font-black tracking-[-0.03em] leading-tight text-ink-primary">
              Built to test<br/>responsibly.
            </h2>
            <p className="text-ink-secondary leading-relaxed max-w-md">
              FuzzGuard is designed for authorized security testing. The scanner focuses on controlled, non-destructive checks and stays strictly within the target origin.
            </p>
            <ul className="space-y-4">
              {[
                { title: 'Single origin only', desc: 'The crawler never follows links outside the starting domain.' },
                { title: 'No destructive payloads', desc: 'All injections are read-only. No data is written, modified or deleted.' },
                { title: 'Rate limiting built in', desc: 'Requests are throttled to avoid impacting performance of the target.' },
                { title: 'Authorization required', desc: 'The scan will not start without an explicit authorization confirmation.' },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <p className="text-sm font-bold text-ink-primary">{item.title}</p>
                    <p className="text-xs text-ink-secondary">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PHILOSOPHY — 3 large principles
═══════════════════════════════════════════════════ */
const PRINCIPLES = [
  {
    label: 'Controlled',
    body: 'Every test is designed to detect without disrupting. Payloads are non-destructive and authentication endpoints are skipped entirely.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Evidence-based',
    body: 'Every finding includes the exact HTTP request and response that triggered it, so developers can reproduce and understand the issue.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Actionable',
    body: 'Reports explain what was found and what developers can do next — not just a severity score, but a clear path to resolution.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="9"/>
      </svg>
    ),
  },
];

function PhilosophySection() {
  const { ref, inView } = useReveal();

  return (
    <section ref={ref} className="py-32 bg-surface-card border-t border-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-ink-muted"/>Design Philosophy
          </p>
          <h2 className="text-5xl lg:text-6xl font-black tracking-[-0.03em] text-ink-primary leading-tight">
            Simple on the surface.<br/>
            <span className="text-ink-secondary font-light italic">Thoughtful underneath.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-0 border-t border-border-subtle">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 + 0.2 }}
              className={`py-12 ${i<2?'lg:border-r border-border-subtle':''} lg:px-12 first:pl-0 space-y-6`}
            >
              <div className="w-10 h-10 rounded-xl bg-surface-bg border border-border-subtle flex items-center justify-center text-ink-secondary">
                {p.icon}
              </div>
              <h3 className="text-4xl font-black text-ink-primary tracking-tight">{p.label}</h3>
              <p className="text-ink-secondary leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ARCHITECTURE — elegant diagram
═══════════════════════════════════════════════════ */
const ARCH_NODES = [
  { label: 'User', sub: 'Browser / CLI' },
  { label: 'Frontend', sub: 'React + Vite' },
  { label: 'Scanner API', sub: 'Node.js / Express' },
  { label: 'Crawler', sub: 'Endpoint discovery' },
  { label: 'Fuzzing Engine', sub: 'Payload injection' },
  { label: 'Detection', sub: 'Response analysis' },
  { label: 'Report Generator', sub: 'PDF / JSON output' },
];

function ArchitectureSection() {
  const { ref, inView } = useReveal();

  return (
    <section ref={ref} className="py-32 border-t border-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="lg:w-80 shrink-0 space-y-5"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted flex items-center gap-3">
              <span className="w-6 h-px bg-ink-muted"/>Under the Hood
            </p>
            <h2 className="text-4xl font-black tracking-[-0.03em] text-ink-primary leading-tight">
              How the system fits together.
            </h2>
            <p className="text-ink-secondary leading-relaxed text-sm">
              The architecture is intentionally simple: a React frontend communicates with a Node.js backend via REST and SSE (Server-Sent Events), which streams real-time scan progress to the browser.
            </p>
            <div className="space-y-3 pt-4">
              {[
                { q: 'Why SSE?', a: 'Server-Sent Events allow real-time streaming without the complexity of WebSockets.' },
                { q: 'Why boolean SQLi?', a: 'Read-only comparison of responses avoids destructive exploitation while still confirming injection.' },
                { q: 'SSRF protection?', a: 'DNS resolution is validated at socket level before every TCP connection to block private IP access.' },
              ].map(({ q, a }) => (
                <div key={q} className="border-l-2 border-border-subtle pl-4">
                  <p className="text-xs font-bold text-ink-primary mb-0.5">{q}</p>
                  <p className="text-xs text-ink-secondary leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Diagram */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="flex flex-col items-center gap-0">
              {ARCH_NODES.map((node, i) => (
                <motion.div key={node.label}
                  initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className={`border border-border-subtle rounded-2xl px-8 py-4 text-center bg-surface-card shadow-sm min-w-[220px] ${
                    i===0?'bg-ink-primary border-ink-primary':''
                  }`}>
                    <p className={`text-sm font-bold ${i===0?'text-surface-card':'text-ink-primary'}`}>{node.label}</p>
                    <p className={`text-[10px] mt-0.5 ${i===0?'text-surface-card/60':'text-ink-muted'}`}>{node.sub}</p>
                  </div>
                  {i < ARCH_NODES.length - 1 && (
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                        transition={{ delay: i * 0.1 + 0.5, duration: 0.3 }}
                        className="w-px h-6 bg-border-subtle origin-top"
                      />
                      <svg className="w-3 h-3 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14m-7-7 7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════ */
function CTASection() {
  const { ref, inView } = useReveal();
  return (
    <section ref={ref} className="py-32 bg-ink-primary text-surface-card relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)', backgroundSize: '48px 48px' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-surface-card/40 mb-4">Ready to start</p>
          <h2 className="text-5xl font-black tracking-[-0.03em] leading-tight">
            Run an authorized<br/>security test now.
          </h2>
        </div>
        <div className="flex flex-col gap-3 shrink-0">
          <Link to="/scanner"
            className="inline-flex items-center justify-center gap-2.5 bg-surface-card text-ink-primary px-8 py-4 rounded-full font-bold text-sm hover:scale-[1.03] transition-transform duration-200 shadow-xl"
          >
            Open the scanner →
          </Link>
          <p className="text-[11px] text-surface-card/40 text-center">No installation · No agents · No setup</p>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════ */
export function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <WhySection />
      <HowItWorksSection />
      <SecurityChecksSection />
      <ResponsibleSection />
      <PhilosophySection />
      <ArchitectureSection />
      <CTASection />
    </div>
  );
}
