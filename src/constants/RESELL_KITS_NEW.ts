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
