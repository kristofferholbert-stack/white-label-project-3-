import React, { useState, useEffect } from 'react';

// Placeholder for charts/graphs (in a real app, use Recharts or Chart.js)
// For this MVP, we create visual approximations using CSS/Tailwind

export const DemoModePage = () => {
    const [type, setType] = useState('growth');

    useEffect(() => {
        // Parse URL params from hash manually since we are not using BrowserRouter
        const hash = window.location.hash;
        const queryParams = new URLSearchParams(hash.split('?')[1]);
        const typeParam = queryParams.get('type');
        if (typeParam === 'reputation') {
            setType('reputation');
        } else if (typeParam === 'ops') {
            setType('ops');
        } else {
            // Default to growth for 'ops' or other types to ensure content is displayed
            setType('growth');
        }
    }, []);

    const [clientLogo, setClientLogo] = useState<string | null>(null);
    const [multiplier, setMultiplier] = useState(1); // The "Dream Slider" state

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setClientLogo(URL.createObjectURL(e.target.files[0]));
        }
    };

    // Dynamic Data based on Multiplier
    const revenue = (14250 * multiplier).toLocaleString();
    const leads = Math.floor(84 * multiplier);
    const reviews = Math.floor(42 * multiplier);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Controls (Hidden in Presentation Mode usually, but visible here for the agency) */}
            <aside className="w-72 bg-slate-900 text-white p-6 flex flex-col gap-8 border-r border-slate-800 fixed h-full z-50">
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Agency Controls</h3>

                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2">1. Upload Client Logo</label>
                        <input type="file" onChange={handleLogoUpload} className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-700"/>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">2. Project Results</label>
                        <input
                            type="range" min="1" max="5" step="0.1"
                            value={multiplier}
                            onChange={(e) => setMultiplier(parseFloat(e.target.value))}
                            className="w-full accent-primary-500"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>Current</span>
                            <span>5x Scale</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-4 bg-primary-900/50 rounded-xl border border-primary-500/30">
                    <p className="text-xs text-primary-200 mb-2">Ready to build this?</p>
                    <button className="w-full py-2 bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold rounded-lg transition-colors">
                        Activate System
                    </button>
                </div>
            </aside>

            {/* Main Dashboard Area */}
            <div className="flex-1 ml-72 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        {clientLogo ? (
                            <img src={clientLogo} alt="Client Logo" className="h-12 object-contain" />
                        ) : (
                            <div className="h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-400 border-2 border-dashed border-slate-300">
                                LOGO
                            </div>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Executive Dashboard</h1>
                            <p className="text-sm text-slate-500">Last updated: Just now</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">● Live System</span>
                    </div>
                </header>

                {/* Template A: Growth (Marketing) */}
                {type === 'growth' && (
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-700 mb-4">Revenue Growth</h3>
                            <div className="h-64 flex items-end gap-2 px-4 pb-4 border-b border-l border-slate-100">
                                {[30, 45, 40, 60, 75, 65, 85, 95, 100].map((h, i) => (
                                    <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-sm transition-all duration-500" style={{ height: `${h * (multiplier > 2 ? 1 : 0.5 + (multiplier/10))}%` }}></div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-sm text-slate-500">Total Revenue</p>
                                <p className="text-4xl font-extrabold text-slate-800">${revenue}</p>
                                <p className="text-xs text-emerald-600 font-bold mt-1">▲ 12% vs last month</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-sm text-slate-500">New Leads</p>
                                <p className="text-4xl font-extrabold text-slate-800">{leads}</p>
                                <p className="text-xs text-emerald-600 font-bold mt-1">▲ {Math.floor(multiplier * 10)}% efficiency</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Template B: Reputation (Industry) */}
                {type === 'reputation' && (
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <p className="text-sm text-slate-500">Total Reviews</p>
                            <p className="text-5xl font-extrabold text-slate-800 mt-2">{reviews}</p>
                            <div className="flex gap-1 mt-3">
                                {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400 text-xl">★</span>)}
                            </div>
                        </div>
                        <div className="col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-700 mb-4">Recent Feedback</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex gap-4 pb-4 border-b border-slate-50 last:border-0">
                                        <div className="w-10 h-10 rounded-full bg-slate-100"></div>
                                        <div>
                                            <div className="flex gap-2 mb-1">
                                                <span className="font-bold text-sm">Customer {i + 1}</span>
                                                <span className="text-amber-400 text-xs">★★★★★</span>
                                            </div>
                                            <p className="text-sm text-slate-600">"Amazing service! The team was professional and quick."</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
