import React, { useState } from 'react';
import type { Solution } from '../types';
import { AFFILIATE_LINKS } from '../affiliates';

interface StackActivationModalProps {
    isOpen: boolean;
    onClose: () => void;
    solutions: Solution[];
    onComplete: () => void;
}

export const StackActivationModal: React.FC<StackActivationModalProps> = ({ isOpen, onClose, solutions, onComplete }) => {
    const [activatedIds, setActivatedIds] = useState<Set<string>>(new Set());

    if (!isOpen) return null;

    const handleLinkClick = (url: string, id: string) => {
        window.open(url, '_blank');
        setActivatedIds(prev => {
            const newSet = new Set(prev);
            newSet.add(id);
            return newSet;
        });
    };

    const activatedCount = activatedIds.size;

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400">✕</button>

                <h2 className="text-2xl font-bold text-slate-900 mb-2">Activate Your Stack</h2>
                <p className="text-slate-500 mb-6 text-sm">To unlock the Resell Kit, you must initiate trials for the core components.</p>

                <div className="space-y-4 mb-8">
                    {solutions.map((sol, index) => {
                        const url = AFFILIATE_LINKS[sol.id] || sol.companyWebsite;
                        return (
                            <div key={sol.id} className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${activatedIds.has(sol.id) ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:border-primary-500'}`}>
                                <div className="flex items-center gap-3">
                                    <div className="bg-slate-100 p-2 rounded-lg">
                                        <img src={sol.logo} className="w-8 h-8 object-cover" alt={sol.name} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">{sol.name}</p>
                                        <p className="text-xs text-slate-500">{sol.whitelabelType}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleLinkClick(url, sol.id)}
                                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${activatedIds.has(sol.id) ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-primary-50 text-primary-700 hover:bg-primary-100'}`}
                                >
                                    {activatedIds.has(sol.id) ? 'Activated ✓' : 'Start Trial ➜'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-slate-50 p-4 rounded-xl text-center">
                    <p className="text-xs text-slate-500 mb-2">
                        {activatedCount >= solutions.length ? "All systems go!" : `${activatedCount}/${solutions.length} activated`}
                    </p>
                    <button
                        disabled={activatedCount < solutions.length}
                        onClick={onComplete}
                        className="w-full py-3 bg-emerald-500 text-white font-bold rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-lg shadow-emerald-500/20"
                    >
                        {activatedCount < solutions.length ? "Activate All to Continue" : "Download Launch Kit"}
                    </button>
                </div>
            </div>
        </div>
    );
};
