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
    <div className="bg-surface-card border border-border-subtle rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-ink-primary mb-8">New Security Scan</h2>

      <form onSubmit={submit} className="space-y-8">
        {/* Large URL Field */}
        <div>
          <input
            id="target"
            type="url"
            placeholder="https://example.com"
            value={target}
            onChange={(e) => onTargetChange(e.target.value)}
            disabled={running}
            className="w-full bg-surface-bg border border-border-subtle rounded-lg px-6 py-4 text-lg font-mono text-ink-primary focus:outline-none focus:border-ink-secondary transition-colors"
          />
        </div>

        {/* Start Button */}
        <div>
          {running ? (
            <button
              type="button"
              onClick={onStop}
              disabled={busy}
              className="bg-red-500 text-white px-8 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Stop scan
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canStart}
              className="bg-ink-primary text-surface-card px-8 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              {busy ? 'Initializing...' : 'Start scan →'}
            </button>
          )}
        </div>

        {/* Scan Configuration */}
        <div className="pt-6 border-t border-border-subtle space-y-6">
          <h3 className="text-sm font-bold text-ink-primary">Scan configuration</h3>
          
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-ink-secondary cursor-pointer">
              <input type="radio" name="mode" className="accent-ink-primary" />
              Quick
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-primary font-medium cursor-pointer">
              <input type="radio" name="mode" defaultChecked className="accent-ink-primary" />
              Standard
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-secondary cursor-pointer">
              <input type="radio" name="mode" className="accent-ink-primary" />
              Deep
            </label>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
            {[
              { label: 'SQL Injection', checked: config.checks?.sqli !== false },
              { label: 'XSS', checked: config.checks?.xss !== false },
              { label: 'Path Traversal', checked: config.checks?.pathTraversal !== false },
              { label: 'Security Headers', checked: config.checks?.passive !== false },
              { label: 'Open Redirect', checked: true },
              { label: 'Directory Discovery', checked: true },
            ].map((check) => (
              <label key={check.label} className="flex items-center gap-3 text-sm text-ink-secondary cursor-pointer hover:text-ink-primary transition-colors">
                <input type="checkbox" defaultChecked={check.checked} className="w-4 h-4 rounded border-border-subtle text-ink-primary accent-ink-primary" />
                {check.label}
              </label>
            ))}
          </div>
        </div>

        {/* Authorization */}
        <div className="pt-4">
          <label className="flex items-center gap-3 text-xs text-ink-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={authorized}
              onChange={(e) => onAuthorizedChange(e.target.checked)}
              disabled={running}
              className="w-4 h-4 rounded border-border-subtle text-ink-primary accent-ink-primary"
            />
            Only scan websites you own or have permission to test.
          </label>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-600 border border-red-500/20 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
