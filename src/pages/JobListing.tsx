import React, { useState, useMemo } from 'react';
import { useJobs } from '../hooks/useJobs';
import { useApplications } from '../hooks/useApplications';
import { useAuth } from '../contexts/AuthContext';
import { JobCard } from '../components/Jobs/JobCard';
import { JobFilters } from '../components/Jobs/JobFilters';
import { Job } from '../types';

export function JobListing() {
  const { user } = useAuth();
  const { jobs, loading } = useJobs();
  const { addApplication } = useApplications();
  
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    category: 'All Categories',
    type: 'All Types',
    salaryRange: 'All Salaries',
  });

  const filteredJobs = useMemo(() => {
    return jobs.filter((job: Job) => {
      const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           job.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                           job.company.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesLocation = !filters.location || 
                             job.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesCategory = filters.category === 'All Categories' || 
                             job.category === filters.category;
      
      const matchesType = filters.type === 'All Types' || 
                         job.type === filters.type;
      
      const matchesSalary = filters.salaryRange === 'All Salaries' || 
                           (() => {
                             if (filters.salaryRange === '120000+') {
                               return job.salary.min >= 120000;
                             }
                             const [min, max] = filters.salaryRange.split('-').map(Number);
                             return job.salary.min >= min && job.salary.max <= max;
                           })();

      return matchesSearch && matchesLocation && matchesCategory && matchesType && matchesSalary;
    });
  }, [jobs, filters]);

  const handleApply = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job && user) {
      addApplication({
        jobId: job.id,
        userId: user.id,
        coverLetter: 'I am interested in this position and would like to apply.',
        status: 'pending',
        userName: user.name,
        userEmail: user.email,
        jobTitle: job.title,
        company: job.company,
      });
      alert('Application submitted successfully!');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Browse Jobs</h1>
        <p className="text-gray-600">Discover your next career opportunity</p>
      </div>

      <JobFilters filters={filters} onFiltersChange={setFilters} />

      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onApply={user?.role === 'jobseeker' ? handleApply : undefined}
            showApplyButton={user?.role === 'jobseeker'}
          />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search filters to find more opportunities.</p>
        </div>
      )}
    </div>
  );
}