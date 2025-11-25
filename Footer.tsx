import React from 'react';
import type { Page } from '../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
    onSelectPost: (postId: string) => void;
}

const LogoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-600 group-hover:text-slate-400 transition-colors">
        <path d="M16 2.66699L29.3333 10.0003L16 17.3337L2.66667 10.0003L16 2.66699Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M29.3333 22.0003L16 29.3337L2.66667 22.0003" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M29.3333 16.0003L16 23.3337L2.66667 16.0003" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectPost }) => {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 mt-auto">
            <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">

                    {/* Brand Column */}
                    <div className="col-span-2">
                         <button onClick={() => onNavigate('home')} className="flex items-center gap-3 group mb-6">
                            <LogoIcon />
                            <span className="text-lg font-bold text-slate-500 group-hover:text-slate-300 transition-colors">White-Label Wonder</span>
                        </button>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
                            The operating system for agencies. Find a stack, launch your service, and scale without fulfillment headaches.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            {['X', 'In', 'Yt'].map( initial => (
                                <div key={initial} className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-600 font-bold text-xs cursor-pointer hover:bg-slate-800 hover:text-white transition-colors border border-slate-800">
                                    {initial}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-6">Platform</h3>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><button onClick={() => onNavigate('stacks')} className="hover:text-white transition-colors">Proven Stacks</button></li>
                            <li><button onClick={() => onNavigate('inspirations')} className="hover:text-white transition-colors">Business Models</button></li>
                            <li><button onClick={() => onNavigate('resellKits')} className="hover:text-white transition-colors">Resell Kits</button></li>
                            <li><button onClick={() => onNavigate('search')} className="hover:text-white transition-colors">Search All</button></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-6">Solutions</h3>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><button onClick={() => onNavigate('forAgencies')} className="hover:text-white transition-colors">For Agencies</button></li>
                            <li><button onClick={() => onNavigate('forPartners')} className="hover:text-white transition-colors">For Vendors</button></li>
                            <li><button onClick={() => onNavigate('implementation')} className="hover:text-white transition-colors">Implementation</button></li>
                            <li><button onClick={() => onNavigate('membership')} className="hover:text-white transition-colors">Membership</button></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-6">Resources</h3>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">Agency Blog</button></li>
                            <li><button onClick={() => onNavigate('businessInABox')} className="hover:text-white transition-colors">Profit Calculator</button></li>
                            <li><button onClick={() => onSelectPost('what-is-white-labeling')} className="hover:text-white transition-colors">White-Labeling 101</button></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-6">Company</h3>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Our Manifesto</button></li>
                            <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Contact Support</button></li>
                            <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Partner with Us</button></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-600">
                        &copy; {new Date().getFullYear()} White-Label Wonder Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-600">
                        <button onClick={() => onNavigate('privacy')} className="hover:text-slate-400">Privacy Policy</button>
                        <button onClick={() => onNavigate('terms')} className="hover:text-slate-400">Terms of Service</button>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="text-emerald-500 font-bold">All Systems Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
