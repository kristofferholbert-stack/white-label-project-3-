import React, { useState, useEffect } from 'react';
import type { Page } from '../types/types';
import { SEARCH_PAGE_INSPIRATIONS, BUSINESS_IN_A_BOX_INSPIRATIONS, ENHANCED_INSPIRATIONS, CURATED_STACKS } from '../constants/constants';
import { RevenueGoalModal } from '../components/RevenueGoalModal';
import { BlueprintLoader } from '../components/BlueprintLoader';

interface HomePageProps {
  onNavigate: (page: Page, context?: any) => void;
  onSelectInspiration: (goal: string) => void;
}

// Icons for the "How It Works" section
const RocketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1s.38 2.38-.62 4z"/><path d="M12 15v5s3.03-.55 4-2c1.1-1.62 1-4 1-4s-2.38-.38-4 .62z"/></svg>;
const FingerprintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2"/></svg>;
const BanknoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>;
const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

// Dummy logos for the ticker
const PartnerLogos = () => (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {['Stripe', 'ActiveCampaign', 'Semrush', 'Salesforce', 'HubSpot', 'Shopify', 'Mailchimp', 'Zendesk'].map((logo, i) => (
                <li key={i} className="text-xl font-bold text-slate-600 opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300 cursor-default">
                    {logo}
                </li>
            ))}
        </ul>
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
             {['Stripe', 'ActiveCampaign', 'Semrush', 'Salesforce', 'HubSpot', 'Shopify', 'Mailchimp', 'Zendesk'].map((logo, i) => (
                <li key={i} className="text-xl font-bold text-slate-600 opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300 cursor-default">
                    {logo}
                </li>
            ))}
        </ul>
    </div>
);

const carouselStacks = [
    {
        name: 'The 24/7 AI Workforce',
        cost: '$29/mo + usage',
        resell: 'Sell for $497/mo + markup',
        profit: '$400+/mo profit per client',
        image: 'http://whitelabelwonder.com/wp-content/uploads/2025/11/AI-247-workforce-1.jpg',
        color: 'border-purple-500/50 shadow-purple-500/20'
    },
    {
        name: 'The "GHL Killer" Stack',
        cost: '$497/mo cost',
        resell: 'Sell for $2,997+/mo',
        profit: '80% Net Margins',
        image: 'http://whitelabelwonder.com/wp-content/uploads/2025/11/The-GHL-Killer-Stack.jpg',
        color: 'border-orange-500/50 shadow-orange-500/20'
    },
    {
        name: 'Social Media Autopilot',
        cost: '$397/mo cost',
        resell: 'Sell for $2,500/mo',
        profit: '$2,100/mo profit per client',
        image: 'http://whitelabelwonder.com/wp-content/uploads/2025/11/Social-Media-Stack.jpg',
        color: 'border-pink-500/50 shadow-pink-500/20'
    },
    {
        name: 'The Local SEO Dominator',
        cost: '$497/mo cost',
        resell: 'Sell for $1,997 - $3,500/mo',
        profit: '$2,500/mo profit per client',
        image: 'http://whitelabelwonder.com/wp-content/uploads/2025/11/SEO-Dominator.jpg',
        color: 'border-emerald-500/50 shadow-emerald-500/20'
    },
    {
        name: 'High-Converting Web Design & Hosting',
        cost: '$297/mo cost',
        resell: 'Sell for $2,500 + $397/mo',
        profit: '$2,500+ profit per client',
        image: 'http://whitelabelwonder.com/wp-content/uploads/2025/11/High-Converting-Web-Design-Hosting.jpg',
        color: 'border-cyan-500/50 shadow-cyan-500/20'
    },
    {
        name: 'Google Ads + Reputation',
        cost: '$892/mo cost',
        resell: 'Sell for $4,500+/mo',
        profit: '$3,600/mo profit per client',
        image: 'http://whitelabelwonder.com/wp-content/uploads/2025/11/Google-Ads-Reputation.jpg',
        color: 'border-sky-500/50 shadow-sky-500/20'
    }
];

const mrrGoalCards = [
    {
        badge: 'Most Popular',
        badgeColor: 'bg-emerald-500',
        title: '$10k–$20k MRR',
        subtitle: 'in 90 Days',
        stack: 'The Local SEO + Reputation Stack',
        description: 'Perfect for agencies serving brick & mortar. Automate reviews and rankings.',
        charge: '$2,500–$4,000/mo per client',
        buttonText: 'View Full Stack'
    },
    {
        badge: 'Fastest Growing',
        badgeColor: 'bg-blue-500',
        title: '$25k–$50k MRR',
        subtitle: 'in 90 Days',
        stack: 'The Google Ads + Call Tracking Stack',
        description: 'High ticket, high retention. Prove ROI instantly with call recording.',
        charge: '$4,500–$9,000/mo per client',
        buttonText: 'View Full Stack'
    },
    {
        badge: 'Highest Margin',
        badgeColor: 'bg-orange-500',
        title: '$50k+ MRR',
        subtitle: 'Enterprise Scale',
        stack: 'The Complete All-in-One Stack',
        description: 'Replace GoHighLevel. Own the entire platform, keep 100% of the client.',
        charge: '70–80% Net Margins',
        buttonText: 'View Full Stack'
    }
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectInspiration }) => {
    const [currentStackIndex, setCurrentStackIndex] = useState(0);
    const [isStickyVisible, setIsStickyVisible] = useState(false);

    // New State for Modal Flow
    const [revenueModalOpen, setRevenueModalOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<{title: string, amount: number, stackId: string} | null>(null);
    const [isBuildingBlueprint, setIsBuildingBlueprint] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStackIndex(prevIndex => (prevIndex + 1) % carouselStacks.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
             const mrrSection = document.getElementById('mrr-goals');
             if (mrrSection && window.scrollY > mrrSection.offsetTop - 100) {
                 setIsStickyVisible(true);
             } else {
                 setIsStickyVisible(false);
             }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleGoalClick = (goal: any) => {
        // Map card title to numeric amount and stack ID
        const amount = goal.title.includes('10k') ? 10000 : goal.title.includes('25k') ? 25000 : 50000;

        // Simple mapping logic (ensure these IDs exist in CURATED_STACKS)
        const stackId = amount === 10000 ? 'stack-invisible-seo' : amount === 25000 ? 'stack-reactivation' : 'stack-ecom-retention';

        setSelectedGoal({ title: goal.title, amount, stackId });
        setRevenueModalOpen(true);
    };

    const handleRevenueContinue = (stackId: string) => {
        setRevenueModalOpen(false);
        // Trigger the Blueprint Loader animation we built earlier

        // Find stack object
        const targetStack = CURATED_STACKS.find(s => s.id === stackId);
        if (targetStack) {
            setIsBuildingBlueprint(true);
            setTimeout(() => {
                setIsBuildingBlueprint(false);
                onNavigate('systemDetail', { stack: targetStack });
            }, 2500);
        } else {
             onNavigate('stacks');
        }
    };

    return (
        <main className="flex-grow bg-gray-950 overflow-hidden relative">
            {isBuildingBlueprint && <BlueprintLoader />}

            {isStickyVisible && (
                <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b border-slate-700 shadow-2xl animate-fade-in-down">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-sm font-medium text-slate-300 text-center sm:text-left">
                            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
                            <span className="font-bold text-white">1,400+ agencies</span> are scaling with these stacks right now. You’re leaving $10k–$50k on the table every month you wait.
                        </p>
                        <button
                            onClick={() => onNavigate('stacks')}
                            className="bg-orange-gradient text-white font-bold py-2 px-6 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-orange-900/20 text-sm whitespace-nowrap"
                        >
                            Unlock All Stacks (Today)
                        </button>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8">
                 {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] bg-primary-600/10 rounded-full blur-[120px] -z-10 opacity-50 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[60%_40%] gap-16 items-center">
                    <div className="lg:text-left text-center z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-bold text-primary-300 uppercase tracking-wider mb-6 animate-fade-in-up">
                            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
                            Join: 1,412 Active Agencies
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tighter leading-[1.1] mb-6 animate-fade-in-up [animation-delay:100ms]">
                            Scale your agency, <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">without scaling your team.</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-8 animate-fade-in-up [animation-delay:200ms] leading-relaxed">
                            Get the exact white-label stack to add your next <span className="text-transparent bg-clip-text bg-orange-gradient font-bold">$10k–$50k MRR This Quarter.</span> Instantly launch proven, white-label SEO, PPC, & AI services under your brand. <span className="text-white font-semibold">Zero hiring. Zero fulfillment headaches.</span>
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up [animation-delay:300ms]">
                            <button
                                onClick={() => onNavigate('intake')}
                                className="w-full sm:w-auto bg-orange-gradient text-white font-bold py-4 px-8 rounded-xl hover:scale-105 transition-all duration-200 shadow-xl shadow-orange-900/20 text-lg flex items-center justify-center"
                            >
                                Take the 2-Min Agency IQ Quiz
                            </button>
                            <button
                                onClick={() => onNavigate('marketplace')}
                                className="w-full sm:w-auto bg-slate-800 border-2 border-slate-700 text-white font-bold py-4 px-8 rounded-xl hover:border-primary-500 transition-all text-lg"
                            >
                                Browse Marketplace
                            </button>
                        </div>
                        
                        <p className="mt-6 text-sm text-slate-500 animate-fade-in-up [animation-delay:400ms]">
                            Trust Bar: Already used by 1,400+ agencies | $187M+ resold
                        </p>
                    </div>

                    {/* 3D Carousel */}
                    <div className="relative h-[28rem] w-full max-w-md mx-auto lg:max-w-full perspective-1000 animate-fade-in-up [animation-delay:300ms]">
                        {carouselStacks.map((stack, index) => {
                            // Calculate position for stacking effect
                            const offset = (index - currentStackIndex + carouselStacks.length) % carouselStacks.length;
                            const isFront = offset === 0;
                            const isSecond = offset === 1;
                            const isLast = offset === carouselStacks.length - 1;

                            let transform = 'translateY(0) scale(0.9) opacity(0)';
                            let zIndex = 0;
                            
                            if (isFront) {
                                transform = 'translateY(0) scale(1) opacity(1)';
                                zIndex = 30;
                            } else if (isSecond) {
                                transform = 'translateY(20px) translateX(20px) scale(0.95) opacity(0.6)';
                                zIndex = 20;
                            } else if (isLast) {
                                transform = 'translateY(40px) translateX(40px) scale(0.9) opacity(0.3)';
                                zIndex = 10;
                            }

                            return (
                                <div
                                    key={stack.name}
                                    className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-out ${isFront ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                    style={{ transform, zIndex }}
                                >
                                    <div className={`h-full bg-slate-800 border ${isFront ? stack.color : 'border-slate-700'} rounded-3xl p-2 shadow-2xl overflow-hidden flex flex-col`}>
                                        <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-slate-900">
                                            <img src={stack.image} alt={stack.name} className="w-full h-full object-cover opacity-90" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <div className="inline-block px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-xs font-bold text-white border border-white/10">
                                                    🔥 Trending Now
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col justify-center">
                                            <h3 className="text-2xl font-bold text-white mb-2">{stack.name}</h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-400">Cost to you</span>
                                                    <span className="text-slate-200 font-medium">{stack.cost}</span>
                                                </div>
                                                 <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-400">Resell price</span>
                                                    <span className="text-emerald-400 font-bold">{stack.resell}</span>
                                                </div>
                                                <div className="pt-4 mt-2 border-t border-slate-700/50">
                                                    <p className="text-center text-sm font-bold text-white">{stack.profit}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Trust Ticker */}
            <div className="py-10 border-y border-slate-800/50 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm font-semibold text-slate-500 mb-6 uppercase tracking-widest">Powering the next generation of agencies with</p>
                    <PartnerLogos />
                </div>
            </div>

            {/* How It Works Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
                 <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">How it works</h2>
                        <p className="mt-4 text-lg text-slate-400">Three steps, each simple.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-slate-800 via-primary-900 to-slate-800 z-0"></div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center mb-6 group-hover:border-primary-500/50 group-hover:scale-110 transition-all duration-300 shadow-xl">
                                <RocketIcon />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">1. Tell us your niche and goals</h3>
                            <p className="text-slate-400 text-sm leading-relaxed px-4">Answer a 2–3 minute intake on your agency model, monthly retainers, and what you want to sell (SEO, PPC, CRM, etc.).</p>
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center mb-6 group-hover:border-primary-500/50 group-hover:scale-110 transition-all duration-300 shadow-xl">
                                <FingerprintIcon />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">2. We design your $10k MRR stack</h3>
                            <p className="text-slate-400 text-sm leading-relaxed px-4">We recommend 4–6 plug‑and‑play services, each with vetted white‑label partners, margins, and Resell Kits you can slap your logo on.</p>
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center group">
                             <div className="w-24 h-24 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center mb-6 group-hover:border-primary-500/50 group-hover:scale-110 transition-all duration-300 shadow-xl">
                                <BanknoteIcon />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">3. Start selling this week</h3>
                            <p className="text-slate-400 text-sm leading-relaxed px-4">Use our service descriptions, proposals, and scripts to pitch clients. Fulfilment happens behind the scenes under your brand.</p>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <button
                            onClick={() => onNavigate('intake')}
                            className="bg-orange-gradient text-white font-bold py-4 px-10 rounded-xl hover:brightness-110 transition-all shadow-lg text-lg"
                        >
                            Take the Agency IQ Quiz &rarr;
                        </button>
                    </div>
                 </div>
            </section>

            {/* MRR Goals Section */}
            <section id="mrr-goals" className="py-24 bg-slate-900 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-center mb-16">
                        Choose your revenue goal <br/> for the next 90 days
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {mrrGoalCards.map((card, i) => (
                            <div 
                                key={card.title} 
                                className="bg-slate-800 rounded-2xl border border-slate-700 p-1 flex flex-col hover:border-primary-500/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="bg-slate-900 rounded-xl p-8 h-full flex flex-col relative overflow-hidden">
                                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                                     </div>

                                    <div className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider mb-6 ${card.badgeColor} shadow-lg`}>
                                        {card.badge}
                                    </div>
                                    
                                    <h3 className="text-3xl font-extrabold text-white mb-1">{card.title}</h3>
                                    <p className="text-sm font-bold text-primary-500 mb-6 uppercase tracking-wide">{card.subtitle}</p>
                                    
                                    <div className="mb-6">
                                        <p className="text-lg font-bold text-slate-200">{card.stack}</p>
                                        <p className="text-sm text-slate-400 mt-2 leading-relaxed">{card.description}</p>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-slate-800">
                                        <p className="text-sm text-slate-300 font-medium mb-4">{card.charge}</p>
                                        <button
                                            onClick={() => handleGoalClick(card)}
                                            className="w-full py-3 rounded-lg bg-slate-800 border border-slate-600 text-white font-bold hover:bg-primary-600 hover:border-primary-500 transition-all group-hover:shadow-lg"
                                        >
                                            {card.buttonText} &rarr;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* REPLACED INSPIRATION SECTION */}
            <section className="py-24 bg-gray-950 relative overflow-hidden border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-bold text-primary-400 uppercase tracking-wider mb-4">
                                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                                Opportunity Radar
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Models Working <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">Right Now</span>
                            </h2>
                            <p className="mt-4 text-lg text-slate-400">
                                Don't guess. These business models are generating the highest agency margins in Q4.
                            </p>
                        </div>
                        <button
                            onClick={() => onNavigate('inspirations')}
                            className="group flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold hover:bg-slate-700 hover:border-slate-600 transition-all shadow-lg"
                        >
                            Explore Full Library <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* BENTO GRID LAYOUT */}
                    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[180px] gap-4">
                        {ENHANCED_INSPIRATIONS.slice(0, 6).map((item, i) => (
                            <button
                                key={item.id}
                                onClick={() => onSelectInspiration(item.prompt)}
                                className={`group relative rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-left hover:border-primary-500/30 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                                    i === 0 || i === 3 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'
                                }`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative z-10 w-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide border ${item.trending ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                                            {item.trending ? '🔥 Trending' : item.category}
                                        </div>
                                        {(i === 0 || i === 3) && (
                                            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">
                                                {item.potential}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className={`font-bold text-white mb-2 group-hover:text-primary-300 transition-colors ${(i === 0 || i === 3) ? 'text-3xl' : 'text-lg'}`}>
                                        {item.title}
                                    </h3>
                                    <p className={`text-slate-400 leading-relaxed ${(i === 0 || i === 3) ? 'text-base line-clamp-3' : 'text-xs line-clamp-2'}`}>
                                        {item.description}
                                    </p>
                                </div>

                                <div className="relative z-10 mt-4 flex items-center gap-2 text-xs font-bold text-primary-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    Launch Model <ArrowRightIcon className="w-3 h-3" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-r from-orange-500/20 to-primary-600/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
                 <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-8">
                        Stop Researching. Start Selling.
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                        Join 1,400+ agencies who have added a scalable, white-label revenue stream. It takes 5 minutes to find your perfect stack.
                    </p>
                    <button
                        onClick={() => onNavigate('stacks')}
                        className="bg-orange-gradient text-white font-bold py-5 px-12 rounded-xl hover:scale-105 transition-transform shadow-2xl text-xl"
                    >
                        View The Stacks &rarr;
                    </button>
                 </div>
            </section>

            <RevenueGoalModal
                isOpen={revenueModalOpen}
                onClose={() => setRevenueModalOpen(false)}
                goal={selectedGoal || {title: '', amount: 0, stackId: ''}}
                onContinue={handleRevenueContinue}
            />
        </main>
    );
};
