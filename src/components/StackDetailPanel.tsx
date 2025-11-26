import React, { useState, useEffect } from 'react';
import type { SolutionStack, Solution } from '../types/types';
import { ALL_SOLUTIONS } from '../constants/constants';
import { BonusUnlockModal } from '../components/BonusUnlockModal';

interface StackDetailPanelProps {
    stack: SolutionStack;
    onClose: () => void;
    onLaunch: (stack: SolutionStack) => void;
}

const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>;

export const StackDetailPanel: React.FC<StackDetailPanelProps> = ({ stack, onClose, onLaunch }) => {
    const includedSolutions = ALL_SOLUTIONS.filter(s => stack.solutionIds.includes(s.id));
    const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'pitch'>('overview');
    const [viewers, setViewers] = useState(3);
    const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);

    useEffect(() => {
        // Randomize viewers count slightly on mount to feel dynamic
        setViewers(Math.floor(Math.random() * 5) + 2);
    }, []);

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full shadow-2xl overflow-y-auto animate-fade-in-right">
                
                {/* Header */}
                <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-6 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded border border-emerald-500/20">Proven Stack</span>
                            <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider rounded border border-slate-700">{stack.category}</span>
                             <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1 animate-pulse">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                {viewers} others viewing
                            </span>
                        </div>
                        <h2 className="text-2xl font-extrabold text-white">{stack.name}</h2>
                        <p className="text-slate-400 text-sm mt-1">{stack.description}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                        <XIcon />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">
                    
                    {/* Economics Strip */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Vendor Cost</p>
                            <p className="text-lg font-bold text-white">{stack.estimatedAgencyCost}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Typical Resale</p>
                            <p className="text-lg font-bold text-emerald-400">{stack.suggestedResalePrice}</p>
                        </div>
                         <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Margin</p>
                            <p className="text-lg font-bold text-white">{stack.typicalMargin || '40-60%'}</p>
                        </div>
                         <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Timeline</p>
                            <p className="text-lg font-bold text-white">{stack.estimatedLaunchTime}</p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-slate-700 flex gap-6">
                        {['overview', 'components', 'pitch'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`pb-3 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === tab ? 'text-primary-400 border-b-2 border-primary-400' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[300px]">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Who is this for?</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        Specifically designed for <strong>{stack.targetTeamSize?.join(', ') || 'Small'}</strong> agencies serving the <strong>{stack.targetNiche}</strong> market. 
                                        It solves the core problem of {stack.description.toLowerCase()}
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-3">What you replace</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {stack.replaces.map(tool => (
                                            <div key={tool.name} className="flex justify-between items-center p-3 bg-slate-800 rounded-lg border border-slate-700">
                                                <span className="text-sm text-slate-300">{tool.name}</span>
                                                <span className="text-xs font-mono text-slate-500 line-through">${tool.estimatedCost}/mo</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'components' && (
                            <div className="space-y-4">
                                <p className="text-sm text-slate-400 mb-2">The exact white-label partners included in this stack:</p>
                                {includedSolutions.map((sol, i) => (
                                    <div key={sol.id} className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-700">{i + 1}</div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-white font-bold">{sol.name}</h4>
                                                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-700 rounded text-slate-300">{sol.whitelabelType}</span>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-1">{sol.shortDescription}</p>
                                            
                                            <div className="mt-3 pt-3 border-t border-slate-700/50">
                                                <p className="text-xs font-bold text-primary-400 mb-1 flex items-center gap-1"><CheckIcon /> Resell Kit Includes:</p>
                                                <p className="text-xs text-slate-500">Pricing calculator, Proposal template, Sales script.</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                         {activeTab === 'pitch' && (
                            <div className="bg-primary-900/10 border border-primary-500/20 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4">How to sell this stack</h3>
                                <ul className="space-y-4">
                                    <li>
                                        <span className="block text-xs font-bold text-primary-400 uppercase mb-1">The Positioning</span>
                                        <p className="text-sm text-slate-300">"A complete {stack.name.replace('Stack', '')} system that runs on autopilot."</p>
                                    </li>
                                    <li>
                                        <span className="block text-xs font-bold text-primary-400 uppercase mb-1">Suggested Retainer</span>
                                        <p className="text-sm text-slate-300">{stack.suggestedResalePrice}</p>
                                    </li>
                                     <li>
                                        <span className="block text-xs font-bold text-primary-400 uppercase mb-1">Kickoff Timeline</span>
                                        <p className="text-sm text-slate-300">7-14 Days (using our onboarding snapshot)</p>
                                    </li>
                                    <li>
                                        <span className="block text-xs font-bold text-primary-400 uppercase mb-1">Client Deliverable</span>
                                        <p className="text-sm text-slate-300">Branded monthly reports + dashboard login.</p>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 p-6 bg-slate-900 border-t border-slate-800 flex flex-col gap-3">
                    <button onClick={() => setIsBonusModalOpen(true)} className="w-full py-3 bg-orange-gradient text-white font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-lg flex items-center justify-center gap-2">
                        Unlock $1,500 in Bonuses
                    </button>
                    <div className="flex justify-between items-center px-2">
                        <button className="text-xs font-semibold text-slate-500 hover:text-white transition-colors">Save to Library</button>
                        <button className="text-xs font-semibold text-slate-500 hover:text-white transition-colors">Talk to us about this stack</button>
                    </div>
                </div>

                <BonusUnlockModal
                    isOpen={isBonusModalOpen}
                    onClose={() => setIsBonusModalOpen(false)}
                    launchKit={{
                        id: 'kit-' + stack.id,
                        title: 'Agency Launch Kit',
                        description: 'Everything you need to resell this software as your own product.',
                        total_value: 150000,
                        access_tier: 'verified_trial'
                    }}
                    bonusAssets={[
                        { id: '1', title: 'The "Close-in-One-Call" Sales Script', description: 'Word-for-word script to sell this specific stack.', asset_type: 'pdf', estimated_value: 49700 },
                        { id: '2', title: 'White-Label Legal Contract', description: 'Protect your agency with this resell agreement.', asset_type: 'pdf', estimated_value: 29700 },
                        { id: '3', title: 'Setup Wizard (DNS & Stripe)', description: 'Step-by-step guide to technical setup.', asset_type: 'video', estimated_value: 19700 },
                        { id: '4', title: 'Email Sequence', description: '3-part nurture sequence to convert leads.', asset_type: 'doc', estimated_value: 9700 },
                    ]}
                    affiliateUrl={includedSolutions[0]?.companyWebsite || '#'}
                    onVerifyTrial={(screenshot) => {
                        console.log('Verified:', screenshot);
                    }}
                    onComplete={() => {
                        onLaunch(stack);
                    }}
                />
            </div>
        </div>
    );
};