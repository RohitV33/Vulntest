import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import { DashboardLayout } from './components/DashboardLayout.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { ScannerPage } from './pages/ScannerPage.jsx';
import { HistoryPage } from './pages/HistoryPage.jsx';
import { ScanViewPage } from './pages/ScanViewPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { ReportsPage } from './pages/ReportsPage.jsx';

export default function App() {
  const location = useLocation();
  
  // List of paths that should use the DashboardLayout
  const dashboardPaths = ['/dashboard', '/scanner', '/history', '/scans'];
  const isDashboardRoute = dashboardPaths.some(path => location.pathname.startsWith(path));

  if (isDashboardRoute) {
    return (
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/scans/:id" element={<ScanViewPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col transition-colors">
      <Header />
      
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
