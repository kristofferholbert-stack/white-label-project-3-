import React, { useState } from 'react';

// Icons
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;

export const ContactPage = () => {
    const [formType, setFormType] = useState<'support' | 'sales' | 'partnership'>('support');

    return (
        <main className="flex-grow bg-gray-950 min-h-screen text-slate-300">

            <section className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-800">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
                        How can we help you <br/> <span className="text-primary-500">scale faster?</span>
                    </h1>
                    <p className="text-lg text-slate-400">
                        Choose the right channel to get the fastest response.
                    </p>
                </div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Channel 1: Support (Deflection) */}
                        <div
                            onClick={() => setFormType('support')}
                            className={`p-8 rounded-2xl border cursor-pointer transition-all ${formType === 'support' ? 'bg-slate-800 border-blue-500 ring-1 ring-blue-500' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
                        >
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4"><ChatIcon /></div>
                            <h3 className="text-xl font-bold text-white mb-2">Existing Members</h3>
                            <p className="text-sm text-slate-400 mb-4">Questions about a stack, billing, or your account.</p>
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Response: &lt; 24 Hours</span>
                        </div>

                        {/* Channel 2: Sales (High Ticket) */}
                        <div
                            onClick={() => setFormType('sales')}
                            className={`p-8 rounded-2xl border cursor-pointer transition-all ${formType === 'sales' ? 'bg-slate-800 border-orange-500 ring-1 ring-orange-500' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
                        >
                            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4"><PhoneIcon /></div>
                            <h3 className="text-xl font-bold text-white mb-2">Implementation</h3>
                            <p className="text-sm text-slate-400 mb-4">You want us to build your "Business-in-a-Box" for you.</p>
                            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Response: Same Day</span>
                        </div>

                        {/* Channel 3: Partnership (Vendors) */}
                        <div
                            onClick={() => setFormType('partnership')}
                            className={`p-8 rounded-2xl border cursor-pointer transition-all ${formType === 'partnership' ? 'bg-slate-800 border-emerald-500 ring-1 ring-emerald-500' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
                        >
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4"><UsersIcon /></div>
                            <h3 className="text-xl font-bold text-white mb-2">SaaS Partners</h3>
                            <p className="text-sm text-slate-400 mb-4">Software vendors looking to get listed on the platform.</p>
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Response: 48 Hours</span>
                        </div>
                    </div>

                    {/* The Dynamic Form Area */}
                    <div className="mt-12 bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        {/* Background Glow */}
                        <div className={`absolute top-0 left-0 w-full h-1 transition-colors duration-500 ${
                            formType === 'support' ? 'bg-blue-500' : formType === 'sales' ? 'bg-orange-500' : 'bg-emerald-500'
                        }`}></div>

                        {formType === 'support' && (
                            <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
                                <h3 className="text-2xl font-bold text-white mb-4">Have you checked the Copilot?</h3>
                                <p className="text-slate-400 mb-8">
                                    Our AI Agency Copilot is trained on our entire knowledge base and can answer 95% of questions instantly.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    {/* This would trigger the existing Copilot modal */}
                                    <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors">
                                        Ask Agency Copilot
                                    </button>
                                    <a href="mailto:support@whitelabelwonder.example.com" className="px-8 py-3 border border-slate-600 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors">
                                        Submit Email Ticket
                                    </a>
                                </div>
                            </div>
                        )}

                        {formType === 'sales' && (
                            <div className="max-w-xl mx-auto animate-fade-in-up">
                                <h3 className="text-2xl font-bold text-white mb-2 text-center">Book Your Strategy Session</h3>
                                <p className="text-slate-400 text-center mb-8">
                                    Speak with a specialist to see if our "Done-For-You" implementation is right for your agency.
                                </p>
                                {/* Dummy Calendar Embed Placeholder */}
                                <div className="bg-slate-950 border border-slate-800 rounded-xl h-64 flex items-center justify-center text-slate-600 mb-6">
                                    [Calendly / Cal.com Embed Would Go Here]
                                </div>
                                <p className="text-xs text-slate-500 text-center">
                                    Serious inquiries only. Implementation starts at $3,000.
                                </p>
                            </div>
                        )}

                        {formType === 'partnership' && (
                            <div className="max-w-xl mx-auto animate-fade-in-up">
                                <h3 className="text-2xl font-bold text-white mb-6 text-center">Partner Application</h3>
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Company Name</label>
                                        <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none" placeholder="e.g. SuperSaaS" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">White-Label Capabilities</label>
                                        <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                                            <option>Full White Label (Custom Domain)</option>
                                            <option>Partial (Powered By branding)</option>
                                            <option>API Only</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-1">Direct Partner Contact</label>
                                        <input type="email" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="partners@yourco.com" />
                                    </div>
                                    <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 mt-4">
                                        Submit Application <SendIcon />
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};
