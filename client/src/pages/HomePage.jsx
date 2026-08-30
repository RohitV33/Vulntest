'use client';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────
   UTILS
───────────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

/* ─────────────────────────────────────────────────────
   PRODUCT UI CARDS
───────────────────────────────────────────────────── */
function ScannerCard() {
  return (
    <div className="bg-surface-card border border-border-subtle rounded-2xl shadow-2xl overflow-hidden w-72">
      <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink-muted">New Scan</p>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/60"/>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60"/>
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/60"/>
        </div>
      </div>
      <div className="p-5 space-y-3.5">
        <div className="bg-surface-raised border border-border-subtle rounded-xl px-4 py-3 font-mono text-xs text-ink-secondary">
          https://example.com
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Quick', 'Standard', 'Deep'].map((m,i) => (
            <div key={m} className={`rounded-lg border py-2 text-center text-[10px] font-bold transition-colors cursor-pointer ${i===1 ? 'border-ink-primary bg-ink-primary text-surface-card' : 'border-border-subtle text-ink-muted hover:border-ink-secondary'}`}>{m}</div>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {['XSS','SQLi','Traversal'].map(t => (
            <span key={t} className="text-[9px] font-bold uppercase px-2 py-1 bg-surface-raised border border-border-subtle rounded-full text-ink-secondary">{t}</span>
          ))}
        </div>
        <button className="w-full bg-ink-primary text-surface-card rounded-xl py-2.5 text-xs font-bold hover:opacity-90 transition-opacity">
          Launch assessment →
        </button>
      </div>
    </div>
  );
}

function LiveScanCard() {
  const [p, setP] = useState(68);
  useEffect(() => {
    const t = setInterval(() => setP(v => v >= 98 ? 68 : v + 1), 120);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-surface-card border border-border-subtle rounded-2xl shadow-2xl w-64 overflow-hidden">
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot"/>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-500">Scanning</p>
        </div>
        <p className="font-mono text-xs text-ink-secondary">example.com</p>
      </div>
      <div className="px-5 pb-2">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] text-ink-muted">Progress</span>
          <span className="text-sm font-bold text-ink-primary tabular-nums">{p}%</span>
        </div>
        <div className="h-1.5 bg-surface-raised rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-ink-primary rounded-full progress-shimmer"
            style={{ width: `${p}%` }}
            animate={{ width: `${p}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
      <div className="px-5 pb-5 pt-3 grid grid-cols-2 gap-3">
        {[['1,284', 'Requests'], ['86', 'Endpoints']].map(([v, l]) => (
          <div key={l} className="bg-surface-raised rounded-xl p-2.5 text-center">
            <p className="text-base font-bold text-ink-primary tabular-nums">{v}</p>
            <p className="text-[9px] text-ink-muted uppercase tracking-wider mt-0.5">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreCard() {
  const score = 87;
  const r = 28; const circ = 2*Math.PI*r;
  return (
    <div className="bg-surface-card border border-border-subtle rounded-2xl shadow-2xl p-5 w-48">
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink-muted mb-4">Security Score</p>
      <div className="flex items-center justify-center mb-3">
        <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
          <circle cx="40" cy="40" r={r} fill="none" stroke="currentColor" strokeWidth="5" className="text-border-subtle"/>
          <circle cx="40" cy="40" r={r} fill="none" stroke="#10B981" strokeWidth="5"
            strokeDasharray={`${(score/100)*circ} ${circ}`} strokeLinecap="round"/>
          <text x="40" y="46" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor"
            className="text-ink-primary" style={{transform:'rotate(90deg)',transformOrigin:'40px 40px'}}>
            {score}
          </text>
        </svg>
      </div>
      <div className="flex gap-1 mb-1.5">
        {[...Array(10)].map((_,i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i<8?'bg-emerald-500':'bg-border-subtle'}`}/>
        ))}
      </div>
      <p className="text-[10px] text-ink-secondary font-medium">Good — 1 critical open</p>
    </div>
  );
}

function FindingCard() {
  return (
    <div className="bg-surface-card border border-border-subtle rounded-2xl shadow-2xl p-4 w-60">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge-high text-[9px] font-bold uppercase px-2 py-0.5 rounded-md tracking-wide">High</span>
        <span className="text-xs font-semibold text-ink-primary">Reflected XSS</span>
      </div>
      <div className="bg-surface-raised rounded-lg px-3 py-2 font-mono text-[10px] text-ink-secondary mb-3">
        /search?q=&lt;script&gt;
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-ink-muted">Parameter: q</span>
        <button className="text-[10px] font-bold text-accent-blue hover:underline">View →</button>
      </div>
    </div>
  );
}

function ReportCard() {
  return (
    <div className="bg-surface-card border border-border-subtle rounded-2xl shadow-2xl p-5 w-56">
      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink-muted mb-1">Security Report</p>
      <p className="text-sm font-bold text-ink-primary mb-0.5">example.com</p>
      <p className="text-[10px] text-ink-muted mb-4">15 findings · 2 min ago</p>
      <div className="space-y-2">
        <button className="w-full flex items-center gap-2 px-3 py-2 border border-border-subtle rounded-xl text-[10px] font-bold text-ink-primary hover:border-ink-secondary transition-colors">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download PDF
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 border border-border-subtle rounded-xl text-[10px] font-bold text-ink-primary hover:border-ink-secondary transition-colors">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export JSON
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   SECTION: HERO
───────────────────────────────────────────────────── */
function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -80]);
  const y2 = useTransform(scrollY, [0, 600], [0, 40]);
  const y3 = useTransform(scrollY, [0, 600], [0, -40]);

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show:   { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      {/* Radial light bleed */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #0a0a0b 60%, transparent 100%)' }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between max-w-[1400px] mx-auto w-full px-6 lg:px-12 pt-28 lg:pt-36 pb-16 gap-12">
        {/* LEFT — Typography */}
        <div className="flex-1 max-w-2xl">
          <motion.p
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.5 }}
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted mb-6 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-ink-muted"/>
            Web Application Security
          </motion.p>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-[88px] font-black tracking-[-0.04em] leading-[0.95] text-ink-primary"
          >
            Find what<br/>
            <em className="not-italic font-light text-ink-secondary">attackers</em><br/>
            find first.
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-base text-ink-secondary leading-relaxed max-w-lg font-light"
          >
            Automated fuzzing that discovers common web vulnerabilities before they become real problems. Enter a URL, pick a scan mode, get a clear report.
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/scanner"
              className="group inline-flex items-center gap-2.5 bg-ink-primary text-surface-card px-7 py-4 rounded-full font-bold text-sm hover:scale-[1.03] transition-transform duration-200 shadow-lg"
            >
              Start a scan
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-secondary hover:text-ink-primary transition-colors border-b border-transparent hover:border-ink-secondary pb-0.5"
            >
              Explore VulnTest
            </Link>
          </motion.div>

          {/* Stat bar */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-14 flex items-center gap-8 pt-8 border-t border-border-subtle"
          >
            {[['6', 'Vulnerability checks'], ['3', 'Scan modes'], ['PDF + JSON', 'Report exports']].map(([v, l]) => (
              <div key={l}>
                <p className="text-2xl font-black text-ink-primary">{v}</p>
                <p className="text-[11px] text-ink-muted mt-0.5">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Floating card composition */}
        <div className="relative flex-1 hidden lg:block h-[640px] select-none pointer-events-none">
          {/* Scanner card — top left */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute top-0 left-8 animate-float"
          >
            <ScannerCard />
          </motion.div>

          {/* Live scan — middle right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="absolute top-48 right-0 animate-float2"
          >
            <LiveScanCard />
          </motion.div>

          {/* Score card — bottom left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="absolute bottom-32 left-4 animate-float"
          >
            <ScoreCard />
          </motion.div>

          {/* Finding card — middle center */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="absolute top-72 left-48 animate-float2"
            style={{ '--r': '1.5deg' }}
          >
            <FindingCard />
          </motion.div>

          {/* Report card — bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="absolute bottom-4 right-8 animate-float"
            style={{ '--r': '-1deg' }}
          >
            <ReportCard />
          </motion.div>

          {/* Connector line SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
            <path d="M 130 120 Q 280 300 200 480" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" className="text-border-subtle" opacity="0.6"/>
          </svg>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-muted"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14m-7-7 7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   SECTION: HOW IT WORKS
───────────────────────────────────────────────────── */
const WORKFLOW_STEPS = [
  {
    num: '01', label: 'Target',
    title: 'Enter a URL',
    desc: 'Paste any web application URL. FuzzGuard verifies connectivity and reads robots.txt to understand the site structure.',
    visual: (
      <div className="bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-lg">
        <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-3">Target URL</p>
        <div className="flex items-center gap-2 bg-surface-raised border border-border-subtle rounded-xl px-4 py-3">
          <svg className="w-3.5 h-3.5 text-ink-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/></svg>
          <span className="font-mono text-xs text-ink-secondary">https://example.com</span>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="text-[9px] font-bold px-2 py-1 bg-ink-primary text-surface-card rounded-full">Connected ✓</span>
          <span className="text-[9px] px-2 py-1 border border-border-subtle rounded-full text-ink-muted">robots.txt parsed</span>
        </div>
      </div>
    ),
  },
  {
    num: '02', label: 'Discovery',
    title: 'Map all endpoints',
    desc: 'The crawler follows links, forms, and API routes to build a complete map of the application surface.',
    visual: (
      <div className="bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-lg">
        <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-3">Discovered Endpoints</p>
        <div className="space-y-1.5">
          {['/login','/api/users','/search','/products','/admin/settings'].map((ep,i) => (
            <motion.div key={ep} initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.1+0.2}}
              className="flex items-center gap-2.5 font-mono text-[10px] text-ink-secondary bg-surface-raised rounded-lg px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"/>
              {ep}
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: '03', label: 'Fuzzing',
    title: 'Test each parameter',
    desc: 'Safe, non-destructive payloads are injected into every input field, URL parameter, and form to trigger vulnerability responses.',
    visual: (
      <div className="bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-lg">
        <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-3">Payload Testing</p>
        <div className="space-y-2">
          {[
            {endpoint:'/search?q=', payload:"'OR 1=1--", check:'SQLi', status:'testing'},
            {endpoint:'/search?q=', payload:'<script>alert(1)', check:'XSS', status:'found'},
            {endpoint:'/api/users/', payload:'../../../etc/passwd', check:'Traversal', status:'safe'},
          ].map((r,i) => (
            <div key={i} className="flex items-center gap-2 text-[10px]">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${r.status==='found'?'bg-orange-500':r.status==='testing'?'bg-yellow-500 animate-pulse-dot':'bg-surface-raised border border-border-subtle'}`}/>
              <span className="font-mono text-ink-muted truncate flex-1">{r.endpoint}<span className="text-ink-secondary">{r.payload}</span></span>
              <span className={`font-bold uppercase text-[8px] px-1.5 py-0.5 rounded ${r.status==='found'?'badge-high':r.status==='testing'?'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20':''}`}>{r.status==='found'?r.check:r.status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: '04', label: 'Detection',
    title: 'Vulnerabilities surface',
    desc: 'FuzzGuard identifies the confirmed vulnerability, its location, severity, and the exact payload that triggered it.',
    visual: (
      <div className="bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-lg">
        <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-3">Findings</p>
        <div className="space-y-2.5">
          {[
            {sev:'high', type:'Reflected XSS', ep:'/search'},
            {sev:'medium', type:'Missing CSP', ep:'All pages'},
            {sev:'low', type:'X-Frame-Options', ep:'All pages'},
          ].map((f,i) => (
            <motion.div key={i} initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.12+0.1}}
              className="flex items-center gap-2.5">
              <span className={`badge-${f.sev} text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-md shrink-0`}>{f.sev}</span>
              <span className="text-xs font-semibold text-ink-primary flex-1">{f.type}</span>
              <span className="font-mono text-[9px] text-ink-muted">{f.ep}</span>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: '05', label: 'Report',
    title: 'One clear report',
    desc: 'All findings compiled into a structured report with severity scores, reproduction steps, and remediation guidance.',
    visual: (
      <div className="bg-surface-card border border-border-subtle rounded-2xl p-5 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-0.5">Security Report</p>
            <p className="text-sm font-bold text-ink-primary">example.com</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-emerald-500">87</p>
            <p className="text-[9px] text-ink-muted">/100</p>
          </div>
        </div>
        <div className="space-y-1.5 mb-4">
          {[{sev:'High',n:1,c:'bg-red-500'},{sev:'Medium',n:3,c:'bg-yellow-500'},{sev:'Low',n:4,c:'bg-blue-500'}].map(({sev,n,c}) => (
            <div key={sev} className="flex items-center gap-2 text-[10px]">
              <span className="text-ink-secondary w-14">{sev}</span>
              <div className="flex-1 h-1.5 bg-surface-raised rounded-full overflow-hidden"><div className={`h-full rounded-full ${c}`} style={{width:`${(n/8)*100}%`}}/></div>
              <span className="font-bold text-ink-primary w-4 text-right">{n}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="flex-1 text-[9px] font-bold border border-border-subtle rounded-lg py-2 hover:border-ink-secondary transition-colors">PDF</button>
          <button className="flex-1 text-[9px] font-bold border border-border-subtle rounded-lg py-2 hover:border-ink-secondary transition-colors">JSON</button>
        </div>
      </div>
    ),
  },
];

function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useReveal();

  return (
    <section ref={ref} className="py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-ink-muted"/>How It Works
          </p>
          <h2 className="text-5xl lg:text-6xl font-black tracking-[-0.03em] text-ink-primary leading-tight">
            From URL to<br/>security report.
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Step list */}
          <div className="lg:w-80 space-y-2 shrink-0">
            {WORKFLOW_STEPS.map((step, i) => (
              <motion.button
                key={step.num}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 + 0.2 }}
                className={`w-full text-left flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                  active === i
                    ? 'border-ink-primary bg-surface-card shadow-lg'
                    : 'border-transparent hover:border-border-subtle hover:bg-surface-card/50'
                }`}
              >
                <span className={`text-xs font-mono font-bold shrink-0 mt-0.5 ${active===i?'text-ink-primary':'text-ink-muted'}`}>{step.num}</span>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${active===i?'text-ink-muted':'text-ink-muted/60'}`}>{step.label}</p>
                  <p className={`text-sm font-bold ${active===i?'text-ink-primary':'text-ink-secondary'}`}>{step.title}</p>
                </div>
                {active === i && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-ink-primary mt-1.5 shrink-0"/>}
              </motion.button>
            ))}
          </div>

          {/* Visual panel */}
          <div className="flex-1 relative min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="bg-surface-raised border border-border-subtle rounded-3xl p-8 lg:p-12 h-full flex flex-col gap-8 lg:flex-row lg:items-center"
              >
                <div className="flex-1 space-y-4">
                  <p className="text-4xl font-black text-ink-primary tracking-tight leading-tight">
                    {WORKFLOW_STEPS[active].title}
                  </p>
                  <p className="text-ink-secondary leading-relaxed">{WORKFLOW_STEPS[active].desc}</p>
                </div>
                <div className="lg:w-72 shrink-0">
                  {WORKFLOW_STEPS[active].visual}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Step progress dots */}
            <div className="flex gap-2 mt-6 px-2">
              {WORKFLOW_STEPS.map((_, i) => (
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

/* ─────────────────────────────────────────────────────
   SECTION: PRODUCT SHOWCASE (large browser mock)
───────────────────────────────────────────────────── */
function ProductShowcase() {
  const { ref, inView } = useReveal();
  const { scrollY } = useScroll();
  const rot = useTransform(scrollY, [400, 1200], [4, 0]);

  return (
    <section ref={ref} className="py-32 bg-surface-card border-y border-border-subtle relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none"/>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-ink-muted"/>The Scanner
          </p>
          <h2 className="text-5xl lg:text-6xl font-black tracking-[-0.03em] text-ink-primary">
            Security testing<br/>
            <span className="text-ink-secondary font-light italic">without the noise.</span>
          </h2>
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ rotateX: rot, transformPerspective: 1200 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Browser chrome */}
          <div className="bg-surface-card border border-border-subtle rounded-2xl shadow-2xl overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-3 px-5 py-3.5 bg-surface-raised border-b border-border-subtle">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400/80"/>
                <span className="w-3 h-3 rounded-full bg-yellow-400/80"/>
                <span className="w-3 h-3 rounded-full bg-green-400/80"/>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-surface-card border border-border-subtle rounded-lg px-4 py-1.5 flex items-center gap-2 w-64">
                  <svg className="w-3 h-3 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-[10px] text-ink-muted font-mono">fuzzguard.app/scanner</span>
                </div>
              </div>
            </div>

            {/* App content */}
            <div className="p-8 grid lg:grid-cols-5 gap-8">
              {/* Left — scanner form */}
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-2">Target URL</p>
                  <div className="bg-surface-raised border border-ink-primary/40 rounded-xl px-4 py-3 font-mono text-xs text-ink-secondary flex items-center gap-2">
                    <svg className="w-3 h-3 text-ink-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/></svg>
                    https://example.com
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-2">Scan Depth</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['Quick','Standard','Deep'].map((m,i) => (
                      <div key={m} className={`text-center py-2 rounded-lg border text-[9px] font-bold cursor-pointer ${i===1?'bg-ink-primary text-surface-card border-ink-primary':'border-border-subtle text-ink-muted'}`}>{m}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-2">Checks</p>
                  <div className="space-y-1.5">
                    {['SQL Injection','Cross-Site Scripting','Path Traversal'].map(c => (
                      <div key={c} className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-sm bg-ink-primary border border-ink-primary flex items-center justify-center">
                          <svg className="w-2 h-2 text-surface-card" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <span className="text-[10px] text-ink-secondary">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-ink-primary text-surface-card rounded-xl py-3 text-xs font-bold">
                  Launch assessment →
                </button>
              </div>

              {/* Right — results */}
              <div className="lg:col-span-3 space-y-4">
                {/* Progress */}
                <div className="bg-surface-raised border border-border-subtle rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse-dot"/>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-500">Live</span>
                    </div>
                    <span className="text-sm font-black text-ink-primary tabular-nums">86%</span>
                  </div>
                  <div className="h-1.5 bg-surface-card rounded-full overflow-hidden">
                    <div className="h-full w-[86%] bg-ink-primary rounded-full progress-shimmer"/>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {[['1,284','Requests'],['86','Endpoints'],['15','Findings'],['4:32','Elapsed']].map(([v,l]) => (
                      <div key={l} className="text-center">
                        <p className="text-sm font-bold text-ink-primary tabular-nums">{v}</p>
                        <p className="text-[8px] text-ink-muted uppercase tracking-wider mt-0.5">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Findings table */}
                <div className="bg-surface-raised border border-border-subtle rounded-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-border-subtle">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted">Findings</p>
                  </div>
                  <table className="w-full text-left">
                    <tbody>
                      {[
                        { sev:'high', type:'Reflected XSS', url:'/search?q=', m:'GET' },
                        { sev:'medium', type:'Missing CSP', url:'All pages', m:'—' },
                        { sev:'low', type:'X-Frame-Options', url:'All pages', m:'—' },
                      ].map((f,i) => (
                        <tr key={i} className="border-b border-border-subtle/50 last:border-0">
                          <td className="px-4 py-2.5">
                            <span className={`badge-${f.sev} text-[8px] font-bold uppercase px-1.5 py-0.5 rounded`}>{f.sev}</span>
                          </td>
                          <td className="px-3 py-2.5 text-[10px] font-semibold text-ink-primary">{f.type}</td>
                          <td className="px-3 py-2.5 font-mono text-[9px] text-ink-muted">{f.url}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Floating overlapping elements */}
          <div className="absolute -top-6 -right-10 animate-float2 pointer-events-none hidden lg:block">
            <ScoreCard />
          </div>
          <div className="absolute -bottom-8 -left-8 animate-float pointer-events-none hidden lg:block">
            <ReportCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   SECTION: VULNERABILITY EXPLORER
───────────────────────────────────────────────────── */
const VULNS = [
  {
    id: 'sqli',
    label: 'SQL Injection',
    severity: 'critical',
    short: 'Attacker injects SQL code into input fields to manipulate the database.',
    endpoint: '/api/users?id=',
    payload: "1' OR '1'='1",
    impact: 'Full database read/write access, authentication bypass, data exfiltration.',
    fix: 'Use prepared statements or parameterized queries. Never concatenate user input into SQL strings.',
  },
  {
    id: 'xss',
    label: 'Cross-Site Scripting',
    severity: 'high',
    short: 'Malicious scripts injected into web pages and executed in victims\' browsers.',
    endpoint: '/search?q=',
    payload: '<script>document.cookie</script>',
    impact: 'Session hijacking, credential theft, defacement.',
    fix: 'Escape all user-supplied output. Implement a strong Content Security Policy.',
  },
  {
    id: 'traversal',
    label: 'Path Traversal',
    severity: 'high',
    short: 'Attacker accesses files outside the intended directory using ../ sequences.',
    endpoint: '/file?name=',
    payload: '../../../etc/passwd',
    impact: 'Exposure of sensitive server files including credentials and configuration.',
    fix: 'Validate and sanitize file paths. Use allowlists for permitted file locations.',
  },
  {
    id: 'headers',
    label: 'Security Headers',
    severity: 'medium',
    short: 'Missing HTTP headers that browsers use to enforce security policies.',
    endpoint: 'All responses',
    payload: 'Missing: CSP, HSTS, X-Frame-Options',
    impact: 'Enables clickjacking, MIME sniffing, and man-in-the-middle attacks.',
    fix: 'Add Content-Security-Policy, Strict-Transport-Security, and X-Frame-Options headers.',
  },
];

function VulnerabilitySection() {
  const [active, setActive] = useState('xss');
  const { ref, inView } = useReveal();
  const current = VULNS.find(v => v.id === active);

  return (
    <section ref={ref} className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-ink-muted"/>What We Detect
          </p>
          <h2 className="text-5xl lg:text-6xl font-black tracking-[-0.03em] text-ink-primary leading-tight">
            See what's hiding<br/>
            <span className="text-ink-secondary font-light">in your application.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Vuln selector */}
          <div className="lg:w-72 shrink-0 space-y-2">
            {VULNS.map((v, i) => (
              <motion.button
                key={v.id}
                onClick={() => setActive(v.id)}
                initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.07 + 0.2 }}
                className={`w-full text-left flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200 ${
                  active === v.id
                    ? 'border-ink-primary bg-surface-card shadow-lg'
                    : 'border-border-subtle/50 hover:border-border-subtle hover:bg-surface-card/50'
                }`}
              >
                <span className={`badge-${v.severity} text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-md shrink-0`}>{v.severity}</span>
                <span className={`text-sm font-bold ${active===v.id?'text-ink-primary':'text-ink-secondary'}`}>{v.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-surface-raised border border-border-subtle rounded-3xl p-8 h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className={`badge-${current.severity} text-[9px] font-bold uppercase px-2.5 py-1 rounded-full inline-block mb-3`}>{current.severity}</span>
                    <h3 className="text-3xl font-black text-ink-primary">{current.label}</h3>
                    <p className="text-ink-secondary mt-2 max-w-lg">{current.short}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Payload demo */}
                  <div className="bg-surface-card border border-border-subtle rounded-2xl p-5">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-3">Example Payload</p>
                    <div className="font-mono text-[10px] text-ink-secondary bg-surface-raised rounded-xl p-4 break-all leading-relaxed">
                      <span className="text-ink-muted">{current.endpoint}</span>
                      <span className="text-orange-500 font-bold">{current.payload}</span>
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="bg-surface-card border border-border-subtle rounded-2xl p-5">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-3">Impact</p>
                    <p className="text-xs text-ink-secondary leading-relaxed">{current.impact}</p>
                  </div>

                  {/* Fix — full width */}
                  <div className="md:col-span-2 bg-emerald-500/8 border border-emerald-500/20 rounded-2xl p-5">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 mb-3">How to Fix</p>
                    <p className="text-xs text-ink-secondary leading-relaxed">{current.fix}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   SECTION: REPORT PREVIEW
───────────────────────────────────────────────────── */
function ReportSection() {
  const { ref, inView } = useReveal();

  return (
    <section ref={ref} className="py-32 bg-surface-card border-y border-border-subtle overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Report visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex-1 relative min-h-[480px] w-full"
          >
            {/* Back layers */}
            <div className="absolute top-6 left-6 right-6 bg-surface-raised border border-border-subtle rounded-2xl h-72 rotate-[-3deg] shadow-lg"/>
            <div className="absolute top-3 left-3 right-3 bg-surface-card border border-border-subtle rounded-2xl h-72 rotate-[-1.5deg] shadow-xl"/>

            {/* Main report card */}
            <div className="relative bg-surface-card border border-border-subtle rounded-2xl shadow-2xl p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-muted mb-2">FuzzGuard Security Report</p>
                  <h4 className="text-xl font-black text-ink-primary">example.com</h4>
                  <p className="text-xs text-ink-muted mt-1">Assessed Aug 30, 2026 · Standard Scan</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-emerald-500">87</p>
                  <p className="text-[10px] text-ink-muted">/100 score</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[['1', 'Critical'], ['3', 'High'], ['4', 'Medium']].map(([n, l]) => (
                  <div key={l} className="bg-surface-raised border border-border-subtle rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-ink-primary">{n}</p>
                    <p className="text-[9px] text-ink-muted mt-0.5">{l}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                {[
                  { sev: 'critical', type: 'SQL Injection', ep: '/api/login' },
                  { sev: 'high', type: 'Reflected XSS', ep: '/search' },
                  { sev: 'medium', type: 'Missing HSTS', ep: 'All pages' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 bg-surface-raised rounded-xl px-4 py-2.5">
                    <span className={`badge-${f.sev} text-[8px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0`}>{f.sev}</span>
                    <span className="text-xs font-semibold text-ink-primary flex-1">{f.type}</span>
                    <span className="font-mono text-[9px] text-ink-muted">{f.ep}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-ink-primary text-surface-card rounded-xl py-3 text-xs font-bold hover:opacity-90 transition-opacity">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-border-subtle text-ink-primary rounded-xl py-3 text-xs font-bold hover:border-ink-secondary transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Export JSON
                </button>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 space-y-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted flex items-center gap-3">
              <span className="w-6 h-px bg-ink-muted"/>Reports
            </p>
            <h2 className="text-5xl font-black tracking-[-0.03em] text-ink-primary leading-tight">
              Everything you<br/>found. One clear<br/>report.
            </h2>
            <p className="text-ink-secondary leading-relaxed max-w-md">
              Every scan produces a structured security report with severity scores, vulnerable endpoints, reproduction steps, and actionable remediation guidance.
            </p>
            <ul className="space-y-3">
              {[
                'Severity-ranked findings list',
                'Exact payload that triggered each issue',
                'Remediation guidance per finding',
                'PDF and JSON export formats',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink-secondary">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/scanner"
              className="inline-flex items-center gap-2.5 bg-ink-primary text-surface-card px-7 py-4 rounded-full font-bold text-sm hover:scale-[1.03] transition-transform duration-200 shadow-lg"
            >
              Generate your first report
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   SECTION: CTA
───────────────────────────────────────────────────── */
function CTASection() {
  const { ref, inView } = useReveal();

  return (
    <section ref={ref} className="py-40 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none"/>
      <motion.div
        initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted mb-6 flex items-center justify-center gap-3">
          <span className="w-6 h-px bg-ink-muted"/>Get Started
        </p>
        <h2 className="text-6xl lg:text-7xl font-black tracking-[-0.04em] text-ink-primary leading-[0.95] mb-8">
          Ready to secure<br/>your application?
        </h2>
        <p className="text-lg text-ink-secondary font-light mb-12 max-w-lg mx-auto">
          Enter a URL, run a scan, get a security report. No installation, no agents, no configuration.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/scanner"
            className="group inline-flex items-center gap-2.5 bg-ink-primary text-surface-card px-8 py-5 rounded-full font-bold text-base hover:scale-[1.03] transition-transform duration-200 shadow-xl"
          >
            Start your first scan
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-5 rounded-full font-bold text-base border border-border-subtle text-ink-secondary hover:text-ink-primary hover:border-ink-secondary transition-colors"
          >
            Create free account
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────────────────── */
export function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <HowItWorksSection />
      <ProductShowcase />
      <VulnerabilitySection />
      <ReportSection />
      <CTASection />
    </div>
  );
}
