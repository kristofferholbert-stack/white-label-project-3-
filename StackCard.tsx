import React, { useMemo } from 'react';
import type { SolutionStack, Page } from '../types';
import { ALL_SOLUTIONS } from '../constants';

interface StackCardProps {
    stack: SolutionStack;
    index: number;
    onNavigate: (page: Page, context?: any) => void;
    onLaunch: (stack: SolutionStack) => void;
    badge?: { label: string; color: string };
}

// Icons
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const TrendingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const PackageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const BlueprintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;

export const StackCard: React.FC<StackCardProps> = ({ stack, index, onNavigate, onLaunch, badge }) => {
    const includedSolutions = ALL_SOLUTIONS.filter(s => stack.solutionIds.includes(s.id));

    const potentialMargin = useMemo(() => {
        const resalePrice = stack.suggestedResalePrice.split('-')[0]; // Take the lower end for calculation
        const resale = parseInt(resalePrice.replace(/[^0-9]/g, ''), 10);
        const cost = parseInt(stack.estimatedAgencyCost.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(resale) && !isNaN(cost) && resale > cost) {
            const margin = Math.round(((resale - cost) / resale) * 100);
            return `${margin}%`; 
        }
        return 'N/A';
    }, [stack.suggestedResalePrice, stack.estimatedAgencyCost]);

    return (
        <div 
            style={{ animationDelay: `${index * 100}ms` }}
            className="group relative flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-orange-500/50 transition-all duration-300 cursor-default animate-fade-in-up"
        >
            
            {/* 1. The Visual Hook (Image Header) */}
            <div className="relative h-48 w-full overflow-hidden">
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                
                {/* Bottom Gradient for Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10"></div>
                
                <img 
                    src={stack.image} 
                    alt={stack.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter grayscale-[20%] group-hover:grayscale-0"
                />

                {/* Top Left: AI Badge */}
                {stack.matchScore && (
                    <div className="absolute top-4 left-4 z-20">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-600/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-lg border border-primary-400/50">
                            <span>AI Score: {stack.matchScore}%</span>
                        </div>
                    </div>
                )}

                {/* Top Right: Superlative Badge (Dynamic from SearchPage) */}
                {badge && (
                    <div className={`absolute top-4 right-0 z-20 px-3 py-1 rounded-l-full text-[10px] font-bold uppercase tracking-wide shadow-lg ${badge.color}`}>
                        {badge.label}
                    </div>
                )}
            </div>

            {/* 2. The "Franchise" Details */}
            <div className="p-6 flex-grow flex flex-col relative z-20 -mt-6">
                
                {/* Title Section */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">{stack.targetNiche}</span>
                        {stack.isFeatured && <span className="flex items-center gap-1 text-[10px] font-bold text-orange-500"><TrendingIcon /> Trending</span>}
                    </div>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-orange-400 transition-colors leading-tight">
                        {stack.name}
                    </h3>
                </div>
                
                {/* The Pitch */}
                <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2">
                    {stack.pitch || stack.description}
                </p>

                {/* The "Box Contents" (Inventory) */}
                <div className="mb-6 bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Inside the Box:</p>
                    <div className="flex flex-wrap gap-2">
                        {stack.solutionIds.length > 0 && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-300 border border-slate-700">
                                <PackageIcon /> {stack.solutionIds.length} Tools
                            </span>
                        )}
                        <span className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-300 border border-slate-700">
                            📄 Sales Deck
                        </span>
                        <span className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-300 border border-slate-700">
                            ⚖️ Legal Contracts
                        </span>
                    </div>
                </div>

                {/* 3. The Numbers (Logic) */}
                <div className="grid grid-cols-2 gap-4 mb-6 border-t border-slate-800 pt-4 mt-auto">
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Launch Time</p>
                        <p className="text-sm font-bold text-white flex items-center gap-1">
                            <ClockIcon /> {stack.estimatedLaunchTime}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">Profit Margin</p>
                        <p className="text-sm font-bold text-emerald-400">
                            {potentialMargin}
                        </p>
                    </div>
                </div>

                {/* 4. The "Commitment" CTA */}
                <div className="flex gap-2">
                    <button 
                        onClick={() => onNavigate('systemDetail', { stack })} 
                        className="flex-1 py-3 border border-slate-600 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        Preview
                    </button>
                    <button 
                        onClick={() => onLaunch(stack)}
                        className="flex-[2] py-3 bg-orange-gradient text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                        <BlueprintIcon /> View Blueprint
                    </button>
                </div>
            </div>
        </div>
    );
};