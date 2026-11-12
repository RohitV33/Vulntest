const PRESETS = [
  { label: 'Altoro Mutual (Fast Demo)', url: 'http://altoro.testfire.net' },
  { label: 'Zero Bank Testbed (Quick)', url: 'http://zero.webappsecurity.com' },
];

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
}) {
  const canStart = target.trim() !== '' && authorized && !running && !busy;

  const submit = (e) => {
    e.preventDefault();
    if (canStart) onStart();
  };

  return (
    <div className="bg-surface-card border border-border-subtle rounded-3xl p-8 shadow-xs">
      {/* Clean Single Heading */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink-primary tracking-tight">
            {running ? 'Security Audit in Progress...' : 'Start Vulnerability Audit'}
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Enter any authorized website URL to run a non-destructive security vulnerability audit.
          </p>
        </div>
        {onOpenConfig && (
          <button
            type="button"
            disabled={running}
            onClick={onOpenConfig}
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface-bg hover:border-ink-secondary border border-border-subtle rounded-xl text-xs font-bold text-ink-primary transition-all self-start sm:self-auto hover:bg-surface-raised active:scale-95 shadow-xs"
          >
            <svg className="w-4 h-4 text-ink-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Scan Settings
          </button>
        )}
      </div>

      <form onSubmit={submit} noValidate className="space-y-6">
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
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
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

        {/* Authorization checkbox */}
        <label className="flex items-start gap-3 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={authorized}
            onChange={(e) => onAuthorizedChange(e.target.checked)}
            disabled={running}
            className="mt-0.5 w-4 h-4 rounded text-ink-primary accent-ink-primary"
          />
          <span className="text-xs text-ink-secondary leading-relaxed">
            I confirm that I am authorized to audit this target website.
          </span>
        </label>

        {/* Error message */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs">
            {error}
          </div>
        )}

        {/* Single Audit Button */}
        <div>
          {running ? (
            <button
              type="button"
              onClick={onStop}
              disabled={busy}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse-dot" />
              Stop Audit
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canStart}
              className="bg-ink-primary text-surface-card px-9 py-3.5 rounded-xl font-bold text-xs hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center gap-2 shadow-xs"
            >
              {busy ? 'Auditing...' : 'Audit →'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
