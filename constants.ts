
import React from 'react';
import type { Solution, Category, BlogPost, ManagedVendor, Client, AgencyProfile, SolutionStack, StackCategory, ReplacedTool, HeroStack } from './types';

// Icons for Inspirations
const ChartIcon = (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('line', { x1: "18", y1: "20", x2: "18", y2: "10" }), React.createElement('line', { x1: "12", y1: "20", x2: "12", y2: "4" }), React.createElement('line', { x1: "6", y1: "20", x2: "6", y2: "14" }));
const ShareIcon = (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('circle', { cx: "18", cy: "5", r: "3" }), React.createElement('circle', { cx: "6", cy: "12", r: "3" }), React.createElement('circle', { cx: "18", cy: "19", r: "3" }), React.createElement('line', { x1: "8.59", y1: "13.51", x2: "15.42", y2: "17.49" }), React.createElement('line', { x1: "15.41", y1: "6.51", x2: "8.59", y2: "10.49" }));
const CalendarIcon = (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('rect', { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }), React.createElement('line', { x1: "16", y1: "2", x2: "16", y2: "6" }), React.createElement('line', { x1: "8", y1: "2", x2: "8", y2: "6" }), React.createElement('line', { x1: "3", y1: "10", x2: "21", y2: "10" }));
const UsersIcon = (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }), React.createElement('circle', { cx: "9", cy: "7", r: "4" }), React.createElement('path', { d: "M23 21v-2a4 4 0 0 0-3-3.87" }), React.createElement('path', { d: "M16 3.13a4 4 0 0 1 0 7.75" }));
const CreditCardIcon = (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('rect', { x: "1", y: "4", width: "22", height: "16", rx: "2", ry: "2" }), React.createElement('line', { x1: "1", y1: "10", x2: "23", y2: "10" }));
const HeartIcon = (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }));
const ShoppingBagIcon = (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" }), React.createElement('line', { x1: "3", y1: "6", x2: "21", y2: "6" }), React.createElement('path', { d: "M16 10a4 4 0 0 1-8 0" }));
const CodeIcon = (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('polyline', { points: "16 18 22 12 16 6" }), React.createElement('polyline', { points: "8 6 2 12 8 18" }));
const PaletteIcon = (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" }));
const GlobeIcon = (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('circle', { cx: "12", cy: "12", r: "10" }), React.createElement('line', { x1: "2", y1: "12", x2: "22", y2: "12" }), React.createElement('path', { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" }));
const TruckIcon = (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('rect', { x: "1", y: "3", width: "15", height: "13" }), React.createElement('polygon', { points: "16 8 20 8 23 11 23 16 16 16 16 8" }), React.createElement('circle', { cx: "5.5", cy: "18.5", r: "2.5" }), React.createElement('circle', { cx: "18.5", cy: "18.5", r: "2.5" }));
const BitcoinIcon = (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M10.4 20.3c-.9-1.3-1.3-2.8-1.3-4.3 0-4.1 3.3-7.4 7.4-7.4.8 0 1.5.1 2.2.4M12 2a10 10 0 1010 10M7.4 3.7c.9 1.3 1.3 2.8 1.3 4.3 0 4.1-3.3 7.4-7.4 7.4-.8 0-1.5-.1-2.2-.4" }));
const PackageIcon = (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('line', { x1: "16.5", y1: "9.4", x2: "7.5", y2: "4.21" }), React.createElement('path', { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }), React.createElement('polyline', { points: "3.27 6.96 12 12.01 20.73 6.96" }), React.createElement('line', { x1: "12", y1: "22.08", x2: "12", y2: "12" }));


// Perfect 1:1 Mapping Between Stacks and Kits
export const RESELL_KITS = [
  // 1. Local SEO Dominator Kit (matches "The Local SEO Dominator" stack)
  {
    id: 'kit-seo-local',
    title: 'Local SEO Dominator Kit',
    price: '$799',
    value: '$4,500',
    description: 'Complete business-in-a-box system for launching a profitable local SEO agency. Includes battle-tested 12-page proposal (40% close rate), word-for-word sales scripts, vendor negotiations, and step-by-step technical guides. Launch your first client in 48 hours.',
    tags: ['Best Seller', 'Beginner Friendly', 'Premium Content'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    features: [
      '12-Page Customizable Proposal Template (9 sections)',
      'Close-in-One-Call Sales Script (40%+ Close Rate)',
      'Interactive Margin Calculator with 3 Pricing Tiers',
      'Complete Google Business Profile Optimization Checklist',
      'Top 50 Citation Sites + Submission Templates',
      'Automated Review Generation System Setup Guide',
      'Wholesale Vendor List + Negotiation Scripts',
      'Objection Handling Library (9 Common Objections)',
      'Email/SMS Follow-Up Sequences',
      'Niche-Specific Customization (Dental, Legal, HVAC)',
      'Technical SEO Implementation Checklists',
      'Client Onboarding Workflow + Forms',
      'Monthly Reporting Templates',
      'ROI Calculators for Client Presentations'
    ],
    previewItems: [
      '12-Page SEO Proposal with Real Case Studies',
      'Profit Margin Calculator (Excel with Formulas)',
      'The "Audit" Presentation Script',
      'GBP Optimization Checklist (50+ Tasks)',
      'Review Request SMS Templates',
      'Vendor Comparison Matrix',
      'Client Onboarding Questionnaire',
      'Objection Handling Script Library'
    ],
    detailedBenefits: [
      {
        title: 'Sales & Closing',
        items: [
          'Battle-tested 12-page proposal template that closes 40% of qualified prospects',
          'Word-for-word sales script for 30-minute strategy calls',
          'Complete objection handling library with proven responses',
          '7-day email follow-up sequence (40% response rate on "breakup email")',
          'ROI calculator showing clients their exact break-even point'
        ]
      },
      {
        title: 'Pricing & Profitability',
        items: [
          'Interactive margin calculator with wholesale costs',
          '3-tier pricing strategy (Foundation $997, Growth $1,497, Domination $2,497)',
          'Hybrid model guide: 60% in-house, 40% outsourced for optimal margins',
          'Vendor negotiation scripts to secure volume discounts',
          'Path to $10k/month with client mix breakdown'
        ]
      },
      {
        title: 'Technical Implementation',
        items: [
          'Complete GBP optimization checklist (100% profile completion)',
          'Top 50 citation sites with importance ratings',
          'NAP consistency templates and audit process',
          'Step-by-step citation building workflow (4-week plan)',
          'Review generation system (10-25 reviews/month strategy)'
        ]
      },
      {
        title: 'Vendor Relationships',
        items: [
          'List of 5 vetted white-label SEO providers with pricing',
          'Email templates for partnership outreach',
          'Negotiation tactics to get volume pricing before you have volume',
          'Quality control checklist for vetting providers',
          'Build vs. buy decision framework'
        ]
      },
      {
        title: 'Niche Specialization',
        items: [
          'Dental practice customization (pain points, keywords, pricing)',
          'Legal/PI attorney adaptation (content strategy, case value justification)',
          'HVAC contractor specialization (seasonality management, emergency rankings)',
          'Industry-specific proposal language and case studies',
          'Keyword research templates for each niche'
        ]
      }
    ],
    stripeLink: "https://buy.stripe.com/test_kit_seo_local",
    contentFiles: ['localSeoKitContent.ts', 'localSeoKitContentPart2.ts']
  },

  // 2. Reputation Engine Kit (matches "Reputation & Review Engine" stack)
  {
    id: 'kit-reputation',
    title: 'Reputation Engine Kit',
    price: '$699',
    value: '$3,200',
    description: 'The easiest foot-in-the-door offer. Sell review automation software under your brand. Includes the exact "Bad Review" firefighter script that saves clients from PR disasters.',
    tags: ['Low Friction', 'High Retention', 'Monthly Recurring'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop',
    features: [
      'Reputation Sales Deck',
      'Cold Email Outreach Sequence',
      'GMB Optimization Checklist',
      'Negative Review Response Scripts',
      'Software Setup Guide (Birdeye/Podium comparison)',
      'Vendor Comparison Matrix',
      'Client Case Study Template',
      'Review Generation Email/SMS Templates',
      'Crisis Management Playbook'
    ],
    previewItems: [
        'Review Generation Email Templates',
        'Crisis Management Script',
        'GMB Setup Checklist',
        'Sales One-Pager'
    ],
    stripeLink: "https://buy.stripe.com/test_kit_reputation"
  },

  // 3. Google Ads Cash Machine Kit (matches "Google Ads + LSA Cash Machine" stack)
  {
    id: 'kit-google-ads',
    title: 'Google Ads Cash Machine Kit',
    price: '$999',
    value: '$5,000',
    description: 'Command high retainers ($1.5k+) by reselling performance ads. We handle the complexity. Includes the LSA Approval Checklist that cuts approval time by 50%.',
    tags: ['High Ticket', 'Scale', 'Performance Marketing'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    features: [
      'LSA Approval Checklist',
      'High-Converting Ad Copy Swipe File (50+ Ads)',
      'Retainer Contract Template',
      'Media Buyer Vetting Questions',
      'ROI Calculator for Clients',
      'Sales Call Objection Handling',
      'Weekly Reporting Template',
      'Ad Spend vs Management Fee Calculator'
    ],
    previewItems: [
        'LSA Verification Guide',
        'Ad Copy Swipe File (50+ Ads)',
        'Retainer Agreement (Word Doc)',
        'Client Reporting Dashboard'
    ],
    stripeLink: "https://buy.stripe.com/test_kit_google_ads"
  },

  // 4. Agency OS Launch Kit (matches "The Ultimate Agency OS (GHL)" stack)
  {
    id: 'kit-agency-os',
    title: 'Agency OS Launch Kit',
    price: '$1,299',
    value: '$7,500',
    description: 'Replace GoHighLevel. Own the platform, keep 100% of the client, and build equity. Includes the exact "SaaS Mode" snapshot that we use to run our entire agency.',
    tags: ['SaaS Mode', 'Agency OS', 'Platform Play'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    features: [
      'Full "SaaS Mode" Setup Guide',
      'Snapshot Installation Videos',
      'Migration Playbook (ClickFunnels to You)',
      'Support Ticket Macros',
      'Terms of Service & Privacy Policy',
      'Marketing Automation Workflows',
      'Churn-Busting Email Sequence',
      'White-Label Portal Branding Guide'
    ],
    previewItems: [
        'SaaS Mode Snapshot Link',
        'Migration Checklist',
        'Legal Templates (TOS/Privacy)',
        'Onboarding Email Sequence'
    ],
    stripeLink: "https://buy.stripe.com/test_kit_agency_os"
  },

  // 5. Authority Builder Kit (matches "The Authority Builder" stack)
  {
    id: 'kit-authority',
    title: 'Authority Builder Kit',
    price: '$599',
    value: '$3,500',
    description: 'Sell high-ticket backlink packages with zero outreach. Includes pricing sheets and unbranded case studies that prove ROI.',
    tags: ['SEO', 'Link Building', 'High Margin'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    features: [
      'White-Label "Domain Authority" Sales Deck',
      'Link Pricing Calculator (Markup Sheet)',
      'Outreach Email Scripts for Agencies',
      'Sample White-Label SEO Report',
      'Service Agreement Template',
      'Client Intake Form (Target Keywords)',
      'Vendor Partnership List'
    ],
    previewItems: [
        'Link Building Proposal Template',
        'Pricing Calculator',
        'Vendor Contact List',
        'Sample DA Report'
    ],
    stripeLink: "https://buy.stripe.com/test_kit_authority"
  },

  // 6. AI Agent Studio Kit (matches "AI Agent Studio" stack)
  {
    id: 'kit-ai-agent',
    title: 'AI Agent Studio Kit',
    price: '$899',
    value: '$5,000',
    description: 'Everything you need to sell "AI Employees" to local businesses. Capitalize on the AI boom. Includes the ROI Calculator that proves 50% cost savings.',
    tags: ['AI', 'Chatbots', 'Cutting Edge'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    features: [
      'AI Agent Demo Scripts (Real Estate & Support)',
      'ROI Calculator: "Cost of Human vs. AI"',
      'Stammer.ai Setup Checklist',
      'Prompt Engineering Cheat Sheet',
      'Cold Email Sequence: "Fire your support team?"',
      'Bot Personality Template',
      'Voice AI Implementation Guide'
    ],
    previewItems: [
        'AI Demo Videos',
        'ROI Calculator',
        'Setup Checklist',
        'Prompt Library'
    ],
    stripeLink: "https://buy.stripe.com/test_kit_ai_agent"
  },

  // 7. Instant Traffic Kit (matches "Instant Traffic System" stack)
  {
    id: 'kit-ppc-traffic',
    title: 'Instant Traffic Kit',
    price: '$799',
    value: '$4,200',
    description: 'Stop losing clients to bad ad performance. Sell managed Google Ads with confidence. Includes media buyer vetting guide.',
    tags: ['Ads', 'Lead Gen', 'Performance'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    features: [
      'Google Ads Sales Proposal Template',
      'Client Onboarding Checklist',
      'Ad Spend vs. Management Fee Calculator',
      'Common Objections Battlecard',
      'Monthly Reporting Email Template',
      'Media Buyer Vetting Guide',
      'Campaign Structure Templates'
    ],
    previewItems: [
        'Proposal Template',
        'Fee Calculator',
        'Vetting Checklist',
        'Reporting Dashboard'
    ],
    stripeLink: "https://buy.stripe.com/test_kit_ppc_traffic"
  },

  // 8. Social Media Automation Kit (matches "Social Media Automation Suite" stack) - NEW
  {
    id: 'kit-social-media',
    title: 'Social Media Automation Kit',
    price: '$499',
    value: '$2,500',
    description: 'Sell "Unlimited Content" packages without hiring a designer. Includes approval workflow templates and content calendar systems.',
    tags: ['Social', 'Content', 'Easy Start'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    features: [
      'Social Media Strategy Questionnaire',
      'Content Calendar Template (Notion/Sheet)',
      'Approval Workflow SOP',
      'Canva Templates for Agency Branding',
      'Influencer Outreach Scripts',
      'Monthly Engagement Report Template',
      'Hashtag Research Guide',
      'Platform-Specific Best Practices'
    ],
    previewItems: [
        'Strategy Questionnaire',
        'Content Calendar',
        'Canva Template Pack',
        'Engagement Report'
    ],
    stripeLink: "https://buy.stripe.com/test_kit_social_media"
  },

  // 9. Web Design Launch Kit (matches "High-Converting Web Design" stack) - NEW
  {
    id: 'kit-web-design',
    title: 'Web Design Launch Kit',
    price: '$699',
    value: '$3,800',
    description: 'Sell $5k websites without writing code. Includes the "Website-as-a-Service" recurring contract that generates monthly income.',
    tags: ['Web Design', 'Recurring', 'High Value'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop',
    features: [
      'Website-as-a-Service Contract (Recurring)',
      'Client Design Brief / Intake Form',
      'Pre-Launch SEO Checklist',
      'Hosting Handover Protocol',
      '"Why Custom vs Wix" Sales One-Pager',
      'Portfolio Presentation Template',
      'Maintenance Package Pricing',
      'Content Migration Checklist'
    ],
    previewItems: [
        'WaaS Contract Template',
        'Design Brief Form',
        'SEO Checklist',
        'Sales One-Pager'
    ],
    stripeLink: "https://buy.stripe.com/test_kit_web_design"
  },

  // 10. Digital Vegas Launch Kit (matches "The 'Digital Vegas' Stack" stack)
  {
    id: 'kit-casino',
    title: 'Digital Vegas Launch Kit',
    price: '$2,499',
    value: '$25,000+',
    description: 'The ultimate high-ticket offer. Sell turnkey online casino launches for $25k-$75k upfront. Includes the "Casino Launch" sales script that closed a $50k deal last month.',
    tags: ['Mega High Ticket', 'iGaming', 'Blue Ocean'],
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=800&auto=format&fit=crop',
    features: [
      'Vendor Comparison Matrix (SoftSwiss vs NuxGame vs BetConstruct)',
      'White-Label Casino Proposal Template ($50k Value)',
      'Licensing & Compliance Roadmap (Curacao/Malta)',
      'Game Lobby Configuration Guide',
      'Payment Gateway Integration Checklist',
      'The "Casino Launch" Sales Script',
      'Player Retention & VIP Tier Framework',
      'Responsible Gambling Framework'
    ],
    previewItems: [
        '30-Page Proposal Template',
        'License Application Guide',
        'Vendor Contact List (Direct)',
        'VIP Player Tier Structure'
    ],
    stripeLink: "https://buy.stripe.com/test_kit_casino"
  }
];
export const MEMBERSHIP_TIERS = [
  {
    name: 'Starter (Free)',
    price: '$0',
    period: '/forever',
    description: 'Access to the Power-Up Marketplace and Affiliate Discounts.',
    features: [
      'Browse 100+ White-Label Tools',
      'Access to Wholesale Pricing',
      'Basic Profit Calculator',
      'Public Blog Access'
    ],
    cta: 'Current Plan',
    highlight: false
  },
  {
    name: 'Agency Builder',
    price: '$99',
    period: '/month',
    description: 'Access to the library of proven stacks and benchmarks.',
    features: [
      'Access to 2 Core Stack Playbooks',
      'Monthly Market Updates',
      'Vendor Intro Database',
      'Community Forum Access',
      'Email Support'
    ],
    cta: 'Join the Inner Circle',
    highlight: true
  },
  {
    name: 'Growth Partner',
    price: '$299',
    period: '/month',
    description: 'Full access to all assets, direct support, and office hours.',
    features: [
      'Unlimited Access to ALL Playbooks',
      'All 7 Resell Kits Included (Drip Fed)',
      'Bi-Weekly Strategy Office Hours',
      'Priority Vendor Support Channel',
      'Private Discord Channel',
      'Quarterly 1-on-1 Audit'
    ],
    cta: 'Apply for Partnership',
    highlight: false
  }
];

export const IMPLEMENTATION_STEPS = [
  {
    week: 'Week 1-2',
    title: 'Deep Dive & Strategy',
    description: 'We audit your current agency model, identify the lowest-hanging fruit, and select your primary "Flagship Stack".'
  },
  {
    week: 'Week 3-4',
    title: 'Vendor Setup & Negotiation',
    description: 'We set up your white-label fulfillment accounts, negotiate wholesale rates on your behalf, and integrate the tech.'
  },
  {
    week: 'Week 5-6',
    title: 'Asset Customization',
    description: 'We customize the Resell Kits with your branding. Sales pages, proposals, and contracts are done for you.'
  },
  {
    week: 'Week 7-8',
    title: 'Launch & First Close',
    description: 'We roleplay the sales script with you, help launch your first email campaign, and support you in closing your first deal.'
  }
];

export const ALL_SOLUTIONS: Solution[] = [
{
  id: 'zappychat',
  name: 'ZappyChat',
  companyName: 'ZappyChat',
  companyWebsite: 'https://zappychat.com/',
  tagline: 'AI Booking Agent for GHL.',
  shortDescription: 'An AI conversationalist that lives inside GoHighLevel and books appointments 24/7.',
  detailedDescription: 'ZappyChat is an AI wrapper built specifically for GoHighLevel agencies. It uses OpenAI to converse with leads via SMS/FB/IG and book them directly onto the GHL calendar. Zero coding required.',
  primaryCategory: 'Business Operations & SaaS',
  subCategory: 'AI & Automation',
  tags: ['AI', 'GHL', 'Booking'],
  logo: 'https://zappychat.com/wp-content/uploads/2023/01/ZappyChat-Logo.png', // Replace with local asset if needed
  rating: 4.8,
  implementations: 3500,
  isVerified: true,
  whitelabelType: 'White Label Option',
  pricingModel: ['Subscription'],
  agencyMargin: 70,
  startingPrice: '$97/month',
  setupFee: 'None',
  minimumCommitment: 'Monthly',
  implementationTime: '15 Minutes',
  integrationMethods: ['Native GHL'],
  idealClientSize: ['Small Business'],
  features: ['Calendar Booking', 'Custom Knowledge Base', 'Multi-Language', 'GHL Snapshot'],
  partnerSupportModel: 'Community',
  reviews: [],
  agencyReadiness: { hasCustomDomain: false, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: false },
  valueAddons: ['Snapshot Included'],
  vendorTrust: { hasPublicRoadmap: true, hasSLA: false, hasDataMigration: true }
},
{
  id: 'uphex',
  name: 'UpHex',
  companyName: 'UpHex',
  companyWebsite: 'https://uphex.com/',
  tagline: 'Launch Facebook Ads in 3 Clicks.',
  shortDescription: 'Embedded ad launching software for GoHighLevel. Let clients launch their own ads.',
  detailedDescription: 'UpHex allows agencies to create a library of proven Facebook/Instagram ad templates. Clients can then log in to your GHL portal, select a template, and launch an ad campaign in 3 clicks without leaving your software.',
  primaryCategory: 'Marketing & Advertising',
  subCategory: 'PPC & Paid Media',
  tags: ['Facebook Ads', 'SaaS Mode', 'GHL'],
  logo: 'https://uphex.com/wp-content/uploads/2022/01/UpHex-Logo-Black.svg',
  rating: 4.9,
  implementations: 5000,
  isVerified: true,
  whitelabelType: 'Full White Label',
  pricingModel: ['Subscription'],
  agencyMargin: 90,
  startingPrice: '$97/month',
  setupFee: 'None',
  minimumCommitment: 'Monthly',
  implementationTime: '1 Hour',
  integrationMethods: ['Embeddable Iframe', 'Native GHL'],
  idealClientSize: ['Small Business', 'Franchise'],
  features: ['Template Library', 'Auto-Reporting', 'Client Self-Service', 'Ad Spend Optimization'],
  partnerSupportModel: 'Direct to Vendor',
  reviews: [],
  agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: true, hasResellerBilling: true },
  valueAddons: ['Ad Template Library'],
  vendorTrust: { hasPublicRoadmap: true, hasSLA: true, hasDataMigration: true }
},
{
  id: 'nicejob',
  name: 'NiceJob',
  companyName: 'NiceJob',
  companyWebsite: 'https://nicejob.com/',
  tagline: 'The easiest way to get more reviews.',
  shortDescription: 'Automated review generation with a "smart funnel" to filter negative feedback.',
  detailedDescription: 'NiceJob is a reputation marketing platform designed for local businesses. Its "Stories" feature automatically shares 5-star reviews to social media as proof.',
  primaryCategory: 'Marketing & Advertising',
  subCategory: 'Reputation & Reviews',
  tags: ['Reviews', 'Social Proof', 'Local'],
  logo: 'https://assets-global.website-files.com/605a1e36e3f4337557477733/605a1e36e3f4337e5f477764_nicejob-logo.svg',
  rating: 4.8,
  implementations: 10000,
  isVerified: true,
  whitelabelType: 'Partner Program',
  pricingModel: ['Per Client'],
  agencyMargin: 40,
  startingPrice: '$75/month',
  setupFee: 'None',
  minimumCommitment: 'Monthly',
  implementationTime: 'Instant',
  integrationMethods: ['Zapier', 'Widget'],
  idealClientSize: ['Small Business'],
  features: ['Smart Routing', 'Social Sharing', 'SMS Requests', 'Microsites'],
  partnerSupportModel: 'Vendor-led',
  reviews: [],
  agencyReadiness: { hasCustomDomain: false, canRemoveBranding: false, hasWhiteLabelMobileApp: true, hasResellerBilling: true },
  valueAddons: ['Partner Portal'],
  vendorTrust: { hasPublicRoadmap: false, hasSLA: true, hasDataMigration: true }
},
{
  id: 'klaviyo',
  name: 'Klaviyo',
  companyName: 'Klaviyo',
  companyWebsite: 'https://www.klaviyo.com/',
  tagline: 'Intelligent marketing automation for e-commerce.',
  shortDescription: 'The gold standard for e-commerce email and SMS marketing.',
  detailedDescription: 'While not fully "white-label" in the UI, Klaviyo is the industry standard for Agency Partners. You manage the account, own the strategy, and bill the client for "Email Management services."',
  primaryCategory: 'Marketing & Advertising',
  subCategory: 'Email & Marketing Automation',
  tags: ['Email', 'E-com', 'SMS'],
  logo: 'https://static.klaviyo.com/wp-content/uploads/2018/06/Klaviyo-Logo-Black.png',
  rating: 4.9,
  implementations: 100000,
  isVerified: true,
  whitelabelType: 'Agency Partner',
  pricingModel: ['Usage Based'],
  agencyMargin: 20, // Referral comms, mainly service margin
  startingPrice: 'Free',
  setupFee: 'None',
  minimumCommitment: 'None',
  implementationTime: 'Instant',
  integrationMethods: ['Native Shopify', 'API'],
  idealClientSize: ['E-commerce'],
  features: ['Flow Builder', 'Segmentation', 'Predictive Analytics', 'A/B Testing'],
  partnerSupportModel: 'Vendor-led',
  reviews: [],
  agencyReadiness: { hasCustomDomain: false, canRemoveBranding: false, hasWhiteLabelMobileApp: true, hasResellerBilling: false },
  valueAddons: ['Certification Program'],
  vendorTrust: { hasPublicRoadmap: true, hasSLA: true, hasDataMigration: true }
},
{
  id: 'postscript',
  name: 'Postscript',
  companyName: 'Postscript',
  companyWebsite: 'https://postscript.io/',
  tagline: 'SMS Marketing for Shopify.',
  shortDescription: 'Dedicated SMS platform for e-commerce brands with deep Shopify integration.',
  detailedDescription: 'Postscript allows agencies to build high-ROI SMS flows (Welcome, Abandoned Cart) for Shopify stores. Excellent agency partner program.',
  primaryCategory: 'Marketing & Advertising',
  subCategory: 'Email & Marketing Automation',
  tags: ['SMS', 'E-com', 'Shopify'],
  logo: 'https://postscript.io/images/logo-black.svg',
  rating: 4.8,
  implementations: 8000,
  isVerified: true,
  whitelabelType: 'Agency Partner',
  pricingModel: ['Usage Based'],
  agencyMargin: 20,
  startingPrice: '$0/mo + Usage',
  setupFee: 'None',
  minimumCommitment: 'None',
  implementationTime: 'Instant',
  integrationMethods: ['Native Shopify'],
  idealClientSize: ['E-commerce'],
  features: ['Compliance', 'Flow Builder', 'Conversational SMS', 'Safe Send'],
  partnerSupportModel: 'Vendor-led',
  reviews: [],
  agencyReadiness: { hasCustomDomain: false, canRemoveBranding: false, hasWhiteLabelMobileApp: false, hasResellerBilling: false },
  valueAddons: ['Playbooks'],
  vendorTrust: { hasPublicRoadmap: true, hasSLA: true, hasDataMigration: true }
},
  {
    id: 'cal-com-scheduling',
    name: 'Cal.com White-Label Scheduling',
    companyName: 'Cal.com',
    companyWebsite: 'https://cal.com/',
    tagline: 'The open-source scheduling infrastructure for everyone.',
    shortDescription: 'A 100% white-label, open-source scheduling platform that agencies can self-host or use via the cloud.',
    detailedDescription: 'Cal.com is a highly flexible and developer-friendly scheduling platform. Its open-source nature allows for deep customization, and its white-label options enable agencies to offer a completely branded scheduling solution to their clients. It can be self-hosted for full control or used via their cloud service for ease of use.',
    primaryCategory: 'Business Operations & SaaS',
    subCategory: 'Booking & Scheduling',
    tags: ['Scheduling', 'Open Source', 'API-first'],
    logo: 'https://i.imgur.com/ODs02d2.png',
    rating: 4.9,
    implementations: 10000,
    isVerified: true,
    isFeatured: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Monthly Subscription', 'Per-User/Per-Seat Pricing'],
    agencyMargin: 40,
    startingPrice: '$12/user/month',
    setupFee: 'No Setup Fee',
    minimumCommitment: 'Monthly',
    implementationTime: 'Instant / Self-service',
    integrationMethods: ['REST API', 'Webhook Support', 'Embeddable Iframe / Widget'],
    idealClientSize: ['Small Business (1-50 employees)', 'Mid-Market (51-1000 employees)', 'Enterprise (1000+ employees)'],
    features: [
      'Fully brandable and customizable scheduling pages',
      'Open-source with self-hosting option',
      'Routing forms for complex scheduling logic',
      'Team scheduling and round-robin assignments',
      'Extensive integrations with calendars and apps'
    ],
    partnerSupportModel: 'Hybrid',
    reviews: [
      { id: 'rev-cal-1', agencyName: 'Growth Gurus', rating: 5, title: 'An absolute game-changer for us', comment: 'The flexibility of the API allowed us to build a scheduling experience that is perfectly tailored to our clients. Self-hosting gives us full control. Highly recommend!', date: '2023-09-15' },
      { id: 'rev-cal-2', agencyName: 'SaaS Wizards', rating: 4, title: 'Great product, steep learning curve', comment: 'Powerful tool, but be prepared to invest some developer time to get the most out of it. The end result is worth it though.', date: '2023-08-20' }
    ],
    agencyReadiness: {
      hasCustomDomain: true,
      canRemoveBranding: true,
      hasWhiteLabelMobileApp: false,
      hasResellerBilling: true,
    },
    valueAddons: ['Open Source Codebase'],
    vendorTrust: {
        hasPublicRoadmap: true,
        hasSLA: true,
        hasDataMigration: true,
    },
    resellRange: "$50-$150/mo"
  },
  {
    id: 'reviewboost-ai',
    name: 'ReviewBoost AI',
    companyName: 'ReviewBoost',
    companyWebsite: 'https://reviewboost.example.com/',
    tagline: 'Automate review generation on autopilot.',
    shortDescription: 'A white-label platform to help local businesses automatically collect more positive reviews on Google, Yelp, and more.',
    detailedDescription: 'ReviewBoost AI connects with a business\'s CRM or payment system to automatically text or email customers after a transaction, asking for a review. It intelligently routes happy customers to review sites and unhappy customers to a private feedback form, protecting the business\'s online reputation.',
    primaryCategory: 'Marketing & Advertising',
    subCategory: 'Reputation & Reviews',
    tags: ['Reputation Management', 'Local SEO', 'Automation'],
    logo: 'https://picsum.photos/seed/reviews/100/100',
    rating: 4.8,
    implementations: 2500,
    isVerified: true,
    isFeatured: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Volume-Based Tiers', 'Per-User/Per-Seat Pricing'],
    agencyMargin: 60,
    startingPrice: '$149/month',
    setupFee: '$250 one-time',
    minimumCommitment: 'Monthly',
    implementationTime: '1-3 Business Days',
    integrationMethods: ['Zapier Integration', 'REST API'],
    idealClientSize: ['Small Business (1-50 employees)'],
    features: [
      'Automated review requests via SMS and email',
      'Sentiment analysis to filter feedback',
      'Dashboard for monitoring reviews across sites',
      'Customizable branding and messaging',
      'Direct integration with major review platforms'
    ],
    partnerSupportModel: 'Agency-led',
    reviews: [
      { id: 'rev-rb-1', agencyName: 'Local SEO Pros', rating: 5, title: 'Our clients love this!', comment: 'We\'ve seen a 300% increase in positive reviews for our clients since implementing ReviewBoost. It\'s easy to set up and pretty much runs itself.', date: '2023-10-05' },
    ],
    agencyReadiness: {
      hasCustomDomain: true,
      canRemoveBranding: true,
      hasWhiteLabelMobileApp: false,
      hasResellerBilling: true,
    },
    valueAddons: ['White-Label Knowledge Base', 'Industry Templates'],
    vendorTrust: {
        hasPublicRoadmap: false,
        hasSLA: true,
        hasDataMigration: false,
    },
    resellRange: "$299-$499/mo"
  },
  {
    id: 'sol-1',
    name: 'Payment Processing via Stripe Connect',
    companyName: 'Stripe',
    companyWebsite: 'https://stripe.com/connect',
    tagline: 'The payments platform for platforms.',
    shortDescription: 'Offer branded payment processing and financial services to your clients.',
    detailedDescription: 'Stripe Connect is a white-label solution that allows platforms and agencies to facilitate payments for their clients. You can build a fully branded payment experience, manage payouts, and offer financial services, all while Stripe handles the complexity of payment processing, security, and compliance.',
    primaryCategory: 'Fintech, Blockchain & Web3',
    subCategory: 'Payments & Banking',
    tags: ['Payments', 'API / SDK-first', 'High Margin'],
    logo: 'https://picsum.photos/seed/stripe/100/100',
    rating: 4.9,
    implementations: 25000,
    isVerified: true,
    whitelabelType: 'API / SDK-first',
    pricingModel: ['Usage-Based', 'Revenue Share'],
    agencyMargin: 40,
    startingPrice: 'Usage-Based',
    setupFee: 'No Setup Fee',
    minimumCommitment: 'None',
    implementationTime: '1-2 Weeks',
    integrationMethods: ['REST API', 'SDK/Library'],
    idealClientSize: ['Small Business (1-50 employees)', 'Mid-Market (51-1000 employees)'],
    features: ['Fully Branded & Customizable Payment UI', 'Onboard and Verify Clients Securely (KYC)', 'Facilitate Payments for Multiple Parties', 'Manage Complex Payouts and Fund Flows'],
    partnerSupportModel: 'Direct to Vendor',
    reviews: [],
    agencyReadiness: {
      hasCustomDomain: true,
      canRemoveBranding: true,
      hasWhiteLabelMobileApp: false,
      hasResellerBilling: true,
    },
    valueAddons: [],
    vendorTrust: {
        hasPublicRoadmap: true,
        hasSLA: true,
        hasDataMigration: true,
    }
  },
  {
    id: 'sol-2',
    name: 'Agency-Ready Social Media Scheduler',
    companyName: 'SocialBloom',
    companyWebsite: 'https://socialbloom.example.com',
    tagline: 'A complete social media management platform under your brand.',
    shortDescription: 'A complete social media management platform under your brand.',
    detailedDescription: 'SocialBloom offers a fully white-labeled dashboard for scheduling posts, tracking analytics, and managing client approvals. Provide your clients with a powerful social media tool that carries your agency\'s branding throughout.',
    primaryCategory: 'Marketing & Advertising',
    subCategory: 'Social Media Marketing',
    tags: ['Social Media', 'Turnkey Solution', 'Easy to Use'],
    logo: 'https://picsum.photos/seed/social/100/100',
    rating: 4.8,
    implementations: 5000,
    isVerified: true,
    isFeatured: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Per-User/Per-Seat Pricing', 'Volume-Based Tiers'],
    agencyMargin: 50,
    startingPrice: '$99/month',
    setupFee: 'No Setup Fee',
    minimumCommitment: 'Quarterly',
    implementationTime: '1-3 Business Days',
    integrationMethods: ['No-code Integration', 'Zapier Integration'],
    idealClientSize: ['Small Business (1-50 employees)'],
    features: ['Content Calendar & Scheduling', 'Client Approval Workflows', 'Branded Analytics Reports', 'Inbox Management'],
    partnerSupportModel: 'Agency-led',
    reviews: [
        { id: 'rev-sb-1', agencyName: 'Marketing Mavericks', rating: 5, title: 'The perfect turnkey solution', comment: 'We were up and running in a day. Our clients find it intuitive and the branded reports are a professional touch that they appreciate.', date: '2023-09-01' },
        { id: 'rev-sb-2', agencyName: 'Brand Builders Co.', rating: 4, title: 'Solid and reliable', comment: 'It does exactly what it says it will. Doesn\'t have all the bells and whistles of some enterprise tools, but for the price and ease of use, it\'s unbeatable for SMB clients.', date: '2023-07-11' }
    ],
    agencyReadiness: {
      hasCustomDomain: true,
      canRemoveBranding: true,
      hasWhiteLabelMobileApp: true,
      hasResellerBilling: true,
    },
    valueAddons: ['Pre-built Content Calendar Templates', 'Automation Workflows'],
    vendorTrust: {
        hasPublicRoadmap: true,
        hasSLA: true,
        hasDataMigration: false,
    }
  },
  {
    id: 'seoreseller',
    name: 'SEOReseller',
    companyName: 'SEOReseller',
    companyWebsite: 'https://www.seoreseller.com/',
    tagline: 'White Label SEO & Digital Marketing.',
    shortDescription: 'Comprehensive white label SEO services and dashboard.',
    detailedDescription: 'SEOReseller provides a robust platform for agencies to outsource SEO deliverables while maintaining full brand control. Includes a client dashboard, reporting, and fulfillment services.',
    primaryCategory: 'Marketing & Advertising',
    subCategory: 'SEO & Search Marketing',
    tags: ['SEO', 'Fulfillment', 'Dashboard'],
    logo: 'https://picsum.photos/seed/seoreseller/100/100',
    rating: 4.8,
    implementations: 5000,
    isVerified: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Volume-Based Tiers'],
    agencyMargin: 80,
    startingPrice: '$397/month',
    setupFee: 'Varies',
    minimumCommitment: 'Monthly',
    implementationTime: '1-3 Days',
    integrationMethods: ['API', 'Dashboard'],
    idealClientSize: ['Small Business', 'Mid-Market'],
    features: ['White Label Dashboard', 'SEO Audits', 'Link Building', 'Content Writing'],
    partnerSupportModel: 'Agency-led',
    reviews: [],
    agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: true },
    valueAddons: ['Sales Support', 'Proposal Generator'],
    vendorTrust: { hasPublicRoadmap: true, hasSLA: true, hasDataMigration: true }
  },
  {
    id: 'dashclicks',
    name: 'DashClicks',
    companyName: 'DashClicks',
    companyWebsite: 'https://www.dashclicks.com/',
    tagline: 'The operating system for digital agencies.',
    shortDescription: 'All-in-one agency platform with white label fulfillment services.',
    detailedDescription: 'DashClicks offers a suite of tools for agencies including a client dashboard, reporting, and a fulfillment store for services like SEO, PPC, and social media.',
    primaryCategory: 'Business Operations & SaaS',
    subCategory: 'Agency Management & Productivity',
    tags: ['Fulfillment', 'Dashboard', 'CRM'],
    logo: 'https://picsum.photos/seed/dashclicks/100/100',
    rating: 4.7,
    implementations: 8000,
    isVerified: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Subscription', 'Per-Service'],
    agencyMargin: 70,
    startingPrice: 'Free',
    setupFee: 'None',
    minimumCommitment: 'None',
    implementationTime: 'Instant',
    integrationMethods: ['Native', 'Zapier'],
    idealClientSize: ['Small Business'],
    features: ['Client Dashboard', 'Fulfillment Store', 'Reporting', 'CRM'],
    partnerSupportModel: 'Hybrid',
    reviews: [],
    agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: true, hasResellerBilling: true },
    valueAddons: ['Agency University', 'InstaSites'],
    vendorTrust: { hasPublicRoadmap: true, hasSLA: false, hasDataMigration: true }
  },
  {
    id: 'birdeye-whitelabel',
    name: 'Birdeye White Label',
    companyName: 'Birdeye',
    companyWebsite: 'https://birdeye.com/partner/white-label-reseller/',
    tagline: 'Reputation management and review collection for agencies.',
    shortDescription: 'Best for agency white label reputation management and review collection, plus communications and client-facing analytics.',
    detailedDescription: 'Birdeye is an all-in-one experience marketing platform that helps businesses with reputation management, customer reviews, and communication. Their white-label program lets agencies resell these services under their own brand.',
    primaryCategory: 'Marketing & Advertising',
    subCategory: 'Reputation & Reviews',
    tags: ['Reputation Management', 'Reviews', 'Customer Experience'],
    logo: 'https://picsum.photos/seed/birdeye/100/100',
    rating: 4.7,
    implementations: 20000,
    isVerified: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Custom Pricing'],
    agencyMargin: 80,
    startingPrice: '$297/month',
    setupFee: 'Varies',
    minimumCommitment: 'Annual',
    implementationTime: '1-2 Weeks',
    integrationMethods: ['REST API', 'Zapier Integration'],
    idealClientSize: ['Small Business (1-50 employees)', 'Mid-Market (51-1000 employees)'],
    features: ['Automated review generation', 'Multi-site review monitoring', 'Webchat and messaging tools', 'Client-facing analytics dashboards', 'Full platform rebranding'],
    partnerSupportModel: 'Hybrid',
    reviews: [],
    agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: true, hasResellerBilling: true },
    valueAddons: ['White-Label Knowledge Base', 'Automation Workflows'],
    vendorTrust: { hasPublicRoadmap: false, hasSLA: true, hasDataMigration: false }
  },
  {
    id: 'adbrew',
    name: 'AdBrew',
    companyName: 'AdBrew',
    companyWebsite: 'https://adbrew.io/',
    tagline: 'White label Google Ads management.',
    shortDescription: 'Specialized white label Google Ads and LSA management for agencies.',
    detailedDescription: 'AdBrew provides expert Google Ads management and Local Services Ads (LSA) fulfillment under your agency brand. They handle campaign setup, optimization, and reporting.',
    primaryCategory: 'Marketing & Advertising',
    subCategory: 'PPC & Paid Media',
    tags: ['Google Ads', 'LSA', 'PPC'],
    logo: 'https://picsum.photos/seed/adbrew/100/100',
    rating: 4.9,
    implementations: 1000,
    isVerified: true,
    whitelabelType: 'Service',
    pricingModel: ['Flat Fee + % Ad Spend'],
    agencyMargin: 82,
    startingPrice: '$492/month',
    setupFee: 'Varies',
    minimumCommitment: 'Monthly',
    implementationTime: '3-5 Days',
    integrationMethods: ['Dashboard'],
    idealClientSize: ['Small Business', 'Mid-Market'],
    features: ['Campaign Setup', 'Weekly Optimization', 'White Label Reporting', 'LSA Management'],
    partnerSupportModel: 'Agency-led',
    reviews: [],
    agencyReadiness: { hasCustomDomain: false, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: false },
    valueAddons: ['Proposal Support'],
    vendorTrust: { hasPublicRoadmap: false, hasSLA: true, hasDataMigration: false }
  },
  {
    id: 'adcreative-ai',
    name: 'AdCreative.ai',
    companyName: 'AdCreative.ai',
    companyWebsite: 'https://www.adcreative.ai/',
    tagline: 'Artificial Intelligence for high-converting ad creatives.',
    shortDescription: 'Generate conversion-focused ad creatives in seconds with AI.',
    detailedDescription: 'AdCreative.ai allows agencies to generate high-performing ad creatives for Facebook, Instagram, and Google Ads at scale using artificial intelligence.',
    primaryCategory: 'Creative & Content Services',
    subCategory: 'Graphic & Brand Design',
    tags: ['AI', 'Ad Creatives', 'Automation'],
    logo: 'https://picsum.photos/seed/adcreative/100/100',
    rating: 4.6,
    implementations: 15000,
    isVerified: true,
    whitelabelType: 'White Label Option',
    pricingModel: ['Subscription'],
    agencyMargin: 85,
    startingPrice: '$592/month (Package)',
    setupFee: 'None',
    minimumCommitment: 'Monthly',
    implementationTime: 'Instant',
    integrationMethods: ['API', 'Platform'],
    idealClientSize: ['Small Business', 'E-commerce'],
    features: ['AI Creative Generation', 'Text Generator', 'Creative Insights', 'White Label Platform'],
    partnerSupportModel: 'Direct to Vendor',
    reviews: [],
    agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: false },
    valueAddons: ['$500 Google Ads Credit'],
    vendorTrust: { hasPublicRoadmap: true, hasSLA: false, hasDataMigration: false }
  },
  {
    id: 'revealbot',
    name: 'Revealbot',
    companyName: 'Revealbot',
    companyWebsite: 'https://revealbot.com/',
    tagline: 'Advanced ad automation for Facebook, Instagram, and Google.',
    shortDescription: 'Automate your ad management strategies with rules and alerts.',
    detailedDescription: 'Revealbot helps agencies scale ad performance through automated rules, bulk creation, and cross-platform reporting for Facebook, TikTok, and Google Ads.',
    primaryCategory: 'Marketing & Advertising',
    subCategory: 'PPC & Paid Media',
    tags: ['Automation', 'Ads', 'Scaling'],
    logo: 'https://picsum.photos/seed/revealbot/100/100',
    rating: 4.7,
    implementations: 5000,
    isVerified: true,
    whitelabelType: 'Reporting',
    pricingModel: ['Spend-Based'],
    agencyMargin: 85,
    startingPrice: '$99/month',
    setupFee: 'None',
    minimumCommitment: 'Monthly',
    implementationTime: 'Instant',
    integrationMethods: ['API'],
    idealClientSize: ['E-commerce', 'Mid-Market'],
    features: ['Automated Rules', 'Bulk Creation', 'White Label Reports', 'Multi-platform Support'],
    partnerSupportModel: 'Direct to Vendor',
    reviews: [],
    agencyReadiness: { hasCustomDomain: false, canRemoveBranding: false, hasWhiteLabelMobileApp: false, hasResellerBilling: false },
    valueAddons: ['Strategies Library'],
    vendorTrust: { hasPublicRoadmap: true, hasSLA: false, hasDataMigration: false }
  },
  {
    id: 'gohighlevel',
    name: 'GoHighLevel',
    companyName: 'HighLevel',
    companyWebsite: 'https://www.gohighlevel.com/',
    tagline: 'The all-in-one sales & marketing platform for agencies.',
    shortDescription: 'Complete white-label platform replacing CRM, email, funnels, and more.',
    detailedDescription: 'GoHighLevel is the ultimate agency operating system. It combines CRM, email marketing, SMS, funnel building, and more into one white-label platform you can resell as your own SaaS.',
    primaryCategory: 'Business Operations & SaaS',
    subCategory: 'CRM & Sales',
    tags: ['CRM', 'All-in-one', 'Funnels', 'SaaS Mode'],
    logo: 'https://picsum.photos/seed/ghl/100/100',
    rating: 4.9,
    implementations: 40000,
    isVerified: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Subscription', 'SaaS Mode'],
    agencyMargin: 86,
    startingPrice: '$497/month (Agency Unlimited)',
    setupFee: 'None',
    minimumCommitment: 'Monthly',
    implementationTime: '1 Week',
    integrationMethods: ['API', 'Zapier', 'Native'],
    idealClientSize: ['Small Business', 'Mid-Market', 'Enterprise'],
    features: ['CRM', 'Funnel Builder', 'Email & SMS', 'White Label Mobile App', 'SaaS Re-billing'],
    partnerSupportModel: 'Hybrid',
    reviews: [],
    agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: true, hasResellerBilling: true },
    valueAddons: ['Snapshots', 'Community'],
    vendorTrust: { hasPublicRoadmap: true, hasSLA: true, hasDataMigration: true }
  },
  {
    id: 'hiconversions',
    name: 'HiConversions',
    companyName: 'HiConversions',
    companyWebsite: 'https://hiconversions.com',
    tagline: 'White label web design and hosting.',
    shortDescription: 'Scalable white label web design and hosting fulfillment.',
    detailedDescription: 'HiConversions provides white-label web design and hosting services, allowing agencies to offer high-quality websites without the need for in-house designers or developers.',
    primaryCategory: 'Web & App Development',
    subCategory: 'Website Design & Development',
    tags: ['Web Design', 'Hosting', 'Fulfillment'],
    logo: 'https://picsum.photos/seed/hiconversions/100/100',
    rating: 4.5,
    implementations: 500,
    isVerified: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Per Site'],
    agencyMargin: 78,
    startingPrice: '$297/site/month',
    setupFee: 'Varies',
    minimumCommitment: 'Per Project',
    implementationTime: '2-4 Weeks',
    integrationMethods: ['None'],
    idealClientSize: ['Small Business'],
    features: ['Custom Design', 'Hosting', 'Maintenance', 'White Label Dashboard'],
    partnerSupportModel: 'Agency-led',
    reviews: [],
    agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: false },
    valueAddons: [],
    vendorTrust: { hasPublicRoadmap: false, hasSLA: true, hasDataMigration: true }
  },
  {
    id: 'contentstudio',
    name: 'ContentStudio',
    companyName: 'ContentStudio',
    companyWebsite: 'https://contentstudio.io/',
    tagline: 'Unified social media management platform.',
    shortDescription: 'Discover, plan, and publish content across all social channels.',
    detailedDescription: 'ContentStudio offers a powerful suite for social media management and content marketing with strong white-label capabilities for agencies.',
    primaryCategory: 'Marketing & Advertising',
    subCategory: 'Social Media Marketing',
    tags: ['Social Media', 'Content Curation', 'Publishing'],
    logo: 'https://picsum.photos/seed/contentstudio/100/100',
    rating: 4.7,
    implementations: 8000,
    isVerified: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Subscription'],
    agencyMargin: 84,
    startingPrice: '$397/month',
    setupFee: 'None',
    minimumCommitment: 'Monthly',
    implementationTime: 'Instant',
    integrationMethods: ['API'],
    idealClientSize: ['Small Business', 'Mid-Market'],
    features: ['Social Inbox', 'Content Discovery', 'Automation', 'White Label Reports'],
    partnerSupportModel: 'Hybrid',
    reviews: [],
    agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: false },
    valueAddons: ['Content Planner'],
    vendorTrust: { hasPublicRoadmap: true, hasSLA: false, hasDataMigration: false }
  },
  {
    id: 'gopostwise',
    name: 'GoPostWise',
    companyName: 'GoPostWise',
    companyWebsite: 'https://gopostwise.com',
    tagline: 'White label social media content fulfillment.',
    shortDescription: 'Done-for-you social media content and posting.',
    detailedDescription: 'GoPostWise provides white-label social media content creation and posting services, enabling agencies to offer full social management without the overhead.',
    primaryCategory: 'Marketing & Advertising',
    subCategory: 'Social Media Marketing',
    tags: ['Content Creation', 'Fulfillment', 'Social'],
    logo: 'https://picsum.photos/seed/gopostwise/100/100',
    rating: 4.6,
    implementations: 1000,
    isVerified: true,
    whitelabelType: 'Service',
    pricingModel: ['Monthly Subscription'],
    agencyMargin: 84,
    startingPrice: 'Varies',
    setupFee: 'None',
    minimumCommitment: 'Monthly',
    implementationTime: '3-5 Days',
    integrationMethods: ['Dashboard'],
    idealClientSize: ['Small Business'],
    features: ['Content Creation', 'Scheduling', 'Hashtag Research', 'White Label Dashboard'],
    partnerSupportModel: 'Agency-led',
    reviews: [],
    agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: true },
    valueAddons: [],
    vendorTrust: { hasPublicRoadmap: false, hasSLA: true, hasDataMigration: false }
  },
  {
    id: 'softswiss',
    name: 'SoftSwiss',
    companyName: 'SoftSwiss',
    companyWebsite: 'https://www.softswiss.com/',
    tagline: 'The iGaming Engine.',
    shortDescription: 'Leading white-label casino and sportsbook platform aggregator.',
    detailedDescription: 'SoftSwiss offers a powerful white-label casino solution with over 15,000 games, integrated payment processing (including crypto), and a robust back-office. They handle licensing and technical infrastructure.',
    primaryCategory: 'Industry-Specific Platforms',
    subCategory: 'iGaming & Sports Betting',
    tags: ['Casino', 'Sportsbook', 'Crypto', 'Aggregator'],
    logo: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?auto=format&fit=crop&w=100&h=100',
    rating: 4.9,
    implementations: 300,
    isVerified: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Setup Fee + Revenue Share'],
    agencyMargin: 50,
    startingPrice: '$25,000+ Setup',
    setupFee: '$25,000+',
    minimumCommitment: 'Annual',
    implementationTime: '2-4 Months',
    integrationMethods: ['API', 'Turnkey'],
    idealClientSize: ['Enterprise', 'Mid-Market'],
    features: ['15,000+ Games', 'Crypto Payments', 'Affiliate System', 'Licensing Support'],
    partnerSupportModel: 'Vendor-led',
    reviews: [],
    agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: false },
    valueAddons: ['Game Aggregator', 'Jackpot Aggregator'],
    vendorTrust: { hasPublicRoadmap: true, hasSLA: true, hasDataMigration: true }
  },
  {
    id: 'nuxgame',
    name: 'NuxGame',
    companyName: 'NuxGame',
    companyWebsite: 'https://nuxgame.com/',
    tagline: 'Smart iGaming Solutions.',
    shortDescription: 'Turnkey and white-label casino software for rapid launch.',
    detailedDescription: 'NuxGame provides a flexible white-label solution for launching online casinos and sportsbooks quickly. Known for their modern tech stack and relatively fast integration times.',
    primaryCategory: 'Industry-Specific Platforms',
    subCategory: 'iGaming & Sports Betting',
    tags: ['Casino', 'Turnkey', 'Rapid Launch'],
    logo: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&w=100&h=100',
    rating: 4.7,
    implementations: 150,
    isVerified: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Setup Fee + Revenue Share'],
    agencyMargin: 55,
    startingPrice: 'Contact for Quote',
    setupFee: 'Varies',
    minimumCommitment: 'Annual',
    implementationTime: '4-8 Weeks',
    integrationMethods: ['API', 'Turnkey'],
    idealClientSize: ['Small Business', 'Mid-Market'],
    features: ['Casino', 'Sportsbook', 'Agent System', 'Seamless Wallet'],
    partnerSupportModel: 'Hybrid',
    reviews: [],
    agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: true },
    valueAddons: ['Global Payment Methods'],
    vendorTrust: { hasPublicRoadmap: false, hasSLA: true, hasDataMigration: false }
  },
  {
    id: 'betconstruct',
    name: 'BetConstruct',
    companyName: 'BetConstruct',
    companyWebsite: 'https://www.betconstruct.com/',
    tagline: 'The Global Betting Giant.',
    shortDescription: 'Massive ecosystem for betting and gaming businesses.',
    detailedDescription: 'BetConstruct is an industry giant offering white-label solutions for sports betting, esports, casino, live casino, poker, skill games, fantasy sports, social gaming and more.',
    primaryCategory: 'Industry-Specific Platforms',
    subCategory: 'iGaming & Sports Betting',
    tags: ['Sportsbook', 'Casino', 'Live Dealer'],
    logo: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=100&h=100',
    rating: 4.8,
    implementations: 1000,
    isVerified: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Setup Fee + Revenue Share'],
    agencyMargin: 45,
    startingPrice: 'Enterprise',
    setupFee: 'High',
    minimumCommitment: 'Annual',
    implementationTime: '3-6 Months',
    integrationMethods: ['API', 'Turnkey'],
    idealClientSize: ['Enterprise'],
    features: ['Spring Platform', 'Sportsbook', 'Live Casino', 'Data Feed'],
    partnerSupportModel: 'Vendor-led',
    reviews: [],
    agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: true, hasResellerBilling: false },
    valueAddons: ['Managed Trading Services'],
    vendorTrust: { hasPublicRoadmap: true, hasSLA: true, hasDataMigration: true }
  },
  {
    id: 'synthflow',
    name: 'Synthflow AI',
    companyName: 'Synthflow',
    companyWebsite: 'https://synthflow.ai/',
    tagline: 'Build Human-Like Voice Assistants Without Coding.',
    shortDescription: 'No-code conversational AI voice assistants tailored for agencies to resell.',
    detailedDescription: 'Synthflow allows agencies to build, test, and deploy hyper-realistic AI voice assistants in minutes. Perfect for inbound reception, outbound qualification, and appointment setting. Designed with a white-label portal for your clients.',
    primaryCategory: 'Business Operations & SaaS',
    subCategory: 'CRM & Sales',
    tags: ['AI Voice', 'No-Code', 'Automation', 'White Label'],
    logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=100&h=100',
    rating: 4.9,
    implementations: 1200,
    isVerified: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Subscription', 'Usage-Based'],
    agencyMargin: 85,
    startingPrice: '$29/month + Usage',
    setupFee: 'None',
    minimumCommitment: 'Monthly',
    implementationTime: 'Instant',
    integrationMethods: ['Zapier', 'GHL Native', 'API'],
    idealClientSize: ['Small Business', 'Mid-Market'],
    features: ['Human-like Latency', 'Appointment Booking', 'CRM Integration', 'Call Recordings', 'White Label Portal'],
    partnerSupportModel: 'Hybrid',
    reviews: [],
    agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: true },
    valueAddons: ['Pre-built Industry Templates', 'Twilio Integration'],
    vendorTrust: { hasPublicRoadmap: true, hasSLA: true, hasDataMigration: true }
  },
  {
    id: 'authority-builders',
    name: 'Authority Builders',
    companyName: 'Authority Builders',
    companyWebsite: 'https://authority.builders/',
    tagline: 'Real traffic, real rankings, zero outreach.',
    shortDescription: 'High-quality, white-label link building services sourced from real websites with traffic.',
    detailedDescription: 'Authority Builders offers a curated marketplace of high-traffic websites for guest posting. They handle the outreach, content creation, and placement. You get a white-label report to show your client.',
    primaryCategory: 'Marketing & Advertising',
    subCategory: 'SEO & Search Marketing',
    tags: ['Link Building', 'Guest Posts', 'SEO'],
    logo: 'https://authority.builders/assets/images/logo-dark.png',
    rating: 4.8,
    implementations: 3500,
    isVerified: true,
    whitelabelType: 'Service',
    pricingModel: ['Per Link', 'Packages'],
    agencyMargin: 65,
    startingPrice: '$150/link',
    setupFee: 'None',
    minimumCommitment: 'None',
    implementationTime: '7-14 Days',
    integrationMethods: ['Dashboard', 'API'],
    idealClientSize: ['Mid-Market', 'Enterprise'],
    features: ['Real Traffic Sites', 'White Label Reporting', 'Content Included', 'Guaranteed Placement'],
    partnerSupportModel: 'Direct to Vendor',
    reviews: [],
    agencyReadiness: { hasCustomDomain: false, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: true },
    valueAddons: ['Link Gap Analysis'],
    vendorTrust: { hasPublicRoadmap: false, hasSLA: true, hasDataMigration: false }
  },
  {
    id: 'stammer-ai',
    name: 'Stammer.ai',
    companyName: 'Stammer',
    companyWebsite: 'https://stammer.ai/',
    tagline: 'The White Label AI Agency Platform.',
    shortDescription: 'Build and resell custom ChatGPT-style AI agents under your own brand.',
    detailedDescription: 'Stammer.ai allows you to build custom AI chatbots trained on your client\'s data (website, PDFs, etc.). It is built specifically for agencies to resell, with a full white-label dashboard and sub-accounts.',
    primaryCategory: 'Business Operations & SaaS',
    subCategory: 'AI & Automation',
    tags: ['AI Agents', 'Chatbots', 'White Label SaaS'],
    logo: 'https://stammer.ai/static/images/logo_dark.png',
    rating: 4.9,
    implementations: 1200,
    isVerified: true,
    isFeatured: true,
    whitelabelType: 'Full White Label',
    pricingModel: ['Subscription', 'Usage-Based'],
    agencyMargin: 80,
    startingPrice: '$197/month',
    setupFee: 'None',
    minimumCommitment: 'Monthly',
    implementationTime: 'Instant',
    integrationMethods: ['Embed Widget', 'API', 'Webhook'],
    idealClientSize: ['Small Business', 'Mid-Market'],
    features: ['Custom Knowledge Base', 'Lead Capture', 'White Label Dashboard', 'Client Sub-accounts'],
    partnerSupportModel: 'Agency-led',
    reviews: [],
    agencyReadiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: true },
    valueAddons: ['Prompt Engineering Library'],
    vendorTrust: { hasPublicRoadmap: true, hasSLA: true, hasDataMigration: true }
  },
  {
    id: 'invisible-ppc',
    name: 'InvisiblePPC',
    companyName: 'InvisiblePPC',
    companyWebsite: 'https://invisibleppc.com/',
    tagline: 'We run the ads. You take the credit.',
    shortDescription: 'White label PPC management for agencies. Google Ads, YouTube, and Bing.',
    detailedDescription: 'InvisiblePPC specializes in managing Google Ads campaigns for agencies. They offer fixed-fee pricing, landing page assistance, and completely unbranded reporting.',
    primaryCategory: 'Marketing & Advertising',
    subCategory: 'PPC & Paid Media',
    tags: ['Google Ads', 'PPC', 'Fulfillment'],
    logo: 'https://invisibleppc.com/wp-content/uploads/2018/07/Invisible-PPC-Logo-1.png',
    rating: 4.7,
    implementations: 4000,
    isVerified: true,
    whitelabelType: 'Service',
    pricingModel: ['Flat Fee'],
    agencyMargin: 50,
    startingPrice: '$500/account',
    setupFee: '$199',
    minimumCommitment: 'Monthly',
    implementationTime: '5-7 Days',
    integrationMethods: ['Dashboard'],
    idealClientSize: ['Small Business', 'Local Service'],
    features: ['Campaign Setup', 'Landing Page Feedback', 'Weekly Optimization', 'Unbranded Reports'],
    partnerSupportModel: 'Direct to Vendor',
    reviews: [],
    agencyReadiness: { hasCustomDomain: false, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: false },
    valueAddons: ['Sales Support Materials'],
    vendorTrust: { hasPublicRoadmap: false, hasSLA: true, hasDataMigration: false }
  }
];

export const DUMMY_MANAGED_VENDORS: ManagedVendor[] = [
  {
    id: 'mv-1',
    solutionId: 'cal-com-scheduling',
    name: 'Cal.com White-Label Scheduling',
    logo: 'https://i.imgur.com/ODs02d2.png',
    monthlyCost: 250,
    contractRenewalDate: '2024-12-31',
    status: 'Active',
    supportContact: 'support@cal.com',
    notes: 'Used for all Tier 2 and Tier 3 clients. Agency account is under billing@myagency.com.'
  },
  {
    id: 'mv-2',
    solutionId: 'sol-2',
    name: 'Agency-Ready Social Media Scheduler',
    logo: 'https://picsum.photos/seed/social/100/100',
    monthlyCost: 99,
    contractRenewalDate: '2025-03-15',
    status: 'Trial',
    supportContact: 'help@socialbloom.example.com',
    notes: 'Evaluating for potential use with small business clients. Trial ends March 30th.'
  }
];

export const DUMMY_CLIENTS: Client[] = [
    {
        id: 'client-1',
        name: 'Bloom & Petal Florist',
        contactEmail: 'sandra@bloomandpetal.com',
        status: 'Onboarding',
        monthlySubscriptionPrice: 249,
        managedVendorIds: ['mv-1', 'mv-2'],
        playbook: {
            tasks: [
                { id: 't1', title: 'Setup CNAME record for scheduling', description: 'Point schedule.bloomandpetal.com to the Cal.com instance.', isCompleted: true },
                { id: 't2', title: 'Customize Cal.com booking page with client logo', description: 'Upload their logo and set brand colors.', isCompleted: false },
                { id: 't3', title: 'Connect client social media accounts', description: 'Link Facebook and Instagram pages to the Social Media Scheduler.', isCompleted: false },
            ],
            emails: [
                { purpose: 'Welcome Email', subject: 'Welcome to the Team!', body: 'Hi Sandra, we are so excited to get started! To begin, we\'ll need your logo files and brand color hex codes.'}
            ],
            snippets: [
                { title: 'CNAME Record', code: 'CNAME schedule.bloomandpetal.com proxy.cal.com' }
            ]
        }
    },
    {
        id: 'client-2',
        name: 'Apex Gym',
        contactEmail: 'mark@apexgym.com',
        status: 'Active',
        monthlySubscriptionPrice: 199,
        managedVendorIds: ['mv-1'],
    }
]

export const DUMMY_AGENCY_PROFILE: AgencyProfile = {
    agencyName: 'Your Agency Inc.',
    agencyLogo: 'https://avatar.vercel.sh/myagency.svg?text=YA',
    supportEmail: 'support@youragency.com',
};

export const STACK_CATEGORIES: { name: StackCategory | 'All', icon: React.FC }[] = [
    { name: 'Marketing', icon: (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M3 3v18h18" }), React.createElement('path', { d: "M7 12v5h12V8l-5 5-4-4-3 3z" })) },
    { name: 'Development', icon: (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('polyline', { points: "16 18 22 12 16 6" }), React.createElement('polyline', { points: "8 6 2 12 8 18" })) },
    { name: 'Business Operations', icon: (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }), React.createElement('circle', { cx: "8.5", cy: "7", r: "4" }), React.createElement('polyline', { points: "17 11 19 13 23 9" })) },
    { name: 'Fintech', icon: (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M3 6h18M19 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }), React.createElement('line', { x1: "10", y1: "11", x2: "10", y2: "16" }), React.createElement('line', { x1: "14", y1: "11", x2: "14", y2: "16" })) },
    { name: 'Industry Platforms', icon: (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }), React.createElement('polyline', { points: "9 22 9 12 15 12 15 22" })) },
    { name: 'Creative', icon: (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('path', { d: "M21.73 18.24c-1.39-1.39-2.73-1.39-4.12 0l-5.61 5.61c-1.39 1.39-2.73 1.39-4.12 0-1.39-1.39-1.39-2.73 0-4.12l5.61-5.61c1.39-1.39 1.39-2.73 0-4.12-1.39-1.39-2.73-1.39-4.12 0L2.27 15.76c-1.39 1.39-1.39 2.73 0 4.12s2.73 1.39 4.12 0l5.61-5.61c1.39-1.39 2.73-1.39 4.12 0 1.39 1.39 1.39 2.73 0 4.12l-5.61 5.61c-1.39 1.39-1.39 2.73 0 4.12s2.73 1.39 4.12 0L21.73 18.24z" })) },
    { name: 'Physical Products', icon: (props: any) => React.createElement('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement('line', { x1: "16.5", y1: "9.4", x2: "7.5", y2: "4.21" }), React.createElement('path', { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }), React.createElement('polyline', { points: "3.27 6.96 12 12.01 20.73 6.96" }), React.createElement('line', { x1: "12", y1: "22.08", x2: "12", y2: "12" })) },
];


export const CURATED_STACKS: SolutionStack[] = [
  {
    id: 'stack-reactivation',
    name: 'The Local AI Reactivation Stack',
    category: 'Business Operations',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80', // MedSpa/Clinic vibes
    targetNiche: 'MedSpas, Dentists, Gyms',
    targetTeamSize: ['Solo', '2-5'],
    targetGoal: '+$5k MRR Fast',
    description: 'The "No-Ad-Spend" ROI machine. Use AI to reactivate a client\'s existing dead leads and book appointments instantly.',
    pitch: 'We generate appointments from your existing dead leads instantly.',
    tags: ['AI', 'Reactivation', 'Instant ROI', 'Hero Outcome'],
    solutionIds: ['gohighlevel', 'zappychat', 'uphex'], // Core + Brain
    suggestedResalePrice: '$1,000/mo',
    typicalMargin: '85%',
    replaces: [{ name: 'Ad Spend', estimatedCost: 2000 }, { name: 'Appointment Setter', estimatedCost: 3000 }],
    estimatedAgencyCost: '$150/mo',
    estimatedLaunchTime: '24 Hours',
    isHeroOutcome: true,
    // NEW: Detailed Logic for the Sales Page
    compatibility: {
        headline: "The Zero-Ad-Spend Loop",
        systemDiagram: "Client DB (CSV) → AI Wrapper (Analysis) → SMS Reactivation → Booking",
        description: "Most agencies fail because they rely on cold traffic (Ads). This stack flips the script. You upload the client's old list. The AI engages them with a 'No-Brainer Offer' and books them directly into the calendar. Zero ad spend required.",
        technicalRequirements: ["GoHighLevel SaaS Mode", "OpenAI API Key"]
    }
  },
  {
    id: 'stack-invisible-seo',
    name: 'The Invisible SEO & Reputation Stack',
    category: 'Marketing',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', // Analytics/Graph
    targetNiche: 'Home Services & Law',
    targetTeamSize: ['2-5', '6-15'],
    targetGoal: '+$10k Sticky MRR',
    description: 'Make your client the #1 choice on Google Maps. Automated reviews + White Label Fulfillment means you do zero work.',
    pitch: 'We make you the #1 choice on Google Maps and automate your 5-star reviews.',
    tags: ['SEO', 'Reputation', 'High Retention', 'Hero Outcome'],
    solutionIds: ['nicejob', 'seoreseller'], // Reputation + Fulfillment
    suggestedResalePrice: '$2,000/mo',
    typicalMargin: '75%',
    replaces: [{ name: 'In-House SEO', estimatedCost: 5000 }, { name: 'Manual Outreach', estimatedCost: 1000 }],
    estimatedAgencyCost: '$500/mo',
    estimatedLaunchTime: '3 Days',
    isHeroOutcome: true,
    compatibility: {
        headline: "The Trust Infrastructure",
        systemDiagram: "Review Engine (Automated) + Fulfillment Partner (Backend) → White-Label Report",
        description: "You provide the dashboard. The Review Engine automates trust (5-star reviews). The Fulfillment partner handles the technical ranking work. You send the white-labeled report every Friday showing 'Rankings Up, Calls Up'. The client never knows you outsourced it.",
        technicalRequirements: ["GMB Access", "Website Admin"]
    }
  },
  {
    id: 'stack-ecom-retention',
    name: 'The E-commerce Retention Stack',
    category: 'Marketing',
    isFeatured: true, // It's a Hero, so it's featured
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80', // Shopping/Ecom
    targetNiche: 'Shopify Brands ($1M+)',
    targetTeamSize: ['6-15'],
    targetGoal: '+$20k High-Ticket MRR',
    description: 'Add 20% to a brand\'s revenue by automating email and SMS flows. High value, enterprise clients.',
    pitch: 'We add 20% to your revenue by recovering lost sales automatically.',
    tags: ['E-com', 'Retention', 'Email/SMS', 'Hero Outcome'],
    solutionIds: ['klaviyo', 'postscript', 'invisible-ppc'], // Email/SMS + Fulfillment
    suggestedResalePrice: '$5,000/mo',
    typicalMargin: '50%',
    replaces: [{ name: 'Email Marketing Manager', estimatedCost: 60000 }],
    estimatedAgencyCost: '$1,500/mo (with fulfillment)',
    estimatedLaunchTime: '7 Days',
    isHeroOutcome: true,
    compatibility: {
        headline: "The Recovered Revenue Engine",
        systemDiagram: "Cart Abandoned → SMS Flow (Postscript) → Email Flow (Klaviyo) → Revenue Recovered",
        description: "You contract a white-label partner to build the flows (Welcome, Abandoned Cart) for a fixed fee. You charge a monthly retainer for 'optimization' and reporting on the recovered revenue. It pays for itself instantly.",
        technicalRequirements: ["Shopify Store Access"]
    }
  },
  {
    id: 'stack-seo-gmb',
    name: 'Local SEO + GMB Dominator',
    category: 'Marketing',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    targetNiche: 'Local Business',
    targetTeamSize: ['Solo', '2-5'],
    targetGoal: '+$10k MRR',
    description: 'The ultimate foot-in-the-door. Includes full SEO fulfillment and GMB management. Start here to fund the rest.',
    pitch: 'Rank local businesses #1 on Maps & Search automatically.',
    tags: ['SEO', 'Local', 'GMB', 'High Margin'],
    solutionIds: ['seoreseller', 'dashclicks'],
    linkedKitId: 'kit-seo-local',
    suggestedResalePrice: "$2,497 - $4,997 / month",
    typicalMargin: "80-85%",
    replaces: [
        { name: 'In-house SEO Specialist', estimatedCost: 5000 }, 
        { name: 'AgencyAnalytics', estimatedCost: 49 }
    ],
    estimatedAgencyCost: "$397–$597 / month",
    estimatedLaunchTime: "3 Days",
    compatibility: {
        headline: "The 'Rank & Rent' Engine",
        systemDiagram: "GMB Audit (DashClicks) → Content (SEOReseller) → Rank Tracking",
        description: "DashClicks handles the initial GMB optimization and reputation baseline. SEOReseller takes over for ongoing content and link building. Both feed into a unified white-label report you send to the client.",
        technicalRequirements: ["GMB Access", "Website Admin Access"]
    }
  },
  {
    id: 'stack-reputation',
    name: 'Reputation & Review Engine',
    category: 'Marketing',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=800&auto=format&fit=crop',
    targetNiche: 'Medical / Dental',
    targetTeamSize: ['Solo', '2-5', '6-15'],
    targetGoal: '+$5k MRR',
    description: 'Automate 5-star reviews and manage reputation across all channels. High margin, low churn.',
    pitch: 'Turn happy customers into 5-star reviews on autopilot.',
    tags: ['Reviews', 'Retention', 'Automation'],
    solutionIds: ['birdeye-whitelabel'],
    linkedKitId: 'kit-reputation',
    suggestedResalePrice: "$1,497 - $2,997 / month",
    typicalMargin: "80%",
    replaces: [
        { name: 'Podium', estimatedCost: 450 }, 
        { name: 'Manual Outreach', estimatedCost: 200 }
    ],
    estimatedAgencyCost: "$297 / month",
    estimatedLaunchTime: "1 Day",
    compatibility: {
        headline: "The 'Trust Pilot' Loop",
        systemDiagram: "CRM Trigger → Review Request (Birdeye) → Review Posted → Auto-Reply",
        description: "Connect Birdeye to your client's CRM. When a customer is marked 'Closed Won' or 'Service Complete', Birdeye automatically sends an SMS review request. Positive reviews are published; negative feedback is routed to a private form.",
        technicalRequirements: ["Client CRM Integration"]
    }
  },
  {
    id: 'stack-google-ads',
    name: 'Google Ads + LSA Cash Machine',
    category: 'Marketing',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    targetNiche: 'Home Services',
    targetTeamSize: ['2-5', '6-15'],
    targetGoal: '+$20k+ MRR',
    description: 'High-ticket paid traffic management. Fulfilled by AdBrew for hands-off scaling.',
    pitch: 'Guaranteed leads for high-ticket service businesses.',
    tags: ['PPC', 'Google Ads', 'Scale'],
    solutionIds: ['adbrew'],
    linkedKitId: 'kit-google-ads',
    suggestedResalePrice: "$4,500 - $9,000 / month",
    typicalMargin: "82%",
    replaces: [
        { name: 'Media Buyer', estimatedCost: 6000 }, 
        { name: 'Reporting Tools', estimatedCost: 100 }
    ],
    estimatedAgencyCost: "$492–$792 / month",
    estimatedLaunchTime: "1 Week",
    compatibility: {
        headline: "The 'Lead Faucet'",
        systemDiagram: "Client Onboarding → AdBrew Setup → LSA Approval → Leads Flow",
        description: "You onboard the client and get their Google Ads ID. AdBrew's team builds the campaigns and handles the LSA (Local Services Ads) verification paperwork. You just forward the weekly white-label performance reports.",
        technicalRequirements: ["Google Ads Account ID"]
    }
  },
  {
    id: 'stack-social-ads',
    name: 'AI-Powered Cross-Channel Ads',
    category: 'Marketing',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop',
    targetNiche: 'E-commerce',
    targetTeamSize: ['6-15', '16+'],
    targetGoal: '+$50k+ MRR',
    description: 'Combine AI creatives with automated rules for Facebook & Google. The modern ad agency stack.',
    pitch: 'Launch high-converting creatives on FB & Google in minutes.',
    tags: ['AI', 'Creative', 'Social Ads'],
    solutionIds: ['adcreative-ai', 'revealbot'],
    suggestedResalePrice: "$6,000 - $12,000 / month",
    typicalMargin: "85%",
    replaces: [
        { name: 'Graphic Designer', estimatedCost: 4000 }, 
        { name: 'Ad Manager', estimatedCost: 5000 }
    ],
    estimatedAgencyCost: "$592 / month",
    estimatedLaunchTime: "2 Days",
    compatibility: {
        headline: "The 'Creative Automation' Pipeline",
        systemDiagram: "AdCreative (Generate) → Revealbot (Launch & Optimize) → Scale",
        description: "Use AdCreative.ai to generate 100+ ad variations in minutes. Push the winning assets to Revealbot, which uses automated rules to kill bad ads and scale good ones 24/7.",
        technicalRequirements: ["Meta Business Manager"]
    }
  },
  {
    id: 'stack-ghl-killer',
    name: 'The Ultimate Agency OS',
    category: 'Business Operations',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    targetNiche: 'B2B / SaaS',
    targetTeamSize: ['Solo', '2-5', '6-15', '16+'],
    targetGoal: '+$50k+ MRR',
    description: 'Replace GoHighLevel with your own white-label instance. Own the platform, own the customer.',
    pitch: 'Your own branded software platform to replace 10+ tools.',
    tags: ['SaaS', 'CRM', 'All-in-One'],
    solutionIds: ['gohighlevel'],
    linkedKitId: 'kit-agency-os',
    suggestedResalePrice: "$2,997 - $5,997 / month",
    typicalMargin: "75-86%",
    replaces: [
        { name: 'Salesforce', estimatedCost: 300 }, 
        { name: 'Mailchimp', estimatedCost: 200 },
        { name: 'ClickFunnels', estimatedCost: 297 }
    ],
    estimatedAgencyCost: "$497 / month",
    estimatedLaunchTime: "1 Week",
    compatibility: {
        headline: "The 'One Login' Promise",
        systemDiagram: "Lead Capture → CRM → Email Marketing → Funnel Builder",
        description: "This is the 'God Mode' stack. You give your client ONE login. Inside, they see their CRM, their email marketing, their funnel builder, and their calendar—all under YOUR logo.",
        technicalRequirements: ["Twilio Account (for SMS)", "Mailgun (optional)"]
    }
  },
  {
    id: 'stack-web-design',
    name: 'High-Converting Web Design',
    category: 'Development',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
    targetNiche: 'Local Business',
    targetTeamSize: ['Solo', '2-5'],
    targetGoal: '+$10k MRR',
    description: 'Done-for-you web design and hosting. Charge a setup fee plus monthly recurring revenue.',
    pitch: 'Beautiful, high-speed websites without writing code.',
    tags: ['Web Design', 'Hosting', 'Recurring'],
    solutionIds: ['hiconversions'],
    linkedKitId: 'kit-web-design',
    suggestedResalePrice: "$5,000 + $497 / month",
    typicalMargin: "78%",
    replaces: [
        { name: 'Web Developer', estimatedCost: 5000 }, 
        { name: 'Hosting Fees', estimatedCost: 50 }
    ],
    estimatedAgencyCost: "$297 / month",
    estimatedLaunchTime: "2 Weeks",
    compatibility: {
        headline: "The 'Website-as-a-Service' Model",
        systemDiagram: "Client Brief → HiConversions Build → Launch → Monthly Maintenance",
        description: "You collect the client's logo and color scheme. HiConversions builds a high-performance, conversion-optimized site. You charge a monthly fee for hosting, updates, and 'unlimited small edits' (which HiConversions handles).",
        technicalRequirements: ["DNS Access"]
    }
  },
  {
    id: 'stack-social-media',
    name: 'Social Media Automation Suite',
    category: 'Marketing',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=800&auto=format&fit=crop',
    targetNiche: 'Local Business',
    targetTeamSize: ['Solo', '2-5'],
    targetGoal: '+$10k MRR',
    description: 'Full social media management including content creation and scheduling. 84% gross margins.',
    pitch: 'Done-for-you social content and posting.',
    tags: ['Social Media', 'Content', 'Fulfillment'],
    solutionIds: ['contentstudio', 'gopostwise'],
    linkedKitId: 'kit-social-media',
    suggestedResalePrice: "$2,497 - $4,997 / month",
    typicalMargin: "84%",
    replaces: [
        { name: 'Social Media Manager', estimatedCost: 3500 }, 
        { name: 'Canva Pro', estimatedCost: 12 }
    ],
    estimatedAgencyCost: "$397 / month",
    estimatedLaunchTime: "3 Days",
    compatibility: {
        headline: "The 'Content Factory'",
        systemDiagram: "GoPostWise (Creation) → Approval Workflow → ContentStudio (Scheduling)",
        description: "GoPostWise creates the branded graphics and captions. You approve them (or let the client approve). Then, ContentStudio automatically schedules them to Facebook, Instagram, LinkedIn, and Twitter.",
        technicalRequirements: ["Social Media Account Access"]
    }
  },
  {
    id: 'stack-casino-launch',
    name: 'The "Digital Vegas" Stack',
    category: 'Industry Platforms',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=800&auto=format&fit=crop',
    targetNiche: 'Entrepreneurs / iGaming',
    targetTeamSize: ['Solo', '2-5'],
    targetGoal: '+$50k+ Upfront',
    description: 'Launch fully licensed online casinos in 90 days. A complete turnkey "Casino-in-a-Box" solution.',
    pitch: 'Sell turnkey online casinos for $25k-$75k upfront fees.',
    tags: ['High Ticket', 'iGaming', 'Crypto', 'Blue Ocean'],
    solutionIds: ['softswiss', 'nuxgame'],
    linkedKitId: 'kit-casino',
    suggestedResalePrice: "$25,000+ Setup + $5k/mo",
    typicalMargin: "40-60% + RevShare",
    replaces: [
        { name: 'In-house Tech Team', estimatedCost: 50000 },
        { name: 'Compliance Legal Team', estimatedCost: 15000 }
    ],
    estimatedAgencyCost: "Varies (Rev Share)",
    estimatedLaunchTime: "8-12 Weeks",
    compatibility: {
        headline: "The 'White-Label Operator' Model",
        systemDiagram: "SoftSwiss (Platform) → NuxGame (Content) → Payment Gateway → Player",
        description: "SoftSwiss provides the core player account management (PAM) and licensing. NuxGame plugs in the slots and sportsbook feeds. You simply hand the keys to the operator and take a revenue share.",
        technicalRequirements: ["Gaming License (Sub-license provided)"]
    }
  },
  {
    id: 'stack-ai-voice',
    name: 'The 24/7 AI Workforce',
    category: 'Business Operations',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    targetNiche: 'Home Services / Medical',
    targetTeamSize: ['Solo', '2-5'],
    targetGoal: '+$20k MRR',
    description: 'Replace human receptionists with hyper-realistic AI voice agents. Charge a monthly retainer + markup on minutes.',
    pitch: 'An AI receptionist that answers 24/7 and books appointments instantly.',
    tags: ['AI Voice', 'Automation', 'High Margin', 'Telecom'],
    solutionIds: ['synthflow', 'gohighlevel'],
    suggestedResalePrice: "$497/mo + $0.25/min",
    typicalMargin: "85%",
    replaces: [
        { name: 'Full-Time Receptionist', estimatedCost: 3500 },
        { name: 'Answering Service', estimatedCost: 800 }
    ],
    estimatedAgencyCost: "$29/mo + $0.10/min",
    estimatedLaunchTime: "2 Days",
    compatibility: {
        headline: "The 'Voice-to-CRM' Bridge",
        systemDiagram: "Inbound Call → Synthflow AI → Conversation → GHL Calendar (Booking)",
        description: "Synthflow answers the call and handles the conversation using natural language. Once an appointment time is agreed upon, it pushes the booking directly into the GoHighLevel calendar, triggering confirmation texts.",
        technicalRequirements: ["Twilio Account"]
    }
  },
  {
    id: 'stack-authority',
    name: 'The Authority Builder',
    category: 'Marketing',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    targetNiche: 'SEO & Content Agencies',
    targetTeamSize: ['Solo', '2-5'],
    targetGoal: '+$5k MRR',
    description: 'Automate your SEO fulfillment. Sell high-margin "Authority Packages" without sending a single outreach email.',
    pitch: 'Stop trading time for links. Resell high-DA placements at 100% markup.',
    tags: ['SEO', 'Passive Fulfillment', 'High Margin'],
    solutionIds: ['authority-builders', 'seoreseller'],
    linkedKitId: 'kit-authority',
    suggestedResalePrice: '$1,500 - $3,000/mo',
    typicalMargin: '50-65%',
    replaces: [{ name: 'In-house Outreach Specialist', estimatedCost: 4000 }],
    estimatedAgencyCost: '$500 - $1,000/mo',
    estimatedLaunchTime: '3 Days',
    matchScore: 95,
    matchReasoning: 'Perfect for agencies who want to sell SEO results without the operational headache of link building.',
    compatibility: {
        headline: "The 'Passive SEO' Loop",
        systemDiagram: "Client Order → Agency Dashboard → Authority Builders API → Live Report",
        description: "You sell the package using the SEOReseller white-label proposal tool. When the client pays, you purchase the specific backlinks via Authority Builders. The metrics flow back into your SEOReseller dashboard so the client sees one unified report.",
        technicalRequirements: ["Agency Dashboard Login", "Credit Card for Fulfillment"]
    }
  },
  {
    id: 'stack-ai-agent',
    name: 'AI Agent Studio',
    category: 'Business Operations',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    targetNiche: 'SaaS & Support Teams',
    targetTeamSize: ['Solo', '2-5', '6-15'],
    targetGoal: '+$10k MRR',
    description: 'Launch your own "AI Employee" agency. Build and rent out customer support bots that work 24/7.',
    pitch: 'Every business wants AI. Be the one who rents it to them.',
    tags: ['AI', 'SaaS Mode', 'Trend Surfing'],
    solutionIds: ['stammer-ai', 'synthflow'],
    linkedKitId: 'kit-ai-agent',
    suggestedResalePrice: '$497 - $997/mo per agent',
    typicalMargin: '70-80%',
    replaces: [{ name: 'Human Support Rep', estimatedCost: 3000 }],
    estimatedAgencyCost: '$197/mo flat',
    estimatedLaunchTime: '24 Hours',
    matchScore: 98,
    matchReasoning: 'The hottest market trend right now. High perceived value, low fulfillment effort once setup.',
    compatibility: {
        headline: "The 'Text-to-Voice' Handoff",
        systemDiagram: "Website Chat (Stammer) → Webhook → Voice AI (Synthflow) → Appointment Booked",
        description: "Stammer.ai handles the initial high-volume text inquiries on the client's website to qualify leads. Once a lead expresses high intent (or asks for a call), Stammer triggers a webhook that instructs Synthflow to immediately dial the lead and close the appointment.",
        technicalRequirements: ["Zapier or Make.com account", "Twilio account (for Synthflow)"]
    }
  },
  {
    id: 'stack-ppc-traffic',
    name: 'Instant Traffic System',
    category: 'Marketing',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    targetNiche: 'Local Service Businesses',
    targetTeamSize: ['2-5', '6-15'],
    targetGoal: '+$20k+ MRR',
    description: 'A complete "Ad Agency in a Box." You sell the leads, our partner runs the Google Ads campaigns.',
    pitch: 'Don\'t learn Google Ads. Just resell the results.',
    tags: ['PPC', 'Google Ads', 'Lead Gen'],
    solutionIds: ['invisible-ppc', 'adcreative-ai'],
    linkedKitId: 'kit-ppc-traffic',
    suggestedResalePrice: '$1,000/mo + Ad Spend',
    typicalMargin: '50%',
    replaces: [{ name: 'In-house Media Buyer', estimatedCost: 6000 }],
    estimatedAgencyCost: '$500/mo',
    estimatedLaunchTime: '7 Days',
    matchScore: 92,
    matchReasoning: 'Reliable, scalable revenue. Great for agencies who are good at sales but bad at ad operations.',
    compatibility: {
        headline: "The 'Ad-to-Lead' Ecosystem",
        systemDiagram: "AdCreative (Assets) → InvisiblePPC (Campaigns) → CRM (Leads)",
        description: "You use AdCreative.ai to generate high-converting visuals in seconds. You hand these assets to InvisiblePPC, who builds and manages the campaign. Leads flow directly into your client's CRM (or GHL) via standard webhooks.",
        technicalRequirements: ["Google Ads Manager Account", "Facebook Business Manager"]
    }
  }
];

export const HERO_STACKS: HeroStack[] = [
  {
    id: 'hero-stack-1',
    badge: 'Step 1: Foundation',
    badgeColor: 'bg-emerald-500',
    title: 'The Local SEO + GMB Dominator',
    cost: '$397–$597/mo',
    resell: '$2,497–$4,997/mo',
    stats: { agencies: 412, revenue: '$8.2M', timeframe: 'last 30 days' },
    description: 'The ultimate foot-in-the-door. Includes full SEO fulfillment and GMB management. Start here to fund the rest.',
    solutionIds: ['seoreseller', 'dashclicks'],
    details: {
        heroImage: 'https://i.imgur.com/eJ73Q2h.png',
        profitCalculator: { defaultClients: 10, defaultPrice: 2497, agencyCost: 497 },
        pricingTiers: [
            { name: 'SEO Starter', price: '$2,497/mo', features: ['GMB Optimization', 'Local Citations', 'Monthly Report'] },
            { name: 'SEO Growth', price: '$3,497/mo', features: ['Everything in Starter', 'Content Creation', 'Link Building'] },
            { name: 'Market Domination', price: '$4,997/mo', features: ['Everything in Growth', 'Dedicated Account Manager', 'Competitor Analysis'] }
        ],
        resellKitAssets: ['Sales Deck', 'Pricing Calculator', 'Proposal Template', 'Client Onboarding Form', 'White Label Reports'],
        grandfatheredPricingLeft: 45,
        testimonials: { count: 128 }
    }
  },
  {
    id: 'hero-stack-2',
    badge: 'Step 2: Retention',
    badgeColor: 'bg-blue-500',
    title: 'Reputation & Review Engine',
    cost: '$297/mo',
    resell: '$1,497–$2,997/mo',
    stats: { agencies: 385, revenue: '$5.6M', timeframe: 'last 30 days' },
    description: 'Automate 5-star reviews and manage reputation across all channels. High margin, low churn.',
    solutionIds: ['birdeye-whitelabel'],
    details: {
        heroImage: 'https://i.imgur.com/5u9Oah1.png',
        profitCalculator: { defaultClients: 15, defaultPrice: 1497, agencyCost: 297 },
        pricingTiers: [
            { name: 'Reputation Essentials', price: '$1,497/mo', features: ['Review Monitoring', 'Review Widget', 'Monthly Report'] },
            { name: 'Reputation Growth', price: '$1,997/mo', features: ['Review Generation', 'SMS Requests', 'Negative Feedback Blocking'] },
            { name: 'Brand Authority', price: '$2,997/mo', features: ['Multi-location', 'Competitor Tracking', 'Social Proof Tools'] }
        ],
        resellKitAssets: ['"Bad Review" Firefighter Script', 'GMB Optimization Checklist', 'Sales One-Pager'],
        grandfatheredPricingLeft: 30,
        testimonials: { count: 95 }
    }
  },
  {
    id: 'hero-stack-3',
    badge: 'Step 3: Scale',
    badgeColor: 'bg-amber-500',
    title: 'Google Ads + LSA Cash Machine',
    cost: '$492–$792/mo',
    resell: '$4,500–$9,000/mo',
    stats: { agencies: 210, revenue: '$9.8M', timeframe: 'last 30 days' },
    description: 'High-ticket paid traffic management. Fulfilled by AdBrew for hands-off scaling.',
    solutionIds: ['adbrew'],
    details: {
        heroImage: 'https://i.imgur.com/L3uS9fT.png',
        profitCalculator: { defaultClients: 5, defaultPrice: 5000, agencyCost: 600 },
        pricingTiers: [
            { name: 'Ad Launch', price: '$4,500/mo', features: ['Campaign Setup', 'LSA Approval', 'Tracking Install'] },
            { name: 'Ad Management', price: '$6,500/mo', features: ['Weekly Optimization', 'Reporting', 'Creative Refresh'] },
            { name: 'Lead Guarantee', price: '$9,000/mo', features: ['Guaranteed Leads', 'Full Service', 'CRM Integration'] }
        ],
        resellKitAssets: ['LSA Approval Checklist', 'High-Converting Ad Copy', 'Sales Deck', 'Contract Template'],
        grandfatheredPricingLeft: 12,
        testimonials: { count: 67 }
    }
  },
  {
    id: 'hero-stack-4',
    badge: 'Step 4: Creative',
    badgeColor: 'bg-purple-500',
    title: 'AI-Powered Cross-Channel Ads',
    cost: '$592/mo',
    resell: '$6,000–$12,000/mo',
    stats: { agencies: 150, revenue: '$7.2M', timeframe: 'last 30 days' },
    description: 'Combine AI creatives with automated rules for Facebook & Google. The modern ad agency stack.',
    solutionIds: ['adcreative-ai', 'revealbot'],
    details: {
        heroImage: 'https://i.imgur.com/eJ73Q2h.png',
        profitCalculator: { defaultClients: 4, defaultPrice: 8000, agencyCost: 592 },
        pricingTiers: [
            { name: 'Social Ads', price: '$6,000/mo', features: ['FB/IG Ads', 'AI Creative Testing', 'Monthly Report'] },
            { name: 'Cross-Channel', price: '$9,000/mo', features: ['FB/IG + Google Ads', 'Retargeting', 'Bi-weekly Calls'] },
            { name: 'Full Scale', price: '$12,000/mo', features: ['All Channels', 'Video Production', 'Weekly Strategy'] }
        ],
        resellKitAssets: ['Creative Brief Template', 'Case Study Deck', 'Upsell Email Sequence'],
        grandfatheredPricingLeft: 8,
        testimonials: { count: 42 }
    }
  },
  {
    id: 'hero-stack-5',
    badge: 'Step 5: Platform',
    badgeColor: 'bg-orange-600',
    title: 'The Ultimate Agency OS (GHL Replacement)',
    cost: '$497/mo',
    resell: '$2,997–$5,997/mo',
    stats: { agencies: 520, revenue: '$15.4M', timeframe: 'last 30 days' },
    description: 'Replace GoHighLevel with your own white-label instance. Own the platform, own the customer.',
    solutionIds: ['gohighlevel'],
    details: {
        heroImage: 'https://i.imgur.com/L3uS9fT.png',
        profitCalculator: { defaultClients: 20, defaultPrice: 2997, agencyCost: 397 }, // Effective cost via partner mentioned in prompt
        pricingTiers: [
            { name: 'Starter Suite', price: '$2,997/mo', features: ['CRM', 'Email Marketing', 'Funnel Builder'] },
            { name: 'Growth Suite', price: '$4,497/mo', features: ['Everything in Starter', 'Unlimited Contacts', 'Automation Workflows'] },
            { name: 'Agency Suite', price: '$5,997/mo', features: ['Everything in Growth', 'White-label Domain', 'Priority Support'] }
        ],
        resellKitAssets: ['Migration Guide', 'Comparison Deck', 'Sales Scripts', 'Email Templates'],
        grandfatheredPricingLeft: 20,
        testimonials: { count: 215 }
    }
  },
  {
    id: 'hero-stack-6',
    badge: 'Step 6: Web',
    badgeColor: 'bg-cyan-500',
    title: 'High-Converting Web Design & Hosting',
    cost: '$297–$597 per site/mo',
    resell: '$2,500–$5,000 + $497/mo',
    stats: { agencies: 280, revenue: '$6.1M', timeframe: 'last 30 days' },
    description: 'Done-for-you web design and hosting. Charge a setup fee plus monthly recurring revenue.',
    solutionIds: ['hiconversions'], // or dropfunnels
    details: {
        heroImage: 'https://i.imgur.com/5u9Oah1.png',
        profitCalculator: { defaultClients: 5, defaultPrice: 497, agencyCost: 297 }, // Monthly recurring part
        pricingTiers: [
            { name: 'Landing Page', price: '$2,500 + $297/mo', features: ['Custom Design', 'Hosting', 'SSL'] },
            { name: 'Business Site', price: '$3,500 + $397/mo', features: ['5 Pages', 'Blog', 'SEO Basics'] },
            { name: 'E-commerce', price: '$5,000 + $497/mo', features: ['Store Setup', 'Payment Integration', 'Product Upload'] }
        ],
        resellKitAssets: ['Website Questionnaire', 'Hosting Agreement', 'Design Portfolio'],
        grandfatheredPricingLeft: 15,
        testimonials: { count: 88 }
    }
  },
  {
    id: 'hero-stack-7',
    badge: 'Step 7: Social',
    badgeColor: 'bg-pink-500',
    title: 'Social Media Automation Suite',
    cost: '$397/mo',
    resell: '$2,497–$4,997/mo',
    stats: { agencies: 310, revenue: '$7.5M', timeframe: 'last 30 days' },
    description: 'Full social media management including content creation and scheduling. 84% gross margins.',
    solutionIds: ['contentstudio', 'gopostwise'],
    details: {
        heroImage: 'https://i.imgur.com/eJ73Q2h.png',
        profitCalculator: { defaultClients: 8, defaultPrice: 2497, agencyCost: 397 },
        pricingTiers: [
            { name: 'Social Essentials', price: '$2,497/mo', features: ['12 Posts/mo', 'Scheduling', 'Reporting'] },
            { name: 'Social Growth', price: '$3,497/mo', features: ['20 Posts/mo', 'Community Management', 'Reels'] },
            { name: 'Social Dominance', price: '$4,997/mo', features: ['Daily Posting', 'Custom Video', 'Influencer Outreach'] }
        ],
        resellKitAssets: ['Content Calendar Template', 'Social Media Strategy Deck', 'Onboarding Checklist'],
        grandfatheredPricingLeft: 25,
        testimonials: { count: 102 }
    }
  },
  {
    id: 'hero-stack-8',
    badge: 'Step 8: Authority',
    badgeColor: 'bg-indigo-500',
    title: 'The Authority Builder (SEO)',
    cost: '$500–$1,000/mo',
    resell: '$1,500–$3,000/mo',
    stats: { agencies: 180, revenue: '$4.2M', timeframe: 'last 30 days' },
    description: 'Automate your SEO fulfillment. Sell high-margin "Authority Packages" without sending a single outreach email.',
    solutionIds: ['authority-builders', 'seoreseller'],
    details: {
        heroImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
        profitCalculator: { defaultClients: 5, defaultPrice: 2500, agencyCost: 800 },
        pricingTiers: [
            { name: 'Starter Authority', price: '$1,500/mo', features: ['DA 20+ Link', 'Guest Post', 'Content Included'] },
            { name: 'Growth Authority', price: '$2,500/mo', features: ['DA 30+ Links', 'Content Strategy', 'Monthly Report'] },
            { name: 'Market Leader', price: '$3,500/mo', features: ['DA 50+ Links', 'Gap Analysis', 'Priority Support'] }
        ],
        resellKitAssets: ['"Domain Authority" Sales Deck', 'Link Pricing Sheet', 'Sample Report'],
        grandfatheredPricingLeft: 35,
        testimonials: { count: 55 }
    }
  },
  {
    id: 'hero-stack-9',
    badge: 'Step 9: AI Ops',
    badgeColor: 'bg-violet-600',
    title: 'AI Agent Studio',
    cost: '$197/mo flat',
    resell: '$497–$997/mo per agent',
    stats: { agencies: 850, revenue: '$22.1M', timeframe: 'last 30 days' },
    description: 'Launch your own "AI Employee" agency. Build and rent out customer support bots that work 24/7.',
    solutionIds: ['stammer-ai', 'synthflow'],
    details: {
        heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
        profitCalculator: { defaultClients: 10, defaultPrice: 497, agencyCost: 197 },
        pricingTiers: [
            { name: 'Bot Rental', price: '$497/mo', features: ['24/7 Chat', 'FAQ Training', 'Lead Capture'] },
            { name: 'Custom Agent', price: '$997/mo', features: ['Custom Persona', 'CRM Integration', 'Appointment Booking'] },
            { name: 'Enterprise AI', price: '$2,497/mo', features: ['Multi-Agent', 'Voice + Chat', 'SLA Support'] }
        ],
        resellKitAssets: ['AI Agent Demo Scripts', 'ROI Calculator', 'Prompt Engineering Cheat Sheet'],
        grandfatheredPricingLeft: 15,
        testimonials: { count: 340 }
    }
  },
  {
    id: 'hero-stack-10',
    badge: 'Step 10: Traffic',
    badgeColor: 'bg-rose-500',
    title: 'Instant Traffic System (PPC)',
    cost: '$500/mo',
    resell: '$1,000/mo + Ad Spend',
    stats: { agencies: 410, revenue: '$11.5M', timeframe: 'last 30 days' },
    description: 'A complete "Ad Agency in a Box." You sell the leads, our partner runs the Google Ads campaigns.',
    solutionIds: ['invisible-ppc', 'adcreative-ai'],
    details: {
        heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        profitCalculator: { defaultClients: 5, defaultPrice: 1500, agencyCost: 500 },
        pricingTiers: [
            { name: 'Local Ads', price: '$1,000/mo + Spend', features: ['Google Ads Setup', 'Landing Page Review', 'Reporting'] },
            { name: 'Regional Ads', price: '$2,000/mo + Spend', features: ['Multi-Location', 'A/B Testing', 'Call Tracking'] },
            { name: 'National Ads', price: '$3,500/mo + Spend', features: ['Full Funnel', 'Conversion CRO', 'Dedicated Manager'] }
        ],
        resellKitAssets: ['Google Ads Sales Proposal', 'Objection Battlecard', 'Reporting Template'],
        grandfatheredPricingLeft: 10,
        testimonials: { count: 125 }
    }
  },
  {
    id: 'hero-stack-casino',
    badge: 'High Ticket',
    badgeColor: 'bg-indigo-600',
    title: 'The "Digital Vegas" Stack',
    cost: 'Varies (Rev Share)',
    resell: '$25k+ Setup',
    stats: { agencies: 45, revenue: '$12M', timeframe: 'lifetime' },
    description: 'Launch fully licensed online casinos. The ultimate high-ticket offer.',
    solutionIds: ['softswiss', 'nuxgame'],
    details: {
        heroImage: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=800&auto=format&fit=crop',
        profitCalculator: { defaultClients: 1, defaultPrice: 25000, agencyCost: 0 },
        pricingTiers: [
            { name: 'White Label Casino', price: '$25,000', features: ['Licensing', 'Game Aggregation', 'Payments'] },
            { name: 'Crypto Casino', price: '$35,000', features: ['Crypto Payments', 'Anon Play', 'Fast Setup'] }
        ],
        resellKitAssets: ['Casino Pitch Deck', 'Compliance Guide', 'RevShare Agreement'],
        grandfatheredPricingLeft: 5,
        testimonials: { count: 12 }
    }
  },
  {
    id: 'hero-stack-voice',
    badge: 'Trending',
    badgeColor: 'bg-fuchsia-500',
    title: 'The 24/7 AI Workforce (Voice)',
    cost: '$29/mo',
    resell: '$497/mo + Minutes',
    stats: { agencies: 620, revenue: '$4.5M', timeframe: 'last 30 days' },
    description: 'Replace human receptionists with hyper-realistic AI voice agents.',
    solutionIds: ['synthflow'],
    details: {
        heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
        profitCalculator: { defaultClients: 10, defaultPrice: 497, agencyCost: 290 },
        pricingTiers: [
            { name: 'Receptionist', price: '$497/mo', features: ['Inbound Handling', 'Booking', '500 Mins'] },
            { name: 'Outbound Sales', price: '$997/mo', features: ['Cold Calling', 'Qualification', 'CRM Sync'] }
        ],
        resellKitAssets: ['Voice Demo Recordings', 'ROI Calculator', 'Telecom Compliance Guide'],
        grandfatheredPricingLeft: 50,
        testimonials: { count: 88 }
    }
  }
];

export const filterOptionsData = {
    whitelabelType: ['Full White Label', 'API / SDK-first', 'Service', 'White Label Option', 'Reporting'],
    pricingModel: ['Monthly Subscription', 'Per-User/Per-Seat Pricing', 'Volume-Based Tiers', 'Usage-Based', 'Revenue Share', 'Flat Fee + % Ad Spend', 'SaaS Mode', 'Per Site', 'Setup Fee + Revenue Share'],
    idealClientSize: ['Small Business (1-50 employees)', 'Mid-Market (51-1000 employees)', 'Enterprise (1000+ employees)', 'E-commerce'],
    implementationTime: ['Instant / Self-service', 'Instant', '1-3 Business Days', '1-3 Days', '3-5 Days', '1 Week', '1-2 Weeks', '2-4 Weeks', '4-8 Weeks', '2-4 Months', '3-6 Months'],
    integrationMethods: ['REST API', 'Webhook Support', 'Embeddable Iframe / Widget', 'Zapier Integration', 'No-code Integration', 'SDK/Library', 'Dashboard', 'Native', 'None', 'Turnkey'],
};

export const categoryStructure: Category[] = [
    { 
        name: 'Marketing & Advertising', 
        subCategories: [
            'SEO & Search Marketing',
            'PPC & Paid Media',
            'Content Marketing',
            'Social Media Marketing',
            'Email & Marketing Automation',
            'Analytics & Data',
            'Reputation & Reviews',
            'Lead Generation'
        ] 
    },
    { 
        name: 'Web & App Development', 
        subCategories: [
            'Website Design & Development',
            'E-commerce Solutions',
            'Mobile App Development',
            'Hosting & Infrastructure'
        ] 
    },
    { 
        name: 'Fintech, Blockchain & Web3', 
        subCategories: [
            'Payments & Banking',
            'Cryptocurrency & Exchange Solutions',
            'Blockchain & DeFi',
            'Trading Technology',
            'Compliance & Security (RegTech)'
        ] 
    },
    { 
        name: 'Business Operations & SaaS', 
        subCategories: [
            'CRM & Sales',
            'Customer Support & Experience',
            'Agency Management & Productivity',
            'Learning & Education',
            'HR & Workforce Management',
            'Membership & Community',
            'Booking & Scheduling'
        ] 
    },
    { 
        name: 'Creative & Content Services', 
        subCategories: [
            'Graphic & Brand Design',
            'Video & Animation',
            'Content & Copywriting',
            'Digital Asset Management'
        ] 
    },
    { 
        name: 'Industry-Specific Platforms', 
        subCategories: [
            'iGaming & Sports Betting',
            'Health, Wellness & Fitness',
            'Travel & Hospitality',
            'Events & Webinars',
            'Real Estate',
            'Legal Services',
            'Construction & Field Service',
            'Hospitality & Food Service'
        ] 
    },
    { 
        name: 'Physical Products', 
        subCategories: [
            'Custom Apparel & Merchandise',
            'Private Label Cosmetics',
            'Home Decor & Furnishings',
            'Food & Beverage Products',
            'Packaging Solutions',
            'Promotional Products',
            'Dropshipping Products'
        ] 
    }
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'what-is-white-labeling',
        title: 'What is White-Labeling?',
        author: 'Sarah Chen',
        date: 'Oct 12, 2023',
        excerpt: 'A comprehensive guide to understanding white-label software and how it can transform your agency.',
        content: '<p>White-labeling allows you to sell software created by another company under your own brand...</p>',
        tags: ['Guide', 'Strategy']
    },
    {
        id: 'choosing-the-right-partner',
        title: 'Choosing the Right White-Label Partner',
        author: 'Alex Rivera',
        date: 'Nov 05, 2023',
        excerpt: 'Not all white-label solutions are created equal. Here is what to look for.',
        content: '<p>When selecting a partner, consider support, margin, and reliability...</p>',
        tags: ['Partnerships', 'Growth']
    }
];

// Re-exporting for backward compatibility in case other files use these specific names, though pages should now use INSPIRATION_CATEGORIES
export const SEARCH_PAGE_INSPIRATIONS = [
    {
        title: "SEO Reporting & Rank Tracking",
        description: "Offer clients a branded dashboard to monitor their search engine performance.",
        prompt: "Offer SEO reporting and rank tracking for my e-commerce clients.",
        icon: ChartIcon,
    },
    // ... (keeping a few original ones for safety, though they are duplicated below in the full list)
];

export const BUSINESS_IN_A_BOX_INSPIRATIONS = [
     {
        title: "Reputation Management",
        description: "Help businesses get more reviews and manage their online reputation.",
        prompt: "Help businesses get more reviews and manage their online reputation.",
        icon: ShareIcon, // Using ShareIcon as a placeholder for 'Reputation' if specific one missing, or reuse existing logic
    },
];


export const INSPIRATIONS_LIST = [
    // Marketing & Advertising
    {
        category: "Marketing & Growth",
        title: "SEO Reporting Dashboard",
        description: "Provide clients with a branded portal to track rankings, traffic, and backlinks.",
        prompt: "I want to offer white-label SEO reporting and rank tracking for small businesses.",
        icon: ChartIcon
    },
    {
        category: "Marketing & Growth",
        title: "Social Media Scheduler",
        description: "A tool for local businesses to plan and auto-post content to Instagram, Facebook, and LinkedIn.",
        prompt: "Find a white-label social media scheduling tool I can resell to local restaurants.",
        icon: ShareIcon
    },
    {
        category: "Marketing & Growth",
        title: "Reputation Management",
        description: "Automate review generation and monitoring for service businesses.",
        prompt: "I need a white-label reputation management platform for HVAC and plumbing companies.",
        icon: HeartIcon
    },
     {
        category: "Marketing & Growth",
        title: "Lead Gen Chatbot",
        description: "Install AI chatbots on client websites to capture and qualify leads 24/7.",
        prompt: "Find a white-label AI chatbot solution for lead generation on dentist websites.",
        icon: UsersIcon
    },

    // Business Operations & SaaS
    {
        category: "Operations & SaaS",
        title: "Appointment Booking System",
        description: "A branded booking engine for salons, consultants, and gyms to manage schedules.",
        prompt: "I want to launch a white-label appointment booking system for hair salons.",
        icon: CalendarIcon
    },
    {
        category: "Operations & SaaS",
        title: "All-in-One CRM",
        description: "Resell a complete CRM suite with email marketing, pipelines, and automation.",
        prompt: "Show me white-label CRM platforms I can resell to real estate agents.",
        icon: UsersIcon
    },
     {
        category: "Operations & SaaS",
        title: "HR & Payroll Platform",
        description: "Offer workforce management tools to small businesses under your brand.",
        prompt: "I want to find white-label HR and payroll software for small businesses.",
        icon: UsersIcon
    },

    // Fintech
    {
        category: "Fintech & Blockchain",
        title: "Payment Gateway",
        description: "Become a payment facilitator and earn a percentage of every transaction.",
        prompt: "I want to offer branded payment processing services to e-commerce merchants.",
        icon: CreditCardIcon
    },
    {
        category: "Fintech & Blockchain",
        title: "Crypto Exchange",
        description: "Launch a branded cryptocurrency exchange or wallet app.",
        prompt: "Find a turnkey white-label cryptocurrency exchange solution.",
        icon: BitcoinIcon
    },

    // Web & App Development
    {
        category: "Web & App Dev",
        title: "E-commerce Store Builder",
        description: "Provide a drag-and-drop website builder specifically for online stores.",
        prompt: "I need a white-label e-commerce website builder to resell to artists.",
        icon: ShoppingBagIcon
    },
    {
        category: "Web & App Dev",
        title: "No-Code Mobile App Builder",
        description: "Let clients build their own mobile apps using your branded platform.",
        prompt: "Find a white-label no-code mobile app builder for gyms and fitness studios.",
        icon: CodeIcon
    },
     {
        category: "Web & App Dev",
        title: "Managed WordPress Hosting",
        description: "Resell high-performance hosting with your own support and billing.",
        prompt: "I want to offer managed WordPress hosting services under my own brand.",
        icon: GlobeIcon
    },

    // Creative
    {
        category: "Creative Services",
        title: "Graphic Design Subscription",
        description: "Productize design services with a white-label project management portal.",
        prompt: "I want to build a productized graphic design service with a white-label client portal.",
        icon: PaletteIcon
    },
     {
        category: "Creative Services",
        title: "Video Editing Platform",
        description: "Offer on-demand video editing services through a branded dashboard.",
        prompt: "Find a white-label video editing platform for content creators.",
        icon: PaletteIcon
    },

    // Industry Platforms
    {
        category: "Industry Platforms",
        title: "iGaming & Sportsbook",
        description: "Launch a fully licensed online casino or sports betting site.",
        prompt: "I am looking for a turnkey white-label online casino and sportsbook platform.",
        icon: CalendarIcon // Placeholder, could use specific game icon
    },
    {
        category: "Industry Platforms",
        title: "Telehealth Platform",
        description: "Provide a HIPAA-compliant video consultation tool for doctors.",
        prompt: "I want to resell a white-label telehealth platform to private clinics.",
        icon: HeartIcon
    },
    {
        category: "Industry Platforms",
        title: "Real Estate Portal",
        description: "Launch a property listing and management site for local realtors.",
        prompt: "Find a white-label real estate property management and listing platform.",
        icon: GlobeIcon
    },

    // Physical Products
    {
        category: "Physical Products",
        title: "Private Label Supplements",
        description: "Sell your own brand of vitamins and health supplements with dropshipping.",
        prompt: "I want to start a private label supplement brand with dropshipping.",
        icon: HeartIcon
    },
    {
        category: "Physical Products",
        title: "Custom Apparel Print-on-Demand",
        description: "Launch a clothing brand without holding inventory.",
        prompt: "Find white-label print-on-demand services for high-quality apparel.",
        icon: ShoppingBagIcon
    },
    {
        category: "Physical Products",
        title: "Branded Coffee Dropshipping",
        description: "Sell roast-to-order coffee with your custom branding.",
        prompt: "I want to dropship private label coffee under my own brand.",
        icon: PackageIcon
    },
    {
        category: "Physical Products",
        title: "Eco-Friendly Packaging",
        description: "Resell custom branded packaging solutions to e-commerce brands.",
        prompt: "Find a white-label supplier for eco-friendly custom packaging.",
        icon: TruckIcon
    }
];

export const ROI_PROTOCOL_PRODUCT = {
    id: 'roi-protocol',
    title: 'The Agency ROI Protocol',
    price: '$17',
    originalPrice: '$97',
    description: 'Don’t spend a dime on software until you see the math. The exact spreadsheet and sales script to secure your first client in 48 hours.',
    stripeLink: 'https://buy.stripe.com/test_roi_protocol',
    features: [
        'The "10k Roadmap" Calculator (Excel/Sheets)',
        'The "Beta-Client" Cold Email Script',
        'List of Top 50 High-Margin Niches',
        'Video: "How to sell what you don\'t own yet"'
    ]
};

export const INSPIRATION_CATEGORIES = [
    {
        name: "Marketing & Growth",
        description: "Tools to help businesses grow their audience and sales.",
        inspirations: INSPIRATIONS_LIST.filter(i => i.category === "Marketing & Growth")
    },
    {
        name: "Operations & SaaS",
        description: "Essential software for running a business efficiently.",
        inspirations: INSPIRATIONS_LIST.filter(i => i.category === "Operations & SaaS")
    },
    {
        name: "Fintech & Blockchain",
        description: "Financial technology and crypto solutions.",
        inspirations: INSPIRATIONS_LIST.filter(i => i.category === "Fintech & Blockchain")
    },
    {
        name: "Web & App Development",
        description: "Platforms for building the web and mobile internet.",
        inspirations: INSPIRATIONS_LIST.filter(i => i.category === "Web & App Dev")
    },
    {
        name: "Industry Platforms",
        description: "Niche-specific turnkey solutions.",
        inspirations: INSPIRATIONS_LIST.filter(i => i.category === "Industry Platforms")
    },
    {
        name: "Creative Services",
        description: "Design and content solutions.",
        inspirations: INSPIRATIONS_LIST.filter(i => i.category === "Creative Services")
    },
     {
        name: "Physical Products",
        description: "Tangible goods and dropshipping opportunities.",
        inspirations: INSPIRATIONS_LIST.filter(i => i.category === "Physical Products")
    }
];

export const ENHANCED_INSPIRATIONS = [
  {
    id: 'seo-rank',
    title: "SEO Rank Tracking",
    description: "Offer clients a branded dashboard to monitor search performance.",
    prompt: "Offer SEO reporting and rank tracking for my e-commerce clients.",
    category: "Marketing",
    difficulty: "Easy",
    potential: "$2k-$5k/mo",
    trending: true,
    iconType: "chart",
    targetStackId: 'stack-authority'
  },
  {
    id: 'social-sched',
    title: "Social Media Scheduling",
    description: "Provide a tool for local businesses to manage their social presence.",
    prompt: "Provide a branded social media scheduling tool for local businesses.",
    category: "Marketing",
    difficulty: "Medium",
    potential: "$5k/mo",
    trending: false,
    iconType: "share",
    targetStackId: 'stack-social-media'
  },
  {
    id: 'booking-sys',
    title: "Niche Booking System",
    description: "Launch a scheduling solution for salons, barbers, or consultants.",
    prompt: "Launch a white-label booking and appointment system for service-based clients.",
    category: "Operations",
    difficulty: "Medium",
    potential: "$10k/mo",
    trending: true,
    iconType: "calendar",
    targetStackId: 'stack-ghl-killer'
  },
  {
    id: 'crm-niche',
    title: "Niche CRM (The Goldmine)",
    description: "Resell a pre-configured CRM for a specific industry (e.g., Roofers).",
    prompt: "I want to offer a simple white-label CRM for my small business clients.",
    category: "Operations",
    difficulty: "Hard",
    potential: "$50k+/mo",
    trending: true,
    iconType: "users",
    targetStackId: 'stack-ghl-killer'
  },
  {
    id: 'ai-voice',
    title: "AI Voice Receptionist",
    description: "Replace front-desk staff with human-sounding AI agents.",
    prompt: "I want to set up AI voice receptionists for dental offices.",
    category: "AI & Tech",
    difficulty: "Medium",
    potential: "$15k/mo",
    trending: true,
    iconType: "bot",
    targetStackId: 'stack-ai-agent'
  },
  {
    id: 'reputation',
    title: "Reputation Automation",
    description: "Auto-text customers to get 5-star reviews on Google.",
    prompt: "Help local businesses get more 5-star reviews automatically.",
    category: "Marketing",
    difficulty: "Easy",
    potential: "$3k-$8k/mo",
    trending: false,
    iconType: "star",
    targetStackId: 'stack-reputation'
  },
  {
    id: 'ads-manager',
    title: "Ads-in-a-Box",
    description: "White-label PPC management without being a media buyer.",
    prompt: "I want to resell Google Ad services to plumbers.",
    category: "Marketing",
    difficulty: "Hard",
    potential: "$20k/mo",
    trending: false,
    iconType: "zap",
    targetStackId: 'stack-ppc-traffic'
  },
  {
    id: 'newsletter',
    title: "Newsletter Platform",
    description: "Give creators a tool to email their audience.",
    prompt: "Build a newsletter platform for fitness creators.",
    category: "Content",
    difficulty: "Easy",
    potential: "$5k/mo",
    trending: true,
    iconType: "mail",
    targetStackId: 'stack-ghl-killer'
  }
];
