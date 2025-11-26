
import React from 'react';

interface DashboardProps {
    multiplier: number;
}

export const ReputationDashboard: React.FC<DashboardProps> = ({ multiplier }) => {
    const totalReviews = Math.floor(128 * multiplier);
    const rating = 4.9;

    return (
        <div className="p-8 bg-slate-50 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                    <p className="text-sm text-slate-500 font-bold uppercase mb-2">Overall Rating</p>
                    <h1 className="text-6xl font-black text-slate-800 mb-2">{rating}</h1>
                    <div className="flex justify-center gap-1 text-amber-400 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        ))}
                    </div>
                    <p className="text-xs text-slate-400">{totalReviews.toLocaleString()} Total Reviews</p>
                </div>

                <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center">
                     <h3 className="font-bold text-lg text-slate-800 mb-4">Sentiment Analysis</h3>
                     <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-slate-500 w-12">Positive</span>
                            <div className="flex-grow h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[92%]"></div>
                            </div>
                            <span className="text-xs font-bold text-slate-700">92%</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-slate-500 w-12">Neutral</span>
                            <div className="flex-grow h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-400 w-[5%]"></div>
                            </div>
                            <span className="text-xs font-bold text-slate-700">5%</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-slate-500 w-12">Negative</span>
                            <div className="flex-grow h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-rose-500 w-[3%]"></div>
                            </div>
                            <span className="text-xs font-bold text-slate-700">3%</span>
                        </div>
                     </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-800">Recent Activity</h3>
                    <select className="text-sm border border-slate-200 rounded px-2 py-1 outline-none">
                        <option>All Sources</option>
                        <option>Google</option>
                        <option>Yelp</option>
                    </select>
                </div>
                <div>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="p-6 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-slate-200 rounded-full font-bold text-xs flex items-center justify-center text-slate-600">AB</div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">Alice Brown</p>
                                        <p className="text-[10px] text-slate-400">via Google Maps</p>
                                    </div>
                                </div>
                                <div className="flex text-amber-400 text-xs">
                                    ★★★★★
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mb-4">
                                "Absolutely amazing service! The team was professional and handled everything perfectly. Highly recommend to anyone looking for quality work."
                            </p>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded hover:bg-blue-100">Reply</button>
                                <button className="px-3 py-1 bg-slate-50 text-slate-500 text-xs font-bold rounded hover:bg-slate-100">Share</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
