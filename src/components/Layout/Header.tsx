import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, LogOut, Briefcase } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const { user, logout } = useAuth();

  const getNavItems = () => {
    switch (user?.role) {
      case 'jobseeker':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'jobs', label: 'Browse Jobs' },
          { id: 'applications', label: 'My Applications' },
        ];
      case 'employer':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'jobs', label: 'My Jobs' },
          { id: 'post-job', label: 'Post Job' },
          { id: 'applications', label: 'Applications' },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'users', label: 'Users' },
          { id: 'jobs', label: 'All Jobs' },
          { id: 'analytics', label: 'Analytics' },
        ];
      default:
        return [];
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">JobPortal</span>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              {getNavItems().map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentPage === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">
                {user?.role}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}