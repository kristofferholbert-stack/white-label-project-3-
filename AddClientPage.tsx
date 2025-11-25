
import React, { useState, useEffect } from 'react';
import type { Client, LaunchPlaybook, ManagedVendor, SolutionStack, Page } from '../types';
import { generateAndSavePlaybook } from '../services/geminiService';
import { ALL_SOLUTIONS } from '../constants';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthProvider';

interface AddClientPageProps {
    managedVendors: ManagedVendor[];
    // onAddClient: (clientData: Omit<Client, 'id' | 'playbook' | 'status' | 'monthlySubscriptionPrice'>, playbook: LaunchPlaybook) => void;
    // We are changing this to just navigate back, as we save inside the component
    onAddClient: (clientData: any, playbook: any) => void; // Keep signature for now but mostly unused
    onBack: () => void;
}

const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const AddClientPage: React.FC<AddClientPageProps> = ({ managedVendors, onAddClient, onBack }) => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [clientName, setClientName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [managedVendorIds, setManagedVendorIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handleVendorToggle = (vendorId: string) => {
        setManagedVendorIds(prev =>
            prev.includes(vendorId) ? prev.filter(id => id !== vendorId) : [...prev, vendorId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!user) {
            setError("You must be logged in.");
            setIsLoading(false);
            return;
        }

        try {
            // 1. Create Client first
            const { data: clientData, error: clientError } = await supabase
                .from('clients')
                .insert({
                    user_id: user.id,
                    name: clientName,
                    contact_email: contactEmail,
                    status: 'Onboarding',
                    monthly_subscription_price: 0,
                    managed_vendor_ids: managedVendorIds
                })
                .select()
                .single();

            if (clientError || !clientData) {
                throw new Error(clientError?.message || "Failed to create client.");
            }

            const selectedSolutionIds = managedVendors
                .filter(v => managedVendorIds.includes(v.id))
                .map(v => v.solutionId);

            // 2. Generate and Save Playbook
            const playbook = await generateAndSavePlaybook(clientData.id, clientName, selectedSolutionIds);
            
            // 3. Navigate back (via prop callback which usually updates state)
            // We will call the prop to update local state in App.tsx if needed, but usually we just re-fetch.
            // To keep App.tsx compatible without refetching logic yet, we construct the client object.
            onAddClient({ name: clientName, contactEmail, managedVendorIds }, playbook || {} as any);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setIsLoading(false);
        }
    };

    const pageTitle = "Onboard New Client";
    const pageDescription = "Add client details and select their services to generate an AI playbook.";

    return (
        <main className="flex-grow bg-slate-50 py-12 pt-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                    <button onClick={onBack} className="text-sm font-semibold text-primary-600 hover:text-primary-800 mb-4">
                        &larr; Back
                    </button>
                    
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">{pageTitle}</h1>
                        <p className="mt-2 text-slate-600">{pageDescription}</p>
                    </div>

                    {error && <div className="mt-4 text-center text-red-600 bg-red-100 p-4 rounded-md">{error}</div>}

                    {step === 1 && (
                        <form onSubmit={handleNext} className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="clientName" className="block text-sm font-medium text-slate-700">Client Name</label>
                                <input type="text" id="clientName" value={clientName} onChange={e => setClientName(e.target.value)} required className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="contactEmail" className="block text-sm font-medium text-slate-700">Contact Email</label>
                                <input type="email" id="contactEmail" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                            </div>
                            <div className="text-right">
                                <button type="submit" className="bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors">
                                    Next: Select Services
                                </button>
                            </div>
                        </form>
                    )}
                    
                    {step === 2 && (
                         <form onSubmit={handleSubmit} className="mt-8">
                            <h2 className="text-lg font-bold text-slate-800">Select Services for {clientName}</h2>
                            <p className="text-sm text-slate-500 mb-4">Choose from your existing managed vendors.</p>
                            
                            <div className="space-y-3 mt-2 p-4 border border-slate-200 rounded-lg">
                                {managedVendors.map(vendor => (
                                     <label key={vendor.id} htmlFor={`vendor-${vendor.id}`} className="flex items-center p-3 bg-slate-50 rounded-md cursor-pointer hover:bg-slate-100">
                                        <input
                                            type="checkbox"
                                            id={`vendor-${vendor.id}`}
                                            checked={managedVendorIds.includes(vendor.id)}
                                            onChange={() => handleVendorToggle(vendor.id)}
                                            className="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                                        />
                                        <img src={vendor.logo || 'https://via.placeholder.com/40'} alt="" className="w-8 h-8 rounded-md object-cover ml-4" />
                                        <span className="ml-3 font-medium text-slate-700">{vendor.name}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-between items-center">
                                <button type="button" onClick={() => setStep(1)} className="text-slate-600 font-semibold py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors">
                                    Back
                                </button>
                                <button type="submit" disabled={isLoading || managedVendorIds.length === 0 || !clientName || !contactEmail} className="inline-flex items-center bg-secondary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-secondary-700 transition-colors disabled:bg-secondary-400 disabled:cursor-wait">
                                    {isLoading && <LoadingSpinner />}
                                    {isLoading ? 'Generating Playbook...' : 'Generate AI Playbook'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
};
