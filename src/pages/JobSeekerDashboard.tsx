import React from 'react';
import { useJobs } from '../hooks/useJobs';
import { useApplications } from '../hooks/useApplications';
import { StatCard } from '../components/Dashboard/StatCard';
import { JobCard } from '../components/Jobs/JobCard';
import { Briefcase, FileText, Clock, CheckCircle } from 'lucide-react';

interface JobSeekerDashboardProps {
  onPageChange: (page: string) => void;
}

export function JobSeekerDashboard({ onPageChange }: JobSeekerDashboardProps) {
  const { jobs } = useJobs();
  const { applications } = useApplications();

  const recentJobs = jobs.slice(0, 3);
  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const acceptedApplications = applications.filter(app => app.status === 'accepted').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Job Seeker Dashboard</h1>
        <p className="text-gray-600">Track your job search progress and opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Applications"
          value={applications.length}
          icon={FileText}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Pending Reviews"
          value={pendingApplications}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Accepted"
          value={acceptedApplications}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Available Jobs"
          value={jobs.length}
          icon={Briefcase}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Job Openings</h2>
              <button
                onClick={() => onPageChange('jobs')}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All Jobs
              </button>
            </div>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={() => console.log('Apply to job:', job.id)}
                  onView={() => console.log('View job:', job.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Applications</h2>
            <div className="space-y-4">
              {applications.slice(0, 5).map((application) => (
                <div key={application.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <h3 className="font-medium text-gray-900">{application.jobTitle}</h3>
                  <p className="text-sm text-gray-600">{application.company}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
              {applications.length === 0 && (
                <p className="text-gray-500 text-center py-4">No applications yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}