import { useState } from 'react';
import { FindingDetail } from './FindingDetail.jsx';

const SEV_CONFIG = {
  critical: { label: 'Critical', className: 'badge-critical' },
  high:     { label: 'High',     className: 'badge-high' },
  medium:   { label: 'Medium',   className: 'badge-medium' },
  low:      { label: 'Low',      className: 'badge-low' },
  info:     { label: 'Info',     className: 'badge-info' },
};

function ScoreRing({ score }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 80 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444';

  return (
    <svg width="96" height="96" viewBox="0 0 96 96" className="rotate-[-90deg]">
      <circle cx="48" cy="48" r={r} fill="none" stroke="currentColor" strokeWidth="6" className="text-border-subtle" />
      <circle
        cx="48" cy="48" r={r}
        fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 1s ease' }}
      />
      <text
        x="48" y="56"
        textAnchor="middle"
        fontSize="20"
        fontWeight="700"
        fill="currentColor"
        className="text-ink-primary rotate-90 origin-center"
        style={{ transform: 'rotate(90deg)', transformOrigin: '48px 48px' }}
      >
        {score}
      </text>
    </svg>
  );
}

export function ScanResults({ scan, onFindingStatusChange }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const findings = scan.findings || [];

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

  const score = Math.max(0, 100 - (
    severityCounts.critical * 15 +
    severityCounts.high     * 10 +
    severityCounts.medium   *  5 +
    severityCounts.low      *  2
  ));

  const filtered = filter === 'all' ? findings : findings.filter(f => f.severity === filter);

  return (
    <div className="space-y-5">
      {/* Score + meta card */}
      <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Score ring */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <ScoreRing score={score} />
              <p className="text-[10px] uppercase tracking-widest text-ink-secondary font-bold">Security Score</p>
            </div>

            {/* Severity breakdown */}
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-1">Target</p>
                <p className="text-sm font-semibold text-ink-primary font-mono truncate">{scan.target}</p>
              </div>
              <div className="grid grid-cols-4 gap-2">
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
            <div className="shrink-0 flex flex-col gap-2">
              <button
                onClick={handleExportJson}
                className="flex items-center gap-2.5 px-4 py-2.5 border border-border-subtle text-ink-primary bg-surface-bg rounded-xl text-xs font-semibold hover:border-ink-secondary transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Export JSON
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2.5 px-4 py-2.5 border border-border-subtle text-ink-primary bg-surface-bg rounded-xl text-xs font-semibold hover:border-ink-secondary transition-colors"
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
      <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
          <h3 className="text-sm font-bold text-ink-primary">
            Findings
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
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-ink-primary mb-1">
              {filter === 'all' ? 'No vulnerabilities found' : `No ${filter} findings`}
            </p>
            <p className="text-xs text-ink-secondary">
              {filter === 'all' ? 'This target passed all security checks.' : 'Try adjusting the severity filter.'}
            </p>
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
