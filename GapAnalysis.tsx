import React from 'react';

interface IdentityLevel {
  name: string;
  slug: string;
  min_mrr: number;
  max_mrr: number | null;
  badge_icon: string;
  badge_color: string;
  benefits: string[];
}

interface TacticalComponent {
  name: string;
  tool: string;
  cost: string;
  benefit: string;
}

interface GapAnalysisProps {
  currentLevel: IdentityLevel;
  nextLevel: IdentityLevel | null;
  currentMRR: number;
  targetMRR?: number;
  serviceGaps?: string[];
  onUpgradeClick?: () => void;
}

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const TrendingUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

const getTacticalComponents = (currentLevel: IdentityLevel, serviceGaps?: string[]): TacticalComponent[] => {
  const levelComponents: Record<string, TacticalComponent[]> = {
    'agency-apprentice': [
      { name: 'Reputation Engine', tool: 'ReviewBoost Pro', cost: '$49/mo', benefit: 'Auto-collect 5-star reviews' },
      { name: 'Booking System', tool: 'CalSyncer', cost: '$29/mo', benefit: 'Eliminate scheduling back-and-forth' },
      { name: 'LLC Setup', tool: 'LegalZoom Partner', cost: '$0 + fees', benefit: 'Protect personal assets' }
    ],
    'growth-partner': [
      { name: 'White-Label CRM', tool: 'AgencyFlow Pro', cost: '$99/mo', benefit: 'Client portal + reporting' },
      { name: 'SEO Automation', tool: 'RankPilot', cost: '$149/mo', benefit: 'Deliver SEO without hiring' },
      { name: 'Proposal System', tool: 'DealCloser AI', cost: '$79/mo', benefit: '3x faster proposal creation' }
    ],
    'empire-scale': [
      { name: 'Custom Platform', tool: 'Full White-Label', cost: '$499/mo', benefit: 'Your brand, your rules' },
      { name: 'Team Dashboard', tool: 'OpCenter Pro', cost: '$299/mo', benefit: 'Manage 50+ clients easily' },
      { name: 'Revenue Analytics', tool: 'ProfitIQ', cost: '$199/mo', benefit: 'Optimize agency profitability' }
    ]
  };

  return levelComponents[currentLevel.slug] || levelComponents['agency-apprentice'];
};

const calculateTimeline = (mrrGap: number): number => {
  if (mrrGap <= 2500) return 14;
  if (mrrGap <= 5000) return 21;
  if (mrrGap <= 10000) return 30;
  return 45;
};

const getAgencyCount = (levelSlug: string): number => {
  const counts: Record<string, number> = {
    'agency-apprentice': 1847,
    'growth-partner': 342,
    'empire-scale': 89
  };
  return counts[levelSlug] || 500;
};

export const GapAnalysis: React.FC<GapAnalysisProps> = ({
  currentLevel,
  nextLevel,
  currentMRR,
  targetMRR,
  serviceGaps,
  onUpgradeClick
}) => {
  if (!nextLevel) {
    return (
      <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/50 rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">{currentLevel.badge_icon}</div>
        <h3 className="text-2xl font-bold text-white mb-2">You've Reached the Top!</h3>
        <p className="text-slate-300">
          You're operating at {currentLevel.name} level. Keep dominating!
        </p>
      </div>
    );
  }

  const mrrGap = nextLevel.min_mrr - currentMRR;
  const percentageToNext = (currentMRR / nextLevel.min_mrr) * 100;
  const timelineDays = calculateTimeline(mrrGap);
  const agencyCount = getAgencyCount(nextLevel.slug);
  const tacticalComponents = getTacticalComponents(nextLevel, serviceGaps);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Your Path to {nextLevel.name}</h3>
          <p className="text-slate-400">You're {percentageToNext.toFixed(0)}% of the way there</p>
        </div>
        <div className="text-right">
          <div className="text-3xl mb-1">{nextLevel.badge_icon}</div>
          <div className="text-xs text-slate-500 font-bold uppercase">Next Level</div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-emerald-400">
            <ClockIcon />
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">{timelineDays} Days to {nextLevel.name}</div>
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <UsersIcon />
              Fast-track timeline based on {agencyCount.toLocaleString()} agencies who made this jump
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Current MRR</span>
          <span className="text-lg font-bold text-white">${currentMRR.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Target MRR</span>
          <span className="text-lg font-bold text-emerald-400">${nextLevel.min_mrr.toLocaleString()}</span>
        </div>
        <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
          <span className="text-sm text-slate-400">Gap to Close</span>
          <span className="text-2xl font-bold text-orange-400">${mrrGap.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-bold text-white uppercase tracking-wide">Missing Components:</h4>
        <div className="grid grid-cols-1 gap-3">
          {tacticalComponents.map((component, index) => (
            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 text-orange-400">
                    <LockIcon />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{component.name}</div>
                    <div className="text-xs text-slate-400">{component.tool}</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-emerald-400">{component.cost}</div>
              </div>
              <div className="text-xs text-slate-300 ml-6">{component.benefit}</div>
            </div>
          ))}
        </div>
      </div>

      {onUpgradeClick && (
        <button
          onClick={onUpgradeClick}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-6 rounded-xl hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <TrendingUpIcon />
          See Recommended Stacks to Close the Gap
        </button>
      )}
    </div>
  );
};
