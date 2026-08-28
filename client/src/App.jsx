import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { HistoryPage } from './pages/HistoryPage.jsx';
import { ScanViewPage } from './pages/ScanViewPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-surface-0 flex flex-col justify-between transition-colors">
      <div>
        <Header />
        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scanner" element={<DashboardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/scans/:id" element={<ScanViewPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <footer className="border-t border-line/60 bg-surface-1/50 py-6 transition-colors">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-good"></span>
            <span className="text-xs font-semibold text-ink">AegisScan Security Engine</span>
            <span className="text-xs text-ink-muted">· Authorized Auditing Only</span>
          </div>
          <p className="text-[11px] text-ink-muted">
            Non-destructive scanning engine. Scan results are stored in browser localStorage.
          </p>
        </div>
      </footer>
    </div>
  );
}
