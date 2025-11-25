

import React, { useState } from 'react';
import type { Client, ManagedVendor, Page, PricingTier, WebsiteTemplateContent, OnboardingCourseOutline, KnowledgeBaseArticle, NetNegativeBonus, IntegrationGuide } from '../types';
import { generateBrandNames } from '../services/geminiService';

const ClipboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>;
const ExternalLinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const PainPointIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>;
const XCircleIconRed = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
const SystemIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20V16"></path></svg>;
const PlusIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5 12 2z"></path></svg>;
const FolderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 fill-blue-400/20"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>;
const FileIcon = ({ type }: { type: 'pdf' | 'doc' | 'json' | 'txt' }) => {
    const colors = {
        pdf: 'text-red-400',
        doc: 'text-blue-400',
        json: 'text-yellow-400',
        txt: 'text-slate-400'
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={colors[type]}>
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
            <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
    );
};
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;

interface ClientDetailPageProps {
    client: Client;
    onUpdateClient: (client: Client) => void;
    onBack: () => void;
    managedVendors: ManagedVendor[];
    onNavigate: (page: Page, context?: any) => void;
}

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${active ? 'bg-slate-700 text-primary-300' : 'text-slate-400 hover:bg-slate-800'}`}>
        {children}
    </button>
);

const PricingTierCard: React.FC<{ tier: PricingTier }> = ({ tier }) => (
    <div className="flex-1 p-6 bg-slate-800 border border-slate-700 rounded-lg flex flex-col">
        <h3 className="text-lg font-bold text-primary-400">{tier.name}</h3>
        <p className="text-3xl font-extrabold text-white my-2">{tier.price}</p>
        <ul className="space-y-2 text-sm text-slate-300 mt-4 flex-grow">
            {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0"><CheckCircleIcon /></div>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);

const BonusCard: React.FC<{ bonus: NetNegativeBonus }> = ({ bonus }) => (
    <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-md">
        <div className="w-8 h-8 flex items-center justify-center bg-emerald-500/10 rounded-full flex-shrink-0">
             <PlusIcon className="text-emerald-400" />
        </div>
        <div>
            <p className="font-semibold text-white">{bonus.service}</p>
            <p className="text-sm text-slate-400">Cancel this, save ~{bonus.estimatedCost}/mo</p>
        </div>
    </div>
);

interface VirtualFile {
    name: string;
    type: 'pdf' | 'doc' | 'json' | 'txt';
    content: string | object;
    date: string;
}

interface VirtualFolder {
    name: string;
    files: VirtualFile[];
}

const FilePreviewModal: React.FC<{ file: VirtualFile | null; onClose: () => void }> = ({ file, onClose }) => {
    const [copied, setCopied] = useState(false);

    if (!file) return null;

    const contentString = typeof file.content === 'string'
        ? file.content
        : JSON.stringify(file.content, null, 2);

    const handleCopy = () => {
        navigator.clipboard.writeText(contentString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-3xl h-[80vh] flex flex-col shadow-2xl">
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <FileIcon type={file.type} />
                        <div>
                            <h3 className="font-bold text-white">{file.name}</h3>
                            <p className="text-xs text-slate-400">Last modified: {file.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors"
                        >
                            {copied ? <CheckCircleIcon /> : <ClipboardIcon />}
                            {copied ? 'Copied!' : 'Copy Content'}
                        </button>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                            <XIcon />
                        </button>
                    </div>
                </div>
                <div className="flex-grow overflow-auto p-6 bg-slate-900/50">
                    <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap font-sans">
                        {contentString}
                    </pre>
                </div>
                <div className="p-4 border-t border-slate-700 bg-slate-800 rounded-b-xl flex justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white text-sm font-semibold">
                        <DownloadIcon /> Download as .{file.type}
                    </button>
                </div>
            </div>
        </div>
    );
};

const AssetVault: React.FC<{ playbook: Client['playbook'] }> = ({ playbook }) => {
    const [selectedFile, setSelectedFile] = useState<VirtualFile | null>(null);

    if (!playbook) return null;

    // Map playbook data to virtual file structure
    const folders: VirtualFolder[] = [
        {
            name: '01_Sales_Assets',
            files: [
                ...(playbook.emails?.map((email, i) => ({
                    name: `Email_Sequence_0${i+1}_${email.purpose.replace(/\s+/g, '_')}.txt`,
                    type: 'txt' as const,
                    content: `Subject: ${email.subject}\n\n${email.body}`,
                    date: new Date().toLocaleDateString()
                })) || []),
                ...(playbook.salesFunnelSteps?.map((step, i) => ({
                    name: `Sales_Script_Step_${i+1}.txt`,
                    type: 'txt' as const,
                    content: `Step: ${step.stepName}\n\n${step.description}`,
                    date: new Date().toLocaleDateString()
                })) || []),
                ...(playbook.leadMagnets?.map((magnet, i) => ({
                    name: `Lead_Magnet_${i+1}.txt`,
                    type: 'txt' as const,
                    content: `Title: ${magnet.title}\n\nDescription: ${magnet.description}\n\nCTA: ${magnet.cta}`,
                    date: new Date().toLocaleDateString()
                })) || [])
            ]
        },
        {
            name: '02_Legal',
            files: [
                {
                    name: 'Service_Agreement_Template.doc',
                    type: 'doc',
                    content: "SERVICE AGREEMENT\n\nThis Service Agreement (the 'Agreement') is entered into by and between [Agency Name] and [Client Name]...",
                    date: new Date().toLocaleDateString()
                },
                {
                    name: 'Privacy_Policy_Template.doc',
                    type: 'doc',
                    content: "PRIVACY POLICY\n\nWe respect your privacy and are committed to protecting it through our compliance with this policy...",
                    date: new Date().toLocaleDateString()
                },
                {
                    name: 'NDA_Template.doc',
                    type: 'doc',
                    content: "NON-DISCLOSURE AGREEMENT\n\nThis Non-Disclosure Agreement (the 'Agreement') is entered into...",
                    date: new Date().toLocaleDateString()
                }
            ]
        },
        {
            name: '03_Technical_Setup',
            files: [
                ...(playbook.websiteTemplateContent ? [{
                    name: 'Website_Copy_Export.json',
                    type: 'json' as const,
                    content: playbook.websiteTemplateContent,
                    date: new Date().toLocaleDateString()
                }] : []),
                ...(playbook.integrationGuide ? [{
                    name: 'Integration_Setup_Guide.txt',
                    type: 'txt' as const,
                    content: `Title: ${playbook.integrationGuide.title}\nOutcome: ${playbook.integrationGuide.outcome}\n\nSteps:\n${playbook.integrationGuide.steps.map(s => `${s.step}. ${s.action}: ${s.details}`).join('\n')}`,
                    date: new Date().toLocaleDateString()
                }] : []),
                ...(playbook.systemOverview ? [{
                    name: 'System_Architecture_Overview.txt',
                    type: 'txt' as const,
                    content: playbook.systemOverview,
                    date: new Date().toLocaleDateString()
                }] : [])
            ]
        }
    ];

    return (
        <>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-700 bg-slate-800">
                    <h2 className="text-xl font-bold text-white">Asset Vault</h2>
                    <p className="text-sm text-slate-400">Your secured, "Done-For-You" launch assets.</p>
                </div>

                <div className="p-6 grid gap-8">
                    {folders.map((folder) => (
                        <div key={folder.name}>
                            <div className="flex items-center gap-2 mb-4">
                                <FolderIcon />
                                <h3 className="font-bold text-slate-200 text-lg">{folder.name}</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {folder.files.length > 0 ? (
                                    folder.files.map((file, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedFile(file)}
                                            className="flex items-start gap-3 p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/5 transition-all group text-left"
                                        >
                                            <div className="mt-1 group-hover:scale-110 transition-transform">
                                                <FileIcon type={file.type} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-slate-300 group-hover:text-white truncate">{file.name}</p>
                                                <p className="text-xs text-slate-500 mt-1">{file.type.toUpperCase()} • {file.date}</p>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="col-span-full p-4 text-sm text-slate-500 italic border border-dashed border-slate-700 rounded-lg">
                                        No assets in this folder yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedFile && (
                <FilePreviewModal
                    file={selectedFile}
                    onClose={() => setSelectedFile(null)}
                />
            )}
        </>
    );
};

const IntegrationGuideDisplay: React.FC<{ guide: IntegrationGuide }> = ({ guide }) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-1">{guide.title}</h2>
            <p className="text-slate-400 mb-4">{guide.outcome}</p>
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <img src={guide.tool1.logo} alt={guide.tool1.name} className="w-8 h-8 rounded-md" />
                    <span className="font-semibold text-white">{guide.tool1.name}</span>
                </div>
                <ArrowRightIcon />
                <div className="flex items-center gap-2">
                    <img src={guide.tool2.logo} alt={guide.tool2.name} className="w-8 h-8 rounded-md" />
                    <span className="font-semibold text-white">{guide.tool2.name}</span>
                </div>
            </div>
            <div className="space-y-4">
                {guide.steps.map(step => (
                    <div key={step.step} className="p-4 bg-slate-800 rounded-lg">
                        <h3 className="font-bold text-primary-400">Step {step.step}: {step.action}</h3>
                        <p className="text-sm text-slate-300 mt-1">{step.details}</p>
                        {step.snippet && (
                            <pre className="mt-2 p-3 bg-slate-900 rounded-md text-xs text-slate-300 overflow-x-auto"><code>{step.snippet.code}</code></pre>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const BrandNameBrainstormer: React.FC<{ systemOverview?: string }> = ({ systemOverview }) => {
    const [names, setNames] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleBrainstorm = async () => {
        if (!systemOverview) {
            setError("No system overview available to generate names.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateBrandNames(systemOverview);
            setNames(result);
        } catch (err) {
            setError("Failed to generate brand names.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Marketing Kit</h2>
            <div className="p-4 bg-slate-800 rounded-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-white">Brand Name Brainstormer</h3>
                        <p className="text-sm text-slate-400">Generate creative names for this service.</p>
                    </div>
                    <button onClick={handleBrainstorm} disabled={isLoading} className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-600 text-sm font-semibold rounded-lg text-white hover:bg-secondary-700 disabled:opacity-50">
                        <SparklesIcon /> {isLoading ? "Generating..." : "Brainstorm"}
                    </button>
                </div>
                {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
                {names.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {names.map(name => (
                            <div key={name} className="p-2 bg-slate-700 rounded-md text-center font-semibold text-slate-300">
                                {name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export const ClientDetailPage: React.FC<ClientDetailPageProps> = ({ client, onUpdateClient, onBack, managedVendors, onNavigate }) => {
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const [price, setPrice] = useState(client.monthlySubscriptionPrice);

    if (!client.playbook) {
        return (
             <main className="flex-grow">
                 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                     <button onClick={onBack} className="text-sm font-semibold text-primary-400 hover:text-primary-300 mb-4">
                        &larr; Back to Clients
                    </button>
                    <div className="bg-slate-800 p-8 text-center rounded-xl">
                        <h1 className="text-2xl font-bold text-white">{client.name}</h1>
                        <p>No playbook has been generated for this client yet.</p>
                    </div>
                 </div>
             </main>
        );
    }
    
    const handleTaskToggle = (taskId: string) => {
        const updatedTasks = client.playbook!.tasks.map(task => 
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        );
        onUpdateClient({ ...client, playbook: { ...client.playbook!, tasks: updatedTasks } });
    };

    const handlePriceSave = () => {
        onUpdateClient({ ...client, monthlySubscriptionPrice: Number(price) });
        setIsEditingPrice(false);
    };

    const tasks = client.playbook.tasks;
    const completedTasks = tasks.filter(t => t.isCompleted).length;
    const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

    return (
        <main className="flex-grow">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-6">
                    <button onClick={onBack} className="text-sm font-semibold text-primary-400 hover:text-primary-300">
                        &larr; Back to Clients
                    </button>
                </div>

                <header className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight">{client.name}'s Launch Playbook</h1>
                            <p className="mt-1 text-slate-400">Generated by AI to streamline onboarding and sales.</p>
                        </div>
                         <button 
                            onClick={() => onNavigate('clientPortal', { clientId: client.id })}
                            className="flex-shrink-0 self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 border border-slate-600 bg-slate-700 text-sm font-semibold rounded-lg text-slate-300 hover:bg-slate-600 transition-colors"
                        >
                            <ExternalLinkIcon />
                            View Client Portal
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {client.playbook.irresistibleOffer && (
                            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                <h2 className="text-xl font-bold text-white mb-4">The Irresistible Offer</h2>
                                <blockquote className="p-4 bg-amber-500/10 border-l-4 border-amber-400 text-amber-200 font-semibold text-lg">
                                    "{client.playbook.irresistibleOffer.costVsResultStatement}"
                                </blockquote>
                                <h3 className="text-lg font-bold text-white mt-6 mb-2">Services Your Client Can Cancel</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {client.playbook.irresistibleOffer.netNegativeBonuses.map((bonus, i) => (
                                        <BonusCard key={i} bonus={bonus} />
                                    ))}
                                </div>
                            </div>
                        )}
                         <BrandNameBrainstormer systemOverview={client.playbook.systemOverview} />
                         {client.playbook.integrationGuide && (
                            <IntegrationGuideDisplay guide={client.playbook.integrationGuide} />
                         )}
                        <AssetVault playbook={client.playbook} />
                        {client.playbook.suggestedPricingTiers && (
                             <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                <h2 className="text-xl font-bold text-white mb-4">Suggested Pricing Tiers</h2>
                                <div className="flex flex-col md:flex-row gap-4">
                                    {client.playbook.suggestedPricingTiers.map((tier, i) => <PricingTierCard key={i} tier={tier} />)}
                                </div>
                            </div>
                        )}
                    </div>

                    <aside className="space-y-8">
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                             <h2 className="text-xl font-bold text-white mb-4">Client Vitals</h2>
                             <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-slate-800 rounded-md">
                                    <span className="font-medium text-slate-300">Monthly Price</span>
                                    {isEditingPrice ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-white">$</span>
                                            <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-24 p-1 text-right font-bold border-slate-600 bg-slate-700 text-white rounded-md" />
                                            <button onClick={handlePriceSave} className="px-2 py-1 bg-primary-600 text-white text-xs font-bold rounded hover:bg-primary-700">Save</button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-white">${client.monthlySubscriptionPrice.toLocaleString()}</span>
                                            <button onClick={() => setIsEditingPrice(true)} className="p-1 text-slate-400 hover:text-white"><EditIcon /></button>
                                        </div>
                                    )}
                                </div>
                             </div>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <h2 className="text-xl font-bold text-white mb-4">Onboarding Checklist</h2>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-primary-400">Progress</span>
                                <span className="text-sm font-medium text-primary-400">{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2.5">
                                <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                             <ul className="space-y-3 mt-4 max-h-80 overflow-y-auto pr-2">
                                {tasks.map(task => (
                                    <li key={task.id} className="p-3 bg-slate-800 rounded-md flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            checked={task.isCompleted}
                                            onChange={() => handleTaskToggle(task.id)}
                                            id={`task-${task.id}`}
                                            className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-primary-500 focus:ring-primary-500 focus:ring-offset-slate-800 mt-0.5"
                                        />
                                        <label htmlFor={`task-${task.id}`} className="flex-1">
                                            <span className={`font-medium text-slate-300 ${task.isCompleted ? 'line-through text-slate-500' : ''}`}>{task.title}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {client.playbook.systemOverview && (
                            <div className="bg-primary-500/10 p-6 rounded-xl border border-primary-500/30">
                                <h2 className="text-xl font-bold text-primary-300 flex items-center gap-3">
                                    <SystemIcon /> System Overview
                                </h2>
                                <blockquote className="mt-4 p-4 bg-slate-800 border-l-4 border-primary-400 text-slate-300 italic">
                                    {client.playbook.systemOverview}
                                </blockquote>
                            </div>
                        )}
                        {client.playbook.clientPainPoints && client.playbook.clientPainPoints.length > 0 && (
                            <div className="bg-rose-500/10 p-6 rounded-xl border border-rose-500/30">
                                <h2 className="text-xl font-bold text-rose-300 flex items-center gap-3">
                                    <PainPointIcon /> Client Pains
                                </h2>
                                <ul className="mt-4 space-y-2">
                                    {client.playbook.clientPainPoints.map((point, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-300 font-medium">
                                            <div className="mt-1 flex-shrink-0"><XCircleIconRed /></div>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </main>
    );
};