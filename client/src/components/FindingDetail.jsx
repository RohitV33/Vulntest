import { useEffect } from 'react';
import { formatDateTime } from '../utils/format.js';

const SEV_BADGE = {
  critical: 'badge-critical',
  high:     'badge-high',
  medium:   'badge-medium',
  low:      'badge-low',
  info:     'badge-info',
};

const TRIAGE_OPTIONS = ['Open', 'Confirmed', 'False positive', 'Fixed'];

export function FindingDetail({ finding, onClose, onStatusChange }) {
  useEffect(() => {
    if (!finding) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [finding, onClose]);

  if (!finding) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="finding-title"
        className="relative z-10 w-full max-w-2xl bg-surface-card border border-border-subtle rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 sm:p-7 border-b border-border-subtle bg-surface-card shrink-0">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className={`${SEV_BADGE[finding.severity] || 'badge-info'} text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md`}>
                {finding.severity}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted bg-surface-bg border border-border-subtle px-2 py-0.5 rounded-md">
                {finding.confidence || 'High'} Confidence
              </span>
            </div>
            <h2 id="finding-title" className="text-xl font-bold text-ink-primary">
              {finding.type}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-ink-muted hover:text-ink-primary hover:bg-surface-bg transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6 bg-surface-card">
          {/* Affected URL */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-1.5">Affected Endpoint</p>
            <div className="bg-surface-bg border border-border-subtle rounded-xl p-3.5 flex items-center justify-between gap-3">
              <span className="font-mono text-xs text-ink-primary break-all">
                <span className="font-bold text-ink-secondary mr-2">{finding.method || 'GET'}</span>
                {finding.url}
              </span>
              <a
                href={finding.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs font-bold text-accent-blue hover:underline whitespace-nowrap"
              >
                Open ↗
              </a>
            </div>
          </div>

          {/* Parameter */}
          {finding.parameter && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-1.5">Vulnerable Parameter</p>
              <div className="font-mono text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/20 px-3.5 py-2 rounded-xl inline-block">
                {finding.parameter}
              </div>
            </div>
          )}

          {/* Explanation */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-1.5">Explanation</p>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed bg-surface-bg border border-border-subtle rounded-2xl p-4">
              {finding.description}
            </p>
          </div>

          {/* Technical Evidence */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-1.5">HTTP Evidence / Request</p>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl bg-surface-bg border border-border-subtle p-4 font-mono text-[11px] leading-relaxed text-ink-secondary">
              {finding.evidence || 'No raw evidence logged.'}
            </pre>
          </div>

          {/* Remediation Guide */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">Remediation Guide</p>
            <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-2xl p-4 text-xs text-ink-secondary leading-relaxed">
              {finding.recommendation}
            </div>
          </div>

          {/* Triage Buttons */}
          <div className="pt-2 border-t border-border-subtle">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-2">Triage Status</p>
            <div className="flex flex-wrap gap-2">
              {TRIAGE_OPTIONS.map((option) => {
                const active = (finding.status || 'Open') === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onStatusChange(finding.id, option)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-ink-primary text-surface-card shadow-xs'
                        : 'bg-surface-bg border border-border-subtle text-ink-secondary hover:border-ink-secondary hover:text-ink-primary'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-7 border-t border-border-subtle bg-surface-bg/50 flex items-center justify-between">
          <span className="text-[11px] text-ink-muted">
            Detected: {formatDateTime(finding.timestamp)}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-ink-primary text-surface-card text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
