import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ScanResults } from '../components/ScanResults.jsx';
import { loadScan, updateFindingStatus, deleteScan } from '../utils/storage.js';
import { getScan } from '../services/api.js';
import { formatDateTime, formatDuration } from '../utils/format.js';

export function ScanViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scan, setScan] = useState(() => loadScan(id));
  const [loading, setLoading] = useState(!scan);

  useEffect(() => {
    const stored = loadScan(id);
    if (stored) {
      setScan(stored);
      setLoading(false);
      return;
    }
    setLoading(true);
    getScan(id)
      .then(({ scan: fetched }) => setScan(fetched))
      .catch(() => setScan(null))
      .finally(() => setLoading(false));
  }, [id]);

  const onFindingStatusChange = useCallback(
    (findingId, status) => {
      updateFindingStatus(id, findingId, status);
      setScan((previous) =>
        previous
          ? {
              ...previous,
              findings: previous.findings.map((finding) =>
                finding.id === findingId ? { ...finding, status } : finding,
              ),
            }
          : previous,
      );
    },
    [id],
  );

  const onDelete = () => {
    if (!window.confirm('Delete this scan from history?')) return;
    deleteScan(id);
    navigate('/history');
  };

  if (loading) {
    return (
      <div className="bg-surface-card border border-border-subtle rounded-3xl p-12 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-ink-primary border-t-transparent animate-spin mx-auto mb-4"/>
        <p className="text-sm font-semibold text-ink-primary">Loading security report…</p>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="bg-surface-card border border-border-subtle rounded-3xl p-12 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-surface-raised border border-border-subtle flex items-center justify-center mx-auto text-ink-muted">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01" strokeLinecap="round"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-ink-primary">Assessment Record Not Found</h2>
        <p className="text-xs text-ink-secondary max-w-sm mx-auto">
          This scan was not found in your browser cache and may have expired from server memory.
        </p>
        <Link
          to="/history"
          className="inline-flex items-center gap-2 bg-ink-primary text-surface-card px-5 py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
        >
          ← Back to History
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-surface-card border border-border-subtle rounded-3xl p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link to="/history" className="text-xs text-ink-muted hover:text-ink-primary transition-colors flex items-center gap-1">
              ← History
            </Link>
            <span className="text-ink-muted">/</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              {scan.status}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-ink-primary font-mono truncate max-w-lg">
            {scan.target}
          </h1>
          <p className="text-xs text-ink-secondary mt-1">
            Assessed {formatDateTime(scan.startedAt)} · Duration: {formatDuration(scan.statistics?.durationMs || 0)} · {scan.statistics?.requests ?? 0} HTTP Requests
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl border border-border-subtle bg-surface-bg text-ink-primary text-xs font-bold hover:border-ink-secondary transition-colors"
          >
            Print PDF
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 text-xs font-bold transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Main Results View */}
      <ScanResults scan={scan} onFindingStatusChange={onFindingStatusChange} />
    </div>
  );
}
