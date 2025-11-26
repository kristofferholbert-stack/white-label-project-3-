export const CALCULATOR_LOGIC = {
  title: "The Reverse-Engineering Roadmap",
  intro: "Stop looking at $10k as a mountain. Look at it as a math problem. Fill in the yellow boxes to see your path.",

  // This logic guides the developer on how to build the interactive sheet
  inputs: [
    { id: 'revenue_goal', label: 'Monthly Income Goal', default: 10000 },
    { id: 'retainer_price', label: 'Avg. Service Retainer', default: 1500 },
    { id: 'close_rate', label: 'Your Closing Rate (Guess 20% if new)', default: 0.2 },
    { id: 'meetings_booked', label: 'Show Up Rate', default: 0.7 }
  ],

  formulas: {
    clients_needed: "revenue_goal / retainer_price", // e.g., 6.6
    deals_closed_per_month: "clients_needed",
    meetings_needed: "deals_closed_per_month / close_rate", // e.g., 33
    outreach_needed: "meetings_needed / 0.05", // Assuming 5% booking rate on cold outreach
  },

  // The "Light at the End of the Tunnel" Output
  output_script: (clients: number, meetings: number) => `
    To hit your goal, you do NOT need to be a guru.
    You simply need to secure ${Math.ceil(clients)} clients.
    To get those clients, you need to have ${Math.ceil(meetings)} conversations this month.
    That is just ${Math.ceil(meetings / 4)} meetings a week.

    Can you handle one meeting a day to make $10k/month?
  `
};

export const EMAIL_SCRIPT = {
  title: "THE BETA-CLIENT ACQUISITION PROTOCOL",
  strategy: "You are not asking for a job. You are a software builder looking for a \"Pilot Partner\" to test a new system before you launch it publicly at full price.",
  subject: "Beta tester for [City] [Niche]?",
  body: `Hi [Business Name],

I’m building a new automated reputation system specifically for [Niche] businesses in [City], and I’m looking for one partner to test it out before I launch it publicly.

The system automatically texts your past customers to generate 5-star reviews on Google. Based on my data, it should add about 10-20 reviews to your profile in the first week.

I’m not asking for a monthly retainer. I just want to install it for you, prove it works, and in exchange, I just ask for a testimonial if you like the results.

(I cover the software costs).

Open to being my case study?

Best,
[Your Name]`,
  why_it_works: [
    "Low Risk: You aren't asking for $500. You're asking for a test.",
    "Specific: You mention their City and Niche.",
    "The Hook: \"I cover the software costs\" (which is only $10 on your end, but high value to them)."
  ]
};

export const NICHE_LIST = [
  {
    category: "Home Services (High Ticket)",
    description: "They sell expensive services, so one lead pays for your software.",
    niches: [
      "Roofing", "HVAC", "Solar Installers", "Pool Construction",
      "Kitchen Remodeling", "Epoxy Flooring", "Landscaping (Design)",
      "Fencing", "Foundation Repair", "Tree Removal"
    ]
  },
  {
    category: "Medical / Health (Recurring)",
    description: "High lifetime value (LTV). They need retention and booking tools.",
    niches: [
      "MedSpas", "Chiropractors", "Orthodontists", "Plastic Surgeons",
      "Dermatologists", "Physical Therapy", "Functional Medicine",
      "Veterinarians", "Lasik Centers", "Fertility Clinics"
    ]
  },
  {
    category: "Professional Services (Trust-Based)",
    description: "They rely on reputation. Review automation is an easy sell.",
    niches: [
      "Personal Injury Lawyers", "Family Law", "CPAs / Tax Prep",
      "Financial Advisors", "Real Estate Agents", "Mortgage Brokers",
      "Insurance Agents", "Architects", "Interior Designers", "Recruiters"
    ]
  },
  {
    category: "The 'Boring' Niches (Low Competition)",
    description: "Nobody targets these, so they are easy to close.",
    niches: [
      "Commercial Cleaning", "Pest Control", "Dumpster Rental",
      "Portable Toilet Rental", "Moving Companies", "Self Storage",
      "Auto Detailing", "Window Tinting", "Locksmiths", "Garage Door Repair"
    ]
  }
];

export const VIDEO_SCRIPT = {
  title: "The Broker Mindset",
  outline: [
    { time: "0:00", title: "The Lie", content: "Most people think you need to be an engineer to run a software company. That is a lie. Elon Musk didn't build the rocket. He sold the vision." },
    { time: "1:30", title: "The Concept: White-Labeling", content: "You are not a creator. You are a Distributor. Walmart doesn't make the TV. They put the TV on the shelf. Your job is to find the best tools (which we have done for you) and put them on the shelf for your local dentist." },
    { time: "2:45", title: "The \"Pre-Sell\" Technique", content: "Do not buy the software yet. 1. Take the screenshots from our 'Demo Mode' page. 2. Put them in a PDF. 3. Show the client: 'This is what I will build for you.' 4. Collect the credit card. 5. Then buy the software using their money." },
    { time: "4:00", title: "The Guarantee", content: "This removes 100% of your financial risk. You are essentially drop-shipping software. You only pay us when you get paid." }
  ]
};
