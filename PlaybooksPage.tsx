import React from 'react';
import type { Client, Page } from '../types';

interface PlaybooksPageProps {
    clients: Client[];
    onNavigate: (page: Page, context?: any) => void;
}

export const PlaybooksPage: React.FC<PlaybooksPageProps> = ({ clients, onNavigate }) => {
    const activePlaybooks = clients.filter(c => c.playbook);

    return (
        <main className="flex-grow bg-slate-50 min-h-screen py-12 px-4 pt-24">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Client Operations</h1>
                        <p className="text-slate-500">Manage onboarding and execution for your active clients.</p>
                    </div>
                    <button onClick={() => onNavigate('addClient')} className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-700">
                        + New Client Playbook
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activePlaybooks.map(client => (
                        <div key={client.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-lg text-slate-800">{client.name}</h3>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">{client.status}</span>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between text-xs text-slate-500 mb-1">
                                    <span>Progress</span>
                                    <span>45%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => onNavigate('clientDetail', { clientId: client.id })}
                                    className="w-full py-2 border border-slate-300 text-slate-600 font-bold rounded-lg hover:bg-slate-50"
                                >
                                    Open Playbook
                                </button>
                                {/* THE UPSELL */}
                                <button
                                    onClick={() => onNavigate('resellKits')}
                                    className="w-full py-2 bg-amber-50 text-amber-700 font-bold rounded-lg text-xs hover:bg-amber-100"
                                >
                                    Need Sales Assets? Buy Kit
                                </button>
                            </div>
                        </div>
                    ))}

                    {activePlaybooks.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300">
                            <p className="text-slate-500 mb-4">No active playbooks.</p>
                            <button onClick={() => onNavigate('addClient')} className="text-primary-600 font-bold">Onboard your first client to generate one.</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};
