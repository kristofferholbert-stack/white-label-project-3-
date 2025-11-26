import React, { useState, useMemo, useEffect } from 'react';
import type { Page, SolutionStack, Solution, JourneyData, Priorities } from '../types/types';
import { ALL_SOLUTIONS, CURATED_STACKS, HERO_STACKS, filterOptionsData, categoryStructure } from '../constants/constants';
import { StackDetailPanel } from '../components/StackDetailPanel';
import { MobileFilterDrawer } from '../components/MobileFilterDrawer';
import { FilterSection } from '../components/FilterSection';
import { HeroStackCard, StackDetailInline } from '../components/HeroStackComponents';
import { SolutionCard } from '../components/SolutionCard';
import { LockedOverlay } from '../components/LockedOverlay';
import { useAuth } from '../context/AuthProvider';
import { getSubscriptionStatus } from '../services/stripeService';
import { ComparisonModal } from '../components/ComparisonModal';
import { ComparisonTray } from '../components/ComparisonTray';
import { supabase } from '../services/supabase';

interface MarketplacePageProps {
    onNavigate: (page: Page, context?: any) => void;
    onLaunchSystem: (stack: SolutionStack) => void;
    initialData?: JourneyData | null;
    defaultTab?: 'stacks' | 'services';
    comparisonList?: string[];
    onToggleCompare?: (id: string) => void;
}

// Icons
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>;
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
const SlidersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>;

// Top Filter Bar Components
const TopFilterDropdown: React.FC<{ label: string; options: string[]; value: string; onChange: (val: string) => void }> = ({ label, options, value, onChange }) => (
    <div className="relative group hidden lg:block">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none bg-slate-900 border border-slate-700 text-slate-300 py-2 pl-4 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 hover:border-slate-600 transition-colors cursor-pointer w-full sm:w-auto"
        >
            <option value="">{label}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
    </div>
);

const SidebarSlider: React.FC<{ label: string; leftLabel: string; rightLabel: string; value: number; onChange: (val: number) => void; description: string }> = ({ label, leftLabel, rightLabel, value, onChange, description }) => (
    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-white">{label}</label>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${value === 50 ? 'bg-slate-700 text-slate-400' : 'bg-primary-500/20 text-primary-400'}`}>
                {value < 40 ? leftLabel : value > 60 ? rightLabel : 'Balanced'}
            </span>
        </div>
        <p className="text-xs text-slate-500 mb-3">{description}</p>
        <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
        />
        <div className="flex justify-between text-[10px] font-semibold text-slate-500 mt-2 uppercase tracking-wide">
            <span>{leftLabel}</span>
            <span>{rightLabel}</span>
        </div>
    </div>
);

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ onNavigate, onLaunchSystem, initialData, defaultTab = 'stacks', comparisonList: propComparisonList, onToggleCompare }) => {
    const [activeTab, setActiveTab] = useState<'stacks' | 'services'>('stacks');
    const [searchQuery, setSearchQuery] = useState('');

    // Auth & Entitlement Logic
    const { user } = useAuth();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // Comparison State (Local if not passed via props, though App.tsx passes it now)
    const [localComparisonList, setLocalComparisonList] = useState<string[]>([]);
    const [isComparisonOpen, setIsComparisonOpen] = useState(false);

    const comparisonList = propComparisonList || localComparisonList;

    // Bookmark State
    const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        const checkEntitlement = async () => {
            if (!user) {
                setIsSubscribed(false);
                setCheckingAuth(false);
                return;
            }
            const sub = await getSubscriptionStatus();
            setIsSubscribed(!!sub);
            setCheckingAuth(false);
        };
        checkEntitlement();
    }, [user]);

    // Fetch Bookmarks
    useEffect(() => {
        if (!user) {
            setSavedItems(new Set());
            return;
        }
        const fetchBookmarks = async () => {
            const { data } = await supabase
                .from('saved_items')
                .select('item_id')
                .eq('user_id', user.id);

            if (data) {
                setSavedItems(new Set(data.map(item => item.item_id)));
            }
        };
        fetchBookmarks();
    }, [user]);

    const handleToggleBookmark = async (itemType: 'stack' | 'solution', itemId: string) => {
        if (!user) {
            alert("Please log in to save items to your dashboard.");
            return;
        }

        const isSaved = savedItems.has(itemId);

        if (isSaved) {
            // Remove
            const { error } = await supabase
                .from('saved_items')
                .delete()
                .eq('user_id', user.id)
                .eq('item_id', itemId)
                .eq('item_type', itemType);

            if (!error) {
                setSavedItems(prev => {
                    const next = new Set(prev);
                    next.delete(itemId);
                    return next;
                });
            }
        } else {
            // Add
            const { error } = await supabase
                .from('saved_items')
                .insert({
                    user_id: user.id,
                    item_id: itemId,
                    item_type: itemType
                });

            if (!error) {
                setSavedItems(prev => {
                    const next = new Set(prev);
                    next.add(itemId);
                    return next;
                });
            }
        }
    };

    useEffect(() => {
        if (defaultTab) {
            setActiveTab(defaultTab);
        }
    }, [defaultTab]);

    // Stack Filters (Top Bar)
    // Ensure initialized values are strings, handling array values from initialData filters.
    const [stackFilters, setStackFilters] = useState({
        niche: (Array.isArray(initialData?.filters?.niche) ? initialData?.filters?.niche[0] : initialData?.filters?.niche) || '',
        goal: (Array.isArray(initialData?.filters?.goal) ? initialData?.filters?.goal[0] : initialData?.filters?.goal) || '',
        teamSize: (Array.isArray(initialData?.filters?.teamSize) ? initialData?.filters?.teamSize[0] : initialData?.filters?.teamSize) || '',
    });

    // Service Filters (Sidebar)
    const [servicePriorities, setServicePriorities] = useState<Priorities>({
        marginVsCost: 50,
        speedVsCustomization: 50,
        easeVsPower: 50
    });

    const [advancedFilters, setAdvancedFilters] = useState<{
        categories: string[];
        whitelabelType: string[];
        pricingModel: string[];
        clientSize: string[];
        implementationTime: string[];
        integrationMethods: string[];
    }>({
        categories: [],
        whitelabelType: [],
        pricingModel: [],
        clientSize: [],
        implementationTime: [],
        integrationMethods: []
    });

    const [selectedStack, setSelectedStack] = useState<SolutionStack | null>(null);
    const [activeHeroStackId, setActiveHeroStackId] = useState<string | null>(null); // For HeroStackCard expand/collapse
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const handleAdvancedFilterChange = (category: keyof typeof advancedFilters, value: string[]) => {
        setAdvancedFilters(prev => ({ ...prev, [category]: value }));
    };

    // Map detailed implementation times from DB to the simplified 5 options
    const implementationTimeMapping: Record<string, string[]> = {
        "Instant / Self-service": ["Instant / Self-service"],
        "Instant": ["Instant"],
        "1-3 days": ["1-3 Days", "1-3 Business Days", "3-5 Days"],
        "1-2 weeks": ["1 Week", "1-2 Weeks"],
        "1+ months": ["2-4 Weeks", "4-8 Weeks", "2-4 Months", "3-6 Months"]
    };

    // Helper to find matching SolutionStack from HeroStack
    const findMatchingSolutionStack = (heroStackIds: string[]): SolutionStack | undefined => {
        // We try to match based on solutionIds being a subset or identical
        return CURATED_STACKS.find(s => {
            // Check if all solutionIds in hero stack exist in curated stack
             return heroStackIds.every(id => s.solutionIds.includes(id));
        });
    };

    // Derived Data: Filtered Stacks (Using HERO_STACKS now, but filtering via mapped SolutionStack)
    const filteredHeroStacks = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return HERO_STACKS.filter(stack => {
            const matchesSearch = !query ||
                stack.title.toLowerCase().includes(query) ||
                stack.description.toLowerCase().includes(query);

            if (!matchesSearch) return false;

            // Attempt to find corresponding metadata for filtering
            const matchingSolutionStack = findMatchingSolutionStack(stack.solutionIds);

            if (matchingSolutionStack) {
                if (stackFilters.niche && matchingSolutionStack.targetNiche !== stackFilters.niche) return false;
                if (stackFilters.goal && matchingSolutionStack.targetGoal !== stackFilters.goal) return false;
                if (stackFilters.teamSize && matchingSolutionStack.targetTeamSize && !matchingSolutionStack.targetTeamSize.includes(stackFilters.teamSize as string)) return false;
            } else {
                // If we can't match it to a curated stack (for metadata), we might default to showing it OR hiding it if filters are active.
                // For now, let's hide if strict filters are applied and we lack data.
                if (stackFilters.niche || stackFilters.goal || stackFilters.teamSize) return false;
            }

            return true;
        });
    }, [searchQuery, stackFilters]);


    // Derived Data: Filtered Services
    const filteredServices = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return ALL_SOLUTIONS.filter(sol => {
            const matchesSearch = !query ||
                sol.name.toLowerCase().includes(query) ||
                sol.shortDescription.toLowerCase().includes(query) ||
                sol.primaryCategory.toLowerCase().includes(query) ||
                sol.subCategory.toLowerCase().includes(query);

            if (!matchesSearch) return false;

            // Sidebar Checkbox Filters
            if (advancedFilters.categories.length > 0 && !advancedFilters.categories.includes(sol.primaryCategory)) return false;
            if (advancedFilters.whitelabelType.length > 0 && !advancedFilters.whitelabelType.includes(sol.whitelabelType)) return false;
            if (advancedFilters.pricingModel.length > 0 && !sol.pricingModel.some(pm => advancedFilters.pricingModel.includes(pm))) return false;
            if (advancedFilters.clientSize.length > 0 && !sol.idealClientSize.some(cs => advancedFilters.clientSize.includes(cs))) return false;

            // Custom Implementation Time Logic
            if (advancedFilters.implementationTime.length > 0) {
                const validTimes = advancedFilters.implementationTime.flatMap(opt => implementationTimeMapping[opt] || []);
                if (!validTimes.includes(sol.implementationTime)) return false;
            }

            if (advancedFilters.integrationMethods.length > 0 && !sol.integrationMethods.some(im => advancedFilters.integrationMethods.includes(im))) return false;

            // Sidebar Slider Logic
            // Profitability: High Margin > 60 means we want agencyMargin > 50
            if (servicePriorities.marginVsCost > 70 && sol.agencyMargin < 50) return false;

            // Implementation: Turnkey (<30) vs Custom (>70)
            if (servicePriorities.speedVsCustomization < 30) {
                const fastTimes = ['Instant', 'Instant / Self-service', '1-3 Days', '1-3 Business Days', '3-5 Days'];
                if (!fastTimes.some(t => sol.implementationTime.includes(t))) return false;
            }

            // Technical: No-Code (<30) vs API (>70)
            if (servicePriorities.easeVsPower < 30) {
                const easyMethods = ['No-code Integration', 'Zapier', 'Zapier Integration', 'Dashboard', 'Native'];
                if (!sol.integrationMethods.some(m => easyMethods.includes(m))) return false;
            }
            if (servicePriorities.easeVsPower > 70) {
                 const powerMethods = ['REST API', 'API', 'SDK/Library', 'Webhook Support'];
                 if (!sol.integrationMethods.some(m => powerMethods.includes(m))) return false;
            }

            return true;
        });
    }, [searchQuery, advancedFilters, servicePriorities]);

    // Handlers
    const handleLaunchHeroStack = (heroStack: any) => { // Using any here temporarily as we map back to SolutionStack
        const matchingStack = findMatchingSolutionStack(heroStack.solutionIds);
        if (matchingStack) {
            onLaunchSystem(matchingStack);
        } else {
            // Fallback if no matching curated stack found (shouldn't happen with current data)
            console.warn("No matching solution stack found for launch", heroStack);
             // Create a dummy SolutionStack to proceed or alert
            const dummyStack: SolutionStack = {
                id: heroStack.id,
                name: heroStack.title,
                category: 'Business Operations', // Default
                isFeatured: true,
                image: heroStack.details.heroImage,
                targetNiche: 'General',
                description: heroStack.description,
                tags: [],
                solutionIds: heroStack.solutionIds,
                suggestedResalePrice: heroStack.resell,
                estimatedAgencyCost: heroStack.cost,
                estimatedLaunchTime: '1 Week',
                replaces: []
            };
            onLaunchSystem(dummyStack);
        }
    }

    const handleHeroStackClick = (stackId: string) => {
        if (!isSubscribed) {
            onNavigate('membership');
            return;
        }
        setActiveHeroStackId(activeHeroStackId === stackId ? null : stackId);
    };

    const handleToggleCompare = (solutionId: string) => {
        if (onToggleCompare) {
            onToggleCompare(solutionId);
            return;
        }

        const solution = ALL_SOLUTIONS.find(s => s.id === solutionId);
        if (!solution) return;

        setLocalComparisonList(prev => {
            // Removing
            if (prev.includes(solutionId)) {
                return prev.filter(id => id !== solutionId);
            }

            // Adding
            if (prev.length >= 3) {
                alert("You can only compare up to 3 solutions.");
                return prev;
            }

            // Category Check (New!)
            if (prev.length > 0) {
                const firstItem = ALL_SOLUTIONS.find(s => s.id === prev[0]);
                if (firstItem && firstItem.primaryCategory !== solution.primaryCategory) {
                    alert(`You cannot compare a ${firstItem.primaryCategory} tool with a ${solution.primaryCategory} tool.`);
                    return prev;
                }
            }

            return [...prev, solutionId];
        });
    };

    // Constants for Dropdowns
    const nicheOptions = ["Home Services", "Medical", "Local Business", "E-commerce", "B2B / SaaS"];
    const goalOptions = ["+$5k MRR", "+$10k MRR", "+$20k+ MRR", "+$50k+ MRR"];
    const teamSizeOptions = ["Solo", "2-5", "6-15", "16+"];

    // Custom options for Implementation Time as requested
    const customImplementationTimeOptions = [
        "Instant / Self-service",
        "Instant",
        "1-3 days",
        "1-2 weeks",
        "1+ months"
    ];

    const getRandomViewers = () => Math.floor(Math.random() * 15) + 3;

    const RefineSidebar = () => (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-white">
                <SlidersIcon />
                <h3 className="font-bold text-lg">Refine Matches</h3>
            </div>

            <div className="space-y-6 mb-8">
                <SidebarSlider
                    label="Margin Hunter"
                    leftLabel="Volume Play"
                    rightLabel="Whale Hunter"
                    value={servicePriorities.marginVsCost}
                    onChange={(v) => setServicePriorities(p => ({...p, marginVsCost: v}))}
                    description="Focus on volume or high agency margins?"
                />
                <SidebarSlider
                    label="Implementation"
                    leftLabel="Turnkey"
                    rightLabel="Custom"
                    value={servicePriorities.speedVsCustomization}
                    onChange={(v) => setServicePriorities(p => ({...p, speedVsCustomization: v}))}
                    description="Quick launch or deep customization?"
                />
                <SidebarSlider
                    label="Tech Level"
                    leftLabel="I'm a Marketer"
                    rightLabel="I'm a Dev"
                    value={servicePriorities.easeVsPower}
                    onChange={(v) => setServicePriorities(p => ({...p, easeVsPower: v}))}
                    description="Simple setup or powerful developer APIs?"
                />
            </div>

            <div className="space-y-1">
                 <FilterSection
                    title="White-Label Categories"
                    options={categoryStructure.map(c => c.name)}
                    selected={advancedFilters.categories}
                    onChange={(val) => handleAdvancedFilterChange('categories', val)}
                    type="checkbox"
                />
                <FilterSection
                    title="White Label Type"
                    options={filterOptionsData.whitelabelType}
                    selected={advancedFilters.whitelabelType}
                    onChange={(val) => handleAdvancedFilterChange('whitelabelType', val)}
                    type="checkbox"
                />
                <FilterSection
                    title="Pricing Model"
                    options={filterOptionsData.pricingModel}
                    selected={advancedFilters.pricingModel}
                    onChange={(val) => handleAdvancedFilterChange('pricingModel', val)}
                    type="checkbox"
                />
                <FilterSection
                    title="Client Size"
                    options={filterOptionsData.idealClientSize}
                    selected={advancedFilters.clientSize}
                    onChange={(val) => handleAdvancedFilterChange('clientSize', val)}
                    type="checkbox"
                />
                 <FilterSection
                    title="Implementation Time"
                    options={customImplementationTimeOptions}
                    selected={advancedFilters.implementationTime}
                    onChange={(val) => handleAdvancedFilterChange('implementationTime', val)}
                    type="checkbox"
                />
                 <FilterSection
                    title="Integration Methods"
                    options={filterOptionsData.integrationMethods}
                    selected={advancedFilters.integrationMethods}
                    onChange={(val) => handleAdvancedFilterChange('integrationMethods', val)}
                    type="checkbox"
                />
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-gray-950 flex flex-col pt-20">
            {/* This drawer is for mobile only, reusing existing logic but could be expanded to match sidebar */}
            <MobileFilterDrawer
                isOpen={isMobileFiltersOpen}
                onClose={() => setIsMobileFiltersOpen(false)}
                activeTab={activeTab}
                filters={{...stackFilters, serviceType: ''}}
                setFilters={(val: any) => setStackFilters(val)}
                options={{ niche: nicheOptions, goal: goalOptions, teamSize: teamSizeOptions, serviceType: [] }}
            />

            {selectedStack && <StackDetailPanel stack={selectedStack} onClose={() => setSelectedStack(null)} onLaunch={(s) => onLaunchSystem(s)} />}

            {/* Comparison Modal */}
            <ComparisonModal
                isOpen={isComparisonOpen}
                onClose={() => setIsComparisonOpen(false)}
                solutions={ALL_SOLUTIONS.filter(s => comparisonList.includes(s.id))}
                onShare={() => alert("Link copied to clipboard!")}
            />

            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-800 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                        Browse Proven Agency Stacks & Plug‑and‑Play Services
                    </h1>
                    <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                        Filter by niche, services, and revenue goal to see what’s working for agencies like yours — and plug in the same white‑label providers.
                    </p>
                </div>
            </header>

            {/* Control Bar */}
            <div className="sticky top-[80px] z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto py-4 flex flex-col lg:flex-row items-center justify-between gap-4">

                    {/* Tabs */}
                    <div className="flex p-1 bg-slate-800 rounded-lg self-start lg:self-auto w-full lg:w-auto">
                        <button
                            onClick={() => setActiveTab('stacks')}
                            className={`flex-1 lg:flex-none px-6 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'stacks' ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Stacks
                        </button>
                        <button
                            onClick={() => setActiveTab('services')}
                            className={`flex-1 lg:flex-none px-6 py-2 text-sm font-bold rounded-md transition-all ${activeTab === 'services' ? 'bg-primary-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Power-Ups
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                         {/* Search Input */}
                        <div className="relative flex-grow lg:flex-grow-0 min-w-[200px] w-full lg:w-auto">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setIsMobileFiltersOpen(true)}
                            className="lg:hidden p-2 text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700"
                        >
                            <FilterIcon />
                        </button>

                        {/* Desktop Filters - Only show Stack filters when Stacks tab is active */}
                        {activeTab === 'stacks' && (
                            <>
                                <TopFilterDropdown label="Niche" options={nicheOptions} value={stackFilters.niche} onChange={(v) => setStackFilters(p => ({...p, niche: v}))} />
                                <TopFilterDropdown label="Goal" options={goalOptions} value={stackFilters.goal} onChange={(v) => setStackFilters(p => ({...p, goal: v}))} />
                                <TopFilterDropdown label="Team Size" options={teamSizeOptions} value={stackFilters.teamSize} onChange={(v) => setStackFilters(p => ({...p, teamSize: v}))} />
                            </>
                        )}

                        <button onClick={() => {
                            setStackFilters({niche: '', goal: '', teamSize: ''});
                            setAdvancedFilters({ categories: [], whitelabelType: [], pricingModel: [], clientSize: [], implementationTime: [], integrationMethods: [] });
                            setServicePriorities({ marginVsCost: 50, speedVsCustomization: 50, easeVsPower: 50 });
                        }} className="hidden lg:block p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg" title="Clear Filters">
                            <span className="sr-only">Clear</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="flex-grow bg-gray-950 px-4 sm:px-6 lg:px-8 py-12 relative">
                <div className="max-w-7xl mx-auto flex gap-8 items-start pb-20"> {/* Added pb-20 for tray space */}

                    {/* Sidebar (Only for Services Tab) */}
                    {activeTab === 'services' && (
                        <aside className="hidden lg:block w-72 flex-shrink-0">
                            <RefineSidebar />
                        </aside>
                    )}

                    <div className="flex-grow min-w-0">
                        {activeTab === 'stacks' && (
                            <>
                                {!checkingAuth && !isSubscribed && (
                                    <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/50 rounded-lg text-amber-200 text-center">
                                        You are viewing a preview. <button onClick={() => onNavigate('membership')} className="underline font-bold">Join the Inner Circle</button> to unlock full details of all stacks.
                                    </div>
                                )}
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8">
                                    {filteredHeroStacks.length > 0 ? filteredHeroStacks.map((stack, index) => {
                                        // Get matching solution for tags
                                        const matchingStack = findMatchingSolutionStack(stack.solutionIds);
                                        const isLocked = !isSubscribed && index > 0;

                                        return (
                                        <React.Fragment key={stack.id}>
                                            {/* Card */}
                                            <div className={`${activeHeroStackId === stack.id ? 'lg:col-span-2 xl:col-span-3' : 'col-span-1'} relative`}>
                                                {isLocked && (
                                                    <LockedOverlay
                                                        message={`Unlock the "${stack.title}" blueprint and 20+ others.`}
                                                        onUpgrade={() => onNavigate('membership')}
                                                    />
                                                )}

                                                <div className={isLocked ? 'pointer-events-none filter blur-[2px]' : ''}>
                                                    <HeroStackCard
                                                        stack={stack}
                                                        isActive={activeHeroStackId === stack.id}
                                                        isLocked={isLocked} // Pass lock state down
                                                        onExpand={() => handleHeroStackClick(stack.id)}
                                                        viewers={getRandomViewers()}
                                                        tags={matchingStack?.tags}
                                                        isBookmarked={savedItems.has(stack.id)}
                                                        onToggleBookmark={() => handleToggleBookmark('stack', stack.id)}
                                                    />
                                                </div>
                                            </div>

                                            {/* Inline Detail View */}
                                            {activeHeroStackId === stack.id && (
                                                <StackDetailInline
                                                    stack={stack}
                                                    onClose={() => setActiveHeroStackId(null)}
                                                    onLaunch={() => handleLaunchHeroStack(stack)}
                                                />
                                            )}
                                        </React.Fragment>
                                    )}) : (
                                        <div className="col-span-full text-center py-20">
                                            <h3 className="text-xl font-bold text-white">No stacks found matching those filters.</h3>
                                            <p className="text-slate-400 mt-2">Try adjusting your search criteria or clear filters.</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {activeTab === 'services' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredServices.length > 0 ? filteredServices.map((sol, index) => (
                                    <SolutionCard
                                        key={sol.id}
                                        solution={sol}
                                        index={index}
                                        onViewDetails={(s) => onNavigate('solutionDetail', { solution: s })}
                                        isSelected={comparisonList.includes(sol.id)}
                                        onToggleCompare={handleToggleCompare}
                                        isBookmarked={savedItems.has(sol.id)}
                                        onToggleBookmark={() => handleToggleBookmark('solution', sol.id)}
                                    />
                                )) : (
                                    <div className="col-span-full text-center py-20">
                                        <h3 className="text-xl font-bold text-white">No power-ups found.</h3>
                                        <p className="text-slate-400 mt-2">Try adjusting your sidebar filters to find more capabilities.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Comparison Tray */}
                <ComparisonTray
                    selectedSolutions={ALL_SOLUTIONS.filter(s => comparisonList.includes(s.id))}
                    onCompare={() => setIsComparisonOpen(true)}
                    onClear={() => onToggleCompare ? onToggleCompare('CLEAR_ALL') : setLocalComparisonList([])}
                />
            </div>
        </main>
    );
};
