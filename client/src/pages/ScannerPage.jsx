import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ScanLauncher } from '../components/ScanLauncher.jsx';
import { ConfigDialog } from '../components/ConfigDialog.jsx';
import { ProgressPanel } from '../components/ProgressPanel.jsx';
import { ScanResults } from '../components/ScanResults.jsx';
import { Card } from '../components/ui/Card.jsx';
import { EmptyState } from '../components/ui/EmptyState.jsx';
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
    <div className="space-y-6 animate-fade-in">
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

      {privateTargetsAllowed ? (
        <Card className="border-sev-medium/40 bg-sev-medium/5">
          <p className="text-xs text-ink-2">
            <span className="font-medium text-ink">Private targets are enabled on this backend.</span>{' '}
            ALLOW_PRIVATE_TARGETS is set, so localhost and private network addresses can be scanned.
          </p>
        </Card>
      ) : null}

      {quotaWarning ? (
        <Card className="border-sev-medium/40">
          <p className="text-xs text-ink-2">
            This scan could not be saved to localStorage - the browser store is full. Delete older scans from{' '}
            <Link to="/history" className="text-accent underline underline-offset-2">
              scan history
            </Link>{' '}
            to make room.
          </p>
        </Card>
      ) : null}

      {scan ? (
        <div className="space-y-6 animate-slide-up">
          <ProgressPanel scan={scan} connected={connected} streamError={streamError} />
          <ScanResults
            scan={{ ...scan, findings: findingsWithStatus }}
            onFindingStatusChange={onFindingStatusChange}
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-surface-1 p-8 text-center shadow-xs">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent mb-4">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-ink">Ready for Security Assessment</h3>
          <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-ink-2">
            Enter any authorized target above or select a preset pill like{' '}
            <strong className="text-ink">Acunetix PHP Testbed</strong> to begin. The crawler will map endpoints and
            execute safe, non-destructive vulnerability checks.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Link
              to="/history"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-xs font-semibold text-ink hover:border-accent hover:text-accent transition-colors"
            >
              Open Previous Scans
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-xs font-semibold text-ink hover:border-accent hover:text-accent transition-colors"
            >
              Learn How Checks Stay Safe
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
