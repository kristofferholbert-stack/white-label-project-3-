import React from 'react';

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"/></svg>;

export const ListingOptimizer = () => {
    const score = 65;
    return (
        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Listing Strength</h3>
                <span className="text-2xl font-extrabold text-orange-500">{score}/100</span>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{ width: `${score}%` }}></div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700 opacity-50">
                    <span className="text-sm text-slate-400 line-through">Upload High-Res Logo</span>
                    <div className="bg-emerald-500 rounded-full p-0.5"><CheckIcon /></div>
                </div>
                 <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700 cursor-pointer hover:border-orange-500/50 transition-colors">
                    <span className="text-sm font-bold text-white">Add "Agency Margin" Calculator</span>
                    <span className="text-xs text-orange-400 font-bold">+15 Pts</span>
                </div>
                 <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700 cursor-pointer hover:border-orange-500/50 transition-colors">
                    <span className="text-sm font-bold text-white">Upload Sales Deck (PDF)</span>
                    <span className="text-xs text-orange-400 font-bold">+20 Pts</span>
                </div>
            </div>

            <button className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors">
                Update Listing
            </button>
        </div>
    );
};
