import React, { useState } from 'react';
import { marketplaceService } from './marketplaceService';
import { useAuth } from './AuthProvider';
import type { Page } from './types';

interface VendorSubmitPageProps {
  onNavigate: (page: Page) => void;
}

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

export const VendorSubmitPage: React.FC<VendorSubmitPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Redirect if not logged in
  if (!user) {
    return (
        <main className="flex-grow bg-gray-950 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Partner Access Only</h2>
                <p className="text-slate-400 mb-6">You must be logged in to submit a solution to the marketplace.</p>
                <div className="flex flex-col gap-3">
                    <button onClick={() => onNavigate('login')} className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-colors">
                        Log In
                    </button>
                    <button onClick={() => onNavigate('home')} className="text-slate-500 hover:text-slate-300 text-sm">
                        Return Home
                    </button>
                </div>
            </div>
        </main>
    );
  }

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    companyWebsite: '',
    tagline: '',
    shortDescription: '',
    detailedDescription: '',
    primaryCategory: '',
    logo: '',
    whitelabelType: 'Full White Label',
    pricingModel: [] as string[],
    agencyMargin: 0,
    startingPrice: '',
    setupFee: '',
    minimumCommitment: '',
    implementationTime: '',
    features: [] as string[],
    partnerSupportModel: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to submit a solution');
      return;
    }

    setIsSubmitting(true);
    try {
      // In real app: await marketplaceService.submitSolution(formData);
      // For MVP: Simulate
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting solution:', error);
      alert('Failed to submit solution. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <main className="flex-grow bg-gray-950 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Solution Submitted!
          </h2>
          <p className="text-slate-400 mb-6">
            Thank you for submitting your solution. Our team will review it and get back to you within 2-3 business days.
          </p>
          <button
            onClick={() => onNavigate('marketplace')}
            className="bg-primary-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-700 transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('marketplace')}
            className="text-slate-400 hover:text-white transition-colors mb-4"
          >
            &larr; Back to Marketplace
          </button>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Submit Your Solution
          </h1>
          <p className="text-lg text-slate-400">
            Join the marketplace and reach thousands of agencies looking for white-label solutions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Basic Information</h3>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Solution Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Website *
                </label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tagline *
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                required
                placeholder="A short, compelling description"
                className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Short Description *
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Brief overview for listings"
                className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

             <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Detailed Description *
              </label>
              <textarea
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Full description for detail page"
                className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Primary Category *
              </label>
              <select
                name="primaryCategory"
                value={formData.primaryCategory}
                onChange={handleChange}
                required
                className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a category</option>
                <option value="Marketing">Marketing</option>
                <option value="CRM">CRM</option>
                <option value="SEO">SEO</option>
                <option value="Social Media">Social Media</option>
                <option value="Analytics">Analytics</option>
                <option value="Automation">Automation</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Development">Development</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Pricing & Terms</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Starting Price *
                </label>
                <input
                  type="text"
                  name="startingPrice"
                  value={formData.startingPrice}
                  onChange={handleChange}
                  required
                  placeholder="e.g., $99/month"
                  className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Agency Margin (%) *
                </label>
                <input
                  type="number"
                  name="agencyMargin"
                  value={formData.agencyMargin}
                  onChange={handleChange}
                  required
                  min="0"
                  max="100"
                  className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Setup Fee
                </label>
                <input
                  type="text"
                  name="setupFee"
                  value={formData.setupFee}
                  onChange={handleChange}
                  placeholder="e.g., $299 or Free"
                  className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Minimum Commitment
                </label>
                <input
                  type="text"
                  name="minimumCommitment"
                  value={formData.minimumCommitment}
                  onChange={handleChange}
                  placeholder="e.g., None, 3 months, 1 year"
                  className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

             <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Implementation Time
                </label>
                <input
                  type="text"
                  name="implementationTime"
                  value={formData.implementationTime}
                  onChange={handleChange}
                  placeholder="e.g., 24 hours, 1 week, 2-4 weeks"
                  className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
          </div>

           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">White Label Details</h3>

             <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  White Label Type *
                </label>
                <select
                  name="whitelabelType"
                  value={formData.whitelabelType}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Full White Label">Full White Label</option>
                  <option value="Reseller Program">Reseller Program</option>
                  <option value="Private Label">Private Label</option>
                  <option value="Custom Branding">Custom Branding</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Partner Support Model
                </label>
                <textarea
                  name="partnerSupportModel"
                  value={formData.partnerSupportModel}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe how you support agency partners"
                  className="w-full bg-slate-800 border border-slate-700 text-white py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
           </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => onNavigate('marketplace')}
              className="px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-grow bg-primary-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Solution for Review'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
