import { Button } from './ui/Button.jsx';

const PRESETS = [
  { label: 'PHP Testbed (XSS & SQLi)', url: 'http://testphp.vulnweb.com' },
  { label: 'ASP Testbed (Forms & Auth)', url: 'http://testasp.vulnweb.com' },
  { label: 'Local Testbed', url: 'http://localhost:3000/testbed' },
];

/**
 * Enhanced Target entry, preset pills, and scan controls.
 */
export function ScanLauncher({
  target,
  onTargetChange,
  authorized,
  onAuthorizedChange,
  onStart,
  onStop,
  onOpenConfig,
  running,
  busy,
  error,
  config,
}) {
  const canStart = target.trim() !== '' && authorized && !running && !busy;

  const submit = (event) => {
    event.preventDefault();
    if (canStart) onStart();
  };

  return (
    <div className="space-y-3 rounded-2xl border border-line bg-surface-1 p-5 shadow-xs transition-colors">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-sm font-bold tracking-tight text-ink">Target Configuration & Launch</h2>
          <p className="text-xs text-ink-muted">Enter a fully qualified web target or choose an authorized preset.</p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium text-ink-muted mr-1">Quick Presets:</span>
          {PRESETS.map((preset) => (
            <button
              key={preset.url}
              type="button"
              onClick={() => {
                onTargetChange(preset.url);
                onAuthorizedChange(true);
              }}
              disabled={running}
              className="rounded-md border border-line bg-surface-2 px-2 py-1 text-[11px] font-medium text-ink-2 transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent disabled:opacity-50"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={submit} className="space-y-3 pt-1">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink-muted">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <input
              id="target"
              name="target"
              type="text"
              inputMode="url"
              autoComplete="off"
              spellCheck="false"
              placeholder="e.g. http://testphp.vulnweb.com"
              value={target}
              onChange={(event) => onTargetChange(event.target.value)}
              disabled={running}
              className="w-full rounded-xl border border-line bg-surface-0 py-2.5 pl-9 pr-3 font-mono text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:bg-surface-1 focus:outline-none disabled:opacity-60 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            {running ? (
              <Button variant="danger" onClick={onStop} disabled={busy} className="h-10 px-5">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                  Stop Scan
                </span>
              </Button>
            ) : (
              <Button type="submit" disabled={!canStart} className="h-10 px-5 font-bold shadow-xs">
                {busy ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Initializing…
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Start Scan
                  </span>
                )}
              </Button>
            )}

            <Button variant="outline" onClick={onOpenConfig} disabled={running} className="h-10">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8-1.4 1.4m-10 10-1.4 1.4" strokeLinecap="round" />
              </svg>
              <span>Config</span>
            </Button>
          </div>
        </div>

        {/* Authorization checkbox */}
        <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-line/60 bg-surface-2/40 p-3 text-xs text-ink-2 hover:bg-surface-2 transition-colors">
          <input
            type="checkbox"
            checked={authorized}
            onChange={(event) => onAuthorizedChange(event.target.checked)}
            disabled={running}
            className="mt-0.5 h-4 w-4 shrink-0 rounded accent-accent"
          />
          <span>
            <strong className="text-ink font-semibold">Explicit Authorization: </strong>
            I confirm I own this target or possess written authorization for assessment. Scans are read-only and paced.
          </span>
        </label>

        {/* Scan Parameters Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-muted">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>
              Crawl: {config.maxPages} pages max · Depth {config.maxDepth} · Concurrency {config.concurrency} · {config.delayMs}ms throttle
            </span>
          </div>
          <div>
            Active Engines:{' '}
            <span className="font-medium text-ink-2">
              {[
                config.checks.xss && 'XSS',
                config.checks.sqli && 'SQLi',
                config.checks.pathTraversal && 'LFI/Traversal',
                config.checks.passive && 'Headers/Passive',
              ]
                .filter(Boolean)
                .join(', ') || 'None'}
            </span>
          </div>
        </div>

        {error && (
          <div role="alert" className="flex items-center gap-2 rounded-xl border border-sev-critical/30 bg-sev-critical/10 p-3 text-xs font-medium text-ink animate-shake">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-sev-critical" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  );
}
