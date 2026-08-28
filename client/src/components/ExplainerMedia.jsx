import { useState, useEffect } from 'react';

const SIMULATION_SCENARIOS = [
  {
    id: 'xss',
    name: 'Reflected XSS Analysis',
    badge: 'High Severity',
    badgeColor: 'text-sev-high bg-sev-high/10 border-sev-high/30',
    target: 'http://testphp.vulnweb.com/search.php?test=query',
    param: 'test',
    steps: [
      { label: 'Crawl & Discovery', detail: 'Identified GET parameter "test" in search bar form on /search.php' },
      { label: 'Safe Payload Injection', detail: 'Dispatched harmless canary token: "vscan_7f3a9\'<>" (zero executable code)' },
      { label: 'Response Reflection Check', detail: 'Received HTTP 200. Detected unencoded characters (\', <, >) in HTML context.' },
      { label: 'Triage & Remediation', detail: 'Generated Finding: Reflected XSS. Confidence: HIGH. Remediation: Context-aware HTML entity encoding.' },
    ],
    payload: 'test=vscan_7f3a9\'<>',
    evidence: '<input type="text" value="vscan_7f3a9\'<>">\n<!-- Unescaped quote breaks out of attribute context -->',
    fixCode: '// Fix: Always encode untrusted input before rendering into HTML\nconst safeInput = DOMPurify.sanitize(req.query.test);\n// Or template engine auto-escaping (e.g. ejs <%= safeInput %>)',
  },
  {
    id: 'sqli',
    name: 'SQL Injection Differential',
    badge: 'High Severity',
    badgeColor: 'text-sev-high bg-sev-high/10 border-sev-high/30',
    target: 'http://testphp.vulnweb.com/artists.php?artist=1',
    param: 'artist',
    steps: [
      { label: 'Baseline Baseline Fetch', detail: 'Sampled baseline HTTP 200 response length (1,420 bytes) for artist=1' },
      { label: 'Syntax Perturbation Probe', detail: 'Sent quote probe: artist=1\' to test for SQL syntax error triggers.' },
      { label: 'Boolean Equivalence Check', detail: 'Probed artist=1 AND 1=1 (matches baseline) vs artist=1 AND 1=2 (empty state).' },
      { label: 'Triage & Remediation', detail: 'Generated Finding: Boolean-based SQL Injection. Confidence: HIGH. Read-only probe; no data altered.' },
    ],
    payload: 'artist=1\' OR 1=1 --',
    evidence: 'Database error: You have an error in your SQL syntax near "\'" at line 1\nDifferential similarity: 98.4% variance observed between truth conditions.',
    fixCode: '// Fix: Use Parameterized Prepared Statements (never string concatenation)\nconst [rows] = await db.execute(\n  "SELECT * FROM artists WHERE id = ?",\n  [req.query.artist]\n);',
  },
  {
    id: 'ssrf',
    name: 'SSRF & DNS Rebinding Shield',
    badge: 'Security Guard',
    badgeColor: 'text-accent bg-accent/10 border-accent/30',
    target: 'http://169.254.169.254/latest/meta-data/',
    param: 'hostname',
    steps: [
      { label: 'Pre-flight Validation', detail: 'Checked target protocol (http:), port (80), and address structure.' },
      { label: 'IP Range Classification', detail: 'Evaluated against RFC 1918, link-local (169.254.0.0/16) and cloud metadata blocks.' },
      { label: 'Socket-Level Guard', detail: 'Verified DNS address at TCP connect time via custom safeLookup agent hook.' },
      { label: 'Blocked Request', detail: 'BlockedTargetError: Refused target in link-local cloud metadata range.' },
    ],
    payload: 'GET http://169.254.169.254/latest/meta-data/',
    evidence: 'STATUS 400: Target IP 169.254.169.254 is not allowed: link-local or cloud metadata address.',
    fixCode: '// Server Defense: Multi-layer SSRF Guard\nconst { blocked, reason } = classifyIp(resolvedAddress);\nif (blocked) throw new BlockedTargetError(`Forbidden: ${reason}`);',
  },
];

export function ExplainerMedia() {
  const [activeTab, setActiveTab] = useState('simulator');
  const [selectedScenario, setSelectedScenario] = useState(SIMULATION_SCENARIOS[0]);
  const [simulating, setSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startSimulation = () => {
    setSimulating(true);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (!simulating) return;
    if (currentStep < selectedScenario.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 750);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        setSimulating(false);
      }, 1000);
      return () => clearTimeout(finishTimer);
    }
  }, [simulating, currentStep, selectedScenario]);

  return (
    <section className="rounded-2xl border border-line bg-surface-1 p-6 shadow-xs sm:p-8">
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
              Interactive Lab & Architecture
            </span>
            <span className="text-xs text-ink-muted">Everything you need to demonstrate & explain</span>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-ink sm:text-2xl">
            How the Scanner Works Under the Hood
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-lg border border-line bg-surface-2 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'simulator'
                ? 'bg-surface-1 text-ink shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Live Simulator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'architecture'
                ? 'bg-surface-1 text-ink shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            5-Stage Pipeline
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('interview')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'interview'
                ? 'bg-surface-1 text-ink shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Interviewer Q&A Guide
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive Scanner Simulator */}
      {activeTab === 'simulator' && (
        <div className="mt-6 space-y-6">
          {/* Scenario Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-ink-muted">Select Vulnerability Test Case:</span>
            {SIMULATION_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                onClick={() => {
                  setSelectedScenario(scenario);
                  setCurrentStep(0);
                  setSimulating(false);
                }}
                className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedScenario.id === scenario.id
                    ? 'border-accent bg-accent/10 font-semibold text-accent'
                    : 'border-line bg-surface-2/60 text-ink-2 hover:border-line hover:text-ink'
                }`}
              >
                <span>{scenario.name}</span>
                <span className={`rounded px-1.5 py-0.2 text-[10px] border ${scenario.badgeColor}`}>
                  {scenario.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Simulator Box */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left: Execution Steps */}
            <div className="space-y-4 rounded-xl border border-line bg-surface-2/40 p-5 lg:col-span-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-ink">{selectedScenario.name} Simulation</h3>
                  <p className="font-mono text-xs text-ink-muted truncate">{selectedScenario.target}</p>
                </div>
                <button
                  type="button"
                  onClick={startSimulation}
                  disabled={simulating}
                  className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  {simulating ? 'Executing Step...' : 'Run Simulation'}
                </button>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3 pt-2">
                {selectedScenario.steps.map((step, idx) => {
                  const isDone = !simulating || idx <= currentStep;
                  const isCurrent = simulating && idx === currentStep;

                  return (
                    <div
                      key={step.label}
                      className={`flex gap-3 rounded-lg border p-3 transition-all duration-300 ${
                        isCurrent
                          ? 'border-accent bg-accent/5 ring-1 ring-accent/30'
                          : isDone
                          ? 'border-line bg-surface-1'
                          : 'border-line/40 bg-surface-1/40 opacity-40'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span
                          className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                            isDone
                              ? 'bg-accent text-white'
                              : 'bg-surface-3 text-ink-muted'
                          }`}
                        >
                          {idx + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-ink">{step.label}</h4>
                          {isCurrent && (
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-accent animate-pulse-subtle">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                              Active
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-ink-2">{step.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Technical Evidence & Code Fix */}
            <div className="space-y-4 rounded-xl border border-line bg-surface-1 p-5 lg:col-span-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    HTTP Probe & Evidence
                  </span>
                  <span className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-ink-2">
                    param: {selectedScenario.param}
                  </span>
                </div>
                <pre className="mt-2 overflow-x-auto rounded-lg border border-line bg-surface-0 p-3 font-mono text-xs text-ink">
                  <code>{selectedScenario.evidence}</code>
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-good">
                    Developer Remediation Code
                  </span>
                  <span className="text-[10px] font-medium text-ink-muted">Production Secure Fix</span>
                </div>
                <pre className="mt-2 overflow-x-auto rounded-lg border border-line bg-surface-0 p-3 font-mono text-xs text-ink-2">
                  <code>{selectedScenario.fixCode}</code>
                </pre>
              </div>

              <div className="rounded-lg bg-surface-2/60 p-3 text-xs text-ink-2">
                <span className="font-semibold text-ink">Why this is safe: </span>
                Probes use unique randomized tokens with zero destructive commands or recursive payloads.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 5-Stage Pipeline Architecture */}
      {activeTab === 'architecture' && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                step: '01',
                title: 'URL & SSRF Shield',
                desc: 'Pre-flight checks URL scheme, port, hostname, and verifies DNS addresses against RFC 1918 & cloud metadata at connect time.',
                tag: 'Security Layer',
              },
              {
                step: '02',
                title: 'Origin Crawler',
                desc: 'BFS crawl engine with concurrency control, robots.txt compliance, URL deduplication, and trap avoidance.',
                tag: 'Discovery',
              },
              {
                step: '03',
                title: 'Form & Param Parser',
                desc: 'Extracts GET query strings, POST actions, input types, and JS endpoint references into a structured attack surface graph.',
                tag: 'Inventory',
              },
              {
                step: '04',
                title: 'Non-Destructive Checks',
                desc: 'Injects harmless randomized canary tokens. Evaluates reflection, SQL error signatures, boolean variance, and headers.',
                tag: 'Analysis Engine',
              },
              {
                step: '05',
                title: 'Triage & Dashboard',
                desc: 'Aggregates findings with CVSS scores, raw HTTP evidence traces, and developer remediation diffs.',
                tag: 'Reporting',
              },
            ].map((card) => (
              <div
                key={card.step}
                className="group relative flex flex-col justify-between rounded-xl border border-line bg-surface-2/50 p-4 transition-all hover:border-accent/40 hover:bg-surface-2"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-extrabold text-accent/80">{card.step}</span>
                    <span className="rounded bg-surface-1 px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted">
                      {card.tag}
                    </span>
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-ink">{card.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-2">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Summary Note */}
          <div className="rounded-xl border border-line bg-surface-2/40 p-4 text-xs text-ink-2">
            <span className="font-semibold text-ink">Built for authorized auditing: </span>
            The scanner strictly isolates itself to the approved target origin, caps crawl depth, respects rate limits, and maintains zero persistence on external servers.
          </div>
        </div>
      )}

      {/* Tab 3: Interviewer Q&A Guide */}
      {activeTab === 'interview' && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            {
              q: 'How does your scanner detect Reflected XSS without running dangerous payloads?',
              a: 'Instead of injecting executable `<script>alert(1)</script>` which could pollute data or trigger WAF blocks, we send a unique randomized canary string combined with benign test characters (\' " < >). We parse the response HTML and measure whether these characters survived unencoded and whether they reside in raw HTML, attribute, or JavaScript contexts.',
            },
            {
              q: 'How does the SSRF Guard prevent DNS Rebinding attacks?',
              a: 'A common vulnerability occurs when a domain points to a public IP during pre-validation, but resolves to 127.0.0.1 a second later when the HTTP socket opens. Our custom `safeLookup` hook intercepts DNS resolution directly inside Node HTTP agents at connection time, verifying the target IP again before the TCP handshake.',
            },
            {
              q: 'How does the crawler prevent infinite crawling loops & traps?',
              a: 'The crawler normalizes query parameters, ignores tracking tags (utm_*, gclid), detects calendar/pagination depth patterns, and calculates URL signature hashes. It enforces a strict max-depth, max-page budget, and visited-set registry.',
            },
            {
              q: 'How are SQL Injection vulnerabilities detected in a read-only manner?',
              a: 'We use dual-check methodology: (1) Error-based signature inspection using regex against known database syntax errors, and (2) Differential boolean equivalence where always-true (`AND 1=1`) and always-false (`AND 1=2`) queries are mathematically compared against the baseline page length.',
            },
          ].map((item, idx) => (
            <div key={idx} className="rounded-xl border border-line bg-surface-2/40 p-5 space-y-2">
              <div className="flex items-start gap-2">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-accent/10 font-mono text-xs font-bold text-accent">
                  Q
                </span>
                <h4 className="text-sm font-bold text-ink">{item.q}</h4>
              </div>
              <div className="pl-7 text-xs leading-relaxed text-ink-2">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
