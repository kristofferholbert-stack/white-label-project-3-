import React, { useState, useEffect } from 'react';
import type { Page } from '../types';
import { supabase } from '../lib/supabase';

interface SignUpPageProps {
    onNavigate: (page: Page) => void;
}

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>;

export const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [flow, setFlow] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [intakeData, setIntakeData] = useState<any>(null);

    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.split('?')[1]);
        setFlow(params.get('flow'));
        setRole(params.get('role'));

        // Load intake data if coming from intake flow
        const pendingDataStr = localStorage.getItem('pending_intake_data');
        if (pendingDataStr) {
            try {
                const data = JSON.parse(pendingDataStr);
                setIntakeData(data);
            } catch (error) {
                console.error('Failed to parse intake data:', error);
            }
        }
    }, []);

    const getHeadline = () => {
        if (flow === 'intake') return "Complete Your Free Account";
        if (flow === 'stack') return "Create account to unlock your Stack";
        return "Create your account";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!formData.email || !formData.password || !formData.companyName) {
            setError('Please fill out all fields.');
            return;
        }

        setLoading(true);
        try {
            const { data, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        company_name: formData.companyName,
                        role: role || 'agency'
                    }
                }
            });

            if (authError) throw authError;

            if (data.user) {
                // Check for pending intake data
                const pendingDataStr = localStorage.getItem('pending_intake_data');
                if (pendingDataStr) {
                    const pendingData = JSON.parse(pendingDataStr);

                    // Insert into user_progression
                    // We need the level ID, so we might need to fetch it or use the slug if the logic allows
                    // But IntakePage used slug to find ID.
                    // Let's repeat the logic roughly or just assume we can insert what we have
                    // The IntakePage logic was:
                    /*
                    const { data: levelData } = await supabase
                        .from('agency_identity_levels')
                        .select('id')
                        .eq('slug', currentLevel.slug)
                        .maybeSingle();
                    */

                   if (pendingData.currentLevelSlug) {
                        const { data: levelData } = await supabase
                        .from('agency_identity_levels')
                        .select('id')
                        .eq('slug', pendingData.currentLevelSlug)
                        .maybeSingle();

                        if (levelData) {
                             await supabase
                            .from('user_progression')
                            .upsert({
                                user_id: data.user.id,
                                current_level_id: levelData.id,
                                current_mrr: pendingData.currentMRR,
                                target_mrr: pendingData.currentMRR + pendingData.targetMRR,
                                intake_responses: pendingData.answers,
                                updated_at: new Date().toISOString()
                            }, {
                                onConflict: 'user_id'
                            });
                        }
                   }

                   // Don't clear storage yet - IntakePage will need it
                   // localStorage.removeItem('pending_intake_data');

                   // Set session flag to show results (helps with timing/race conditions)
                   sessionStorage.setItem('show_intake_results', 'true');

                   // Add expiry to localStorage data (30 minutes)
                   const dataWithExpiry = {
                       ...pendingData,
                       expiresAt: Date.now() + (30 * 60 * 1000)
                   };
                   localStorage.setItem('pending_intake_data', JSON.stringify(dataWithExpiry));

                   console.log('SignUp: Redirecting to results with data:', !!pendingDataStr);

                   // Redirect to intake results page instead of dashboard
                   window.location.hash = '#intake?showResults=true';
                   return;
                }

                // Normal signup without intake - go to dashboard
                onNavigate('dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to create account.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 flex">

            {/* Left Side: The Offer */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/20 to-slate-900 z-0"></div>

                <div className="relative z-10 max-w-md">
                    {flow === 'intake' ? (
                        <>
                            <h2 className="text-4xl font-extrabold text-white mb-8 leading-tight">
                                You're One Step Away!
                            </h2>

                            {intakeData && (
                                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm mb-6">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">Your Assessment Results</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-slate-500 mb-1">Current Position</p>
                                            <p className="text-xl font-bold text-white">${(intakeData.currentMRR / 1000).toFixed(1)}k MRR</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 mb-1">90-Day Target</p>
                                            <p className="text-xl font-bold text-emerald-400">${((intakeData.currentMRR + intakeData.targetMRR) / 1000).toFixed(1)}k MRR</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 mb-1">Services to Add</p>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {intakeData.answers?.desiredAddons?.slice(0, 3).map((addon: string, i: number) => (
                                                    <span key={i} className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">{addon}</span>
                                                ))}
                                                {intakeData.answers?.desiredAddons?.length > 3 && (
                                                    <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded">+{intakeData.answers.desiredAddons.length - 3} more</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                                <h3 className="text-lg font-bold text-white mb-4">Unlock now:</h3>
                                <ul className="space-y-4">
                                    {[
                                        'Your personalized growth roadmap',
                                        'Custom stack recommendations',
                                        '3-day full platform access',
                                        'Implementation playbooks'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-0.5 bg-emerald-500/10 p-1 rounded-full"><CheckIcon /></div>
                                            <span className="text-slate-300 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-4xl font-extrabold text-white mb-8 leading-tight">
                                Join the "Inner Circle" of Scalable Agencies.
                            </h2>

                            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                                <h3 className="text-lg font-bold text-white mb-4">What you get inside:</h3>
                                <ul className="space-y-4">
                                    {[
                                        'Unlimited access to 20+ Proven Stacks',
                                        'Wholesale pricing on white-label software',
                                        'The "Close-in-One-Call" Sales Scripts',
                                        'Community of 1,400+ agency owners'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-0.5 bg-emerald-500/10 p-1 rounded-full"><CheckIcon /></div>
                                            <span className="text-slate-300 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <p className="mt-8 text-slate-500 text-sm">
                                "I replaced my full-time job income in 3 months using the SEO Stack." <br/>
                                <span className="text-slate-300 font-bold">— Sarah J., Agency Owner</span>
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Right Side: The Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-slate-950 relative">
                <button onClick={() => onNavigate('home')} className="absolute top-8 right-8 text-sm font-bold text-slate-500 hover:text-white transition-colors">
                    ✕ Close
                </button>

                <div className="max-w-sm w-full mx-auto">
                    {/* Progress Indicator */}
                    {flow === 'intake' && (
                        <div className="mb-6 flex items-center justify-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">
                                    <CheckIcon />
                                </div>
                                <span className="text-sm text-slate-400 font-medium">Assessment</span>
                            </div>
                            <div className="w-12 h-0.5 bg-slate-700"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                                    2
                                </div>
                                <span className="text-sm text-white font-medium">Account</span>
                            </div>
                        </div>
                    )}

                    <div className="mb-10">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">{getHeadline()}</h1>
                        {intakeData && (
                            <div className="mt-4 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                                <p className="text-sm text-slate-400 mb-2">Based on your assessment:</p>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="text-slate-500">Target:</span>
                                    <span className="text-emerald-400 font-bold">${((intakeData.currentMRR + intakeData.targetMRR) / 1000).toFixed(0)}k MRR</span>
                                    <span className="text-slate-700">•</span>
                                    <span className="text-slate-500">Services:</span>
                                    <span className="text-orange-400 font-bold">{intakeData.answers?.desiredAddons?.length || 0} to add</span>
                                </div>
                            </div>
                        )}
                        {role === 'agency' || flow === 'intake' ? (
                            <div className="mt-4 flex items-center gap-2 text-emerald-400 bg-emerald-500/10 py-1 px-3 rounded-full inline-flex text-xs font-bold uppercase tracking-wide">
                                <CheckIcon />
                                3-Day Full Access • No Credit Card Required
                            </div>
                        ) : (
                             <p className="mt-2 text-slate-400">No credit card required for free trial.</p>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-1.5">Agency Name</label>
                            <input
                                type="text"
                                required
                                value={formData.companyName}
                                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                className="w-full bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. Growth Flow"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-1.5">Work Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                placeholder="name@agency.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-1.5">Password</label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                placeholder="Create a strong password"
                            />
                        </div>

                        {error && <p className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg text-center">{error}</p>}

                        <button type="submit" disabled={loading} className="w-full py-4 bg-orange-gradient hover:brightness-110 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-900/20 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'Creating Account...' : (flow === 'intake' ? 'View My Custom Roadmap →' : 'Start Free Trial')}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Already a member? <button onClick={() => onNavigate('login')} className="text-orange-400 hover:text-orange-300 font-bold">Log in</button>
                    </p>
                </div>
            </div>
        </main>
    );
};
