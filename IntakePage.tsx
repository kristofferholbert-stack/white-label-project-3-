import React, { useState, useEffect } from 'react';
import type { Page, HeroStack, IntakeResponse, SolutionStack } from './types';
import { CURATED_STACKS } from './constants';
import { StackDetailPanel } from './StackDetailPanel';
import { IdentityBadge } from './IdentityBadge';
import { GapAnalysis } from './GapAnalysis';
import { TripwireCard } from './TripwireCard';
import { LockedOverlay } from './LockedOverlay';
import { generateLaunchPlaybook } from './geminiService';
import { getSubscriptionStatus } from './stripeService';
import { supabase } from './supabase';
import { useAuth } from './AuthProvider';

interface IntakePageProps {
  onNavigate: (page: Page) => void;
}

const identityLevels = [
  {
    name: 'Agency Apprentice',
    slug: 'agency-apprentice',
    min_mrr: 0,
    max_mrr: 5000,
    badge_icon: '🌱',
    badge_color: '#10b981',
    description: 'Building your first revenue streams',
    benefits: ['Access to starter stacks', 'Basic implementation guides', 'Community forum access']
  },
  {
    name: 'Growth Partner',
    slug: 'growth-partner',
    min_mrr: 5000,
    max_mrr: 25000,
    badge_icon: '🚀',
    badge_color: '#3b82f6',
    description: 'Scaling to replace full-time income',
    benefits: ['Advanced automation stacks', 'Priority support', 'Monthly coaching calls', 'Wholesale pricing']
  },
  {
    name: 'Empire Scale',
    slug: 'empire-scale',
    min_mrr: 25000,
    max_mrr: null,
    badge_icon: '👑',
    badge_color: '#f59e0b',
    description: 'Running a 7-figure agency empire',
    benefits: ['White-label platform', 'Dedicated success manager', 'Custom stacks', 'Co-marketing']
  }
];

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

export const IntakePage: React.FC<IntakePageProps> = ({ onNavigate }) => {
    const { user } = useAuth();
    const [step, setStep] = useState<number>(0);
    const [answers, setAnswers] = useState<IntakeResponse>({
        agencyType: '',
        niches: [],
        currentOffers: [],
        desiredAddons: [],
        revenueGoal: '',
        crmStatus: ''
    });
    const [currentMRR, setCurrentMRR] = useState<number>(0);
    const [targetMRR, setTargetMRR] = useState<number>(0);
    const [currentLevel, setCurrentLevel] = useState(identityLevels[0]);
    const [nextLevel, setNextLevel] = useState(identityLevels[1]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedStack, setSelectedStack] = useState<SolutionStack | null>(null);
    const [saving, setSaving] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const checkSubscription = async () => {
            if (user) {
                const status = await getSubscriptionStatus();
                setIsSubscribed(!!status);
            }
        };
        checkSubscription();
    }, [user]);

    // Check if we should show results after signup
    useEffect(() => {
        const checkForResults = async () => {
            // Check both URL param AND sessionStorage for reliability
            const hash = window.location.hash;
            const params = new URLSearchParams(hash.split('?')[1]);
            const hasUrlFlag = params.get('showResults') === 'true';
            const hasStorageFlag = sessionStorage.getItem('show_intake_results') === 'true';

            console.log('IntakePage: Checking for results', {
                hasUrlFlag,
                hasStorageFlag,
                hasUser: !!user,
                hash: window.location.hash
            });

            if ((hasUrlFlag || hasStorageFlag) && user) {
                // Clear the session flag so we don't show again
                sessionStorage.removeItem('show_intake_results');

                console.log('IntakePage: User authenticated, loading results data');

                // User just signed up and completed intake - load their data
                setIsAnalyzing(true);

                try {
                    // First try to load from localStorage (just saved)
                    const pendingDataStr = localStorage.getItem('pending_intake_data');

                    if (pendingDataStr) {
                        const savedData = JSON.parse(pendingDataStr);

                        // Check if data has expired (30 minutes)
                        if (savedData.expiresAt && Date.now() > savedData.expiresAt) {
                            console.log('IntakePage: Data expired, loading from database');
                            localStorage.removeItem('pending_intake_data');
                            // Fall through to database load
                        } else {
                            console.log('IntakePage: Loading from localStorage', {
                                currentMRR: savedData.currentMRR,
                                targetMRR: savedData.targetMRR
                            });

                            // Populate state with saved data
                            setCurrentMRR(savedData.currentMRR);
                            setTargetMRR(savedData.targetMRR);
                            setAnswers(savedData.answers);

                            // Clear the localStorage now that we've loaded it
                            localStorage.removeItem('pending_intake_data');

                            // Show results after brief delay
                            setTimeout(() => {
                                setIsAnalyzing(false);
                                setShowResults(true);
                                console.log('IntakePage: Results displayed');
                            }, 1500);

                            return; // Early return - don't try database
                        }
                    }

                    // If we get here, localStorage was empty or expired - try database
                    console.log('IntakePage: Loading from database');
                    const { data: progressionData } = await supabase
                        .from('user_progression')
                        .select('*')
                        .eq('user_id', user.id)
                        .maybeSingle();

                    if (progressionData) {
                        console.log('IntakePage: Loaded from database', {
                            currentMRR: progressionData.current_mrr,
                            targetMRR: progressionData.target_mrr
                        });

                        setCurrentMRR(progressionData.current_mrr);
                        setTargetMRR(progressionData.target_mrr - progressionData.current_mrr);
                        setAnswers(progressionData.intake_responses);

                        setTimeout(() => {
                            setIsAnalyzing(false);
                            setShowResults(true);
                            console.log('IntakePage: Results displayed from DB');
                        }, 1500);
                    } else {
                        // No data found, redirect to dashboard
                        console.log('IntakePage: No data found, redirecting to dashboard');
                        onNavigate('dashboard');
                    }
                } catch (error) {
                    console.error('Failed to load intake results:', error);
                    // Fallback to dashboard on error
                    onNavigate('dashboard');
                }
            }
        };

        checkForResults();
    }, [user, onNavigate]);

    const questions = [
        {
            id: 'currentMRR',
            label: "What's your current Monthly Recurring Revenue (MRR)?",
            options: [
                { label: '$0 - $2,500', value: 1250 },
                { label: '$2,500 - $5,000', value: 3750 },
                { label: '$5,000 - $10,000', value: 7500 },
                { label: '$10,000 - $25,000', value: 17500 },
                { label: '$25,000 - $50,000', value: 37500 },
                { label: '$50,000+', value: 75000 }
            ],
            multi: false,
            type: 'mrr'
        },
        {
            id: 'revenueGoal',
            label: "Agency Identity: Where do you want to be in 90 days?",
            options: [
                { label: 'Add $5k MRR', value: 5000 },
                { label: 'Add $10k MRR', value: 10000 },
                { label: 'Add $20k MRR', value: 20000 },
                { label: 'Add $50k MRR', value: 50000 }
            ],
            multi: false,
            type: 'target'
        },
        {
            id: 'agencyType',
            label: "Which best describes your agency today?",
            options: ["Solo consultant (0–1 employees)", "Small team (2–5 employees)", "Growing agency (6–15 employees)", "Larger agency (16+ employees)"],
            multi: false
        },
        {
            id: 'desiredAddons',
            label: "Which services do you want to add WITHOUT hiring?",
            subLabel: "Select all that apply",
            options: ["Local SEO", "Reputation Management", "Google Ads / PPC", "AI Chatbots", "Social Media", "Content Creation"],
            multi: true
        },
        {
            id: 'niches',
            label: "What industries do you primarily serve?",
            subLabel: "Pick up to 3",
            options: ["Home services (roofing, HVAC, etc.)", "Medical / dental", "Local brick & mortar", "B2B / SaaS", "E-com", "Other"],
            multi: true,
            max: 3
        },
         {
            id: 'crmStatus',
            label: "Do you already use GoHighLevel or a similar CRM?",
            options: ["Yes, GoHighLevel", "Yes, something else", "No, not yet"],
            multi: false
        }
    ];

    useEffect(() => {
        const level = identityLevels.find(
            l => currentMRR >= l.min_mrr && (!l.max_mrr || currentMRR < l.max_mrr)
        ) || identityLevels[0];

        const nextIdx = identityLevels.indexOf(level) + 1;
        const next = nextIdx < identityLevels.length ? identityLevels[nextIdx] : null;

        setCurrentLevel(level);
        setNextLevel(next);
    }, [currentMRR]);

    const saveProgression = async () => {
        // Logic extracted to be reusable or we just use logic inside handleLeadSubmit for unauth users
        if (!user) return;

        setSaving(true);
        try {
            const { data: levelData } = await supabase
                .from('agency_identity_levels')
                .select('id')
                .eq('slug', currentLevel.slug)
                .maybeSingle();

            await supabase
                .from('user_progression')
                .upsert({
                    user_id: user.id,
                    current_level_id: levelData?.id,
                    current_mrr: currentMRR,
                    target_mrr: currentMRR + targetMRR,
                    intake_responses: answers,
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: 'user_id'
                });
        } catch (error) {
            console.error('Failed to save progression:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleOptionClick = (questionId: string, option: any, isMulti: boolean, max?: number) => {
        const currentQ = questions.find(q => q.id === questionId);

        if (currentQ?.type === 'mrr') {
            setCurrentMRR(option.value);
            setAnswers(prev => ({ ...prev, [questionId]: option.label }));
        } else if (currentQ?.type === 'target') {
            setTargetMRR(option.value);
            setAnswers(prev => ({ ...prev, [questionId]: option.label }));
        } else {
            setAnswers(prev => {
                const current = prev[questionId as keyof IntakeResponse];
                if (isMulti && Array.isArray(current)) {
                    if (current.includes(option)) {
                        return { ...prev, [questionId]: current.filter(item => item !== option) };
                    }
                    if (max && current.length >= max) return prev;
                    return { ...prev, [questionId]: [...current, option] };
                }
                return { ...prev, [questionId]: option };
            });
        }
    };

    const handleNext = () => {
        const nextStep = step + 1;

        // If we've completed all questions and user is not logged in, proceed to signup
        if (nextStep > questions.length && !user) {
            handleLeadSubmit();
        } else {
            setStep(nextStep);
        }
    };

    const handleLeadSubmit = async () => {
        setIsAnalyzing(true);

        // If user is NOT logged in, save to localStorage and redirect to Signup
        if (!user) {
            const pendingData = {
                answers,
                currentMRR,
                targetMRR,
                currentLevelSlug: currentLevel.slug
            };
            localStorage.setItem('pending_intake_data', JSON.stringify(pendingData));

            // Simulate analysis delay for effect
            setTimeout(() => {
                 setIsAnalyzing(false);
                 // Redirect to Signup with context
                 // Using window.location.hash style as per App.tsx
                 window.location.hash = '#signup?role=agency&flow=intake';
            }, 1500);
            return;
        }

        // If user IS logged in, save to DB and show results
        await saveProgression();

        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
        }, 2000);
    };

    const recommendedStacks = CURATED_STACKS.slice(0, 3);

    const handleLaunchStack = async (stack: SolutionStack) => {
        const userNiche = answers.niches[0] || stack.targetNiche;

        try {
            const playbook = await generateLaunchPlaybook("Ideal Client", stack.solutionIds, userNiche);
            console.log("Generated Playbook for " + userNiche, playbook);
            alert(`Launch sequence initiated for ${userNiche} using ${stack.name}! Check console for the personalized playbook.`);
        } catch (error) {
            console.error("Failed to generate playbook:", error);
            alert("Error generating launch playbook. Please try again.");
        }

        setSelectedStack(null);
    }

    if (step === 0 && !showResults) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
                <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center shadow-2xl animate-fade-in-up">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M2 12h10"/><path d="M9 4v16"/><path d="m3 9 3 3-3 3"/><path d="M14 8V7c0-1.1.9-2 2-2h6"/><path d="M14 12v-1c0-1.1.9-2 2-2h6"/><path d="M14 16v-1c0-1.1.9-2 2-2h6"/><path d="M14 20v-1c0-1.1.9-2 2-2h6"/></svg>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
                        Discover Your Agency Identity
                    </h1>
                    <p className="text-lg text-slate-400 mb-10 max-w-lg mx-auto">
                        Answer 6 quick questions to unlock your personalized roadmap, identity badge, and the exact stacks top agencies use to scale.
                    </p>
                    <div className="flex flex-col gap-4 items-center">
                        <button onClick={() => setStep(1)} className="w-full sm:w-auto px-10 py-4 bg-orange-gradient text-white text-lg font-bold rounded-xl hover:scale-105 transition-transform shadow-xl">
                            Start Your Assessment
                        </button>
                        <button onClick={() => onNavigate('home')} className="text-slate-500 text-sm hover:text-white">No thanks, take me back</button>
                    </div>
                </div>
            </div>
        );
    }

    if (step > 0 && step <= questions.length && !showResults) {
        const currentQ = questions[step - 1];
        const currentAnswer = currentQ.type === 'mrr' ? (currentMRR > 0) : currentQ.type === 'target' ? (targetMRR > 0) : answers[currentQ.id as keyof IntakeResponse];
        const canProceed = Array.isArray(currentAnswer) ? currentAnswer.length > 0 : !!currentAnswer;

        return (
            <div className="min-h-screen bg-gray-950 flex flex-col p-4">
                <div className="max-w-2xl mx-auto w-full mb-8 mt-8">
                    <div className="h-1.5 w-full bg-slate-800 rounded-full">
                        <div className="h-full bg-primary-500 rounded-full transition-all duration-300" style={{ width: `${(step / questions.length) * 100}%` }}></div>
                    </div>
                </div>

                <div className="flex-grow flex items-center justify-center">
                    <div className="max-w-2xl w-full animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-white mb-2 text-center">{currentQ.label}</h2>
                        {currentQ.subLabel && <p className="text-slate-400 text-center mb-8">{currentQ.subLabel}</p>}

                        <div className="grid gap-3 mt-8">
                            {currentQ.options.map((option) => {
                                const optionLabel = typeof option === 'string' ? option : option.label;
                                const optionValue = typeof option === 'string' ? option : option.value;
                                const isSelected = currentQ.type === 'mrr' ? currentMRR === optionValue : currentQ.type === 'target' ? targetMRR === optionValue : Array.isArray(currentAnswer) ? currentAnswer.includes(optionLabel) : currentAnswer === optionLabel;

                                return (
                                    <button
                                        key={optionLabel}
                                        onClick={() => handleOptionClick(currentQ.id, typeof option === 'string' ? option : option, currentQ.multi, currentQ.max)}
                                        className={`p-5 rounded-xl border text-left text-lg font-medium transition-all duration-200 flex items-center justify-between ${isSelected ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-900/20' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800'}`}
                                    >
                                        {optionLabel}
                                        {isSelected && <CheckIcon />}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-10 flex justify-between items-center">
                             <button onClick={() => setStep(s => s - 1)} className="text-slate-500 hover:text-white font-medium px-4 py-2">Back</button>
                             <button
                                onClick={handleNext}
                                disabled={!canProceed}
                                className="bg-white text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {step === questions.length && !user ? 'Continue to Account Setup →' : 'Next Step →'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Removed intermediate lead capture form - now goes directly to analyzing screen

    if (isAnalyzing) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
                <div className="relative flex items-center justify-center mb-8">
                    <div className="absolute w-32 h-32 bg-primary-500/20 rounded-full animate-ping"></div>
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/50 animate-pulse">
                        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Analyzing your responses...</h2>
                <p className="text-slate-400">Preparing your personalized roadmap and recommendations.</p>
            </div>
        );
    }

    if (showResults) {
        const finalTargetMRR = currentMRR + targetMRR;

        return (
            <main className="min-h-screen bg-gray-950 p-4 sm:p-8 relative">
                {selectedStack && <StackDetailPanel stack={selectedStack} onClose={() => setSelectedStack(null)} onLaunch={handleLaunchStack} />}

                <div className="max-w-6xl mx-auto">
                    {/* Header with Dashboard Navigation */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-center sm:text-left">
                            <h1 className="text-4xl font-bold text-white mb-2">Your Agency Identity</h1>
                            <p className="text-slate-400 text-sm">Your personalized roadmap to ${((currentMRR + targetMRR) / 1000).toFixed(0)}k MRR</p>
                        </div>
                        <button
                            onClick={() => onNavigate('dashboard')}
                            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all border border-slate-700 hover:border-slate-600 flex items-center gap-2"
                        >
                            <span>Go to Dashboard</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </button>
                    </div>

                    <div className="mb-12 text-center">
                        <div className="flex justify-center mb-8">
                            <IdentityBadge level={currentLevel} currentMRR={currentMRR} size="large" showProgress />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Your Current Status</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Current MRR</span>
                                    <span className="text-2xl font-bold text-white">${currentMRR.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">90-Day Target</span>
                                    <span className="text-2xl font-bold text-emerald-400">${finalTargetMRR.toLocaleString()}</span>
                                </div>
                                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 mt-2">
                                    <p className="text-xs text-rose-400 font-bold leading-tight">
                                        Every month you wait to launch this stack, you are losing <span className="text-rose-300 underline">${targetMRR.toLocaleString()}</span> in potential revenue.
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-slate-800">
                                    <span className="text-sm text-slate-400 block mb-2">Services to Add:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {answers.desiredAddons.map(addon => (
                                            <span key={addon} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full">
                                                {addon}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {nextLevel && (
                            <GapAnalysis
                                currentLevel={currentLevel}
                                nextLevel={nextLevel}
                                currentMRR={currentMRR}
                                targetMRR={finalTargetMRR}
                                serviceGaps={answers.desiredAddons}
                                onUpgradeClick={() => onNavigate('marketplace')}
                            />
                        )}
                    </div>

                    <div className="mt-16 max-w-3xl mx-auto mb-16">
                        <TripwireCard />
                    </div>

                    <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-2 border-orange-500/50 rounded-2xl p-8 text-center mb-12">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            We've Found {answers.desiredAddons.length > 0 ? answers.desiredAddons.length : 3} Perfect Stacks for You
                        </h3>
                        <p className="text-slate-300 mb-2">
                            Based on your {currentLevel.name} status and ${(targetMRR / 1000).toFixed(0)}k revenue goal
                        </p>
                        <p className="text-sm text-slate-400 mb-6 flex items-center justify-center gap-2">
                            <UsersIcon />
                            Based on your profile, this is the exact stack used by top {currentLevel.name}s to generate ${(finalTargetMRR / 1000).toFixed(0)}k/month
                        </p>
                        <button
                            onClick={() => onNavigate('marketplace')}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-8 rounded-xl hover:brightness-110 transition-all shadow-lg text-lg"
                        >
                            View Your Personalized Stacks
                        </button>
                    </div>

                    <h2 className="text-xl font-bold text-slate-300 mb-6 pl-2">Recommended for Your Identity Level</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {recommendedStacks.map((stack, index) => {
                            const isLocked = !isSubscribed && index > 0;

                            return (
                                <div key={stack.id} className="relative bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden hover:border-primary-500/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                                    {isLocked && (
                                        <LockedOverlay
                                            message={`Unlock the "${stack.name}" blueprint and full recommended list.`}
                                            onUpgrade={() => onNavigate('membership')}
                                        />
                                    )}
                                    <div className={`flex flex-col h-full ${isLocked ? 'pointer-events-none filter blur-[2px]' : ''}`}>
                                        <div className="p-6 sm:p-8 flex-grow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full uppercase tracking-wider ${stack.isFeatured ? 'bg-primary-600' : 'bg-slate-700'}`}>
                                                    {stack.category}
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-extrabold text-white mb-2">{stack.name}</h3>
                                            <p className="text-primary-400 font-bold text-sm uppercase tracking-wide mb-4">{stack.targetNiche}</p>

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {stack.solutionIds.length > 0 && <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded border border-slate-700">Full System</span>}
                                                <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded border border-slate-700">White-Label</span>
                                                <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded border border-slate-700">Resell Kit</span>
                                            </div>

                                            <div className="bg-slate-800/50 rounded-xl p-4 grid grid-cols-2 gap-4 border border-slate-700/50 mb-6">
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase">Avg Resale</p>
                                                    <p className="text-white font-bold">{stack.suggestedResalePrice}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase">Margin</p>
                                                    <p className="text-emerald-400 font-bold">{stack.typicalMargin || '40-60% Net'}</p>
                                                </div>
                                                <div className="col-span-2 pt-2 border-t border-slate-700/50">
                                                    <p className="text-xs text-slate-400"><span className="font-bold text-white">Example:</span> {stack.pitch || `Add $10k MRR with just 3-4 clients.`}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <LockIcon /> Based on real stacks used by agencies in {stack.targetNiche}
                                            </div>
                                        </div>

                                        <div className="p-4 bg-slate-800 border-t border-slate-700 flex gap-3">
                                            <button onClick={() => setSelectedStack(stack)} className="flex-1 py-3 bg-orange-gradient text-white font-bold rounded-lg hover:brightness-110 transition-all shadow-lg">
                                                View This Stack
                                            </button>
                                            <button onClick={() => setSelectedStack(stack)} className="px-4 py-3 text-slate-300 font-bold rounded-lg hover:bg-slate-700 transition-colors">
                                                Preview
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center pb-16 space-y-4">
                        <button
                            onClick={() => onNavigate('dashboard')}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all shadow-lg"
                        >
                            <span>Continue to Dashboard</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </button>
                        <div>
                            <button onClick={() => onNavigate('search')} className="text-slate-500 hover:text-white text-sm font-medium transition-colors">View full library instead</button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return null;
};
