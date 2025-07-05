import React from 'react';
import { useJobs } from '../hooks/useJobs';
import { useApplications } from '../hooks/useApplications';
import { StatCard } from '../components/Dashboard/StatCard';
import { Users, Briefcase, FileText, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  const { jobs } = useJobs();
  const { applications } = useApplications();

  const totalUsers = 156; // Mock data
  const totalJobs = jobs.length;
  const totalApplications = applications.length;
  const platformGrowth = 23; // Mock growth percentage

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor platform performance and manage users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Jobs"
          value={totalJobs}
          icon={Briefcase}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Applications"
          value={totalApplications}
          icon={FileText}
          color="purple"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Platform Growth"
          value={`${platformGrowth}%`}
          icon={TrendingUp}
          color="yellow"
          trend={{ value: platformGrowth, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">New user registered</p>
                <p className="text-xs text-gray-600">john@example.com joined as Job Seeker</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Briefcase className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">New job posted</p>
                <p className="text-xs text-gray-600">Senior Frontend Developer at TechCorp</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Application submitted</p>
                <p className="text-xs text-gray-600">Sarah applied for UX Designer position</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Platform Statistics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Job Seekers</span>
              <span className="text-sm font-semibold text-gray-900">89 (57%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Employers</span>
              <span className="text-sm font-semibold text-gray-900">65 (42%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Admins</span>
              <span className="text-sm font-semibold text-gray-900">2 (1%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Success Rate</span>
              <span className="text-sm font-semibold text-green-700">76%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}