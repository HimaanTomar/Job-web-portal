import React, { useState } from 'react';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { Header } from './components/Layout/Header';
import { JobSeekerDashboard } from './pages/JobSeekerDashboard';
import { EmployerDashboard } from './pages/EmployerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { JobListing } from './pages/JobListing';
import { PostJob } from './pages/PostJob';

function AppContent() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return showLogin ? (
      <LoginForm onToggleForm={() => setShowLogin(false)} />
    ) : (
      <RegisterForm onToggleForm={() => setShowLogin(true)} />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        if (user.role === 'jobseeker') return <JobSeekerDashboard onPageChange={setCurrentPage} />;
        if (user.role === 'employer') return <EmployerDashboard onPageChange={setCurrentPage} />;
        if (user.role === 'admin') return <AdminDashboard />;
        break;
      case 'jobs':
        return <JobListing />;
      case 'post-job':
        return user.role === 'employer' ? <PostJob /> : <JobListing />;
      case 'applications':
        return <div className="max-w-7xl mx-auto px-4 py-8"><h1 className="text-2xl font-bold">Applications</h1></div>;
      case 'users':
        return user.role === 'admin' ? <div className="max-w-7xl mx-auto px-4 py-8"><h1 className="text-2xl font-bold">User Management</h1></div> : <JobListing />;
      case 'analytics':
        return user.role === 'admin' ? <div className="max-w-7xl mx-auto px-4 py-8"><h1 className="text-2xl font-bold">Analytics</h1></div> : <JobListing />;
      default:
        return <JobListing />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>{renderPage()}</main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;