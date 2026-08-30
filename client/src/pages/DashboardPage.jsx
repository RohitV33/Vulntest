import { Link } from 'react-router-dom';

export function DashboardPage() {
  const recentScans = [
    { id: '1', target: 'https://example.com', score: 87, date: '2 hours ago', status: 'completed' },
    { id: '2', target: 'https://api.test.com', score: 92, date: 'Yesterday', status: 'completed' },
    { id: '3', target: 'https://staging.internal', score: null, date: 'In progress', status: 'running' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink-primary">Good afternoon, Jane.</h1>
          <p className="text-ink-secondary mt-1">Here's your security overview for today.</p>
        </div>
        <Link 
          to="/scanner" 
          className="bg-ink-primary text-surface-card px-6 py-2.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity whitespace-nowrap inline-flex items-center justify-center gap-2"
        >
          New Scan →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-card border border-border-subtle rounded-xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-ink-secondary font-bold mb-2">Total Scans</p>
          <p className="text-4xl font-light text-ink-primary tabular-nums">128</p>
        </div>
        <div className="bg-surface-card border border-border-subtle rounded-xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-ink-secondary font-bold mb-2">Open Vulnerabilities</p>
          <p className="text-4xl font-light text-ink-primary tabular-nums">14</p>
        </div>
        <div className="bg-surface-card border border-border-subtle rounded-xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-ink-secondary font-bold mb-2">Avg Security Score</p>
          <p className="text-4xl font-light text-ink-primary tabular-nums">89</p>
        </div>
      </div>

      <div className="bg-surface-card border border-border-subtle rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-border-subtle flex justify-between items-center">
          <h2 className="text-sm font-bold text-ink-primary">Recent Scans</h2>
          <Link to="/history" className="text-xs text-ink-secondary hover:text-ink-primary font-medium">View all</Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-ink-secondary border-b border-border-subtle">
                <th className="font-normal px-6 py-3">Target</th>
                <th className="font-normal px-6 py-3">Score</th>
                <th className="font-normal px-6 py-3">Date</th>
                <th className="font-normal px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.map((scan) => (
                <tr key={scan.id} className="border-b border-border-subtle/50 hover:bg-surface-bg transition-colors last:border-0">
                  <td className="px-6 py-4 font-medium text-ink-primary">{scan.target}</td>
                  <td className="px-6 py-4">
                    {scan.status === 'completed' ? (
                      <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-bold ${
                        scan.score >= 90 ? 'bg-green-500/10 text-green-700' : 
                        scan.score >= 70 ? 'bg-yellow-500/10 text-yellow-700' : 
                        'bg-red-500/10 text-red-700'
                      }`}>
                        {scan.score}
                      </span>
                    ) : (
                      <span className="text-ink-secondary italic text-xs">Scanning...</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-ink-secondary text-xs">{scan.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/scans/${scan.id}`} className="text-ink-primary text-xs font-medium hover:underline">
                      View report
                    </Link>
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
