import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useScanHistory } from '../hooks/useScanHistory.js';

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

/* ── Badge helper ── */
const SEV_CLASS = {
  critical: 'badge-critical',
  high:     'badge-high',
  medium:   'badge-medium',
  low:      'badge-low',
  info:     'badge-info',
};

function SevBadge({ sev }) {
  return (
    <span className={`${SEV_CLASS[sev] ?? 'badge-info'} text-[9px] font-bold uppercase px-2 py-0.5 rounded-md`}>
      {sev}
    </span>
  );
}

/* ── Score ring ── */
function ScoreRing({ score, size = 60 }) {
  const r = size * 0.4;
  const circ = 2 * Math.PI * r;
  const color = score >= 80 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" strokeWidth="4" className="text-border-subtle"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={`${(score/100)*circ} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      <text x={size/2} y={size/2+5} textAnchor="middle" fontSize={size*0.22} fontWeight="800"
        fill="currentColor" className="text-ink-primary"
        style={{ transform: `rotate(90deg)`, transformOrigin: `${size/2}px ${size/2}px` }}>
        {score}
      </text>
    </svg>
  );
}

/* ── Export helpers ── */
function exportJson(scan) {
  const uri = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(scan, null, 2));
  const a = document.createElement('a');
  a.href = uri;
  a.download = `fuzzguard_${scan.id ?? 'report'}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/* ── Report detail panel ── */
function ReportDetail({ scan, onClose }) {
  const findings = scan?.findings ?? [];
  const sevCounts = {
    critical: findings.filter(f => f.severity === 'critical').length,
    high:     findings.filter(f => f.severity === 'high').length,
    medium:   findings.filter(f => f.severity === 'medium').length,
    low:      findings.filter(f => f.severity === 'low').length,
  };
  const score = Math.max(0, 100 - (sevCounts.critical*15 + sevCounts.high*10 + sevCounts.medium*5 + sevCounts.low*2));
  const [tab, setTab] = useState('findings');

  if (!scan) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-ink-primary/40 backdrop-blur-sm flex items-end lg:items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
          className="bg-surface-card border border-border-subtle rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-7 border-b border-border-subtle">
            <div className="flex items-center gap-5">
              <ScoreRing score={score} size={64} />
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-muted mb-1">Security Report</p>
                <p className="text-lg font-bold text-ink-primary font-mono truncate max-w-xs">{scan.target}</p>
                <p className="text-xs text-ink-muted mt-0.5">
                  {new Date(scan.startedAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
                  {' · '}{scan.status}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-ink-secondary hover:text-ink-primary hover:bg-surface-bg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/></svg>
            </button>
          </div>

          {/* Severity bar */}
          <div className="px-7 py-4 border-b border-border-subtle grid grid-cols-4 gap-4">
            {Object.entries(sevCounts).map(([sev, n]) => (
              <div key={sev} className={`rounded-xl border p-3 text-center ${SEV_CLASS[sev]}`}>
                <p className="text-xl font-black">{n}</p>
                <p className="text-[9px] font-bold uppercase mt-0.5 capitalize opacity-80">{sev}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-7 pt-4 border-b border-border-subtle pb-0">
            {['findings', 'metadata'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 pb-3 text-xs font-bold capitalize border-b-2 transition-colors ${tab===t?'border-ink-primary text-ink-primary':'border-transparent text-ink-muted hover:text-ink-secondary'}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-7">
            {tab === 'findings' ? (
              findings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p className="text-sm font-bold text-ink-primary">No vulnerabilities found</p>
                  <p className="text-xs text-ink-muted mt-1">This target passed all security checks.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {findings.map((f, i) => (
                    <div key={f.id ?? i} className="flex items-center gap-3 bg-surface-bg border border-border-subtle rounded-xl px-4 py-3">
                      <SevBadge sev={f.severity} />
                      <span className="text-sm font-semibold text-ink-primary flex-1">{f.type}</span>
                      <span className="font-mono text-[10px] text-ink-muted truncate max-w-[160px]">{f.url}</span>
                      <span className="text-[9px] font-bold uppercase text-ink-muted border border-border-subtle px-1.5 py-0.5 rounded-md">{f.method ?? 'GET'}</span>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="space-y-4 text-sm">
                {[
                  { label: 'Scan ID',     value: scan.id },
                  { label: 'Target',      value: scan.target },
                  { label: 'Status',      value: scan.status },
                  { label: 'Started',     value: scan.startedAt ? new Date(scan.startedAt).toLocaleString() : '—' },
                  { label: 'Completed',   value: scan.completedAt ? new Date(scan.completedAt).toLocaleString() : '—' },
                  { label: 'Requests',    value: scan.statistics?.requests ?? '—' },
                  { label: 'Endpoints',   value: scan.statistics?.endpoints ?? '—' },
                  { label: 'Findings',    value: findings.length },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-4 border-b border-border-subtle/50 pb-4 last:border-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted w-28 shrink-0 mt-0.5">{label}</span>
                    <span className="text-ink-secondary font-mono text-xs break-all">{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-border-subtle flex gap-3">
            <button onClick={() => exportJson(scan)}
              className="flex-1 flex items-center justify-center gap-2 border border-border-subtle text-ink-primary bg-surface-bg rounded-xl py-3 text-xs font-bold hover:border-ink-secondary transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export JSON
            </button>
            <button onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-2 bg-ink-primary text-surface-card rounded-xl py-3 text-xs font-bold hover:opacity-90 transition-opacity">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Print PDF
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export function ReportsPage() {
  const { history: scans } = useScanHistory();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const { ref, inView } = useReveal();

  const filtered = (scans ?? []).filter(s =>
    !search || s.target?.toLowerCase().includes(search.toLowerCase())
  );

  const total = filtered.length;
  const completed = filtered.filter(s => s.status === 'completed').length;
  const totalFindings = filtered.reduce((acc, s) => acc + (s.findings?.length ?? 0), 0);
  const avgScore = completed > 0
    ? Math.round(filtered.filter(s => s.status === 'completed').reduce((acc, s) => {
        const f = s.findings ?? [];
        const sc = Math.max(0, 100 - (
          f.filter(x => x.severity==='critical').length*15 +
          f.filter(x => x.severity==='high').length*10 +
          f.filter(x => x.severity==='medium').length*5 +
          f.filter(x => x.severity==='low').length*2
        ));
        return acc + sc;
      }, 0) / completed)
    : null;

  return (
    <div className="w-full overflow-x-hidden min-h-screen bg-surface-bg pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink-muted mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-ink-muted"/>Reports
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1 className="text-5xl sm:text-6xl font-black tracking-[-0.03em] text-ink-primary leading-[0.95]">
              Your scan<br/>history.
            </h1>
            <Link to="/scanner"
              className="inline-flex items-center gap-2 bg-ink-primary text-surface-card px-6 py-3.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap self-start sm:self-auto"
            >
              + New scan
            </Link>
          </div>
        </motion.div>

        {/* Summary metrics */}
        {total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
          >
            {[
              { label: 'Total Reports',   value: total },
              { label: 'Completed',       value: completed },
              { label: 'Total Findings',  value: totalFindings },
              { label: 'Avg Score',       value: avgScore != null ? `${avgScore}/100` : '—' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-surface-card border border-border-subtle rounded-2xl p-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-2">{label}</p>
                <p className="text-3xl font-black text-ink-primary tabular-nums">{value}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Search */}
        {total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="relative mb-6"
          >
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search by target URL…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-sm bg-surface-card border border-border-subtle rounded-xl pl-11 pr-4 py-3 text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:border-ink-secondary focus:ring-2 focus:ring-ink-primary/10 transition-all font-mono"
            />
          </motion.div>
        )}

        {/* Report cards */}
        <div ref={ref}>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              {/* Empty state illustration */}
              <div className="relative mb-8">
                <div className="w-32 h-40 border-2 border-dashed border-border-subtle rounded-2xl flex flex-col items-center justify-center gap-2">
                  <svg className="w-8 h-8 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[9px] text-ink-muted uppercase tracking-wider font-bold">No reports</span>
                </div>
                {/* Decorative mini card behind */}
                <div className="absolute -top-3 -right-3 w-24 h-32 border border-border-subtle rounded-2xl bg-surface-card -z-10 rotate-6"/>
              </div>
              <h2 className="text-2xl font-black text-ink-primary mb-2">No reports yet.</h2>
              <p className="text-ink-secondary text-sm mb-8 max-w-xs">
                {search
                  ? `No reports match "${search}". Try a different search.`
                  : 'Run your first scan to generate a security report.'}
              </p>
              {!search && (
                <Link to="/scanner"
                  className="inline-flex items-center gap-2 bg-ink-primary text-surface-card px-7 py-4 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Start a scan →
                </Link>
              )}
            </motion.div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((scan, i) => {
                const findings = scan.findings ?? [];
                const sevCounts = {
                  critical: findings.filter(f => f.severity === 'critical').length,
                  high:     findings.filter(f => f.severity === 'high').length,
                  medium:   findings.filter(f => f.severity === 'medium').length,
                  low:      findings.filter(f => f.severity === 'low').length,
                };
                const score = Math.max(0, 100 - (sevCounts.critical*15 + sevCounts.high*10 + sevCounts.medium*5 + sevCounts.low*2));
                const isRunning = scan.status === 'running';

                return (
                  <motion.div key={scan.id ?? i}
                    initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.07 + 0.1 }}
                    onClick={() => !isRunning && setSelected(scan)}
                    className={`bg-surface-card border border-border-subtle rounded-2xl overflow-hidden group transition-all duration-200 ${
                      !isRunning ? 'hover:border-ink-secondary hover:shadow-lg cursor-pointer hover:-translate-y-0.5' : ''
                    }`}
                  >
                    {/* Card top accent bar — score color */}
                    {!isRunning && (
                      <div className="h-0.5 w-full" style={{ background: score >= 80 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444' }}/>
                    )}
                    {isRunning && (
                      <div className="h-0.5 w-full bg-border-subtle">
                        <div className="h-full w-1/2 bg-ink-primary progress-shimmer"/>
                      </div>
                    )}

                    <div className="p-6 space-y-5">
                      {/* Top row: target + score */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                            {isRunning ? (
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot"/>
                                Scanning
                              </span>
                            ) : scan.status}
                          </p>
                          <p className="font-mono text-sm font-semibold text-ink-primary truncate">{scan.target}</p>
                        </div>
                        {!isRunning && (
                          <ScoreRing score={score} size={52} />
                        )}
                      </div>

                      {/* Severity badges */}
                      {!isRunning && (
                        <div className="flex flex-wrap gap-1.5">
                          {Object.entries(sevCounts).map(([sev, n]) =>
                            n > 0 ? (
                              <span key={sev} className={`${SEV_CLASS[sev]} text-[9px] font-bold uppercase px-2 py-0.5 rounded-md`}>
                                {n} {sev}
                              </span>
                            ) : null
                          )}
                          {findings.length === 0 && (
                            <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md uppercase">
                              Clean ✓
                            </span>
                          )}
                        </div>
                      )}

                      {/* Meta footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
                        <div className="flex gap-4 text-[10px] text-ink-muted">
                          <span>{findings.length} findings</span>
                          {scan.statistics?.requests && <span>{scan.statistics.requests.toLocaleString()} reqs</span>}
                        </div>
                        <p className="text-[10px] text-ink-muted">
                          {scan.startedAt
                            ? new Date(scan.startedAt).toLocaleDateString('en-GB', { day:'numeric', month:'short' })
                            : '—'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Report detail modal */}
      {selected && <ReportDetail scan={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
