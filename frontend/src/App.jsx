import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HRLoginPage from './pages/HRLoginPage';
import RegisterPage from './pages/RegisterPage';
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import CVFormPage from './pages/candidate/CVFormPage';
import InterviewPage from './pages/candidate/InterviewPage';
import HRDashboard from './pages/hr/HRDashboard';
import CreateJobPostingPage from './pages/hr/CreateJobPostingPage';
import JobPostingDetailPage from './pages/hr/JobPostingDetailPage';
import CandidateReportPage from './pages/hr/CandidateReportPage';
import FakeAdminPage from './pages/FakeAdminPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) {
    return <Navigate to={user?.role === 'hr' ? '/hr/dashboard' : '/candidate/dashboard'} replace />;
  }
  return children;
};

const RootRedirect = () => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={user?.role === 'hr' ? '/hr/dashboard' : '/candidate/dashboard'} replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/hr-login" element={<HRLoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/admin" element={<FakeAdminPage />} />
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/terms" element={<TermsPage />} />

    <Route path="/candidate/dashboard" element={
      <ProtectedRoute role="candidate"><CandidateDashboard /></ProtectedRoute>
    } />
    <Route path="/candidate/cv" element={
      <ProtectedRoute role="candidate"><CVFormPage /></ProtectedRoute>
    } />
    <Route path="/candidate/interview" element={
      <ProtectedRoute role="candidate"><InterviewPage /></ProtectedRoute>
    } />

    <Route path="/hr/dashboard" element={
      <ProtectedRoute role="hr"><HRDashboard /></ProtectedRoute>
    } />
    <Route path="/hr/create-job" element={
      <ProtectedRoute role="hr"><CreateJobPostingPage /></ProtectedRoute>
    } />
    <Route path="/hr/job/:id" element={
      <ProtectedRoute role="hr"><JobPostingDetailPage /></ProtectedRoute>
    } />
    <Route path="/hr/report/:interviewId" element={
      <ProtectedRoute role="hr"><CandidateReportPage /></ProtectedRoute>
    } />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
