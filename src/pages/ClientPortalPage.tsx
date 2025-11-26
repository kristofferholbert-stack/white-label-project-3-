

import React from 'react';
import type { Client, AgencyProfile, ManagedVendor } from '../types/types';
import { ALL_SOLUTIONS } from '../constants/constants';

const LaunchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;

interface ClientPortalPageProps {
    client: Client;
    agencyProfile: AgencyProfile;
    managedVendors: ManagedVendor[];
}

export const ClientPortalPage: React.FC<ClientPortalPageProps> = ({ client, agencyProfile, managedVendors }) => {
    
    const clientServices = managedVendors
        .filter(v => client.managedVendorIds.includes(v.id))
        .map(vendor => {
            const solution = ALL_SOLUTIONS.find(s => s.id === vendor.solutionId);
            return {
                ...vendor,
                solutionDetails: solution,
            };
        })
        .filter(item => item.solutionDetails); // Ensure we found a solution

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <header className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <img src={agencyProfile.agencyLogo} alt={`${agencyProfile.agencyName} Logo`} className="h-10 w-10 rounded-full" />
                        <span className="text-xl font-bold text-slate-800">{agencyProfile.agencyName}</span>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-500">Client Portal</p>
                        <p className="font-semibold text-slate-700">{client.name}</p>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-slate-800">Welcome, {client.name.split(' ')[0]}!</h1>
                <p className="mt-2 text-slate-600">Here you can access all the tools and services we manage for you. If you need help, please don't hesitate to reach out.</p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Your Services</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {clientServices.length > 0 ? clientServices.map(service => (
                                <div key={service.id} className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                                    <div className="p-6 flex-grow">
                                        <div className="flex items-center gap-4">
                                            <img src={service.logo} alt={`${service.name} Logo`} className="w-12 h-12 rounded-lg object-cover" />
                                            <div>
                                                <h3 className="font-bold text-slate-800">{service.name}</h3>
                                                <p className="text-sm text-slate-500">{service.solutionDetails?.subCategory}</p>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-sm text-slate-600 line-clamp-3">{service.solutionDetails?.shortDescription}</p>
                                    </div>
                                    <footer className="p-4 bg-slate-50 rounded-b-xl border-t border-slate-200">
                                        <a
                                            href={service.solutionDetails?.companyWebsite}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full text-center inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent bg-primary-600 text-sm font-semibold rounded-lg text-white hover:bg-primary-700 transition-colors"
                                        >
                                            <LaunchIcon /> Launch Tool
                                        </a>
                                    </footer>
                                </div>
                            )) : (
                                <p className="text-slate-500 sm:col-span-2">No services have been assigned to your account yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside>
                         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Need Help?</h2>
                            <p className="text-sm text-slate-600 mb-4">For any questions or support requests, please contact us directly.</p>
                            <a
                                href={`mailto:${agencyProfile.supportEmail}`}
                                className="w-full text-center inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 text-sm font-semibold rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                                <MailIcon /> Contact Support
                            </a>
                        </div>
                    </aside>
                </div>
            </main>
            <footer className="text-center py-6">
                <p className="text-sm text-slate-500">Powered by <a href="#" className="font-semibold text-primary-600">{agencyProfile.agencyName}</a></p>
            </footer>
        </div>
    );
};