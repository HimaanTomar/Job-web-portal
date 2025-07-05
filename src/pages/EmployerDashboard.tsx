import React from 'react';
import { useJobs } from '../hooks/useJobs';
import { useApplications } from '../hooks/useApplications';
import { useAuth } from '../contexts/AuthContext';
import { StatCard } from '../components/Dashboard/StatCard';
import { JobCard } from '../components/Jobs/JobCard';
import { Briefcase, Users, Clock, Eye } from 'lucide-react';

interface EmployerDashboardProps {
  onPageChange: (page: string) => void;
}

export function EmployerDashboard({ onPageChange }: EmployerDashboardProps) {
  const { user } = useAuth();
  const { jobs } = useJobs();
  const { applications } = useApplications();

  const myJobs = jobs.filter(job => job.postedBy === user?.id);
  const totalApplications = myJobs.reduce((sum, job) => sum + job.applicationsCount, 0);
  const activeJobs = myJobs.filter(job => job.status === 'active').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
        <p className="text-gray-600">Manage your job postings and applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Jobs Posted"
          value={myJobs.length}
          icon={Briefcase}
          color="blue"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Active Jobs"
          value={activeJobs}
          icon={Clock}
          color="green"
        />
        <StatCard
          title="Total Applications"
          value={totalApplications}
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Job Views"
          value="1,234"
          icon={Eye}
          color="yellow"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Your Recent Job Posts</h2>
              <button
                onClick={() => onPageChange('post-job')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Post New Job
              </button>
            </div>
            <div className="space-y-4">
              {myJobs.slice(0, 3).map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  showApplyButton={false}
                  onView={() => console.log('View job:', job.id)}
                />
              ))}
              {myJobs.length === 0 && (
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No jobs posted yet</p>
                  <button
                    onClick={() => onPageChange('post-job')}
                    className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Post your first job
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Applications</h2>
            <div className="space-y-4">
              {applications.slice(0, 5).map((application) => (
                <div key={application.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <h3 className="font-medium text-gray-900">{application.userName}</h3>
                  <p className="text-sm text-gray-600">{application.jobTitle}</p>
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