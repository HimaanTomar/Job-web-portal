import React from 'react';
import { Search, MapPin, Briefcase, DollarSign } from 'lucide-react';

interface JobFiltersProps {
  filters: {
    search: string;
    location: string;
    category: string;
    type: string;
    salaryRange: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const categories = [
    'All Categories',
    'Technology',
    'Marketing',
    'Design',
    'Sales',
    'Finance',
    'Healthcare',
    'Education',
  ];

  const jobTypes = [
    'All Types',
    'full-time',
    'part-time',
    'contract',
    'remote',
  ];

  const salaryRanges = [
    'All Salaries',
    '0-50000',
    '50000-80000',
    '80000-120000',
    '120000+',
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Jobs</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Job title, skills..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={filters.location}
              onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="City, state..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={filters.category}
              onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary Range
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={filters.salaryRange}
              onChange={(e) => onFiltersChange({ ...filters, salaryRange: e.target.value })}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {salaryRanges.map((range) => (
                <option key={range} value={range}>
                  {range === 'All Salaries' ? range : 
                   range === '120000+' ? '$120,000+' :
                   `$${range.split('-').map(n => parseInt(n).toLocaleString()).join(' - ')}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}