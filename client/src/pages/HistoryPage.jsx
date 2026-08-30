import { HistoryTable } from '../components/HistoryTable.jsx';
import { useScanHistory } from '../hooks/useScanHistory.js';
import { Link } from 'react-router-dom';

export function HistoryPage() {
  const { history, remove, clear, bytes } = useScanHistory();

  const onClear = () => {
    if (window.confirm('Delete every stored scan from this browser? This cannot be undone.')) clear();
  };

  const onDelete = (id) => {
    if (window.confirm('Delete this scan from history?')) remove(id);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-secondary mb-1">Security Archive</p>
          <h1 className="text-3xl font-black tracking-tight text-ink-primary">Audit Reports & History</h1>
        </div>
        <Link
          to="/scanner"
          className="inline-flex items-center gap-2 bg-ink-primary text-surface-card px-5 py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity self-start sm:self-auto"
        >
          + New Audit
        </Link>
      </div>

      <HistoryTable history={history} onDelete={onDelete} onClear={onClear} bytes={bytes} />
      
      <div className="bg-surface-card/60 border border-border-subtle rounded-2xl p-5 text-xs text-ink-secondary leading-relaxed">
        <span className="font-bold text-ink-primary">🔒 Local-First Privacy: </span>
        All security audit records are stored in this browser session (IndexedDB/localStorage) and are never sent to external servers. Clearing your browser storage will remove these records.
      </div>
    </div>
  );
}
