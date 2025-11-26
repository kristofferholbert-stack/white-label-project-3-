import React from 'react';

// Icons
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
const BanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const RocketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1s.38 2.38-.62 4z"/><path d="M12 15v5s3.03-.55 4-2c1.1-1.62 1-4 1-4s-2.38-.38-4 .62z"/></svg>;

export const AboutPage = () => {
    return (
        <main className="flex-grow bg-gray-950 min-h-screen overflow-hidden text-slate-300">
            
            {/* Hero: The Origin Story */}
            <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-800">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] bg-slate-800/30 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tighter mb-8 leading-tight">
                        We Don't Just List Software. <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">We Stress-Test It.</span>
                    </h1>
                    <p className="mt-6 text-xl leading-relaxed max-w-2xl mx-auto">
                        White-Label Wonder exists because we got tired of getting burned by buggy white-label tools. 
                        We built the vetting engine we wished we had 5 years ago.
                    </p>
                </div>
            </section>

            {/* The "Before vs After" Visual */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">The Agency Evolution</h2>
                        <p className="text-slate-400">Most agencies stay stuck on the left. We move you to the right.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* The Old Way (Frankenstein) */}
                        <div className="bg-slate-950 p-8 rounded-2xl border border-red-900/30 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">The "Service Trap"</div>
                            <h3 className="text-xl font-bold text-red-400 mb-6">The "Frankenstein" Agency</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-center gap-3 p-3 bg-red-900/10 rounded border border-red-900/20 text-red-200">
                                    <span className="font-mono">01.</span> You use 12 different tools.
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-red-900/10 rounded border border-red-900/20 text-red-200">
                                    <span className="font-mono">02.</span> Client owns the login & data.
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-red-900/10 rounded border border-red-900/20 text-red-200">
                                    <span className="font-mono">03.</span> Client fires you → Keeps software.
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-red-900/10 rounded border border-red-900/20 text-red-200">
                                    <span className="font-mono">04.</span> 0% Equity Value.
                                </div>
                            </div>
                        </div>

                        {/* The New Way (Platform) */}
                        <div className="bg-slate-800 p-8 rounded-2xl border border-emerald-500/50 relative overflow-hidden shadow-2xl shadow-emerald-900/20">
                            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">The "SaaS" Model</div>
                            <h3 className="text-xl font-bold text-white mb-6">The "Platform" Agency</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-center gap-3 p-3 bg-emerald-900/20 rounded border border-emerald-500/30 text-emerald-100 font-medium">
                                    <span className="font-mono text-emerald-400">01.</span> One unified dashboard.
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-emerald-900/20 rounded border border-emerald-500/30 text-emerald-100 font-medium">
                                    <span className="font-mono text-emerald-400">02.</span> You own the login & billing.
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-emerald-900/20 rounded border border-emerald-500/30 text-emerald-100 font-medium">
                                    <span className="font-mono text-emerald-400">03.</span> Client fires you → Loses software.
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-emerald-900/20 rounded border border-emerald-500/30 text-emerald-100 font-medium">
                                    <span className="font-mono text-emerald-400">04.</span> 5-10x Valuation Multiple.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The "Vetting Protocol" (Trust Section) */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white">Why 98% of Vendors Are Rejected</h2>
                        <p className="mt-4 text-slate-400">
                            We don't accept sponsorship fees to list bad products. A vendor only gets on our list if they pass the <strong>Agency Readiness Protocol</strong>.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mb-4"><SearchIcon /></div>
                            <h3 className="text-lg font-bold text-white mb-2">1. The "Ghost" Test</h3>
                            <p className="text-sm text-slate-400">
                                We verify that 100% of the branding can be removed. If we find a single vendor logo in the email footers, HTML code, or sub-domains, they are banned.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-4"><BanIcon /></div>
                            <h3 className="text-lg font-bold text-white mb-2">2. The "Hostage" Check</h3>
                            <p className="text-sm text-slate-400">
                                We review their TOS. Does the vendor own your client's data? If they don't have a clear, 1-click data export policy for agencies, they don't make the list.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-4"><ShieldCheckIcon /></div>
                            <h3 className="text-lg font-bold text-white mb-2">3. The Margin Audit</h3>
                            <p className="text-sm text-slate-400">
                                We model the pricing. If an agency cannot reasonably make a **60% gross margin** reselling the tool at market rates, we consider it "Bad for Business."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder's Promise */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
                <div className="max-w-3xl mx-auto bg-slate-950 border border-slate-800 p-10 rounded-2xl shadow-2xl">
                    <h3 className="text-2xl font-serif text-white mb-6">A Note from the Founder</h3>
                    <div className="space-y-6 text-slate-300 leading-relaxed">
                        <p>
                            "Three years ago, I lost a $4,000/mo client because my 'white-label' CRM vendor went down for 4 days. When I emailed their support, they told me to 'submit a ticket.' My client didn't blame the vendor. They blamed <strong>me</strong>."
                        </p>
                        <p>
                            That day, I realized that when you resell software, you are selling your <strong>reputation</strong>.
                        </p>
                        <p>
                            I built White-Label Wonder to be the filter I never had. Every stack on this site is something I would personally put my own agency's logo on. That is my promise to you.
                        </p>
                        <p className="font-bold text-white pt-4">- Alex, Founder</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center border-t border-slate-800">
                <h2 className="text-3xl font-extrabold text-white mb-8">Ready to build your asset?</h2>
                <a href="/stacks" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-gradient text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg">
                    <RocketIcon /> Explore Vetted Stacks
                </a>
            </section>
        </main>
    );
};