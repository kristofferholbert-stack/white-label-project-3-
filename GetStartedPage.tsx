import React from 'react';
import type { Page } from '../types';

interface GetStartedPageProps {
    onNavigate: (page: Page) => void;
}

export const GetStartedPage: React.FC<GetStartedPageProps> = ({ onNavigate }) => {
    return (
        <main className="flex-grow bg-gray-950 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Agency Path */}
                <div
                    onClick={() => onNavigate('intake')}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-primary-500 cursor-pointer group transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/20"
                >
                    <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors">🚀</div>
                    <h2 className="text-2xl font-bold text-white mb-2">I'm an Agency</h2>
                    <p className="text-slate-400 mb-6">I want to find white-label tools to resell to my clients.</p>
                    <ul className="text-sm text-slate-500 space-y-2 mb-8">
                        <li>✓ Take the Agency IQ Quiz</li>
                        <li>✓ Get a Custom Growth Roadmap</li>
                        <li>✓ 3-Day Full Access (No CC Required)</li>
                    </ul>
                    <button className="w-full py-3 bg-primary-600 text-white font-bold rounded-lg group-hover:bg-primary-500">Start Assessment &rarr;</button>
                </div>

                {/* Vendor Path */}
                <div
                    onClick={() => onNavigate('vendorSubmit')} // Direct to submission/signup
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500 cursor-pointer group transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/20"
                >
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">💎</div>
                    <h2 className="text-2xl font-bold text-white mb-2">I'm a Software Vendor</h2>
                    <p className="text-slate-400 mb-6">I want to list my product and get more agency partners.</p>
                    <ul className="text-sm text-slate-500 space-y-2 mb-8">
                        <li>✓ Create Partner Profile</li>
                        <li>✓ Submit for Vetting</li>
                        <li>✓ Access 1,400+ Agencies</li>
                    </ul>
                    <button className="w-full py-3 border border-slate-600 text-white font-bold rounded-lg group-hover:bg-slate-800">Apply to List &rarr;</button>
                </div>

            </div>
        </main>
    );
};
