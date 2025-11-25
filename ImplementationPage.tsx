
import React from 'react';
import { IMPLEMENTATION_STEPS } from '../constants';

// Icons
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

export const ImplementationPage = () => {
    return (
        <main className="flex-grow bg-gray-950 min-h-screen">
            {/* Hero */}
            <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-800 overflow-hidden">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] bg-orange-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-bold text-orange-400 uppercase tracking-wider mb-8 animate-fade-in-up">
                        High-Ticket Implementation
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tighter mb-8 leading-[1.1] animate-fade-in-up [animation-delay:100ms]">
                        We Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">$20k MRR Machine</span> <br/>
                        In 8 Weeks.
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up [animation-delay:200ms]">
                        Don't just buy a kit. Hire our team to design, configure, and launch your white-label stack for you. Zero hiring required.
                    </p>
                    <button
                        onClick={() => window.open('https://cal.com/your-agency/strategy', '_blank')}
                        className="px-10 py-5 bg-orange-gradient text-white text-lg font-bold rounded-xl hover:scale-105 transition-transform shadow-2xl shadow-orange-900/20 animate-fade-in-up [animation-delay:300ms]"
                    >
                        Book Your Strategy Call
                    </button>
                    <p className="mt-4 text-sm text-slate-500">Limited spots. Application required.</p>
                </div>
            </section>

            {/* The Timeline */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-white">The 8-Week Sprint</h2>
                        <p className="mt-4 text-slate-400">From "Idea" to "Revenue" without lifting a finger.</p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-800 lg:left-1/2"></div>
                        <div className="space-y-16">
                            {IMPLEMENTATION_STEPS.map((step, index) => (
                                <div key={index} className={`relative flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                                    <div className="flex-1 w-full lg:w-auto">
                                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-orange-500/30 transition-colors shadow-xl">
                                            <span className="text-orange-500 font-bold text-sm uppercase tracking-wider mb-2 block">{step.week}</span>
                                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                            <p className="text-slate-400">{step.description}</p>
                                        </div>
                                    </div>
                                    <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-slate-900 rounded-full border-4 border-slate-800 flex items-center justify-center shadow-xl">
                                        <span className="font-bold text-white">{index + 1}</span>
                                    </div>
                                    <div className="flex-1 hidden lg:block"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Stack */}
            <section className="py-24 bg-slate-900/50 border-y border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white text-center mb-12">What You Get</h2>
                    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 sm:p-12">
                        <ul className="space-y-6">
                            {[
                                "Deep-Dive Strategy Session & Niche Selection",
                                "Full Technical Setup of 1-2 Core Stacks",
                                "Custom Pricing & Packaging Strategy",
                                "Vendor Negotiation (Wholesale Rates)",
                                "Branded Sales Assets (Decks, Proposals, Contracts)",
                                "Onboarding Automation Build-out",
                                "Sales Roleplay & Closing Support",
                                "BONUS: 6 Months of 'Inner Circle' Membership"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-lg text-slate-300">
                                    <CheckCircleIcon />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
                            <p className="text-slate-500 mb-2 uppercase tracking-wide font-bold text-sm">Investment</p>
                            <p className="text-4xl font-extrabold text-white mb-8">$1,500 – $3,000 <span className="text-lg font-medium text-slate-500">one-time</span></p>
                            <button
                                onClick={() => window.open('https://cal.com/your-agency/strategy', '_blank')}
                                className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors text-lg"
                            >
                                Book Your Strategy Call
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
