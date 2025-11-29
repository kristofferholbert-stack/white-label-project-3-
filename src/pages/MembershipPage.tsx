import React, { useState, useEffect } from 'react';
import { createCheckoutSession } from '../services/stripeService';
import { useAuth } from '../context/AuthProvider';

// Icons
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const CrownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-200"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>;
const FlameIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-orange-500 animate-pulse"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.1.2-2.2.5-3.27.5 1 1.63 2.18 2.5 3.27z"/></svg>;

export const MembershipPage = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState<string | null>(null);
    const [spotsLeft, setSpotsLeft] = useState(14);

    useEffect(() => {
        const interval = setInterval(() => {
            setSpotsLeft(prev => (prev > 3 ? prev - 1 : 3));
        }, 45000);
        return () => clearInterval(interval);
    }, []);

    const handleSubscribe = async (tierId: string) => {
        if (!user) {
            window.location.hash = '#login';
            return;
        }

        setLoading(tierId);
        try {
            const mode = tierId === 'lifetime' ? 'payment' : 'subscription';
            const { url } = await createCheckoutSession(tierId, mode);
            if (url) window.location.href = url;
        } catch (error) {
            console.error(error);
            alert("Failed to initiate checkout.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <main className="flex-grow bg-gray-950 min-h-screen relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80rem] h-[40rem] bg-primary-600/10 rounded-full blur-[120px] -z-10"></div>

            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 px-4 text-center text-sm font-bold shadow-lg relative z-50">
                <span className="animate-pulse mr-2">🔴</span>
                BLACK FRIDAY EARLY ACCESS: Lifetime Deal closing soon. Only {spotsLeft} spots remaining at this price.
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-slate-300 mb-6">
                        <StarIcon /> Join 1,400+ Agencies Scaling Faster
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                        Stop Renting Your Success. <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Own The System.</span>
                    </h1>
                    <p className="text-xl text-slate-400">
                        Get the wholesale connections, the copy-paste playbooks, and the profit calculators that turn "freelancers" into "founders."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">

                    <div className="order-2 md:order-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 relative backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-slate-300 mb-2">The Monthly Pass</h3>
                        <p className="text-slate-500 text-sm mb-6 h-10">For agencies testing the waters.</p>

                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-white">$19.99</span>
                            <span className="text-slate-500">/mo</span>
                        </div>

                        <button
                            onClick={() => handleSubscribe('price_monthly')}
                            disabled={!!loading}
                            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700"
                        >
                            {loading === 'price_monthly' ? 'Processing...' : 'Start Monthly'}
                        </button>

                        <div className="mt-8 space-y-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">What's Included:</p>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex gap-3"><CheckIcon /> Access to Marketplace</li>
                                <li className="flex gap-3"><CheckIcon /> Wholesale Vendor Rates</li>
                                <li className="flex gap-3"><CheckIcon /> Profit Calculators</li>
                                <li className="flex gap-3 opacity-75">
                                    <div className="mt-0.5"><LockIcon /></div>
                                    <span>Resell Kits (1 per month - Drip Fed)</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="order-1 md:order-2 bg-slate-900 border-2 border-orange-500 rounded-3xl p-8 relative shadow-2xl shadow-orange-500/20 transform md:-translate-y-4 z-10 overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-600"></div>
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-600 to-red-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                            <FlameIcon /> Best Value
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">Lifetime Founder</h3>
                        <p className="text-orange-200/80 text-sm mb-6 h-10">Never pay a monthly fee again. Own everything.</p>

                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-5xl font-black text-white">$249</span>
                            <span className="text-lg text-slate-400 line-through font-medium">$1,200/yr</span>
                        </div>
                        <p className="text-xs text-emerald-400 font-bold mb-6">ONE-TIME PAYMENT • NO RECURRING FEES</p>

                        <div className="mb-6">
                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                                <span>Claimed: {100 - spotsLeft}/100</span>
                                <span className="text-orange-500">{spotsLeft} left</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                <div className="bg-gradient-to-r from-orange-500 to-red-600 h-full rounded-full transition-all duration-1000" style={{ width: `${100 - spotsLeft}%` }}></div>
                            </div>
                        </div>

                        <button
                            onClick={() => handleSubscribe('lifetime')}
                            disabled={!!loading}
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-orange-900/40 transform hover:scale-[1.02]"
                        >
                            {loading === 'lifetime' ? 'Securing Spot...' : 'Get Lifetime Access Now'}
                        </button>
                        <p className="text-center text-[10px] text-slate-500 mt-3">30-Day Money Back Guarantee. Risk Free.</p>

                        <div className="mt-8 space-y-4">
                            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">Everything in Monthly +</p>
                            <ul className="space-y-3 text-sm text-white font-medium">
                                <li className="flex gap-3"><div className="bg-orange-500/20 p-1 rounded-full"><CheckIcon /></div> Instant Access to ALL Resell Kits</li>
                                <li className="flex gap-3"><div className="bg-orange-500/20 p-1 rounded-full"><CheckIcon /></div> Future Updates Included</li>
                                <li className="flex gap-3"><div className="bg-orange-500/20 p-1 rounded-full"><CheckIcon /></div> Private Discord Community</li>
                                <li className="flex gap-3"><div className="bg-orange-500/20 p-1 rounded-full"><CheckIcon /></div> Priority Vendor Support</li>
                                <li className="flex gap-3"><div className="bg-orange-500/20 p-1 rounded-full"><CheckIcon /></div> "Founder" Badge on Profile</li>
                            </ul>
                        </div>
                    </div>

                    <div className="order-3 bg-slate-950 border border-slate-800 rounded-2xl p-8 relative opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-2 mb-2">
                            <CrownIcon />
                            <h3 className="text-xl font-bold text-slate-300">Growth Partner</h3>
                        </div>
                        <p className="text-slate-500 text-sm mb-6 h-10">For agencies who want it done for them.</p>

                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-bold text-white">$4,997</span>
                            <span className="text-slate-500">/mo</span>
                        </div>

                        <button
                            onClick={() => window.open('https://cal.com/your-agency/strategy', '_blank')}
                            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all border border-slate-700"
                        >
                            Apply for Partnership
                        </button>

                        <div className="mt-8 space-y-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">VIP Treatment:</p>
                            <ul className="space-y-3 text-sm text-slate-400">
                                <li className="flex gap-3"><CheckIcon /> 1-on-1 Strategy Calls</li>
                                <li className="flex gap-3"><CheckIcon /> Custom Stack Implementation</li>
                                <li className="flex gap-3"><CheckIcon /> Hiring Support</li>
                                <li className="flex gap-3"><CheckIcon /> Direct Access to Founders</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mt-24 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                    <div className="p-8 text-center border-b border-slate-800">
                        <h2 className="text-2xl font-bold text-white">Why the Lifetime Deal is a "No-Brainer"</h2>
                    </div>
                    <div className="grid grid-cols-3 text-sm">
                        <div className="p-4 text-slate-500 font-bold bg-slate-950/50 border-r border-b border-slate-800">Feature</div>
                        <div className="p-4 text-center text-slate-300 font-bold border-r border-b border-slate-800">Monthly ($19/mo)</div>
                        <div className="p-4 text-center text-orange-400 font-bold bg-orange-500/5 border-b border-slate-800">Lifetime ($249)</div>

                        <div className="p-4 text-slate-300 font-medium border-r border-b border-slate-800">Resell Kits Access</div>
                        <div className="p-4 text-center text-slate-500 border-r border-b border-slate-800">1 Kit / Month (Drip Fed)</div>
                        <div className="p-4 text-center text-white font-bold bg-orange-500/5 border-b border-slate-800">Instant Full Access</div>

                        <div className="p-4 text-slate-300 font-medium border-r border-b border-slate-800">Total Cost (3 Years)</div>
                        <div className="p-4 text-center text-red-400 border-r border-b border-slate-800">$719.64</div>
                        <div className="p-4 text-center text-emerald-400 font-bold bg-orange-500/5 border-b border-slate-800">$249.00</div>

                        <div className="p-4 text-slate-300 font-medium border-r border-slate-800">Community Access</div>
                        <div className="p-4 text-center text-slate-500 border-r border-slate-800">Standard Forum</div>
                        <div className="p-4 text-center text-white font-bold bg-orange-500/5">Private Discord</div>
                    </div>
                </div>

                <div className="mt-16 text-center max-w-2xl mx-auto">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">30-Day "First Client" Guarantee</h3>
                    <p className="text-slate-400 leading-relaxed">
                        We are so confident in these assets that if you join the Lifetime Inner Circle, use the kits, and don't land at least one new client in 30 days, we'll refund 100% of your money. No questions asked.
                    </p>
                </div>

            </div>
        </main>
    );
};
