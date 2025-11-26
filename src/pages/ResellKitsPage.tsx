
import React, { useState, useEffect } from 'react';
import { RESELL_KITS } from '../constants/constants';
import { useAuth } from '../context/AuthProvider';
import { getSubscriptionStatus } from '../services/stripeService';

// Icons
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;

const SocialProofBanner = () => (
  <div className="max-w-7xl mx-auto mb-12 px-4">
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-emerald-500/20 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 text-center md:text-left">
          <p className="text-emerald-400 text-sm font-bold uppercase tracking-wider mb-2">Trusted by 2,450+ Agencies</p>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
            Join agencies generating <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">$10k-50k/month</span>
          </h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">2,450+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">$12M+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-400">4.9/5</div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">Avg Rating</div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-slate-900 flex items-center justify-center text-white font-bold text-sm">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-slate-400 font-bold text-xs">
              +2k
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MembershipUpsellBanner = () => (
  <div className="relative w-full max-w-7xl mx-auto mb-16 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-1 shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
    <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900/90 backdrop-blur-sm p-8 rounded-xl h-full">
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Limited Time Offer
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Want all these kits for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">FREE?</span>
        </h2>
        <p className="text-slate-300 text-lg">
          Join the <strong>Inner Circle</strong> ($99/mo) and get <span className="text-white font-bold underline decoration-emerald-400 decoration-2 underline-offset-2">1 Free Kit</span> every single month.
        </p>
      </div>
      <div className="flex-shrink-0">
        <button className="px-8 py-4 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 hover:scale-105 transition-all shadow-xl hover:shadow-emerald-500/25 flex items-center gap-2 group">
          Join Inner Circle
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

interface ResellKitsPageProps {
    onNavigate: (page: any) => void; // using any for Page type simplicity here
}

export const ResellKitsPage: React.FC<ResellKitsPageProps> = ({ onNavigate }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState<string | null>(null);
    const [isSubscribed, setIsSubscribed] = useState(true); // Unlocked for now

    useEffect(() => {
        // Temporarily unlocked - all kits are accessible
        setIsSubscribed(true);
        // Original code commented out:
        // const checkEntitlement = async () => {
        //     if (user) {
        //         const sub = await getSubscriptionStatus();
        //         setIsSubscribed(!!sub);
        //     }
        // };
        // checkEntitlement();
    }, [user]);

    const handleBuyKit = async (kitId: string, price: string) => {
        // In production, we'd check user auth here or pass user ID to Stripe
        const kit = RESELL_KITS.find(k => k.id === kitId);
        if (kit && kit.stripeLink) {
            window.location.href = kit.stripeLink;
        } else {
             alert("Checkout link not found.");
        }
    };

    const handleDownload = (kit: any) => {
        // Navigate to course viewer for kit access
        onNavigate('kitViewer', { kitId: kit.id });
    };

    return (
        <main className="flex-grow bg-gray-950 min-h-screen">
            {/* Hero */}
            <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-gray-950 to-gray-950">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-6 animate-fade-in-up">
                        Digital Products
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6 animate-fade-in-up [animation-delay:100ms]">
                        Launch in 24 Hours with <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Premium Resell Kits</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 animate-fade-in-up [animation-delay:200ms]">
                        Skip the setup. Get the exact sales pages, pricing calculators, proposal templates, and vendor relationships used by top agencies.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">

                <SocialProofBanner />
                <MembershipUpsellBanner />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {RESELL_KITS.map((kit, index) => (
                        <div key={kit.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">

                            {/* Urgency Badge - Top Right */}
                            {index === 0 && (
                                <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg animate-pulse">
                                    🔥 12 joined this week
                                </div>
                            )}

                            {/* Product Shot Area */}
                            <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden border border-slate-700 bg-slate-800 group-hover:border-emerald-500/30 transition-colors">
                                {/* Background Image */}
                                <img
                                    src={kit.image}
                                    alt={kit.title}
                                    className="w-full h-full object-cover opacity-75 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                                />

                                {/* Hover Overlay: "Look Inside" */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-slate-950/60 backdrop-blur-sm p-6">
                                    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-lg p-4 w-full max-w-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest mb-3 border-b border-slate-700 pb-2">
                                            <EyeIcon /> Insider Preview
                                        </div>
                                        <ul className="space-y-2">
                                            {(kit.previewItems || []).map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                                    <span className="text-emerald-500 mt-0.5">•</span>
                                                    <span className="line-clamp-1">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Badge */}
                                <div className="absolute top-4 left-4 z-10 flex gap-2">
                                    {kit.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-slate-900/90 backdrop-blur border border-slate-700 text-slate-300 text-[10px] font-bold uppercase rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">{kit.title}</h3>
                                <div className="text-right">
                                    <p className="text-xs text-slate-500 line-through font-mono">{kit.value}</p>
                                    <p className="text-2xl font-extrabold text-white">{kit.price}</p>
                                </div>
                            </div>
                            
                            <p className="text-slate-400 mb-6 text-sm leading-relaxed min-h-[3rem]">
                                {kit.description}
                            </p>

                            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 mb-6 flex-grow">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Included Assets:</p>
                                <ul className="space-y-2">
                                    {kit.features.slice(0, 4).map((feat, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                            <div className="mt-0.5 flex-shrink-0"><CheckIcon /></div>
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                    {kit.features.length > 4 && (
                                        <li className="text-xs text-slate-500 italic pl-6">
                                            + {kit.features.length - 4} more items...
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <div className="mt-auto">
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => handleBuyKit(kit.id, kit.price)}
                                        className="w-full py-3 border border-slate-600 text-slate-300 font-bold rounded-xl hover:bg-slate-800"
                                    >
                                        Buy Single Kit ({kit.price})
                                    </button>

                                    <button
                                        onClick={() => isSubscribed ? handleDownload(kit) : onNavigate('membership')}
                                        className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 flex items-center justify-center gap-2"
                                    >
                                        {isSubscribed ? <DownloadIcon /> : <LockIcon />}
                                        {isSubscribed ? "Open Course →" : "Get Free with Membership"}
                                    </button>
                                </div>
                                <div className="mt-2 text-center space-y-1">
                                    {!isSubscribed && (
                                        <p className="text-[10px] text-slate-500">
                                            Join for $99/mo to unlock all kits.
                                        </p>
                                    )}
                                    <p className="text-[10px] text-slate-500 hover:text-slate-300 cursor-pointer" onClick={() => onNavigate('playbooks')}>
                                        Looking for client onboarding steps? Go to Operations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};
