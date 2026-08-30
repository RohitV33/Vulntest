import { formatDuration, formatNumber } from '../utils/format.js';
import { ActivityLog } from './ActivityLog.jsx';

export function ProgressPanel({ scan, connected, streamError }) {
  const statistics = scan.statistics || {};
  const running = !['completed', 'stopped', 'failed'].includes(scan.status);
  const elapsed = scan.completedAt
    ? new Date(scan.completedAt) - new Date(scan.startedAt)
    : Date.now() - new Date(scan.startedAt);

  const phase = scan.phase || scan.status;
  const progress = scan.progress ?? 0;

  const steps = [
    { id: 'queued', label: 'Target validation' },
    { id: 'robots', label: 'Endpoint discovery' },
    { id: 'crawling', label: 'Parameter analysis' },
    { id: 'testing', label: 'Vulnerability testing' },
    { id: 'completed', label: 'Report generation' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === phase) >= 0 ? steps.findIndex(s => s.id === phase) : 2;

  return (
    <div className="bg-surface-card border border-border-subtle rounded-xl p-8 shadow-sm">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-1">
            {running ? 'Scanning' : scan.status === 'completed' ? 'Scan Complete' : 'Scan ' + scan.status}
          </h3>
          <p className="text-lg font-medium text-ink-primary">{scan.target}</p>
        </div>
        <div className="text-3xl font-light text-ink-primary tabular-nums">
          {progress}%
        </div>
      </div>

      {/* Thin Progress Bar */}
      <div className="h-1 w-full bg-border-subtle rounded-full overflow-hidden mb-8">
        <div 
          className={`h-full transition-all duration-500 ease-out ${scan.status === 'failed' ? 'bg-red-500' : 'bg-ink-primary'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, idx) => {
            let statusIcon;
            let textClass;
            
            if (scan.status === 'completed' || idx < currentStepIndex) {
              statusIcon = <span className="text-ink-primary">✓</span>;
              textClass = 'text-ink-primary';
            } else if (idx === currentStepIndex && running) {
              statusIcon = <span className="text-accent-blue font-bold">→</span>;
              textClass = 'text-ink-primary font-medium';
            } else {
              statusIcon = <span className="text-border-subtle">○</span>;
              textClass = 'text-ink-secondary';
            }

            return (
              <div key={step.id} className={`flex items-center gap-3 text-sm ${textClass}`}>
                <div className="w-4 flex justify-center">{statusIcon}</div>
                {step.label}
              </div>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <p className="text-xl font-medium text-ink-primary tabular-nums">{formatNumber(statistics.requests || 0)}</p>
            <p className="text-[10px] text-ink-secondary uppercase tracking-wider mt-1">Requests</p>
          </div>
          <div>
            <p className="text-xl font-medium text-ink-primary tabular-nums">{formatNumber(statistics.endpoints || 0)}</p>
            <p className="text-[10px] text-ink-secondary uppercase tracking-wider mt-1">Endpoints</p>
          </div>
          <div>
            <p className="text-xl font-medium text-ink-primary tabular-nums">{formatNumber(statistics.pages || 0)}</p>
            <p className="text-[10px] text-ink-secondary uppercase tracking-wider mt-1">Tests</p>
          </div>
          <div>
            <p className="text-xl font-medium text-ink-primary tabular-nums">{formatDuration(elapsed)}</p>
            <p className="text-[10px] text-ink-secondary uppercase tracking-wider mt-1">Elapsed</p>
          </div>
        </div>
      </div>
      
      {scan.error && (
        <div className="mt-6 bg-red-500/10 text-red-600 border border-red-500/20 px-4 py-3 rounded-md text-sm">
          {scan.error}
        </div>
      )}
      
      {streamError && <p className="mt-4 text-xs text-ink-secondary">{streamError}</p>}
      
      <div className="mt-8 border-t border-border-subtle pt-6">
        <ActivityLog entries={scan.log} />
      </div>
    </div>
  );
}
