import React, { useState } from 'react';
import type { Solution } from './types';

const StarIcon: React.FC<{ filled: boolean; key?: React.Key }> = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={filled ? "text-amber-400" : "text-slate-600"}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

const VerifiedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const HideIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
);

const ShieldCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>
    </svg>
);


interface SolutionCardProps {
    solution: Solution;
    isSelectedForCompare: boolean;
    isCompareListFull: boolean;
    onToggleCompare: (id: string) => void;
    onHide: (id: string) => void;
    onViewDetails: (solution: Solution) => void;
    index: number;
    badge?: { label: string; color: string };
}

const getMatchQuality = (score?: number): { text: string; className: string } | null => {
    if (score === undefined) return null;
    if (score >= 90) return { text: 'Excellent Match', className: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' };
    if (score >= 80) return { text: 'Great Match', className: 'bg-green-500/10 text-green-300 border border-green-500/20' };
    if (score >= 70) return { text: 'Good Match', className: 'bg-sky-500/10 text-sky-300 border border-sky-500/20' };
    if (score >= 50) return { text: 'Fair Match', className: 'bg-amber-500/10 text-amber-300 border border-amber-500/20' };
    return null;
}

const calculatePartnerProgramScore = (solution: Solution) => {
    const readinessScore = Object.values(solution.agencyReadiness).filter(Boolean).length;
    const trustScore = Object.values(solution.vendorTrust).filter(Boolean).length;
    // Total possible points: 4 (readiness) + 3 (trust) = 7
    return ((readinessScore + trustScore) / 7) * 100;
};

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, isSelectedForCompare, isCompareListFull, onToggleCompare, onHide, onViewDetails, index, badge }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const matchQuality = getMatchQuality(solution.matchScore);
    const selectionClass = isSelectedForCompare ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-slate-900' : 'border-slate-700/50';
    const featuresToShow = isExpanded ? solution.features : solution.features.slice(0, 4);
    const partnerProgramScore = calculatePartnerProgramScore(solution);

    return (
        <article style={{ animationDelay: `${index * 100}ms` }} className={`bg-slate-900 border rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary-500/5 hover:border-primary-500/30 transition-all duration-300 ${selectionClass} relative group flex flex-col opacity-0 animate-fade-in-up overflow-hidden`}>
             {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Badge */}
            {badge && (
                <div className={`absolute top-4 left-0 px-3 py-1 rounded-r-full text-xs font-bold shadow-lg z-10 ${badge.color}`}>
                    {badge.label}
                </div>
            )}

            <button
                onClick={() => onHide(solution.id)}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                aria-label={`Hide ${solution.name}`}
                title="Hide this solution"
            >
                <HideIcon />
            </button>
            <div className="p-6 flex-grow relative z-0">
                {/* Header */}
                <header className="flex items-start gap-4 mb-5 pb-5 border-b border-slate-800">
                    <img src={solution.logo} alt={`${solution.name} logo`} className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-slate-800" />
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">{solution.name}</h3>
                            {matchQuality && (
                                <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full ${matchQuality.className}`}>{matchQuality.text}</span>
                            )}
                            {partnerProgramScore >= 85 && (
                                 <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full bg-secondary-500/10 text-secondary-300 border border-secondary-500/20"><ShieldCheckIcon/> Top Partner</span>
                            )}
                        </div>
                        <p className="text-sm text-slate-400 mt-1">by {solution.companyName}</p>
                         {solution.matchScore !== undefined && (
                            <div className="flex items-center gap-3 mt-3">
                                <div className="w-full bg-slate-800 rounded-full h-1.5 flex-1">
                                    <div className="bg-gradient-to-r from-primary-600 to-primary-400 h-1.5 rounded-full" style={{ width: `${solution.matchScore}%` }}></div>
                                </div>
                                <span className="text-sm font-bold text-primary-400">{solution.matchScore}%</span>
                            </div>
                        )}
                    </div>
                </header>
                <div className="flex justify-between items-center text-sm text-slate-500 mb-5">
                     <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(solution.rating)} />)}
                        </div>
                        <span className="font-semibold text-slate-300 ml-1">{solution.rating.toFixed(1)}</span>
                        <span className="text-xs">({solution.reviews.length} reviews)</span>
                    </div>
                    {solution.isVerified && <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded"><VerifiedIcon/> Verified</div>}
                </div>

                {/* Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Overview</h4>
                            <p className="text-sm text-slate-300 leading-relaxed">{solution.shortDescription}</p>
                        </div>
                        {solution.matchReasoning && (
                            <div className="p-3 bg-primary-900/20 border border-primary-500/20 rounded-lg text-sm text-primary-300">
                                <span className="font-bold text-primary-400">Why it matches:</span> {solution.matchReasoning}
                            </div>
                        )}
                        <div>
                            <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Features</h5>
                            <ul className="text-sm text-slate-400 space-y-1.5">
                                {featuresToShow.map(feat => (
                                    <li key={feat} className="flex items-start gap-2">
                                        <div className="w-1 h-1 rounded-full bg-slate-500 mt-2"></div>
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            {solution.features.length > 4 && (
                                <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs font-bold text-primary-500 hover:text-primary-400 mt-2 uppercase tracking-wide">
                                    {isExpanded ? 'Show Less' : `+ ${solution.features.length - 4} more`}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-700/50 flex flex-col justify-between">
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Agency Snapshot</h4>
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between items-center pb-2 border-b border-slate-700/50 last:border-0 last:pb-0">
                                    <dt className="text-slate-400">Margin Potential</dt>
                                    <dd className="font-bold text-emerald-400">Up to {solution.agencyMargin}%</dd>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-700/50 last:border-0 last:pb-0">
                                    <dt className="text-slate-400">Starting Price</dt>
                                    <dd className="font-semibold text-white">{solution.startingPrice}</dd>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-700/50 last:border-0 last:pb-0">
                                    <dt className="text-slate-400">Support Model</dt>
                                    <dd className="font-semibold text-white">{solution.partnerSupportModel}</dd>
                                </div>
                            </dl>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-700/50">
                            <dt className="text-[10px] uppercase font-bold text-slate-500 mb-2">Partner Readiness</dt>
                            <dd className="flex items-center gap-3">
                                <div className="w-full bg-slate-700 rounded-full h-1.5 flex-1"><div className="bg-secondary-500 h-1.5 rounded-full" style={{ width: `${partnerProgramScore}%` }}></div></div>
                                <span className="text-xs font-bold text-secondary-400">{Math.round(partnerProgramScore)}%</span>
                            </dd>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="p-4 px-6 bg-slate-950/30 border-t border-slate-800 flex items-center justify-between gap-4 relative z-0">
                <label className="flex items-center gap-3 cursor-pointer select-none group/compare">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelectedForCompare ? 'bg-primary-600 border-primary-600' : 'border-slate-600 bg-slate-800 group-hover/compare:border-primary-500'}`}>
                        {isSelectedForCompare && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </div>
                    <input
                        type="checkbox"
                        checked={isSelectedForCompare}
                        onChange={() => onToggleCompare(solution.id)}
                        disabled={!isSelectedForCompare && isCompareListFull}
                        className="hidden"
                    />
                    <span className={`text-sm font-medium transition-colors ${isSelectedForCompare ? 'text-primary-400' : 'text-slate-400 group-hover/compare:text-slate-200'} ${isCompareListFull && !isSelectedForCompare ? 'opacity-50' : ''}`}>Compare</span>
                </label>
                <div className="flex items-center gap-3">
                    <a
                         href={`#demoMode?type=${solution.primaryCategory === 'Marketing & Advertising' || solution.primaryCategory === 'Fintech, Blockchain & Web3' ? 'growth' : solution.primaryCategory === 'Industry-Specific Platforms' ? 'reputation' : 'ops'}`}
                         target="_blank"
                         rel="noreferrer"
                         className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-400 hover:text-white border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <EyeIcon /> Demo
                    </a>
                    <button onClick={() => onViewDetails(solution)} className="px-5 py-2 bg-orange-gradient text-white text-sm font-bold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-orange-900/20">
                       View Details
                    </button>
                </div>
            </footer>
        </article>
    );
};

const SolutionCardSkeleton = () => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-6 animate-pulse">
      <div className="flex items-start gap-4 mb-4 pb-4 border-b border-slate-800">
        <div className="w-16 h-16 rounded-lg bg-slate-800 flex-shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 w-3/4 bg-slate-800 rounded"></div>
          <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
          <div className="flex gap-2 pt-1">
            <div className="h-5 w-20 bg-slate-800 rounded-md"></div>
            <div className="h-5 w-24 bg-slate-800 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="h-5 w-1/3 bg-slate-800 rounded"></div>
          <div className="h-4 w-full bg-slate-800 rounded"></div>
          <div className="h-4 w-5/6 bg-slate-800 rounded"></div>
          <div className="h-10 w-full bg-slate-800 rounded-lg"></div>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-lg space-y-3">
          <div className="h-5 w-1/2 bg-slate-800 rounded"></div>
          <div className="h-4 w-full bg-slate-800 rounded"></div>
          <div className="h-4 w-full bg-slate-800 rounded"></div>
          <div className="h-4 w-full bg-slate-800 rounded"></div>
        </div>
      </div>
    </div>
);

export { SolutionCard, SolutionCardSkeleton };