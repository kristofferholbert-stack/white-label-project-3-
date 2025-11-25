import React from 'react';
import type { JourneyData, Filters } from '../types';

interface FilterSummaryCardProps {
  journeyData: JourneyData;
  onStartOver: () => void;
  onRemoveFilter: (category: keyof Filters, value: string) => void;
}

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400 group-hover:text-white">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const getPriorityLabel = (key: keyof JourneyData['priorities'], value: number) => {
    const labels: Record<keyof JourneyData['priorities'], [string, string, string]> = {
        marginVsCost: ['Low Client Cost', 'Balanced', 'High Agency Margin'],
        speedVsCustomization: ['Fast Setup', 'Balanced', 'Deep Customization'],
        easeVsPower: ['Easy Integration', 'Balanced', 'Powerful API'],
    };
    if (value < 33) return labels[key][0];
    if (value > 66) return labels[key][2];
    return labels[key][1];
}

export const FilterSummaryCard: React.FC<FilterSummaryCardProps> = ({ journeyData, onStartOver, onRemoveFilter }) => {
  const { goal, priorities, filters } = journeyData;
  const hasFilters = Object.values(filters).some(val => Array.isArray(val) && val.length > 0);

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg mb-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 border-b border-slate-800 pb-6 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Match Report</h2>
          <p className="text-slate-400 mt-1 text-sm">
            Goal: <span className="font-medium text-white">"{goal}"</span>
          </p>
        </div>
        <button
            onClick={onStartOver}
            className="text-sm font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
        >
            Start New Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Priority Profile</h3>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(priorities) as Array<keyof JourneyData['priorities']>).map((key) => (
              <div key={key} className="text-xs font-semibold text-emerald-300 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                {getPriorityLabel(key, priorities[key])}
              </div>
            ))}
          </div>
        </div>

        {hasFilters && (
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).flatMap(([category, values]) =>
                Array.isArray(values) ? values.map(value => (
                  <button
                    key={`${category}-${value}`}
                    onClick={() => onRemoveFilter(category as keyof Filters, value)}
                    className="flex items-center gap-2 px-3 py-1 text-xs bg-primary-900/30 border border-primary-500/30 text-primary-300 rounded-full font-medium hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all group"
                  >
                    <span>{value}</span>
                    <XIcon />
                  </button>
                )) : []
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};