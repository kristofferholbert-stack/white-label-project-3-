import React, { useState } from 'react';
import type { Page } from './types';
import { supabase } from './supabase';

interface LoginPageProps {
    onNavigate: (page: Page) => void;
}

// Icons
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const GoogleIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.52 12.29C23.52 11.43 23.44 10.6 23.3 9.8H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.94 21.1C22.2 19.01 23.52 15.92 23.52 12.29Z" fill="#4285F4"/><path d="M12 24C15.24 24 17.96 22.92 19.94 21.1L16.08 18.1C15.01 18.82 13.63 19.25 12 19.25C8.87 19.25 6.22 17.14 5.27 14.29L1.29 17.38C3.27 21.3 7.32 24 12 24Z" fill="#34A853"/><path d="M5.27 14.29C5.02 13.57 4.89 12.8 4.89 12C4.89 11.2 5.03 10.43 5.27 9.71L1.29 6.62C0.47 8.24 0 10.06 0 12C0 13.94 0.47 15.76 1.29 17.38L5.27 14.29Z" fill="#FBBC05"/><path d="M12 4.75C13.77 4.75 15.35 5.36 16.6 6.55L20.02 3.13C17.96 1.21 15.24 0 12 0C7.32 0 3.27 2.7 1.29 6.62L5.27 9.71C6.22 6.86 8.87 4.75 12 4.75Z" fill="#EA4335"/></svg>;

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState<'agency' | 'vendor'>('agency');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetSent, setResetSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please enter your credentials.');
            return;
        }

        setLoading(true);
        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            onNavigate('home');
        } catch (err: any) {
            setError(err.message || 'Failed to login.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError('Please enter your email address to reset password.');
            return;
        }
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '#reset-password', // Assuming this flow exists or just generic link
            });
            if (error) throw error;
            setResetSent(true);
            setError('');
        } catch (err: any) {
            setError(err.message || 'Failed to send reset email.');
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 flex">
            {/* Left Side: Visual & Social Proof */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 to-slate-900 z-0"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0"></div>

                <div className="relative z-10 max-w-md">
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-6">
                            New Update
                        </div>
                        <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
                            "The only platform that actually helped me scale past $20k MRR."
                        </h2>
                        <div className="flex items-center gap-4">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&h=100" alt="User" className="w-12 h-12 rounded-full border-2 border-slate-700" />
                            <div>
                                <p className="text-white font-bold">David K.</p>
                                <p className="text-slate-400 text-sm">Founder, ScaleUp Digital</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-12">
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                            <p className="text-2xl font-bold text-white">1,400+</p>
                            <p className="text-xs text-slate-400 uppercase font-bold mt-1">Active Agencies</p>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                            <p className="text-2xl font-bold text-white">$187M</p>
                            <p className="text-xs text-slate-400 uppercase font-bold mt-1">Revenue Generated</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: The Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-slate-950 relative">
                <button onClick={() => onNavigate('home')} className="absolute top-8 right-8 text-sm font-bold text-slate-500 hover:text-white transition-colors">
                    ✕ Close
                </button>

                <div className="max-w-sm w-full mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h1>
                        <p className="mt-2 text-slate-400">Enter your details to access your dashboard.</p>
                    </div>

                    {/* Toggle */}
                    <div className="bg-slate-900 p-1 rounded-xl flex mb-8 border border-slate-800">
                        <button
                            onClick={() => setUserType('agency')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${userType === 'agency' ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Agency
                        </button>
                        <button
                            onClick={() => setUserType('vendor')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${userType === 'vendor' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-white'}`}
                        >
                            Vendor Partner
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                placeholder="name@agency.com"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-sm font-bold text-slate-300">Password</label>
                                <button type="button" onClick={handleForgotPassword} className="text-xs font-bold text-primary-400 hover:text-primary-300">Forgot?</button>
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500"><LockIcon /></span>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-800 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg text-center">{error}</p>}
                        {resetSent && <p className="text-sm text-emerald-400 bg-emerald-500/10 p-3 rounded-lg text-center">Password reset email sent!</p>}

                        <button type="submit" disabled={loading} className="w-full py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-900/20 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-4 bg-slate-950 text-slate-500 font-medium">Or continue with</span></div>
                    </div>

                    <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-3">
                        <GoogleIcon /> Google
                    </button>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Don't have an account? <button onClick={() => onNavigate('signup')} className="text-primary-400 hover:text-primary-300 font-bold">Start Free Trial</button>
                    </p>
                </div>
            </div>
        </main>
    );
};
