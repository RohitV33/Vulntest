import { useState } from 'react';
import { SummaryCards } from './SummaryCards.jsx';
import { FindingsTable } from './FindingsTable.jsx';
import { FindingDetail } from './FindingDetail.jsx';
import { EndpointExplorer } from './EndpointExplorer.jsx';
import { SeverityChart } from './charts/SeverityChart.jsx';
import { TypeChart } from './charts/TypeChart.jsx';
import { StatusCodeChart } from './charts/StatusCodeChart.jsx';

/**
 * Enhanced results view with report export, visual tabs, and finding inspectors.
 */
export function ScanResults({ scan, onFindingStatusChange }) {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('findings'); // 'findings' | 'endpoints' | 'charts'
  const findings = scan.findings || [];
  const endpoints = scan.endpoints || [];

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

  return (
    <div className="space-y-6">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-line bg-surface-1 p-4 shadow-xs sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-good/10 text-good">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </span>
          <div>
            <h2 className="text-sm font-bold text-ink">Assessment Results</h2>
            <p className="font-mono text-xs text-ink-muted truncate max-w-md">{scan.target}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Tab buttons */}
          <div className="flex rounded-lg border border-line bg-surface-2 p-0.5">
            <button
              type="button"
              onClick={() => setActiveTab('findings')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'findings' ? 'bg-surface-1 text-ink shadow-xs' : 'text-ink-muted hover:text-ink'
              }`}
            >
              Findings ({findings.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('endpoints')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'endpoints' ? 'bg-surface-1 text-ink shadow-xs' : 'text-ink-muted hover:text-ink'
              }`}
            >
              Endpoints ({endpoints.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('charts')}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'charts' ? 'bg-surface-1 text-ink shadow-xs' : 'text-ink-muted hover:text-ink'
              }`}
            >
              Analytics
            </button>
          </div>

          <button
            type="button"
            onClick={handleExportJson}
            title="Download JSON Report"
            className="flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-xs font-semibold text-ink-2 hover:border-accent hover:text-ink transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export JSON
          </button>

          <button
            type="button"
            onClick={handlePrintReport}
            title="Print or Save as PDF"
            className="flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-xs font-semibold text-ink-2 hover:border-accent hover:text-ink transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print Report
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <SummaryCards statistics={scan.statistics || {}} findings={findings} />

      {/* Tab: Findings List */}
      {activeTab === 'findings' && (
        <div className="space-y-6">
          <FindingsTable findings={findings} selectedId={selected?.id} onSelect={setSelected} />
          
          <div className="grid gap-4 lg:grid-cols-2">
            <SeverityChart findings={findings} />
            <TypeChart findings={findings} />
          </div>
        </div>
      )}

      {/* Tab: Endpoints Explorer */}
      {activeTab === 'endpoints' && (
        <div className="space-y-6">
          <EndpointExplorer endpoints={endpoints} />
          <div className="max-w-md">
            <StatusCodeChart endpoints={endpoints} />
          </div>
        </div>
      )}

      {/* Tab: Analytics Charts */}
      {activeTab === 'charts' && (
        <div className="grid gap-4 lg:grid-cols-3">
          <SeverityChart findings={findings} />
          <TypeChart findings={findings} />
          <StatusCodeChart endpoints={endpoints} />
        </div>
      )}

      {/* Finding Detail Modal/Slideover */}
      <FindingDetail
        finding={selected ? findings.find((finding) => finding.id === selected.id) || selected : null}
        onClose={() => setSelected(null)}
        onStatusChange={changeStatus}
      />
    </div>
  );
}
