import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ScanLauncher } from '../components/ScanLauncher.jsx';
import { ProgressPanel } from '../components/ProgressPanel.jsx';
import { ScanResults } from '../components/ScanResults.jsx';
import { useScanStream } from '../hooks/useScanStream.js';
import { useScanHistory } from '../hooks/useScanHistory.js';
import { getScanConfig, startScan, stopScan } from '../services/api.js';
import { loadSettings, updateFindingStatus } from '../utils/storage.js';

const ACTIVE_SCAN_KEY = 'vulnscan:activeScanId';

const FALLBACK_CONFIG = {
  maxPages: 50,
  maxDepth: 3,
  concurrency: 2,
  requestTimeoutMs: 10_000,
  delayMs: 250,
  maxRequests: 1_000,
  maxScanDurationMs: 600_000,
  respectRobots: true,
  allowSubdomains: false,
  testForms: true,
  testPostForms: false,
  checks: { xss: true, sqli: true, pathTraversal: true, passive: true },
};

export function ScannerPage() {
  const [searchParams] = useSearchParams();
  const initialTarget = searchParams.get('target') || '';

  const [target, setTarget] = useState(initialTarget);
  const [authorized, setAuthorized] = useState(Boolean(initialTarget));
  const [config] = useState(() => loadSettings(FALLBACK_CONFIG));
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
  const { save } = useScanHistory();
  const savedRef = useRef(new Set());

  // Listen to search param updates (e.g. from Dashboard quick scan)
  useEffect(() => {
    const urlTarget = searchParams.get('target');
    if (urlTarget) {
      setTarget(urlTarget);
      setAuthorized(true);
    }
  }, [searchParams]);

  // Remember active scan across reloads
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

  // Persist completed scan once
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

  const onFindingStatusChange = (findingId, status) => {
    setStatusOverrides((previous) => ({ ...previous, [findingId]: status }));
    if (finished && scan?.id) updateFindingStatus(scan.id, findingId, status);
  };

  const running = Boolean(scan) && !finished;

  return (
    <div className="space-y-6">
      {/* Scan Launcher Module */}
      <ScanLauncher
        target={target}
        onTargetChange={setTarget}
        authorized={authorized}
        onAuthorizedChange={setAuthorized}
        onStart={onStart}
        onStop={onStop}
        running={running}
        busy={starting}
        error={error}
        config={config}
      />

      {/* Active Scan Progress and Results */}
      {scan ? (
        <div className="space-y-6 animate-slide-up">
          <ProgressPanel scan={scan} connected={connected} streamError={streamError} />
          <ScanResults
            scan={{ ...scan, findings: findingsWithStatus }}
            onFindingStatusChange={onFindingStatusChange}
          />
        </div>
      ) : (
        <div className="bg-surface-card border border-border-subtle rounded-3xl p-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-surface-raised border border-border-subtle flex items-center justify-center mx-auto mb-4 text-ink-secondary">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="text-base font-bold text-ink-primary">Ready to Scan</h3>
          <p className="text-xs text-ink-secondary max-w-md mx-auto mt-1 leading-relaxed">
            Enter any target URL above or select the <strong className="text-ink-primary">PHP Testbed</strong> preset to see the crawler find vulnerabilities in real-time.
          </p>
        </div>
      )}
    </div>
  );
}
