
import React from 'react';

interface DashboardProps {
    multiplier: number;
}

export const GrowthDashboard: React.FC<DashboardProps> = ({ multiplier }) => {
    const revenue = (12450 * multiplier).toLocaleString();
    const revenueGrowth = (12 * multiplier).toFixed(0);
    const leads = (14 * multiplier).toLocaleString();

    return (
        <div className="p-8 bg-slate-50 flex-grow">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-sm text-slate-500 font-medium mb-1">Total Revenue</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold text-slate-800">${revenue}</h3>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-700">+{revenueGrowth}%</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-sm text-slate-500 font-medium mb-1">Cost per Lead</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold text-slate-800">$14.32</h3>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-700">-4%</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <p className="text-sm text-slate-500 font-medium mb-1">Active Campaigns</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold text-slate-800">{Math.floor(8 * multiplier)}</h3>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-700">Running</span>
                    </div>
                </div>
            </div>

            {/* Main Chart Area */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96 relative overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-lg text-slate-800">Revenue Velocity</h3>
                    <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span> <span className="text-xs text-slate-500">Paid</span>
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span> <span className="text-xs text-slate-500">Organic</span>
                    </div>
                </div>

                {/* SVG Chart */}
                <div className="relative w-full h-64">
                    <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="10" x2="100" y2="10" stroke="#f1f5f9" strokeWidth="0.5" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" />
                        <line x1="0" y1="30" x2="100" y2="30" stroke="#f1f5f9" strokeWidth="0.5" />

                        {/* Green Area */}
                        <path d="M0 35 C 10 32, 20 25, 30 28 C 40 30, 50 20, 60 18 C 70 15, 80 10, 90 5 L 100 0 V 40 H 0 Z" fill="url(#greenGradient)" opacity="0.2" />
                        <path d="M0 35 C 10 32, 20 25, 30 28 C 40 30, 50 20, 60 18 C 70 15, 80 10, 90 5 L 100 0" fill="none" stroke="#10b981" strokeWidth="1" />

                        <defs>
                            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    );
};
