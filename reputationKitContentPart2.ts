// Extended content for Reputation Engine Kit - Modules 2-6
// This file contains additional lessons that expand the kit into a premium $699 course

export const REPUTATION_KIT_EXTENDED_LESSONS = {
  module2AdditionalLessons: [
    {
      id: 'lesson-2-2',
      title: 'White-Label Setup: Making It Look Like YOUR Software',
      type: 'text',
      duration: '25 min',
      description: 'Step-by-step guide to white-labeling review software with your branding',
      content: {
        sections: [
          {
            heading: 'Why White-Labeling Matters',
            body: `When clients see "Powered by Podium" or "Birdeye Dashboard," they realize you're a reseller. This can:
• Make clients question your pricing
• Make them think they can go direct and cut you out
• Reduce your perceived value
• Weaken your position as an expert

**The Solution:** White-label everything so it looks like YOUR proprietary software.

**What This Achieves:**
✓ Clients see your brand everywhere
✓ You're positioned as the software creator (not just a reseller)
✓ Clients are less likely to price shop
✓ You can charge premium pricing with confidence
✓ Creates vendor lock-in (they can't easily replicate your system)`
          },
          {
            heading: 'White-Labeling Podium (Step-by-Step)',
            body: `**Step 1: Set Up Your Agency Subdomain**
1. Register domain: youragencyname.com
2. Create subdomain: app.youragencyname.com
3. In Podium partner portal, add your custom domain
4. Update DNS records (CNAME) to point to Podium servers

**Step 2: Customize Branding**
1. Upload your logo (300x80px recommended)
2. Set primary brand color (use your agency's color)
3. Customize email templates with your branding
4. Update SMS sender name to your business name

**Step 3: Custom Email Domain**
1. Set up support@youragencyname.com
2. Configure all system emails to come from your domain
3. Update email signatures with your contact info
4. Disable "Powered by Podium" footer

**Step 4: Client Portal Customization**
1. Remove all Podium branding from client dashboard
2. Add your agency's help documentation links
3. Customize navigation menu with your terminology
4. Set up your own support portal link

**Step 5: Mobile App (If Applicable)**
Some tools allow white-label mobile apps:
1. Submit app to your Apple/Google Play developer account
2. Use your branding and icon
3. Clients download YOUR app (not Podium's)

**Result:** Clients see ZERO Podium branding. It's all yours.`
          },
          {
            heading: 'White-Labeling Birdeye (Step-by-Step)',
            body: `Birdeye's white-label is even more comprehensive:

**Step 1: Partner Portal Setup**
1. Sign up for Birdeye Partner Program (requires 3+ clients)
2. Get assigned a dedicated partner success manager
3. Access white-label configuration panel

**Step 2: Complete Rebrand**
1. Upload logo, favicon, and brand colors
2. Customize login page with your background image
3. Set up custom subdomain: clients.youragencyname.com
4. Configure all email communications with your branding

**Step 3: Custom Reporting**
1. Design custom report templates with your logo
2. Remove all Birdeye references from PDF reports
3. Add your contact information to footers
4. Customize chart colors to match your brand

**Step 4: API Integration (Advanced)**
If you want to go further:
1. Build custom dashboard using Birdeye's API
2. Pull data into your own interface
3. Clients never see Birdeye at all
4. You control the entire user experience

**Cost:** No additional fee for white-labeling with Birdeye`
          },
          {
            heading: 'White-Labeling DIY Stack',
            body: `With a DIY stack, everything is already white-label:

**JotForm Surveys:**
1. Upload your logo to survey header
2. Customize colors to match your brand
3. Use your domain for survey links (surveys.youragencyname.com)
4. Add your contact information to confirmation pages

**Twilio SMS:**
1. Register your business name as SMS sender
2. Purchase dedicated phone number for each client
3. Clients see texts coming from YOUR number
4. No Twilio branding visible anywhere

**Zapier Workflows:**
1. Completely behind the scenes (clients never see it)
2. All email notifications use your domain
3. No Zapier branding in client-facing materials

**Google Sheets Dashboards:**
1. Build custom dashboards with your branding
2. Share as "view only" with your branded Google account
3. Add your logo to header
4. Include your contact information

**Result:** 100% white-label by default. Clients have NO idea what tools power your service.`
          }
        ],
        note: 'White-labeling is not optional—it's essential for building a sustainable agency that clients can't easily replicate or abandon.'
      }
    },
    {
      id: 'lesson-2-3',
      title: 'SMS Review Request Templates (Copy-Paste Scripts)',
      type: 'text',
      duration: '15 min',
      description: '10 proven SMS templates with 15-20% response rates',
      content: {
        sections: [
          {
            heading: 'The Anatomy of a High-Converting Review Request',
            body: `**The 3-Part Formula:**

1. **Personalized Greeting** (use first name)
2. **The Ask** (clear, specific, time-bound)
3. **Direct Link** (no friction)

**What to Avoid:**
✗ Generic messages ("Dear Customer")
✗ Multiple requests in one message
✗ Asking them to "find us on Google"
✗ Long explanations or backstory
✗ Using corporate language

**What Works:**
✓ First name personalization
✓ Conversational tone
✓ Specific time estimate ("60 seconds")
✓ One-click direct link
✓ Sense of community ("join 200+ customers")`
          },
          {
            heading: '10 Copy-Paste SMS Templates',
            body: `**Template 1: The Gratitude Approach** (15% conversion)
"Hi [Name]! Thanks for choosing [Business]. If you had a great experience, would you mind taking 60 seconds to share it on Google? It helps other customers find us 🙂 [Link]"

**Template 2: The Community Approach** (17% conversion)
"[Name], thank you! 🙏 If you're happy with your service, would you join our 300+ customers who've left a review? Takes just a minute: [Link]"

**Template 3: The Direct Approach** (14% conversion)
"Hi [Name]! Quick favor - could you leave us a Google review? Your feedback means a lot. [Link]"

**Template 4: The Impact Approach** (16% conversion)
"[Name], thanks again! Your review would really help other families find [Business]. Mind sharing your experience? [Link]"

**Template 5: The Specific Approach** (18% conversion - HIGHEST)
"Hi [Name]! We're so glad we could help with [specific service]. If you have 60 seconds, we'd love a review: [Link]"

**Template 6: The Question Approach** (13% conversion)
"[Name], how was everything with your [service/product]? If you're happy, we'd love a quick review: [Link]"

**Template 7: The Follow-Up (3 days later)** (12% conversion)
"Hi [Name], just following up! If you have a spare minute, we'd really appreciate your review: [Link] Thanks!"

**Template 8: The Emoji Approach** (16% conversion)
"[Name], thanks for choosing us! 🌟 Mind leaving a quick review? It'd mean a lot: [Link]"

**Template 9: The Personal Touch** (17% conversion)
"Hi [Name], it was great working with you! If you're happy with [specific detail], a review would be awesome: [Link]"

**Template 10: The VIP Approach** (For repeat customers - 22% conversion)
"[Name], you're one of our best customers! Would you mind sharing why you keep coming back? Quick review here: [Link] 💙"

**Best Practices:**
• Send within 2-24 hours of service completion
• Use first name (never "Dear Customer")
• Keep under 160 characters when possible
• Include emoji sparingly (1-2 max)
• Always include direct review link
• Send ONE follow-up only (after 3 days)
• Track which templates work best for your niche`
          },
          {
            heading: 'Timing and Frequency Guidelines',
            body: `**When to Send:**
• Professional services (lawyers, doctors): 24-48 hours after appointment
• Home services (HVAC, plumbing): Same day or next morning
• Retail/restaurant: 2-4 hours after visit
• Online purchases: 3-5 days after delivery

**How Many Messages:**
✓ Initial request: Within 24 hours
✓ Follow-up (if no response): After 3 days
✗ Never send more than 2 messages total

**Day of Week Matters:**
Best Response Rates:
• Tuesday-Thursday: 16-18%
• Monday/Friday: 13-14%
• Saturday/Sunday: 11-12%

**Time of Day Matters:**
Best Times:
• 10am-12pm: 17% (highest)
• 6pm-8pm: 15%
• Avoid: 6am-8am, 10pm-midnight

**Seasonal Considerations:**
• December (holidays): Response rates drop 30%
• Summer (June-August): Slightly lower engagement
• Back-to-school (September): Good response rates
• Tax season (March-April): Avoid for financial services`
          }
        ],
        note: 'Test different templates with your clients and track conversion rates. What works for dental might not work for restaurants.'
      }
    },
    {
      id: 'lesson-2-4',
      title: 'Email Review Request Templates',
      type: 'text',
      duration: '15 min',
      description: 'Email templates with 40%+ open rates and 8-10% conversion to reviews',
      content: {
        sections: [
          {
            heading: 'Why Email Still Matters (Even Though SMS Converts Better)',
            body: `**SMS vs Email Conversion:**
• SMS: 15-18% conversion to review
• Email: 6-9% conversion to review

So why use email at all?

**4 Reasons Email Is Still Essential:**

1. **Cost:** SMS costs $0.02-0.05 per message. Email is virtually free.
2. **Deliverability:** Some customers don't want SMS. Email is universal.
3. **Professionalism:** B2B and professional services clients prefer email.
4. **Rich Content:** You can include images, formatting, and longer explanations.

**The Strategy:** Use both. Send SMS first (higher conversion), then follow up with email 2 hours later to those who didn't respond.

**Expected Results:**
• SMS alone: 15% conversion
• SMS + Email combo: 22% conversion
• Email alone: 8% conversion

Using both together increases conversion by 47%.`
          },
          {
            heading: 'Email Template Structure',
            body: `**The 4-Part Formula:**

**1. Subject Line** (Gets the open)
• Keep it personal and simple
• Avoid "RE:" or "FWD:" (looks spammy)
• Use first name when possible
• Create curiosity or urgency

**2. Opening** (Builds rapport)
• Thank them personally
• Reference specific service/interaction
• Show genuine appreciation

**3. The Ask** (Clear CTA)
• One primary call-to-action
• Large, obvious button
• Explain "why" (helps others)
• Set time expectation

**4. Closing** (Make it easy)
• Include direct link again
• Add your signature with contact info
• P.S. with alternative action (if they're not satisfied)`
          },
          {
            heading: '5 High-Converting Email Templates',
            body: `**Template 1: The Standard (40% open rate, 8% conversion)**

Subject: Thanks for choosing [Business Name]!

Hi [First Name],

Thank you for choosing [Business Name] for your [specific service]. It was a pleasure working with you!

If you had a great experience, would you mind taking 60 seconds to share it on Google? Your review helps other [customers/clients/patients] find us and make confident decisions.

[BIG BUTTON: Leave a Review]

Thanks again for your business!

[Your Name]
[Business Name]

P.S. If something didn't meet your expectations, please reply to this email so we can make it right.

---

**Template 2: The Story Appeal (42% open rate, 9% conversion)**

Subject: How did we do?

Hi [First Name],

We started [Business Name] because we wanted to provide [specific benefit] to families like yours. Your experience is incredibly important to us.

Would you mind sharing your experience on Google? It takes just a minute and helps other people discover us:

[BIG BUTTON: Share Your Experience]

Every review makes a real difference. Thank you!

[Your Name]

---

**Template 3: The Direct Ask (38% open rate, 7% conversion)**

Subject: Quick favor?

[First Name],

Quick question: Would you be willing to leave us a Google review?

It takes 60 seconds and helps us tremendously.

[BIG BUTTON: Leave Review]

Thanks!
[Your Name]

---

**Template 4: The Impact Statement (45% open rate, 10% conversion - BEST)**

Subject: You made our day!

Hi [First Name],

Thank you for choosing [Business Name]! [Specific compliment about their experience/project/visit].

We're a small business, and online reviews are how most people find us. If you're happy with your experience, would you mind taking a moment to share it?

[BIG BUTTON: Leave a Review on Google]

Your feedback helps other families make confident decisions, and we read every single review.

Thanks for supporting local business!

[Your Name]
[Business Name]

P.S. Not 100% satisfied? Reply to this email and I'll personally make it right.

---

**Template 5: The Follow-Up (35% open rate, 6% conversion)**

Subject: Still thinking about leaving that review?

Hi [First Name],

I reached out a few days ago asking if you'd share your experience with [Business Name] on Google.

I know you're busy, so I wanted to make it as easy as possible:

[BIG BUTTON: Click Here to Review (60 seconds)]

Thanks for considering it!

[Your Name]

(This is my last follow-up, I promise! 😊)`
          },
          {
            heading: 'Email Design Best Practices',
            body: `**Layout:**
• Plain text or simple HTML (avoid heavy graphics)
• Mobile-responsive (60% open emails on mobile)
• Large CTA button (minimum 44x44 pixels for mobile)
• Short paragraphs (2-3 sentences max)

**Colors:**
• Use brand colors for CTA button
• High contrast (button should stand out)
• Avoid dark backgrounds (hurts readability)

**CTA Button:**
• Use action words: "Leave Review" not "Click Here"
• Make it BIG (can't miss it)
• Repeat the link at bottom as text link

**From Name:**
• Use a person's name (not business name)
• "Mike from ABC Dental" > "ABC Dental"
• People open emails from people, not companies

**Images:**
• Minimal or none (avoid spam filters)
• If using images, include alt text
• Don't put CTA inside an image

**Testing:**
• Send test to yourself on mobile
• Check spam score (use Mail Tester)
• Test with different email clients
• A/B test subject lines`
          }
        ],
        note: 'The best email template is the one that sounds like it came from a real person, not a marketing department.'
      }
    }
  ]
};
