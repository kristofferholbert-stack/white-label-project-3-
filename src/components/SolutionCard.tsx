import React from 'react';
import type { Solution } from '../types/types';

// New Icons
const LockOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>;
const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;

interface SolutionCardProps {
    solution: Solution;
    onViewDetails: (solution: Solution) => void;
    index?: number;
    badge?: { label: string; color: string };
    isSelected?: boolean;
    onToggleCompare?: (id: string) => void;
    isBookmarked?: boolean;
    onToggleBookmark?: () => void;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ solution, onViewDetails, index, badge, isSelected, onToggleCompare, isBookmarked, onToggleBookmark }) => {
    // Calculate potential profit for the badge
    const wholesaleString = solution.startingPrice;
    const wholesale = parseInt(wholesaleString.replace(/[^0-9]/g, '')) || 0;

    // Heuristic logic for resale price if not explicitly in data (stacks have it, solutions often don't)
    // If we don't have resellRange, we estimate.
    const resaleString = solution.resellRange ? solution.resellRange.split('-')[0] : '';
    let resale = parseInt(resaleString.replace(/[^0-9]/g, '')) || 0;

    if (resale === 0) {
         resale = wholesale < 50 ? 197 : wholesale < 200 ? 497 : wholesale * 2;
    }

    const profit = resale - wholesale;

    // Calculate bar widths for the visual comparison
    const maxVal = Math.max(wholesale, resale) * 1.2; // Buffer
    const wholesaleWidth = Math.max((wholesale / maxVal) * 100, 10); // Min 10% width
    const resaleWidth = Math.max((resale / maxVal) * 100, 20);

    return (
        <div
            onClick={() => onViewDetails(solution)}
            style={{ animationDelay: `${(index || 0) * 50}ms` }}
            className={`group relative bg-slate-900 border rounded-2xl p-5 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer flex flex-col h-full overflow-hidden animate-fade-in-up ${isSelected ? 'border-primary-500 ring-1 ring-primary-500' : 'border-slate-800'}`}
        >
             {/* Background Tech Pattern */}
             <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors"></div>

            {/* The "Profit Badge" - The Hook */}
            {profit > 0 && (
                <div className="absolute top-0 right-0 bg-slate-950 border-b border-l border-slate-700 rounded-bl-xl px-3 py-1.5 flex items-center gap-2 z-10 group-hover:border-emerald-500/50 transition-colors shadow-sm">
                    <p className="text-[10px] uppercase font-bold text-slate-500 group-hover:text-emerald-400">Net Profit</p>
                    <span className="text-sm font-extrabold text-white group-hover:text-emerald-300">+${profit}/mo</span>
                </div>
            )}

            {/* Special Badge (Top Rated / Fastest Launch) */}
            {badge && (
                 <div className={`absolute top-0 left-0 px-3 py-1 rounded-br-xl text-[10px] font-bold uppercase tracking-wider shadow-sm z-10 ${badge.color}`}>
                    {badge.label}
                </div>
            )}

            {/* Comparison Toggle & Bookmark */}
            <div className="absolute top-4 right-4 z-30 flex gap-2">
                {onToggleBookmark && (
                    <div
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-colors ${isBookmarked ? 'bg-slate-900 border-primary-500 text-primary-500' : 'border-slate-600 hover:border-slate-400 bg-slate-900/50 text-slate-400'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onToggleBookmark();
                        }}
                        title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                    </div>
                )}
                {onToggleCompare && (
                    <div
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-colors ${isSelected ? 'bg-primary-600 border-primary-600' : 'border-slate-600 hover:border-slate-400 bg-slate-900/50'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onToggleCompare(solution.id);
                        }}
                        title="Compare"
                    >
                        {isSelected && (
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"/></svg>
                        )}
                    </div>
                )}
            </div>


            {/* Header */}
            <div className="flex items-start gap-4 mb-4 mt-2">
                <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-slate-800 p-2 shadow-inner flex items-center justify-center overflow-hidden border border-slate-700 group-hover:border-slate-600 transition-colors">
                        <img src={solution.logo} alt={solution.name} className="w-full h-full object-contain" />
                    </div>
                    {solution.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-0.5 border-2 border-slate-900" title="Vetted Partner">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0 pt-1 pr-8"> {/* Added padding right to avoid overlap with compare checkbox */}
                    <h3 className="text-lg font-bold text-white leading-tight truncate group-hover:text-emerald-400 transition-colors">
                        {solution.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1 truncate">
                        {solution.subCategory}
                    </p>
                </div>
            </div>

            {/* The Pitch */}
            <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-2 h-10">
                {solution.shortDescription}
            </p>

            {/* THE ARBITRAGE VISUALIZER (New Feature) */}
            <div className="mb-6 bg-slate-950/50 rounded-lg p-3 border border-slate-800/50 group-hover:border-slate-700 transition-colors">
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-1">
                    <span>Cost vs. Resell</span>
                    <span className="text-emerald-500 flex items-center gap-1">{solution.agencyMargin}% Margin <TrendingUpIcon /></span>
                </div>

                {/* Cost Bar */}
                <div className="flex items-center gap-2 mb-1.5">
                     <div className="h-1.5 bg-slate-700 rounded-full" style={{ width: `${wholesaleWidth}%` }}></div>
                     <span className="text-xs font-mono text-slate-400">{wholesaleString}</span>
                </div>

                {/* Resell Bar */}
                <div className="flex items-center gap-2">
                     <div className="h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" style={{ width: `${resaleWidth}%` }}></div>
                     <span className="text-xs font-mono text-white font-bold">${resale}/mo</span>
                </div>
            </div>

            {/* Action Area */}
            <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between group-hover:border-slate-700 transition-colors">
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        <ZapIcon /> {solution.implementationTime} Setup
                    </div>
                     {solution.whitelabelType === 'Full White Label' && (
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                            <LockOpenIcon /> White Label
                        </div>
                    )}
                </div>

                <button className="text-xs font-bold text-slate-900 bg-white hover:bg-emerald-400 px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-emerald-500/20 transform hover:-translate-y-0.5">
                    View Power-Up
                </button>
            </div>
        </div>
    );
};
