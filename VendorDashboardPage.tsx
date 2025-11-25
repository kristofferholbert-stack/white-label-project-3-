import React from 'react';
import { VendorStats } from './VendorStats';
import { ListingOptimizer } from './ListingOptimizer';

export const VendorDashboardPage = () => {
    return (
        <main className="flex-grow bg-slate-50 min-h-screen pb-20 pt-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Partner Portal</h1>
                        <p className="text-slate-500 mt-1">Manage your distribution channel.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50">View Public Listing</button>
                        <button className="px-4 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700">Edit Profile</button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <VendorStats />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Active Leads Table */}
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                                <h3 className="font-bold text-slate-800">Recent Agency Activations</h3>
                                <button className="text-sm text-primary-600 font-bold hover:text-primary-700">Export CSV</button>
                            </div>
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                                    <tr>
                                        <th className="px-6 py-3">Agency</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Context</th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[1,2,3,4,5].map(i => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900">Growth Flow LLC</td>
                                            <td className="px-6 py-4">Oct {20-i}, 2023</td>
                                            <td className="px-6 py-4">Clicked via "AI Agent Stack"</td>
                                            <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">High Intent</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <aside className="space-y-8">
                        <ListingOptimizer />

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-800 mb-4">Partner Resources</h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="text-blue-600 hover:underline">How to write a high-converting listing</a></li>
                                <li><a href="#" className="text-blue-600 hover:underline">Agency Margin Calculator Template</a></li>
                                <li><a href="#" className="text-blue-600 hover:underline">Sponsorship Opportunities</a></li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};
