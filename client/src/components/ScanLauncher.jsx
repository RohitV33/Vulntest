const PRESETS = [
  { label: 'PHP Testbed', url: 'http://testphp.vulnweb.com' },
  { label: 'ASP Testbed', url: 'http://testasp.vulnweb.com' },
  { label: 'Local Dev', url: 'http://localhost:3000/testbed' },
];

const SCAN_MODES = [
  { id: 'quick', label: 'Quick', desc: '~2 min', checks: 'Core checks only' },
  { id: 'standard', label: 'Standard', desc: '~8 min', checks: 'Full suite' },
  { id: 'deep', label: 'Deep', desc: '~20 min', checks: 'Exhaustive fuzzing' },
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
  config,
}) {
  const canStart = target.trim() !== '' && authorized && !running && !busy;

  const submit = (e) => {
    e.preventDefault();
    if (canStart) onStart();
  };

  return (
    <div className="relative">
      {/* Large editorial heading */}
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-secondary mb-3">
          Vulnerability Scanner
        </p>
        <h1 className="text-3xl font-bold text-ink-primary tracking-tight">
          {running ? 'Scan in progress...' : 'Start a new assessment'}
        </h1>
      </div>

      <form onSubmit={submit} className="space-y-5">
        {/* URL Input — the hero element */}
        <div className="relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-ink-secondary group-focus-within:text-ink-primary transition-colors pointer-events-none">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/>
            </svg>
          </div>
          <input
            id="target"
            type="url"
            placeholder="https://your-app.com"
            value={target}
            onChange={(e) => onTargetChange(e.target.value)}
            disabled={running}
            className="w-full bg-surface-card border border-border-subtle rounded-2xl pl-12 pr-6 py-5 text-base font-medium text-ink-primary placeholder-ink-muted focus:outline-none focus:border-ink-secondary focus:ring-2 focus:ring-ink-primary/10 transition-all disabled:opacity-60 font-mono"
          />
          {target && !running && (
            <button
              type="button"
              onClick={() => onTargetChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-ink-secondary hover:text-ink-primary hover:bg-surface-bg transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Preset pills */}
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.url}
              type="button"
              disabled={running}
              onClick={() => { onTargetChange(p.url); onAuthorizedChange(true); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                target === p.url
                  ? 'bg-ink-primary text-surface-card border-ink-primary'
                  : 'border-border-subtle text-ink-secondary hover:border-ink-secondary hover:text-ink-primary bg-surface-card'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Scan Mode Selection */}
        <div className="grid grid-cols-3 gap-3">
          {SCAN_MODES.map((mode) => (
            <label
              key={mode.id}
              className={`relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all duration-150 group ${
                mode.id === 'standard'
                  ? 'border-ink-primary bg-ink-primary/5'
                  : 'border-border-subtle bg-surface-card hover:border-ink-secondary'
              }`}
            >
              <input type="radio" name="scan-mode" value={mode.id} defaultChecked={mode.id === 'standard'} className="sr-only" />
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-bold text-ink-primary">{mode.label}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  mode.id === 'standard'
                    ? 'bg-ink-primary text-surface-card'
                    : 'bg-surface-bg text-ink-secondary border border-border-subtle'
                }`}>
                  {mode.desc}
                </span>
              </div>
              <p className="text-[11px] text-ink-secondary">{mode.checks}</p>
            </label>
          ))}
        </div>

        {/* Checks toggle row */}
        <div className="bg-surface-card border border-border-subtle rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-ink-primary uppercase tracking-wider">Security checks</p>
            <button type="button" onClick={onOpenConfig} className="text-[11px] text-ink-secondary hover:text-ink-primary transition-colors font-medium">
              Advanced config →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2.5">
            {[
              { label: 'SQL Injection', key: 'sqli' },
              { label: 'Cross-Site Scripting', key: 'xss' },
              { label: 'Path Traversal', key: 'pathTraversal' },
              { label: 'Security Headers', key: 'passive' },
              { label: 'Open Redirect', key: 'redirect' },
              { label: 'Directory Discovery', key: 'dir' },
            ].map((check) => (
              <label key={check.label} className="flex items-center gap-2.5 cursor-pointer group">
                <div className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
                  config.checks?.[check.key] !== false
                    ? 'bg-ink-primary border-ink-primary'
                    : 'border-border-subtle bg-surface-bg'
                }`}>
                  {config.checks?.[check.key] !== false && (
                    <svg className="w-2.5 h-2.5 text-surface-card" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-xs text-ink-secondary group-hover:text-ink-primary transition-colors">{check.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Auth confirmation */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div
            className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
              authorized ? 'bg-ink-primary border-ink-primary' : 'border-border-subtle bg-surface-bg'
            }`}
            onClick={() => onAuthorizedChange(!authorized)}
          >
            {authorized && (
              <svg className="w-2.5 h-2.5 text-surface-card" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <input type="checkbox" className="sr-only" checked={authorized} onChange={(e) => onAuthorizedChange(e.target.checked)} disabled={running}/>
          <span className="text-xs text-ink-secondary leading-relaxed">
            I confirm I own or have written permission to test this target. I accept responsibility for the scan.
          </span>
        </label>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {running ? (
            <button
              type="button"
              onClick={onStop}
              disabled={busy}
              className="flex items-center gap-2.5 bg-red-500 text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              <span className="w-2 h-2 rounded-sm bg-white/80 animate-pulse-dot"/>
              Stop scan
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canStart}
              className="flex items-center gap-2.5 bg-ink-primary text-surface-card px-7 py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {busy ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-surface-card/30 border-t-surface-card animate-spin"/>
                  Initializing...
                </>
              ) : (
                <>Launch assessment →</>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
