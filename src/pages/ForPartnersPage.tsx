
import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Page } from '../types/types';

interface ForPartnersPageProps {
    onNavigate?: (page: Page) => void;
}

// Icons (Reuse existing or add new)
const NetworkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;

export const ForPartnersPage: React.FC<ForPartnersPageProps> = ({ onNavigate }) => {
    const { user } = useAuth();

    const handleApplyClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate('vendorSubmit');
        }
    };

    return (
        <main className="flex-grow bg-gray-950 min-h-screen text-slate-300">

            {/* Hero: The Multiplier Effect */}
            <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-800">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
                <div className="max-w-4xl mx-auto">
                    <div className="inline-block mb-6 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-widest">
                        For SaaS Vendors
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-8">
                        Stop Selling 1-to-1. <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Start Selling 1-to-Many.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Direct sales is expensive (CAC is rising). Partner sales is leverage.
                        One agency on our platform brings you <strong>20-50 sub-accounts</strong> on average.
                    </p>
                </div>
            </section>

            {/* The "Math" Section */}
            <section className="py-24 px-4 bg-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-8 bg-slate-950 rounded-2xl border border-slate-800">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">Avg Direct CAC</p>
                            <p className="text-4xl font-extrabold text-red-400">$350+</p>
                            <p className="text-xs text-slate-600 mt-2">PPC, Sales Reps, Demos</p>
                        </div>
                        <div className="p-8 bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden">
                            <div className="absolute inset-0 bg-emerald-500/5"></div>
                            <p className="text-sm font-bold text-emerald-500 uppercase tracking-wide mb-2">Platform CAC</p>
                            <p className="text-4xl font-extrabold text-emerald-400">$0</p>
                            <p className="text-xs text-slate-600 mt-2">We bring the agency to you.</p>
                        </div>
                        <div className="p-8 bg-slate-950 rounded-2xl border border-slate-800">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">Retention Rate</p>
                            <p className="text-4xl font-extrabold text-white">94%</p>
                            <p className="text-xs text-slate-600 mt-2">Agencies are "sticky" customers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The "We Filter The Noise" Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">We Don't Send You "Leads." We Send You Users.</h2>
                        <p className="text-lg text-slate-400 mb-6">
                            Most directories send you "demo requests" from tire-kickers.
                        </p>
                        <p className="text-lg text-slate-400 mb-8">
                            White-Label Wonder users have already:
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-white font-medium">
                                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-xs">✓</div>
                                Selected your solution as their specific "Stack."
                            </li>
                            <li className="flex items-center gap-3 text-white font-medium">
                                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-xs">✓</div>
                                Downloaded the sales scripts to sell YOU.
                            </li>
                            <li className="flex items-center gap-3 text-white font-medium">
                                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-xs">✓</div>
                                Calculated their margin on your pricing.
                            </li>
                        </ul>
                    </div>
                    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl relative">
                        {/* Visual of "High Intent" */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-800 opacity-50">
                                <span className="text-sm text-slate-500">Generic Lead</span>
                                <span className="text-xs text-slate-600">Requesting Demo...</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-blue-900/20 rounded-lg border border-blue-500/50 relative z-10 scale-105 shadow-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-bold text-white">Platform User</span>
                                </div>
                                <span className="text-xs font-bold text-blue-400">Ready to Activate</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-800 opacity-50">
                                <span className="text-sm text-slate-500">Generic Lead</span>
                                <span className="text-xs text-slate-600">Browsing pricing...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Apply CTA */}
            <section className="py-24 text-center bg-slate-900 border-t border-slate-800">
                <h2 className="text-3xl font-extrabold text-white mb-6">Are you Agency-Ready?</h2>
                <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
                    We only list vendors with white-label capabilities, API access, and agency-friendly pricing. If that's you, let's talk.
                </p>
                <button
                    onClick={handleApplyClick}
                    className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
                >
                    Apply for Listing
                </button>
            </section>
        </main>
    );
};
