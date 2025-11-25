
import React, { useState } from 'react';
import { MEMBERSHIP_TIERS } from './constants';
import { createCheckoutSession } from './stripeService';
import { useAuth } from './AuthProvider';

// Icons
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><polyline points="20 6 9 17 4 12"/></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;

export const MembershipPage = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (tierName: string, price: string) => {
        if (!user) {
            alert("Please log in to subscribe.");
            return;
        }

        setLoading(tierName);
        try {
            const priceId = `price_${tierName.replace(/\s+/g, '_').toLowerCase()}`; // Mock Price ID
            const { url } = await createCheckoutSession(priceId, 'subscription');
            if (url) {
                window.location.href = url;
            }
        } catch (error) {
            console.error(error);
            alert("Failed to initiate checkout.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <main className="flex-grow bg-gray-950 min-h-screen">
            {/* Hero */}
            <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-800">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-primary-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
                        The Inner Circle
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
                        Access the live library of proven stacks, Resell Kits, and benchmarks that top agencies use to grow without hiring.
                    </p>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {MEMBERSHIP_TIERS.map((tier) => (
                        <div key={tier.name} className={`relative rounded-3xl p-8 border flex flex-col h-full ${tier.highlight ? 'bg-slate-900 border-primary-500 shadow-2xl shadow-primary-900/20 scale-105 z-10' : 'bg-slate-900/50 border-slate-800'}`}>
                            {tier.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                    Most Popular
                                </div>
                            )}
                            
                            <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                            <p className="text-slate-400 mb-6 h-12">{tier.description}</p>
                            
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-5xl font-extrabold text-white">{tier.price}</span>
                                <span className="text-lg text-slate-500 font-medium">{tier.period}</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300">
                                        <div className="mt-1 flex-shrink-0"><CheckIcon /></div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSubscribe(tier.name, tier.price)}
                                disabled={loading === tier.name}
                                className={`w-full py-4 font-bold rounded-xl transition-all shadow-lg ${tier.highlight ? 'bg-primary-600 text-white hover:bg-primary-500' : 'bg-white text-slate-900 hover:bg-slate-200'} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loading === tier.name ? 'Processing...' : tier.cta}
                            </button>

                            {(tier.highlight || tier.name === 'Agency Builder') && (
                                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-950/30 py-2 px-3 rounded-lg border border-emerald-900/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    30-Day "First Client" Guarantee. Land a client or we refund you.
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Community Teaser */}
            <section className="py-20 bg-slate-900 border-t border-slate-800 text-center px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700 text-primary-500">
                        <UsersIcon />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Join 1,400+ Smart Agency Owners</h2>
                    <p className="text-slate-400 mb-8">
                        Stop guessing. See exactly what stacks are working right now. Get answers to your vendor questions in minutes, not days.
                    </p>
                </div>
            </section>
        </main>
    );
};
