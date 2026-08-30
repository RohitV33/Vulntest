const PRESETS = [
  { label: 'Altoro Mutual (Fast Demo)', url: 'http://altoro.testfire.net' },
  { label: 'Acunetix PHP Testbed', url: 'http://testphp.vulnweb.com' },
];

export function ScanLauncher({
  target,
  onTargetChange,
  authorized,
  onAuthorizedChange,
  onStart,
  onStop,
  running,
  busy,
  error,
  config,
}) {
  const canStart = target.trim() !== '' && authorized && !running && !busy;

  const submit = (e) => {
    e.preventDefault();
    if (canStart) onStart();
  };

  return (
    <div className="bg-surface-card border border-border-subtle rounded-3xl p-8 shadow-xs">
      {/* Clean Single Heading */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-ink-primary tracking-tight">
          {running ? 'Security Scan in Progress...' : 'Start New Vulnerability Scan'}
        </h1>
        <p className="text-xs sm:text-sm text-ink-secondary mt-1">
          Enter a web target to test for common vulnerabilities (SQL Injection, XSS, Path Traversal, Headers).
        </p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        {/* Target URL Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
            Target Website URL
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5" strokeLinecap="round"/>
              </svg>
            </div>
            <input
              id="target"
              type="url"
              placeholder="https://example.com"
              value={target}
              onChange={(e) => onTargetChange(e.target.value)}
              disabled={running}
              className="w-full bg-surface-bg border border-border-subtle rounded-2xl pl-11 pr-10 py-4 text-sm font-mono text-ink-primary placeholder-ink-muted focus:outline-none focus:border-ink-secondary focus:ring-2 focus:ring-ink-primary/10 transition-all"
            />
            {target && !running && (
              <button
                type="button"
                onClick={() => onTargetChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-ink-muted hover:text-ink-primary"
              >
                ✕
              </button>
            )}
          </div>

          {/* Preset test targets */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-xs text-ink-muted">Demo Targets:</span>
            {PRESETS.map((p) => (
              <button
                key={p.url}
                type="button"
                disabled={running}
                onClick={() => { onTargetChange(p.url); onAuthorizedChange(true); }}
                className="px-3 py-1 bg-surface-raised hover:border-ink-secondary border border-border-subtle rounded-lg text-xs font-semibold text-ink-secondary hover:text-ink-primary transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Core Security Checks */}
        <div className="pt-4 border-t border-border-subtle">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-3">
            Active Security Checks
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'SQL Injection', desc: 'Differential queries' },
              { label: 'Cross-Site Scripting', desc: 'Canary reflection' },
              { label: 'Path Traversal', desc: 'Directory breakout' },
              { label: 'Security Headers', desc: 'CSP & HSTS inspection' },
            ].map((check) => (
              <div key={check.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-bg border border-border-subtle">
                <div className="w-4 h-4 rounded bg-ink-primary text-surface-card flex items-center justify-center shrink-0">
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-ink-primary leading-tight">{check.label}</p>
                  <p className="text-[10px] text-ink-muted">{check.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authorization checkbox */}
        <label className="flex items-start gap-3 cursor-pointer pt-2">
          <input
            type="checkbox"
            checked={authorized}
            onChange={(e) => onAuthorizedChange(e.target.checked)}
            disabled={running}
            className="mt-0.5 w-4 h-4 rounded text-ink-primary accent-ink-primary"
          />
          <span className="text-xs text-ink-secondary leading-relaxed">
            I confirm that I am authorized to test this target URL for non-destructive security assessment.
          </span>
        </label>

        {/* Error message */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs">
            {error}
          </div>
        )}

        {/* Action Button */}
        <div>
          {running ? (
            <button
              type="button"
              onClick={onStop}
              disabled={busy}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse-dot" />
              Stop Scan
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canStart}
              className="bg-ink-primary text-surface-card px-8 py-3.5 rounded-xl font-bold text-xs hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center gap-2"
            >
              {busy ? 'Initializing...' : 'Start Assessment →'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
