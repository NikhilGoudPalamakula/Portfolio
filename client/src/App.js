import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ProtectedRoute from '@/auth/ProtectedRoute';
import HomePage from '@/pages/HomePage';
import WorkPage from '@/pages/WorkPage';
import ProjectPage from '@/pages/ProjectPage';
import AboutPage from '@/pages/AboutPage';
import SkillsPage from '@/pages/SkillsPage';
import LoginPage from '@/pages/LoginPage';
import AdminPage from '@/pages/AdminPage';
import NotFoundPage from '@/pages/NotFoundPage';

const App = () => (
  <Routes>
    {/* Standalone — no site shell */}
    <Route path="/login" element={<LoginPage />} />

    {/* Public site */}
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/work/:slug" element={<ProjectPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      {/* Retired pages — keep old links working.
          Path merged into Work; contact details now close every page. */}
      <Route path="/path" element={<Navigate to="/work" replace />} />
      <Route path="/contact" element={<Navigate to="/" replace />} />

      {/* Auth-gated area — scaffolding, nothing public depends on it */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;
