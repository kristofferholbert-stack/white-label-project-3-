
import React from 'react';

interface DashboardProps {
    multiplier: number;
}

export const OpsDashboard: React.FC<DashboardProps> = ({ multiplier }) => {
    const tasks = Math.floor(12 * multiplier);
    const messages = Math.floor(5 * multiplier);

    return (
        <div className="p-8 bg-slate-50 flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                {/* Calendar View */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-800">Weekly Schedule</h3>
                        <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 font-bold rounded">Add Event</button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center mb-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                            <div key={d} className="text-xs font-bold text-slate-400 uppercase">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2 h-64">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <div key={i} className="border border-slate-100 rounded-lg p-1 relative bg-slate-50">
                                {i === 1 && <div className="bg-blue-100 text-blue-700 text-[10px] p-1 rounded mb-1 font-bold truncate">Kickoff Call</div>}
                                {i === 2 && <div className="bg-emerald-100 text-emerald-700 text-[10px] p-1 rounded mb-1 font-bold truncate">Site Launch</div>}
                                {i === 4 && <div className="bg-purple-100 text-purple-700 text-[10px] p-1 rounded mb-1 font-bold truncate">Team Sync</div>}
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Task List */}
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg text-slate-800 mb-4">Pending Tasks ({tasks})</h3>
                     <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition-colors">
                                <div className="w-5 h-5 rounded border-2 border-slate-300"></div>
                                <div className="flex-grow">
                                    <p className="text-sm font-medium text-slate-700">Review client assets for Project #{100 + i}</p>
                                </div>
                                <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                            </div>
                        ))}
                     </div>
                 </div>
            </div>

            <div className="space-y-6">
                {/* Inbox */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-800">Unified Inbox</h3>
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{messages}</span>
                    </div>
                    <div className="space-y-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex-shrink-0"></div>
                                <div>
                                    <div className="flex justify-between items-baseline w-full">
                                        <h4 className="text-sm font-bold text-slate-800">Sarah Smith</h4>
                                        <span className="text-[10px] text-slate-400">2m</span>
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2">Hey, just wanted to follow up on the proposal you sent over...</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
