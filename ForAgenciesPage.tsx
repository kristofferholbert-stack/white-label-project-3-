
import React, { useState, useEffect } from 'react';
import type { Priorities, ProfitabilityEstimates } from '../types';
import { getNicheProfitabilityEstimates } from '../services/geminiService';


// Icons
const LoadingSpinner = () => (
    <svg className="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
const ApiLoadingSpinner = () => (
     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
const XCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;

const MoneyBagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

interface ForAgenciesPageProps {
  onStartSearch: (goal: string, priorities: Priorities) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AiPoweredProfitCalculator: React.FC<{ estimates: ProfitabilityEstimates }> = ({ estimates }) => {
    const [clients, setClients] = useState(20);
    const [price, setPrice] = useState(estimates.averageClientPrice);
    const [margin, setMargin] = useState(estimates.typicalAgencyMargin);

    useEffect(() => {
        setPrice(estimates.averageClientPrice);
        setMargin(estimates.typicalAgencyMargin);
    }, [estimates]);

    const profit = Math.round(clients * price * (margin / 100));

    return (
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl shadow-primary-500/10 relative mb-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg border border-primary-500/50">
                AI-Powered Estimates
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <label className="flex justify-between items-center text-sm font-bold text-slate-300 mb-2">
                            <span>Active Clients</span>
                            <div className="relative">
                                <input type="number" value={clients} onChange={e => setClients(Number(e.target.value))} className="w-20 p-1 text-right bg-slate-800 border border-slate-700 text-white rounded-md focus:border-primary-500 outline-none font-mono" />
                            </div>
                        </label>
                        <input type="range" min="1" max="200" value={clients} onChange={e => setClients(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                    </div>
                    <div>
                        <label className="flex justify-between items-center text-sm font-bold text-slate-300 mb-2">
                            <span>Price per Client ($)</span>
                             <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-20 p-1 text-right bg-slate-800 border border-slate-700 text-white rounded-md focus:border-primary-500 outline-none font-mono" />
                        </label>
                        <input type="range" min="19" max="499" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                    </div>
                     <div>
                        <label className="flex justify-between items-center text-sm font-bold text-slate-300 mb-2">
                            <span>Your Margin (%)</span>
                            <span className="font-mono text-primary-400">{margin}%</span>
                        </label>
                        <input type="range" min="10" max="80" value={margin} onChange={e => setMargin(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                    </div>
                </div>
                <div className="text-center bg-slate-950/50 p-8 rounded-xl border border-slate-800 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
                    <p className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-1">Your Potential</p>
                    <p className="text-5xl font-extrabold text-white tracking-tight my-3 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">${profit.toLocaleString()}</p>
                    <p className="text-sm font-bold text-emerald-400">Monthly Profit</p>
                </div>
            </div>
        </div>
    );
};

const nicheOptions = [
    { title: "Marketing for Local Biz", description: "Help local businesses with social media, reviews, and SEO.", goal: "I want to offer a suite of marketing tools (social media, reviews, SEO) for local businesses." },
    { title: "Tools for Creators", description: "Provide scheduling, link-in-bio, and monetization tools.", goal: "I want to offer a platform for creators with tools for scheduling and monetization." },
    { title: "E-commerce Solutions", description: "Resell platforms for online store building and management.", goal: "I want to resell an e-commerce platform for small to medium-sized businesses." },
    { title: "Fintech for Startups", description: "Offer payment processing and banking solutions.", goal: "I want to provide white-label payment processing and banking for startups." },
    { title: "SaaS for Real Estate", description: "Provide CRM and marketing tools for real estate agents.", goal: "I want to offer a white-label CRM and marketing platform for real estate agents." },
    { title: "Wellness & Fitness Apps", description: "Resell coaching, scheduling, and community apps.", goal: "I want to resell a white-label app for fitness coaches to manage their clients." },
];

const PrioritySlider: React.FC<{
  label: string;
  lowLabel: string;
  highLabel: string;
  value: number;
  onChange: (value: number) => void;
  description: string;
}> = ({ label, lowLabel, highLabel, value, onChange, description }) => {
    const getLabelForValue = () => {
        if (value < 15) return lowLabel; if (value > 85) return highLabel; if (value > 40 && value < 60) return "Balanced"; return null;
    }
    const valueLabel = getLabelForValue();
    return (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-center">
                <label className="text-lg font-bold text-white">{label}</label>
                {valueLabel && <span className="px-3 py-1 text-xs font-bold text-primary-300 bg-primary-500/10 border border-primary-500/20 rounded-full uppercase tracking-wide">{valueLabel}</span>}
            </div>
            <p className="text-sm text-slate-400 mt-1 mb-6">{description}</p>
            <div className="relative">
                <input type="range" min="0" max="100" value={value} onChange={(e) => onChange(parseInt(e.target.value, 10))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-3 uppercase tracking-wide">
                <span className="text-left w-1/3">{lowLabel}</span>
                <span className="text-right w-1/3">{highLabel}</span>
            </div>
        </div>
    );
};


export const ForAgenciesPage: React.FC<ForAgenciesPageProps> = ({ onStartSearch, isLoading, error }) => {
    const [wizardStep, setWizardStep] = useState(1);
    const [selectedGoal, setSelectedGoal] = useState('');
    const [selectedNicheTitle, setSelectedNicheTitle] = useState('');
    const [priorities, setPriorities] = useState<Priorities>({ marginVsCost: 75, speedVsCustomization: 25, easeVsPower: 50 });
    const [profitabilityEstimates, setProfitabilityEstimates] = useState<ProfitabilityEstimates | null>(null);
    const [isEstimating, setIsEstimating] = useState(false);
    const [estimationError, setEstimationError] = useState<string | null>(null);

    const handleNicheSelect = async (niche: {title: string, goal: string}) => {
        setSelectedGoal(niche.goal);
        setSelectedNicheTitle(niche.title);
        setIsEstimating(true);
        setEstimationError(null);
        setProfitabilityEstimates(null);
        setWizardStep(2); // Go directly to step 2

        try {
            const estimates = await getNicheProfitabilityEstimates(niche.title);
            setProfitabilityEstimates(estimates);
        } catch (err) {
            setEstimationError("Sorry, we couldn't generate a forecast for this niche. Using default values.");
            setProfitabilityEstimates({ averageClientPrice: 99, typicalAgencyMargin: 40 });
        } finally {
            setIsEstimating(false);
        }
    };

    const handlePrioritiesSubmit = (submittedPriorities: Priorities) => {
        onStartSearch(selectedGoal, submittedPriorities);
    };
    
    const renderWizardContent = () => {
        switch (wizardStep) {
            case 1:
                return (
                    <div className="animate-fade-in-up">
                        <h3 className="text-xl font-bold text-white text-center mb-8">Step 1: What kind of clients do you serve?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {nicheOptions.map(niche => (
                                <button 
                                    key={niche.title} 
                                    onClick={() => handleNicheSelect(niche)} 
                                    className="text-left p-6 border border-slate-700 rounded-xl bg-slate-800/50 hover:bg-slate-800 hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-200 group"
                                >
                                    <h4 className="font-bold text-white group-hover:text-primary-400 transition-colors">{niche.title}</h4>
                                    <p className="text-sm text-slate-400 mt-2 group-hover:text-slate-300">{niche.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="animate-fade-in-up">
                        <h3 className="text-xl font-bold text-white text-center mb-2">Step 2: Explore Profitability & Define Your Model</h3>
                        <p className="text-center text-slate-400 mb-8 text-sm">Based on your choice of <span className="font-semibold text-white">"{selectedNicheTitle}"</span>.</p>
                        
                        {isEstimating && (
                            <div className="flex flex-col items-center justify-center my-12">
                                <LoadingSpinner />
                                <p className="text-slate-500 text-sm mt-4 animate-pulse">Analyzing market rates...</p>
                            </div>
                        )}
                        {estimationError && <div className="my-4 text-center text-red-400 bg-red-500/10 p-4 rounded-md">{estimationError}</div>}
                        
                        {profitabilityEstimates && !isEstimating && (
                            <AiPoweredProfitCalculator estimates={profitabilityEstimates} />
                        )}

                        {!isEstimating && (
                            <>
                                <div className="space-y-6">
                                    <PrioritySlider label="Profit Strategy" lowLabel="Volume & Affordability" highLabel="High-Ticket & High-Margin" value={priorities.marginVsCost} onChange={(v) => setPriorities(p => ({...p, marginVsCost: v}))} description="Focus on a high volume of low-cost subscriptions or a smaller number of high-value clients?" />
                                    <PrioritySlider label="Launch Speed" lowLabel="Launch This Week" highLabel="Build a Custom Experience" value={priorities.speedVsCustomization} onChange={(v) => setPriorities(p => ({...p, speedVsCustomization: v}))} description="Do you want a turnkey solution ready to go, or something you can customize deeply over time?" />
                                </div>
                                
                                <div className="mt-10 flex justify-between items-center pt-6 border-t border-slate-800">
                                    <button onClick={() => setWizardStep(1)} className="text-slate-400 font-bold text-sm hover:text-white transition-colors">Back</button>
                                    <button onClick={() => handlePrioritiesSubmit(priorities)} disabled={isLoading} className="inline-flex items-center bg-orange-gradient text-white font-bold py-3 px-8 rounded-xl hover:brightness-110 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                        {isLoading && <ApiLoadingSpinner />}
                                        {isLoading ? 'Scanning Database...' : 'Find My Opportunities'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                );
        }
    };


    return (
        <main className="flex-grow bg-gray-950 min-h-screen">
            {/* Hero: The Hard Truth */}
            <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-block mb-6 px-4 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-xs uppercase tracking-widest">
                        Warning: Hard Truth Ahead
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-8">
                        Your Clients Are Cheating on You <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">With Software Vendors.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        You do the strategy. You do the work. But they pay <strong>HubSpot, Calendly, and Mailchimp</strong> every month without complaining.
                        <br/><br/>
                        It's time to stop being the "Service Provider" and start being the <strong>Platform</strong>.
                    </p>
                </div>
            </section>

            {/* The "Service vs Software" Comparison Table */}
            <section className="py-20 px-4 bg-slate-900">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">

                        {/* The Service Side (Pain) */}
                        <div className="bg-slate-950 p-10 border-b md:border-b-0 md:border-r border-slate-800 relative">
                            <div className="absolute top-4 left-4 text-xs font-bold text-slate-500 uppercase">The Old Way</div>
                            <h3 className="text-3xl font-bold text-slate-400 mb-8">Selling Services</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <ClockIcon />
                                    <div>
                                        <p className="font-bold text-slate-300">Trading Time for Money</p>
                                        <p className="text-sm text-slate-500">You only get paid when you work. If you stop, revenue stops.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="p-1 bg-red-500/10 rounded"><svg width="16" height="16" fill="none" className="text-red-500"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/></svg></div>
                                    <div>
                                        <p className="font-bold text-slate-300">50% Gross Margins</p>
                                        <p className="text-sm text-slate-500">Labor costs eat your profit. Hiring is a nightmare.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="p-1 bg-red-500/10 rounded"><svg width="16" height="16" fill="none" className="text-red-500"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/></svg></div>
                                    <div>
                                        <p className="font-bold text-slate-300">3x Valuation</p>
                                        <p className="text-sm text-slate-500">Service businesses are hard to sell.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* The Software Side (Pleasure) */}
                        <div className="bg-slate-900 p-10 relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                            <div className="absolute top-4 left-4 text-xs font-bold text-emerald-500 uppercase">The New Way</div>
                            <h3 className="text-3xl font-bold text-white mb-8">Reselling Software</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <MoneyBagIcon />
                                    <div>
                                        <p className="font-bold text-white">Recurring Revenue (MRR)</p>
                                        <p className="text-sm text-slate-400">You get paid while you sleep. Software doesn't call in sick.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <CheckCircleIcon />
                                    <div>
                                        <p className="font-bold text-white">80-90% Gross Margins</p>
                                        <p className="text-sm text-slate-400">Buy at wholesale, sell at retail. Zero labor cost.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <LockIcon />
                                    <div>
                                        <p className="font-bold text-white">10x Valuation</p>
                                        <p className="text-sm text-slate-400">SaaS revenue is the most valuable asset on earth.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Re-insert the Calculator Section Here (Keep existing code) */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
               <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-2 relative z-10">
                        <div className="bg-slate-950/50 rounded-2xl p-8 sm:p-12 border border-slate-800/50">
                             <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-bold text-primary-400 uppercase tracking-wider mb-4">
                                    Interactive Tool
                                </div>
                                <h2 className="text-3xl font-extrabold text-white tracking-tight">The Growth Engine Finder</h2>
                                <p className="mt-2 text-slate-400">Answer 2 questions to find your perfect reseller match.</p>
                            </div>
                            {renderWizardContent()}
                            {error && <div className="mt-4 text-center text-red-400 bg-red-500/10 p-4 rounded-md flex items-center justify-center gap-2"><XCircleIcon/> {error}</div>}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 text-center bg-slate-950 border-t border-slate-800">
                <h2 className="text-3xl font-extrabold text-white mb-8">Don't build it from scratch.</h2>
                <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
                    We have vetted the partners. We have negotiated the rates. We built the sales decks.
                </p>
                <button
                    onClick={() => onStartSearch(selectedGoal, priorities)} // Reusing the handler
                    className="bg-orange-gradient text-white font-bold py-4 px-10 rounded-xl hover:scale-105 transition-transform shadow-2xl shadow-orange-900/30 text-lg"
                >
                    Find My Revenue Stack
                </button>
            </section>
        </main>
    );
};
