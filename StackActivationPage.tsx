
import React, { useState, useEffect } from 'react';
import type { SolutionStack } from './types';
import { ALL_SOLUTIONS } from './constants';
import { supabase } from './supabase';
import { useAuth } from './AuthProvider';
import { CopyBlock } from './CopyBlock';
import { SALES_SCRIPTS, LEGAL_TEMPLATES, UNIVERSAL_ONBOARDING, PERFECT_CALENDAR, REACTIVATION_ASSETS, ECOM_ASSETS } from './assets';

interface StackActivationPageProps {
    stack: SolutionStack | null;
}

const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>;
const ExternalLinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

export const StackActivationPage: React.FC<StackActivationPageProps> = ({ stack }) => {
    const { user } = useAuth();
    const [step, setStep] = useState<'provisioning' | 'success'>('provisioning');
    const [logs, setLogs] = useState<string[]>([]);
    
    // Logic to select the specific assets based on the stack ID
    // We assume specific stack IDs for Reactivation and E-com Retention based on "Outcome-Based Big 3" in memory
    const isReactivation = stack?.id === 'stack-reactivation' || stack?.name.includes('Reactivation');
    const isEcom = stack?.id === 'stack-ecom-retention' || stack?.name.includes('Retention') || stack?.name.includes('E-com');

    const specificAssets = isReactivation ? REACTIVATION_ASSETS : isEcom ? ECOM_ASSETS : null;

    useEffect(() => {
        if (step === 'provisioning') {
            const sequence = [
                { text: "Initializing activation sequence...", delay: 500 },
                { text: "Verifying user credentials...", delay: 1200 },
                { text: `Retrieving vendor manifests for ${stack?.name || 'System'}...`, delay: 2000 },
                { text: "Generating vendor referral links...", delay: 3800 },
                { text: "Saving stack configuration to profile...", delay: 4500 },
                { text: "Activation complete.", delay: 5200 },
            ];

            let timeouts: ReturnType<typeof setTimeout>[] = [];

            sequence.forEach(({ text, delay }) => {
                const timeout = setTimeout(() => {
                    setLogs(prev => [...prev, text]);
                }, delay);
                timeouts.push(timeout);
            });

            const finalTimeout = setTimeout(() => {
                setStep('success');
                // Optionally save the "activation" to the DB here if we had an `activations` table.
                // For now, we rely on the user adding clients/vendors manually after seeing the links.
            }, 6000);
            timeouts.push(finalTimeout);

            return () => timeouts.forEach(clearTimeout);
        }
    }, [step, stack]);

    const stackSolutions = stack ? ALL_SOLUTIONS.filter(s => stack.solutionIds.includes(s.id)) : [];

    const handleDownloadKit = () => {
        if (!stack) return;

        let kitContent = `LAUNCH KIT FOR: ${stack.name}\n\n`;
        kitContent += `====================================\n`;
        kitContent += `CONFIGURATION ASSETS\n`;
        kitContent += `====================================\n\n`;
        kitContent += `UNIVERSAL ONBOARDING WORKFLOW (JSON):\n`;
        kitContent += JSON.stringify(UNIVERSAL_ONBOARDING, null, 2) + `\n\n`;
        kitContent += `PERFECT CALENDAR SETUP (JSON):\n`;
        kitContent += JSON.stringify(PERFECT_CALENDAR, null, 2) + `\n\n`;

        kitContent += `====================================\n`;
        kitContent += `SALES SCRIPTS\n`;
        kitContent += `====================================\n\n`;

        if (specificAssets) {
             kitContent += `TITLE: ${specificAssets.script.title}\n`;
             kitContent += `SUBJECT: ${specificAssets.script.subject}\n`;
             kitContent += `BODY:\n${specificAssets.script.body}\n\n`;

             // @ts-ignore - contract might not exist on ECOM_ASSETS in type definition inferred but it's fine for text
             if (specificAssets.contract) kitContent += `CONTRACT TEMPLATE: ${specificAssets.contract}\n`;
             // @ts-ignore
             if (specificAssets.calculator) kitContent += `CALCULATOR: ${specificAssets.calculator}\n`;

             kitContent += `\n------------------------------------\n\n`;

        } else {
            Object.values(SALES_SCRIPTS).forEach((script: any) => {
                kitContent += `TITLE: ${script.title}\n`;
                kitContent += `SUBJECT: ${script.subject}\n`;
                kitContent += `BODY:\n${script.body}\n\n------------------------------------\n\n`;
            });
        }

        kitContent += `====================================\n`;
        kitContent += `LEGAL AGREEMENT TEMPLATE\n`;
        kitContent += `====================================\n\n`;
        kitContent += LEGAL_TEMPLATES.reseller.title + `\n\n`;
        kitContent += LEGAL_TEMPLATES.reseller.content + `\n\n`;

        const blob = new Blob([kitContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${stack.name.replace(/\s+/g, '_')}_Launch_Kit.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (step === 'provisioning') {
        return (
            <div className="min-h-screen bg-black text-green-500 font-mono p-8 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-lg shadow-2xl overflow-hidden">
                    <div className="bg-slate-800 px-4 py-2 flex gap-2 items-center border-b border-slate-700">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-slate-400 ml-2">terminal — zsh — 80x24</span>
                    </div>
                    <div className="p-6 h-96 overflow-y-auto flex flex-col justify-end">
                        {logs.map((log, i) => (
                            <div key={i} className="mb-2">
                                <span className="text-slate-500 mr-2">{`>`}</span>
                                {log}
                            </div>
                        ))}
                        <div className="animate-pulse">_</div>
                    </div>
                </div>
                <p className="text-slate-500 mt-8 text-sm">Do not close this window. Provisioning your stack...</p>
            </div>
        );
    }

    const ChecklistItem = ({ title, link, linkText }: { title: string, link: string, linkText: string }) => (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary-500/50 transition-colors">
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 border border-slate-600 shrink-0">
                    <CheckCircleIcon />
                </div>
                <div>
                     <h3 className="font-bold text-white">{title}</h3>
                     <p className="text-sm text-slate-400">Required Step</p>
                </div>
            </div>
             <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
            >
                {linkText} <ExternalLinkIcon />
            </a>
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-950 text-white pb-20">
            {/* Confetti / Success Header */}
            <div className="bg-slate-900 border-b border-slate-800 py-12 text-center px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mb-6 border border-emerald-500/50 shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]">
                    <CheckCircleIcon />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                    System Activated
                </h1>
                <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                    Your stack is ready. Use the exclusive partner links below to create your white-label accounts with the vendors.
                </p>

                 <button
                    onClick={handleDownloadKit}
                    className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
                >
                    <DownloadIcon /> Download Resell Kit
                </button>
            </div>

            {/* Vendor Links */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

                 <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8 mb-12">
                     <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black text-sm font-bold">!</span>
                        Configuration Checklist
                     </h2>
                     <p className="text-slate-300 mb-6">Complete these 3 steps to ensure your agency is legal and ready to accept payments.</p>

                     <div className="space-y-4">
                        <ChecklistItem title="1. Get Your Domain" link="https://namecheap.com" linkText="Get Domain" />
                        <ChecklistItem title="2. Register Your LLC" link="https://legalzoom.com" linkText="Register LLC" />
                        <div className="border-t border-slate-700/50 my-4 pt-4">
                            <h3 className="text-lg font-bold text-white mb-4 ml-2">3. Activate Software</h3>
                             <div className="grid grid-cols-1 gap-4">
                                {stackSolutions.map(solution => (
                                    <div key={solution.id} className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary-500/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <img src={solution.logo} alt={solution.name} className="w-12 h-12 rounded-md object-cover bg-white" />
                                            <div>
                                                <h3 className="font-bold text-white">{solution.name}</h3>
                                                <p className="text-sm text-slate-400">Required for this stack</p>
                                            </div>
                                        </div>
                                        <a
                                            href={solution.companyWebsite} // In real app, this would be an affiliate link
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                                        >
                                            Sign Up Now <ExternalLinkIcon />
                                        </a>
                                    </div>
                                ))}
                             </div>
                        </div>
                     </div>
                 </div>

                 {/* Assets Section */}
                 <div className="space-y-8 mb-12">
                    <h2 className="text-xl font-bold text-white">Your Launch Assets</h2>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Configuration Assets</h3>
                        <p className="text-slate-400 text-sm mb-4">Use these JSON configs to automate your setup.</p>
                        <CopyBlock title="Universal Onboarding (JSON)" content={UNIVERSAL_ONBOARDING} type="json" />
                        <CopyBlock title="Perfect Calendar Setup (JSON)" content={PERFECT_CALENDAR} type="json" />
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Legal Wrapper</h3>
                        <CopyBlock title="SaaS Reseller Agreement" content={LEGAL_TEMPLATES.reseller.content} />
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Sales Scripts</h3>
                        <div className="space-y-6">
                            {specificAssets ? (
                                <div>
                                    <h4 className="text-sm font-bold text-emerald-400 mb-2">{specificAssets.script.title}</h4>
                                    <CopyBlock title={`Script: ${specificAssets.script.title}`} content={`Subject: ${specificAssets.script.subject}\n\n${specificAssets.script.body}`} />

                                    {/* @ts-ignore - property existence check */}
                                    {specificAssets.contract && (
                                        <div className="mt-4">
                                            <h4 className="text-sm font-bold text-blue-400 mb-2">Contract Template</h4>
                                             <div className="p-4 bg-slate-800 rounded border border-slate-700 text-slate-300 text-sm">
                                                 <p>📄 {specificAssets.contract}</p>
                                                 <p className="text-xs text-slate-500 mt-1">Included in Download Kit</p>
                                             </div>
                                        </div>
                                    )}

                                     {/* @ts-ignore - property existence check */}
                                    {specificAssets.calculator && (
                                        <div className="mt-4">
                                            <h4 className="text-sm font-bold text-blue-400 mb-2">ROI Calculator</h4>
                                             <div className="p-4 bg-slate-800 rounded border border-slate-700 text-slate-300 text-sm">
                                                 <p>📊 {specificAssets.calculator}</p>
                                                 <p className="text-xs text-slate-500 mt-1">Included in Download Kit</p>
                                             </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                Object.entries(SALES_SCRIPTS).map(([key, script]: [string, any]) => (
                                    <div key={key}>
                                        <h4 className="text-sm font-bold text-emerald-400 mb-2">{script.title}</h4>
                                        <CopyBlock title={`Script: ${key}`} content={`Subject: ${script.subject}\n\n${script.body}`} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                 </div>

                 <h2 className="text-xl font-bold text-white mt-12 mb-6">Next Steps</h2>
                 <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center">
                     <p className="text-slate-300 mb-6">
                         Once you have created your accounts, add them to your Dashboard to start managing clients.
                     </p>
                     <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors">
                         Go to Dashboard
                     </button>
                 </div>
            </div>
        </main>
    );
};
