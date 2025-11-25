import React, { useState } from 'react';

interface RevenueGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    goal: {
        title: string;
        amount: number;
        stackId: string;
    };
    onContinue: (stackId: string) => void;
}

export const RevenueGoalModal: React.FC<RevenueGoalModalProps> = ({ isOpen, onClose, goal, onContinue }) => {
    const [currentRevenue, setCurrentRevenue] = useState<string>('');
    const [showGap, setShowGap] = useState(false);

    if (!isOpen) return null;

    const currentRevNum = parseInt(currentRevenue.replace(/[^0-9]/g, '')) || 0;
    const gap = goal.amount - currentRevNum;
    const clientsNeeded = Math.ceil(gap / 1500); // Assuming $1500/mo retainer avg

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-scale-in">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>

                {!showGap ? (
                    <div className="p-8 text-center">
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Let's build your {goal.title} Roadmap</h2>
                        <p className="text-slate-500 mb-8">First, where are you starting from today?</p>

                        <div className="relative max-w-xs mx-auto mb-8">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                            <input
                                type="text"
                                value={currentRevenue}
                                onChange={(e) => setCurrentRevenue(e.target.value)}
                                placeholder="0"
                                className="w-full pl-8 pr-4 py-4 text-2xl font-bold text-center border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:ring-0 outline-none"
                                autoFocus
                            />
                            <span className="block text-xs text-slate-400 mt-2">Current Monthly Revenue</span>
                        </div>

                        <button
                            onClick={() => setShowGap(true)}
                            disabled={!currentRevenue}
                            className="w-full py-4 bg-primary-600 text-white font-bold text-lg rounded-xl hover:bg-primary-700 transition-all disabled:opacity-50"
                        >
                            Calculate My Gap
                        </button>
                    </div>
                ) : (
                    <div className="bg-slate-50">
                        <div className="p-8 pb-0 text-center">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Your Growth Gap</p>
                            <h2 className="text-5xl font-extrabold text-primary-600 my-4">${gap.toLocaleString()}/mo</h2>
                            <p className="text-lg text-slate-600">
                                You are just <strong className="text-slate-900 border-b-2 border-primary-300">{clientsNeeded} clients</strong> away from your goal.
                            </p>
                        </div>

                        <div className="p-8">
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
                                <h3 className="font-bold text-slate-800 mb-2">The Strategy:</h3>
                                <p className="text-slate-600 text-sm">
                                    We have selected the <strong>"High-Ticket {goal.stackId.includes('seo') ? 'SEO' : 'Ads'} Stack"</strong> for you. It sells for $1,500 - $3,000/mo.
                                </p>
                            </div>

                            <button
                                onClick={() => onContinue(goal.stackId)}
                                className="w-full py-4 bg-orange-gradient text-white font-bold text-lg rounded-xl hover:scale-105 transition-transform shadow-lg shadow-orange-500/20"
                            >
                                View My Roadmap &raquo;
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
