export type LessonType = 'text' | 'pdf' | 'video' | 'tool' | 'downloadable' | 'checklist';

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  content?: any;
  description?: string;
  downloadUrl?: string;
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  estimatedTime: string;
}

export interface KitCourse {
  kitId: string;
  title: string;
  description: string;
  totalDuration: string;
  modules: Module[];
}

export const KIT_COURSES: Record<string, KitCourse> = {
  'kit-seo-local': {
    kitId: 'kit-seo-local',
    title: 'Local SEO Resell Kit - Complete Agency Launch Course',
    description: 'Master every aspect of launching and scaling a profitable local SEO agency. From your first sales call to $10k/month in recurring revenue.',
    totalDuration: '8-12 hours',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1: Launch Your Agency',
        description: 'Understand the opportunity, choose your niche, and set up your business foundation',
        estimatedTime: '1.5 hours',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'The Local SEO Opportunity',
            type: 'text',
            duration: '15 min',
            description: 'Why local SEO is the perfect agency model for beginners and experienced marketers alike',
            content: {
              sections: [
                {
                  heading: 'Why Local SEO?',
                  body: `Local SEO is one of the most profitable and scalable agency models available today. Here's why:

**Market Size**: 97% of consumers search online for local businesses. The total addressable market is every business with a physical location or service area.

**High Client LTV**: Average local SEO client stays 18-24 months at $1,000-2,500/month = $18,000-60,000 lifetime value per client.

**Predictable Results**: Unlike other marketing channels, local SEO has proven frameworks that work consistently. You can reliably get clients to page 1 within 90 days.

**Recurring Revenue**: SEO requires ongoing maintenance, creating predictable monthly recurring revenue (MRR).

**Low Competition**: Most local businesses still don't understand SEO. Your competition is often non-existent in smaller markets.`
                },
                {
                  heading: 'The Numbers That Matter',
                  body: `**Average Deal Size**: $1,497/month (Growth package)
**Close Rate**: 30-40% of qualified prospects (using our scripts)
**Client Acquisition Cost**: $200-500 (cold outreach) or $0 (referrals)
**Gross Margin**: 40-60% (hybrid model)
**Churn Rate**: 15-20% annually (industry average)

**Path to $10k/Month**:
- 7 clients at $1,497/month = $10,479/month
- Or 10 clients at $997/month = $9,970/month
- Or mixed: 5 Foundation + 3 Growth + 1 Domination = $11,470/month`
                },
                {
                  heading: 'What Makes This Different from Other Agency Models',
                  body: `**vs. Social Media Marketing**: More measurable ROI, less dependent on platforms changing rules
**vs. Paid Ads**: Builds long-term value, not just renting traffic
**vs. Web Design**: Recurring revenue vs. one-time projects
**vs. General Marketing**: Specific, learnable skillset with proven frameworks

**Key Advantage**: You can start with ZERO clients and be profitable within 60 days. The barrier to entry is knowledge, not capital.`
                }
              ]
            }
          },
          {
            id: 'lesson-1-2',
            title: 'Choosing Your Niche',
            type: 'tool',
            duration: '20 min',
            description: 'Interactive worksheet to identify the most profitable niche for your agency',
            content: {
              tool: 'niche-selector',
              instructions: 'Use this decision framework to choose your ideal niche based on market size, competition, and your expertise.',
              criteria: [
                {
                  factor: 'Average Customer Value',
                  dentist: '$2,000-5,000',
                  legal: '$5,000-50,000',
                  hvac: '$500-15,000',
                  restaurant: '$25-100',
                  scoring: 'Higher = Better'
                },
                {
                  factor: 'Local Competition',
                  dentist: 'Medium-High',
                  legal: 'Very High',
                  hvac: 'Medium',
                  restaurant: 'High',
                  scoring: 'Lower = Better'
                },
                {
                  factor: 'Sales Cycle',
                  dentist: '2-4 weeks',
                  legal: '4-8 weeks',
                  hvac: '1-3 weeks',
                  restaurant: '1-2 weeks',
                  scoring: 'Shorter = Better'
                },
                {
                  factor: 'Client Sophistication',
                  dentist: 'Medium',
                  legal: 'High',
                  hvac: 'Low-Medium',
                  restaurant: 'Low',
                  scoring: 'Lower = Easier'
                },
                {
                  factor: 'Monthly Budget',
                  dentist: '$1,500-2,500',
                  legal: '$2,500-5,000',
                  hvac: '$1,000-2,000',
                  restaurant: '$500-1,500',
                  scoring: 'Higher = Better'
                }
              ],
              recommendation: 'Start with HVAC or Dental for best balance of value and competition'
            }
          },
          {
            id: 'lesson-1-3',
            title: 'Setting Up Your Agency (Legal & Business)',
            type: 'text',
            duration: '25 min',
            description: 'Business structure, insurance, contracts, and compliance basics',
            content: {
              sections: [
                {
                  heading: 'Business Structure',
                  body: `**Recommended**: LLC (Limited Liability Company)

**Why LLC**:
- Protects personal assets
- Simple tax treatment (pass-through)
- Flexible management structure
- Professional credibility

**Setup Process**:
1. Choose business name (check availability at sos.[yourstate].gov)
2. Register LLC with your Secretary of State ($50-500 depending on state)
3. Get EIN from IRS (free, takes 5 minutes online)
4. Open business bank account
5. Get business insurance

**Timeline**: 1-2 weeks
**Cost**: $300-800 total`
                },
                {
                  heading: 'Essential Insurance',
                  body: `**General Liability Insurance**: $400-800/year
- Protects against property damage and bodily injury claims
- Required by some clients

**Professional Liability Insurance (E&O)**: $500-1,200/year
- Protects against claims of negligence or failure to deliver results
- CRITICAL for agency work

**Where to Get It**:
- Next Insurance (easiest, online quotes)
- Hiscox (popular with agencies)
- The Hartford (comprehensive coverage)

**Pro Tip**: Bundle both policies for discount`
                },
                {
                  heading: 'Contracts You Need',
                  body: `**1. Master Services Agreement (MSA)**:
- Defines scope of services
- Payment terms
- Performance expectations
- Cancellation policy
- Liability limitations

**2. Statement of Work (SOW)**:
- Specific to each project/campaign
- Deliverables and timeline
- Success metrics
- Attached to MSA

**3. Non-Disclosure Agreement (NDA)**:
- Protects client confidential information
- Usually client provides this

**Where to Get Templates**:
- Bonsai.io (recommended, $19/mo)
- Proposify (includes e-signature)
- Your attorney (most expensive but most protected)

**CRITICAL**: Never start work without signed agreement`
                }
              ]
            }
          },
          {
            id: 'lesson-1-4',
            title: 'Pricing Strategy & Positioning',
            type: 'text',
            duration: '20 min',
            description: 'The 3-tier pricing model and how to position yourself as premium',
            content: {
              sections: [
                {
                  heading: 'The 3-Tier Pricing Strategy',
                  body: `**Foundation Package - $997/month**:
Target: Budget-conscious clients, small businesses
Includes: GBP optimization, citations, review generation, basic reporting

**Growth Package - $1,497/month** ⭐ ANCHOR (Most Popular)
Target: Serious businesses ready to dominate
Includes: Everything in Foundation + on-page SEO, content, link building, call tracking

**Domination Package - $2,497/month**:
Target: Multi-location or highly competitive markets
Includes: Everything in Growth + advanced strategies, dedicated account manager, priority support

**Why 3 Tiers Work**:
- Anchoring effect (middle tier looks like best value)
- Captures different budget levels
- Provides upsell path
- Professional positioning`
                },
                {
                  heading: 'Never Compete on Price',
                  body: `**Wrong Positioning**: "I'm the cheapest SEO provider"
Result: Low-quality clients, endless price negotiations, no loyalty

**Right Positioning**: "I specialize in [niche] and get results"
Result: Premium pricing, better clients, higher retention

**Value Propositions That Work**:
- "We ONLY work with dentists" (specialization)
- "Page 1 in 90 days or work for free" (guarantee)
- "Average client sees 3-5x ROI" (results)
- "We've generated $2M+ for local businesses" (social proof)

**Premium Positioning Checklist**:
✓ Professional website (not Wix)
✓ Case studies with real numbers
✓ Industry-specific testimonials
✓ Published content (blog, podcast, YouTube)
✓ Speaking at industry events
✓ Certifications (Google Partner, etc.)`
                }
              ]
            }
          },
          {
            id: 'lesson-1-5',
            title: 'Your First Week Action Plan',
            type: 'checklist',
            duration: '10 min',
            description: 'Exact steps to take in your first 7 days',
            content: {
              tasks: [
                {
                  day: 'Day 1',
                  items: [
                    'Choose your niche using the worksheet',
                    'Register business name and domain',
                    'Set up business email (you@youragency.com)',
                    'Create LinkedIn profile for your agency'
                  ]
                },
                {
                  day: 'Day 2',
                  items: [
                    'File LLC paperwork with state',
                    'Apply for EIN from IRS',
                    'Open business bank account',
                    'Get business insurance quotes'
                  ]
                },
                {
                  day: 'Day 3',
                  items: [
                    'Set up basic website (1-page minimum)',
                    'Create service packages and pricing page',
                    'Write 3 case studies (even if hypothetical)',
                    'Customize the 12-page proposal template'
                  ]
                },
                {
                  day: 'Day 4',
                  items: [
                    'Create list of 50 prospects in your area',
                    'Research top 10 prospects (their current rankings, reviews, etc.)',
                    'Prepare personalized audit findings for top 3',
                    'Practice sales script'
                  ]
                },
                {
                  day: 'Day 5',
                  items: [
                    'Start outreach (10 cold emails using our templates)',
                    'Connect with 10 prospects on LinkedIn',
                    'Join local business Facebook groups',
                    'Reach out to 3 white-label vendors for quotes'
                  ]
                },
                {
                  day: 'Day 6',
                  items: [
                    'Follow up with Day 5 outreach',
                    'Send 10 more cold emails',
                    'Record 30-second intro video for proposals',
                    'Set up CRM or simple spreadsheet for tracking'
                  ]
                },
                {
                  day: 'Day 7',
                  items: [
                    'Review progress and adjust approach',
                    'Book your first discovery call',
                    'Prepare for your first pitch',
                    'Celebrate - you\'re officially in business!'
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Module 2: Sales & Client Acquisition',
        description: 'Master the art of selling local SEO services with our battle-tested scripts and strategies',
        estimatedTime: '2.5 hours',
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'The 12-Page Proposal Deep Dive',
            type: 'text',
            duration: '30 min',
            description: 'Walk through each section of our 40% close-rate proposal template',
            content: {
              sections: [
                {
                  heading: 'Why This Proposal Works (40% Close Rate)',
                  body: `This isn't just a proposal - it's a diagnostic sales tool that does the selling for you.

**What Makes It Different**:
• Leads with their specific pain points (not generic SEO talk)
• Uses data from YOUR audit of their business
• Quantifies the opportunity in dollars (not just rankings)
• Includes performance guarantee to reduce risk
• Shows clear ROI timeline (when they break even)

**The 12 Pages Breakdown**:

Page 1: Executive Summary - Hook them with 3 specific problems you found
Page 2: The Problem - Educate them on why they're losing business
Page 3-4: The Solution - Your 90-day system explained simply
Page 5: Investment & Packages - 3-tier pricing (Foundation/Growth/Domination)
Page 6-7: Case Studies - Real results from real clients
Page 8: Why Us - What makes you different
Page 9: The Process - Timeline and what they can expect
Page 10: FAQs - Pre-handle common objections
Page 11: Performance Guarantee - Remove risk
Page 12: Next Steps - Clear call to action`
                },
                {
                  heading: 'Executive Summary Template',
                  body: `Dear [Client Name],

Thank you for taking the time to discuss your business goals with me. After conducting a comprehensive analysis of [Business Name]'s online presence, I've identified three critical opportunities that are currently costing you an estimated [X] leads per month.

**The Three Opportunities**:
1. **Google Business Profile Optimization**: Your GBP is only 65% complete, while competitors averaging 95% completion are receiving 3.2x more calls.
2. **Review Gap**: You have [X] reviews vs. your top competitor's [Y] reviews. This gap represents approximately $[Z] in lost monthly revenue.
3. **Local Search Visibility**: Your business appears on page 2-3 for [key service terms]. 75% of clicks go to page 1 results.

**The Investment**: $[price]/month for [X] months
**Expected ROI**: Conservative estimate of [X] additional leads per month, valued at $[Y] each = $[total value]
**Break-even Timeline**: Month 2-3 with just [X] closed deals from new leads

This proposal outlines our proven 90-day system for dominating local search in [City/Region].`
                },
                {
                  heading: 'Pricing Strategy: The 3-Tier Model',
                  body: `**FOUNDATION PACKAGE - $997/month**
Perfect for: Single-location businesses, less competitive markets

Includes:
✓ Google Business Profile optimization & management
✓ 50 local citations (submit + monitor)
✓ Review generation system (target: 10 reviews/month)
✓ Review monitoring & response
✓ 2 Google Posts per week
✓ Monthly ranking reports
✓ Email support

**GROWTH PACKAGE - $1,497/month** ⭐ Most Popular
Perfect for: Businesses ready to dominate their market

Everything in Foundation, PLUS:
✓ 10 pages on-page SEO optimization
✓ 2 location-specific blog posts per month
✓ 5 local backlinks per month
✓ Advanced schema markup implementation
✓ Conversion rate optimization
✓ Call tracking setup & monitoring
✓ Bi-weekly strategy calls
✓ Phone & email support

**DOMINATION PACKAGE - $2,497/month**
Perfect for: Multi-location or highly competitive markets

Everything in Growth, PLUS:
✓ 20 pages on-page SEO optimization
✓ 4 location-specific blog posts per month
✓ 10 local backlinks per month
✓ Competitor tracking & counter-strategies
✓ Google Local Service Ads management
✓ Advanced reputation management
✓ Priority phone support
✓ Dedicated account manager
✓ Custom reporting dashboard`
                }
              ]
            }
          },
          {
            id: 'lesson-2-2',
            title: 'Close-in-One-Call Script',
            type: 'text',
            duration: '45 min',
            description: 'Word-for-word script with 40%+ close rate',
            content: {
              sections: [
                {
                  heading: 'The Close-in-One-Call Script (40%+ Close Rate)',
                  body: `This script has been tested with 500+ sales calls. The key is diagnostic selling, not pitching.

**Pre-Call Preparation**:
□ Research their business: website, GBP, reviews, competitors
□ Prepare custom audit findings (rankings, reviews, GBP completion)
□ Have proposal ready with their name pre-filled
□ Set expectations: "This is a working call, not just a meet-and-greet"`
                },
                {
                  heading: 'Part 1: Opening (0:00-2:00)',
                  body: `**YOUR WORDS**:
"Hey [Name], thanks for jumping on with me. Just to set expectations for our time together - I've already done a deep dive on [Business Name]'s online presence, and I found three specific opportunities that are costing you leads right now.

My plan is to walk you through what I found, show you exactly where the gaps are, and then if it makes sense, I'll show you how we fix it. Sound good?"

**Why This Works**:
• Immediately positions you as expert (you've done homework)
• Creates curiosity gap (three opportunities)
• Sets the agenda (you're leading)
• Gets buy-in with yes-ladder technique

**If They Say**: "How much does this cost?"
**Your Response**: "Great question - I'll get to pricing in about 10 minutes. But I can tell you right now, if what I found doesn't make sense for your business, this conversation ends with no hard feelings. Fair?"`
                },
                {
                  heading: 'Part 2: Discovery Questions (2:00-8:00)',
                  body: `**YOUR WORDS**:
"Before I show you what I found, help me understand your current marketing..."

**Critical Questions to Ask**:

1. "How are you getting customers right now?"
   → Listen for: paid ads, referrals, walk-ins, old website

2. "What's your average customer worth to you?"
   → CRITICAL for ROI calculations later
   → If they don't know: "What's an average sale? How many times do they come back?"

3. "How many new customers do you need each month to be happy?"
   → Establishes clear goal for later

4. "Have you tried SEO or online marketing before?"
   → Listen for: bad agency experiences, DIY attempts, skepticism
   → If yes: "What didn't work about it?"

5. "Walk me through your decision-making process. Is it just you, or do you need to run this by someone?"
   → Identify decision-maker NOW, not after proposal

6. "What would stop you from moving forward with something like this if it made sense?"
   → Surfaces objections early (money, time, trust)

7. "If you could wave a magic wand and fix one thing about your marketing, what would it be?"
   → Gets to core motivation - use this in close

**Transition**:
"Okay, that's super helpful. Let me show you what I found when I analyzed [Business]..."`
                },
                {
                  heading: 'Part 3: Audit Presentation (8:00-18:00)',
                  body: `**Finding #1: Google Business Profile Gap**

"Okay, first thing - I pulled up your Google Business Profile. Right now you're at [X]% completion."

[Show their GBP side-by-side with top competitor]

"See how [Competitor Name] has 150 photos, posts every week, and has their Q&A section filled out? That's why they show up first when someone searches '[service] near me'.

Google's algorithm prioritizes complete profiles. You're basically invisible in the local map pack right now, and that's where 75% of clicks go.

Make sense so far?"

**Finding #2: The Review Gap**

"Second thing - reviews. You have [X] reviews. Your top three competitors have [Y], [Z], and [A] reviews."

[Show bar chart comparison]

"Here's why this matters: 88% of consumers won't even consider a business with fewer than 10 reviews. And between two businesses, they'll choose the one with more reviews 9 times out of 10.

Based on search volume data, this review gap is costing you approximately [X] leads per month. At your average customer value of $[Y], that's $[Z] in lost revenue. Every. Single. Month."

**Finding #3: Rankings & Visibility**

"Third thing - I checked where you rank for the main keywords people use to find businesses like yours."

[Show ranking report]

"For '[service] [city]' - you're on page 3. '[service] near me' - page 4. '[specific service]' - not ranking at all.

Here's the problem: 92% of searchers never go past page 1. You're literally invisible to 9 out of 10 potential customers.

But here's the good news - [City] isn't that competitive. I've gotten clients to page 1 in 90 days in similar markets."

**The Cost of Inaction**:

"Let me break down what this is costing you in real numbers..."

• [X] searches per month for your services in [city]
• You're currently capturing maybe 5-10% of that traffic
• That's [Y] missed opportunities per month
• At a conservative 20% conversion rate, that's [Z] lost customers
• At $[average customer value] each = $[total lost revenue] per month

"Does that make sense? Do you see the opportunity here?"

[PAUSE - Let them process and respond]`
                },
                {
                  heading: 'Part 4: The Solution (18:00-25:00)',
                  body: `"Cool. So let me show you exactly how we fix all three of those issues..."

**The 90-Day Plan**:

"We use a three-phase system:

**Phase 1 - Foundation (Month 1)**
• Complete your Google Business Profile to 100%
• Submit your business to 50+ local directories
• Install our automated review generation system
• Target: 15-20 new reviews in first 30 days

**Phase 2 - Growth (Month 2)**
• Optimize your website for the 15 most important keywords
• Build local backlinks from reputable sites
• Start ranking for easier 'long-tail' keywords
• Create content targeting local searches

**Phase 3 - Domination (Month 3)**
• Push for page 1 rankings on competitive terms
• Amp up review generation to 5-10/month ongoing
• Optimize for conversion (more calls from same traffic)
• Start seeing serious ROI

Most clients see rankings improve by week 3-4, and increased call volume by month 2."

**Social Proof**:

"Just to give you context - I worked with [similar business] in [nearby city]. Same situation - page 3 rankings, only 8 reviews. After 90 days:
• Page 1 for 12 of their target keywords
• 43 total reviews
• They went from 15 leads per month to 52 leads per month
• ROI was about 4:1 after month 2

Obviously every market is different, but that's typical of what we see."`
                },
                {
                  heading: 'Part 5: The Close (25:00-30:00)',
                  body: `**Present Pricing**:

"So in terms of investment, I have three packages..."

[Share screen with pricing]

"Most clients in your situation start with the [GROWTH] package at $1,497/month. That includes everything I just walked through plus ongoing optimization.

The contract is 6 months - and I know that sounds like a commitment, but SEO takes time. I'd rather be upfront about that than promise overnight results.

Now, I also have a performance guarantee: if we don't get you page 1 rankings for at least 5 of your target keywords within 90 days, we'll work for free until we do.

Based on what we talked about - your goal of [X] new customers per month, average customer value of $[Y] - you should break even by month 2 or 3.

Does that make sense?"

**Trial Close**:

"On a scale of 1-10, where 1 is 'this is crazy' and 10 is 'let's do this', where are you?"

**If 7-10**: "Great! What would make it a 10?"
**If 4-6**: "What's holding you back?"
**If 1-3**: "What would need to change for this to make sense?"

**Common Objections**:

❌ "I need to think about it"
✅ "Totally fair. What specifically do you need to think about? Is it the price, the timeline, or something else?"

❌ "I need to talk to my partner"
✅ "Of course. Should we get them on the line now? I can walk through this again."

❌ "That's too expensive"
✅ "I hear you. Let me ask - based on the [Z] leads per month you're losing, how long can you afford NOT to fix this?"

**The Assumptive Close**:

"Okay, so next steps - I'll send over the formal agreement today. We can start as early as Monday. I'll need access to your Google Business Profile and website. Does Monday or Wednesday work better for our kickoff call?"`
                }
              ]
            }
          },
          {
            id: 'lesson-2-3',
            title: 'Objection Handling Scripts',
            type: 'text',
            duration: '25 min',
            description: 'Battle-tested responses to the 7 most common objections',
            content: {
              sections: [
                {
                  heading: 'The 7 Most Common Objections',
                  body: `Every prospect will have objections. The key is to isolate the real concern and address it directly.

**Objection #1: "I need to think about it"**
Response: "Totally understandable. What specifically do you need to think about? Is it the price, the timeline, or something else?"

**Objection #2: "It's too expensive"**
Response: "I hear you. Too expensive compared to what? What are you spending on marketing now? Let's do the math together..."

**Objection #3: "I need to talk to my partner"**
Response: "Of course. Should we get them on the line now? I can walk through this again."

**Objection #4: "I've been burned by SEO companies before"**
Response: "I'm sorry to hear that. What specifically went wrong? Let me show you how we're different..."

**Objection #5: "I'll just do it myself"**
Response: "That's great that you're willing to learn! Out of curiosity, how much time do you have to dedicate to this per week?"

**Objection #6: "Can you guarantee results?"**
Response: "I can't guarantee you'll rank #1 - nobody can ethically promise that. But I CAN guarantee we'll get you page 1 for 5+ keywords in 90 days, or we work for free."

**Objection #7: "I don't have time for this right now"**
Response: "I understand - you're busy running your business. That's exactly why we do all the heavy lifting. You'd spend maybe 30 minutes per month on calls with us."`
                },
                {
                  heading: 'The Framework: Feel, Felt, Found',
                  body: `This is your secret weapon for any objection:

1. **Feel**: "I understand how you FEEL..."
2. **Felt**: "Other clients have FELT the same way..."
3. **Found**: "But what they FOUND was..."

Example:
"I understand how you feel about the investment. Many of our best clients felt the same way initially. But what they found was that after just 2 months, the additional leads more than paid for the service. One client actually told me they wish they'd started sooner."`
                }
              ]
            }
          },
          {
            id: 'lesson-2-4',
            title: 'Follow-Up Email Sequences',
            type: 'text',
            duration: '20 min',
            description: 'The 7-day sequence that gets 40% response on "breakup email"',
            content: {
              sections: [
                {
                  heading: 'Why Follow-Up Wins Deals',
                  body: `80% of sales require 5+ follow-ups, but 44% of salespeople give up after one follow-up.

The fortune is in the follow-up. Most deals close between days 3-7.`
                },
                {
                  heading: 'The 7-Day Sequence',
                  body: `**Day 1: Immediate (Within 5 minutes of call)**
Subject: "Your Local SEO Proposal - [Business Name]"

Hi [Name],

Great talking with you today! As promised, here's your custom Local SEO proposal.

Key highlights:
• We identified [X] specific opportunities costing you [Y] leads/month
• Conservative ROI estimate: [Z]x return by month 3
• Performance guarantee: Page 1 in 90 days or work for free

Take a look and let me know if you have any questions. Happy to jump on a quick call to walk through anything.

Best,
[Your Name]

---

**Day 2: Text Message**
"Hey [Name], just wanted to make sure you got the proposal I sent yesterday. Any initial thoughts?"

---

**Day 3: Value Email**
Subject: "Quick question about [Business Name]'s SEO"

Hi [Name],

I was thinking more about our conversation, and I wanted to share something that might be helpful even if we don't work together.

[Include a specific tip related to their audit findings]

This alone could get you a few more calls this month. Try it out!

Also - any questions about the proposal?

Best,
[Your Name]

---

**Day 5: Phone Call**
If no answer, leave voicemail:
"Hi [Name], it's [Your Name] following up on the proposal I sent. I know you're busy, so I won't take much of your time. I just wanted to check if you had any questions. Give me a call back at [number]. Thanks!"

---

**Day 7: The Breakup Email** (40% Response Rate)
Subject: "Should I close your file?"

Hi [Name],

I haven't heard back from you, so I'm assuming you've either:

a) Decided to go with another company
b) Decided to handle SEO in-house
c) Put this on the back burner for now

No worries either way! I just want to make sure I'm not bothering you.

If I don't hear back, I'll assume you're not interested and I'll close your file.

But if you're still interested and just got busy (happens to all of us!), just hit reply and let me know.

Either way, best of luck with [Business Name]!

[Your Name]

---

**Why This Works**: The breakup email creates urgency and gives them an easy way to re-engage without feeling awkward about not responding.`
                }
              ]
            }
          },
          {
            id: 'lesson-2-5',
            title: 'Prospecting Strategies',
            type: 'text',
            duration: '30 min',
            description: 'How to build a pipeline of qualified leads without paid ads',
            content: {
              sections: [
                {
                  heading: 'The 5 Best Prospecting Channels (Ranked)',
                  body: `**#1: LinkedIn Direct Outreach** (Highest Quality)
• Connect with local business owners in your niche
• Send personalized connection request
• Follow up with audit findings
• Close rate: 15-20%

**#2: Cold Email** (Highest Volume)
• Build list from Google Maps + business directories
• Send personalized audit findings
• 3-email sequence
• Close rate: 5-10%

**#3: Local Networking Events** (Best for Relationships)
• Chamber of Commerce meetings
• BNI groups
• Industry-specific events
• Close rate: 30-40% (but slower pipeline)

**#4: Strategic Partnerships** (Easiest Referrals)
• Web designers
• Business consultants
• Accountants serving your niche
• Close rate: 40-50%

**#5: Content Marketing** (Longest Timeline)
• YouTube tutorials
• LinkedIn posts
• Local business podcasts
• Close rate: 20-30% (but inbound)`
                },
                {
                  heading: 'The Perfect Prospecting Week',
                  body: `**Monday**: Build list (50 prospects)
• Use Google Maps: "dentist [city]"
• Export to spreadsheet
• Find contact info (Hunter.io, LinkedIn)

**Tuesday-Thursday**: Outreach (30 contacts/day)
• LinkedIn connections: 10/day
• Cold emails: 20/day
• Personalize each message with audit finding

**Friday**: Follow-up & networking
• Follow up with previous week's prospects
• Attend local networking event
• Schedule next week's prospecting

**Goal**: 5-10 discovery calls per week
**Expected**: 1-2 new clients per month`
                },
                {
                  heading: 'The Cold Email Template That Works',
                  body: `Subject: Quick question about [Business Name]'s Google ranking

Hi [Name],

I was searching for "[service] [city]" and noticed [Business Name] isn't showing up on page 1.

I did a quick audit and found 3 quick wins that could get you ranking higher:

1. [Specific finding from their GBP]
2. [Specific finding from their website]
3. [Specific finding from their reviews]

Want me to send you the full audit? It's free, no strings attached.

Just reply "yes" and I'll email it over.

Best,
[Your Name]
[Your Agency]

---

**Why This Works**:
• Specific to their business (not generic)
• Leads with value (free audit)
• Low-pressure ask (just "yes")
• Shows you did your homework`
                }
              ]
            }
          }
        ]
      },
      {
        id: 'module-3',
        title: 'Module 3: Technical Implementation',
        description: 'Step-by-step checklists for delivering results to clients',
        estimatedTime: '3 hours',
        lessons: [
          {
            id: 'lesson-3-1',
            title: 'Google Business Profile Mastery',
            type: 'text',
            duration: '45 min',
            description: '100% completion checklist - your foundation for local SEO success',
            content: {
              sections: [
                {
                  heading: 'Why GBP is Your Secret Weapon',
                  body: `Google Business Profile is the single most important ranking factor for local SEO.

**The Impact**:
• Complete GBPs rank 2.7x higher than incomplete ones
• Businesses with 100+ photos get 520% more calls
• Weekly Google Posts increase discovery by 30%

**The Opportunity**: 70% of local businesses have incomplete GBPs. Easy wins here.`
                },
                {
                  heading: 'GBP 100% Completion Checklist',
                  body: `Complete every field to maximize your rankings. This alone can get you to page 1 in less competitive markets.

**See the full detailed checklist in localSeoKitContent.ts** including:
• Basic Information (Name, Category, Address, Phone, Hours)
• Business Description (750 chars with keywords)
• All Attributes (ownership, payments, accessibility)
• Services List (10-20 specific services with descriptions)
• Photos Strategy (100+ photos minimum)
• Google Posts Schedule (2-3x per week)
• Q&A Pre-Loading (10+ questions answered proactively)
• Booking & Messaging Setup

This lesson provides the complete implementation guide.`
                }
              ]
            }
          },
          {
            id: 'lesson-3-2',
            title: 'Citation Building Step-by-Step',
            type: 'text',
            duration: '40 min',
            description: 'Top 50 sites + submission workflow',
            content: {
              sections: [
                {
                  heading: 'What Are Citations and Why They Matter',
                  body: `Citations are online mentions of your business Name, Address, and Phone (NAP) on other websites.

**Impact on Rankings**:
• Citations are a top 7 local ranking factor
• Consistency across citations builds trust with Google
• More citations = higher local pack rankings

**The Goal**: Get your business listed on 50-100 high-authority directories with 100% consistent NAP information.`
                },
                {
                  heading: 'Top 50 Citation Sites (Priority Order)',
                  body: `**Tier 1: Universal (Everyone Needs These)**
1. Google Business Profile
2. Bing Places
3. Apple Maps
4. Yelp
5. Facebook Business
6. BBB (Better Business Bureau)
7. YellowPages
8. MapQuest
9. Yahoo Local
10. Foursquare

**Tier 2: Data Aggregators (Seeds 50+ other sites)**
11. Neustar Localeze
12. Acxiom
13. Factual
14. Infogroup

**Tier 3: Industry-Specific**
Dentists: Healthgrades, Zocdoc, RateMDs
Lawyers: Avvo, Justia, FindLaw
HVAC: Angi, HomeAdvisor, Porch
Restaurants: OpenTable, TripAdvisor, Zomato

**Submission Process**: See localSeoKitContent.ts for the complete top-50 list with submission links.`
                },
                {
                  heading: 'The NAP Consistency Rule',
                  body: `Your business information MUST be EXACTLY the same everywhere.

**Correct Format**:
Smith Family Dental
123 Main Street, Suite 100
Omaha, NE 68104
(402) 555-1234

**Common Mistakes**:
✗ Smith Family Dental vs. Smith Dental (inconsistent name)
✗ 123 Main St vs. 123 Main Street (inconsistent abbreviation)
✗ 4025551234 vs. (402) 555-1234 (inconsistent phone format)

**Pro Tip**: Use the exact format from your Google Business Profile everywhere else.`
                }
              ]
            }
          },
          {
            id: 'lesson-3-3',
            title: 'Review Generation System Setup',
            type: 'text',
            duration: '35 min',
            description: 'DIY setup guide with Zapier + Twilio',
            content: {
              sections: [
                {
                  heading: 'Why Reviews Matter',
                  body: `**The Power of Reviews**:
• 88% of consumers trust online reviews as much as personal recommendations
• Businesses with 40+ reviews earn 54% more revenue than average
• Reviews account for 15% of local search ranking factors

**The Review Gap Problem**:
Most businesses have happy customers, but less than 5% leave reviews voluntarily. Your competitors are actively asking - you should too.`
                },
                {
                  heading: 'DIY Review Generation System',
                  body: `**The Stack** ($50/month total):
• JotForm ($34/mo) - Collect customer info
• Twilio ($0.0079/SMS) - Send review requests
• Zapier ($19.99/mo) - Automation
• Google Sheets (Free) - Track responses

**5-Step Setup**:
1. Create post-service satisfaction form
2. Set up Zapier to trigger on 4-5 star ratings
3. Send SMS with direct Google Review link
4. Follow up once after 3 days
5. Respond to all reviews within 24 hours

**Best Practices**:
• Only ask happy customers (4-5 stars)
• Ask within 24 hours of service
• Make it one-click easy
• Personalize with their name

See localSeoKitContentPart2.ts for complete step-by-step implementation guide.`
                },
                {
                  heading: 'Premium Software Options',
                  body: `**Birdeye** ($299-499/mo) - Best for multi-location
**Podium** ($289-449/mo) - Best for all-in-one communication
**GatherUp** ($99-199/mo) - Best budget option

**My Recommendation**: Start with DIY. Upgrade to GatherUp or Birdeye once you have 10+ clients.`
                }
              ]
            }
          },
          {
            id: 'lesson-3-4',
            title: 'On-Page SEO Checklist',
            type: 'text',
            duration: '30 min',
            description: 'Optimize 10-15 pages for local keywords',
            content: {
              sections: [
                {
                  heading: 'The 10-Point On-Page SEO Checklist',
                  body: `For each page you optimize:

1. **Title Tag** (60 chars max)
Format: [Service] in [City] | [Business Name]
Example: "Emergency Dental Care in Omaha | Smith Family Dental"

2. **Meta Description** (160 chars max)
Include: Service, city, call-to-action, phone number
Example: "Need emergency dental care in Omaha? Smith Family Dental offers same-day appointments. Call (402) 555-1234"

3. **H1 Header** (One per page)
Include primary keyword + city
Example: "Emergency Dental Care in Omaha, Nebraska"

4. **H2 & H3 Subheadings**
Use variations of main keyword
Examples: "Same-Day Emergency Appointments", "Common Dental Emergencies We Treat"

5. **First Paragraph**
Mention service + city in first 100 words
Example: "If you're experiencing a dental emergency in Omaha..."

6. **Image Alt Text**
All images need descriptive alt text with keywords
Example: "omaha-emergency-dentist-office-front-desk.jpg"

7. **Internal Links**
Link to 3-5 related pages on your site

8. **External Links**
Link out to 1-2 authoritative sources

9. **Schema Markup**
Add LocalBusiness schema with structured data

10. **Call-to-Action**
Clear CTA above the fold with phone number`
                }
              ]
            }
          },
          {
            id: 'lesson-3-5',
            title: 'Local Link Building Tactics',
            type: 'text',
            duration: '25 min',
            description: 'How to get 10-15 quality local backlinks',
            content: {
              sections: [
                {
                  heading: 'The 10 Easiest Local Backlinks',
                  body: `**1. Local Business Associations**
Chamber of Commerce, BNI, trade associations
Difficulty: Easy | Value: High

**2. Local News Features**
Pitch story to local newspaper/news site
Difficulty: Medium | Value: Very High

**3. Sponsor Local Events**
Little League, charity runs, school events
Difficulty: Easy | Value: Medium

**4. Local Business Directories**
City-specific directories, neighborhood guides
Difficulty: Easy | Value: Medium

**5. Partner Websites**
Complementary businesses that serve same customers
Difficulty: Easy | Value: High

**6. Local .edu Links**
Sponsorship, scholarships, guest lectures
Difficulty: Hard | Value: Very High

**7. Local Blogger Outreach**
City lifestyle bloggers, local influencers
Difficulty: Medium | Value: Medium

**8. Guest Posts**
Local business blogs, industry sites
Difficulty: Medium | Value: High

**9. Resource Pages**
Get added to "Best [Service] in [City]" lists
Difficulty: Easy | Value: Medium

**10. Local Supplier Links**
Get listed on vendor/supplier pages
Difficulty: Easy | Value: Low`
                },
                {
                  heading: 'The Outreach Email Template',
                  body: `Subject: Quick partnership idea

Hi [Name],

I'm [Your Name] from [Business Name], a local [service] business here in [City].

I noticed you serve [similar customers/area]. I had an idea that might benefit both of us:

[Specific partnership idea - could be:
• Cross-referral program
• Co-marketing campaign
• Guest blog post exchange
• Sponsor opportunity]

Would you be open to a quick 15-minute call to explore this?

Best,
[Your Name]
[Phone]`
                }
              ]
            }
          },
          {
            id: 'lesson-3-6',
            title: 'Monthly Reporting Templates',
            type: 'text',
            duration: '15 min',
            description: 'Professional reports that showcase your value',
            content: {
              sections: [
                {
                  heading: 'What to Include in Monthly Reports',
                  body: `**Page 1: Executive Summary**
• Key wins this month
• Overall progress toward goals
• Quick stats snapshot

**Page 2: Rankings**
• Keyword rankings table (current vs. last month)
• Page 1 keywords count
• Biggest ranking improvements

**Page 3: Reviews & Reputation**
• New reviews this month
• Average rating
• Review comparison to competitors

**Page 4: Traffic & Engagement**
• Website visitors (organic)
• GBP views and actions
• Phone calls and direction requests

**Page 5: Work Completed**
• Citations built
• Content published
• Links acquired
• GBP posts created

**Page 6: Next Month's Plan**
• Goals for next 30 days
• Upcoming initiatives
• Action items for client`
                },
                {
                  heading: 'Pro Tips for Great Reports',
                  body: `• Use charts and graphs (not just numbers)
• Show comparisons (this month vs. last month)
• Highlight wins with green arrows
• Include screenshots of actual rankings
• Add a video walkthrough (5 min Loom)
• Send on the same day each month
• Include clear next steps
• Make it scannable (busy clients won't read walls of text)`
                }
              ]
            }
          }
        ]
      },
      {
        id: 'module-4',
        title: 'Module 4: Vendor Relationships',
        description: 'Find and negotiate with white-label providers',
        estimatedTime: '1.5 hours',
        lessons: [
          {
            id: 'lesson-4-1',
            title: 'Choosing White-Label Partners',
            type: 'text',
            duration: '25 min',
            description: 'Comparison of 5 vetted providers with pros/cons',
            content: {
              sections: [
                {
                  heading: 'Build vs. Buy: The Decision Matrix',
                  body: `**When to Build In-House**:
• You have 10+ clients (economics make sense)
• You have time to learn/manage execution
• You want maximum profit margins (60-70%)
• You're technical and enjoy the work

**When to Use White-Label**:
• You're just starting out (0-10 clients)
• You want to focus on sales and client management
• You need proven processes immediately
• You want to scale fast without hiring

**The Hybrid Model** (Recommended):
Start with white-label, transition to hybrid as you grow:
• Months 1-6: 100% white-label
• Months 7-12: Move simple tasks in-house (GBP, reviews)
• Year 2+: Keep complex work outsourced (content, links)`
                },
                {
                  heading: 'Top 5 White-Label SEO Providers',
                  body: `**1. SEO Reseller**
Pricing: $500-1,500/client/month
Services: Full-service local SEO
Pros: Established, good reporting, US-based
Cons: Higher prices, minimum commitments
Best For: Agencies with $2,000+ client pricing

**2. Boostability**
Pricing: $300-800/client/month
Services: Local SEO, citations, content
Pros: Affordable, scalable, good support
Cons: Sometimes slow turnaround
Best For: Agencies with $1,000-1,500 pricing

**3. Victorious SEO**
Pricing: $400-1,000/client/month
Services: Local + national SEO
Pros: Data-driven, transparent reporting
Cons: Pricey for local-only
Best For: Hybrid local/national clients

**4. Semify**
Pricing: $300-700/client/month
Services: Citations, content, links
Pros: A la carte pricing, flexible
Cons: You manage the strategy
Best For: Agencies that want control

**5. DashClicks**
Pricing: $250-600/client/month
Services: Full-service, includes CRM
Pros: All-in-one platform, white-label CRM
Cons: Learning curve on platform
Best For: New agencies wanting turnkey solution`
                }
              ]
            }
          },
          {
            id: 'lesson-4-2',
            title: 'Negotiation Scripts & Tactics',
            type: 'text',
            duration: '30 min',
            description: 'Get volume pricing before you have volume',
            content: {
              sections: [
                {
                  heading: 'How to Get Volume Pricing (Even With 1 Client)',
                  body: `**The Strategy**: Project future volume to negotiate better rates upfront.

**The Script**:

"Hi [Vendor Name],

I'm launching a local SEO agency focused on [niche]. I'm starting with 2-3 clients, but my goal is 20+ clients within 12 months.

I'd like to start with your service, but I need pricing that makes sense as I scale. What are your volume tiers?

[They'll quote tiers: 1-5 clients, 6-10, 11-20, etc.]

Okay, here's what I'm thinking: I'll commit to 12 months, and you give me the 11-20 client pricing tier from day one. As I add clients, I'm locked in at that rate.

This way you get a long-term partner, and I have runway to grow profitably. Fair?"

**Why This Works**: Vendors want long-term relationships and hate churn. Trading commitment for pricing is a win-win.`
                },
                {
                  heading: '5 Negotiation Tactics That Work',
                  body: `**Tactic #1: The Bundle**
"If I sign up for both local SEO and content services, can you do $X for the package?"

**Tactic #2: The Prepay**
"If I pay for 6 months upfront, what discount can you offer?"

**Tactic #3: The Test**
"Let me test your service with 1 client for 90 days at your volume rate. If I'm happy, I'll send you all my clients."

**Tactic #4: The Competitor**
"[Competitor] quoted me $X. Can you match or beat that?"

**Tactic #5: The Walking Away**
"I love your service, but the numbers don't work at that price. Let me know if anything changes." [Then wait 3 days for their counter-offer]`
                }
              ]
            }
          },
          {
            id: 'lesson-4-3',
            title: 'Quality Control Process',
            type: 'text',
            duration: '20 min',
            description: 'Test vendors before committing',
            content: {
              sections: [
                {
                  heading: 'The 30-Day Vendor Vetting Process',
                  body: `**Week 1: Test Project**
Give them a small test project (1 client or demo site)
Look for: Speed, communication, quality

**Week 2: Review Deliverables**
Check work against your standards
Look for: Attention to detail, accuracy, completeness

**Week 3: Client Feedback Simulation**
Ask for revisions as if you were a demanding client
Look for: Responsiveness, willingness to revise

**Week 4: Pricing & Terms Negotiation**
Now that you've seen their work, negotiate pricing
Look for: Flexibility, long-term viability

**Red Flags**:
✗ Slow response times (24+ hours)
✗ Generic, template-driven work
✗ Unwilling to revise
✗ Overpromising results
✗ No clear process documentation

**Green Flags**:
✓ Fast response (within 4 hours)
✓ Customized, thoughtful work
✓ Proactive communication
✓ Clear reporting dashboards
✓ Willingness to collaborate`
                }
              ]
            }
          },
          {
            id: 'lesson-4-4',
            title: 'Build vs. Buy Decision Framework',
            type: 'text',
            duration: '15 min',
            description: 'When to outsource vs. do in-house',
            content: {
              sections: [
                {
                  heading: 'The Break-Even Analysis',
                  body: `**Example: Content Creation**

White-Label Cost: $150/article
In-House Cost: $25/hour writer × 2 hours = $50/article

Break-even: 3 articles per month

If you need <3 articles/month → Use white-label
If you need >3 articles/month → Hire in-house

**Apply This Formula to Every Service**:

1. Calculate white-label cost per unit
2. Calculate in-house cost (salary + tools + management time)
3. Divide in-house fixed costs by per-unit savings
4. That's your break-even volume`
                },
                {
                  heading: 'Task-by-Task Decision Matrix',
                  body: `**Always Outsource (Low Volume, High Complexity)**:
• Web design
• Custom development
• High-end link building
• PR and media outreach

**Bring In-House First (High Volume, Low Complexity)**:
• GBP management
• Review monitoring
• Client reporting
• Social media posts

**Hybrid Approach (Medium Complexity)**:
• Content: Outsource writing, edit in-house
• Link building: Buy tools, do outreach in-house
• Citations: Use automation + manual verification

**The 70% Rule**: If you're at 70% capacity on a task, it's time to bring it in-house or hire for it.`
                }
              ]
            }
          }
        ]
      },
      {
        id: 'module-5',
        title: 'Module 5: Niche Specialization',
        description: 'Customize your approach for high-value verticals',
        estimatedTime: '1 hour',
        lessons: [
          {
            id: 'lesson-5-1',
            title: 'Dental Practice Marketing',
            type: 'text',
            duration: '20 min',
            description: 'Pain points, keywords, pricing for dentists',
            content: {
              sections: [
                {
                  heading: 'Why Dentists Are Perfect Clients',
                  body: `**The Numbers**:
• Average new patient value: $2,000-5,000 lifetime
• High search volume (everyone needs a dentist)
• Low SEO competition in most markets
• Recurring revenue (6-month checkups)

**Their Pain Points**:
1. Empty chair time (underbooked schedule)
2. Too many insurance patients, not enough cash-pay cosmetic cases
3. Difficulty attracting families vs. just individuals
4. Competition from corporate chains (Aspen Dental)

**What They'll Pay**: $1,200-2,500/month for serious practices`
                },
                {
                  heading: 'High-Value Keywords for Dentists',
                  body: `**Emergency/High-Intent** (These convert at 30%+):
• "emergency dentist near me"
• "same day dentist [city]"
• "toothache relief [city]"
• "walk-in dentist [city]"

**Cosmetic** (High-Ticket Services):
• "teeth whitening [city]"
• "dental implants [city]"
• "invisalign [city]"
• "veneers [city]"

**General** (Volume Keywords):
• "dentist near me"
• "family dentist [city]"
• "pediatric dentist [city]"
• "dental cleaning [city]"

**Pro Tip**: Focus on "dentist near me" and emergency terms first. These drive immediate revenue.`
                },
                {
                  heading: 'Dental-Specific Sales Script Modifications',
                  body: `**Discovery Questions**:
"What's your average new patient value?"
"How many new patients do you need per month to be fully booked?"
"What percentage of your patients are cosmetic vs. general care?"
"Do you take most insurances, or are you moving toward cash-pay?"

**ROI Pitch**:
"Let's say we get you 10 new patients per month from local search. At $2,000 average lifetime value, that's $20,000 in new revenue. Our service is $1,497/month. That's a 13x ROI. Even if we only get you 3-4 new patients, you're profitable."`
                }
              ]
            }
          },
          {
            id: 'lesson-5-2',
            title: 'Legal/PI Attorney Strategy',
            type: 'text',
            duration: '20 min',
            description: 'Content strategy for competitive legal markets',
            content: {
              sections: [
                {
                  heading: 'Legal SEO: High Risk, High Reward',
                  body: `**The Opportunity**:
• Average case value: $5,000-50,000+
• One client can pay for a year of SEO
• Lawyers understand ROI and track everything
• Will pay premium pricing ($2,500-5,000/month)

**The Challenges**:
• EXTREMELY competitive (everyone wants these clients)
• High expectations and demanding clients
• Compliance rules (bar association advertising rules)
• Long sales cycles (4-8 weeks to close)

**Best For**: Experienced agencies that can deliver and handle demanding clients`
                },
                {
                  heading: 'The Content Strategy for Lawyers',
                  body: `Legal SEO requires MASSIVE amounts of content to compete.

**Minimum Content Requirements**:
• Practice area pages (10-20 pages)
• "Ultimate guides" for each practice area
• City/neighborhood pages (if serving multiple areas)
• FAQ pages (50+ common questions)
• Case results (with disclaimers)
• Attorney bio pages (detailed, authoritative)

**Content Volume**: Budget for 8-12 articles per month minimum

**Content Topics That Rank**:
• "What to do after [type of accident] in [city]"
• "How much is my [type of case] worth?"
• "[City] [practice area] lawyer near me"
• "Do I need a lawyer for [situation]?"`
                },
                {
                  heading: 'Pricing for Legal Clients',
                  body: `**Starter Package**: $2,500/month
• For solo practitioners or new firms
• Basic local SEO + 4 articles/month

**Growth Package**: $4,000/month
• For established firms with 2-5 attorneys
• Aggressive SEO + 8 articles/month + PR

**Enterprise Package**: $7,500+/month
• For large firms with multiple locations
• Full-service + content + PPC management

**The Close**: "One personal injury case pays for 6-12 months of our service. If we get you 2-3 cases per year from SEO, this is the best investment you'll make."`
                }
              ]
            }
          },
          {
            id: 'lesson-5-3',
            title: 'HVAC Contractor Playbook',
            type: 'text',
            duration: '20 min',
            description: 'Seasonality management and emergency rankings',
            content: {
              sections: [
                {
                  heading: 'Why HVAC is the Perfect Local SEO Niche',
                  body: `**The Opportunity**:
• High-ticket services ($5,000-15,000 for replacements)
• Emergency calls = immediate revenue
• Year-round demand (heating + cooling)
• Low digital sophistication (easy to outrank)

**Typical HVAC Company Stats**:
• Service call: $150-300
• Repair: $500-2,000
• Replacement: $5,000-15,000
• Maintenance contract: $200-500/year

**What They'll Pay**: $1,000-2,000/month`
                },
                {
                  heading: 'The Emergency Keywords Strategy',
                  body: `**Emergency Keywords** (Highest Intent, Best ROI):
• "AC repair near me"
• "furnace repair [city]"
• "no heat emergency"
• "AC not working [city]"
• "24 hour HVAC [city]"

**Replacement Keywords** (Highest Value):
• "AC replacement [city]"
• "new furnace cost"
• "HVAC installation [city]"
• "best AC unit for [city]"

**Seasonal Strategy**:
**Winter (Nov-Mar)**: Focus on heating keywords
**Summer (May-Sep)**: Focus on cooling keywords
**Spring/Fall**: Focus on maintenance and tune-ups

**Pro Tip**: Get emergency keywords ranking BEFORE peak season hits.`
                },
                {
                  heading: 'Managing Seasonality',
                  body: `**The Problem**: HVAC demand spikes in summer (cooling) and winter (heating), but drops in spring/fall.

**The Solution**: Adjust SEO strategy by season.

**February-April** (Prepare for Cooling Season):
• Ramp up content about AC
• Optimize for cooling keywords
• Generate spring tune-up reviews
• Create summer promotion posts

**August-October** (Prepare for Heating Season):
• Shift content to furnace/heating
• Optimize for heating keywords
• Generate fall tune-up reviews
• Create winter readiness content

**Year-Round**:
• Focus on "HVAC near me" (always valuable)
• Push maintenance contracts (steady revenue)
• Build reviews constantly (5-10/month minimum)`
                }
              ]
            }
          }
        ]
      },
      {
        id: 'module-6',
        title: 'Module 6: Scaling to $10k/Month',
        description: 'Systems and strategies for predictable growth',
        estimatedTime: '1.5 hours',
        lessons: [
          {
            id: 'lesson-6-1',
            title: 'Client Mix Strategy',
            type: 'text',
            duration: '20 min',
            description: 'Calculator showing path to $10k MRR',
            content: {
              sections: [
                {
                  heading: 'The Path to $10k/Month',
                  body: `**Option 1: All Growth Clients** ($1,497/mo each)
7 clients = $10,479/month

Pros: Simpler to manage, consistent service level
Cons: Harder to close $1,500/mo deals

**Option 2: Mixed Portfolio** (RECOMMENDED)
• 5 Foundation clients @ $997 = $4,985
• 3 Growth clients @ $1,497 = $4,491
• 1 Domination client @ $2,497 = $2,497
= $11,973/month

Pros: Easier to acquire Foundation clients, upsell path
Cons: More service tiers to manage

**Option 3: High-Ticket Only**
4 Domination clients @ $2,497 = $9,988/month

Pros: Fewer clients, higher revenue per client
Cons: Longer sales cycles, higher expectations`
                },
                {
                  heading: '90-Day Action Plan to First $10k',
                  body: `**Month 1: Get to $3k MRR**
Goal: Sign 3 Foundation clients @ $997
Actions:
• Prospect 150 businesses
• Book 15 discovery calls
• Close 3 clients (20% close rate)

**Month 2: Get to $6k MRR**
Goal: Add 2 Growth clients + 1 Foundation
Actions:
• Leverage testimonials from Month 1 clients
• Increase pricing confidence
• Prospect 100 more businesses
• Close 3 more clients

**Month 3: Get to $10k MRR**
Goal: Add 1 Domination + 2 Growth clients
Actions:
• Refine messaging based on what's working
• Focus on referrals from existing clients
• Upsell Foundation clients to Growth
• Close 3-4 more clients

**Total Activity Required**:
• 400+ prospects contacted
• 40-50 discovery calls
• 10-12 clients closed
• 2-3 clients upsold`
                }
              ]
            }
          },
          {
            id: 'lesson-6-2',
            title: 'Hiring & Team Building',
            type: 'text',
            duration: '25 min',
            description: 'When and how to hire your first team member',
            content: {
              sections: [
                {
                  heading: 'When to Hire Your First Team Member',
                  body: `**The Rule**: Hire when you're at 80% capacity AND have 3 months runway.

**Capacity Check**:
✗ Working 50+ hours/week consistently
✗ Turning down new clients due to time
✗ Dropping balls on current client work
✗ No time for sales/business development

**Financial Check**:
✓ $15k+ MRR for 3 consecutive months
✓ 90%+ client retention
✓ $25k+ in business savings
✓ Profitable margins (40%+ after white-label costs)

**Don't Hire Too Early**: Many agencies hire at $5k MRR and go broke paying salaries.`
                },
                {
                  heading: 'Hire #1: Client Success Manager',
                  body: `**Why This Role First**:
Frees you up to sell (your highest-value activity)

**Responsibilities**:
• Monthly client reporting
• Client communication and updates
• Review monitoring and responses
• GBP management
• Client onboarding

**Where to Find**:
• Upwork/Fiverr (start part-time)
• Local college students (marketing majors)
• Facebook groups ("Virtual Assistant" groups)

**What to Pay**:
• Part-time: $15-20/hour (10-20 hours/week)
• Full-time: $35-45k/year + commission

**Red Flags in Hiring**:
✗ No previous agency/client experience
✗ Poor communication skills
✗ Not self-directed
✗ No attention to detail`
                },
                {
                  heading: 'Hire #2 & Beyond',
                  body: `**At $25k MRR: Hire SEO Specialist**
Take over technical execution, let you focus on strategy

**At $50k MRR: Hire Sales Rep**
Handle lead qualification and discovery calls

**At $75k MRR: Hire Content Manager**
Manage all content creation and editorial calendar

**At $100k MRR: Hire Operations Manager**
Run the entire business while you focus on growth

**The Golden Rule**: Each hire should free up 20+ hours of your time per week.`
                }
              ]
            }
          },
          {
            id: 'lesson-6-3',
            title: 'Systematizing Delivery',
            type: 'text',
            duration: '20 min',
            description: 'SOPs and automation for scaling',
            content: {
              sections: [
                {
                  heading: 'The SOP Framework',
                  body: `Create SOPs (Standard Operating Procedures) for everything you do more than once.

**Critical SOPs You Need**:
1. Client Onboarding (Day 1 through Month 1)
2. Monthly Reporting Process
3. Review Generation Workflow
4. GBP Optimization Checklist
5. Citation Submission Process
6. Content Creation Brief Template
7. Client Communication Schedule
8. Offboarding Process

**Format for SOPs**:
• Use Loom videos (5-10 min each)
• Create written checklists in Notion/Google Docs
• Include templates and examples
• Update quarterly based on what works`
                },
                {
                  heading: 'Automation Stack for Scaling',
                  body: `**Client Management**:
• HubSpot or Pipedrive (CRM)
• Dubsado or Honeybook (onboarding/contracts)
• Stripe (billing and subscriptions)

**Reporting**:
• AgencyAnalytics or DashThis (automated reports)
• Google Data Studio (custom dashboards)
• Rank tracking software (SEMrush, Ahrefs)

**Review Management**:
• GatherUp or Birdeye (automated requests)
• Zapier (review alerts and workflows)

**Communication**:
• Front or Help Scout (team inbox)
• Slack (internal team communication)
• Calendly (meeting scheduling)

**Project Management**:
• ClickUp or Monday.com (task tracking)
• Notion (knowledge base and SOPs)

**Total Monthly Cost**: $300-500 for full automation stack`
                },
                {
                  heading: 'The 90% Rule',
                  body: `If you can document a process so it's 90% clear, someone else can do it.

Don't wait for perfection. Create rough SOPs and improve them as you go.

**Process**:
1. Record yourself doing the task (Loom)
2. Create quick bullet-point checklist
3. Have team member follow it and give feedback
4. Update SOP based on their questions
5. Repeat until it works smoothly

**Goal**: Remove yourself as the bottleneck in every process.`
                }
              ]
            }
          },
          {
            id: 'lesson-6-4',
            title: 'Retention & Upselling',
            type: 'text',
            duration: '20 min',
            description: 'Keep clients longer and increase their value',
            content: {
              sections: [
                {
                  heading: 'Why Retention Matters More Than Acquisition',
                  body: `**The Math**:
• It costs 5x more to acquire a new client than keep an existing one
• 5% increase in retention = 25-95% increase in profits
• Average agency client LTV with 80% retention: $18,000
• Average agency client LTV with 95% retention: $36,000

**Industry Benchmarks**:
• Poor retention: 70% annual retention (2.5% monthly churn)
• Average retention: 80% annual retention (1.9% monthly churn)
• Excellent retention: 90% annual retention (0.9% monthly churn)

**Your Goal**: 85%+ annual retention = 1.3% monthly churn`
                },
                {
                  heading: 'The 7 Retention Tactics That Work',
                  body: `**1. Proactive Communication**
Don't wait for them to ask for updates. Send weekly quick wins.

**2. Quarterly Business Reviews**
Schedule 30-min calls to review progress and plan next quarter.

**3. Show Competitive Analysis**
"Here's where you rank vs. your top 3 competitors..."

**4. Celebrate Wins**
When they hit page 1, send a gift or bonus report.

**5. Ask for Feedback**
Quarterly NPS surveys: "How likely are you to recommend us?"

**6. Provide Extra Value**
Send industry reports, invite to webinars, share tips.

**7. Make Cancellation Painful**
"If you cancel, you'll lose all these rankings we built..."`
                },
                {
                  heading: 'The Upsell Framework',
                  body: `**When to Upsell**: After 90 days of proven results

**Upsell Opportunities**:
• Foundation → Growth ($500/mo increase)
• Growth → Domination ($1,000/mo increase)
• Add PPC management (+$500-1,000/mo)
• Add social media (+$500/mo)
• Add second location (+50% of package price)

**The Upsell Script**:

"[Client], I've been looking at your results. You're now ranking on page 1 for 8 keywords, and your calls are up 40%. Congrats!

Here's what I'm thinking: There are 5-6 more high-value keywords we haven't targeted yet. If we moved you to the Growth package, we could go after those and potentially double your lead volume.

The upgrade is $500/month more. Based on your current conversion rate, that should generate an additional 8-10 leads per month. At your average customer value, that's $[X] in revenue.

Want me to put together a plan for what that would look like?"

**Success Rate**: 30-40% of clients will upgrade after seeing initial results.`
                }
              ]
            }
          },
          {
            id: 'lesson-6-5',
            title: 'Your 90-Day Growth Plan',
            type: 'checklist',
            duration: '15 min',
            description: 'Actionable roadmap from 0 to $10k/month',
            content: {
              tasks: [
                {
                  day: 'Month 1: Foundation ($0 → $3k MRR)',
                  items: [
                    'Set up business entity (LLC) and business bank account',
                    'Create basic 1-page website with services and pricing',
                    'Customize the 12-page proposal template for your niche',
                    'Build list of 200 prospects in your target niche',
                    'Send 100 cold emails using the templates',
                    'Book 10-15 discovery calls',
                    'Close 3 Foundation clients ($997 each = $2,991 MRR)',
                    'Set up white-label provider relationship',
                    'Onboard first 3 clients and deliver Month 1 work'
                  ]
                },
                {
                  day: 'Month 2: Growth ($3k → $6k MRR)',
                  items: [
                    'Get testimonials from Month 1 clients',
                    'Add testimonials to website and proposal',
                    'Prospect 150 more businesses (now with social proof)',
                    'Book 12-15 more discovery calls',
                    'Close 2 Growth clients + 1 Foundation ($4,491 more = $7,482 MRR total)',
                    'Deliver Month 1 work for new clients',
                    'Send Month 2 reports to original clients',
                    'Start tracking key metrics (MRR, churn, CAC)',
                    'Document your first SOPs (onboarding, reporting)'
                  ]
                },
                {
                  day: 'Month 3: Scale ($6k → $10k+ MRR)',
                  items: [
                    'Analyze what is working (which niche, which package, which outreach)',
                    'Double down on what works',
                    'Prospect 100 more businesses using proven approach',
                    'Ask existing clients for referrals',
                    'Book 10-15 more discovery calls',
                    'Close 1 Domination + 2 Growth clients ($6,491 more = $13,973 MRR total)',
                    'Upsell 1-2 Foundation clients to Growth tier',
                    'Hire part-time Client Success Manager (if at capacity)',
                    'Celebrate hitting $10k+ MRR!'
                  ]
                },
                {
                  day: 'Month 4+: Optimization',
                  items: [
                    'Focus on retention (goal: <2% monthly churn)',
                    'Systematize delivery with SOPs and automation',
                    'Build referral program (incentivize client referrals)',
                    'Continue prospecting 50-100 businesses per month',
                    'Upsell existing clients to higher tiers',
                    'Plan first hire when consistently above $15k MRR',
                    'Build systems to scale to $25k, $50k, $100k MRR'
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 2. Reputation Engine Kit
  'kit-reputation': {
    kitId: 'kit-reputation',
    title: 'Reputation Engine Kit - Complete Review Management System',
    description: 'Build a profitable reputation management agency. Get clients to 50+ reviews in 90 days with automated systems.',
    totalDuration: '4-6 hours',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1: Reputation Management Fundamentals',
        description: 'Understanding the review economy and why businesses need you',
        estimatedTime: '1 hour',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'The Review Economy',
            type: 'text',
            duration: '15 min',
            description: 'Why online reviews are the new word-of-mouth',
            content: {
              sections: [
                {
                  heading: 'The Power of Reviews',
                  body: `88% of consumers trust online reviews as much as personal recommendations. Businesses with 50+ reviews earn 54% more revenue than average.

**The Market Opportunity:**
• Most local businesses have fewer than 10 reviews
• They know they need more but don't have systems
• Average client pays $500-1,500/month for review management
• Low churn because results are visible and measurable

**Your Value Proposition:**
You help businesses get more reviews, respond to all feedback, and protect their online reputation. Simple, measurable, and highly valuable.`
                }
              ]
            }
          },
          {
            id: 'lesson-1-2',
            title: 'Review Generation Systems',
            type: 'text',
            duration: '20 min',
            description: 'Automated systems that generate 10-20 reviews per month',
            content: {
              sections: [
                {
                  heading: 'The 3-Step Review System',
                  body: `**Step 1: Satisfaction Filter**
After service, send quick survey: "How was your experience? 1-5 stars"

**Step 2: Smart Routing**
• 4-5 stars → Send to Google/Facebook review
• 1-3 stars → Send to private feedback form

**Step 3: Automated Follow-up**
If no response in 3 days, send reminder (once only)

**Tools You Need:**
• Podium ($289/mo) - All-in-one solution
• Birdeye ($299/mo) - Best for multi-location
• DIY Stack: JotForm + Zapier + Twilio ($50/mo)`
                }
              ]
            }
          },
          {
            id: 'lesson-1-3',
            title: 'Pricing Your Services',
            type: 'text',
            duration: '15 min',
            description: 'How to price reputation management profitably',
            content: {
              sections: [
                {
                  heading: 'Pricing Tiers',
                  body: `**Starter Package - $497/month**
• Review generation system setup
• Monitor 2 platforms (Google + Facebook)
• Respond to all reviews (templated responses)
• Monthly review report

**Growth Package - $797/month** (Most Popular)
• Everything in Starter
• Monitor 5 platforms
• Custom review responses
• Review widget for website
• Quarterly reputation audit

**Enterprise - $1,297/month**
• Everything in Growth
• Multi-location support (up to 5 locations)
• Crisis management (negative review suppression)
• Competitor benchmarking
• Dedicated account manager`
                }
              ]
            }
          },
          {
            id: 'lesson-1-4',
            title: 'Your First Week Action Plan',
            type: 'checklist',
            duration: '10 min',
            description: 'Step-by-step launch checklist',
            content: {
              tasks: [
                {
                  day: 'Week 1',
                  items: [
                    'Set up business entity and branding',
                    'Create 1-page website with pricing',
                    'Sign up for review software trial',
                    'Build list of 100 target businesses with <20 reviews',
                    'Create cold email template offering free audit',
                    'Send 25 cold emails daily',
                    'Book 3-5 discovery calls',
                    'Close your first client'
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 3. Google Ads Cash Machine Kit
  'kit-google-ads': {
    kitId: 'kit-google-ads',
    title: 'Google Ads Cash Machine Kit - Local PPC Agency System',
    description: 'Launch a profitable Google Ads agency for local businesses. Pre-built campaigns, scripts, and systems.',
    totalDuration: '5-7 hours',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1: Google Ads Agency Foundations',
        description: 'Why local PPC is perfect for new agencies',
        estimatedTime: '1.5 hours',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'The Local PPC Opportunity',
            type: 'text',
            duration: '15 min',
            description: 'Why local businesses need Google Ads management',
            content: {
              sections: [
                {
                  heading: 'Why Local Google Ads?',
                  body: `**The Problem:** Most local businesses waste 40-60% of their Google Ads budget on:
• Wrong keywords
• Poor targeting
• No call tracking
• Generic landing pages

**Your Solution:** Hyper-targeted local campaigns that:
• Only show ads within service area
• Use call-only ads for immediate leads
• Track every phone call
• Optimize for actual conversions (not just clicks)

**The Economics:**
• Charge: $1,000-2,500/month management fee
• Client spends: $2,000-5,000/month on ads
• Your cost: $200-400/month (white-label setup)
• Your margin: $600-2,100 per client`
                }
              ]
            }
          },
          {
            id: 'lesson-1-2',
            title: 'Campaign Templates',
            type: 'text',
            duration: '25 min',
            description: 'Pre-built campaigns for common industries',
            content: {
              sections: [
                {
                  heading: 'Plug-and-Play Campaigns',
                  body: `**HVAC Campaign Structure:**
• Emergency Services (24/7 calls)
• Installations (high-value conversions)
• Maintenance (recurring revenue)

**Dental Campaign Structure:**
• Emergency dental care
• Cosmetic procedures (veneers, whitening)
• General dentistry (cleanings, checkups)

**Legal Campaign Structure:**
• Practice area specific (DUI, Personal Injury, etc.)
• Emergency consultation ads
• Case evaluation campaigns

Each template includes:
✓ 20-30 optimized keywords
✓ Ad copy variations (A/B test ready)
✓ Negative keyword lists
✓ Bid strategies
✓ Call tracking setup`
                }
              ]
            }
          },
          {
            id: 'lesson-1-3',
            title: 'Sales Process for PPC',
            type: 'text',
            duration: '20 min',
            description: 'How to sell Google Ads management',
            content: {
              sections: [
                {
                  heading: 'The PPC Sales Script',
                  body: `**Discovery Questions:**
1. "What's your average customer worth?" (Calculate ROI)
2. "Have you tried Google Ads before?" (Overcome past objections)
3. "How many new customers do you need per month?" (Set expectations)
4. "What's your monthly marketing budget?" (Qualify them)

**The Pitch:**
"We'll set up Google Ads campaigns that only show to people in your service area who are actively searching for your services RIGHT NOW. We track every call, every form fill, so you know exactly what's working.

Most clients see 10-15 qualified leads in the first month. At your average customer value of $[X], that's $[Y] in revenue for a $[Z] investment. Break-even in week 2-3."

**Pricing:**
• Setup fee: $1,500 (one-time)
• Management: 15% of ad spend (minimum $1,000/month)
• Or flat rate: $1,500-2,500/month`
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 4. Agency OS Launch Kit
  'kit-agency-os': {
    kitId: 'kit-agency-os',
    title: 'Agency OS Launch Kit - Complete Operations System',
    description: 'All the systems, SOPs, and automation to run a profitable agency without chaos.',
    totalDuration: '6-8 hours',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1: Agency Operations Framework',
        description: 'Build systems that scale',
        estimatedTime: '2 hours',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'The 5 Systems Every Agency Needs',
            type: 'text',
            duration: '20 min',
            description: 'Core operational systems for agency success',
            content: {
              sections: [
                {
                  heading: 'The 5 Core Systems',
                  body: `**1. Client Onboarding System**
New client → Intake form → Kickoff call → Access setup → First deliverable
Timeline: 7 days

**2. Delivery System**
Task creation → Assignment → Execution → QA → Client delivery
Timeline: Per service

**3. Communication System**
Client portal + Weekly updates + Monthly reports + Quarterly reviews
Frequency: Automated

**4. Billing System**
Automated invoicing + Payment reminders + Failed payment handling
Timeline: Monthly

**5. Offboarding System**
Exit interview + Asset transfer + Cancellation confirmation + Win-back sequence
Timeline: 30 days

**Your Goal:** Zero manual work. Every system runs on autopilot.`
                }
              ]
            }
          },
          {
            id: 'lesson-1-2',
            title: 'Tools Stack',
            type: 'text',
            duration: '25 min',
            description: 'The exact software stack for agencies under $50k/month',
            content: {
              sections: [
                {
                  heading: 'Recommended Agency Stack',
                  body: `**CRM & Sales:** HubSpot or Pipedrive ($50-90/mo)
**Project Management:** ClickUp or Monday.com ($10-25/mo)
**Client Portal:** Copilot or Moxie ($40-100/mo)
**Proposals & Contracts:** PandaDoc or Proposify ($49/mo)
**Billing:** Stripe Billing (2.9% + 30¢ per transaction)
**Communication:** Front or Help Scout ($19-50/mo)
**Reporting:** AgencyAnalytics or DashThis ($49-149/mo)
**Time Tracking:** Toggl or Harvest ($10-20/mo)

**Total Monthly Cost:** $200-450/mo
**ROI:** Saves 20+ hours/week of manual work`
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 5. Authority Builder Kit
  'kit-authority': {
    kitId: 'kit-authority',
    title: 'Authority Builder Kit - Personal Brand & Thought Leadership',
    description: 'Position yourself as the go-to expert in your niche. Content systems, speaking opportunities, and PR.',
    totalDuration: '4-5 hours',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1: Authority Positioning',
        description: 'How to become the recognized expert',
        estimatedTime: '1.5 hours',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'The Authority Advantage',
            type: 'text',
            duration: '15 min',
            description: 'Why authority beats advertising',
            content: {
              sections: [
                {
                  heading: 'Authority = Higher Prices + Inbound Leads',
                  body: `**The Authority Effect:**
When you're seen as THE expert in your niche:
• Clients come to you (no cold outreach)
• Price objections disappear
• Close rates jump to 60-80%
• Referrals happen automatically

**How to Build Authority:**
1. Choose a micro-niche ("SEO for dentists" not "marketing")
2. Publish 100 pieces of content (LinkedIn, YouTube, blog)
3. Speak at 10 industry events
4. Get featured in 5 industry publications
5. Create 1 signature framework

**Timeline:** 6-12 months of consistent effort`
                }
              ]
            }
          },
          {
            id: 'lesson-1-2',
            title: 'Content System',
            type: 'text',
            duration: '25 min',
            description: 'Produce content at scale without burnout',
            content: {
              sections: [
                {
                  heading: 'The 3-2-1 Content System',
                  body: `**Every Week, Create:**
• 3 LinkedIn posts (Monday, Wednesday, Friday)
• 2 long-form pieces (blog post + YouTube video)
• 1 lead magnet (checklist, template, guide)

**Repurpose Everything:**
1 YouTube video → Blog post → 5 LinkedIn posts → Email newsletter → Twitter thread

**Batch Your Creation:**
• Film 4 videos in one session (monthly)
• Write 8 blog posts in one day (monthly)
• Schedule 30 days of LinkedIn posts (monthly)

**Total Time:** 8 hours/month (2 hours/week)`
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 6. AI Agent Studio Kit
  'kit-ai-agent': {
    kitId: 'kit-ai-agent',
    title: 'AI Agent Studio Kit - Build & Sell AI Automation',
    description: 'Launch an AI automation agency. Pre-built agents, no-code tools, and client-ready demos.',
    totalDuration: '5-7 hours',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1: AI Agency Foundations',
        description: 'Understanding the AI services market',
        estimatedTime: '1.5 hours',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'The AI Opportunity for Agencies',
            type: 'text',
            duration: '15 min',
            description: 'Why every business needs AI automation',
            content: {
              sections: [
                {
                  heading: 'AI as a Service',
                  body: `**The Market:**
• SMBs are terrified of AI (but know they need it)
• They don't have technical staff to build solutions
• They'll pay premium for "done for you" AI

**Most Profitable AI Services:**
1. AI chatbots for customer service ($500-2,000/mo)
2. AI lead qualification ($1,000-3,000/mo)
3. AI content generation systems ($800-1,500/mo)
4. AI data entry/processing ($1,500-5,000/mo)

**Your Advantage:** You don't need to code. Use no-code tools like Voiceflow, Zapier, Make.com.`
                }
              ]
            }
          },
          {
            id: 'lesson-1-2',
            title: 'Pre-Built AI Agents',
            type: 'text',
            duration: '30 min',
            description: 'Ready-to-deploy AI solutions',
            content: {
              sections: [
                {
                  heading: '10 Client-Ready AI Agents',
                  body: `**1. Lead Qualifier Bot**
Asks questions, scores leads, books qualified prospects only

**2. Customer Support Agent**
Answers FAQs, escalates complex issues, 24/7 availability

**3. Appointment Scheduler**
Checks calendar availability, books appointments, sends reminders

**4. Review Response Generator**
Responds to all reviews with custom, branded messages

**5. Email Inbox Sorter**
Categorizes emails, flags urgent items, drafts responses

All templates included with step-by-step setup guides.`
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 7. Instant Traffic Kit
  'kit-ppc-traffic': {
    kitId: 'kit-ppc-traffic',
    title: 'Instant Traffic Kit - Multi-Channel Paid Acquisition',
    description: 'Master paid traffic across Google, Facebook, and YouTube. Campaign templates and media buying systems.',
    totalDuration: '6-8 hours',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1: Paid Traffic Fundamentals',
        description: 'The economics of profitable paid acquisition',
        estimatedTime: '2 hours',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'Unit Economics of Paid Traffic',
            type: 'text',
            duration: '20 min',
            description: 'How to profitably buy traffic',
            content: {
              sections: [
                {
                  heading: 'The Math That Matters',
                  body: `**Key Metrics:**
• CPC (Cost Per Click): How much you pay per click
• CTR (Click-Through Rate): % of people who click
• CPA (Cost Per Acquisition): Total cost to get a customer
• LTV (Lifetime Value): How much a customer is worth

**The Golden Rule:**
LTV must be 3x higher than CPA to be profitable

**Example:**
• Client pays you: $2,000/month management fee
• Client spends on ads: $10,000/month
• You generate: 40 leads at $250 CPA
• Client closes: 8 customers (20% close rate)
• Customer LTV: $3,000
• Client revenue: $24,000
• Client profit: $14,000
• Your fee: $2,000 (14% of revenue)

**Your Goal:** Consistently deliver 3:1 ROAS (Return on Ad Spend)`
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 8. Social Media Automation Kit
  'kit-social-media': {
    kitId: 'kit-social-media',
    title: 'Social Media Automation Kit - Set-and-Forget Social Management',
    description: 'Manage social media for 20+ clients without hiring. Templates, schedulers, and AI-powered content.',
    totalDuration: '4-6 hours',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1: Automated Social Media',
        description: 'How to scale social media management',
        estimatedTime: '1.5 hours',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'The Social Media Trap',
            type: 'text',
            duration: '15 min',
            description: 'Why most agencies struggle with social',
            content: {
              sections: [
                {
                  heading: 'The Problem with Social Media Management',
                  body: `**Traditional Model = Manual Labor:**
• Creating custom content for each client daily
• Monitoring comments and messages in real-time
• Designing graphics from scratch
• Researching trending topics

**Result:** 10-15 hours per client per month = can't scale past 5 clients

**The Automated Model:**
• Content library of 1,000+ pre-made posts
• AI generates custom variations
• Scheduling tool posts automatically
• AI monitoring flags only urgent items

**Result:** 2-3 hours per client per month = can manage 20+ clients`
                }
              ]
            }
          },
          {
            id: 'lesson-1-2',
            title: 'Content Library System',
            type: 'text',
            duration: '25 min',
            description: 'Never run out of content ideas',
            content: {
              sections: [
                {
                  heading: 'The 8 Content Pillars',
                  body: `**Every business needs these 8 types of posts:**
1. Educational (teach something valuable)
2. Promotional (sell your services)
3. Social proof (testimonials, reviews)
4. Behind-the-scenes (humanize your brand)
5. Community (engage with followers)
6. News/trends (industry updates)
7. User-generated (share customer posts)
8. Entertaining (memes, humor)

**Ratio:** 60% educational, 20% social proof, 20% promotional

**Your System:**
• Create 100 templates per industry
• Use AI to customize for each client
• Schedule 30 days in advance
• Set it and forget it`
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 9. Web Design Launch Kit
  'kit-web-design': {
    kitId: 'kit-web-design',
    title: 'Web Design Launch Kit - High-Converting Website Agency',
    description: 'Launch a web design agency using templates and no-code tools. Sell $5k+ websites.',
    totalDuration: '5-7 hours',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1: Modern Web Design Business',
        description: 'How to sell websites profitably',
        estimatedTime: '1.5 hours',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'The Template-Based Model',
            type: 'text',
            duration: '20 min',
            description: 'Deliver faster using premium templates',
            content: {
              sections: [
                {
                  heading: 'Custom vs Template-Based',
                  body: `**The Old Way (Custom):**
• 40-60 hours per website
• Hard to price (time-based)
• Every project is different
• Can only do 1-2 sites per month

**The Template Way:**
• Start with premium template
• Customize branding, content, images
• 8-12 hours per website
• Consistent deliverables
• Can do 5-8 sites per month

**Pricing:**
• Charge: $3,000-7,000 per site
• Your cost: $200 (template + tools)
• Your time: 10 hours
• Effective rate: $280-680/hour

**Tools:** Webflow, Framer, or WordPress with premium theme`
                }
              ]
            }
          },
          {
            id: 'lesson-1-2',
            title: 'Sales Process',
            type: 'text',
            duration: '25 min',
            description: 'How to close $5k+ website projects',
            content: {
              sections: [
                {
                  heading: 'Website Sales Script',
                  body: `**Discovery Questions:**
1. "What's your website supposed to do?" (Generate leads, sell products, educate)
2. "Who visits your website?" (Know the audience)
3. "What happens after someone visits?" (Understand conversion flow)
4. "What's the main problem with your current site?" (Find pain points)

**The Pitch:**
"We build conversion-focused websites that turn visitors into customers. Our websites include:
• Mobile-responsive design
• SEO optimization
• Fast loading (critical for Google)
• Lead capture systems
• Analytics tracking

Timeline: 2-3 weeks
Investment: $5,000 (includes first year hosting)
Monthly maintenance: $297/month (optional)"

**Upsells:**
• Monthly maintenance: $297-497/month
• Content updates: $150/hour
• SEO services: $1,000-2,500/month`
                }
              ]
            }
          }
        ]
      }
    ]
  },

  // 10. Digital Vegas Launch Kit
  'kit-casino': {
    kitId: 'kit-casino',
    title: 'Digital Vegas Launch Kit - iGaming & Casino Marketing',
    description: 'Launch campaigns for online casinos, sportsbooks, and gaming platforms. Specialized niche with premium pricing.',
    totalDuration: '5-6 hours',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1: iGaming Industry Fundamentals',
        description: 'Understanding the online gaming market',
        estimatedTime: '1.5 hours',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'The iGaming Opportunity',
            type: 'text',
            duration: '20 min',
            description: 'Why iGaming pays premium rates',
            content: {
              sections: [
                {
                  heading: 'iGaming Market Overview',
                  body: `**The Industry:**
• Global market size: $70+ billion
• Growing 10-12% annually
• High customer lifetime values ($1,000-10,000+)
• Competitive marketing landscape
• Sophisticated attribution tracking

**Why Agencies Charge Premium:**
• Complex compliance requirements
• High-stakes marketing (big budgets)
• Need for specialized knowledge
• Competitive campaigns
• Performance-based models available

**Typical Agency Fees:**
• Retainer: $5,000-15,000/month
• Or Revenue share: 20-30% of marketing budget
• Setup fees: $10,000-25,000

**Services In Demand:**
• Affiliate program management
• Influencer partnerships
• Paid acquisition (Google, Facebook restricted)
• SEO for competitive terms
• Content marketing
• CRM and retention campaigns`
                }
              ]
            }
          },
          {
            id: 'lesson-1-2',
            title: 'Compliance and Regulations',
            type: 'text',
            duration: '25 min',
            description: 'Navigating legal requirements',
            content: {
              sections: [
                {
                  heading: 'Critical Compliance Rules',
                  body: `**Advertising Restrictions:**
• Google Ads: Requires gambling license + geo-targeting
• Facebook: Restricted in most regions
• Affiliate rules: Clear disclosure requirements
• Age-gating: Must verify 18+ or 21+ depending on region

**Best Practices:**
• Always include "18+", "Gamble Responsibly" messaging
• Link to responsible gambling resources
• Clear terms and conditions
• Verify licenses and regulations in target markets
• Work with legal counsel familiar with iGaming

**Content Guidelines:**
• Don't target minors
• Don't make unrealistic earnings claims
• Include odds and risks
• Promote responsible gaming

This kit includes compliance checklists for major markets (US, UK, EU).`
                }
              ]
            }
          },
          {
            id: 'lesson-1-3',
            title: 'Affiliate Program Setup',
            type: 'text',
            duration: '20 min',
            description: 'Building a profitable affiliate network',
            content: {
              sections: [
                {
                  heading: 'iGaming Affiliate Strategy',
                  body: `**Why Affiliates Matter:**
• 40-60% of online casino traffic comes from affiliates
• Cost-effective (pay only for results)
• Affiliates bring targeted traffic
• Performance-based model = lower risk

**Affiliate Commission Models:**
• Revenue Share: 25-40% of player losses (lifetime)
• CPA: $100-500 per qualified player
• Hybrid: Lower rev share + upfront CPA

**Your Service:**
Offer full affiliate program management:
• Recruit affiliates
• Provide marketing materials
• Track performance
• Handle payments
• Optimize campaigns

**Charge:** $3,000-8,000/month + 10% of affiliate costs`
                }
              ]
            }
          }
        ]
      }
    ]
  }
};

export const getKitCourse = (kitId: string): KitCourse | undefined => {
  return KIT_COURSES[kitId];
};

export const getTotalLessons = (kitId: string): number => {
  const course = KIT_COURSES[kitId];
  if (!course) return 0;
  return course.modules.reduce((total, module) => total + module.lessons.length, 0);
};

export const getCompletedLessons = (kitId: string, completedLessonIds: string[]): number => {
  return completedLessonIds.length;
};

export const getProgressPercentage = (kitId: string, completedLessonIds: string[]): number => {
  const total = getTotalLessons(kitId);
  const completed = getCompletedLessons(kitId, completedLessonIds);
  return total > 0 ? Math.round((completed / total) * 100) : 0;
};
