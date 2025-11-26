
import React, { useState, useEffect, useMemo } from 'react';
import type { SolutionStack, Solution, Page, ProfitabilityEstimates, SystemAssetsPreview } from '../types/types';
import { ALL_SOLUTIONS, RESELL_KITS } from '../constants/constants';
import { getNicheProfitabilityEstimates, generateSystemAssetsPreview } from '../services/geminiService';
import { StackActivationModal } from '../components/StackActivationModal';
import { TripwireCard } from '../components/TripwireCard';
import { useAuth } from '../context/AuthProvider';
import { supabase } from '../services/supabase';
// The prompt requested importing useNavigate, but we are using onNavigate prop for compatibility.
// However, I will keep the import if it's needed for type checking or future use, but commented out if unused to avoid lint errors.
// import { useNavigate } from 'react-router-dom';

// Icons
const BackArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const HeadsetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-500"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>;
const PuzzleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M19.43 12.03c.25.82.25 1.71 0 2.53l-.33 1.02a2 2 0 0 1-1.37 1.37l-1.02.33c-.82.25-1.71.25-2.53 0l-1.02-.33a2 2 0 0 1-1.37-1.37l-.33-1.02a2.53 2.53 0 0 1 0-2.53l.33-1.02a2 2 0 0 1 1.37-1.37l1.02-.33c.82-.25 1.71-.25 2.53 0l1.02.33a2 2 0 0 1 1.37 1.37l.33 1.02z"/><path d="M12 17.56V14a2 2 0 0 0-2-2H2.44a2 2 0 0 1-1.4-3.43l3.43-3.43a2 2 0 0 1 3.43 1.4v1.56a2 2 0 0 0 2 2h4.44a2 2 0 0 1 1.4 3.43l-3.43 3.43a2 2 0 0 1-3.43-1.4z"/></svg>;
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;

// New Icons from prompt
const LockOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>;
const GiftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const FlowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
const BookmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;


const AiPoweredProfitCalculator: React.FC<{
    estimates: ProfitabilityEstimates;
    nicheTitle: string;
    isAiLoading: boolean;
}> = ({ estimates, nicheTitle, isAiLoading }) => {
    const [clients, setClients] = useState(20);
    const [price, setPrice] = useState(estimates.averageClientPrice);
    const [margin, setMargin] = useState(estimates.typicalAgencyMargin);

    useEffect(() => {
        setPrice(estimates.averageClientPrice);
        setMargin(estimates.typicalAgencyMargin);
    }, [estimates]);

    const profit = Math.round(clients * price * (margin / 100));

    return (
        <div className="bg-white p-8 rounded-2xl border border-primary-200 shadow-lg shadow-primary-500/10 relative">
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">AI-POWERED</div>
            <h2 className="text-2xl font-bold text-slate-800 text-center">Forecast Your Profitability</h2>
            <p className="text-center text-slate-500 mt-1 mb-6">Use our calculator, pre-filled with estimates for the <span className="font-bold text-slate-700">{nicheTitle}</span> niche, to see your potential monthly profit.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <label className="flex justify-between items-center text-sm font-medium text-slate-700">
                            <span>Number of Clients</span>
                            <input type="number" value={clients} onChange={e => setClients(Number(e.target.value))} className="w-20 p-1 text-center font-bold border-slate-300 bg-slate-100 text-slate-800 rounded-md" />
                        </label>
                        <input type="range" min="1" max="200" value={clients} onChange={e => setClients(Number(e.target.value))} className="w-full mt-2 accent-primary-600" />
                    </div>
                    <div>
                        <label className="flex justify-between items-center text-sm font-medium text-slate-700">
                            <span>Price per Client ($)</span>
                             <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-20 p-1 text-center font-bold border-slate-300 bg-slate-100 text-slate-800 rounded-md" />
                        </label>
                        <input type="range" min="19" max="499" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full mt-2 accent-primary-600" />
                    </div>
                     <div>
                        <label className="flex justify-between items-center text-sm font-medium text-slate-700">
                            <span>Your Margin (%)</span>
                            <span className="font-bold">{margin}%</span>
                        </label>
                        <input type="range" min="10" max="80" value={margin} onChange={e => setMargin(Number(e.target.value))} className="w-full mt-2 accent-primary-600" />
                    </div>
                </div>
                <div className="text-center bg-emerald-50 p-6 rounded-lg border border-emerald-200 mt-6 md:mt-0">
                    <p className="font-semibold text-emerald-800">Your Estimated</p>
                    <p className="text-5xl font-extrabold text-slate-800 tracking-tight my-2">${profit.toLocaleString()}</p>
                    <p className="font-semibold text-emerald-800">Monthly Profit</p>
                </div>
            </div>
             {isAiLoading && 
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl">
                    <p className="font-semibold text-slate-600 animate-pulse">Refining estimates with AI...</p>
                </div>
            }
        </div>
    );
};


const LogicSection: React.FC<{ stack: SolutionStack }> = ({ stack }) => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="bg-primary-500/20 p-2 rounded-lg text-primary-400">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white">The Logic (Why This Works)</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="p-4 bg-red-900/10 border border-red-900/30 rounded-lg">
                <h4 className="text-red-400 font-bold uppercase text-xs tracking-wider mb-2">The Old Way (The "Churn Trap")</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Most agencies promise leads. They run ads. The leads don't answer. The client gets mad. You get fired. This is why agency churn is 40%.
                </p>
            </div>
            <div className="p-4 bg-emerald-900/10 border border-emerald-900/30 rounded-lg">
                <h4 className="text-emerald-400 font-bold uppercase text-xs tracking-wider mb-2">The {stack.name} Shift</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                    {stack.compatibility?.description || "This stack automates the outcome. You don't sell effort; you sell results. The system runs 24/7 without you."}
                </p>
                <ul className="mt-4 space-y-2">
                    <li className="flex gap-2 text-white text-xs font-medium"><span className="text-emerald-500">✔</span> Instant ROI for the client</li>
                    <li className="flex gap-2 text-white text-xs font-medium"><span className="text-emerald-500">✔</span> {stack.replaces[0]?.name ? `Replaces ${stack.replaces[0].name}` : 'Reduces Labor Cost'}</li>
                    <li className="flex gap-2 text-white text-xs font-medium"><span className="text-emerald-500">✔</span> You look like a wizard</li>
                </ul>
            </div>
        </div>
    </div>
);

const UnitEconomicsTable: React.FC<{ stack: SolutionStack }> = ({ stack }) => (
    <div className="mb-12">
        <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">The 10x ROI Breakdown</h3>
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                    <tr>
                        <th className="px-6 py-4">Item</th>
                        <th className="px-6 py-4">Cost to You</th>
                        <th className="px-6 py-4">Revenue from Client</th>
                        <th className="px-6 py-4">Your Profit</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                        <td className="px-6 py-4 font-medium text-slate-900">Software Costs</td>
                        <td className="px-6 py-4 text-red-500">{stack.estimatedAgencyCost}</td>
                        <td className="px-6 py-4 text-slate-400">---</td>
                        <td className="px-6 py-4 text-slate-400">---</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 font-medium text-slate-900">Service Price</td>
                        <td className="px-6 py-4 text-slate-400">---</td>
                        <td className="px-6 py-4 text-emerald-600 font-bold">{stack.suggestedResalePrice}</td>
                        <td className="px-6 py-4 text-slate-400">---</td>
                    </tr>
                    <tr className="bg-emerald-50">
                        <td className="px-6 py-4 font-bold text-emerald-900">TOTAL (Per Client)</td>
                        <td className="px-6 py-4 font-mono text-slate-500">{stack.estimatedAgencyCost}</td>
                        <td className="px-6 py-4 font-mono text-slate-500">{stack.suggestedResalePrice}</td>
                        <td className="px-6 py-4 font-mono font-bold text-emerald-600 text-lg">
                            {stack.typicalMargin} Margin
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p className="text-center text-slate-500 mt-4 text-xs">
            *Result: Sell this to just 3 clients to make <strong>$4,000+ per month</strong> in pure profit.*
        </p>
    </div>
);

interface SystemDetailPageProps {
    stack: SolutionStack;
    onBack: () => void;
    onLaunch: (stack: SolutionStack) => void;
    onNavigate: (page: Page, context?: any) => void;
}

const SystemStrengths: React.FC<{ solutions: Solution[] }> = ({ solutions }) => {
    const solutionsWithVendorSupport = solutions.filter(s => s.partnerSupportModel !== 'Agency-led').length;
    const allValueAddons = [...new Set(solutions.flatMap(s => s.valueAddons))];
    const solutionsWithTrust = solutions.filter(s => s.vendorTrust.hasPublicRoadmap || s.vendorTrust.hasSLA).length;

    return (
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Why This System Works</h2>
            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-sky-100 rounded-lg"><HeadsetIcon /></div>
                    <div>
                        <h3 className="font-bold text-slate-800">Reduced Support Load</h3>
                        <p className="text-sm text-slate-600">{solutionsWithVendorSupport} of {solutions.length} solutions feature vendor-led or hybrid support, minimizing your team's workload.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-lg"><PuzzleIcon /></div>
                    <div>
                        <h3 className="font-bold text-slate-800">Built-in Differentiation</h3>
                        <p className="text-sm text-slate-600">This system includes unique value-adds like <span className="font-semibold">{allValueAddons.join(', ')}</span>, helping you stand out from the competition.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-lg"><ShieldCheckIcon /></div>
                    <div>
                        <h3 className="font-bold text-slate-800">Trusted Foundation</h3>
                        <p className="text-sm text-slate-600">{solutionsWithTrust} of {solutions.length} partners demonstrate transparency with public roadmaps or SLAs, reducing your risk.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const SystemDetailPage: React.FC<SystemDetailPageProps> = ({ stack, onBack, onLaunch, onNavigate }) => {
    const { user } = useAuth();
    const [profitEstimates, setProfitEstimates] = useState<ProfitabilityEstimates>(() => {
        const priceString = stack.suggestedResalePrice;
        const costString = stack.estimatedAgencyCost;
        const averageClientPrice = parseInt(priceString.match(/\d+/)?.[0] || '99', 10);
        const estimatedAgencyCost = parseInt(costString.match(/\d+/)?.[0] || '40', 10);
        const typicalAgencyMargin = averageClientPrice > 0 ? Math.round(((averageClientPrice - estimatedAgencyCost) / averageClientPrice) * 100) : 40;
        return { averageClientPrice, typicalAgencyMargin };
    });
    const [isAiEstimating, setIsAiEstimating] = useState(true);
    const [isActivationOpen, setIsActivationOpen] = useState(false);
    const includedSolutions = ALL_SOLUTIONS.filter(s => stack.solutionIds.includes(s.id));
    
    // Detail Page State
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [reviews, setReviews] = useState<any[]>([]);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

    useEffect(() => {
        const fetchEstimates = async () => {
            setIsAiEstimating(true);
            try {
                const estimates = await getNicheProfitabilityEstimates(stack.name);
                setProfitEstimates(estimates);
            } catch (e) {
                console.error("Failed to fetch AI estimates, using defaults.");
            } finally {
                setIsAiEstimating(false);
            }
        };
        fetchEstimates();
    }, [stack]);

    // Fetch Bookmarks & Reviews
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                // Check Bookmark
                const { data: bookmarkData } = await supabase
                    .from('saved_items')
                    .select('id')
                    .eq('user_id', user.id)
                    .eq('item_id', stack.id)
                    .eq('item_type', 'stack')
                    .maybeSingle();
                setIsBookmarked(!!bookmarkData);
            }

            // Fetch Reviews
            const { data: reviewData } = await supabase
                .from('reviews')
                .select('*')
                .eq('item_id', stack.id)
                .eq('item_type', 'stack')
                .order('created_at', { ascending: false });

            if (reviewData) setReviews(reviewData);
        };
        fetchData();
    }, [stack.id, user]);
    
    const totalSavings = useMemo(() => stack.replaces.reduce((acc, tool) => acc + tool.estimatedCost, 0), [stack.replaces]);


    const handleToggleBookmark = async () => {
        if (!user) {
            alert("Please log in to bookmark.");
            return;
        }
        if (isBookmarked) {
            const { error } = await supabase.from('saved_items').delete().eq('user_id', user.id).eq('item_id', stack.id).eq('item_type', 'stack');
            if (!error) setIsBookmarked(false);
        } else {
            const { error } = await supabase.from('saved_items').insert({ user_id: user.id, item_id: stack.id, item_type: 'stack' });
            if (!error) setIsBookmarked(true);
        }
    };

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => alert("Link copied to clipboard!"));
    };

    const handleSubmitReview = async () => {
        if (!user) return;

        const { error } = await supabase.from('reviews').insert({
            user_id: user.id,
            item_id: stack.id,
            item_type: 'stack',
            rating: newReview.rating,
            comment: newReview.comment
        });

        if (!error) {
            setReviews(prev => [{ ...newReview, id: 'temp', created_at: new Date().toISOString() }, ...prev]);
            setIsReviewModalOpen(false);
            setNewReview({ rating: 5, comment: '' });
        } else {
            alert("Failed to submit review. You may have already reviewed this item.");
        }
    };

    return (
        <main className="flex-grow bg-slate-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800 mb-6">
                    <BackArrowIcon /> Back to Search Results
                </button>
                
                {/* Header */}
                <header className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-8 relative">
                     {/* Action Bar */}
                     <div className="absolute top-8 right-8 flex gap-2">
                        <button onClick={handleToggleBookmark} className={`p-2 rounded-lg border transition-colors ${isBookmarked ? 'bg-primary-50 border-primary-200 text-primary-600' : 'bg-white border-slate-200 text-slate-400 hover:border-primary-500 hover:text-primary-500'}`} title="Bookmark">
                            <BookmarkIcon />
                        </button>
                        <button onClick={handleShare} className="p-2 rounded-lg border border-slate-200 text-slate-400 bg-white hover:border-primary-500 hover:text-primary-500 transition-colors" title="Share">
                            <ShareIcon />
                        </button>
                     </div>

                     <div className="flex flex-col md:flex-row items-start gap-8 pr-24">
                        <div className="flex -space-x-4">
                            {includedSolutions.slice(0, 3).map((sol, i) => (
                                <img key={sol.id} src={sol.logo} alt={`${sol.name} logo`} className="w-20 h-20 rounded-full object-cover flex-shrink-0 bg-white border-4 border-white" style={{ zIndex: 3 - i }}/>
                            ))}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">{stack.name}</h1>
                            <p className="mt-2 text-lg text-slate-600">{stack.targetNiche}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {stack.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 text-sm font-semibold rounded-full bg-primary-100 text-primary-800">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* NEW: High-Conversion Header Actions */}
                        <div className="flex-shrink-0 w-full md:w-auto flex flex-col gap-3 mt-4 md:mt-0">
                            <button
                                onClick={() => setIsActivationOpen(true)}
                                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 border border-transparent bg-gradient-to-r from-orange-500 to-orange-600 text-lg font-bold rounded-xl text-white hover:scale-105 transition-transform shadow-xl shadow-orange-900/20"
                            >
                                <LockOpenIcon /> Unlock Bonuses & Start Trial
                            </button>
                        </div>
                    </div>
                </header>

                <StackActivationModal
                    isOpen={isActivationOpen}
                    onClose={() => setIsActivationOpen(false)}
                    solutions={includedSolutions}
                    onComplete={() => {
                        setIsActivationOpen(false);
                        onLaunch(stack);
                    }}
                />

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">System Overview</h2>
                            <p className="text-slate-600 prose prose-slate max-w-none">{stack.description}</p>
                        </div>

                        {/* The Logic Section */}
                        <LogicSection stack={stack} />

                        {/* The Unit Economics */}
                        <UnitEconomicsTable stack={stack} />

                         <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Included Solutions</h2>
                            <div className="space-y-6">
                                {includedSolutions.map(sol => (
                                    <div key={sol.id} className="flex items-start gap-5 p-4 bg-slate-50 rounded-lg">
                                        <img src={sol.logo} alt={sol.name} className="w-16 h-16 rounded-lg flex-shrink-0"/>
                                        <div>
                                            <h3 className="font-bold text-slate-800">{sol.name}</h3>
                                            <p className="text-sm text-slate-500">by {sol.companyName}</p>
                                            <p className="text-sm text-slate-600 mt-2">{sol.shortDescription}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {stack.compatibility && (
                            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mt-8 relative overflow-hidden">
                                {/* Background Pattern to make it look technical */}
                                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                                <div className="relative z-10">
                                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                        <FlowIcon /> System Architecture
                                    </h2>

                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6">
                                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">The Workflow</h3>
                                        <p className="font-mono text-lg font-semibold text-blue-600 flex flex-wrap items-center gap-2">
                                            {stack.compatibility.systemDiagram.split('→').map((step, i) => (
                                                <React.Fragment key={i}>
                                                    {i > 0 && <span className="text-slate-300">→</span>}
                                                    <span className="bg-white px-3 py-1 rounded border border-blue-100 shadow-sm">{step.trim()}</span>
                                                </React.Fragment>
                                            ))}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="md:col-span-2">
                                            <h3 className="font-bold text-slate-800 text-lg mb-2">{stack.compatibility.headline}</h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {stack.compatibility.description}
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                                            <h4 className="font-bold text-blue-900 text-sm mb-3 uppercase">Tech Requirements</h4>
                                            <ul className="space-y-2">
                                                {stack.compatibility.technicalRequirements.map((req, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                                                        <span className="text-blue-500">•</span> {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <SystemStrengths solutions={includedSolutions} />
                        
                        {stack.replaces.length > 0 && (
                             <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-center">
                                    <p className="text-lg font-semibold text-emerald-600">Save over ${totalSavings.toLocaleString()}/mo</p>
                                    <h2 className="text-2xl font-bold text-slate-800 mt-2">Kill the "Frankenstein" Stack</h2>
                                    <p className="mt-2 max-w-2xl mx-auto text-slate-500">
                                        Stop wasting time and money juggling a dozen disconnected tools. This system replaces your expensive, fragmented subscriptions and combines them into one seamless, branded experience for your clients.
                                    </p>
                                </div>
                                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {stack.replaces.map(tool => (
                                        <div key={tool.name} className="relative p-3 bg-slate-100 rounded-lg text-center overflow-hidden">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <svg className="w-full h-full text-red-400 opacity-50" viewBox="0 0 100 50">
                                                    <line x1="0" y1="50" x2="100" y2="0" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                            </div>
                                            <div className="relative">
                                                <p className="font-semibold text-slate-600">{tool.name}</p>
                                                <p className="text-xs text-slate-500">~${tool.estimatedCost}/mo</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-center mt-6 text-sm text-slate-500">
                                    Fewer logins, fewer bills, and less time spent on training and support.
                                </p>
                            </div>
                        )}
                    </div>

                    <aside className="space-y-8">
                        {/* NEW: The "Value Wrap" Bonus Section (Replaces the old list) */}
                        <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-orange-500/20 rounded-lg border border-orange-500/50">
                                        <GiftIcon />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Included Launch Kit</h3>
                                        <p className="text-xs text-orange-400 font-bold uppercase tracking-wider">Free with Trial • Valued at $1,497</p>
                                    </div>
                                </div>

                                {/* Dynamic Kit Preview Based on linkedKitId */}
                                {stack.linkedKitId && RESELL_KITS.find(k => k.id === stack.linkedKitId) ? (
                                    <>
                                        <div className="space-y-4">
                                            {RESELL_KITS.find(k => k.id === stack.linkedKitId)!.features.slice(0, 5).map((feature, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
                                                        <span className="text-sm font-medium text-slate-200">{feature}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl">
                                            <p className="text-sm text-slate-300 mb-3 text-center">Get the complete {RESELL_KITS.find(k => k.id === stack.linkedKitId)!.title}:</p>
                                            <button
                                                onClick={() => onNavigate('resellKits')}
                                                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all"
                                            >
                                                View Full Kit Details →
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-4">
                                            {[
                                                { title: 'The "Close-in-One-Call" Sales Script', type: 'PDF' },
                                                { title: 'White-Label Legal Contract Template', type: 'DOCX' },
                                                { title: 'Vendor Setup Wizard (DNS & Stripe)', type: 'Video' },
                                                { title: 'Pre-built Pricing Calculator', type: 'XLS' },
                                                { title: 'Cold Email Outreach Sequence', type: 'Swipe File' }
                                            ].map((bonus, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
                                                        <span className="text-sm font-medium text-slate-200">{bonus.title}</span>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">{bonus.type}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                                            <p className="text-sm text-slate-300 mb-2">How to get this kit:</p>
                                            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
                                                <span>1. Click Unlock</span>
                                                <span>→</span>
                                                <span>2. Start {includedSolutions[0]?.name} Trial</span>
                                                <span>→</span>
                                                <span>3. Instant Download</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                         <TripwireCard
                            subhead="Unsure about the monthly cost? Use our ROI Protocol to pre-sell this system to a client before you sign up."
                         />
                    </aside>
                </div>
                
                {/* Agency Reviews Section */}
                <div className="mt-12 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">Agency Reviews</h2>
                        <button
                            onClick={() => {
                                if (user) setIsReviewModalOpen(true);
                                else alert("Please log in to leave a review.");
                            }}
                            className="text-sm font-bold text-primary-600 hover:text-primary-700"
                        >
                            + Leave a Review
                        </button>
                    </div>

                    <div className="space-y-6">
                        {reviews.length > 0 ? reviews.map((review, i) => (
                            <div key={i} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, j) => (
                                            <svg key={j} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={j < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className={j < review.rating ? "" : "text-slate-300"}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        ))}
                                    </div>
                                    <span className="text-xs text-slate-400">{new Date(review.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="text-slate-600 italic">"{review.comment}"</p>
                            </div>
                        )) : (
                            <p className="text-slate-500 text-center italic py-4">No reviews yet. Be the first to review this stack!</p>
                        )}
                    </div>
                </div>

                <div className="mt-12">
                    <AiPoweredProfitCalculator estimates={profitEstimates} nicheTitle={stack.name} isAiLoading={isAiEstimating} />
                </div>
            </div>

            {/* Review Modal */}
            {isReviewModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl animate-fade-in-up">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Rate this Stack</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                                        className={`p-1 transition-colors ${star <= newReview.rating ? 'text-yellow-400' : 'text-slate-300'}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Review</label>
                            <textarea
                                className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none h-32"
                                placeholder="Share your experience..."
                                value={newReview.comment}
                                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setIsReviewModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold hover:text-slate-700">Cancel</button>
                            <button onClick={handleSubmitReview} className="px-4 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700">Submit Review</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};
