
import React, { useState } from 'react';
import type { Priorities } from '../types';
import { BUSINESS_IN_A_BOX_INSPIRATIONS } from '../constants';

// Icons
const ArrowRightIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const RocketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1s.38 2.38-.62 4z"/><path d="M12 15v5s3.03-.55 4-2c1.1-1.62 1-4 1-4s-2.38-.38-4 .62z"/></svg>;
const BoxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const MagicWandIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2L12 9.5 4.5 12 2 14.5 9.5 12 12 4.5 14.5 2z"/><path d="M12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg>;
const ApiLoadingSpinner = () => (
     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

interface BusinessInABoxPageProps {
  onStartSearch: (goal: string, priorities: Priorities) => Promise<void>;
  isLoading: boolean;
}

export const BusinessInABoxPage: React.FC<BusinessInABoxPageProps> = ({ onStartSearch, isLoading }) => {
    const [goal, setGoal] = useState('');

    const handleCustomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (goal.trim()) {
            const defaultPriorities: Priorities = { marginVsCost: 70, speedVsCustomization: 50, easeVsPower: 50 };
            onStartSearch(goal, defaultPriorities);
        }
    };

    return (
        <main className="flex-grow bg-gray-950 min-h-screen overflow-x-hidden relative pt-20">
             {/* Decorative Blobs */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] bg-primary-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            {/* Hero Section */}
            <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-bold text-orange-400 uppercase tracking-wider mb-8 animate-fade-in-up">
                        <RocketIcon /> Instant Agency Scale
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tighter mb-6 leading-[1.1] animate-fade-in-up [animation-delay:100ms]">
                        Three Ways to Launch Your <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">Software Empire.</span>
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-400 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
                        Skip the dev cycle. Choose the path that fits your speed and ambition.
                    </p>
                </div>
            </section>

            {/* The 3 Pillars (Monetization Hub) */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Pillar 3: Resell Kits */}
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col hover:border-secondary-500/50 transition-all duration-300 relative group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-secondary-500 rounded-t-3xl"></div>
                            <h3 className="text-2xl font-bold text-white mb-4">Resell Kits</h3>
                            <p className="text-slate-400 text-sm mb-6 flex-grow">
                                Instant "business-in-a-box" downloads. Get the sales pages, contracts, and vendor lists for specific stacks.
                            </p>
                            <div className="mb-6">
                                <span className="text-3xl font-extrabold text-white">$499+</span>
                                <span className="text-sm text-slate-500"> one-time</span>
                            </div>
                            <ul className="space-y-3 mb-8 text-sm text-slate-300">
                                <li className="flex gap-2"><CheckCircleIcon/> No Fulfillment</li>
                                <li className="flex gap-2"><CheckCircleIcon/> Copy & Paste Assets</li>
                                <li className="flex gap-2"><CheckCircleIcon/> Keep 100% Margins</li>
                            </ul>
                            <a href="/resellKits" className="w-full py-3 border border-secondary-500 text-secondary-400 font-bold rounded-xl text-center hover:bg-secondary-600 hover:text-white transition-all">
                                Shop Kits
                            </a>
                        </div>

                        {/* Pillar 2: Membership */}
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col hover:border-primary-500/50 transition-all duration-300 relative group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary-500 rounded-t-3xl"></div>
                            <h3 className="text-2xl font-bold text-white mb-4">Membership</h3>
                            <p className="text-slate-400 text-sm mb-6 flex-grow">
                                Join the Inner Circle. Access our full library of stacks, benchmarks, and private community.
                            </p>
                            <div className="mb-6">
                                <span className="text-3xl font-extrabold text-white">$99</span>
                                <span className="text-sm text-slate-500"> / month</span>
                            </div>
                             <ul className="space-y-3 mb-8 text-sm text-slate-300">
                                <li className="flex gap-2"><CheckCircleIcon/> Full Library Access</li>
                                <li className="flex gap-2"><CheckCircleIcon/> Monthly Updates</li>
                                <li className="flex gap-2"><CheckCircleIcon/> Private Discord</li>
                            </ul>
                            <a href="/membership" className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl text-center hover:bg-primary-500 transition-all">
                                Join Inner Circle
                            </a>
                        </div>

                        {/* Pillar 1: Implementation */}
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col hover:border-orange-500/50 transition-all duration-300 relative group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 rounded-t-3xl"></div>
                             <div className="absolute top-4 right-4 px-2 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase rounded border border-orange-500/20">
                                Fast Track
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Implementation</h3>
                            <p className="text-slate-400 text-sm mb-6 flex-grow">
                                We build it for you. An 8-week sprint to design, configure, and launch your $20k MRR machine.
                            </p>
                            <div className="mb-6">
                                <span className="text-3xl font-extrabold text-white">$3k+</span>
                                <span className="text-sm text-slate-500"> one-time</span>
                            </div>
                             <ul className="space-y-3 mb-8 text-sm text-slate-300">
                                <li className="flex gap-2"><CheckCircleIcon/> Done-For-You Setup</li>
                                <li className="flex gap-2"><CheckCircleIcon/> Custom Strategy</li>
                                <li className="flex gap-2"><CheckCircleIcon/> Launch Support</li>
                            </ul>
                            <a href="/implementation" className="w-full py-3 bg-orange-gradient text-white font-bold rounded-xl text-center hover:scale-105 transition-transform">
                                Apply Now
                            </a>
                        </div>

                    </div>
                </div>
            </section>

             {/* Custom Request (Keep existing AI search as fallback) */}
             <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        Just looking to browse?
                    </h2>
                    <p className="text-slate-400 mb-10">
                      Describe your dream software business below. Our AI will scan 1,400+ white-label partners to build a custom stack.
                    </p>
                    <form onSubmit={handleCustomSubmit} className="relative max-w-xl mx-auto">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                           <MagicWandIcon />
                        </div>
                        <input
                            type="text"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="e.g., 'A platform for pet sitters to manage bookings'"
                            className="w-full pl-12 pr-32 py-5 bg-slate-900 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-lg shadow-2xl"
                        />
                        <div className="absolute inset-y-2 right-2">
                             <button type="submit" disabled={isLoading || !goal.trim()} className="h-full px-6 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors disabled:bg-slate-800 disabled:text-slate-500">
                                {isLoading ? <ApiLoadingSpinner /> : 'Build It'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};
