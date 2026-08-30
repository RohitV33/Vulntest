import { useEffect, useState } from 'react';

const NUMBER_FIELDS = [
  { key: 'maxPages', label: 'Maximum pages', hint: 'Pages fetched before crawling stops.', min: 1, limitKey: 'maxPages' },
  { key: 'maxDepth', label: 'Maximum depth', hint: 'Link hops from the start URL.', min: 0, limitKey: 'maxDepth' },
  { key: 'concurrency', label: 'Concurrency', hint: 'Requests in flight at once.', min: 1, limitKey: 'concurrency' },
  { key: 'delayMs', label: 'Delay between requests (ms)', hint: 'Respects robots.txt directives.', min: 0, limitKey: 'delayMs' },
  { key: 'requestTimeoutMs', label: 'Request timeout (ms)', min: 1000, limitKey: 'requestTimeoutMs' },
  { key: 'maxRequests', label: 'Request budget', hint: 'Hard cap on total requests.', min: 1, limitKey: 'maxRequests' },
];

const CHECKS = [
  { key: 'xss', label: 'Cross-Site Scripting (XSS)', hint: 'Canary reflection and output-encoding analysis.' },
  { key: 'sqli', label: 'SQL Injection', hint: 'Error and differential boolean comparison, read-only.' },
  { key: 'pathTraversal', label: 'Path Traversal', hint: 'Non-existent paths only; no OS files accessed.' },
  { key: 'passive', label: 'Passive Checks', hint: 'Security headers, cookie flags, info disclosure.' },
];

export function ConfigDialog({ open, config, limits, onSave, onClose }) {
  const [draft, setDraft] = useState(config);

  useEffect(() => {
    if (open) setDraft(config);
  }, [open, config]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const setNumber = (key, value) => setDraft((previous) => ({ ...previous, [key]: Number(value) }));
  const setFlag = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }));
  const setCheck = (key, value) =>
    setDraft((previous) => ({ ...previous, checks: { ...previous.checks, [key]: value } }));

  const durationMinutes = Math.round((draft.maxScanDurationMs || 0) / 60_000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-primary/50 backdrop-blur-sm animate-fade-in">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-2xl bg-surface-card border border-border-subtle rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-border-subtle">
          <div>
            <h2 className="text-base font-bold text-ink-primary">
              Advanced Scan Parameters
            </h2>
            <p className="text-xs text-ink-secondary mt-0.5">
              Tune rate limits, crawl scope, and active detection checks.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-ink-secondary hover:text-ink-primary hover:bg-surface-bg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
          {/* Rate & Depth Limits */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">
              Crawl & Rate Limits
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {NUMBER_FIELDS.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <label htmlFor={field.key} className="font-semibold text-ink-primary">
                      {field.label}
                    </label>
                    <span className="text-[10px] text-ink-muted font-mono">(max {limits[field.limitKey]})</span>
                  </div>
                  <input
                    id={field.key}
                    type="number"
                    min={field.min}
                    max={limits[field.limitKey]}
                    value={draft[field.key] ?? ''}
                    onChange={(e) => setNumber(field.key, e.target.value)}
                    className="w-full rounded-xl border border-border-subtle bg-surface-bg px-3.5 py-2.5 text-xs font-mono text-ink-primary focus:outline-none focus:border-ink-secondary focus:ring-2 focus:ring-ink-primary/10 transition-all"
                  />
                  {field.hint && <p className="text-[10px] text-ink-muted">{field.hint}</p>}
                </div>
              ))}

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="duration" className="font-semibold text-ink-primary">
                    Max Duration (mins)
                  </label>
                  <span className="text-[10px] text-ink-muted font-mono">
                    (max {Math.round(limits.maxScanDurationMs / 60_000)})
                  </span>
                </div>
                <input
                  id="duration"
                  type="number"
                  min={1}
                  max={Math.round(limits.maxScanDurationMs / 60_000)}
                  value={durationMinutes}
                  onChange={(e) => setNumber('maxScanDurationMs', Number(e.target.value) * 60_000)}
                  className="w-full rounded-xl border border-border-subtle bg-surface-bg px-3.5 py-2.5 text-xs font-mono text-ink-primary focus:outline-none focus:border-ink-secondary focus:ring-2 focus:ring-ink-primary/10 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Detection Modules */}
          <div className="pt-2 border-t border-border-subtle">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">
              Vulnerability Checks
            </h3>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {CHECKS.map((check) => (
                <label
                  key={check.key}
                  className="flex items-start gap-3 p-3 rounded-xl border border-border-subtle bg-surface-bg/50 hover:border-ink-secondary cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={draft.checks?.[check.key] !== false}
                    onChange={(e) => setCheck(check.key, e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-ink-primary accent-ink-primary"
                  />
                  <div>
                    <span className="block text-xs font-bold text-ink-primary">{check.label}</span>
                    <span className="block text-[10px] text-ink-secondary mt-0.5">{check.hint}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Scope and Sandbox Rules */}
          <div className="pt-2 border-t border-border-subtle">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">
              Scope & Sandbox Constraints
            </h3>
            <div className="space-y-2.5">
              {[
                { key: 'respectRobots', label: 'Respect robots.txt Directives', hint: 'Honours Disallow paths and crawl delay throttling.' },
                { key: 'testForms', label: 'Test GET Form Inputs', hint: 'Injects into search forms (password fields excluded).' },
                { key: 'testPostForms', label: 'Submit POST Forms (Advanced)', hint: 'Disabled by default to avoid creating unwanted state.' },
              ].map((option) => (
                <label key={option.key} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(draft[option.key])}
                    onChange={(e) => setFlag(option.key, e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-ink-primary accent-ink-primary"
                  />
                  <div>
                    <span className="block text-xs font-bold text-ink-primary">{option.label}</span>
                    <span className="block text-[10px] text-ink-secondary">{option.hint}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 px-7 py-4 border-t border-border-subtle bg-surface-bg/30">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-border-subtle bg-surface-card text-ink-secondary hover:text-ink-primary text-xs font-bold transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(draft)}
            className="px-6 py-2.5 rounded-xl bg-ink-primary text-surface-card text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Save Parameters
          </button>
        </div>
      </div>
    </div>
  );
}
