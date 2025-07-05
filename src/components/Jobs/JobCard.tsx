import React from 'react';
import { Job } from '../../types';
import { MapPin, Calendar, DollarSign, Building, Clock } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
  onView?: (jobId: string) => void;
  showApplyButton?: boolean;
}

export function JobCard({ job, onApply, onView, showApplyButton = true }: JobCardProps) {
  const formatSalary = (salary: Job['salary']) => {
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()} ${salary.currency}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Building className="h-4 w-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          job.type === 'full-time' ? 'bg-green-100 text-green-800' :
          job.type === 'part-time' ? 'bg-yellow-100 text-yellow-800' :
          job.type === 'contract' ? 'bg-blue-100 text-blue-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <DollarSign className="h-4 w-4" />
          <span>{formatSalary(job.salary)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>Deadline: {formatDate(job.deadline)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Posted {formatDate(job.postedAt)}</span>
        </div>
        
        <div className="flex space-x-2">
          {onView && (
            <button
              onClick={() => onView(job.id)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              View Details
            </button>
          )}
          {showApplyButton && onApply && (
            <button
              onClick={() => onApply(job.id)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}