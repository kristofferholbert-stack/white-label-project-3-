import React from 'react';

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18m-4-4l4 4 4-4m4-10l-4-4-4 4"></path>
  </svg>
);

interface UpsellOption {
  title: string;
  description: string;
  ctaText: string;
  ctaUrl?: string;
  icon?: string;
  highlight?: boolean;
}

interface CourseUpsellWidgetProps {
  moduleId?: string;
  lessonId?: string;
}

export const CourseUpsellWidget: React.FC<CourseUpsellWidgetProps> = ({ moduleId, lessonId }) => {
  const getContextualUpsell = (): UpsellOption => {
    // Sales-related lessons
    if (moduleId === 'module-2') {
      return {
        title: 'Need Help Closing Deals?',
        description: 'Our team can join your sales calls and help you close your first 5 clients.',
        ctaText: 'Book Strategy Call',
        ctaUrl: '/contact',
        highlight: true
      };
    }

    // Technical implementation lessons
    if (moduleId === 'module-3') {
      return {
        title: 'Done-For-You Setup',
        description: 'Skip the technical work. We\'ll set up GBP, citations, and review systems for your first client.',
        ctaText: 'Get Implementation Help',
        ctaUrl: '/implementation'
      };
    }

    // Vendor relationship lessons
    if (moduleId === 'module-4') {
      return {
        title: 'Pre-Negotiated Partnerships',
        description: 'Get instant access to our white-label partners with volume pricing already secured.',
        ctaText: 'View Partner Network',
        ctaUrl: '/marketplace'
      };
    }

    // Default upsell
    return {
      title: 'Want Us To Build It For You?',
      description: 'We can set up your entire agency - website, proposals, client portal, and first campaign.',
      ctaText: 'Explore Done-For-You',
      ctaUrl: '/implementation',
      highlight: true
    };
  };

  const upsell = getContextualUpsell();

  return (
    <div className={`rounded-xl p-5 border ${
      upsell.highlight
        ? 'bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-emerald-500/50'
        : 'bg-slate-900 border-slate-700'
    }`}>
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-lg ${
          upsell.highlight ? 'bg-emerald-500/20' : 'bg-slate-800'
        }`}>
          <SparklesIcon />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white mb-1">{upsell.title}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">{upsell.description}</p>
        </div>
      </div>
      <button
        onClick={() => upsell.ctaUrl && (window.location.hash = upsell.ctaUrl.replace('/', '#'))}
        className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all ${
          upsell.highlight
            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
        }`}
      >
        {upsell.ctaText} →
      </button>
    </div>
  );
};

export const CommunityWidget: React.FC = () => {
  return (
    <div className="rounded-xl p-5 bg-slate-900 border border-slate-700">
      <h3 className="text-sm font-bold text-white mb-2">Join the Community</h3>
      <p className="text-xs text-slate-400 mb-3 leading-relaxed">
        Connect with 500+ agency owners implementing these exact strategies.
      </p>
      <div className="space-y-2">
        <button className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-300 transition-colors text-left">
          💬 Weekly Q&A Calls
        </button>
        <button className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-300 transition-colors text-left">
          📊 Share Your Wins
        </button>
        <button className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium text-slate-300 transition-colors text-left">
          🤝 Find Accountability Partner
        </button>
      </div>
    </div>
  );
};

export const ProgressMilestoneWidget: React.FC<{ progress: number }> = ({ progress }) => {
  const getMilestoneMessage = () => {
    if (progress < 25) {
      return {
        emoji: '🚀',
        title: 'Great start!',
        message: 'You\'re laying the foundation for your agency.',
        nextStep: 'Complete Module 1 to start prospecting'
      };
    } else if (progress < 50) {
      return {
        emoji: '💪',
        title: 'Building momentum!',
        message: 'You\'re ready to start reaching out to prospects.',
        nextStep: 'Practice your sales script with a friend'
      };
    } else if (progress < 75) {
      return {
        emoji: '🔥',
        title: 'Halfway there!',
        message: 'You have everything you need to sign your first client.',
        nextStep: 'Schedule 10 discovery calls this week'
      };
    } else if (progress < 100) {
      return {
        emoji: '⭐',
        title: 'Almost done!',
        message: 'You\'re now an expert in local SEO agency operations.',
        nextStep: 'Complete the course and claim your certificate'
      };
    } else {
      return {
        emoji: '🎉',
        title: 'Course Complete!',
        message: 'You have all the tools to build a $10k/month agency.',
        nextStep: 'Ready to go pro? Explore our implementation services'
      };
    }
  };

  const milestone = getMilestoneMessage();

  return (
    <div className="rounded-xl p-5 bg-gradient-to-br from-violet-900/40 to-purple-900/40 border border-violet-500/50">
      <div className="text-3xl mb-2">{milestone.emoji}</div>
      <h3 className="text-sm font-bold text-white mb-1">{milestone.title}</h3>
      <p className="text-xs text-slate-300 mb-2">{milestone.message}</p>
      <p className="text-xs text-violet-300 font-medium">
        Next: {milestone.nextStep}
      </p>
    </div>
  );
};
