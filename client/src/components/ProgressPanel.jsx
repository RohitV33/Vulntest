import { formatDuration, formatNumber } from '../utils/format.js';
import { ActivityLog } from './ActivityLog.jsx';

const STEPS = [
  { id: 'queued',    label: 'Target validation' },
  { id: 'robots',   label: 'Endpoint discovery' },
  { id: 'crawling', label: 'Surface mapping' },
  { id: 'testing',  label: 'Vulnerability testing' },
  { id: 'completed',label: 'Report generation' },
];

const STATUS_COLORS = {
  completed: 'bg-emerald-500',
  stopped:   'bg-yellow-500',
  failed:    'bg-red-500',
  running:   'bg-ink-primary',
};

export function ProgressPanel({ scan, connected, streamError }) {
  const stats = scan.statistics || {};
  const running = !['completed', 'stopped', 'failed'].includes(scan.status);
  const elapsed = scan.completedAt
    ? new Date(scan.completedAt) - new Date(scan.startedAt)
    : Date.now() - new Date(scan.startedAt);

  const phase = scan.phase || scan.status;
  const progress = scan.progress ?? 0;
  const currentStepIndex = Math.max(0, STEPS.findIndex(s => s.id === phase));

  const barColor = STATUS_COLORS[scan.status] || STATUS_COLORS.running;

  return (
    <div className="space-y-5">
      {/* Top status card */}
      <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden">
        {/* Progress bar — runs along very top */}
        <div className="h-0.5 w-full bg-border-subtle">
          <div
            className={`h-full transition-all duration-700 ease-out relative overflow-hidden ${barColor}`}
            style={{ width: `${progress}%` }}
          >
            {running && <div className="absolute inset-0 progress-shimmer" />}
          </div>
        </div>

        <div className="p-6">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {running && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                    Live
                  </span>
                )}
                {scan.status === 'completed' && (
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-500">Complete</span>
                )}
                {scan.status === 'failed' && (
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-500">Failed</span>
                )}
              </div>
              <p className="text-base font-semibold text-ink-primary font-mono truncate max-w-xs">{scan.target}</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-light text-ink-primary tabular-nums">{progress}<span className="text-lg text-ink-secondary">%</span></p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { value: formatNumber(stats.requests || 0), label: 'Requests' },
              { value: formatNumber(stats.endpoints || 0), label: 'Endpoints' },
              { value: formatNumber(stats.pages || 0), label: 'Pages' },
              { value: formatDuration(elapsed), label: 'Elapsed' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-surface-bg border border-border-subtle rounded-xl p-3">
                <p className="text-lg font-semibold text-ink-primary tabular-nums">{value}</p>
                <p className="text-[10px] uppercase tracking-wider text-ink-secondary mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps track */}
      <div className="bg-surface-card border border-border-subtle rounded-2xl p-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-4">Scan phases</p>
        <div className="flex items-center gap-0">
          {STEPS.map((step, idx) => {
            const done    = scan.status === 'completed' || idx < currentStepIndex;
            const active  = idx === currentStepIndex && running;
            const pending = !done && !active;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  {/* Dot */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    done
                      ? 'bg-ink-primary text-surface-card'
                      : active
                        ? 'bg-surface-bg border-2 border-ink-primary text-ink-primary'
                        : 'bg-surface-bg border-2 border-border-subtle text-ink-muted'
                  }`}>
                    {done ? (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </div>
                  {/* Label */}
                  <p className={`text-[10px] text-center mt-2 font-medium ${
                    done ? 'text-ink-primary' : active ? 'text-ink-primary' : 'text-ink-muted'
                  }`}>{step.label}</p>
                </div>
                {/* Connector line */}
                {idx < STEPS.length - 1 && (
                  <div className={`h-0.5 w-full -mt-5 mx-1 rounded transition-colors ${done ? 'bg-ink-primary' : 'bg-border-subtle'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Errors */}
      {scan.error && (
        <div className="bg-red-500/8 border border-red-500/20 text-red-500 px-5 py-3.5 rounded-xl text-sm flex items-center gap-3">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01" strokeLinecap="round"/></svg>
          {scan.error}
        </div>
      )}
      {streamError && <p className="text-xs text-ink-secondary px-1">{streamError}</p>}

      {/* Activity log */}
      <div className="bg-surface-card border border-border-subtle rounded-2xl p-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-4">Activity log</p>
        <ActivityLog entries={scan.log} />
      </div>
    </div>
  );
}
