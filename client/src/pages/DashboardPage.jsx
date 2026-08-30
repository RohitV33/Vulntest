import { Link } from 'react-router-dom';

const recentScans = [
  { id: '1', target: 'https://example.com',       score: 87, severity: { critical: 0, high: 1, medium: 3, low: 4 }, date: '2h ago',    status: 'completed' },
  { id: '2', target: 'https://api.staging.io',    score: 61, severity: { critical: 1, high: 3, medium: 2, low: 2 }, date: 'Yesterday', status: 'completed' },
  { id: '3', target: 'https://internal.testbed',  score: null, severity: {}, date: 'In progress', status: 'running' },
];

const STAT_CARDS = [
  { label: 'Total Scans',          value: '128', sub: '+12 this week' },
  { label: 'Open Vulnerabilities', value: '14',  sub: '3 critical' },
  { label: 'Avg Security Score',   value: '81',  sub: 'Industry avg: 73' },
  { label: 'Scans Today',          value: '4',   sub: 'Last: 43 min ago' },
];

function ScoreBadge({ score }) {
  if (!score) return null;
  const color = score >= 80 ? 'text-emerald-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500';
  return <span className={`text-sm font-bold tabular-nums ${color}`}>{score}</span>;
}

export function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-secondary mb-2">Overview</p>
          <h1 className="text-3xl font-bold text-ink-primary">Good afternoon.</h1>
        </div>
        <Link
          to="/scanner"
          className="inline-flex items-center gap-2 bg-ink-primary text-surface-card px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14m-7-7h14" strokeLinecap="round"/>
          </svg>
          New scan
        </Link>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="bg-surface-card border border-border-subtle rounded-2xl p-5 group hover:border-ink-secondary transition-colors">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-3">{card.label}</p>
            <p className="text-3xl font-bold text-ink-primary tabular-nums">{card.value}</p>
            <p className="text-[11px] text-ink-secondary mt-1.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Vulnerability severity bars */}
      <div className="bg-surface-card border border-border-subtle rounded-2xl p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-secondary mb-5">Severity distribution</p>
        <div className="space-y-3">
          {[
            { label: 'Critical', count: 3,  total: 50, color: 'bg-red-500' },
            { label: 'High',     count: 11, total: 50, color: 'bg-orange-500' },
            { label: 'Medium',   count: 22, total: 50, color: 'bg-yellow-500' },
            { label: 'Low',      count: 14, total: 50, color: 'bg-blue-500' },
          ].map(({ label, count, total, color }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="text-xs text-ink-secondary w-14">{label}</span>
              <div className="flex-1 h-2 bg-surface-bg rounded-full overflow-hidden border border-border-subtle">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${color}`}
                  style={{ width: `${(count / total) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-ink-primary w-4 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent scans table */}
      <div className="bg-surface-card border border-border-subtle rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
          <h2 className="text-sm font-bold text-ink-primary">Recent scans</h2>
          <Link to="/history" className="text-xs text-ink-secondary hover:text-ink-primary font-medium transition-colors">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-subtle">
                {['Target', 'Score', 'Findings', 'When', ''].map(h => (
                  <th key={h} className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-ink-secondary">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentScans.map((scan) => (
                <tr key={scan.id} className="border-b border-border-subtle/50 hover:bg-surface-bg transition-colors last:border-0">
                  <td className="px-5 py-4 font-mono text-xs font-medium text-ink-primary">{scan.target}</td>
                  <td className="px-5 py-4">
                    {scan.status === 'running' ? (
                      <span className="flex items-center gap-1.5 text-xs text-ink-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot"/>
                        Scanning
                      </span>
                    ) : (
                      <ScoreBadge score={scan.score} />
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {scan.status !== 'running' && (
                      <div className="flex items-center gap-1.5">
                        {scan.severity.critical > 0 && <span className="badge-critical text-[10px] font-bold px-1.5 py-0.5 rounded-md">{scan.severity.critical}C</span>}
                        {scan.severity.high > 0     && <span className="badge-high text-[10px] font-bold px-1.5 py-0.5 rounded-md">{scan.severity.high}H</span>}
                        {scan.severity.medium > 0   && <span className="badge-medium text-[10px] font-bold px-1.5 py-0.5 rounded-md">{scan.severity.medium}M</span>}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-xs text-ink-secondary">{scan.date}</td>
                  <td className="px-5 py-4 text-right">
                    {scan.status !== 'running' && (
                      <Link to={`/scans/${scan.id}`} className="text-xs font-semibold text-ink-secondary hover:text-ink-primary transition-colors">
                        View →
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
