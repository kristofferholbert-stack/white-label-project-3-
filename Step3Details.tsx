
import React, { useState } from 'react';
import type { Filters } from './types';
import { categoryStructure, filterOptionsData } from './constants';
import { CategoryFilterSection } from './CategoryFilterSection';
import { FilterSection } from './FilterSection';

interface Step3DetailsProps {
  initialFilters: Filters;
  onBack: () => void;
  onSubmit: (filters: Filters) => void;
  isLoading: boolean;
}

export const Step3Details: React.FC<Step3DetailsProps> = ({ initialFilters, onBack, onSubmit, isLoading }) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const updateFilters = (category: keyof Filters, value: string[]) => {
    setFilters(prev => {
        const newFilters = { ...prev };
        if (!value || value.length === 0) {
            delete newFilters[category];
        } else {
            (newFilters as any)[category] = value;
        }
        return newFilters;
    });
  };

  const handleSubmit = () => {
    onSubmit(filters);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Add a Few More Details</h1>
        <p className="mt-3 max-w-xl mx-auto text-md text-slate-600">
          The AI has pre-selected some options based on your goal. Refine them below to get the most accurate matches.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="p-6">
            <CategoryFilterSection
                title="Solution Category"
                categories={categoryStructure}
                selected={filters.categories}
                onChange={(val) => updateFilters('categories', val as string[])}
            />
            <FilterSection
                title="Ideal Client Size"
                options={filterOptionsData.idealClientSize}
                selected={filters.idealClientSize}
                onChange={(val) => updateFilters('idealClientSize', val as string[])}
                type="checkbox"
            />
        </div>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="text-slate-600 font-semibold py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-secondary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-secondary-700 transition-colors disabled:bg-secondary-400 disabled:cursor-wait"
        >
          {isLoading ? 'Finding Matches...' : 'Find My Matches'}
        </button>
      </div>
    </div>
  );
};
