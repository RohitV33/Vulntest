import { useState } from 'react';
import { FindingDetail } from './FindingDetail.jsx';

const SEV_CONFIG = {
  critical: { label: 'Critical', className: 'badge-critical' },
  high:     { label: 'High',     className: 'badge-high' },
  medium:   { label: 'Medium',   className: 'badge-medium' },
  low:      { label: 'Low',      className: 'badge-low' },
  info:     { label: 'Info',     className: 'badge-info' },
};

export function ScanResults({ scan, onFindingStatusChange }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const findings = scan.findings || [];

  // Check if scan timed out or failed to reach the server
  const pagesCrawled = scan.statistics?.pages || 0;
  const hasTimeoutError = Boolean(scan.error && scan.error.includes('timeout'));
  const isIncomplete = (scan.status === 'failed' || hasTimeoutError) && pagesCrawled <= 1 && findings.length === 0;

  const changeStatus = (findingId, status) => {
    onFindingStatusChange?.(findingId, status);
    setSelected(prev => prev?.id === findingId ? { ...prev, status } : prev);
  };

  const handleExportJson = () => {
    const uri = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(scan, null, 2));
    const a = document.createElement('a');
    a.href = uri;
    a.download = `fuzzguard_${scan.id || 'report'}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const severityCounts = {
    critical: findings.filter(f => f.severity === 'critical').length,
    high:     findings.filter(f => f.severity === 'high').length,
    medium:   findings.filter(f => f.severity === 'medium').length,
    low:      findings.filter(f => f.severity === 'low').length,
  };

  const filtered = filter === 'all' ? findings : findings.filter(f => f.severity === filter);

  return (
    <div className="space-y-5">
      {/* Incomplete / Timeout Warning Banner */}
      {isIncomplete && (
        <div className="p-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/25 text-yellow-800 dark:text-yellow-300 flex items-start gap-3">
          <svg className="w-5 h-5 shrink-0 mt-0.5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">Target Connection Timed Out</p>
            <p className="text-xs mt-1 leading-relaxed opacity-90">
              The target server <span className="font-mono font-bold">{scan.target}</span> did not respond within the timeout limit. The crawler could not discover pages to test.
            </p>
          </div>
        </div>
      )}

      {/* Target & Severity Overview card */}
      <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden shadow-xs">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Target and breakdown */}
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-1">Target</p>
                <p className="text-base font-bold text-ink-primary font-mono truncate">{scan.target}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(severityCounts).map(([sev, count]) => (
                  <div
                    key={sev}
                    onClick={() => setFilter(filter === sev ? 'all' : sev)}
                    className={`rounded-xl border p-3 text-center cursor-pointer transition-all duration-150 ${SEV_CONFIG[sev]?.className} ${filter === sev ? 'ring-2 ring-ink-primary' : ''}`}
                  >
                    <p className="text-xl font-bold">{count}</p>
                    <p className="text-[10px] font-medium capitalize mt-0.5 opacity-80">{sev}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Export actions */}
            <div className="shrink-0 flex sm:flex-col gap-2">
              <button
                onClick={handleExportJson}
                className="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-border-subtle text-ink-primary bg-surface-bg rounded-xl text-xs font-semibold hover:border-ink-secondary transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Export JSON
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-border-subtle text-ink-primary bg-surface-bg rounded-xl text-xs font-semibold hover:border-ink-secondary transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                Print PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Findings table */}
      <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
          <h3 className="text-sm font-bold text-ink-primary">
            Findings ({findings.length})
            {filter !== 'all' && (
              <span className="ml-2 text-[10px] font-semibold text-ink-secondary uppercase">
                — {filter} only
              </span>
            )}
          </h3>
          {filter !== 'all' && (
            <button onClick={() => setFilter('all')} className="text-xs text-ink-secondary hover:text-ink-primary transition-colors">
              Clear filter ×
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            {isIncomplete ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-3 text-yellow-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold text-ink-primary mb-1">
                  Scan Incomplete (Target Unreachable)
                </p>
                <p className="text-xs text-ink-secondary max-w-sm mx-auto">
                  The target timed out during crawl. Check your target URL or try another demo target.
                </p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold text-ink-primary mb-1">
                  {filter === 'all' ? 'No vulnerabilities found' : `No ${filter} findings`}
                </p>
                <p className="text-xs text-ink-secondary">
                  {filter === 'all' ? 'This target passed all active & passive security checks.' : 'Try adjusting the severity filter.'}
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-subtle">
                  {['Severity', 'Type', 'Endpoint', 'Method'].map(col => (
                    <th key={col} className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-ink-secondary">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((finding) => (
                  <tr
                    key={finding.id}
                    onClick={() => setSelected(finding)}
                    className="border-b border-border-subtle/50 hover:bg-surface-bg cursor-pointer transition-colors group last:border-0"
                  >
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${SEV_CONFIG[finding.severity]?.className || 'badge-info'}`}>
                        {finding.severity}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-ink-primary group-hover:text-accent-blue transition-colors">
                      {finding.type}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-ink-secondary truncate max-w-[220px]">
                      {finding.url}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[10px] font-bold uppercase text-ink-secondary bg-surface-bg border border-border-subtle px-2 py-1 rounded-md">
                        {finding.method || 'GET'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Finding detail modal */}
      <FindingDetail
        finding={selected ? findings.find(f => f.id === selected.id) || selected : null}
        onClose={() => setSelected(null)}
        onStatusChange={changeStatus}
      />
    </div>
  );
}
