import { useState, useEffect } from 'react';
import { Job } from '../types';
import { mockJobs } from '../data/mockData';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 500);
  }, []);

  const addJob = (job: Omit<Job, 'id' | 'postedAt' | 'applicationsCount'>) => {
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
      postedAt: new Date(),
      applicationsCount: 0,
    };
    setJobs(prev => [newJob, ...prev]);
    return newJob;
  };

  const updateJob = (jobId: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, ...updates } : job
    ));
  };

  const deleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  };

  return { jobs, loading, addJob, updateJob, deleteJob };
}