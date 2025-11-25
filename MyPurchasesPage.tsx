import React, { useState, useEffect } from 'react';
import { marketplaceService, type Purchase } from '../services/marketplaceService';
import { useAuth } from '../contexts/AuthProvider';
import type { Page } from '../types';

interface MyPurchasesPageProps {
  onNavigate: (page: Page) => void;
}

const PackageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

export const MyPurchasesPage: React.FC<MyPurchasesPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'solutions' | 'stacks' | 'resell_kits'>('all');

  useEffect(() => {
    loadPurchases();
  }, [user]);

  const loadPurchases = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const data = await marketplaceService.getUserPurchases(user.id);
      setPurchases(data);
    } catch (error) {
      console.error('Error loading purchases:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPurchases = activeTab === 'all'
    ? purchases
    : purchases.filter(p => p.item_type === activeTab);

  const getItemTypeLabel = (type: string) => {
    switch(type) {
      case 'solution': return 'Solution';
      case 'stack': return 'Stack';
      case 'resell_kit': return 'Resell Kit';
      default: return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">Completed</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">Pending</span>;
      case 'refunded':
        return <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full">Refunded</span>;
      default:
        return <span className="px-3 py-1 bg-slate-500/20 text-slate-400 text-xs font-bold rounded-full">{status}</span>;
    }
  };

  if (!user) {
    return (
      <main className="flex-grow bg-gray-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please Log In</h2>
          <p className="text-slate-400 mb-6">You need to be logged in to view your purchases.</p>
          <button
            onClick={() => onNavigate('login')}
            className="bg-primary-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-700 transition-colors"
          >
            Log In
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            My Purchases
          </h1>
          <p className="text-lg text-slate-400">
            View and manage all your marketplace purchases
          </p>
        </div>

        <div className="flex gap-4 mb-8 border-b border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 font-bold transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'all'
                ? 'text-primary-400 border-primary-400'
                : 'text-slate-400 border-transparent hover:text-slate-300'
            }`}
          >
            All Purchases ({purchases.length})
          </button>
          <button
            onClick={() => setActiveTab('solutions')}
            className={`px-6 py-3 font-bold transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'solutions'
                ? 'text-primary-400 border-primary-400'
                : 'text-slate-400 border-transparent hover:text-slate-300'
            }`}
          >
            Solutions ({purchases.filter(p => p.item_type === 'solution').length})
          </button>
          <button
            onClick={() => setActiveTab('stacks')}
            className={`px-6 py-3 font-bold transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'stacks'
                ? 'text-primary-400 border-primary-400'
                : 'text-slate-400 border-transparent hover:text-slate-300'
            }`}
          >
            Stacks ({purchases.filter(p => p.item_type === 'stack').length})
          </button>
          <button
            onClick={() => setActiveTab('resell_kits')}
            className={`px-6 py-3 font-bold transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'resell_kits'
                ? 'text-primary-400 border-primary-400'
                : 'text-slate-400 border-transparent hover:text-slate-300'
            }`}
          >
            Resell Kits ({purchases.filter(p => p.item_type === 'resell_kit').length})
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-slate-400">Loading your purchases...</p>
          </div>
        ) : filteredPurchases.length === 0 ? (
          <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-2xl">
            <PackageIcon />
            <h3 className="text-xl font-bold text-white mt-4 mb-2">No purchases yet</h3>
            <p className="text-slate-400 mb-6">Start browsing the marketplace to find solutions for your agency</p>
            <button
              onClick={() => onNavigate('marketplace')}
              className="bg-primary-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-700 transition-colors"
            >
              Browse Marketplace
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPurchases.map(purchase => (
              <div
                key={purchase.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full">
                        {getItemTypeLabel(purchase.item_type)}
                      </span>
                      {getStatusBadge(purchase.status)}
                    </div>
                    <p className="text-sm text-slate-400 mb-1">
                      Purchase ID: {purchase.id}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(purchase.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">
                        ${(purchase.amount / 100).toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500">Amount Paid</p>
                    </div>

                    {purchase.status === 'completed' && purchase.item_type === 'resell_kit' && (
                      <button
                        className="flex items-center gap-2 bg-slate-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors"
                      >
                        <DownloadIcon />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
