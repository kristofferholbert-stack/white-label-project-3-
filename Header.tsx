import React, { useState } from 'react';
import type { Page, User } from '../types';

const LogoIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-500">
        <path d="M16 2.66699L29.3333 10.0003L16 17.3337L2.66667 10.0003L16 2.66699Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M29.3333 22.0003L16 29.3337L2.66667 22.0003" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M29.3333 16.0003L16 23.3337L2.66667 16.0003" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const ChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-50"><polyline points="6 9 12 15 18 9"></polyline></svg>;

interface HeaderProps {
    user: User | null;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (page: Page) => {
      onNavigate(page);
      setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo Area */}
          <button onClick={() => handleNav('home')} className="flex items-center gap-3 group">
            <div className="transition-transform group-hover:scale-110 duration-300">
                <LogoIcon />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">White-Label Wonder</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">

             {/* Group 1: Discovery */}
             <div className="relative group">
                <button className="flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors py-2">
                    Explore <ChevronDown />
                </button>
                {/* Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 min-w-[200px]">
                        <button onClick={() => handleNav('stacks')} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">Proven Stacks</button>
                        <button onClick={() => handleNav('inspirations')} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">Business Models</button>
                        <button onClick={() => handleNav('search')} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">Search Library</button>
                    </div>
                </div>
             </div>

             {/* Group 2: Products */}
             <div className="relative group">
                <button className="flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors py-2">
                    Store <ChevronDown />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 min-w-[200px]">
                        <button onClick={() => handleNav('resellKits')} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">Resell Kits</button>
                        <button onClick={() => handleNav('membership')} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">Inner Circle</button>
                    </div>
                </div>
             </div>

             <button onClick={() => handleNav('playbooks')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Operations</button>

             <button onClick={() => handleNav('implementation')} className="text-sm font-medium text-slate-300 hover:text-orange-400 transition-colors">Hire Us</button>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="w-px h-6 bg-slate-800"></div>
            {user ? (
              <div className="flex items-center gap-4">
                <button onClick={() => handleNav(user.type === 'agency' ? 'dashboard' : 'vendorDashboard')} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Dashboard</button>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-slate-700 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={() => handleNav('login')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</button>
                <button 
                  onClick={() => handleNav('getStarted')}
                  className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-950 text-sm font-bold rounded-lg hover:bg-slate-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                >
                  <span>Start Free</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-fade-in-down">
            <div className="px-4 pt-2 pb-6 space-y-2">
                <div className="pb-4 border-b border-slate-800 mb-4">
                    <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Explore</p>
                    <button onClick={() => handleNav('stacks')} className="block w-full text-left px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md">Proven Stacks</button>
                    <button onClick={() => handleNav('inspirations')} className="block w-full text-left px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md">Business Models</button>
                </div>
                <div className="pb-4 border-b border-slate-800 mb-4">
                    <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Store</p>
                    <button onClick={() => handleNav('resellKits')} className="block w-full text-left px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md">Resell Kits</button>
                    <button onClick={() => handleNav('membership')} className="block w-full text-left px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md">Inner Circle</button>
                </div>
                {user && (
                    <div className="pb-4 border-b border-slate-800 mb-4">
                        <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Manage</p>
                        <button onClick={() => handleNav('playbooks')} className="block w-full text-left px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md">Operations</button>
                    </div>
                )}
                {user ? (
                    <button onClick={() => handleNav('dashboard')} className="block w-full text-left px-3 py-2 text-base font-bold text-white bg-primary-600 rounded-md">Go to Dashboard</button>
                ) : (
                    <button onClick={() => handleNav('getStarted')} className="block w-full text-left px-3 py-2 text-base font-bold text-slate-900 bg-white rounded-md">Start Free</button>
                )}
            </div>
        </div>
      )}
    </header>
  );
};
