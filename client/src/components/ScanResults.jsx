import { useState } from 'react';
import { FindingDetail } from './FindingDetail.jsx';

export function ScanResults({ scan, onFindingStatusChange }) {
  const [selected, setSelected] = useState(null);
  const findings = scan.findings || [];

  const changeStatus = (findingId, status) => {
    onFindingStatusChange?.(findingId, status);
    setSelected((previous) => (previous && previous.id === findingId ? { ...previous, status } : previous));
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(scan, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `vulnscan_report_${scan.id || 'scan'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrintReport = () => {
    window.print();
  };

  // Calculate score and severities
  const severityCounts = {
    critical: findings.filter(f => f.severity === 'critical').length,
    high: findings.filter(f => f.severity === 'high').length,
    medium: findings.filter(f => f.severity === 'medium').length,
    low: findings.filter(f => f.severity === 'low').length,
  };
  
  // Basic score calculation
  const score = Math.max(0, 100 - (severityCounts.critical * 15 + severityCounts.high * 10 + severityCounts.medium * 5 + severityCounts.low * 2));

  return (
    <div className="bg-surface-card border border-border-subtle rounded-xl p-8 shadow-sm">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-1">
            Security Assessment
          </h3>
          <p className="text-2xl font-medium text-ink-primary mb-2">{scan.target}</p>
          <div className="flex items-center gap-2 text-sm text-ink-secondary">
            {severityCounts.critical} Critical &middot; {severityCounts.high} High &middot; {severityCounts.medium} Medium &middot; {severityCounts.low} Low
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-4">
          <div className="text-right">
            <span className="text-6xl font-light text-ink-primary tabular-nums">{score}</span>
            <span className="text-xl text-ink-secondary ml-1">/ 100</span>
          </div>
          <div className="flex gap-4">
            <button onClick={handleExportJson} className="text-ink-secondary hover:text-ink-primary transition-colors flex items-center gap-1.5 text-sm" title="Download JSON">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>JSON</span>
            </button>
            <button onClick={handlePrintReport} className="text-ink-secondary hover:text-ink-primary transition-colors flex items-center gap-1.5 text-sm" title="Download PDF">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <polyline points="9 15 12 18 15 15" />
              </svg>
              <span>PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vulnerability Table */}
      <div>
        <h4 className="text-sm font-bold text-ink-primary mb-4 border-b border-border-subtle pb-2">Vulnerabilities Found</h4>
        
        {findings.length === 0 ? (
          <div className="py-8 text-center text-ink-secondary text-sm">
            No vulnerabilities found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border-subtle text-ink-secondary">
                  <th className="font-normal py-3 pr-4">Severity</th>
                  <th className="font-normal py-3 pr-4">Vulnerability</th>
                  <th className="font-normal py-3 pr-4">Endpoint</th>
                  <th className="font-normal py-3 pr-4">Method</th>
                </tr>
              </thead>
              <tbody>
                {findings.map((finding) => (
                  <tr 
                    key={finding.id} 
                    className="border-b border-border-subtle/50 hover:bg-surface-bg cursor-pointer transition-colors"
                    onClick={() => setSelected(finding)}
                  >
                    <td className="py-3 pr-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium uppercase tracking-wider
                        ${finding.severity === 'critical' ? 'bg-red-500/10 text-red-600' : 
                          finding.severity === 'high' ? 'bg-orange-500/10 text-orange-600' : 
                          finding.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-600' : 
                          'bg-blue-500/10 text-blue-600'}`}
                      >
                        {finding.severity}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-medium text-ink-primary">{finding.type}</td>
                    <td className="py-3 pr-4 text-ink-secondary font-mono text-xs truncate max-w-[200px]">{finding.url}</td>
                    <td className="py-3 pr-4 text-ink-secondary text-xs">{finding.method || 'GET'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Finding Detail Modal/Slideover */}
      <FindingDetail
        finding={selected ? findings.find((finding) => finding.id === selected.id) || selected : null}
        onClose={() => setSelected(null)}
        onStatusChange={changeStatus}
      />
    </div>
  );
}
