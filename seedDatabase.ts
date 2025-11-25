import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const sampleSolutions = [
  {
    name: 'WhiteLabel SEO Pro',
    company_name: 'SEO Masters Inc',
    company_website: 'https://seomasters.example.com',
    tagline: 'Complete white-label SEO platform for agencies',
    short_description: 'Full-featured SEO platform with white-label reporting, rank tracking, and automated audits',
    detailed_description: 'WhiteLabel SEO Pro provides everything your agency needs to offer professional SEO services under your brand. Features include automated site audits, rank tracking for unlimited keywords, white-label PDF reports, and a client portal.',
    primary_category: 'SEO',
    sub_category: 'Technical SEO',
    tags: ['SEO', 'Reporting', 'Rank Tracking', 'Audits'],
    logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop',
    rating: 4.8,
    implementations: 234,
    is_verified: true,
    is_featured: true,
    whitelabel_type: 'Full White Label',
    pricing_model: ['Monthly Subscription', 'Per Client'],
    agency_margin: 60,
    starting_price: '$99/month',
    setup_fee: 'Free',
    minimum_commitment: 'None',
    implementation_time: '24 hours',
    integration_methods: ['API', 'Embed', 'WordPress Plugin'],
    ideal_client_size: ['Small Business', 'Mid-Market'],
    features: ['Automated SEO Audits', 'Rank Tracking', 'Backlink Monitoring', 'White-Label Reports', 'Client Portal', 'API Access'],
    partner_support_model: '24/7 Partner Support via Chat and Email',
    agency_readiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: true },
    value_addons: ['Free Training', 'Sales Materials', 'Co-Marketing'],
    vendor_trust: { hasPublicRoadmap: true, hasSLA: true, hasDataMigration: true },
    resell_range: '$299-$999/month'
  },
  {
    name: 'ReputationMax',
    company_name: 'ReviewBoost Solutions',
    company_website: 'https://reviewboost.example.com',
    tagline: 'Automated reputation management and review generation',
    short_description: 'Help clients get more 5-star reviews with automated SMS and email campaigns',
    detailed_description: 'ReputationMax automates the review generation process with smart SMS and email campaigns. Monitor all review sites in one dashboard, respond to reviews, and showcase positive feedback on your clients\' websites.',
    primary_category: 'Marketing',
    sub_category: 'Reputation Management',
    tags: ['Reviews', 'Reputation', 'SMS', 'Automation'],
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop',
    rating: 4.9,
    implementations: 567,
    is_verified: true,
    is_featured: true,
    whitelabel_type: 'Full White Label',
    pricing_model: ['Per Location', 'Monthly'],
    agency_margin: 70,
    starting_price: '$49/location',
    setup_fee: '$99',
    minimum_commitment: '3 months',
    implementation_time: '1-2 days',
    integration_methods: ['API', 'Zapier', 'Direct Integration'],
    ideal_client_size: ['Small Business', 'Local Business'],
    features: ['Review Monitoring', 'SMS Campaigns', 'Email Campaigns', 'Review Widget', 'Multi-Location Support', 'White-Label Mobile App'],
    partner_support_model: 'Dedicated Partner Success Manager',
    agency_readiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: true, hasResellerBilling: true },
    value_addons: ['Marketing Templates', 'Sales Scripts', 'Client Onboarding'],
    vendor_trust: { hasPublicRoadmap: true, hasSLA: true, hasDataMigration: false },
    resell_range: '$149-$499/location'
  },
  {
    name: 'AI ChatBot Builder',
    company_name: 'ConvoAI',
    company_website: 'https://convoai.example.com',
    tagline: 'Build and deploy AI chatbots in minutes',
    short_description: 'Create custom AI chatbots trained on your client\'s data with zero coding',
    detailed_description: 'AI ChatBot Builder lets you create sophisticated AI chatbots for your clients in minutes. Train bots on website content, documents, and FAQs. Deploy to websites, WhatsApp, Facebook Messenger, and more.',
    primary_category: 'Automation',
    sub_category: 'AI & Chatbots',
    tags: ['AI', 'Chatbot', 'Customer Service', 'Automation'],
    logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200&h=200&fit=crop',
    rating: 4.7,
    implementations: 189,
    is_verified: true,
    is_featured: true,
    whitelabel_type: 'Reseller Program',
    pricing_model: ['Per Bot', 'Usage Based'],
    agency_margin: 50,
    starting_price: '$79/bot',
    setup_fee: 'Free',
    minimum_commitment: 'None',
    implementation_time: '1 hour',
    integration_methods: ['API', 'JavaScript Embed', 'Zapier'],
    ideal_client_size: ['Small Business', 'Mid-Market', 'Enterprise'],
    features: ['AI Training', 'Multi-Channel Deploy', 'Analytics Dashboard', 'Lead Capture', 'CRM Integration', 'Custom Branding'],
    partner_support_model: 'Email and Video Tutorials',
    agency_readiness: { hasCustomDomain: true, canRemoveBranding: true, hasWhiteLabelMobileApp: false, hasResellerBilling: true },
    value_addons: ['Implementation Guide', 'Video Training'],
    vendor_trust: { hasPublicRoadmap: true, hasSLA: false, hasDataMigration: false },
    resell_range: '$199-$799/bot'
  }
];

const sampleStacks = [
  {
    name: 'The Local SEO Dominator',
    category: 'Marketing',
    is_featured: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    target_niche: 'Local Businesses',
    target_team_size: ['1-10', '10-50'],
    target_goal: 'Increase local visibility and rankings',
    description: 'Complete local SEO stack including rank tracking, reputation management, and local listing optimization',
    pitch: 'Help local businesses dominate their market with automated SEO, review generation, and local listing management',
    tags: ['Local SEO', 'Reviews', 'Rankings'],
    solution_ids: [],
    suggested_resale_price: '$2,500-$4,000/month',
    typical_margin: '75%',
    replaces: [
      { name: 'Moz Local', estimatedCost: 299 },
      { name: 'BrightLocal', estimatedCost: 399 },
      { name: 'Grade.us', estimatedCost: 149 }
    ],
    estimated_agency_cost: '$497/month',
    estimated_launch_time: '2-3 days'
  },
  {
    name: 'The 24/7 AI Workforce',
    category: 'Automation',
    is_featured: true,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    target_niche: 'Service Businesses',
    target_team_size: ['1-10', '10-50'],
    target_goal: 'Automate customer service and lead capture',
    description: 'AI-powered chatbots, automated follow-ups, and smart routing for service businesses',
    pitch: 'Give your clients a 24/7 AI assistant that never sleeps, captures every lead, and provides instant support',
    tags: ['AI', 'Automation', 'Chatbots'],
    solution_ids: [],
    suggested_resale_price: '$497-$997/month',
    typical_margin: '65%',
    replaces: [
      { name: 'Intercom', estimatedCost: 499 },
      { name: 'Drift', estimatedCost: 500 }
    ],
    estimated_agency_cost: '$179/month',
    estimated_launch_time: '1-2 days'
  }
];

const sampleResellKits = [
  {
    title: 'Local SEO Resell Kit',
    price: 79900,
    value: '$4,500',
    description: 'Everything you need to sell high-margin SEO services to local businesses',
    tags: ['Best Seller', 'Beginner Friendly'],
    features: [
      'High-Converting Sales Page Copy',
      'Pricing Sheet & Margin Calculator',
      'White-Label Proposal Template',
      'Client Onboarding Form',
      'Sample Monthly SEO Reports',
      'Close in One Call Sales Script',
      'List of 3 Vetted Wholesale Vendors'
    ],
    category: 'SEO',
    is_featured: true,
    assets: [],
    required_tier: 'free',
    download_count: 0
  },
  {
    title: 'Reputation Management Kit',
    price: 69900,
    value: '$3,200',
    description: 'The easiest foot-in-the-door offer for agencies',
    tags: ['Low Friction', 'High Retention'],
    features: [
      'Reputation Sales Deck',
      'Cold Email Outreach Sequence',
      'GMB Optimization Checklist',
      'Negative Review Response Scripts',
      'Software Setup Guide',
      'Vendor Comparison Matrix',
      'Client Case Study Template'
    ],
    category: 'Marketing',
    is_featured: true,
    assets: [],
    required_tier: 'free',
    download_count: 0
  }
];

const sampleMembershipTiers = [
  {
    name: 'Free',
    price_monthly: 0,
    price_annual: 0,
    features: [
      'Browse marketplace',
      'View all solutions and stacks',
      'Access to community forum',
      'Basic implementation guides'
    ],
    max_clients: 5,
    max_downloads: 1,
    support_level: 'Community Support',
    is_active: true,
    sort_order: 1
  },
  {
    name: 'Pro',
    price_monthly: 9900,
    price_annual: 99900,
    features: [
      'Everything in Free',
      'Unlimited resell kit downloads',
      'Priority support',
      'Advanced implementation guides',
      'Monthly agency coaching calls',
      'Exclusive partner discounts'
    ],
    max_clients: 50,
    max_downloads: 999,
    support_level: 'Email & Chat Support',
    is_active: true,
    sort_order: 2
  },
  {
    name: 'Enterprise',
    price_monthly: 29900,
    price_annual: 299900,
    features: [
      'Everything in Pro',
      'White-label platform access',
      'Custom integrations',
      'Dedicated success manager',
      'Custom resell kit creation',
      'Co-marketing opportunities'
    ],
    max_clients: 999,
    max_downloads: 999,
    support_level: 'Dedicated Success Manager',
    is_active: true,
    sort_order: 3
  }
];

export async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    console.log('Seeding solutions...');
    for (const solution of sampleSolutions) {
      const { error } = await supabase
        .from('solutions')
        .insert(solution);

      if (error) {
        console.error('Error inserting solution:', error);
      } else {
        console.log(`Inserted solution: ${solution.name}`);
      }
    }

    console.log('Seeding stacks...');
    for (const stack of sampleStacks) {
      const { error } = await supabase
        .from('solution_stacks')
        .insert(stack);

      if (error) {
        console.error('Error inserting stack:', error);
      } else {
        console.log(`Inserted stack: ${stack.name}`);
      }
    }

    console.log('Seeding resell kits...');
    for (const kit of sampleResellKits) {
      const { error } = await supabase
        .from('resell_kits')
        .insert(kit);

      if (error) {
        console.error('Error inserting resell kit:', error);
      } else {
        console.log(`Inserted resell kit: ${kit.title}`);
      }
    }

    console.log('Seeding membership tiers...');
    for (const tier of sampleMembershipTiers) {
      const { error } = await supabase
        .from('membership_tiers')
        .insert(tier);

      if (error) {
        console.error('Error inserting membership tier:', error);
      } else {
        console.log(`Inserted membership tier: ${tier.name}`);
      }
    }

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase().then(() => {
  console.log('Seed script finished');
  process.exit(0);
}).catch(err => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
