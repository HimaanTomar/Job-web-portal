import React, { useState } from 'react';
import { useJobs } from '../hooks/useJobs';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, DollarSign, MapPin, Briefcase, FileText, Plus, X } from 'lucide-react';

export function PostJob() {
  const { user } = useAuth();
  const { addJob } = useJobs();
  const [loading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState(['']);
  const [benefits, setBenefits] = useState(['']);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: user?.company || '',
    location: '',
    category: 'Technology',
    type: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'remote',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    deadline: '',
  });

  const categories = [
    'Technology',
    'Marketing',
    'Design',
    'Sales',
    'Finance',
    'Healthcare',
    'Education',
  ];

  const jobTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'remote', label: 'Remote' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const jobData = {
      title: formData.title,
      description: formData.description,
      company: formData.company,
      location: formData.location,
      category: formData.category,
      type: formData.type,
      salary: {
        min: parseInt(formData.salaryMin),
        max: parseInt(formData.salaryMax),
        currency: formData.currency,
      },
      requirements: requirements.filter(req => req.trim() !== ''),
      benefits: benefits.filter(benefit => benefit.trim() !== ''),
      deadline: new Date(formData.deadline),
      postedBy: user?.id || '',
      status: 'active' as const,
    };

    addJob(jobData);
    alert('Job posted successfully!');
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      company: user?.company || '',
      location: '',
      category: 'Technology',
      type: 'full-time',
      salaryMin: '',
      salaryMax: '',
      currency: 'USD',
      deadline: '',
    });
    setRequirements(['']);
    setBenefits(['']);
    setLoading(false);
  };

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const addBenefit = () => {
    setBenefits([...benefits, '']);
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const updateBenefit = (index: number, value: string) => {
    const updated = [...benefits];
    updated[index] = value;
    setBenefits(updated);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
        <p className="text-gray-600">Fill out the details to attract the right candidates</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company *
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., New York, NY or Remote"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type *
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {jobTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Deadline *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description *
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  required
                  value={formData.salaryMin}
                  onChange={(e) => setFormData(prev => ({ ...prev, salaryMin: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Minimum"
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  required
                  value={formData.salaryMax}
                  onChange={(e) => setFormData(prev => ({ ...prev, salaryMax: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Maximum"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requirements
          </label>
          <div className="space-y-2">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 5+ years of React experience"
                />
                {requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addRequirement}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Add requirement</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Benefits
          </label>
          <div className="space-y-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => updateBenefit(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Health insurance, Remote work"
                />
                {benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addBenefit}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Add benefit</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
}