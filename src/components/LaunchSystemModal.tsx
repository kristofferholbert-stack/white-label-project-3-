
import React, { useState, useEffect, useMemo } from 'react';
import type { SolutionStack, ManagedVendor } from '../types/types';
import { ALL_SOLUTIONS } from '../constants/constants';

interface LaunchSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  stack: SolutionStack;
  onConfirmLaunch: (clientDetails: { name: string, email: string }) => Promise<void>;
  managedVendors: ManagedVendor[];
}

const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "text-slate-400"}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const loadingMessages = [
    "Generating your Irresistible Offer...",
    "Crafting marketing and email copy...",
    "Building your step-by-step integration guide...",
    "Assembling your client onboarding playbook...",
    "Finalizing your business-in-a-box...",
];

export const LaunchSystemModal: React.FC<LaunchSystemModalProps> = ({ isOpen, onClose, stack, onConfirmLaunch, managedVendors }) => {
  const [clientName, setClientName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const missingSolutions = useMemo(() => {
    return stack.solutionIds
        .filter(solId => !managedVendors.some(v => v.solutionId === solId))
        .map(solId => ALL_SOLUTIONS.find(s => s.id === solId)?.name)
        .filter(Boolean);
  }, [stack, managedVendors]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
        await onConfirmLaunch({ name: clientName, email: contactEmail });
        // No need to call onClose, App.tsx will handle it on successful navigation
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
        setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-6 flex justify-between items-center border-b border-slate-200 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Launch "{stack.name}"</h2>
            <p className="text-sm text-slate-500">Onboard a new client with this system.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-100">
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        {isLoading ? (
            <div className="flex flex-col items-center justify-center p-8 text-center h-64">
                <LoadingSpinner/>
                <p className="mt-4 text-slate-600 font-semibold">{loadingMessages[loadingMessageIndex]}</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="overflow-auto p-6 space-y-4">
            {missingSolutions.length > 0 ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    <h3 className="font-bold">Missing Required Vendors</h3>
                    <p className="text-sm">To launch this system, you must first add the following solutions as managed vendors in your dashboard:</p>
                    <ul className="list-disc list-inside text-sm font-medium mt-2">
                        {missingSolutions.map(name => <li key={name}>{name}</li>)}
                    </ul>
                </div>
            ) : (
                <>
                    <div>
                        <label htmlFor="clientName" className="block text-sm font-medium text-slate-700">Client Name</label>
                        <input type="text" id="clientName" value={clientName} onChange={e => setClientName(e.target.value)} required className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-slate-700">Contact Email</label>
                        <input type="email" id="contactEmail" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                </>
            )}
             {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
            <footer className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Cancel
                </button>
                <button type="submit" disabled={isLoading || missingSolutions.length > 0 || !clientName || !contactEmail} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 disabled:bg-secondary-400 disabled:cursor-not-allowed">
                    {isLoading ? 'Generating...' : 'Generate Playbook & Onboard Client'}
                </button>
            </footer>
            </form>
        )}
      </div>
    </div>
  );
};
