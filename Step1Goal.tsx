
import React, { useState } from 'react';

const WandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2L12 9.5 4.5 12 2 14.5 9.5 12 12 4.5 14.5 2zM12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"></path>
    </svg>
);

const SeoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
);
const SocialIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-500"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const BookingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
const CrmIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
const PaymentsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const CryptoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M10.4 20.3c-.9-1.3-1.3-2.8-1.3-4.3 0-4.1 3.3-7.4 7.4-7.4.8 0 1.5.1 2.2.4M12 2a10 10 0 1010 10M7.4 3.7c.9 1.3 1.3 2.8 1.3 4.3 0 4.1-3.3 7.4-7.4 7.4-.8 0-1.5-.1-2.2-.4"></path></svg>;
const GamingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>;
const HealthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;

interface Step1GoalProps {
  onSubmit: (goal: string) => void;
  isLoading: boolean;
}

const inspirationGoals = [
    {
        icon: <SeoIcon />,
        title: "SEO Reporting & Rank Tracking",
        description: "Offer clients a branded dashboard to monitor their search engine performance.",
        prompt: "Offer SEO reporting and rank tracking for my e-commerce clients.",
    },
    {
        icon: <SocialIcon />,
        title: "Social Media Scheduling",
        description: "Provide a simple, powerful tool for local businesses to manage their social media presence.",
        prompt: "Provide a branded social media scheduling tool for local businesses.",
    },
    {
        icon: <BookingIcon />,
        title: "Booking & Appointment System",
        description: "Launch a white-label scheduling solution for service-based clients like salons or consultants.",
        prompt: "Launch a white-label booking and appointment system for service-based clients.",
    },
    {
        icon: <CrmIcon />,
        title: "Client Relationship Manager (CRM)",
        description: "Resell a simple CRM to help your clients manage their leads and customer interactions.",
        prompt: "I want to offer a simple white-label CRM for my small business clients.",
    },
    {
        icon: <PaymentsIcon />,
        title: "Payments & Banking",
        description: "Offer branded payment processing and financial services to your clients.",
        prompt: "I need a white-label solution for payment processing and banking services.",
    },
    {
        icon: <CryptoIcon />,
        title: "Cryptocurrency & Exchange",
        description: "Launch a secure crypto exchange or wallet service under your own brand.",
        prompt: "I want to launch a white-label cryptocurrency exchange for my users.",
    },
    {
        icon: <GamingIcon />,
        title: "iGaming & Sports Betting",
        description: "Provide a complete, licensed iGaming platform or sportsbook to your audience.",
        prompt: "I want to find a turnkey white-label solution for an online casino and sportsbook.",
    },
    {
        icon: <HealthIcon />,
        title: "Health, Wellness & Fitness",
        description: "Offer branded fitness tracking, meal planning, or wellness apps to your clients.",
        prompt: "I'm looking for a white-label app for health and fitness coaching.",
    }
];

export const Step1Goal: React.FC<Step1GoalProps> = ({ onSubmit, isLoading }) => {
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (goal.trim()) {
      onSubmit(goal.trim());
    }
  };
  
  const handleExampleClick = (example: string) => {
    setGoal(example);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Let's Find Your Perfect Partner</h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
        Start by describing the primary goal you want to achieve for your clients with a white-label solution.
        The more detail, the better our AI can understand your needs.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-7xl mx-auto">
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., 'Offer a self-service scheduling and booking system for my local business clients to reduce their admin time.'"
          className="w-full h-32 p-4 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition max-w-3xl mx-auto"
          required
        />
         <div className="mt-8 text-left">
            <span className="font-semibold text-slate-600">Need inspiration? Try one of these:</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {inspirationGoals.map((item) => (
                    <button
                        type="button"
                        key={item.title}
                        onClick={() => handleExampleClick(item.prompt)}
                        className="text-left p-4 border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-primary-400 hover:ring-1 hover:ring-primary-400 transition-all duration-200"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">{item.icon}</div>
                            <div>
                                <h3 className="font-bold text-slate-800">{item.title}</h3>
                                <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || !goal.trim()}
          className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors disabled:bg-primary-300"
        >
          {isLoading ? 'Analyzing...' : 'Start with AI'}
          {!isLoading && <WandIcon />}
        </button>
      </form>
    </div>
  );
};