import React from 'react';

const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const MouseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="13" height="13" rx="2" ry="2"/><path d="M21 21l-5-5"/></svg>;
const UserPlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>;

export const VendorStats = () => (
    <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <span className="text-slate-500 text-sm font-bold uppercase">Marketplace Views</span>
                <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><EyeIcon /></div>
            </div>
            <p className="text-3xl font-extrabold text-slate-800">12,450</p>
            <p className="text-xs text-emerald-600 font-bold mt-1">▲ 12% this week</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex justify-between items-start mb-2">
                <span className="text-slate-500 text-sm font-bold uppercase">Traffic Sent</span>
                <div className="p-2 bg-purple-50 text-purple-500 rounded-lg"><MouseIcon /></div>
            </div>
            <p className="text-3xl font-extrabold text-slate-800">843</p>
            <p className="text-xs text-slate-500 mt-1">Clicks to your site</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 p-2"><div className="w-24 h-24 bg-emerald-50 rounded-full -mr-10 -mt-10"></div></div>
             <div className="flex justify-between items-start mb-2 relative z-10">
                <span className="text-slate-500 text-sm font-bold uppercase">Est. Signups</span>
                <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg"><UserPlusIcon /></div>
            </div>
            <p className="text-3xl font-extrabold text-slate-800 relative z-10">128</p>
            <p className="text-xs text-emerald-600 font-bold mt-1 relative z-10">~15% Conv. Rate</p>
        </div>
    </div>
);
