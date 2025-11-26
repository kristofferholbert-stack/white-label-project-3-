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

const identityLevels = [
  {
    name: 'Agency Apprentice',
    slug: 'agency-apprentice',
    min_mrr: 0,
    max_mrr: 5000,
    badge_icon: '🌱',
    badge_color: '#10b981',
    description: 'Building your first revenue streams alongside your day job',
    benefits: [
      'Access to starter stacks',
      'Basic implementation guides',
      'Community forum access',
      'Email support'
    ],
    sort_order: 1
  },
  {
    name: 'Growth Partner',
    slug: 'growth-partner',
    min_mrr: 5000,
    max_mrr: 25000,
    badge_icon: '🚀',
    badge_color: '#3b82f6',
    description: 'Scaling your agency to replace your full-time income',
    benefits: [
      'All Side Hustler benefits',
      'Advanced automation stacks',
      'Priority support',
      'Monthly coaching calls',
      'Wholesale pricing tier'
    ],
    sort_order: 2
  },
  {
    name: 'Empire Scale',
    slug: 'empire-scale',
    min_mrr: 25000,
    max_mrr: null,
    badge_icon: '👑',
    badge_color: '#f59e0b',
    description: 'Running a 7-figure agency empire with systematic processes',
    benefits: [
      'All Agency Builder benefits',
      'White-label platform access',
      'Dedicated success manager',
      'Custom stack creation',
      'Co-marketing opportunities',
      'Insider benchmarking data'
    ],
    sort_order: 3
  }
];

const launchKits = [
  {
    title: 'Local SEO Launch Kit',
    description: 'Everything you need to launch high-margin local SEO services in 48 hours',
    total_value: 99700,
    item_type: 'category',
    category: 'SEO',
    access_tier: 'free',
    is_featured: true,
    assets: []
  },
  {
    title: 'Reputation Management Launch Kit',
    description: 'Complete system for selling review automation services',
    total_value: 79700,
    item_type: 'category',
    category: 'Marketing',
    access_tier: 'free',
    is_featured: true,
    assets: []
  },
  {
    title: 'AI Automation Launch Kit',
    description: 'Deploy AI chatbots and automation for premium clients',
    total_value: 129700,
    item_type: 'category',
    category: 'Automation',
    access_tier: 'verified_trial',
    is_featured: true,
    assets: []
  }
];

const bonusAssets = {
  'Local SEO Launch Kit': [
    {
      title: 'High-Converting Sales Page Template',
      description: 'Copy-paste landing page that converts at 12%+',
      asset_type: 'template',
      file_url: '/assets/seo-sales-page.html',
      file_size: '45 KB',
      estimated_value: 19700,
      sort_order: 1
    },
    {
      title: 'Pricing & Margin Calculator',
      description: 'Excel calculator showing optimal pricing for 60%+ margins',
      asset_type: 'tool',
      file_url: '/assets/pricing-calculator.xlsx',
      file_size: '2.1 MB',
      estimated_value: 9700,
      sort_order: 2
    },
    {
      title: 'White-Label Proposal Template',
      description: 'Professional proposal template with your branding',
      asset_type: 'template',
      file_url: '/assets/seo-proposal.docx',
      file_size: '890 KB',
      estimated_value: 14700,
      sort_order: 3
    },
    {
      title: '"Close in One Call" Sales Script',
      description: 'Proven script that closes 40% of qualified leads',
      asset_type: 'script',
      file_url: '/assets/seo-sales-script.pdf',
      file_size: '1.2 MB',
      estimated_value: 29700,
      sort_order: 4
    },
    {
      title: 'Monthly Reporting Templates (3 Designs)',
      description: 'Beautiful PDF reports your clients will love',
      asset_type: 'template',
      file_url: '/assets/seo-reports.zip',
      file_size: '8.9 MB',
      estimated_value: 19700,
      sort_order: 5
    },
    {
      title: 'Vendor Setup Cheat Sheet',
      description: 'Copy-paste configurations for top 5 SEO tools',
      asset_type: 'checklist',
      file_url: '/assets/seo-vendor-setup.pdf',
      file_size: '450 KB',
      estimated_value: 7200,
      sort_order: 6
    }
  ],
  'Reputation Management Launch Kit': [
    {
      title: 'Reputation Sales Deck (PowerPoint)',
      description: '15-slide deck that sells the value of reviews',
      asset_type: 'template',
      file_url: '/assets/reputation-deck.pptx',
      file_size: '12 MB',
      estimated_value: 24700,
      sort_order: 1
    },
    {
      title: 'Cold Email Outreach Sequence',
      description: '7-email sequence with 35% response rate',
      asset_type: 'script',
      file_url: '/assets/reputation-emails.pdf',
      file_size: '780 KB',
      estimated_value: 14700,
      sort_order: 2
    },
    {
      title: 'GMB Optimization Checklist',
      description: '47-point checklist for Google My Business setup',
      asset_type: 'checklist',
      file_url: '/assets/gmb-checklist.pdf',
      file_size: '2.1 MB',
      estimated_value: 9700,
      sort_order: 3
    },
    {
      title: 'Negative Review Response Scripts',
      description: 'Templates for responding to 1-3 star reviews',
      asset_type: 'script',
      file_url: '/assets/review-responses.pdf',
      file_size: '890 KB',
      estimated_value: 12700,
      sort_order: 4
    },
    {
      title: 'Client Case Study Template',
      description: 'Before/after case study format with design',
      asset_type: 'template',
      file_url: '/assets/case-study-template.pptx',
      file_size: '5.5 MB',
      estimated_value: 14700,
      sort_order: 5
    }
  ],
  'AI Automation Launch Kit': [
    {
      title: 'AI Chatbot Implementation Guide',
      description: 'Step-by-step video training (2.5 hours)',
      asset_type: 'video',
      file_url: '/assets/ai-training.mp4',
      file_size: '1.8 GB',
      estimated_value: 49700,
      sort_order: 1
    },
    {
      title: 'Premium Pricing Strategy Guide',
      description: 'How to charge $500-$2000/mo for AI services',
      asset_type: 'template',
      file_url: '/assets/ai-pricing-guide.pdf',
      file_size: '3.2 MB',
      estimated_value: 29700,
      sort_order: 2
    },
    {
      title: 'Industry-Specific Bot Templates',
      description: 'Pre-trained bots for 10 different industries',
      asset_type: 'template',
      file_url: '/assets/bot-templates.zip',
      file_size: '45 MB',
      estimated_value: 39700,
      sort_order: 3
    },
    {
      title: 'Client ROI Calculator',
      description: 'Show clients exactly how much they\'ll save',
      asset_type: 'tool',
      file_url: '/assets/ai-roi-calculator.xlsx',
      file_size: '1.1 MB',
      estimated_value: 10600,
      sort_order: 4
    }
  ]
};

const benchmarkMetrics = [
  {
    category: 'SEO',
    metric_type: 'pricing',
    percentile_25: 499,
    percentile_50: 997,
    percentile_75: 1997,
    percentile_90: 2997,
    sample_size: 342
  },
  {
    category: 'SEO',
    metric_type: 'margin',
    percentile_25: 45,
    percentile_50: 62,
    percentile_75: 75,
    percentile_90: 85,
    sample_size: 342
  },
  {
    category: 'Marketing',
    metric_type: 'pricing',
    percentile_25: 299,
    percentile_50: 699,
    percentile_75: 1499,
    percentile_90: 2499,
    sample_size: 567
  },
  {
    category: 'Marketing',
    metric_type: 'margin',
    percentile_25: 55,
    percentile_50: 70,
    percentile_75: 80,
    percentile_90: 88,
    sample_size: 567
  },
  {
    category: 'Automation',
    metric_type: 'pricing',
    percentile_25: 697,
    percentile_50: 1297,
    percentile_75: 2497,
    percentile_90: 4997,
    sample_size: 189
  },
  {
    category: 'Automation',
    metric_type: 'margin',
    percentile_25: 50,
    percentile_50: 65,
    percentile_75: 78,
    percentile_90: 87,
    sample_size: 189
  }
];

export async function seedValueWrap() {
  try {
    console.log('Starting Value Wrap data seed...');

    console.log('Seeding identity levels...');
    for (const level of identityLevels) {
      const { error } = await supabase
        .from('agency_identity_levels')
        .insert(level);

      if (error) {
        console.error('Error inserting identity level:', error);
      } else {
        console.log(`Inserted identity level: ${level.name}`);
      }
    }

    console.log('Seeding launch kits...');
    for (const kit of launchKits) {
      const { data, error } = await supabase
        .from('launch_kits')
        .insert(kit)
        .select()
        .single();

      if (error) {
        console.error('Error inserting launch kit:', error);
      } else {
        console.log(`Inserted launch kit: ${kit.title}`);

        if (data && bonusAssets[kit.title]) {
          console.log(`  Adding bonus assets to ${kit.title}...`);
          const assets = bonusAssets[kit.title].map(asset => ({
            ...asset,
            launch_kit_id: data.id
          }));

          for (const asset of assets) {
            const { error: assetError } = await supabase
              .from('bonus_assets')
              .insert(asset);

            if (assetError) {
              console.error('    Error inserting bonus asset:', assetError);
            } else {
              console.log(`    Added: ${asset.title}`);
            }
          }
        }
      }
    }

    console.log('Seeding benchmark metrics...');
    for (const metric of benchmarkMetrics) {
      const { error } = await supabase
        .from('benchmark_metrics')
        .insert(metric);

      if (error) {
        console.error('Error inserting benchmark metric:', error);
      } else {
        console.log(`Inserted benchmark: ${metric.category} - ${metric.metric_type}`);
      }
    }

    console.log('Value Wrap data seeding completed!');
  } catch (error) {
    console.error('Error seeding Value Wrap data:', error);
  }
}

seedValueWrap().then(() => {
  console.log('Seed script finished');
  process.exit(0);
}).catch(err => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
