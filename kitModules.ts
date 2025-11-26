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
    totalDuration: '8-10 hours',
    modules: [
      {
        id: 'module-1',
        title: 'Module 1: Reputation Management Fundamentals',
        description: 'Understanding the review economy and why businesses desperately need your help',
        estimatedTime: '1.5 hours',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'The Review Economy: Your $12k/Month Opportunity',
            type: 'text',
            duration: '20 min',
            description: 'Why online reviews are the new word-of-mouth and how to capitalize on it',
            content: {
              sections: [
                {
                  heading: 'The Massive Market Opportunity',
                  body: `88% of consumers trust online reviews as much as personal recommendations. But here's the shocking truth: 72% of local businesses have fewer than 10 reviews on Google.

**The Numbers That Matter:**
• Businesses with 50+ reviews earn 54% more revenue than average
• 93% of consumers say reviews impact their buying decisions
• Only 1 in 10 satisfied customers leave a review without being asked
• The average local business loses $50,000-200,000 annually due to poor review volume

**Your Market Size:**
• 32.5 million small businesses in the US
• 87% have inadequate review systems
• Average client pays $797-1,497/month for review management
• Industry churn rate: Only 12% annually (one of the stickiest services)

**Why This Business Model Works:**
✓ Measurable results (reviews are public and countable)
✓ Low technical complexity (no coding required)
✓ Fast implementation (set up clients in 2 hours)
✓ Recurring revenue (ongoing service, not one-time project)
✓ High perceived value (reviews directly impact revenue)
✓ Low competition (most agencies don't offer this)`
                },
                {
                  heading: 'The Math Behind an 80% Margin Business',
                  body: `**Your Costs Per Client (Monthly):**
• Review software (Birdeye/Podium reseller): $99-150
• Review response service (if outsourced): $50
• Reporting & monitoring: $25
• Support/communication time: $50
**Total Cost: $224-275/month**

**Your Pricing:**
• Starter Package: $497/month (78% margin)
• Growth Package: $797/month (82% margin)
• Enterprise Package: $1,297/month (85% margin)

**Revenue Scenario at 15 Clients:**
• 5 Starter ($497) = $2,485
• 7 Growth ($797) = $5,579
• 3 Enterprise ($1,297) = $3,891
**Total: $11,955/month revenue**
**Total Costs: ~$3,600/month**
**Net Profit: $8,355/month (70% net margin)**

This is achievable within 90-120 days of starting.`
                },
                {
                  heading: 'Your Value Proposition in One Sentence',
                  body: `"We help local businesses get 10-30 five-star reviews per month on autopilot, so they show up when customers search, and those customers actually call."

**What Makes This Compelling:**
1. Specific number (10-30 reviews)
2. Quality indicator (five-star)
3. Time-bound (per month)
4. Automation (on autopilot)
5. Clear benefit (show up + get calls)

**Why Businesses Buy This:**
• It's the #1 factor in local search rankings (after Google Business Profile itself)
• Reviews provide social proof that converts browsers into buyers
• More reviews = higher click-through rates in search results
• It's completely measurable (they can see the reviews appearing)
• The ROI is obvious (more visibility = more customers)

Most businesses know they need more reviews. They just don't have a system. You're selling the system.`
                }
              ],
              note: 'This is one of the few agency models where clients can see your work in real-time. Every new review is proof of your value.'
            }
          },
          {
            id: 'lesson-1-2',
            title: 'Why Reputation Management Has 80% Margins',
            type: 'text',
            duration: '15 min',
            description: 'The economics that make this the most profitable agency model',
            content: {
              sections: [
                {
                  heading: 'The Secret to High Margins',
                  body: `Unlike most agency services, reputation management has extraordinary margins because:

**1. Low Fulfillment Costs**
Once you set up the system (2 hours), it runs automatically. Your monthly time per client:
• 30 minutes: Review monitoring & response
• 15 minutes: Monthly report generation
• 15 minutes: Client check-in call
**Total: 60 minutes per client per month**

At $797/month and 1 hour of work, you're earning $797/hour of fulfillment time.

**2. Software Arbitrage**
You pay wholesale, clients pay retail:
• Your cost: $99-150/month (agency reseller pricing)
• You charge: $497-1,297/month
• The software does 90% of the work

**3. Minimal Technical Overhead**
No developers, designers, or specialists required. A virtual assistant can handle most fulfillment for $15-20/hour.

**4. Scalable Without Headcount**
• Clients 1-10: You can manage alone
• Clients 11-25: Add one part-time VA ($800/mo)
• Clients 26-50: Add one full-time account manager ($3,500/mo)
• Clients 51-100: Add one operations manager + 2 AMs ($12,000/mo total)

At 100 clients averaging $797, that's $79,700/month with $40,000 in costs = $39,700 net profit.`
                },
                {
                  heading: 'Comparison to Other Agency Models',
                  body: `**SEO Agency:**
• Margin: 40-50%
• Fulfillment time: 10-15 hours/client/month
• Results timeline: 3-6 months
• Technical complexity: High

**Paid Ads Agency:**
• Margin: 15-30%
• Fulfillment time: 8-12 hours/client/month
• Results timeline: Immediate (but ongoing management required)
• Technical complexity: Medium-High

**Social Media Agency:**
• Margin: 30-45%
• Fulfillment time: 15-20 hours/client/month
• Results timeline: 2-3 months
• Technical complexity: Medium

**Reputation Management Agency:**
• Margin: 70-85%
• Fulfillment time: 1-2 hours/client/month
• Results timeline: 30-60 days
• Technical complexity: Low

The math speaks for itself. This is the most profitable agency model for independent operators.`
                }
              ]
            }
          },
          {
            id: 'lesson-1-3',
            title: 'The Psychology of Online Reviews',
            type: 'text',
            duration: '18 min',
            description: 'What makes people leave 5-star reviews and how to trigger it',
            content: {
              sections: [
                {
                  heading: 'The 7 Psychological Triggers',
                  body: `**1. Reciprocity**
When a business provides exceptional service, customers feel a psychological need to "give back." Your job is to make leaving a review the easiest way to reciprocate.

**2. Social Proof**
People want to be part of the crowd. When you show them that "423 happy customers have left reviews," they're more likely to add theirs.

**3. Authority**
Reviews from "verified customers" carry more weight. Use language like "Join 400+ verified customers who've shared their experience."

**4. Timing**
The best time to ask for a review is within 24-72 hours of service completion, when the positive experience is fresh and emotions are high.

**5. Ease of Action**
The fewer clicks required, the higher your conversion rate. A direct link to Google review page converts 3-5x better than asking someone to "find us on Google."

**6. Personalization**
"Hi Sarah, thanks for choosing us! We'd love to hear about your experience..." converts 2x better than generic requests.

**7. Gentle Persistence**
One reminder after 3 days (if they don't respond initially) increases completion by 40%. But never send more than one reminder.`
                },
                {
                  heading: 'The Review Request Framework',
                  body: `**The 3-Part Formula:**

**Part 1: Gratitude**
"Thank you for choosing [Business Name]! We truly appreciate your business."

**Part 2: The Ask**
"If you had a great experience, would you mind taking 60 seconds to share it on Google? It helps other families find us."

**Part 3: The Link**
[Direct link to Google review page]

**Why This Works:**
• Shows genuine appreciation (builds rapport)
• Sets time expectation (60 seconds = low commitment)
• Explains the "why" (helps others = altruistic motivation)
• Makes it effortless (one-click direct link)

**Conversion Rates:**
• SMS with this framework: 12-18% leave a review
• Email with this framework: 6-9% leave a review
• No request at all: <1% leave a review

At 100 completed jobs/month:
• 15 reviews from SMS (15% conversion)
• 0 reviews without system

That's 180 reviews per year vs. maybe 10. Massive difference.`
                },
                {
                  heading: 'Why Negative Reviews Happen and How to Prevent Them',
                  body: `**The Data:**
• 30% of customers who have a bad experience will leave a review
• Only 9% of customers who have a good experience will leave a review

Without a system, negative reviews outnumber positive ones by 3:1.

**The Prevention Strategy:**

**Step 1: Satisfaction Filter**
Before asking for a public review, send a private satisfaction survey:
"On a scale of 1-5, how was your experience?"

**Step 2: Smart Routing**
• 4-5 stars → Route to public review sites
• 1-3 stars → Route to private feedback form

This prevents negative reviews from ever being published while still capturing feedback.

**Step 3: Service Recovery**
When someone gives 1-3 stars privately:
1. Respond within 2 hours
2. Apologize and offer to make it right
3. Fix the issue
4. Ask them to give you another chance

**Result:** 68% of unhappy customers who receive service recovery either don't leave a public review OR upgrade to a positive review.

This one technique protects your clients' reputation while still maintaining ethical practices.`
                }
              ],
              note: 'The psychology of reviews is simple: Make it easy for happy customers to share, and hard for unhappy customers to damage the business before you can make it right.'
            }
          },
          {
            id: 'lesson-1-4',
            title: 'Case Study: How Sarah Built $12k/Month in 90 Days',
            type: 'text',
            duration: '15 min',
            description: 'Real numbers from a reputation management agency',
            content: {
              sections: [
                {
                  heading: 'The Starting Point',
                  body: `**Sarah's Background:**
• Former dental office manager
• No agency experience
• No technical skills beyond basic software
• Started with $0 in revenue

**Day 1 Decision:**
Sarah decided to focus exclusively on dental practices because:
1. She knew the industry from her office manager role
2. Dental practices desperately need reviews (high-trust service)
3. They have money (average practice revenue: $1.2M/year)
4. Low patient volume = easy to implement (8-15 patients/day)

**Her Investment:**
• Birdeye reseller account: $149/month
• Basic website on Wix: $16/month
• Business email: $6/month
**Total: $171/month to start**`
                },
                {
                  heading: 'Month 1: First Clients',
                  body: `**Week 1:**
• Built list of 50 dental practices within 20 miles with <15 Google reviews
• Created "Bad Review Firefighter" cold email offering free reputation audit
• Sent 10 emails per day (50 total in Week 1)

**Week 2:**
• 6 responses (12% response rate)
• 4 discovery calls booked
• 2 clients signed at $497/month each
**First Month Revenue: $994**

**What She Learned:**
Dental practices were terrified of negative reviews. Her pitch: "I prevent bad reviews from ever being published by catching unhappy patients before they post publicly."

This positioning (prevention vs. generation) was the key to early sales.`
                },
                {
                  heading: 'Month 2-3: Scaling to 15 Clients',
                  body: `**The Referral Engine:**
Within 30 days, Sarah's first two clients saw results:
• Client 1: Went from 9 reviews to 21 reviews (12 new 5-star reviews)
• Client 2: Went from 12 reviews to 28 reviews (16 new 5-star reviews)

Both clients gave her testimonials and referred her to colleagues.

**The Growth:**
• Month 2: Added 5 clients (3 from referrals, 2 from outreach) = 7 total
• Month 3: Added 8 clients (5 from referrals, 3 from outreach) = 15 total

**Month 3 Revenue Breakdown:**
• 4 clients at $497 = $1,988
• 8 clients at $797 (upgraded from Starter) = $6,376
• 3 clients at $1,297 (multi-location) = $3,891
**Total Revenue: $12,255/month**

**Her Costs:**
• Software: $1,485 (15 clients × $99)
• VA for review responses: $600
• Her time: ~20 hours/month managing accounts
**Net Profit: $10,170/month**`
                },
                {
                  heading: 'Key Takeaways from Sarah Success',
                  body: `**What Sarah Did Right:**

1. **Picked One Niche**
   Did not try to serve everyone. Dental only.

2. **Leveraged Past Experience**
   Used her industry knowledge to build instant credibility.

3. **Focused on Prevention**
   Positioned service as "reputation protection" not just "get more reviews."

4. **Delivered Fast Results**
   Clients saw 5-10 new reviews within first 30 days.

5. **Asked for Referrals**
   After 30 days of results, directly asked "Who else in your dental network needs this?"

6. **Upsold Quickly**
   Started clients at $497, then showed ROI and upsold to $797 within 60 days.

**Timeline Breakdown:**
• Days 1-7: Research and setup
• Days 8-30: First outreach campaign, first 2 clients
• Days 31-60: Deliver results, get testimonials, 7 total clients
• Days 61-90: Referrals kick in, 15 total clients

**Revenue Progression:**
• Month 1: $994
• Month 2: $5,576
• Month 3: $12,255

Sarah's story proves you don't need technical skills or a huge budget. You need focus, a proven system, and the ability to deliver measurable results.`
                }
              ],
              note: 'This case is not unusual. The reputation management model allows for rapid scaling because results are immediate and visible.'
            }
          },
          {
            id: 'lesson-1-5',
            title: 'Review Generation Systems Explained',
            type: 'text',
            duration: '25 min',
            description: 'The complete technical system that generates 10-30 reviews per month',
            content: {
              sections: [
                {
                  heading: 'The Complete Review Generation Workflow',
                  body: `**Step 1: Customer Completes Transaction/Service**
Trigger: Job marked complete in client's system (CRM, POS, scheduling software)

**Step 2: Automated Satisfaction Survey (Within 2 Hours)**
Send via SMS or email:
"Hi [Name], thanks for visiting [Business]! Quick question: How was your experience today? Reply 1-5 (1=Poor, 5=Excellent)"

**Step 3: Smart Routing Based on Response**

**If 4-5 Stars:**
Immediately send follow-up message:
"Thank you! We're so glad you had a great experience. Would you mind sharing your feedback on Google? It helps other customers find us: [Direct Review Link]"

**If 1-3 Stars:**
Immediately send different message:
"We're sorry we didn't meet your expectations. Would you mind sharing what went wrong so we can make it right? [Private Feedback Form Link]"

**Step 4: Follow-Up Reminder (3 Days Later, If No Action)**
For 4-5 star customers who didn't leave review:
"Hi [Name], just following up from last week. If you have 60 seconds, we'd really appreciate your review: [Link]"

**Step 5: Review Response (Within 24 Hours)**
When review is posted:
• Positive review: Thank them publicly
• Negative review: Apologize, offer resolution, take conversation offline

**Completion Rate:**
• 15-20% of happy customers leave reviews with this system
• Without system: <1% leave reviews

For a business completing 100 transactions/month:
• Traditional approach: 1 review/month
• This system: 15-20 reviews/month`
                },
                {
                  heading: 'The Three Technology Stacks',
                  body: `**Option 1: All-in-One Platform (Easiest)**
**Tools:** Podium or Birdeye
**Cost:** $289-399/month per location
**Best For:** Clients willing to pay premium pricing

**Pros:**
✓ Everything in one dashboard
✓ Built-in SMS/email automation
✓ Review monitoring for all platforms
✓ White-label ready
✓ Support for multi-location
✓ Mobile app for on-the-go management

**Cons:**
✗ Higher cost per location
✗ Less flexibility for customization

**Setup Time:** 1-2 hours per client

---

**Option 2: DIY Stack (Most Profitable)**
**Tools:** JotForm + Zapier + Twilio + Google Sheets
**Cost:** $50-75/month per location
**Best For:** Maximum margins and flexibility

**Components:**
1. JotForm ($39/mo) - Create satisfaction survey
2. Zapier ($29/mo) - Automate workflows
3. Twilio ($20/mo) - Send SMS messages
4. Google Sheets (Free) - Track responses

**Workflow:**
1. Customer completes service → Manual or automated trigger
2. JotForm survey sent via Twilio SMS
3. Zapier watches for responses
4. 4-5 stars → Zapier sends review request SMS via Twilio
5. 1-3 stars → Zapier sends to private feedback form
6. Results logged in Google Sheet

**Pros:**
✓ 70-80% lower cost than all-in-one
✓ Full control and customization
✓ Can handle unlimited clients on one account

**Cons:**
✗ 3-4 hours initial setup per workflow
✗ Requires technical comfort
✗ More moving pieces to troubleshoot

**Setup Time:** 3-4 hours per client

---

**Option 3: Hybrid Stack (Best of Both)**
**Tools:** GatherUp + Zapier + Twilio
**Cost:** $99-150/month per location
**Best For:** Balance of cost and ease

**Components:**
1. GatherUp ($99/mo) - Review monitoring & basic automation
2. Zapier ($29/mo) - Enhanced workflows
3. Twilio ($20/mo) - SMS supplement

**Pros:**
✓ Better margins than all-in-one
✓ Easier than full DIY
✓ Good feature set

**Cons:**
✗ Still requires some technical setup
✗ Not quite as polished as Podium/Birdeye

**Setup Time:** 2 hours per client`
                },
                {
                  heading: 'Choosing the Right Stack for Your Agency',
                  body: `**Decision Framework:**

**Choose All-in-One (Podium/Birdeye) If:**
• You're just starting and want simplicity
• You plan to charge $1,000+/month (margins still work)
• Your clients are multi-location (5+ locations)
• You want to resell the software under your brand
• You don't want to deal with technical integration

**Choose DIY Stack If:**
• You're comfortable with basic automation tools
• You want maximum profit margins (80%+)
• You're serving single-location businesses
• You plan to scale to 25+ clients (cost savings compound)
• You enjoy tinkering with workflows

**Choose Hybrid Stack If:**
• You want better margins than all-in-one but easier than DIY
• You're targeting the $600-900/month price point
• You want some automation but not full DIY complexity

**My Recommendation for Most People:**
Start with All-in-One (Podium/Birdeye) for your first 5 clients. Once you understand the process and have revenue coming in, switch new clients to DIY stack to improve margins.

This lets you start fast, learn the business, then optimize for profit as you scale.`
                }
              ],
              note: 'The technology stack is just a tool. The real value is the system and your ability to generate reviews consistently.'
            }
          },
          {
            id: 'lesson-1-6',
            title: 'Pricing Strategy: From $497 to $1,497/Month',
            type: 'text',
            duration: '20 min',
            description: 'How to price your reputation management services for maximum profit',
            content: {
              sections: [
                {
                  heading: 'The Three-Tier Pricing Model',
                  body: `**Tier 1: Reputation Starter - $497/month**

**What's Included:**
• Review generation system setup (one-time)
• Automated review requests via SMS & email
• Monitor 2 review platforms (Google + Facebook)
• Template-based review responses (you write, they approve)
• Monthly performance report (reviews gained, average rating, response rate)
• Email support (response within 24 hours)

**Best For:**
• Small businesses (solo practitioners, single location)
• Businesses doing 30-60 transactions/month
• Price-sensitive clients who want to test the service

**Your Cost:** $125-150/month (software + minimal labor)
**Your Margin:** 70-75%

**Expected Results:** 5-10 new reviews per month

---

**Tier 2: Reputation Growth - $797/month** ⭐ Most Popular

**What's Included:**
• Everything in Starter
• Monitor 5+ platforms (Google, Facebook, Yelp, industry-specific sites)
• Custom review responses (personalized to each review)
• Review widget for website (shows latest reviews)
• Quarterly reputation audit (competitive analysis)
• Priority email + phone support
• Negative review alert system (instant notification)

**Best For:**
• Established businesses (5+ years in business)
• Businesses doing 60-150 transactions/month
• Clients who understand the value and want comprehensive service

**Your Cost:** $150-200/month
**Your Margin:** 75-80%

**Expected Results:** 10-20 new reviews per month

---

**Tier 3: Reputation Domination - $1,297/month**

**What's Included:**
• Everything in Growth
• Multi-location support (up to 5 locations included)
• Crisis management (negative review suppression & response strategy)
• Competitor benchmarking (monthly report)
• Review-driven SEO optimization
• Video review requests (higher conversion)
• Dedicated account manager
• Monthly strategy call

**Best For:**
• Multi-location businesses
• High-revenue businesses ($1M+ annual revenue)
• Businesses in competitive markets or recovering from reputation damage
• Franchise locations

**Your Cost:** $250-325/month
**Your Margin:** 80-85%

**Expected Results:** 20-30 new reviews per month per location`
                },
                {
                  heading: 'The Psychology Behind This Pricing',
                  body: `**Why Three Tiers Work:**

1. **Anchoring Effect**
   When you show $497, $797, and $1,297, the middle option looks "reasonable." Without the $1,297 option, $797 might seem expensive.

2. **Decoy Pricing**
   The $497 tier makes $797 look like a much better value (2x the features for 1.6x the price).

3. **Status Positioning**
   The $1,297 "Domination" tier signals this is for serious businesses, making mid-tier clients feel they're making a smart decision.

**Conversion Rates by Tier:**
• 25% choose Starter ($497)
• 60% choose Growth ($797)
• 15% choose Domination ($1,297)

**Why This Matters:**
If you only offered one tier at $797, fewer people would buy. The three-tier model increases total sales AND average order value.

**Average Revenue Per Client:**
(25% × $497) + (60% × $797) + (15% × $1,297) = $798/client average

This is higher than offering just $797 flat!`
                },
                {
                  heading: 'How to Present Pricing Without Being Pushy',
                  body: `**The Consultative Approach:**

**Step 1: Understand Their Situation**
"How many customers do you serve per month?"
"How many reviews do you currently have on Google?"
"What's your average transaction value?"

**Step 2: Calculate Their Opportunity**
"So if you're serving 100 customers per month, and we can get 15-20 of them to leave 5-star reviews, that's 180-240 new reviews per year. Based on industry data, that could increase your revenue by 30-40%. On your current $500K annual revenue, that's an extra $150-200K."

**Step 3: Present the Investment**
"To deliver those results, we have three different service levels depending on how aggressive you want to be. Our most popular option is our Growth package at $797/month..."

[Show pricing sheet with all three tiers]

**Step 4: Let Them Choose**
"Based on what you've told me about your business, which of these feels like the right fit?"

**Why This Works:**
• You've established ROI before showing price
• You've given them control (they choose)
• You've positioned it as an investment, not a cost
• The middle tier becomes the obvious choice for most

**Handling Price Objections:**

**"That seems expensive"**
Response: "I understand. Let's look at it from an ROI perspective. If we generate 15 new reviews per month, and that brings you just 2-3 additional customers, what's the revenue impact? [Calculate with them]. The service pays for itself with just a small increase in new customers."

**"Can you do it for less?"**
Response: "I could offer the Starter package at $497/month, but based on your transaction volume, you'd be leaving results on the table. The Growth package is designed specifically for businesses like yours doing 100+ transactions per month."

**"I'll think about it"**
Response: "Of course! While you're thinking it over, I'll put together a custom reputation audit showing exactly where you stand vs. competitors. I'll email that to you tomorrow. When would be a good time to discuss it?"

The key is confidence. You're not selling; you're helping them make a smart investment decision.`
                }
              ],
              note: 'Pricing is not just about covering costs. Position yourself as a premium service that delivers measurable ROI.'
            }
          },
          {
            id: 'lesson-1-7',
            title: 'Common Mistakes That Kill Reputation Agencies',
            type: 'text',
            duration: '15 min',
            description: 'Learn from common failures and how to avoid them',
            content: {
              sections: [
                {
                  heading: 'The 7 Deadly Mistakes',
                  body: `**Mistake #1: Not Specializing in a Niche**

**The Error:**
Trying to serve all businesses (dentists, plumbers, restaurants, lawyers, etc.)

**Why It Fails:**
• Your marketing message is too generic
• You can't become an expert in any industry
• You can't build industry-specific processes
• Referrals don't work (a dentist won't refer you to another dentist if you also serve their competitor)

**The Fix:**
Pick ONE niche for your first 10 clients. Become known as "the reputation person for dentists" or "the review expert for HVAC companies."

---

**Mistake #2: Selling "Review Generation" Instead of "Business Growth"**

**The Error:**
Talking about features (SMS, automation, review widgets) instead of outcomes.

**Why It Fails:**
Business owners don't care about your process. They care about more customers and more revenue.

**The Fix:**
Lead with outcomes: "We help dental practices add $50-100K in annual revenue by systematically building their online reputation."

---

**Mistake #3: Not Having a Satisfaction Filter**

**The Error:**
Sending all customers directly to Google/Yelp to leave reviews without checking satisfaction first.

**Why It Fails:**
Unhappy customers (10-15% of all customers) will leave negative reviews publicly. You're essentially inviting them to damage your client's reputation.

**The Fix:**
ALWAYS use a satisfaction filter. Ask privately first (1-5 stars), then route 4-5 stars to public sites and 1-3 stars to private feedback.

---

**Mistake #4: Over-Promising Review Volume**

**The Error:**
"We'll get you 50 reviews in 30 days!" when the business only has 40 customers per month.

**Why It Fails:**
Even with a perfect system, only 15-20% of customers leave reviews. Over-promising destroys trust and leads to cancellations.

**The Fix:**
Under-promise and over-deliver. Promise 10-15 reviews per month, then deliver 15-20. Set realistic expectations based on their transaction volume.

---

**Mistake #5: Not Responding to Negative Reviews**

**The Error:**
Focusing only on generating new reviews while ignoring existing negative ones.

**Why It Fails:**
One 1-star review with no response looks worse than the same review with a professional response. Ignoring negative reviews signals the business doesn't care.

**The Fix:**
Make review response part of your standard service. Every negative review gets a response within 24 hours. Use the template: Apologize → Explain → Offer Solution → Take Offline.

---

**Mistake #6: Not Tracking and Reporting Results**

**The Error:**
Assuming clients notice the reviews appearing on their profiles.

**Why It Fails:**
Out of sight = out of mind. If clients don't see monthly reports showing progress, they forget about your value and cancel.

**The Fix:**
Send a detailed monthly report showing:
• Reviews gained this month
• Current average rating
• Rating trend (up/down)
• Comparison to competitors
• Response rate to reviews

---

**Mistake #7: Pricing Too Low**

**The Error:**
Charging $200-300/month because "it's automated anyway."

**Why It Fails:**
Low pricing attracts low-quality clients who don't value the service. You need 30+ clients at $300/month to hit $10K revenue, versus only 13 clients at $797/month.

**The Fix:**
Price based on value delivered, not time spent. If you're generating 15-20 reviews per month that bring 2-3 additional customers, the ROI is 5-10X. Charge accordingly.`
                },
                {
                  heading: 'Warning Signs Your Agency Is in Trouble',
                  body: `**Red Flag #1: High Churn Rate**
If more than 2 clients per month are canceling (20% monthly churn), something is wrong.

**Likely Causes:**
• Not delivering promised results
• Poor communication (clients don't feel supported)
• Wrong target market (they can't afford the service)

**Fix:** Survey churned clients to understand why they left. Fix the root cause.

---

**Red Flag #2: You're Working More Than 20 Hours/Week**
If you're spending more than 1-2 hours per client per month, your systems are broken.

**Likely Causes:**
• Doing too much manually
• Not using automation properly
• Taking on clients who need too much hand-holding

**Fix:** Document your processes and find the bottlenecks. Automate or eliminate them.

---

**Red Flag #3: Clients Asking "What Are We Paying For?"**
If clients question your value, you're not communicating it well.

**Likely Causes:**
• Not sending regular reports
• Not showing tangible results
• Not explaining how reviews impact their business

**Fix:** Implement monthly reporting and quarterly business review calls.

---

**Red Flag #4: Can't Raise Prices**
If you feel stuck at your current pricing, you're positioned wrong.

**Likely Causes:**
• Competing on price instead of value
• Not demonstrating ROI clearly
• Serving price-sensitive market segments

**Fix:** Shift to higher-quality clients in industries where reputation is critical (medical, legal, financial services).`
                }
              ],
              note: 'Most agency failures are preventable. They are caused by poor positioning, weak systems, or serving the wrong clients. Learn from these mistakes and avoid them.'
            }
          },
          {
            id: 'lesson-1-8',
            title: 'Your First Week Action Plan',
            type: 'checklist',
            duration: '12 min',
            description: 'Step-by-step launch checklist to get your first client',
            content: {
              tasks: [
                {
                  day: 'Day 1-2: Business Setup & Research',
                  items: [
                    'Choose your niche (dental, medical, legal, home services, etc.)',
                    'Register business name and set up business email (firstname@youragency.com)',
                    'Create simple 1-page website with your offer and pricing (use Carrd or Wix)',
                    'Sign up for review software trial (Podium, Birdeye, or GatherUp)',
                    'Research 50 businesses in your niche with <15 Google reviews in your area',
                    'Set up CRM or spreadsheet to track outreach (Google Sheets works fine)'
                  ]
                },
                {
                  day: 'Day 3-4: Create Your Outreach Assets',
                  items: [
                    'Write cold email template offering free reputation audit',
                    'Create reputation audit template (Google Sheet showing their current reviews, competitor comparison, opportunity score)',
                    'Prepare discovery call script with qualification questions',
                    'Create proposal template with 3 pricing tiers',
                    'Set up booking link for discovery calls (Calendly or Cal.com)',
                    'Practice your pitch out loud 5 times'
                  ]
                },
                {
                  day: 'Day 5-6: Launch Outreach Campaign',
                  items: [
                    'Send 10 cold emails to target businesses (personalized, not mass)',
                    'Follow up on any responses within 2 hours',
                    'Complete free audits for anyone who responds',
                    'Book discovery calls with interested prospects',
                    'Send another 10 cold emails',
                    'Post about your new service on LinkedIn/Facebook'
                  ]
                },
                {
                  day: 'Day 7: Close Your First Client',
                  items: [
                    'Conduct discovery calls with qualified prospects',
                    'Present your findings from their free audit',
                    'Show them the 3 pricing tiers',
                    'Ask for the sale: "Which of these packages makes sense for you?"',
                    'Send proposal/contract to interested prospects',
                    'Follow up with anyone who said "let me think about it"',
                    'Celebrate when you close your first client - you are now an agency owner!'
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Module 2: Setting Up Your Reputation Engine',
        description: 'Technical setup and implementation for review generation systems',
        estimatedTime: '2 hours',
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Choosing Your Review Software Stack',
            type: 'text',
            duration: '20 min',
            description: 'Detailed comparison of Podium, Birdeye, and DIY solutions',
            content: {
              sections: [
                {
                  heading: 'The Three Software Options',
                  body: `**Option 1: Podium**
**Monthly Cost:** $289-499/location (reseller: $99-150)
**Best For:** Agencies charging $1,000+/month

**Key Features:**
• Unified inbox (all customer messages in one place)
• SMS review requests with 18% average response rate
• Webchat for lead capture
• Payment collection via text
• Mobile app for client access
• White-label capabilities

**Pros:**
✓ Best-in-class user experience
✓ Highest review conversion rates
✓ Built-in payment processing (additional revenue stream)
✓ Excellent customer support
✓ Easy client onboarding

**Cons:**
✗ Highest cost option
✗ Annual contract required
✗ Limited custom automation

**Verdict:** Best for agencies targeting $997-1,497/month pricing. The superior UX and conversion rates justify the cost.

---

**Option 2: Birdeye**
**Monthly Cost:** $299-599/location (reseller: $99-199)
**Best For:** Multi-location clients and franchise systems

**Key Features:**
• Review monitoring across 150+ sites
• Competitive benchmarking built-in
• Social media management
• Surveys and customer feedback
• Referral management
• AI-powered insights

**Pros:**
✓ Best multi-location dashboard
✓ Most comprehensive review site coverage
✓ Strong analytics and reporting
✓ Franchise-friendly features
✓ API for custom integrations

**Cons:**
✗ Steeper learning curve
✗ Some features feel "enterprise heavy"
✗ Can be overwhelming for small single-location businesses

**Verdict:** Perfect for agencies targeting multi-location businesses, franchises, or clients doing $1M+ in annual revenue.

---

**Option 3: DIY Stack**
**Monthly Cost:** $50-100/location
**Best For:** Maximum profit margins

**Required Tools:**
1. **GatherUp** ($99/mo) - Review monitoring
2. **Zapier** ($29/mo) - Automation workflows
3. **Twilio** ($20/mo) - SMS messaging
4. **JotForm** ($39/mo) - Surveys
5. **Google Sheets** (Free) - Data tracking

**What You Build:**
• Automated satisfaction surveys
• Smart routing (positive→public, negative→private)
• SMS/email review requests
• Review monitoring dashboard
• Monthly reporting

**Pros:**
✓ 70-80% lower cost
✓ Highest profit margins
✓ Complete control and customization
✓ Can serve unlimited clients on one account
✓ No vendor lock-in

**Cons:**
✗ 4-6 hours initial setup per client
✗ Requires technical comfort
✗ You're responsible for troubleshooting
✗ Client onboarding takes longer

**Verdict:** Best for tech-savvy agency owners charging $600-900/month who want maximum margins and control.`
                },
                {
                  heading: 'Decision Framework: Which Stack Should You Choose?',
                  body: `**Choose Podium If:**
• You're brand new and want to start fast
• You plan to charge $997+/month
• You want the easiest client onboarding experience
• You're targeting single-location service businesses
• You don't want to deal with technical setup

**Choose Birdeye If:**
• You're targeting multi-location businesses
• Your clients are franchises or enterprise-level
• You need comprehensive competitive analysis
• You plan to charge $1,297+/month
• Your clients care about monitoring 20+ review sites

**Choose DIY Stack If:**
• You're comfortable with Zapier and automation tools
• You want to maximize profit margins (80%+)
• You're charging $600-900/month
• You plan to scale to 25+ clients (cost savings compound)
• You enjoy building custom solutions

**My Recommendation:**
Start with Podium or Birdeye for your first 3-5 clients. Learn the business, understand client needs, and generate revenue. Then, once you're confident, build a DIY stack for new clients to improve margins.

This "hybrid approach" lets you start fast while optimizing for profit over time.

**Cost Comparison at 15 Clients:**
• Podium: $1,485/month in software costs
• Birdeye: $1,485/month in software costs
• DIY Stack: $750/month in software costs

**Margin Impact:**
At $797/month average pricing with 15 clients ($11,955 revenue):
• Podium margin: ($11,955 - $1,485) / $11,955 = 88% gross margin
• DIY margin: ($11,955 - $750) / $11,955 = 94% gross margin

That's an extra $735/month in your pocket with DIY stack, or $8,820/year.`
                }
              ],
              note: 'There is no "wrong" choice. Pick the stack that matches your technical comfort level and target client profile.'
            }
          },
          {
            id: 'lesson-2-2',
            title: 'Google Business Profile Review Link Setup',
            type: 'text',
            duration: '15 min',
            description: 'How to create the direct review link that converts 3x better',
            content: {
              sections: [
                {
                  heading: 'Why Direct Links Matter',
                  body: `Asking someone to "find us on Google and leave a review" has a 2-4% completion rate. Sending a direct link to the review form has a 15-18% completion rate.

**The Math:**
• 100 customers × 2% = 2 reviews (traditional ask)
• 100 customers × 16% = 16 reviews (direct link)

That is 8x more reviews with the same effort.

**How to Find Your Google Review Link:**

**Method 1: Using Place ID (Recommended)**
1. Go to https://developers.google.com/maps/documentation/places/web-service/place-id
2. Enter your business name and location
3. Copy the Place ID (example: ChIJN1t_tDeuEmsRUsoyG83frY4)
4. Your review link: https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID

**Method 2: From Google Business Profile**
1. Log into Google Business Profile
2. Click "Get more reviews"
3. Copy the short URL (example: g.page/r/...)
4. This redirects to the full review link

**Method 3: Manual Search**
1. Search for your business on Google
2. Click "Write a review"
3. Copy the URL from browser address bar
4. Clean up any unnecessary parameters

**Best Practice:**
Use a URL shortener (bit.ly, rebrandly) to create a branded short link:
• Original: https://search.google.com/local/writereview?placeid=ChIJN1t...
• Shortened: youragency.link/clientname-review

This looks more professional in SMS/email and is easier to track.`
                },
                {
                  heading: 'Setting Up Review Links for Other Platforms',
                  body: `**Facebook Reviews:**
1. Go to your Facebook Business Page
2. Click "Reviews" tab
3. Your review link: facebook.com/YOUR_PAGE_NAME/reviews
4. Or: facebook.com/pg/YOUR_PAGE_NAME/reviews/

**Yelp Reviews:**
1. Find your Yelp business page
2. Copy the URL
3. Add /writeareview at the end
4. Example: yelp.com/biz/business-name-city/writeareview

**Trustpilot (if applicable):**
1. Log into Trustpilot business account
2. Go to "Get more reviews"
3. Copy your unique review invitation link

**Industry-Specific Sites:**
• Avvo (lawyers): avvo.com/rate-lawyer/...
• Healthgrades (doctors): healthgrades.com/physician/...
• HomeAdvisor (contractors): homeadvisor.com/rated/...
• TripAdvisor (hospitality): tripadvisor.com/UserReview-...

**Pro Tip:** Create a spreadsheet for each client with all their review links so you can quickly grab them when setting up automations.`
                }
              ],
              note: 'The direct review link is the single most important element of your review generation system. Get this right first.'
            }
          },
          {
            id: 'lesson-2-3',
            title: 'Setting Up Automated Review Requests with Zapier',
            type: 'text',
            duration: '30 min',
            description: 'Step-by-step workflow automation for DIY stack',
            content: {
              sections: [
                {
                  heading: 'The Complete DIY Automation Workflow',
                  body: `This lesson walks you through building a complete review automation system using Zapier, JotForm, and Twilio.

**What You Will Build:**
1. Customer completes service → trigger
2. Satisfaction survey sent via SMS within 2 hours
3. Based on rating, smart routing:
   • 4-5 stars → Send review request
   • 1-3 stars → Send private feedback form
4. Follow-up reminder after 3 days if no action
5. All responses logged in Google Sheets

**Cost:** About $50-75/month (scales to unlimited clients)
**Setup Time:** 3-4 hours first time, 1 hour for subsequent clients
**Conversion Rate:** 15-18% leave reviews

Let us build it step by step.`
                },
                {
                  heading: 'Step 1: Create Satisfaction Survey in JotForm',
                  body: `**Create the Survey:**
1. Sign up for JotForm ($39/mo plan)
2. Create new form: "Customer Satisfaction Survey"
3. Add these fields:
   • Customer Name (text field)
   • Customer Phone (phone field, required)
   • Rating (1-5 scale widget)
   • Comments (text area, optional)
4. Set form to "Thank you" message after submission
5. Under Settings → Emails, disable confirmation email
6. Get your form URL

**Customize the Survey:**
• Use client branding (logo, colors)
• Keep it mobile-friendly (most will complete on phone)
• Question: "On a scale of 1-5, how was your experience with [Business Name]?"
• Make rating required, comments optional

**Get Your Webhook URL:**
1. Go to Settings → Integrations
2. Search for "Webhooks"
3. Copy the webhook URL (you will need this for Zapier)

**Test It:**
Fill out the survey yourself to make sure it works.`
                },
                {
                  heading: 'Step 2: Set Up Twilio for SMS',
                  body: `**Create Twilio Account:**
1. Sign up at twilio.com
2. Verify your phone number
3. Purchase a phone number ($1/month)
   • Choose a local number in client service area
   • Ensure it has SMS capability
4. Note your Account SID and Auth Token (you will need these)

**Fund Your Account:**
• SMS costs: $0.0075-0.02 per message
• Budget $20-30/month per active client
• 100 messages = $1-2

**Compliance:**
• Register your number (prevents being marked as spam)
• Add opt-out language: "Reply STOP to unsubscribe"
• Keep messages under 160 characters when possible

**Test Your Number:**
Send yourself a test SMS from Twilio dashboard to verify it works.`
                },
                {
                  heading: 'Step 3: Build the Zapier Workflow',
                  body: `**Zap 1: Survey Response to SMS Review Request (4-5 Stars)**

**Trigger:** JotForm - New Submission
• Connect your JotForm account
• Select your satisfaction survey form
• Test to ensure data flows correctly

**Filter:** Only Continue If...
• Rating is greater than or equal to 4
(This ensures only happy customers get review requests)

**Action 1:** Delay
• Delay for: 5 minutes
(Gives them time to finish the survey)

**Action 2:** Twilio - Send SMS
• To: {{Customer Phone}}
• From: Your Twilio number
• Message: "Hi {{Customer Name}}! Thanks for the 5-star rating! Would you mind sharing your experience on Google? It takes 60 seconds: [REVIEW LINK]"

**Test the Zap** with a sample 5-star submission.

---

**Zap 2: Survey Response to Private Feedback (1-3 Stars)**

**Trigger:** JotForm - New Submission
(Same form as above)

**Filter:** Only Continue If...
• Rating is less than or equal to 3

**Action 1:** Delay
• Delay for: 5 minutes

**Action 2:** Twilio - Send SMS
• To: {{Customer Phone}}
• From: Your Twilio number
• Message: "Hi {{Customer Name}}, we are sorry we did not meet your expectations. Would you mind sharing what went wrong so we can make it right? [PRIVATE FEEDBACK FORM LINK]"

**Action 3:** Send Email Notification (to client)
• To: client@email.com
• Subject: "Unhappy Customer Alert"
• Body: "{{Customer Name}} gave a rating of {{Rating}}. Comments: {{Comments}}"

This alerts the business owner immediately so they can address the issue.

---

**Zap 3: Follow-Up Reminder (3 Days Later)**

**Trigger:** Google Sheets - New Row
• Connect to your tracking spreadsheet
• Watch for new rows (these are survey responses)

**Filter:** Only Continue If...
• Rating >= 4
• Review Left = No
• Days Since Survey = 3

**Action:** Twilio - Send SMS
• Message: "Hi {{Customer Name}}, just following up! If you have 60 seconds, we would really appreciate your review: [REVIEW LINK]"

**Note:** This requires manual data entry initially. More advanced setups use webhooks to track if review was actually left.

---

**Zap 4: Log Everything to Google Sheets**

**Trigger:** JotForm - New Submission

**Action:** Google Sheets - Create Spreadsheet Row
• Spreadsheet: "Client Reviews Tracker"
• Row data:
  - Customer Name: {{Name}}
  - Phone: {{Phone}}
  - Rating: {{Rating}}
  - Date: {{Submission Date}}
  - Review Link Sent: (Yes/No based on rating)
  - Review Left: (manually update)

This gives you a dashboard to track performance.`
                }
              ],
              note: 'This DIY system takes 3-4 hours to set up the first time, but subsequent clients take only 1 hour. The cost savings over Podium ($3,000+ per year) pay for your time within 1-2 months.'
            }
          },
          {
            id: 'lesson-2-4',
            title: 'Review Widget Setup for Client Websites',
            type: 'text',
            duration: '20 min',
            description: 'Add social proof widgets that display latest reviews',
            content: {
              sections: [
                {
                  heading: 'Why Review Widgets Matter',
                  body: `Displaying reviews on a client website:
• Increases conversion rates by 15-20%
• Provides real-time social proof
• Shows the business is actively getting reviews
• Gives you another touchpoint with the client

**Options:**
1. Google Reviews Widget (free, various providers)
2. Birdeye/Podium built-in widget (if using those platforms)
3. Custom widget using Google Places API
4. Third-party widgets (EmbedSocial, Elfsight, etc.)

Most clients do NOT have this set up, so adding it provides instant visual value.`
                },
                {
                  heading: 'Option 1: Free Google Reviews Widget',
                  body: `**Using EmbedReviews.com (Free Plan):**

1. Go to embedreviews.com
2. Enter business Google Place ID
3. Customize appearance:
   • Number of reviews to show (5-10)
   • Layout (grid, slider, list)
   • Colors to match client website
   • Show/hide star ratings
4. Generate embed code
5. Copy the code snippet

**Installing on Client Website:**

**For WordPress:**
• Go to Appearance → Widgets
• Add "Custom HTML" widget
• Paste the embed code
• Place in sidebar or footer

**For Other Platforms:**
• Access website backend
• Find where you want reviews to appear
• Add HTML block
• Paste embed code

**Test:**
Visit the website and verify reviews are displaying correctly.

**Limitations of Free Plans:**
• May show "Powered by" branding
• Limited customization
• 50-100 review loads per month

For most small business clients, this is sufficient.`
                },
                {
                  heading: 'Option 2: Premium Widgets',
                  body: `**Elfsight Reviews Widget ($5-10/month):**

**Benefits:**
• No branding
• Auto-updates when new reviews come in
• Combine multiple platforms (Google + Facebook + Yelp)
• More layout options
• Better mobile responsive

**Setup:**
1. Sign up at elfsight.com
2. Choose "Google Reviews" app
3. Connect your Google Business Profile
4. Customize design
5. Get embed code
6. Install on client website

**Cost Structure:**
• $5/month for basic (up to 10,000 views)
• You can charge client $15-25/month for this add-on
• Or include in your Growth/Enterprise packages

**Other Options:**
• EmbedSocial ($29/mo, combines social + reviews)
• Tagembed ($18/mo, social media aggregator)
• Custom development using Google Places API (advanced)

**Best Practice:**
For clients paying $797+/month, include a premium widget. For budget clients, use free options.`
                }
              ],
              note: 'Adding a review widget to client websites provides instant visual proof of your work and increases perceived value of your service.'
            }
          },
          {
            id: 'lesson-2-5',
            title: 'Monthly Reporting Dashboard Setup',
            type: 'text',
            duration: '25 min',
            description: 'Create automated reports that prove your value every month',
            content: {
              sections: [
                {
                  heading: 'Why Monthly Reports Are Non-Negotiable',
                  body: `The #1 reason clients cancel reputation management services: "I forgot what you were doing for me."

Out of sight = out of mind = cancellation.

**Solution:** Send a detailed monthly report showing:
• Reviews gained this month
• Total review count (now vs. start)
• Average rating trend
• Response rate to reviews
• Comparison to competitors
• Next month goals

**Best Practice:**
• Send report first week of each month
• Include a summary paragraph in plain English
• Schedule a 10-minute check-in call (for Growth+ tiers)
• Ask for feedback or concerns

**Result:** Churn drops from 15-20% to 5-8% annually when you send consistent reports.`
                },
                {
                  heading: 'Building Your Report Template',
                  body: `**Option 1: Google Data Studio (Free)**

**Setup:**
1. Go to datastudio.google.com
2. Create new report: "Monthly Reputation Report"
3. Add client logo at top
4. Create sections:

**Section 1: Executive Summary**
• Text box with this month performance summary
• Example: "In March, we generated 18 new 5-star reviews, bringing your total to 67. Your average rating improved from 4.2 to 4.4 stars."

**Section 2: Reviews This Month**
• Scorecard: New Reviews (18)
• Scorecard: Total Reviews (67)
• Scorecard: Average Rating (4.4 stars)
• Bar chart: Reviews by platform

**Section 3: Trends**
• Time series chart: Reviews over time (last 6 months)
• Time series chart: Average rating over time

**Section 4: Competitor Comparison**
• Table showing:
  - Your Client: 67 reviews, 4.4 stars
  - Competitor A: 45 reviews, 4.1 stars
  - Competitor B: 52 reviews, 4.3 stars
  - Competitor C: 38 reviews, 4.0 stars

**Section 5: Review Highlights**
• Manually add 2-3 best reviews from this month
• Include customer name and review text

**Section 6: Goals for Next Month**
• Target: 15-20 new reviews
• Action items: None (system is automated)

**Save as PDF** and email to client.

**Time Required:** 15 minutes per client per month once template is built.`
                },
                {
                  heading: 'Option 2: Automated Reporting Tools',
                  body: `**If Using Podium or Birdeye:**
Both have built-in reporting. Just white-label it and send.

**If Using DIY Stack:**
Build reports using:
• Google Data Studio (free, manual data entry)
• AgencyAnalytics ($12-49/mo per client, automated)
• Whatagraph ($199/mo, unlimited clients)
• Custom solution using Google Sheets + Charts

**Recommendation:**
Start with Google Data Studio (free) for first 5-10 clients. Once you hit 15+ clients, invest in AgencyAnalytics or Whatagraph for automation.

**Time Savings:**
• Manual reporting: 15 min per client = 4 hours for 15 clients
• Automated reporting: 2 min per client = 30 min for 15 clients

At 15+ clients, automation pays for itself in saved time.`
                }
              ],
              note: 'Monthly reporting is the insurance policy against churn. Never skip it.'
            }
          },
          {
            id: 'lesson-2-6',
            title: 'Client Onboarding Checklist',
            type: 'checklist',
            duration: '10 min',
            description: 'Complete setup checklist for new clients',
            content: {
              tasks: [
                {
                  day: 'Day 1: Contract Signed',
                  items: [
                    'Receive signed contract and first payment',
                    'Send welcome email with timeline expectations',
                    'Request access to Google Business Profile (admin or owner)',
                    'Get list of customer contact info or CRM access',
                    'Schedule kickoff call within 24-48 hours'
                  ]
                },
                {
                  day: 'Day 2-3: Technical Setup',
                  items: [
                    'Create client account in review software (Podium/Birdeye/DIY)',
                    'Set up white-labeled client portal',
                    'Configure automated satisfaction surveys',
                    'Set up SMS/email review request workflows',
                    'Create Google review link and test it',
                    'Set up private feedback form for unhappy customers',
                    'Build monthly report template with client branding'
                  ]
                },
                {
                  day: 'Day 4-5: Training & Launch',
                  items: [
                    'Train client staff on asking for reviews (if manual component)',
                    'Send test review request to yourself to verify system works',
                    'Set up review widget on client website',
                    'Configure review response templates',
                    'Schedule first monthly review call',
                    'Send launch confirmation email to client',
                    'Begin monitoring for new reviews daily'
                  ]
                },
                {
                  day: 'Day 30: First Results Check',
                  items: [
                    'Count reviews generated in first 30 days',
                    'Send first monthly report',
                    'Conduct check-in call to gather feedback',
                    'Make any necessary adjustments to system',
                    'Ask for testimonial if client is happy',
                    'Request referrals to similar businesses'
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        id: 'module-3',
        title: 'Module 3: Sales & Client Acquisition',
        description: 'Master cold outreach, discovery calls, and closing deals',
        estimatedTime: '2 hours',
        lessons: [
          {
            id: 'lesson-3-1',
            title: 'The Bad Review Firefighter Cold Outreach Script',
            type: 'text',
            duration: '20 min',
            description: 'The proven email that gets 12-18% response rates',
            content: {
              sections: [
                {
                  heading: 'Why This Script Works',
                  body: `Most cold emails for reputation management say: "Want more reviews?"

The problem: Businesses know they need more reviews, but it is not urgent.

**The Bad Review Firefighter approach flips this:**
"I noticed you have a 1-star review from 3 months ago with no response. This is costing you customers every single day."

**Psychology:**
• Pain (bad review) > Gain (more reviews)
• Fear of loss > Desire for gain
• Urgency (happening now) > Future benefit

**Result:** 12-18% response rate vs. 2-4% for "want more reviews?" emails.`
                },
                {
                  heading: 'The Complete Email Template',
                  body: `**Subject Line Options (A/B test these):**
1. "Your 1-star review on Google"
2. "Question about [Business Name] reputation"
3. "Saw your Google reviews - quick question"
4. "[First Name], noticed an issue with your reviews"

**Email Body:**

Hi [First Name],

I was researching [Industry] businesses in [City] and came across [Business Name].

I noticed you have [X] reviews on Google with a [Y] star average. What caught my attention was a [1 or 2] star review from [Month] that hasn not been responded to.

This is a problem because:
• 89% of consumers read business responses to reviews
• No response signals you do not care about customer feedback
• That negative review is likely costing you 5-10 customers per month

I help [Industry] businesses like yours:
✓ Prevent negative reviews from being published (catch unhappy customers first)
✓ Generate 10-20 new 5-star reviews per month automatically
✓ Respond to all reviews professionally within 24 hours

Would you be open to a 15-minute call this week to discuss how we could help [Business Name] improve its online reputation?

[Your Name]
[Your Agency]
[Phone]

P.S. If you are not the right person to speak with about this, could you point me in the right direction?

---

**Why This Works:**

1. **Specific observation** (not generic)
2. **Identifies real problem** (the negative review)
3. **Quantifies impact** (5-10 customers/month)
4. **Offers solution** (prevention + generation)
5. **Low-commitment ask** (15 minutes, not "buy now")
6. **P.S. gives easy out** (reduces resistance)

**Expected Response Rate:** 12-18% will reply
**Of Those:** 50-60% will book a call
**Close Rate:** 30-40% of calls become clients

**Math:**
• Send 100 emails
• 15 responses
• 8 booked calls
• 3 new clients

At $797/month, that is $2,391/month in new recurring revenue from 100 emails.`
                },
                {
                  heading: 'Finding Businesses to Target',
                  body: `**Criteria for Good Prospects:**
1. In your chosen niche
2. Less than 25 Google reviews
3. Have at least 1 negative review (2 stars or lower)
4. No response to that negative review
5. Located in your service area

**How to Find Them:**

**Method 1: Google Maps Search**
1. Search "[Your Niche] near [City]"
2. Browse results and click each business
3. Check review count and recent reviews
4. Save businesses that meet criteria to spreadsheet

**Method 2: Scraping Tools**
• Outscraper.com ($10-30/month)
• LocalBusinessScraper ($49/month)
• Lets you export 100s of businesses with review data

**Method 3: Manual Research**
• Use Google Maps
• Check Facebook pages
• Look at Yelp listings
• Check industry directories

**Build Your List:**
Create spreadsheet with:
• Business Name
• Owner Name (if you can find it)
• Email Address
• Phone Number
• Current Review Count
• Average Rating
• Link to Bad Review (for reference)

**Goal:** Build list of 100-200 qualified prospects before starting outreach.

**Where to Find Email Addresses:**
• Business website contact page
• Hunter.io (finds email patterns)
• LinkedIn (look up owner/manager)
• Call and ask for "person who handles marketing"

**Time Required:** 2-3 hours to build list of 100 businesses.`
                }
              ],
              note: 'The Bad Review Firefighter approach works because it leads with a problem they have RIGHT NOW, not a future benefit.'
            }
          },
          {
            id: 'lesson-3-2',
            title: 'The Free Reputation Audit That Sells Itself',
            type: 'text',
            duration: '20 min',
            description: 'Create audits that demonstrate value and make the sale obvious',
            content: {
              sections: [
                {
                  heading: 'Why Free Audits Convert at 40%',
                  body: `Offering a free reputation audit accomplishes three things:
1. Gets prospects to respond (easier than asking for a call directly)
2. Forces you to research them (shows you care)
3. Provides tangible value before asking for money

**Conversion Rate:**
• Cold email asking for call: 2-4% book
• Cold email offering free audit: 12-18% respond, 40% of those become clients

**The Psychology:**
When you show someone specific problems with their reputation and quantify the cost, they cannot unsee it. The sale becomes obvious.`
                },
                {
                  heading: 'Building Your Audit Template',
                  body: `**Create Google Sheet Template:**

**Section 1: Business Overview**
• Business Name
• Industry
• Location
• Website
• Current Review Count (Google, Facebook, Yelp)
• Current Average Rating

**Section 2: Reputation Score (1-100)**
Calculate score based on:
• Review count (0-40 points)
  - <10 reviews = 10 points
  - 10-25 reviews = 20 points
  - 25-50 reviews = 30 points
  - 50+ reviews = 40 points
• Average rating (0-30 points)
  - <4.0 = 10 points
  - 4.0-4.3 = 20 points
  - 4.4+ = 30 points
• Review velocity (0-15 points)
  - <1/month = 5 points
  - 1-3/month = 10 points
  - 3+/month = 15 points
• Response rate (0-15 points)
  - <25% = 5 points
  - 25-75% = 10 points
  - 75%+ = 15 points

**Section 3: Competitor Analysis**
Table with 3 competitors showing:
• Business Name
• Review Count
• Average Rating
• Latest Review Date
• Response Rate

**Section 4: Opportunity Calculation**
"Based on industry data, businesses with 50+ reviews earn 54% more revenue than average. Your current revenue estimate: $X. Potential with improved reputation: $Y. Opportunity: $Z."

**Section 5: Specific Issues Found**
• Negative reviews without responses (list them)
• Low review velocity (last review was X days ago)
• Competitor advantages (Competitor A has 3x more reviews)

**Section 6: Recommended Action Plan**
• Goal: Reach 50+ reviews in 90 days
• Strategy: Automated review generation system
• Expected: 15-20 new reviews per month
• Investment: [Your pricing]

Make it visual with color coding (red=problems, yellow=opportunity, green=strengths).`
                },
                {
                  heading: 'Presenting the Audit on Discovery Calls',
                  body: `**Walk Through Structure (15 minutes):**

**Minutes 1-2: Overview**
"I put together this audit showing where [Business] stands compared to competitors in [City]. Can you see my screen?"

**Minutes 3-5: The Bad News**
"Here is what I found: You have only [X] reviews while your main competitor has [Y]. This means when people search for [service], they are more likely to trust them."

**Minutes 6-8: The Cost**
"Let me show you what this is costing you. Based on search volume and conversion data, that reputation gap is likely costing you 5-10 customers per month. At your average transaction value of $[X], that is $[Y] in lost revenue annually."

**Minutes 9-12: The Solution**
"The good news: This is completely fixable. Here is what we do..." [Explain system]

**Minutes 13-15: Next Steps**
"Based on what I am seeing, I would recommend our [Growth Package] at $797/month. This would get you to 50+ reviews in 90 days. Does that make sense for your business?"

**Key Phrases:**
• "As you can see..." (makes audit visual and obvious)
• "This is costing you..." (quantifies pain)
• "The good news..." (positions you as solution)
• "Does that make sense?" (soft close)

The audit does most of the selling for you.`
                }
              ],
              note: 'A well-researched audit is worth more than any sales pitch. The data speaks for itself.'
            }
          },
          {
            id: 'lesson-3-3',
            title: 'Discovery Call Script',
            type: 'text',
            duration: '25 min',
            description: 'Complete call structure from introduction to close',
            content: {
              sections: [
                {
                  heading: 'The 5-Part Call Framework',
                  body: `**Part 1: Introduction (2 minutes)**
Build rapport and set agenda

"Hi [Name], thanks for taking the time. I have about 15-20 minutes blocked out. My plan is to learn about your business, share what I found in your reputation audit, and if it makes sense, discuss how we might work together. Sound good?"

**Part 2: Discovery Questions (5 minutes)**
Understand their situation and pain points

**Part 3: Present Audit (8 minutes)**
Show findings and quantify opportunity

**Part 4: Present Solution (3 minutes)**
Explain your service and pricing

**Part 5: Close (2 minutes)**
Ask for the sale or next steps

Total: 20 minutes (leave buffer for questions)`
                },
                {
                  heading: 'The 15 Discovery Questions',
                  body: `Ask these to qualify and understand their needs:

**Business Understanding:**
1. "Tell me about your business - how long have you been operating?"
2. "What is your average customer worth to you?"
3. "How many new customers do you need per month to hit your goals?"

**Current Situation:**
4. "Are you currently doing anything to generate reviews?"
5. "What has been your experience with online reviews so far?"
6. "Have you dealt with negative reviews before?"

**Pain Points:**
7. "What made you interested in talking today?"
8. "How important is your online reputation to getting new customers?"
9. "What happens if nothing changes with your current review situation?"

**Decision Process:**
10. "Who else is involved in making marketing decisions?"
11. "What is your timeline for addressing this?"
12. "Have you worked with reputation management companies before?"

**Budget:**
13. "What is your monthly marketing budget?"
14. "How much are you spending to acquire each customer currently?"
15. "If we could generate 15-20 reviews per month, what would that be worth to you?"

**Red Flags to Watch For:**
• "I need to think about it" (not urgent enough)
• "We will do it ourselves" (not sold on value)
• "We do not have budget" (wrong prospect)
• Multiple decision makers not on call (will delay close)

**Green Lights:**
• "This is exactly what we need"
• "When can we start?"
• "How does payment work?"
• Asking detailed questions about implementation`
                },
                {
                  heading: 'Positioning Your Solution',
                  body: `After presenting the audit, transition to solution:

"So here is how we fix this for [Business Name]:

**Step 1: Automated System**
We set up an automated review generation system that sends requests via text and email within 24 hours of service completion. This generates 15-20 new reviews per month on autopilot.

**Step 2: Smart Filtering**
Before sending anyone to Google, we ask them to rate their experience privately. Happy customers (4-5 stars) get sent to leave public reviews. Unhappy customers get routed to a private feedback form so you can fix issues before they post publicly.

**Step 3: Review Response**
We respond to every review within 24 hours - thanking happy customers and addressing concerns from unhappy ones professionally.

**Step 4: Monthly Reporting**
You get a detailed report showing reviews gained, rating trends, and competitive positioning.

**Timeline:**
We can have you live in 5-7 days. You will see your first new reviews within 2 weeks, and by day 90 you should have 40-50+ total reviews.

**Investment:**
Based on your transaction volume [X customers/month], I recommend our [Growth Package] at $797/month.

Here is the math: If this system brings you just 2-3 additional customers per month, it pays for itself. Everything beyond that is pure profit.

Does that make sense for where you want to take [Business Name]?"

**Pause and wait for response.**

Most will either say yes, ask questions, or raise objections. Be ready for all three.`
                }
              ],
              note: 'The discovery call is not about pitching. Ask questions, listen, and let the audit data do the selling.'
            }
          },
          {
            id: 'lesson-3-4',
            title: 'Objection Handling Master Guide',
            type: 'text',
            duration: '20 min',
            description: 'Word-for-word responses to the 12 most common objections',
            content: {
              sections: [
                {
                  heading: 'The 12 Common Objections',
                  body: `**Objection 1: "That seems expensive"**

Response: "I understand. Let me put it in perspective. You told me you need about [X] new customers per month. If this system brings you just 2-3 additional customers, it pays for itself. Everything beyond that is profit. Based on what I showed you in the audit, you are currently losing 5-10 customers per month due to your reputation gap. This is not an expense - it is an investment that prevents that loss. Does that make sense?"

---

**Objection 2: "We will do it ourselves"**

Response: "That makes sense, and technically you could. Here is what that looks like: You need to set up the software, build the automations, monitor reviews daily, respond to every review within 24 hours, and generate monthly reports. Most business owners find this takes 10-15 hours per month to do correctly. At your hourly rate of $[X], that is $[Y] per month in opportunity cost. Our service is $797 and we handle everything. It is actually less expensive to have us do it. Plus, you get our expertise - we have done this for [X] businesses and know what works."

---

**Objection 3: "Let me think about it"**

Response: "Of course! What specifically do you need to think about? Is it the investment, the timeline, or something about the system itself?"

[Wait for answer, then address specific concern]

"While you are thinking it over, can I ask: What happens if you wait another 3-6 months? Based on what I showed you, that is 100+ potential customers choosing your competitors instead of you. The cost of inaction is often higher than the cost of action."

---

**Objection 4: "I need to talk to my partner/spouse"**

Response: "Absolutely - this is an important decision. To make sure you have all the information to discuss it, what questions do you think they will have?"

[Answer those questions now]

"Would it make sense to schedule a quick 10-minute call with both of you so I can answer any questions directly? That way you can make a confident decision together. I have time [tomorrow/day after] - does that work?"

---

**Objection 5: "We tried this before and it did not work"**

Response: "I am glad you brought that up. What specifically did not work? Was it the volume of reviews, the quality, the cost?"

[Listen to their answer]

"Here is how we are different: [Address their specific pain point]. Plus, I am confident enough in our system that I can commit to [specific result] in the first 60 days. If we do not hit that, we can part ways. Fair enough?"

---

**Objection 6: "We do not have budget right now"**

Response: "I understand budget constraints. Let me ask: If you could generate 2-3 additional customers per month from better reviews, what would that revenue look like?"

[They give number]

"So the system would generate $[X] in new revenue while costing $797. That is a positive ROI from month one. The question is not whether you have budget - it is whether you can afford NOT to do this. When would budget free up?"

[If they say never, they are not a qualified prospect - move on]`
                },
                {
                  heading: 'Advanced Objection Handling',
                  body: `**Objection 7: "Can you guarantee results?"**

Response: "Great question. Here is what I can guarantee: I guarantee we will set up the system, send review requests to your customers, respond to all reviews within 24 hours, and provide monthly reporting. What I cannot guarantee is how many of your customers will actually leave reviews - that depends on their experience with your service. However, based on our data from [X] similar businesses, you should see 15-20 new reviews per month. If after 60 days you are not seeing results, we can discuss adjusting the approach or parting ways. Fair?"

---

**Objection 8: "I only want to pay for results"**

Response: "I appreciate that mindset. The challenge is we are setting up systems, monitoring reviews daily, and responding to feedback regardless of volume. Here is what I can do: Our Starter package is $497/month. If after the first month you are not seeing results, you can cancel. But I am confident you will see 8-12 reviews in the first 30 days. Does that give you enough security to move forward?"

---

**Objection 9: "What if we get negative reviews?"**

Response: "Actually, that is exactly what our system prevents. We use a satisfaction filter - before anyone goes to Google, they rate their experience privately first. Happy customers (4-5 stars) get sent to leave public reviews. Unhappy customers (1-3 stars) get a private feedback form where you can address issues before they post publicly. This prevents about 70% of potential negative reviews. The ones that do come in, we help you respond to professionally within 24 hours. Most consumers actually trust businesses MORE when they see professional responses to negative feedback."

---

**Objection 10: "We are not tech savvy"**

Response: "Perfect - that is exactly why we built this service. You do not need to be tech savvy at all. We handle 100% of the technical setup. On your end, you just need to provide us access to your Google Business Profile and your customer contact list. Everything else is automated. Your only job is to continue providing great service - we handle getting those customers to leave reviews."

---

**Objection 11: "How do I know this is not a scam?"**

Response: "Completely fair question, especially with all the questionable services out there. Let me give you some transparency: [Show your website, testimonials, case studies]. I can also connect you with [X] current clients who can speak to their experience. Additionally, we use standard month-to-month agreements - no long-term contracts. If you are not happy after 30 days, you can cancel. I only make money if I deliver results, so I am incentivized to make this work for you."

---

**Objection 12: "Is this legal/ethical?"**

Response: "Excellent question - a lot of people are confused about this. What we do is 100% compliant with Google, FTC, and all review platform policies. We are NOT buying fake reviews, incentivizing reviews with payment, or posting reviews ourselves. We are simply asking real customers who had real experiences to share honest feedback. The satisfaction filter we use is legal because we are not preventing anyone from leaving a review - we are just catching service issues before they go public. This is considered a best practice in reputation management."

**Universal Response Framework:**

When you get an objection you have not heard before:

1. **Acknowledge**: "That is a great question/concern"
2. **Clarify**: "Help me understand - specifically, what about [X] concerns you?"
3. **Address**: Give specific, data-backed response
4. **Check**: "Does that address your concern?"
5. **Advance**: "So if we can solve [objection], are you ready to move forward?"

Never argue. Never get defensive. Treat every objection as a valid concern that deserves a thoughtful answer.`
                }
              ],
              note: 'Objections are not rejections - they are requests for more information. Handle them confidently and you will close more deals.'
            }
          },
          {
            id: 'lesson-3-5',
            title: 'Proposal and Contract Templates',
            type: 'text',
            duration: '15 min',
            description: 'Professional documents that close deals',
            content: {
              sections: [
                {
                  heading: 'One-Page Proposal Template',
                  body: `**Proposal Structure:**

**REPUTATION MANAGEMENT PROPOSAL**
Prepared for: [Business Name]
Prepared by: [Your Agency]
Date: [Date]

---

**EXECUTIVE SUMMARY**

Based on our conversation and reputation audit, [Business Name] currently has [X] Google reviews with a [Y] star average. Your main competitors average [Z] reviews, putting you at a competitive disadvantage.

Our goal: Increase your Google reviews to 50+ in 90 days through automated review generation, smart filtering, and professional review response.

---

**THE PROBLEM**

• Current review count: [X] (below industry average)
• Review velocity: [Y] per month (should be 15-20)
• Last review: [Z] days ago (appears inactive)
• Estimated lost revenue: $[A] per month

---

**THE SOLUTION**

Our Reputation Management System includes:

1. Automated Review Generation
   • SMS and email review requests
   • Sent within 24 hours of service
   • Expected: 15-20 reviews/month

2. Negative Review Prevention
   • Satisfaction filter catches unhappy customers first
   • Private feedback loop for service recovery
   • Prevents 70% of potential negative reviews

3. Professional Review Response
   • All reviews answered within 24 hours
   • Builds trust and engagement
   • Turns detractors into advocates

4. Monthly Performance Reporting
   • Review count growth
   • Rating trends
   • Competitive analysis

---

**INVESTMENT OPTIONS**

[Include your 3 pricing tiers here with checkboxes]

---

**TIMELINE**

• Week 1: Setup and integration
• Week 2: System launch and first reviews
• Week 4: First monthly report
• Day 90: Target of 50+ total reviews

---

**NEXT STEPS**

To move forward:
1. Review and sign service agreement
2. Complete payment setup
3. Provide access to Google Business Profile
4. Schedule onboarding call

Questions? Call me at [Phone] or email [Email].

---

Looking forward to helping [Business Name] dominate online reputation in [City]!

[Your Name]
[Your Title]
[Your Agency]`
                },
                {
                  heading: 'Service Agreement Template',
                  body: `**REPUTATION MANAGEMENT SERVICE AGREEMENT**

This agreement is between [Your Agency LLC] ("Agency") and [Client Business Name] ("Client").

**SERVICES PROVIDED**

Agency will provide the following services:
• Automated review generation system setup and management
• Review monitoring across Google, Facebook, and Yelp
• Professional response to all reviews within 24 hours
• Monthly performance reporting
• Satisfaction survey and smart routing implementation

**TERM AND PAYMENT**

• Service begins: [Date]
• Monthly fee: $[Amount]
• Billing cycle: Monthly, in advance
• Payment method: Credit card on file
• First payment due: Upon signing
• Subsequent payments: 1st of each month

**TERM AND TERMINATION**

• This is a month-to-month agreement
• Either party may terminate with 30 days written notice
• No refunds for partial months
• Setup fees (if applicable): Non-refundable

**CLIENT RESPONSIBILITIES**

Client agrees to:
• Provide access to Google Business Profile (admin level)
• Provide customer contact information or CRM access
• Continue providing quality service to customers
• Respond to urgent customer service issues flagged by Agency

**AGENCY RESPONSIBILITIES**

Agency agrees to:
• Set up and maintain automated review system
• Monitor and respond to reviews within 24 hours
• Provide monthly performance reports
• Maintain system uptime and functionality

**EXPECTED RESULTS**

While Agency cannot guarantee specific outcomes, typical clients see:
• 12-20 new reviews per month
• 4.0+ star average rating maintenance
• 80%+ review response rate

Actual results depend on client customer volume and satisfaction.

**LIMITATION OF LIABILITY**

Agency is not liable for:
• Negative reviews from legitimately dissatisfied customers
• Google or platform policy changes affecting reviews
• Customer non-response to review requests
• Results below expectations due to low customer satisfaction

**CONFIDENTIALITY**

Both parties agree to keep proprietary information confidential.

**ENTIRE AGREEMENT**

This agreement constitutes the entire understanding between parties and supersedes all prior agreements.

---

**SIGNATURES**

Client:
Name: ___________________
Title: ___________________
Signature: ___________________
Date: ___________________

Agency:
Name: ___________________
Title: ___________________
Signature: ___________________
Date: ___________________

---

**Use DocuSign or PandaDoc for e-signatures.**`
                },
                {
                  heading: 'Credit Card Authorization Form',
                  body: `**CREDIT CARD AUTHORIZATION FORM**

I authorize [Your Agency] to charge my credit card for reputation management services.

**Billing Information:**
Business Name: ___________________
Cardholder Name: ___________________
Billing Address: ___________________
City, State, ZIP: ___________________
Phone: ___________________
Email: ___________________

**Credit Card Information:**
Card Type: [ ] Visa [ ] Mastercard [ ] Amex [ ] Discover
Card Number: ___________________
Expiration Date: ___________________
CVV: ___________________

**Authorization:**
Monthly Amount: $___________________
Recurring: [ ] Yes [ ] No
Start Date: ___________________

I authorize [Your Agency] to charge the above credit card for monthly services as outlined in the Service Agreement. I understand that my information will be saved on file for future transactions on my account.

Signature: ___________________
Date: ___________________

---

**Alternative: Use Stripe Payment Links**

For easier setup, create Stripe payment links for each pricing tier:
• Starter: $497/month recurring
• Growth: $797/month recurring
• Enterprise: $1,297/month recurring

Send link in proposal. Client clicks, enters card, and billing is automated. Much easier than manual forms.`
                }
              ],
              note: 'Professional documentation builds trust and makes the buying process friction-free. Never do deals on handshakes alone.'
            }
          },
          {
            id: 'lesson-3-6',
            title: 'Closing Techniques',
            type: 'text',
            duration: '20 min',
            description: 'How to confidently ask for the sale',
            content: {
              sections: [
                {
                  heading: 'The Assumptive Close',
                  body: `**When to Use:** High-intent prospects who have asked detailed questions and seem ready.

**How It Works:**
You assume they are buying and move directly to implementation details.

**Example:**
"Great! So let me walk you through what happens next. First, I will send over the service agreement for you to review and sign. Once I get that back, I will set up your account and schedule our onboarding call for [day/time]. We can have you live by [date]. Does Monday or Wednesday work better for our kickoff?"

**Key Phrases:**
• "Let me walk you through next steps..."
• "Once I get your signature..."
• "When we go live next week..."
• "Your first report will come on..."

You never explicitly asked "do you want to buy?" - you just moved forward as if they already decided. If they are truly ready, they will say "yes" or "sounds good." If not, they will stop you and raise an objection (which you can then handle).

**Success Rate:** 60-70% with qualified, high-intent prospects.`
                },
                {
                  heading: 'The Alternative Close',
                  body: `**When to Use:** Prospects who seem interested but hesitant or overwhelmed by decisions.

**How It Works:**
Give them a choice between two yeses (not yes/no).

**Example:**
"Based on what you have told me, I think either the Starter package at $497 or the Growth package at $797 would work well for you. The main difference is Growth includes monitoring 5 platforms instead of 2, plus quarterly competitive audits. Which one feels like a better fit for where you want to take the business?"

**Other Examples:**
• "Would you prefer to start on the 1st or the 15th?"
• "Should I set up your onboarding call for Tuesday morning or Thursday afternoon?"
• "Do you want to start with just Google reviews, or add Facebook and Yelp from day one?"

**Key Principle:**
You are not asking IF they want to buy. You are asking HOW they want to buy.

**Success Rate:** 50-60% with interested but indecisive prospects.`
                },
                {
                  heading: 'The Summary Close',
                  body: `**When to Use:** Long calls with lots of information discussed. Prospect seems interested but is not committing.

**How It Works:**
Summarize everything they agreed was important, then ask directly.

**Example:**
"Let me recap what we have covered:

• You said your main goal is to compete better with [Competitor X] who has 80 reviews
• You agreed that negative reviews without responses are hurting your conversion
• You told me 2-3 extra customers per month would make this worth it
• And you confirmed budget is not an issue if the ROI makes sense

Based on all that, our Growth package at $797/month would accomplish those goals and generate 15-20 reviews monthly. That should get you past your competitor in 90 days and bring in the additional customers you need.

Does it make sense to move forward?"

**Pause and wait for answer.**

This forces them to confront their own stated needs and either commit or explain why those needs are not actually priorities.

**Success Rate:** 40-50% (works on "fence sitters")`
                },
                {
                  heading: 'The Trial Close',
                  body: `**When to Use:** Throughout the conversation to gauge interest before going for final close.

**How It Works:**
Ask non-committal questions to test their temperature.

**Examples:**
• "How does this sound so far?"
• "Does this approach make sense for your business?"
• "Can you see this working for you?"
• "What questions do you have?"

If they say "yes, this makes sense" or "I can see this working," you know they are warming up. If they say "I am not sure" or have lots of questions, keep selling.

**Lead Into Final Close:**
After several positive trial closes, go for the final close:

"It sounds like you see how this would work for [Business Name]. Should we get you set up?"

**Success Rate:** Not a standalone close, but increases success of final close by 20-30%.`
                },
                {
                  heading: 'Handling The Final Push',
                  body: `**What to Do After You Ask for the Sale:**

1. **Stop Talking**
   After you ask "Does it make sense to move forward?" - STOP. Do not fill the silence. Wait for them to respond. The first person to speak loses.

2. **Listen to Their Response**
   • "Yes" → Great! Move to paperwork
   • "Let me think about it" → Handle objection
   • "I have a question..." → Answer, then ask again
   • "No" → "Can I ask what is holding you back?"

3. **Do Not Get Discouraged**
   Even great closers only close 30-40% of qualified prospects on first call. The rest need follow-up.

4. **Always Get Next Steps**
   If they do not buy now:
   • "When should I follow up?"
   • "What specific information do you need?"
   • "Can I send you [case study/testimonial]?"

Never leave a call without a defined next action.

**Confidence is Key:**
If you sound unsure when asking for the sale, they will be unsure about buying. Practice your close until it sounds natural and confident.`
                }
              ],
              note: 'Closing is not manipulation - it is helping qualified prospects make a decision that benefits their business. Ask confidently.'
            }
          },
          {
            id: 'lesson-3-7',
            title: 'Follow-Up Sequence',
            type: 'text',
            duration: '15 min',
            description: 'Multi-touch follow-up that converts indecision into sales',
            content: {
              sections: [
                {
                  heading: 'The 7-Touch Follow-Up Sequence',
                  body: `Most sales happen on follow-up, not on the first call. Here is the sequence:

**Touch 1: Same Day (Email)**
Sent within 2 hours of call

Subject: "Great talking today, [Name]"

Body:
"Hi [Name],

Thanks for taking the time to chat today. As promised, I am attaching your reputation audit and our proposal.

Quick recap:
• Your current situation: [X] reviews, [Y] star average
• Our recommendation: [Package name]
• Expected outcome: 40-50 reviews in 90 days
• Investment: $[Amount]/month

If you have any questions, just reply to this email or call me at [Phone].

Looking forward to working with you!

[Your Name]"

---

**Touch 2: Day 3 (Email)**
If no response after 3 days

Subject: "Quick follow-up - [Business Name] reputation"

Body:
"Hi [Name],

Just following up on our conversation from [Day]. I wanted to make sure you received the proposal and answer any questions that came up.

One thing I forgot to mention: We are onboarding [X] new clients this month and only have [Y] spots left. I would hate for you to miss out if this is something you want to move forward with.

Let me know if you want to grab one of those spots or if you need anything else from me.

[Your Name]"

---

**Touch 3: Day 7 (Call + Voicemail)**
Pick up the phone

Voicemail script:
"Hey [Name], it is [Your Name] from [Your Agency]. Just wanted to check in on the reputation management proposal I sent over last week. I know you are busy, so I will shoot you a quick email with some additional information. Talk soon!"

Immediately send email referencing the voicemail.

---

**Touch 4: Day 10 (Value Email)**
Provide case study or testimonial

Subject: "Thought you might find this interesting"

Body:
"Hi [Name],

I was just reviewing results for one of our clients in [similar industry] and thought you would find this interesting:

[Client Name] started with 12 reviews in January. After 90 days with our system, they now have 64 reviews and a 4.6-star average. They are telling us their phone is ringing 30% more than before.

I attached their full case study if you want to see the details.

This is exactly what we would do for [Business Name]. Let me know if you want to chat more about it.

[Your Name]"

---

**Touch 5: Day 14 (Break-Up Email)**
Create urgency with finality

Subject: "Should I close your file?"

Body:
"Hi [Name],

I have not heard back from you, so I wanted to check in one last time before I close your file.

If reputation management is not a priority right now, no worries at all - I totally understand.

But if you are still interested and just have not had time to circle back, let me know. I would hate to close your file if this is actually something you want to do.

Either way, thanks for your time!

[Your Name]"

This often gets responses because it creates FOMO (fear of missing out).

---

**Touch 6: Day 30 (Re-Engagement)**
If they responded but went quiet again

Subject: "Checking in"

Body:
"Hi [Name],

It has been about a month since we last talked. Wanted to see if anything has changed on your end?

I am still here if you want to move forward with improving [Business Name] online reputation.

Just let me know!

[Your Name]"

---

**Touch 7: Day 90 (Final Check-In)**
Long-term nurture

Subject: "Quick question"

Body:
"Hi [Name],

It has been a few months since we talked about reputation management for [Business Name].

Quick question: Did you end up finding a solution, or is this still something you want to address?

If you are still interested, I would be happy to update your audit and show you current standings vs. competitors.

Let me know!

[Your Name]"

After this, add them to quarterly newsletter/nurture campaign.`
                },
                {
                  heading: 'Follow-Up Best Practices',
                  body: `**Timing:**
• Email: Morning (8-10am) or late afternoon (4-6pm)
• Calls: Tuesday-Thursday, 10am-4pm (avoid Mondays/Fridays)
• Never follow up on weekends

**Tone:**
• Helpful, not pushy
• Assume they are busy, not uninterested
• Provide value in every touch (case study, tip, insight)

**Persistence:**
• 80% of sales happen between touch 5-12
• Most salespeople give up after 1-2 touches
• You win by being professionally persistent

**When to Stop:**
• They explicitly say "not interested"
• They ask you to stop contacting them
• After 7 touches with zero response
• They bought from a competitor

**Tracking:**
Use CRM or spreadsheet to track:
• Prospect name
• Last contact date
• Next touch due
• Touch count
• Status (interested/thinking/dead)

Never rely on memory - you will forget to follow up.`
                }
              ],
              note: 'The fortune is in the follow-up. Most prospects do not say no - they just get busy. Your job is to stay top of mind.'
            }
          },
          {
            id: 'lesson-3-8',
            title: 'Referral Generation System',
            type: 'text',
            duration: '15 min',
            description: 'Turn happy clients into your best salespeople',
            content: {
              sections: [
                {
                  heading: 'When to Ask for Referrals',
                  body: `**Timing is Everything:**

**Too Early (Days 1-30):**
Client has not seen results yet. Asking now seems presumptuous.

**Too Late (12+ months):**
The excitement has worn off. They have forgotten how big a difference you made.

**Perfect Time (Days 60-90):**
Client has seen 20-40 new reviews appear. Results are undeniable and excitement is high.

**The Trigger:**
Wait until you have a particularly strong month. Then, during your monthly check-in call:

"[Name], I am so excited to share this month results with you. You gained 22 new reviews and your average rating went from 4.2 to 4.5 stars. You are now ranking #2 in [City] for your category. How does that feel?"

[Let them express excitement]

"I love hearing that! Question: Do you know any other [industry] business owners who need help with their reputation like you did 90 days ago?"

Most will offer 1-2 names on the spot.`
                },
                {
                  heading: 'The 4-Part Referral Request',
                  body: `**Part 1: Establish Success**
"You started with 15 reviews and now you have 62. That is massive progress."

**Part 2: Acknowledge Their Role**
"Of course, this only works because you are providing great service. We just amplified it."

**Part 3: The Ask**
"I am trying to help more [industry] businesses like yours. Do you know anyone in your network who needs better reviews?"

**Part 4: Make It Easy**
"No pressure at all - just if someone comes to mind, feel free to connect us. I will take good care of them."

**Alternative Ask (More Direct):**
"Who is the best [industry] business owner you know? I would love to help them like I helped you."

**What NOT to Say:**
✗ "Can you refer me to people?"
✗ "Do you know anyone who needs reviews?"
✗ "Will you give me referrals?"

These are vague and put pressure on them.

**What TO Say:**
✓ "Who is the best [industry owner] you know?"
✓ "Do you know anyone struggling with negative reviews?"
✓ "Who in your network should I be talking to?"

These are specific and make them think of actual people.`
                },
                {
                  heading: 'Referral Incentive Structures',
                  body: `**Option 1: Discount for Referrer**
"For every person you refer who becomes a client, I will give you $100 off your next month of service."

**Pros:** Simple, immediate benefit to referrer
**Cons:** Reduces your revenue

---

**Option 2: Cash Payment**
"For every person you refer who becomes a client, I will send you a $200 Visa gift card."

**Pros:** Direct monetary value, attractive incentive
**Cons:** Comes out of your pocket

---

**Option 3: Recurring Commission**
"For every person you refer who becomes a client, you receive 10% of their monthly fee for as long as they remain a client."

**Pros:** Ongoing passive income for referrer, incentivizes quality referrals
**Cons:** More complex to track and pay

---

**Option 4: No Monetary Incentive**
Just ask without offering payment.

**Pros:** No cost to you, keeps margins high
**Cons:** May get fewer referrals

**My Recommendation:**
Start with Option 4 (no incentive). Great clients will refer you because they love your work, not because of money. If you are not getting referrals organically after 90 days, add Option 1 or 2 as a structured incentive.

**For Option 3 (Recurring Commission):**
This works great for "unofficial partners" - people who can send you lots of referrals:
• Web designers
• SEO agencies
• Marketing consultants
• Business coaches

Offer them 10-15% recurring for every client they send. This creates an ongoing income stream for them and consistent leads for you.`
                },
                {
                  heading: 'Making Referrals Effortless',
                  body: `**Provide a Referral Link:**
Create a simple landing page: youragency.com/referred-by-[clientname]

Give this link to clients: "Just send this link to anyone who asks about what we do for you. It has all the info and they can book a call directly."

Track conversions from each client.

---

**Write the Introduction for Them:**
Make it copy-paste easy.

"Hey [Name], here is a quick intro you can send:

'Hey [Referral Name], I wanted to introduce you to [Your Name] from [Your Agency]. They have been helping us with our online reputation and it has made a huge difference. We went from 12 reviews to 50+ in just 90 days. I think they could help you too. Here is the link to learn more: [URL].'

Feel free to customize that however you want!"

---

**Provide a Referral Card:**
Design a simple business card that says:

"[Client Name] recommends [Your Agency] for reputation management.

Get 20+ five-star reviews per month on autopilot.

Schedule free audit: [URL]"

Give clients 25-50 cards to hand out at networking events.

---

**Create a Referral Program Page:**
Simple webpage explaining your referral program:
• How it works
• What they get for referring
• Who is a good fit
• How to make a referral

Link: youragency.com/referrals

The easier you make it, the more referrals you will get.`
                }
              ],
              note: 'Referrals are the highest-quality leads you can get. They close faster, pay more, and stay longer than cold prospects. Build a system for generating them.'
            }
          }
        ]
      },
      {
        id: 'module-4',
        title: 'Module 4: Fulfillment & Client Onboarding',
        description: 'Deliver exceptional results and keep clients happy long-term',
        estimatedTime: '2.5 hours',
        lessons: [
          {
            id: 'lesson-4-1',
            title: 'First 48 Hours Onboarding Process',
            type: 'text',
            duration: '20 min',
            description: 'How to start every client relationship on the right foot',
            content: {
              sections: [
                {
                  heading: 'The Critical First Impression',
                  body: `The first 48 hours after a client signs set the tone for the entire relationship.

**What clients are thinking:**
• "Did I make the right decision?"
• "Are they actually going to deliver?"
• "Should I have shopped around more?"

This is called "buyer remorse" and it happens to 60-70% of new customers.

**Your Goal:**
Make them feel confident, informed, and excited within the first 2 days.

**The 48-Hour Timeline:**

**Hour 1:** Confirmation email sent
**Hour 4:** Welcome packet delivered
**Hour 24:** Kickoff call scheduled
**Hour 48:** System setup complete

By hour 48, they should feel like they made the best decision ever.`
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
