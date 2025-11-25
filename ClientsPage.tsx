
import React, { useEffect, useState } from 'react';
import type { Client, Page, LaunchPlaybook } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthProvider';

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;

const StatusBadge: React.FC<{ status: Client['status'] }> = ({ status }) => {
    const baseClasses = 'px-2.5 py-1 text-xs font-bold rounded-full';
    const statusClasses = {
        Onboarding: 'bg-amber-500/10 text-amber-300',
        Active: 'bg-emerald-500/10 text-emerald-300',
        Churned: 'bg-slate-500/10 text-slate-300',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

const EmptyState: React.FC<{ onAdd: () => void }> = ({ onAdd }) => (
    <div className="text-center py-16 px-4 bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg">
        <div className="mx-auto w-20 h-20 bg-primary-500/10 text-primary-400 rounded-full flex items-center justify-center">
            <UserIcon />
        </div>
        <h3 className="mt-4 text-xl font-bold text-white">No Clients Found</h3>
        <p className="mt-2 text-slate-400 max-w-md mx-auto">
            Add your first client to generate an AI-powered onboarding playbook and streamline your workflow.
        </p>
        <button
            onClick={onAdd}
            className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors"
        >
            <PlusIcon />
            Add New Client
        </button>
    </div>
);

const ClientCard: React.FC<{ client: Client, onNavigate: (page: Page, context?: any) => void }> = ({ client, onNavigate }) => {
    const progress = client.playbook && client.playbook.tasks.length > 0 ? 
        (client.playbook.tasks.filter(t => t.isCompleted).length / client.playbook.tasks.length) * 100 
        : 0;
    
    return (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 shadow-lg hover:shadow-primary-500/10 transition-all duration-300 flex flex-col group">
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <img src={`https://avatar.vercel.sh/${client.contactEmail}.svg?text=${client.name.charAt(0)}`} alt={client.name} className="w-12 h-12 rounded-full bg-slate-700" />
                        <div>
                            <h2 className="text-xl font-bold text-white">{client.name}</h2>
                            <p className="text-sm text-slate-400">{client.contactEmail}</p>
                        </div>
                    </div>
                    <StatusBadge status={client.status} />
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-700">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Services</h3>
                    <p className="text-sm font-medium text-slate-300 mt-1">{client.managedVendorIds.length} Active Services</p>
                </div>
                {client.playbook && client.playbook.tasks && client.playbook.tasks.length > 0 && (
                    <div className="mt-4">
                        <div className="flex justify-between mb-1">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Onboarding Progress</span>
                            <span className="text-sm font-medium text-primary-400">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                            <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                )}
            </div>
            <footer className="p-4 bg-slate-800 rounded-b-xl border-t border-slate-700">
                <button
                    onClick={() => onNavigate('clientDetail', { clientId: client.id })}
                    className="w-full text-center px-4 py-2 border border-transparent bg-primary-600 text-sm font-semibold rounded-lg text-white hover:bg-primary-700 transition-colors"
                >
                    {client.playbook ? 'View Playbook' : 'View Details'}
                </button>
            </footer>
        </div>
    );
};

interface ClientsPageProps {
    clients: Client[]; // Keep for compatibility but ignore
    onNavigate: (page: Page, context?: any) => void;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({ onNavigate }) => {
    const { user } = useAuth();
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchClients = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .eq('user_id', user.id);

            if (data) {
                // We need to fetch playbooks for these clients to show progress
                const clientIds = data.map(c => c.id);
                const { data: playbooksData } = await supabase
                    .from('playbooks')
                    .select('client_id, data')
                    .in('client_id', clientIds);

                const playbooksMap = new Map<string, LaunchPlaybook>();
                if (playbooksData) {
                    playbooksData.forEach(p => playbooksMap.set(p.client_id, p.data));
                }

                const mappedClients: Client[] = data.map(c => ({
                    id: c.id,
                    name: c.name,
                    contactEmail: c.contact_email,
                    status: c.status,
                    monthlySubscriptionPrice: Number(c.monthly_subscription_price),
                    managedVendorIds: c.managed_vendor_ids || [],
                    playbook: playbooksMap.get(c.id)
                }));
                setClients(mappedClients);
            }
            setLoading(false);
        };

        fetchClients();
    }, [user]);

    if (loading) {
         return (
            <div className="flex-grow flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <main className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Client Management</h1>
                        <p className="mt-1 text-slate-400">Onboard and manage your clients with AI-powered playbooks.</p>
                    </div>
                    {clients.length > 0 && (
                        <button onClick={() => onNavigate('addClient')} className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors self-start sm:self-center">
                            <PlusIcon /> Add Client
                        </button>
                    )}
                </header>

                 {clients.length === 0 ? (
                    <EmptyState onAdd={() => onNavigate('addClient')} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clients.map(client => (
                           <ClientCard key={client.id} client={client} onNavigate={onNavigate} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};
