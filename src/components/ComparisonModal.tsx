import React from 'react';
import type { Solution } from '../types/types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  solutions: Solution[];
  onShare: () => void;
}

// Icons
const CrownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400"><path d="M2 24h20v-4H2v4zm2-20l4 8 4-8 4 8 4-8v14H4V4z"/></svg>; // Simplified crown
const VSBadge = () => (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 border-4 border-slate-900 text-slate-500 font-black italic text-xl absolute top-24 left-1/2 -translate-x-1/2 z-10 shadow-xl">
        VS
    </div>
);

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose, solutions, onShare }) => {
    if (!isOpen) return null;

    // Helper to parse price
    const getPrice = (s: Solution) => parseInt(s.startingPrice.replace(/[^0-9]/g, '')) || 0;

    // Helper to find winner
    const getWinnerId = (metric: 'margin' | 'speed' | 'rating') => {
        if (solutions.length < 2) return null;
        return solutions.reduce((prev, current) => {
            if (metric === 'margin') return (current.agencyMargin > prev.agencyMargin) ? current : prev;
            if (metric === 'rating') return (current.rating > prev.rating) ? current : prev;
            // Speed logic is complex (string parsing), skip for brevity or assume 'Instant' wins
            return prev;
        }).id;
    };

    const marginWinner = getWinnerId('margin');
    const ratingWinner = getWinnerId('rating');

    return (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-slate-900 w-full max-w-5xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                    <h2 className="text-2xl font-bold text-white">Head-to-Head Analysis</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">✕ Close</button>
                </div>

                <div className="flex-grow overflow-y-auto p-8 relative">
                    {solutions.length === 2 && <VSBadge />}

                    <div className={`grid ${solutions.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-8`}>
                        {solutions.map(sol => {
                            const isMarginWinner = sol.id === marginWinner;
                            const isRatingWinner = sol.id === ratingWinner;

                            return (
                                <div key={sol.id} className="flex flex-col h-full relative">
                                    {/* Header Card */}
                                    <div className="text-center mb-8">
                                        <div className="relative inline-block">
                                            <img src={sol.logo} alt={sol.name} className="w-20 h-20 rounded-2xl mx-auto mb-4 object-contain bg-white p-2 shadow-lg" />
                                            {/* Add 'Winner' crown if they win most categories? Optional */}
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{sol.name}</h3>
                                        <p className="text-sm text-slate-500">{sol.companyName}</p>
                                    </div>

                                    {/* Metrics Arena */}
                                    <div className="space-y-4">
                                        {/* Margin Battle */}
                                        <div className={`p-4 rounded-xl border ${isMarginWinner ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-slate-800 border-slate-700'}`}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs font-bold text-slate-400 uppercase">Profit Margin</span>
                                                {isMarginWinner && <CrownIcon />}
                                            </div>
                                            <p className={`text-2xl font-extrabold ${isMarginWinner ? 'text-emerald-400' : 'text-white'}`}>
                                                {sol.agencyMargin}%
                                            </p>
                                        </div>

                                        {/* Speed Battle */}
                                        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                                            <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Setup Speed</span>
                                            <p className="text-lg font-bold text-white">{sol.implementationTime}</p>
                                        </div>

                                        {/* Trust Battle */}
                                        <div className={`p-4 rounded-xl border ${isRatingWinner ? 'bg-amber-500/10 border-amber-500/50' : 'bg-slate-800 border-slate-700'}`}>
                                            <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Agency Trust</span>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-lg font-bold ${isRatingWinner ? 'text-amber-400' : 'text-white'}`}>{sol.rating}</span>
                                                <span className="text-xs text-slate-500">/ 5</span>
                                            </div>
                                        </div>

                                        {/* The "Ghost" Factor */}
                                        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                                            <span className="text-xs font-bold text-slate-400 uppercase block mb-2">White Label Stealth</span>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-400">Custom Domain</span>
                                                    <span className={sol.agencyReadiness.hasCustomDomain ? 'text-emerald-400' : 'text-red-400'}>
                                                        {sol.agencyReadiness.hasCustomDomain ? '✓' : '✕'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-400">Remove Branding</span>
                                                    <span className={sol.agencyReadiness.canRemoveBranding ? 'text-emerald-400' : 'text-red-400'}>
                                                        {sol.agencyReadiness.canRemoveBranding ? '✓' : '✕'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-8 pt-8 border-t border-slate-800">
                                        <button className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all shadow-lg">
                                            Choose {sol.name}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
