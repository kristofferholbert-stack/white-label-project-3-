
export type Page = 'home' | 'about' | 'blog' | 'search' | 'blogPost' | 'dashboard' | 'clients' | 'addClient' | 'clientDetail' | 'clientPortal' | 'stacks' | 'forAgencies' | 'forPartners' | 'login' | 'signup' | 'vendorDashboard' | 'solutionDetail' | 'inspirations' | 'systemDetail' | 'businessInABox' | 'intake' | 'stackActivation' | 'resellKits' | 'kitViewer' | 'membership' | 'implementation' | 'marketplace' | 'vendorSubmit' | 'myPurchases' | 'nichePicker' | 'contact' | 'terms' | 'privacy' | 'protocolDownload' | 'getStarted' | 'playbooks';

export interface User {
    email: string;
    type: 'agency' | 'vendor';
}

export interface BlogPost {
    id: string;
    title: string;
    author: string;
    date: string;
    excerpt: string;
    content: string;
    tags: string[];
}

export interface Category {
    name: string;
    subCategories: string[];
}

export type StackCategory = 'Marketing' | 'Development' | 'Business Operations' | 'Fintech' | 'Industry Platforms' | 'Creative' | 'Physical Products';

export interface Solution {
    id: string;
    name: string;
    companyName: string;
    companyWebsite: string;
    tagline: string;
    shortDescription: string;
    detailedDescription: string;
    primaryCategory: string;
    subCategory: string;
    tags: string[];
    logo: string;
    rating: number;
    implementations: number;
    isVerified: boolean;
    isFeatured?: boolean;
    whitelabelType: string;
    pricingModel: string[];
    agencyMargin: number;
    startingPrice: string;
    setupFee: string;
    minimumCommitment: string;
    implementationTime: string;
    integrationMethods: string[];
    idealClientSize: string[];
    features: string[];
    partnerSupportModel: string;
    reviews: Review[];
    agencyReadiness: AgencyReadiness;
    valueAddons: string[];
    vendorTrust: {
        hasPublicRoadmap: boolean;
        hasSLA: boolean;
        hasDataMigration: boolean;
    };
    resellRange?: string;
    matchScore?: number;
    matchReasoning?: string;
}

export interface Review {
    id: string;
    agencyName: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
}

export interface AgencyReadiness {
    hasCustomDomain: boolean;
    canRemoveBranding: boolean;
    hasWhiteLabelMobileApp: boolean;
    hasResellerBilling: boolean;
}

export interface ReplacedTool {
    name: string;
    estimatedCost: number;
}

export interface SolutionStack {
    id: string;
    name: string;
    category: StackCategory;
    isFeatured: boolean;
    image: string;
    targetNiche: string;
    targetTeamSize?: string[];
    targetGoal?: string;
    description: string;
    pitch?: string;
    tags: string[];
    solutionIds: string[];
    suggestedResalePrice: string;
    typicalMargin?: string;
    replaces: ReplacedTool[];
    estimatedAgencyCost: string;
    estimatedLaunchTime: string;
    isHeroOutcome?: boolean;
    matchScore?: number;
    matchReasoning?: string;
    linkedKitId?: string;
    compatibility?: {
        systemDiagram: string;
        headline: string;
        description: string;
        technicalRequirements: string[];
    };
}

export interface HeroStack {
    id: string;
    badge: string;
    badgeColor: string;
    title: string;
    cost: string;
    resell: string;
    stats: {
        agencies: number;
        revenue: string;
        timeframe: string;
    };
    description: string;
    solutionIds: string[];
    details: HeroStackDetails;
}

export interface HeroStackDetails {
    heroImage: string;
    profitCalculator: {
        defaultClients: number;
        defaultPrice: number;
        agencyCost: number;
    };
    pricingTiers: {
        name: string;
        price: string;
        features: string[];
    }[];
    resellKitAssets: string[];
    grandfatheredPricingLeft: number;
    testimonials: {
        count: number;
    };
}

export interface ManagedVendor {
    id: string;
    solutionId: string;
    name: string;
    logo: string;
    monthlyCost: number;
    contractRenewalDate: string;
    status: 'Active' | 'Trial' | 'Inactive';
    supportContact: string;
    notes: string;
}

export interface Client {
    id: string;
    name: string;
    contactEmail: string;
    status: 'Onboarding' | 'Active' | 'Churned';
    monthlySubscriptionPrice: number;
    managedVendorIds: string[];
    playbook?: LaunchPlaybook;
}

export interface IrresistibleOffer {
    costVsResultStatement: string;
    netNegativeBonuses: NetNegativeBonus[];
}

export interface NetNegativeBonus {
    service: string;
    estimatedCost: string;
}

export interface PricingTier {
    name: string;
    price: string;
    features: string[];
}

export interface MarketingCopy {
    headline: string;
    body: string;
    callToAction: string;
}

export interface WebsiteTemplateContent {
    headline: string;
    subheadline: string;
    featuresSection: {
        title: string;
        description: string;
    }[];
    ctaSection: {
        headline: string;
        ctaButtonText: string;
    };
}

export interface OnboardingCourseOutline {
    moduleTitle: string;
    lessons: string[];
}

export interface KnowledgeBaseArticle {
    title: string;
    content: string;
}

export interface IntegrationGuide {
    title: string;
    outcome?: string;
    tool1?: { name: string; logo: string };
    tool2?: { name: string; logo: string };
    steps: {
        step: number;
        action: string;
        details: string;
        snippet?: { code: string };
    }[];
}

export interface LaunchPlaybook {
    irresistibleOffer?: IrresistibleOffer;
    clientPainPoints?: string[];
    tasks: {
        id: string;
        title: string;
        description: string;
        isCompleted: boolean;
    }[];
    emails: {
        purpose: string;
        subject: string;
        body: string;
    }[];
    snippets: {
        title: string;
        code: string;
    }[];
    suggestedPricingTiers?: PricingTier[];
    marketingCopy?: MarketingCopy;
    leadMagnets?: {
        title: string;
        description: string;
        cta: string;
    }[];
    salesFunnelSteps?: {
        stepName: string;
        description: string;
    }[];
    websiteTemplateContent?: WebsiteTemplateContent;
    onboardingCourseOutline?: OnboardingCourseOutline[];
    knowledgeBaseArticles?: KnowledgeBaseArticle[];
    systemOverview?: string;
    integrationGuide?: IntegrationGuide;
}

export interface AgencyProfile {
    agencyName: string;
    agencyLogo: string;
    supportEmail: string;
}

export interface Priorities {
    marginVsCost: number;
    speedVsCustomization: number;
    easeVsPower: number;
}

export interface Filters {
    categories?: string[];
    whitelabelType?: string[];
    pricingModel?: string[];
    idealClientSize?: string[];
    implementationTime?: string[];
    integrationMethods?: string[];
    niche?: string | string[];
    goal?: string | string[];
    teamSize?: string | string[];
    serviceType?: string | string[];
    [key: string]: string | string[] | undefined;
}

export interface JourneyData {
    goal: string;
    priorities: Priorities;
    filters: Filters;
}

export type SearchResult = ((Solution & { type: 'solution' }) | (SolutionStack & { type: 'stack' })) & {
    matchScore?: number;
    matchReasoning?: string;
};

export interface ProfitabilityEstimates {
    averageClientPrice: number;
    typicalAgencyMargin: number;
}

export interface SystemAssetsPreview {
    valueProposition: string;
    suggestedPricing: string;
    marketingHeadline: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

export interface IntakeResponse {
    agencyType: string;
    niches: string[];
    currentOffers: string[];
    desiredAddons: string[];
    revenueGoal: string;
    crmStatus: string;
}

export interface Inspiration {
    id: string;
    title: string;
    description: string;
    prompt: string;
    category: string;
    difficulty: string;
    potential: string;
    trending: boolean;
    iconType: string;
    targetStackId?: string;
}