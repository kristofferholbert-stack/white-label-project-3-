import React, { useState } from 'react';
import type { HeroStack, HeroStackDetails } from '../types';

// Icons
export const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
export const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
export const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
export const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
export const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
export const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
export const BookmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>;

// New Icons for the "Franchise Box" look
export const PackageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
export const TrendingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
export const BlueprintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;


interface HeroStackCardProps {
    stack: HeroStack;
    onExpand: () => void;
    isActive: boolean;
    isLocked: boolean;
    viewers?: number;
    tags?: string[];
    isBookmarked?: boolean;
    onToggleBookmark?: () => void;
}

export const HeroStackCard: React.FC<HeroStackCardProps> = ({ stack, onExpand, isActive, isLocked, viewers, tags, isBookmarked, onToggleBookmark }) => (
    <div
        onClick={onExpand}
        className={`group relative flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-orange-500/50 transition-all duration-300 cursor-pointer ${isActive ? 'ring-2 ring-primary-500 border-primary-500' : ''}`}
    >
         {/* 1. The Visual Hook (Image Header) */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-800">
            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10"></div>

            <img
                src={stack.details.heroImage}
                alt={stack.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter grayscale-[20%] group-hover:grayscale-0"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
                 <div className={`inline-block px-2.5 py-0.5 text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-sm ${stack.badgeColor}`}>
                    {stack.badge}
                </div>
                {viewers && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-wider rounded border border-orange-500/20 animate-pulse backdrop-blur-md">
                        <TrendingIcon /> {viewers} viewing
                    </div>
                )}
            </div>
        </div>

        {/* 2. The "Franchise" Details */}
        <div className="p-6 flex-grow flex flex-col relative z-20 -mt-6">
             <h3 className="text-xl font-extrabold text-white mb-2 leading-tight group-hover:text-orange-400 transition-colors">{stack.title}</h3>

             {/* Tags */}
             {tags && tags.length > 0 && (
                 <div className="flex flex-wrap gap-1.5 mb-4">
                     {tags.slice(0,3).map(tag => (
                         <span key={tag} className="px-1.5 py-0.5 bg-slate-950 text-slate-500 text-[10px] font-medium rounded border border-slate-800">{tag}</span>
                     ))}
                 </div>
             )}

             <p className="text-sm text-slate-400 line-clamp-2 mb-6">{stack.description}</p>

            {/* The "Included in Box" Inventory List */}
            <div className="mb-6 bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Inside the Box:</p>
                <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-300 border border-slate-700">
                        <PackageIcon /> {stack.solutionIds.length} Tools
                    </span>
                    <span className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-300 border border-slate-700">
                        📄 Sales Deck
                    </span>
                    <span className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-300 border border-slate-700">
                        ⚖️ Contracts
                    </span>
                </div>
            </div>

             {/* Economics Strip */}
            <div className="grid grid-cols-2 gap-4 mb-6 border-t border-slate-800 pt-4 mt-auto">
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Cost</p>
                    <p className="text-sm font-bold text-white">{stack.cost}</p>
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Resell</p>
                    <p className="text-sm font-bold text-emerald-400">{stack.resell}</p>
                </div>
            </div>

            {/* 4. The High-Contrast CTA */}
            <div className="flex gap-2">
                {onToggleBookmark && (
                     <button
                        onClick={(e) => { e.stopPropagation(); onToggleBookmark(); }}
                        className={`p-3 border border-slate-600 rounded-xl hover:bg-slate-800 transition-colors ${isBookmarked ? 'text-primary-500 border-primary-500' : 'text-slate-300'}`}
                        title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
                    >
                        <BookmarkIcon />
                    </button>
                )}
                <button className="flex-1 py-3 border border-slate-600 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
                    {isActive ? 'Close' : 'Preview'}
                </button>
                <button className="flex-[2] py-3 bg-orange-gradient text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2 text-sm">
                    {isLocked ? <LockIcon /> : <BlueprintIcon />} {isLocked ? 'Unlock' : 'View Blueprint'}
                </button>
            </div>
        </div>
    </div>
);

export const ProfitCalculator: React.FC<{ defaults: HeroStackDetails['profitCalculator'] }> = ({ defaults }) => {
    const [clients, setClients] = useState(defaults.defaultClients);
    const [price, setPrice] = useState(defaults.defaultPrice);

    const revenue = clients * price;
    const cost = defaults.agencyCost;
    const profit = revenue - cost;

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
            <h4 className="text-lg font-bold text-white mb-4">Your Profit Potential</h4>
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Clients</span>
                        <span className="font-bold text-white">{clients}</span>
                    </div>
                    <input type="range" min="1" max="100" value={clients} onChange={(e) => setClients(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Price per Client</span>
                        <span className="font-bold text-white">${price.toLocaleString()}</span>
                    </div>
                    <input type="range" min="500" max="10000" step="100" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                </div>
                <div className="pt-4 border-t border-slate-700">
                    <div className="flex justify-between items-end">
                         <div className="text-left">
                            <p className="text-xs text-slate-500 uppercase">Your Cost</p>
                            <p className="text-lg font-medium text-slate-400">${cost.toLocaleString()}/mo</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-emerald-500 font-bold uppercase">You Keep</p>
                            <p className="text-3xl font-extrabold text-white">${profit.toLocaleString()}/mo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const StackDetailInline: React.FC<{ stack: HeroStack, onClose: () => void, onLaunch: () => void }> = ({ stack, onClose, onLaunch }) => {
    const { details } = stack;

    return (
        <div className="col-span-1 lg:col-span-2 xl:col-span-3 bg-slate-800 border-x border-b border-slate-700 rounded-b-2xl -mt-2 mb-8 p-8 sm:p-10 shadow-inner animate-fade-in-down relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary-500"></div>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white bg-slate-900/50 rounded-full transition-colors"><XIcon /></button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Column: Visuals & Calc */}
                <div className="space-y-8">
                    <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-600">
                        <img src={details.heroImage} alt={stack.title} className="w-full h-auto object-cover" />
                    </div>
                    <ProfitCalculator defaults={details.profitCalculator} />
                </div>

                {/* Right Column: Kit & Actions */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Suggested Pricing Tiers</h3>
                        <div className="space-y-3">
                            {details.pricingTiers.map((tier, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                                    <span className="font-semibold text-white">{tier.name}</span>
                                    <span className="font-mono text-emerald-400">{tier.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">Included Resell Kit</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {details.resellKitAssets.map((asset, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                    <CheckCircleIcon /> {asset}
                                </div>
                            ))}
                        </div>
                        <button className="mt-4 w-full flex items-center justify-center gap-2 py-3 border border-slate-600 rounded-lg text-slate-300 font-semibold hover:bg-slate-700 transition-colors">
                            <DownloadIcon /> Download Full Kit Preview
                        </button>
                    </div>

                    <div className="bg-primary-900/30 p-6 rounded-xl border border-primary-500/30">
                        <h4 className="text-lg font-bold text-white mb-2">The Closer</h4>
                        <p className="text-sm text-slate-300 mb-4">
                            You now have two choices: <br/>
                            A) Keep researching and stay at your current revenue.<br/>
                            B) Deploy this stack in 7 days and add $10k+ MRR.
                        </p>
                        <button onClick={onLaunch} className="w-full bg-orange-gradient text-white font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-all shadow-lg text-lg">
                            Activate This Stack Free (Takes 4 mins)
                        </button>
                         <p className="text-xs text-slate-500 text-center mt-3">
                            {details.grandfatheredPricingLeft} spots left for grandfathered pricing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
