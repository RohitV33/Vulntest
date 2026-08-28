import { Card, CardHeader } from '../components/ui/Card.jsx';
import { Link } from 'react-router-dom';

function List({ items }) {
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-ink-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-2">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function AboutPage() {
  return (
    <div className="space-y-8 pb-8 animate-fade-in">
      {/* Top Banner */}
      <div className="rounded-2xl border border-line bg-gradient-to-r from-surface-1 to-surface-2/40 p-6 shadow-xs sm:p-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center rounded-md bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
            Architecture & Ethical Guidelines
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Responsible Web Vulnerability Scanning Engine
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed text-ink-2">
            A comprehensive overview of the design choices, guardrails, non-destructive payloads, and multi-layer
            defenses implemented across the crawler and detection modules.
          </p>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <CardHeader
            title="What this tool is for"
            subtitle="Authorized assessment of websites you own or have explicit written permission to test."
          />
          <p className="text-xs sm:text-sm leading-relaxed text-ink-2 mt-2">
            The scanner maps a single origin, inventories its endpoints, and identifies evidence of common security flaws
            (Reflected XSS, SQL Injection, Path Traversal, Missing Security Headers & Cookie configurations). Every finding
            is accompanied by raw HTTP evidence and remediation guidance so developers can reproduce and patch issues.
          </p>
        </Card>

        <Card className="p-6">
          <CardHeader
            title="How the checks stay non-destructive"
            subtitle="Zero exploitation, zero credential stuffing, zero persistent state changes."
          />
          <div className="mt-2">
            <List
              items={[
                'XSS: Harmless randomized canary tokens with test characters (\' " < >). Evaluates reflection without executing code.',
                'SQL injection: Quote syntax perturbation and quote-balanced boolean equivalence (AND 1=1 vs 1=2) compared against baseline responses. Read-only.',
                'Path traversal: Probes use randomized nonexistent file patterns to detect file disclosure indicators without accessing /etc/passwd or sensitive files.',
                'Passive checks: Evaluates response headers and cookies already fetched during crawling (zero extra network cost).',
                'Authentication forms: Password fields and sensitive tokens (csrf, session, token) are excluded from active probe fuzzing.',
              ]}
            />
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader
            title="Self-Enforced Guardrails & SSRF Shield"
            subtitle="Built-in protections to prevent misuse or denial-of-service."
          />
          <div className="mt-2">
            <List
              items={[
                'Single Origin Policy: Scanner never wanders outside the target origin. Off-scope links are recorded but never requested.',
                'SSRF & Rebinding Filter: RFC 1918 private IPs (10.x, 172.16.x, 192.168.x), loopback (127.0.0.1), link-local, and cloud metadata (169.254.169.254) are refused at both DNS and TCP connect time.',
                'Strict Server Caps: Page count (max 100 default), crawl depth (3), concurrency (2), and timeout limits are enforced on the backend.',
                'robots.txt compliance: Disallow rules and Crawl-delay directives are respected automatically.',
              ]}
            />
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader
            title="Interviewer Talking Points"
            subtitle="Key technical decisions to highlight when explaining this project."
          />
          <div className="mt-2 space-y-3 text-xs leading-relaxed text-ink-2">
            <div className="rounded-lg bg-surface-2 p-3">
              <strong className="text-ink font-semibold">1. Socket-Level SSRF Protection: </strong>
              Explain how you hooked into Node&apos;s HTTP agent `safeLookup` callback to validate IP addresses right before the TCP handshake, thwarting DNS-rebinding attacks.
            </div>
            <div className="rounded-lg bg-surface-2 p-3">
              <strong className="text-ink font-semibold">2. Differential Boolean Analysis: </strong>
              Explain how comparing body similarity and length variances across truth conditions allows detecting SQLi without dangerous exploitation payloads.
            </div>
            <div className="rounded-lg bg-surface-2 p-3">
              <strong className="text-ink font-semibold">3. Real-Time Streaming: </strong>
              Explain how Server-Sent Events (SSE) stream incremental crawl and discovery progress to the React frontend in real-time.
            </div>
          </div>
        </Card>
      </div>

      {/* Footer CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-line bg-surface-1 p-6">
        <div>
          <h3 className="text-sm font-bold text-ink">Ready to run an authorized security test?</h3>
          <p className="text-xs text-ink-muted">Jump to the live scanner lab with preset authorized targets.</p>
        </div>
        <Link
          to="/scanner"
          className="rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:opacity-90 transition-opacity"
        >
          Open Scanner Lab
        </Link>
      </div>
    </div>
  );
}
