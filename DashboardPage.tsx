
import React, { useState, useMemo, useEffect } from 'react';
import type { ManagedVendor, Client, Page, SolutionStack, Solution } from './types';
import { AddVendorModal } from './AddVendorModal';
import { supabase } from './supabase';
import { useAuth } from './AuthProvider';
import { IdentityBadge } from './IdentityBadge';
import { CURATED_STACKS, ALL_SOLUTIONS, HERO_STACKS } from './constants';

interface DashboardPageProps {
    vendors: ManagedVendor[];
    clients: Client[];
    onAddVendor: (vendor: Omit<ManagedVendor, 'id'>) => void;
    onUpdateVendor: (vendor: ManagedVendor) => void;
    onDeleteVendor: (vendorId: string) => void;
    onNavigate: (page: Page, context?: any) => void;
    onLaunchSystem?: (stack: SolutionStack) => void;
}

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const DollarSignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const LaunchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const UserPlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="17" y1="11" x2="23" y2="11"></line></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const PlayCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>;
const BookmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>;

const StatusBadge: React.FC<{ status: ManagedVendor['status'] }> = ({ status }) => {
    const baseClasses = 'px-2.5 py-1 text-xs font-bold rounded-full';
    const statusClasses = {
        Active: 'bg-emerald-500/10 text-emerald-300',
        Trial: 'bg-sky-500/10 text-sky-300',
        Inactive: 'bg-slate-500/10 text-slate-300',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

const StatCard: React.FC<{ title: string; value: string; change?: string; icon: React.ReactNode }> = ({ title, value, change, icon }) => (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-sm font-semibold text-slate-400">{title}</h3>
                <p className="text-3xl font-bold text-white mt-2">{value}</p>
            </div>
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary-500/10 text-primary-400 rounded-lg">
                {icon}
            </div>
        </div>
        {change && <p className="text-xs text-emerald-400 mt-2">{change}</p>}
    </div>
);

const RoadmapToFirstDollar: React.FC<{
    hasVendors: boolean;
    onNavigate: (page: Page, context?: any) => void;
    onAddClient: () => void;
    userProgression: any;
}> = ({ hasVendors, onNavigate, onAddClient, userProgression }) => {
    const [emailsSent, setEmailsSent] = useState(() => {
        return parseInt(localStorage.getItem('roadmap_emails_sent') || '0', 10);
    });
    const [deckCustomized, setDeckCustomized] = useState(() => {
        return localStorage.getItem('roadmap_deck_customized') === 'true';
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10) || 0;
        setEmailsSent(val);
        localStorage.setItem('roadmap_emails_sent', val.toString());
    };

    const handleDeckToggle = () => {
        const newVal = !deckCustomized;
        setDeckCustomized(newVal);
        localStorage.setItem('roadmap_deck_customized', newVal.toString());
    };

    const steps = [
        {
            id: 1,
            title: 'Select your Niche',
            description: 'Identify a high-value target market.',
            isCompleted: true, // Assumed true if they are on dashboard
            action: null
        },
        {
            id: 2,
            title: 'Activate Stack',
            description: 'Set up your core service delivery tools.',
            isCompleted: hasVendors,
            action: hasVendors ? null : (
                <button onClick={() => onNavigate('stacks')} className="text-sm text-primary-400 hover:text-primary-300 font-semibold">
                    Go to Stacks &rarr;
                </button>
            )
        },
        {
            id: 3,
            title: 'Customize Sales Deck',
            description: 'Prepare your pitch using the "Growth" template.',
            isCompleted: deckCustomized,
            action: (
                <div className="flex items-center gap-4 mt-2">
                     <button
                        onClick={() => onNavigate('demoMode', { type: 'growth' })}
                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-md text-xs font-bold text-white transition-colors"
                    >
                        <PlayCircleIcon /> Open Editor
                    </button>
                    <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                        <input type="checkbox" checked={deckCustomized} onChange={handleDeckToggle} className="rounded border-slate-600 bg-slate-700 text-primary-500" />
                        Mark as Done
                    </label>
                </div>
            )
        },
        {
            id: 4,
            title: 'Send 10 Cold Emails',
            description: 'Reach out to potential clients today.',
            isCompleted: emailsSent >= 10,
            action: (
                <div className="mt-2">
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={emailsSent}
                            onChange={handleEmailChange}
                            className="w-16 px-2 py-1 bg-slate-700 border border-slate-600 rounded-md text-white text-sm font-bold text-center"
                        />
                        <span className="text-sm text-slate-400">/ 10 sent</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 max-w-[200px]">
                        <div className="bg-primary-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${Math.min((emailsSent / 10) * 100, 100)}%` }}></div>
                    </div>
                </div>
            )
        }
    ];

    const progress = Math.round((steps.filter(s => s.isCompleted).length / steps.length) * 100);

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8 relative overflow-hidden">
             {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 relative z-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-white">Road to First Dollar 💸</h2>
                        {userProgression?.identity && (
                            <div className="px-3 py-1 rounded-full bg-slate-700 border border-slate-600 text-xs font-bold text-slate-300 flex items-center gap-2">
                                <span>Current Identity:</span>
                                <span className="text-white">{userProgression.identity.name}</span>
                            </div>
                        )}
                    </div>
                    <p className="text-slate-400">
                         {userProgression?.target_mrr
                            ? `Your Goal: Reach $${userProgression.target_mrr.toLocaleString()} MRR`
                            : 'Complete these quests to land your first client.'}
                    </p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                     <div className="text-3xl font-extrabold text-primary-400">{progress}%</div>
                     <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ready to Earn</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                {steps.map((step, i) => (
                    <div key={step.id} className={`p-4 rounded-lg border transition-all ${step.isCompleted ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-800 border-slate-700'}`}>
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-xs font-bold uppercase tracking-wider ${step.isCompleted ? 'text-emerald-400' : 'text-slate-500'}`}>Step {i + 1}</span>
                            {step.isCompleted && <CheckCircleIcon />}
                        </div>
                        <h3 className={`font-bold ${step.isCompleted ? 'text-emerald-100' : 'text-white'}`}>{step.title}</h3>
                        <p className="text-xs text-slate-400 mt-1 mb-3">{step.description}</p>
                        {step.action}
                    </div>
                ))}
            </div>

            {progress === 100 && (
                <div className="mt-6 p-4 bg-primary-600/20 border border-primary-500/30 rounded-lg flex items-center justify-between animate-fade-in-up">
                    <div>
                        <h3 className="font-bold text-white">🎉 You're Ready!</h3>
                        <p className="text-sm text-primary-200">Time to log your first win.</p>
                    </div>
                    <button onClick={onAddClient} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-lg shadow-primary-600/20 transition-all">
                        Log First Client
                    </button>
                </div>
            )}
        </div>
    );
};

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onLaunchSystem }) => {
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vendorToEdit, setVendorToEdit] = useState<ManagedVendor | null>(null);

    const [localVendors, setLocalVendors] = useState<ManagedVendor[]>([]);
    const [localClients, setLocalClients] = useState<Client[]>([]);
    const [userProgression, setUserProgression] = useState<any>(null);
    const [savedItems, setSavedItems] = useState<{id: string, type: 'stack' | 'solution', details: any}[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            setLoading(true);

            // Fetch Vendors
            const { data: vendorsData } = await supabase
                .from('managed_vendors')
                .select('*')
                .eq('user_id', user.id);

            if (vendorsData) {
                setLocalVendors(vendorsData.map(v => ({
                    id: v.id,
                    solutionId: v.solution_id,
                    name: v.name,
                    logo: v.logo || '',
                    monthlyCost: Number(v.monthly_cost),
                    contractRenewalDate: v.contract_renewal_date,
                    status: v.status,
                    supportContact: v.support_contact,
                    notes: v.notes
                })));
            }

            // Fetch Clients
            const { data: clientsData } = await supabase
                .from('clients')
                .select('*')
                .eq('user_id', user.id);

            if (clientsData) {
                setLocalClients(clientsData.map(c => ({
                    id: c.id,
                    name: c.name,
                    contactEmail: c.contact_email,
                    status: c.status,
                    monthlySubscriptionPrice: Number(c.monthly_subscription_price),
                    managedVendorIds: c.managed_vendor_ids || [],
                })));
            }

            // Fetch User Progression
            const { data: progressionData } = await supabase
                .from('user_progression')
                .select(`
                    *,
                    identity:agency_identity_levels(*)
                `)
                .eq('user_id', user.id)
                .maybeSingle();

            if (progressionData) {
                setUserProgression(progressionData);
            }

            // Fetch Saved Items
            const { data: savedData } = await supabase
                .from('saved_items')
                .select('*')
                .eq('user_id', user.id);

            if (savedData) {
                const items = savedData.map((item: any) => {
                    let details;
                    if (item.item_type === 'stack') {
                        // Try to find in HERO_STACKS first (visuals) then CURATED
                        details = HERO_STACKS.find(s => s.id === item.item_id) || CURATED_STACKS.find(s => s.id === item.item_id);
                    } else {
                        details = ALL_SOLUTIONS.find(s => s.id === item.item_id);
                    }
                    return { id: item.item_id, type: item.item_type, details };
                }).filter((i: any) => i.details); // Filter out any IDs not found in constants
                setSavedItems(items);
            }

            setLoading(false);
        };

        fetchData();
    }, [user]);

    const { totalMRR, netProfit, profitMargin, activeClientsCount } = useMemo(() => {
        const totalVendorCost = localVendors.reduce((acc, vendor) => vendor.status === 'Active' ? acc + vendor.monthlyCost : acc, 0);
        const activeClients = localClients.filter(c => c.status === 'Active');
        const mrr = activeClients.reduce((acc, client) => acc + client.monthlySubscriptionPrice, 0);
        const profit = mrr - totalVendorCost;
        const margin = mrr > 0 ? (profit / mrr) * 100 : 0;
        return { totalMRR: mrr, netProfit: profit, profitMargin: margin, activeClientsCount: activeClients.length };
    }, [localClients, localVendors]);

    const handleOpenAddModal = () => {
        setVendorToEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (vendor: ManagedVendor) => {
        setVendorToEdit(vendor);
        setIsModalOpen(true);
    };

    const handleSaveVendor = async (vendor: ManagedVendor | Omit<ManagedVendor, 'id'>) => {
        if (!user) return;

        const vendorData = {
            user_id: user.id,
            name: vendor.name,
            solution_id: vendor.solutionId,
            logo: vendor.logo,
            monthly_cost: vendor.monthlyCost,
            contract_renewal_date: vendor.contractRenewalDate,
            status: vendor.status,
            support_contact: vendor.supportContact,
            notes: vendor.notes
        };

        if ('id' in vendor) {
            // Update
            const { error } = await supabase
                .from('managed_vendors')
                .update(vendorData)
                .eq('id', vendor.id);

            if (!error) {
                setLocalVendors(prev => prev.map(v => v.id === vendor.id ? { ...vendor, id: vendor.id } as ManagedVendor : v));
            }
        } else {
            // Insert
            const { data, error } = await supabase
                .from('managed_vendors')
                .insert([vendorData])
                .select();

            if (!error && data) {
                const newVendor = {
                    ...vendor,
                    id: data[0].id
                } as ManagedVendor;
                setLocalVendors(prev => [...prev, newVendor]);
            }
        }
    };

    const handleDeleteVendor = async (vendorId: string) => {
        if (!window.confirm('Are you sure you want to delete this vendor?')) return;

        const { error } = await supabase
            .from('managed_vendors')
            .delete()
            .eq('id', vendorId);

        if (!error) {
            setLocalVendors(prev => prev.filter(v => v.id !== vendorId));
        }
    };

    const handleRemoveSavedItem = async (itemId: string, itemType: string) => {
        const { error } = await supabase
            .from('saved_items')
            .delete()
            .eq('user_id', user!.id)
            .eq('item_id', itemId)
            .eq('item_type', itemType);

        if (!error) {
            setSavedItems(prev => prev.filter(i => i.id !== itemId));
        }
    };

    if (loading) {
         return (
            <div className="flex-grow flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <main className="flex-grow pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Agency Command Center</h1>
                    <p className="mt-1 text-slate-400">Your agency's SaaS business at a glance.</p>
                </header>
                
                <section className="mb-8 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                    <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button onClick={() => onNavigate('stacks')} className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-primary-500 transition-colors">
                           <div className="w-12 h-12 flex items-center justify-center bg-primary-500/10 text-primary-400 rounded-lg"><LaunchIcon /></div>
                           <div>
                             <h3 className="font-bold text-white text-left">Launch New System</h3>
                             <p className="text-sm text-slate-400 text-left">Explore curated stacks and generate a playbook for a new client.</p>
                           </div>
                        </button>
                         <button onClick={() => onNavigate('addClient')} className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-primary-500 transition-colors">
                           <div className="w-12 h-12 flex items-center justify-center bg-primary-500/10 text-primary-400 rounded-lg"><UserPlusIcon /></div>
                           <div>
                             <h3 className="font-bold text-white text-left">Onboard a Client</h3>
                             <p className="text-sm text-slate-400 text-left">Manually add a client and generate their AI-powered playbook.</p>
                           </div>
                        </button>
                    </div>
                </section>

                {activeClientsCount === 0 ? (
                    <RoadmapToFirstDollar
                        hasVendors={localVendors.length > 0}
                        onNavigate={onNavigate}
                        onAddClient={() => onNavigate('addClient')}
                        userProgression={userProgression}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard title="Total MRR" value={`$${totalMRR.toLocaleString()}`} icon={<DollarSignIcon />} />
                        <StatCard title="Net Profit" value={`$${netProfit.toLocaleString()}`} icon={<TrendingUpIcon />} />
                        <StatCard title="Profit Margin" value={`${profitMargin.toFixed(1)}%`} icon={<TrendingUpIcon />} />
                        <StatCard title="Active Clients" value={activeClientsCount.toString()} icon={<UsersIcon />} />
                    </div>
                )}

                {/* Saved Items Section */}
                {savedItems.length > 0 && (
                    <section className="mb-8 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <BookmarkIcon /> Saved Stacks & Power-Ups
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {savedItems.map(item => (
                                <div key={item.id} className="flex items-start p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-primary-500/50 transition-colors relative group">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleRemoveSavedItem(item.id, item.type); }}
                                        className="absolute top-2 right-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Remove"
                                    >
                                        <TrashIcon />
                                    </button>
                                    <div className="flex-grow cursor-pointer" onClick={() => {
                                        if (item.type === 'stack') {
                                            // Map HeroStack ID to SolutionStack if needed, or just pass detail
                                            // If item.details has solutionIds, find matching CURATED_STACK
                                            const matching = CURATED_STACKS.find(s => s.id === item.id) ||
                                                             CURATED_STACKS.find(s => item.details.solutionIds?.every((sid: string) => s.solutionIds.includes(sid)));
                                            if (matching && onLaunchSystem) {
                                                onLaunchSystem(matching);
                                            } else {
                                                // Fallback to navigating to detail page if launch handler missing or just to view
                                                // Ideally we navigate to detail page first
                                                onNavigate('systemDetail', { stack: matching || item.details });
                                            }
                                        } else {
                                            onNavigate('solutionDetail', { solution: item.details });
                                        }
                                    }}>
                                        <div className="flex items-center gap-3 mb-2">
                                             {item.type === 'stack'
                                                ? <div className="p-2 bg-orange-500/10 rounded text-orange-400"><LaunchIcon /></div>
                                                : <img src={item.details.logo} alt={item.details.name} className="w-8 h-8 rounded bg-white p-1" />
                                            }
                                            <div>
                                                <h3 className="font-bold text-white text-sm">{item.details.title || item.details.name}</h3>
                                                <p className="text-xs text-slate-500 capitalize">{item.type}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-slate-800/50 rounded-xl border border-slate-700">
                        <div className="p-4 flex justify-between items-center border-b border-slate-700">
                            <h2 className="font-bold text-white">System & Vendor Management</h2>
                            <button onClick={handleOpenAddModal} className="text-sm font-semibold text-primary-400 hover:text-primary-300">Add Vendor</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-400">
                                <thead className="bg-slate-800 text-xs text-slate-400 uppercase">
                                    <tr>
                                        <th scope="col" className="p-4">Vendor</th>
                                        <th scope="col" className="p-4">Status</th>
                                        <th scope="col" className="p-4">Monthly Cost</th>
                                        <th scope="col" className="p-4">Renewal Date</th>
                                        <th scope="col" className="p-4"><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {localVendors.map(vendor => (
                                        <tr key={vendor.id} className="border-b border-slate-700 last:border-0 hover:bg-slate-800">
                                            <td className="p-4 font-medium text-white whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <img src={vendor.logo || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded-md object-cover" />
                                                    <span>{vendor.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4"><StatusBadge status={vendor.status} /></td>
                                            <td className="p-4 font-medium text-slate-300">${vendor.monthlyCost.toLocaleString()}</td>
                                            <td className="p-4">{new Date(vendor.contractRenewalDate).toLocaleDateString()}</td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => handleOpenEditModal(vendor)} className="p-2 text-slate-400 hover:text-primary-400 hover:bg-slate-700 rounded-md"><EditIcon /></button>
                                                    <button onClick={() => handleDeleteVendor(vendor.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md"><TrashIcon /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {localVendors.length === 0 && (
                                         <tr>
                                            <td colSpan={5} className="p-8 text-center text-slate-500">
                                                No vendors managed yet. Add one to get started.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 rounded-xl border border-slate-700">
                         <div className="p-4 flex justify-between items-center border-b border-slate-700">
                            <h2 className="font-bold text-white">Client Operations</h2>
                            <button onClick={() => onNavigate('clients')} className="text-sm font-semibold text-primary-400 hover:text-primary-300">View All</button>
                        </div>
                        <div className="p-4 space-y-3">
                            {localClients.slice(0, 5).map(client => (
                                <div key={client.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                    <div className="flex items-center gap-3">
                                         <img src={`https://avatar.vercel.sh/${client.contactEmail}.svg?text=${client.name.charAt(0)}`} alt={client.name} className="w-10 h-10 rounded-full bg-slate-700" />
                                         <div>
                                            <p className="font-semibold text-white">{client.name}</p>
                                            <p className="text-xs text-slate-400">{client.status}</p>
                                         </div>
                                    </div>
                                    <button onClick={() => onNavigate('clientDetail', {clientId: client.id})} className="text-xs font-bold text-slate-300 bg-slate-700 px-3 py-1 rounded-md hover:bg-slate-600">View</button>
                                </div>
                            ))}
                            {localClients.length === 0 && (
                                <div className="p-4 text-center text-slate-500">
                                    No clients yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <AddVendorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveVendor}
                vendorToEdit={vendorToEdit}
            />
        </main>
    );
};
