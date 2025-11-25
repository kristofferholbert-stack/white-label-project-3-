import React from 'react';
import { SolutionCard, SolutionCardSkeleton } from './SearchSolutionCard';
import { StackCard } from './StackCard';
import type { Solution, SearchResult, SolutionStack, Page } from './types';
import { Feedback } from './Feedback';

type SortByType = 'matchScore' | 'rating' | 'agencyMargin';

interface ResultsSectionProps {
  solutions: SearchResult[];
  isLoading: boolean;
  error: string | null;
  comparisonList: string[];
  onToggleCompare: (solutionId: string) => void;
  onHideSolution: (solutionId: string) => void;
  onViewDetails: (solution: Solution) => void;
  sortBy: SortByType;
  onSortChange: (value: SortByType) => void;
  onNavigate: (page: Page, context?: any) => void;
  onLaunchSystem: (stack: SolutionStack) => void;
}

const EmptyState = () => (
  <div className="text-center py-16 px-4">
      <div className="mx-auto w-20 h-20 bg-slate-800 text-slate-500 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </div>
      <h3 className="text-xl font-bold text-white">
        No Matches Found
      </h3>
      <p className="mt-2 text-slate-400">
        Try adjusting your search goal or filters for better results.
      </p>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="text-center py-16 px-4 bg-red-500/10 border border-red-500/20 rounded-lg">
    <div className="mx-auto w-20 h-20 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    </div>
    <h3 className="mt-4 text-xl font-bold text-red-400">Oops! Something went wrong.</h3>
    <p className="mt-2 text-red-300/70">{message}</p>
  </div>
);

const SortControls: React.FC<{ sortBy: SortByType, onSortChange: (value: SortByType) => void }> = ({ sortBy, onSortChange }) => {
    const sortOptions: { value: SortByType, label: string }[] = [
        { value: 'matchScore', label: 'Best Match' },
        { value: 'rating', label: 'Highest Rating' },
        { value: 'agencyMargin', label: 'Highest Margin' },
    ];

    return (
        <div className="mb-6 flex justify-end items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Sort by</span>
            <div className="flex gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
                {sortOptions.map(option => (
                    <button
                        key={option.value}
                        onClick={() => onSortChange(option.value)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                            sortBy === option.value
                                ? 'bg-slate-700 text-white shadow-sm'
                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

const getBadgeForSolution = (solution: SearchResult, index: number): { label: string; color: string } | undefined => {
    if (index > 2) return undefined; // Top 3 only

    // Logic for assigning badges
    if (solution.type === 'stack') {
         // For stacks, we can check implementation time or potential margin
         if (solution.estimatedLaunchTime.toLowerCase().includes('instant') || solution.estimatedLaunchTime.toLowerCase().includes('minutes')) {
             return { label: 'Fastest Launch', color: 'bg-amber-500 text-white' };
         }
         // Calculate margin roughly for stacks if needed, or default logic
         // Since we don't have precise rating for stacks on the search result (it's not in the type definition above but let's assume)
         // We'll stick to launch time or "Editor's Choice"
         if (index === 0) return { label: 'Top Recommendation', color: 'bg-primary-600 text-white' };
         return undefined;
    } else {
        // For individual solutions
        if (solution.implementationTime.toLowerCase().includes('instant')) {
            return { label: 'Fastest Launch', color: 'bg-amber-500 text-white' };
        }
        if (solution.agencyMargin > 75) {
            return { label: 'Highest Margin', color: 'bg-emerald-600 text-white' };
        }
        if (solution.rating > 4.8) {
            return { label: 'Top Rated', color: 'bg-blue-600 text-white' };
        }
        // Fallback for top result if no other badge applies
        if (index === 0) {
             return { label: 'Best Match', color: 'bg-primary-600 text-white' };
        }
    }
    return undefined;
};

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  solutions: results,
  isLoading,
  error,
  comparisonList,
  onToggleCompare,
  onHideSolution,
  onViewDetails,
  sortBy,
  onSortChange,
  onNavigate,
  onLaunchSystem,
}) => {
  if (isLoading && results.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[...Array(3)].map((_, i) => <SolutionCardSkeleton key={i} />)}
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} />;
  }
  
  if (results.length === 0) {
    return <EmptyState />;
  }

  const isCompareListFull = comparisonList.length >= 3;

  return (
    <div>
      <SortControls sortBy={sortBy} onSortChange={onSortChange} />
      <div className="grid grid-cols-1 gap-6">
        {results.map((item, index) => {
          const badge = getBadgeForSolution(item, index);
          if (item.type === 'stack') {
            return <StackCard key={item.id} stack={item} index={index} onNavigate={onNavigate} onLaunch={onLaunchSystem} badge={badge} />;
          }
          return (
            <SolutionCard
              key={item.id}
              solution={item}
              isSelectedForCompare={comparisonList.includes(item.id)}
              isCompareListFull={isCompareListFull}
              onToggleCompare={onToggleCompare}
              onHide={onHideSolution}
              onViewDetails={onViewDetails}
              index={index}
              badge={badge}
            />
          );
        })}
      </div>
      <Feedback />
    </div>
  );
};