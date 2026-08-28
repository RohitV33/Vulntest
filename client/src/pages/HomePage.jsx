import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FAQS = [
  {
    q: 'Is AegisScan safe to run on production web applications?',
    a: 'Yes. AegisScan is strictly non-destructive. It does not perform credential stuffing, denial-of-service, or database modification. Probes use randomized canary tokens to test for unencoded reflection and safe mathematical differentials (AND 1=1 vs 1=2) for SQL injection.',
  },
  {
    q: 'How does the SSRF Guard prevent cloud metadata attacks?',
    a: 'The backend evaluates target IPs against RFC 1918 private ranges and cloud metadata IPs (169.254.169.254). Furthermore, a socket-level DNS hook (safeLookup) validates the resolved IP at TCP connect time, closing the DNS-rebinding window.',
  },
  {
    q: 'Can I export the vulnerability report for development teams?',
    a: 'Yes. Every completed scan can be exported as structured JSON or printed into a developer-ready PDF report containing full HTTP evidence traces and drop-in remediation code.',
  },
  {
    q: 'How does the crawler avoid infinite crawling loops?',
    a: 'The crawler normalizes query parameters, ignores tracking tags (utm_*, gclid), detects calendar/pagination depth patterns, and calculates URL signature hashes with strict depth and page count limits.',
  },
];

const LOGOS = [
  { name: 'Node.js', label: 'Node.js' },
  { name: 'React', label: 'React 18' },
  { name: 'Express', label: 'Express.js' },
  { name: 'Vite', label: 'Vite' },
  { name: 'Cheerio', label: 'Cheerio Crawler' },
  { name: 'OWASP', label: 'OWASP Top 10' },
];

export function HomePage() {
  const navigate = useNavigate();
  const [roleTab, setRoleTab] = useState('auditor'); // 'auditor' | 'developer'
  const [openFaq, setOpenFaq] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const handlePresetClick = (url) => {
    navigate(`/scanner?target=${encodeURIComponent(url)}`);
  };

  return (
    <div className="space-y-20 pb-16 animate-fade-in">
      {/* 1. HERO SECTION (Liftoff Style with Ambient Glow Mesh & Floating Cards) */}
      <section className="relative pt-6 pb-12 sm:pt-12 sm:pb-20 text-center">
        {/* Large Ambient Glow Mesh in Background */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[90%] max-w-4xl rounded-full glow-mesh opacity-70" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-4">
          {/* Main Serif Headline */}
          <h1 className="font-serif text-4xl font-normal tracking-tight text-ink sm:text-6xl md:text-7xl leading-[1.08]">
            Find critical vulnerabilities,
            <br />
            <span className="italic">through precision you trust.</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-ink-2 sm:text-base">
            Authorized web security assessment and single-origin attack surface mapping. Test harmless canary payloads,
            evaluate SQLi differentials, and deliver drop-in code fixes.
          </p>

          {/* Dark Pill CTA Button */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/scanner"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-sm font-semibold text-surface-0 shadow-lg hover:opacity-90 transition-transform active:scale-95"
            >
              <span>Launch Live Scanner</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-1/80 backdrop-blur-xs px-6 py-3 text-sm font-medium text-ink shadow-xs hover:bg-surface-2 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent fill-current">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Watch Architecture Video</span>
            </button>
          </div>
        </div>

        {/* Floating Connected Cards on Ambient Mesh (Liftoff Hero Style) */}
        <div className="relative z-10 mx-auto mt-12 max-w-4xl px-4">
          <div className="relative flex flex-wrap items-center justify-center gap-4 py-8">
            {/* Floating Card 1: XSS */}
            <div className="animate-float rounded-2xl border border-line/80 bg-surface-1/90 backdrop-blur-md p-4 shadow-xl text-left max-w-xs transition-all hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-sev-high/10 text-sev-high font-bold text-xs">
                  XSS
                </div>
                <div>
                  <p className="text-xs font-bold text-ink">Reflected XSS Detected</p>
                  <p className="font-mono text-[11px] text-ink-muted">param: &quot;NewsAd&quot; on /ReadNews</p>
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between border-t border-line/60 pt-2 text-[11px]">
                <span className="text-ink-2">Canary Token Reflected</span>
                <span className="rounded bg-sev-high/10 px-1.5 py-0.2 font-semibold text-sev-high">HIGH</span>
              </div>
            </div>

            {/* Floating Card 2: SSRF Shield */}
            <div className="animate-float-delayed rounded-2xl border border-line/80 bg-surface-1/90 backdrop-blur-md p-4 shadow-xl text-left max-w-xs transition-all hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-accent/10 text-accent font-bold text-xs">
                  SSRF
                </div>
                <div>
                  <p className="text-xs font-bold text-ink">Socket Rebinding Shield</p>
                  <p className="font-mono text-[11px] text-ink-muted">169.254.169.254 Blocked</p>
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between border-t border-line/60 pt-2 text-[11px]">
                <span className="text-ink-2">TCP Connect Verified</span>
                <span className="rounded bg-good/10 px-1.5 py-0.2 font-semibold text-good">PROTECTED</span>
              </div>
            </div>

            {/* Floating Card 3: SQLi */}
            <div className="animate-float rounded-2xl border border-line/80 bg-surface-1/90 backdrop-blur-md p-4 shadow-xl text-left max-w-xs transition-all hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-sev-medium/10 text-sev-medium font-bold text-xs">
                  SQLi
                </div>
                <div>
                  <p className="text-xs font-bold text-ink">Boolean Differential</p>
                  <p className="font-mono text-[11px] text-ink-muted">AND 1=1 vs 1=2 Variance</p>
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between border-t border-line/60 pt-2 text-[11px]">
                <span className="text-ink-2">Zero Data Modified</span>
                <span className="rounded bg-accent/10 px-1.5 py-0.2 font-semibold text-accent">READ-ONLY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TECH LOGO WALL (Matching Reference) */}
      <section className="text-center space-y-4 border-y border-line/60 py-8 bg-surface-1/30">
        <p className="text-xs font-medium uppercase tracking-widest text-ink-muted">
          Enterprise Security Standards Built on Open Foundations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75">
          {LOGOS.map((logo) => (
            <span key={logo.name} className="font-mono text-sm font-semibold text-ink-2">
              {logo.label}
            </span>
          ))}
        </div>
      </section>

      {/* 3. CORE VALUE PROPOSITION (3 Circular Pillars - Matching Reference) */}
      <section className="text-center space-y-10">
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-normal text-ink sm:text-4xl">
            Security assessment that feels seamless.
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto">
            Engineered for developers, trusted by security auditors.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto px-4">
          {[
            {
              icon: '🛡️',
              title: 'Non-Destructive by Design',
              desc: 'Harmless canary tokens measure reflection without executing scripts or altering database states.',
            },
            {
              icon: '⚡',
              title: 'Real-Time SSE Streaming',
              desc: 'Server-Sent Events stream discovered URLs, forms, and findings directly to the React UI as they occur.',
            },
            {
              icon: '📋',
              title: 'Drop-In Developer Fixes',
              desc: 'Every vulnerability report provides concrete code snippets with sanitization and parameterization diffs.',
            },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-3 p-4">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-surface-2 text-2xl shadow-xs">
                {item.icon}
              </span>
              <h3 className="text-sm font-bold text-ink">{item.title}</h3>
              <p className="text-xs leading-relaxed text-ink-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. "HOW AEGISSCAN WORKS" ZIG-ZAG SHOWCASE WITH UI CARDS & VIDEO */}
      <section className="space-y-12 max-w-5xl mx-auto px-4">
        <div className="text-center space-y-3">
          <h2 className="font-serif text-3xl font-normal text-ink sm:text-4xl">
            How AegisScan works
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted">
            From single-origin crawling to socket-level SSRF guards and verified reports.
          </p>

          {/* Role Toggle Pills */}
          <div className="inline-flex rounded-full border border-line bg-surface-2 p-1">
            <button
              type="button"
              onClick={() => setRoleTab('auditor')}
              className={`rounded-full px-5 py-1.5 text-xs font-semibold transition-all ${
                roleTab === 'auditor' ? 'bg-ink text-surface-0 shadow-xs' : 'text-ink-muted hover:text-ink'
              }`}
            >
              For Security Auditors
            </button>
            <button
              type="button"
              onClick={() => setRoleTab('developer')}
              className={`rounded-full px-5 py-1.5 text-xs font-semibold transition-all ${
                roleTab === 'developer' ? 'bg-ink text-surface-0 shadow-xs' : 'text-ink-muted hover:text-ink'
              }`}
            >
              For Developers
            </button>
          </div>
        </div>

        {/* Zig-Zag Steps */}
        <div className="space-y-12">
          {/* Step 1: Card Left, Text Right */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-line bg-surface-1 p-6 shadow-sm glow-card-1">
              <div className="rounded-xl border border-line/60 bg-surface-1 p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-line pb-2">
                  <span className="font-mono text-xs font-bold text-ink">Origin Crawler Graph</span>
                  <span className="rounded bg-good/10 px-2 py-0.5 font-mono text-[10px] text-good">200 OK</span>
                </div>
                <div className="space-y-1.5 font-mono text-xs text-ink-2">
                  <div className="flex justify-between">
                    <span>GET /login.aspx</span>
                    <span className="text-ink-muted">Forms: 1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GET /ReadNews.aspx?id=0</span>
                    <span className="text-accent">Params: id, NewsAd</span>
                  </div>
                  <div className="flex justify-between">
                    <span>POST /comments.aspx</span>
                    <span className="text-ink-muted">Form: CSRF Check</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-accent">STEP 01</span>
              <h3 className="font-serif text-2xl font-normal text-ink sm:text-3xl">
                Build your attack surface graph & endpoint map.
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-ink-2">
                The crawler systematically traverses single-origin pages, parses HTML forms, isolates query strings,
                and registers URL signatures while respecting robots.txt and concurrency caps.
              </p>
            </div>
          </div>

          {/* Step 2: Text Left, Card Right */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-3 order-2 md:order-1">
              <span className="font-mono text-xs font-bold text-accent">STEP 02</span>
              <h3 className="font-serif text-2xl font-normal text-ink sm:text-3xl">
                Execute safe reflection & differential checks.
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-ink-2">
                Randomized canary tokens are injected to detect unencoded reflection in HTML, attribute, or JS contexts.
                SQL injection is evaluated through syntax perturbations and boolean similarity variance.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-surface-1 p-6 shadow-sm glow-card-2 order-1 md:order-2">
              <div className="rounded-xl border border-line/60 bg-surface-1 p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-line pb-2">
                  <span className="font-mono text-xs font-bold text-sev-high">Reflected XSS Analysis</span>
                  <span className="font-mono text-[10px] text-ink-muted">Harmless Canary</span>
                </div>
                <div className="rounded bg-surface-2 p-2 font-mono text-[11px] text-ink-2">
                  <code>&lt;input value=&quot;vscan_7f3a9&apos;&lt;&gt;&quot;&gt;</code>
                </div>
                <p className="text-[11px] text-ink-muted">
                  Unencoded quote character detected breaking out of attribute context.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 (Embedded YouTube / Video Player Section): Card Left, Text Right */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-line bg-surface-1 p-4 shadow-sm">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-inner">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1"
                  title="Web Security Scanning & Vulnerability Explainer Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-accent">STEP 03 · VIDEO EXPLAINER</span>
              <h3 className="font-serif text-2xl font-normal text-ink sm:text-3xl">
                See the entire security flow in action.
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-ink-2">
                Watch how the multi-layer SSRF filter guards against cloud metadata access and how real-time
                Server-Sent Events deliver findings instantly to the interactive dashboard.
              </p>
              <div className="pt-1">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:underline"
                >
                  Explore Technical Architecture Specs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AUTHORIZED DEMO PRESETS */}
      <section className="space-y-4 max-w-5xl mx-auto px-4">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-2xl font-normal text-ink sm:text-3xl">Authorized Quick-Test Targets</h2>
            <p className="text-xs text-ink-muted">1-click test targets prepared for live assessment.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              name: 'Acunetix PHP Testbed',
              url: 'http://testphp.vulnweb.com',
              type: 'PHP / MySQL',
              desc: 'Reflected XSS, SQL injection in artist/cat params.',
            },
            {
              name: 'Acunetix ASP Testbed',
              url: 'http://testasp.vulnweb.com',
              type: 'ASP.NET',
              desc: 'Forms without CSRF, plain HTTP login credentials.',
            },
            {
              name: 'Local Testbed Application',
              url: 'http://localhost:3000/testbed',
              type: 'Node.js Express',
              desc: 'Safe local development target included in repo.',
            },
          ].map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-line bg-surface-1 p-5 shadow-xs transition-all hover:border-accent/50"
            >
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-ink-muted uppercase">{t.type}</span>
                <h3 className="text-sm font-bold text-ink">{t.name}</h3>
                <p className="font-mono text-xs text-ink-muted truncate">{t.url}</p>
                <p className="text-xs text-ink-2 pt-1">{t.desc}</p>
              </div>

              <button
                type="button"
                onClick={() => handlePresetClick(t.url)}
                className="mt-4 rounded-full border border-line bg-surface-2 px-4 py-2 text-xs font-semibold text-ink hover:bg-ink hover:text-surface-0 transition-colors"
              >
                Scan This Target →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FULL-WIDTH DARK METALLIC CTA CARD (Matching Reference) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-stone-900 to-zinc-950 p-8 sm:p-12 text-center text-white shadow-2xl space-y-6">
          <h2 className="font-serif text-3xl font-normal tracking-tight sm:text-4xl text-white">
            Access enterprise-grade web auditing with AegisScan.
          </h2>
          <p className="mx-auto max-w-lg text-xs sm:text-sm text-zinc-300">
            Non-destructive scanning engine. Scan results are stored in browser localStorage and are never uploaded to
            third-party clouds.
          </p>
          <div className="pt-2">
            <Link
              to="/scanner"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-xs font-bold text-zinc-900 shadow-md hover:bg-zinc-100 transition-transform active:scale-95"
            >
              Launch Live Scanner Now
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION (Matching Reference) */}
      <section className="max-w-5xl mx-auto px-4 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4 space-y-2">
          <h2 className="font-serif text-2xl font-normal text-ink sm:text-3xl">
            Frequently asked questions
          </h2>
          <p className="text-xs text-ink-muted">Everything you need to know about the scanner and its safeguards.</p>
        </div>

        <div className="md:col-span-8 space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="rounded-2xl border border-line bg-surface-1 overflow-hidden transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-ink hover:text-accent transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="font-mono text-base text-ink-muted">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-ink-2 border-t border-line/40 pt-3">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Video Modal Popup if triggered */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-surface-1 shadow-2xl border border-line">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="text-xs font-bold text-ink">Web Security Scanning & Architecture Walkthrough</span>
              <button
                type="button"
                onClick={() => setShowVideo(false)}
                className="rounded-md p-1 text-ink-muted hover:text-ink"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Security Walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
