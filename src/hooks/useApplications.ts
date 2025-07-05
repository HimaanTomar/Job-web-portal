import { useState, useEffect } from 'react';
import { Application } from '../types';
import { mockApplications } from '../data/mockData';

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setApplications(mockApplications);
      setLoading(false);
    }, 300);
  }, []);

  const addApplication = (application: Omit<Application, 'id' | 'appliedAt'>) => {
    const newApplication: Application = {
      ...application,
      id: Date.now().toString(),
      appliedAt: new Date(),
    };
    setApplications(prev => [newApplication, ...prev]);
    return newApplication;
  };

  const updateApplication = (applicationId: string, updates: Partial<Application>) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, ...updates } : app
    ));
  };

  return { applications, loading, addApplication, updateApplication };
}