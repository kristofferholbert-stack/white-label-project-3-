
import React, { useState, useEffect } from 'react';
import type { ManagedVendor } from './types';
import { ALL_SOLUTIONS } from './constants';

interface AddVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vendor: ManagedVendor | Omit<ManagedVendor, 'id'>) => void;
  vendorToEdit?: ManagedVendor | null;
}

const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "text-slate-400"}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const initialFormState: Omit<ManagedVendor, 'id'> = {
  solutionId: '',
  name: '',
  logo: '',
  monthlyCost: 0,
  contractRenewalDate: '',
  status: 'Active',
  supportContact: '',
  notes: '',
};

export const AddVendorModal: React.FC<AddVendorModalProps> = ({ isOpen, onClose, onSave, vendorToEdit }) => {
  const [formData, setFormData] = useState<Omit<ManagedVendor, 'id'>>(initialFormState);

  useEffect(() => {
    if (vendorToEdit) {
      setFormData(vendorToEdit);
    } else {
      setFormData(initialFormState);
    }
  }, [vendorToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSolutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const solutionId = e.target.value;
    const solution = ALL_SOLUTIONS.find(s => s.id === solutionId);
    setFormData(prev => ({
        ...prev,
        solutionId,
        name: solution ? solution.name : '',
        logo: solution ? solution.logo : ''
    }));
  }
  
  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, monthlyCost: value === '' ? 0 : parseFloat(value) }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vendorToEdit) {
      onSave({ ...vendorToEdit, ...formData });
    } else {
      onSave(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  const isEditing = !!vendorToEdit;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-6 flex justify-between items-center border-b border-slate-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-slate-800">{isEditing ? 'Edit Vendor' : 'Add New Vendor'}</h2>
          <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-100">
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="overflow-auto p-6 space-y-4">
          <div>
            <label htmlFor="solutionId" className="block text-sm font-medium text-slate-700">Solution</label>
            <select
              id="solutionId"
              name="solutionId"
              value={formData.solutionId}
              onChange={handleSolutionChange}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="">Select a solution...</option>
              {ALL_SOLUTIONS.map(sol => (
                <option key={sol.id} value={sol.id}>{sol.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                <option>Active</option>
                <option>Trial</option>
                <option>Inactive</option>
              </select>
            </div>
             <div>
                <label htmlFor="monthlyCost" className="block text-sm font-medium text-slate-700">Monthly Cost ($)</label>
                <input
                    type="number"
                    id="monthlyCost"
                    name="monthlyCost"
                    value={formData.monthlyCost}
                    onChange={handleCostChange}
                    min="0"
                    step="1"
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contractRenewalDate" className="block text-sm font-medium text-slate-700">Contract Renewal</label>
              <input type="date" id="contractRenewalDate" name="contractRenewalDate" value={formData.contractRenewalDate} onChange={handleChange} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="supportContact" className="block text-sm font-medium text-slate-700">Support Contact</label>
              <input type="text" id="supportContact" name="supportContact" placeholder="email or url" value={formData.supportContact} onChange={handleChange} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
            <textarea id="notes" name="notes" rows={4} value={formData.notes} onChange={handleChange} placeholder="e.g., Agency account details, primary contact..." className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"></textarea>
          </div>
          <footer className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Cancel
            </button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              {isEditing ? 'Save Changes' : 'Add Vendor'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};
