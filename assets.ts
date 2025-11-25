export const UNIVERSAL_ONBOARDING = {
    workflow_name: "The White-Label Wonder: 60-Second Onboarding",
    trigger: "New Stripe Payment: Success",
    actions: [
        {
            step: 1,
            tool: "CRM",
            action: "Create Account",
            data: {
                email: "{{customer.email}}",
                company: "{{customer.company}}",
                status: "Active",
                tags: ["new-client", "needs-onboarding"]
            }
        },
        {
            step: 2,
            tool: "Email",
            action: "Send Login Credentials",
            template_id: "welcome-email-v1",
            delay: "0 minutes"
        },
        {
            step: 3,
            tool: "SMS",
            action: "Send Founder Video",
            body: "Hey {{first_name}}, CEO here. Just saw you joined! Check your email for login details. Reply here if you get stuck."
        },
        {
            step: 4,
            tool: "Task Manager",
            action: "Create Task",
            body: "Verify DNS settings for {{customer.company}}"
        }
    ]
};

export const PERFECT_CALENDAR = {
    event_type: "Strategy Session (Sales)",
    slug: "strategy-session",
    length: 30,
    availability: {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        hours: ["10:00-15:00"]
    },
    questions: [
        {
            label: "What is your current monthly revenue?",
            type: "text",
            required: true
        },
        {
            label: "Are you the decision maker?",
            type: "radio",
            options: ["Yes", "No"],
            required: true
        }
    ],
    workflow: {
        on_booking: ["Send Email Confirmation", "Send SMS Reminder (24h before)", "Send SMS Reminder (1h before)"],
        on_no_show: ["Send 'Missed You' Email", "Tag in CRM: 'Flake'"]
    }
};

export const SALES_SCRIPTS = {
    marketing: {
        title: "The Invisible Revenue Script",
        subject: "Found a hole in your bucket, [Name]",
        body: `Hi [Name],

I was searching for [Service] in [City] and noticed you have 48 reviews, while your top competitor has 112.

Statistically, you are losing about 3-5 calls a week because of this gap.

I built a tool called [Your Brand Name] that automatically texts your happy customers and asks for a review. It usually doubles your review count in 30 days on autopilot.

I’ve set up a demo dashboard for [Company Name] so you can see how it works. Want the link?

Best,
[Your Name]`
    },
    development: {
        title: "The Speed Script",
        subject: "Your website is leaking, [Name]",
        body: `Hi [Name],

Your current website takes 4.2 seconds to load on mobile. Amazon calculated that every 0.1s delay costs 1% in sales. You are bleeding money before they even see your offer.

I don't want to sell you a $10k custom website. I have a pre-built, high-speed framework specifically for [Niche] that loads in under 1 second.

We can migrate your content and launch by Friday.

Worth a 5-minute chat to see the demo?

Best,
[Your Name]`
    },
    business_ops: {
        title: "The Chaos Killer",
        subject: "15 hours a week",
        body: `Hi [Name],

I spoke to 10 other [Niche] owners this week. They all said the same thing: "I spend half my day chasing leads and scheduling appointments."

If you are still manually emailing back and forth to find a time to meet, you are wasting about 15 hours a week.

I implemented a system called [Your Brand Name] for a peer of yours. It automates the booking, the reminder, and the follow-up.

Want to steal the exact workflow I used for them?

Best,
[Your Name]`
    },
    fintech: {
        title: "The Cash Flow Script",
        subject: "Getting you paid faster",
        body: `Hi [Name],

I noticed you are still sending PDF invoices. On average, those take 14 days to get paid.

My agency installs a "Text-to-Pay" system. You finish the job, text them a secure link, and the money hits your account instantly.

It reduces "Accounts Receivable" by 80%.

Can I send you a $1 test payment so you can see how fast it is?

Best,
[Your Name]`
    },
    industry_platforms: {
        title: "The Specialist Script",
        subject: "Software built for [Niche], not generic businesses",
        body: `Hi [Name],

Are you tired of trying to force generic tools like Salesforce or HubSpot to work for a [Niche] business?

We don't serve restaurants or retailers. We only serve [Niche].

Our platform, [Your Brand Name], comes pre-loaded with the exact templates, forms, and contracts [Niche] owners need.

Stop customizing. Start executing. Here is a video of how it works: [Link]

Best,
[Your Name]`
    },
    creative: {
        title: "The Burnout Script",
        subject: "Ad fatigue",
        body: `Hi [Name],

We both know that Facebook ad costs are rising because creative "fatigues" faster than ever. You need 10x more image variations than you did a year ago.

You don't need to hire a full-time designer.

My tool, [Your Brand Name], uses AI to generate high-conversion ad creatives for [Niche] in seconds.

I generated 3 mockups for your current offer just to test it. Want to see them?

Best,
[Your Name]`
    },
    physical_products: {
        title: "The Fulfillment Script",
        subject: "Your inventory nightmare",
        body: `Hi [Name],

Nothing kills a brand faster than "Out of Stock" or "Wrong Item Sent."

If you are tracking inventory on spreadsheets, you are one formula error away from a disaster.

We offer a simple, barcode-based inventory system designed for [Niche] e-com stores. It syncs with your Shopify/WooCommerce store instantly.

Let's automate your headache away.

Best,
[Your Name]`
    }
};

export const LEGAL_TEMPLATES = {
    reseller: {
        title: "Standard SaaS Reseller Agreement (Simplified)",
        content: `**1. License Grant**
[Your Agency Name] grants Client a non-exclusive, non-transferable license to use the Software identified as [Software Name] for internal business purposes during the subscription term.

**2. Service Availability**
While we aim for 99.9% uptime, the Software is provided "AS IS." [Your Agency Name] acts as a reseller and is not the original manufacturer of the code. We are not liable for upstream server outages caused by the core provider.

**3. Payment & Subscription**
Client agrees to pay the monthly fee of $[Amount]. Services are billed in advance. Failure to pay within 7 days will result in temporary account suspension.

**4. Data Ownership**
Client retains full ownership of all leads, customer data, and content uploaded to the platform. Upon cancellation, Client has 30 days to export their data before it is purged from our systems.

**5. Limitation of Liability**
[Your Agency Name] shall not be liable for any indirect, incidental, or consequential damages, including lost profits, arising out of the use of this software.`
    }
};

export const REACTIVATION_ASSETS = {
    script: {
        title: "The Database Mining Script",
        subject: "Quick question about [Service]",
        body: `Hi [Name],

I’m working with a few other [Niche] clinics in [City] and we’ve been running a 'Patient Reactivation' campaign that’s generating about 15-20 appointments a week from their *old* leads.

We don't use ads. We just use an AI agent to text your dormant list.

I'd love to run a 7-day pilot for you. If we don't book at least 5 appointments, you don't pay.

Open to a 10-min demo?

Best,
[Your Name]`
    },
    contract: "Reactivation_Service_Agreement.docx",
    calculator: "Reactivation_ROI_Sheet.xlsx"
};

export const ECOM_ASSETS = {
    script: {
        title: "The 'Lost Revenue' Audit",
        subject: "You left $14k on the table last month",
        body: `Hi [Brand Name],

I ran your store through my audit tool and noticed you aren't running a 'Browse Abandonment' SMS flow.

Based on your traffic estimate, that one missing flow is costing you roughly $10k-$15k/mo in lost sales.

I can build and launch that flow for you this week. You only pay me a % of the revenue it recovers.

Interested in the math?

Best,
[Your Name]`
    }
};
