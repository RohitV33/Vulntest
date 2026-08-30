import { Link } from 'react-router-dom';
import { formatDateTime, formatNumber, truncate } from '../utils/format.js';
import { countBySeverity } from '../utils/severity.js';

export function HistoryTable({ history = [], onDelete, onClear, bytes = 0 }) {
  return (
    <div className="bg-surface-card border border-border-subtle rounded-3xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-7 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink-primary">Security Audit History</h2>
          <p className="text-xs text-ink-secondary mt-0.5">
            {history.length} security audit{history.length === 1 ? '' : 's'} stored in browser session · {(bytes / 1024).toFixed(0)} KB
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-semibold text-red-500 hover:text-red-600 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-xl transition-colors self-start sm:self-auto"
          >
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="p-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-surface-raised border border-border-subtle flex items-center justify-center mx-auto mb-4 text-ink-muted">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-base font-bold text-ink-primary">No audits recorded yet</h3>
          <p className="text-xs text-ink-secondary max-w-sm mx-auto mt-1 mb-5 leading-relaxed">
            Completed security audits are saved to this browser session automatically.
          </p>
          <Link
            to="/scanner"
            className="inline-flex items-center gap-2 bg-ink-primary text-surface-card px-5 py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
          >
            Start a new audit →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-bg/50 text-[10px] font-bold uppercase tracking-wider text-ink-muted">
                <th className="px-6 py-3.5">Target</th>
                <th className="px-4 py-3.5">Timestamp</th>
                <th className="px-3 py-3.5 text-right">Endpoints</th>
                <th className="px-3 py-3.5 text-right">Vulns</th>
                <th className="px-3 py-3.5 text-right">Crit / High</th>
                <th className="px-3 py-3.5 text-right">Med</th>
                <th className="px-3 py-3.5 text-right">Low</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/50 font-mono">
              {history.map((scan) => {
                const counts = countBySeverity(scan.findings || []);
                const totalVulns = (scan.findings || []).length;
                return (
                  <tr key={scan.id} className="hover:bg-surface-bg transition-colors font-sans">
                    <td className="px-6 py-4">
                      <Link
                        to={`/scans/${scan.id}`}
                        className="font-mono text-xs font-bold text-ink-primary hover:underline underline-offset-2 truncate block max-w-xs"
                      >
                        {truncate(scan.target, 40)}
                      </Link>
                      <span className="text-[10px] text-ink-muted uppercase">{scan.status}</span>
                    </td>
                    <td className="px-4 py-4 text-xs text-ink-secondary whitespace-nowrap">
                      {formatDateTime(scan.startedAt)}
                    </td>
                    <td className="px-3 py-4 text-right tabular-nums text-ink-secondary">
                      {formatNumber(scan.statistics?.endpoints || 0)}
                    </td>
                    <td className="px-3 py-4 text-right tabular-nums font-bold text-ink-primary">
                      {totalVulns}
                    </td>
                    <td className="px-3 py-4 text-right tabular-nums">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        (counts.High + counts.Critical) > 0 ? 'bg-red-500/10 text-red-600' : 'text-ink-muted'
                      }`}>
                        {counts.High + counts.Critical}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-right tabular-nums">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        counts.Medium > 0 ? 'bg-yellow-500/10 text-yellow-600' : 'text-ink-muted'
                      }`}>
                        {counts.Medium}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-right tabular-nums text-ink-muted">
                      {counts.Low}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/scans/${scan.id}`}
                          className="bg-surface-raised border border-border-subtle hover:border-ink-secondary text-ink-primary px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        >
                          View Report
                        </Link>
                        <button
                          onClick={() => onDelete(scan.id)}
                          className="text-ink-muted hover:text-red-500 p-1.5 rounded-lg hover:bg-surface-raised transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
