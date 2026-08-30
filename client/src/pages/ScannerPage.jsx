import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ScanLauncher } from '../components/ScanLauncher.jsx';
import { ConfigDialog } from '../components/ConfigDialog.jsx';
import { ProgressPanel } from '../components/ProgressPanel.jsx';
import { ScanResults } from '../components/ScanResults.jsx';
import { useScanStream } from '../hooks/useScanStream.js';
import { useScanHistory } from '../hooks/useScanHistory.js';
import { getScanConfig, startScan, stopScan } from '../services/api.js';
import { loadSettings, saveSettings, updateFindingStatus } from '../utils/storage.js';

const ACTIVE_SCAN_KEY = 'vulnscan:activeScanId';

const FALLBACK_CONFIG = {
  maxPages: 100,
  maxDepth: 3,
  concurrency: 2,
  requestTimeoutMs: 10_000,
  delayMs: 250,
  maxRequests: 1_500,
  maxScanDurationMs: 600_000,
  respectRobots: true,
  allowSubdomains: false,
  testForms: true,
  testPostForms: false,
  checks: { xss: true, sqli: true, pathTraversal: true, passive: true },
};

const FALLBACK_LIMITS = {
  maxPages: 250,
  maxDepth: 6,
  concurrency: 4,
  requestTimeoutMs: 30_000,
  delayMs: 5_000,
  maxRequests: 4_000,
  maxScanDurationMs: 1_200_000,
};

export function ScannerPage() {
  const [searchParams] = useSearchParams();
  const initialTarget = searchParams.get('target') || '';

  const [target, setTarget] = useState(initialTarget);
  const [authorized, setAuthorized] = useState(Boolean(initialTarget));
  const [config, setConfig] = useState(() => loadSettings(FALLBACK_CONFIG));
  const [limits, setLimits] = useState(FALLBACK_LIMITS);
  const [privateTargetsAllowed, setPrivateTargetsAllowed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState(null);
  const [statusOverrides, setStatusOverrides] = useState({});

  const [activeScanId, setActiveScanId] = useState(() => {
    try {
      return window.localStorage.getItem(ACTIVE_SCAN_KEY) || null;
    } catch {
      return null;
    }
  });

  const { scan, connected, streamError, finished, refresh } = useScanStream(activeScanId);
  const { save, quotaWarning } = useScanHistory();
  const savedRef = useRef(new Set());

  // Listen to search param updates
  useEffect(() => {
    const urlTarget = searchParams.get('target');
    if (urlTarget) {
      setTarget(urlTarget);
      setAuthorized(true);
    }
  }, [searchParams]);

  // Publish the server's real limits so the config dialog cannot offer more.
  useEffect(() => {
    let cancelled = false;
    getScanConfig()
      .then(({ limits: serverLimits, allowPrivateTargets }) => {
        if (cancelled) return;
        if (serverLimits) setLimits(serverLimits);
        setPrivateTargetsAllowed(Boolean(allowPrivateTargets));
      })
      .catch(() => {
        /* keep the fallbacks - the launcher will surface any real API problem */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Remember the running scan so a page reload re-attaches to its stream.
  useEffect(() => {
    try {
      if (activeScanId) window.localStorage.setItem(ACTIVE_SCAN_KEY, activeScanId);
      else window.localStorage.removeItem(ACTIVE_SCAN_KEY);
    } catch {
      /* non-fatal */
    }
  }, [activeScanId]);

  const findingsWithStatus = useMemo(() => {
    if (!scan?.findings) return [];
    return scan.findings.map((finding) =>
      statusOverrides[finding.id] ? { ...finding, status: statusOverrides[finding.id] } : finding,
    );
  }, [scan?.findings, statusOverrides]);

  // Persist the completed scan to localStorage exactly once.
  useEffect(() => {
    if (!scan || !finished || savedRef.current.has(scan.id)) return;
    savedRef.current.add(scan.id);
    save({ ...scan, findings: findingsWithStatus });
    try {
      window.localStorage.removeItem(ACTIVE_SCAN_KEY);
    } catch {
      /* non-fatal */
    }
  }, [scan, finished, findingsWithStatus, save]);

  const onStart = useCallback(async () => {
    setStarting(true);
    setError(null);
    setStatusOverrides({});
    try {
      const { scan: created } = await startScan({ target: target.trim(), config, authorized });
      savedRef.current.delete(created.id);
      setActiveScanId(created.id);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setStarting(false);
    }
  }, [target, config, authorized]);

  const onStop = useCallback(async () => {
    if (!activeScanId) return;
    setStarting(true);
    try {
      await stopScan(activeScanId);
      await refresh();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setStarting(false);
    }
  }, [activeScanId, refresh]);

  const onSaveConfig = (next) => {
    setConfig(next);
    saveSettings(next);
    setDialogOpen(false);
  };

  const onFindingStatusChange = (findingId, status) => {
    setStatusOverrides((previous) => ({ ...previous, [findingId]: status }));
    if (finished && scan?.id) updateFindingStatus(scan.id, findingId, status);
  };

  const running = Boolean(scan) && !finished;

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="mb-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-secondary mb-1">Security Scanner</p>
        <h1 className="text-3xl font-black tracking-tight text-ink-primary">New assessment</h1>
      </div>

      <ScanLauncher
        target={target}
        onTargetChange={setTarget}
        authorized={authorized}
        onAuthorizedChange={setAuthorized}
        onStart={onStart}
        onStop={onStop}
        onOpenConfig={() => setDialogOpen(true)}
        running={running}
        busy={starting}
        error={error}
        config={config}
      />

      {/* Private targets notice */}
      {privateTargetsAllowed && (
        <div className="flex items-start gap-3 bg-yellow-500/8 border border-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-5 py-4 rounded-2xl text-sm">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p><span className="font-bold">Private targets are enabled.</span> Localhost and private network addresses can be scanned on this backend.</p>
        </div>
      )}

      {/* Quota warning */}
      {quotaWarning && (
        <div className="flex items-start gap-3 bg-orange-500/8 border border-orange-500/20 text-orange-600 px-5 py-4 rounded-2xl text-sm">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01" strokeLinecap="round"/>
          </svg>
          <p>
            Browser storage is full — this scan was not saved.{' '}
            <Link to="/reports" className="font-bold underline underline-offset-2 hover:no-underline">Open Reports</Link>{' '}
            to delete older scans.
          </p>
        </div>
      )}

      {/* Active scan view OR empty state */}
      {scan ? (
        <div className="space-y-5">
          <ProgressPanel scan={scan} connected={connected} streamError={streamError} />
          <ScanResults
            scan={{ ...scan, findings: findingsWithStatus }}
            onFindingStatusChange={onFindingStatusChange}
          />
        </div>
      ) : (
        <div className="bg-surface-card border border-border-subtle rounded-2xl p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-surface-raised border border-border-subtle flex items-center justify-center mx-auto mb-5 text-ink-secondary">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="text-lg font-black text-ink-primary mb-2">Ready to assess</h3>
          <p className="text-sm text-ink-secondary max-w-md mx-auto leading-relaxed">
            Enter a target URL above and confirm authorization to begin. The crawler will map all reachable endpoints and run safe, non-destructive vulnerability checks.
          </p>
          <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
            <Link to="/reports"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-subtle bg-surface-bg text-ink-secondary rounded-xl text-xs font-bold hover:border-ink-secondary hover:text-ink-primary transition-colors">
              View past reports
            </Link>
            <Link to="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-subtle bg-surface-bg text-ink-secondary rounded-xl text-xs font-bold hover:border-ink-secondary hover:text-ink-primary transition-colors">
              How checks work
            </Link>
          </div>
        </div>
      )}

      <ConfigDialog
        open={dialogOpen}
        config={config}
        limits={limits}
        onSave={onSaveConfig}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}
