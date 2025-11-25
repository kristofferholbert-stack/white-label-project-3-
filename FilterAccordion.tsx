
import React from 'react';
import { FilterSection } from './FilterSection';
import { CategoryFilterSection } from './CategoryFilterSection';
import type { Filters } from './types';
import { categoryStructure, filterOptionsData } from './constants';

interface FilterAccordionProps {
  activeFilters: Filters;
  onFilterChange: (category: keyof Filters, value: string[]) => void;
}

export const FilterAccordion: React.FC<FilterAccordionProps> = ({ activeFilters, onFilterChange }) => {
  return (
    <form className="divide-y divide-slate-200">
      <CategoryFilterSection
        title="Category"
        categories={categoryStructure}
        selected={activeFilters.categories}
        onChange={(val) => onFilterChange('categories', val as string[])}
      />
      <FilterSection
        title="White Label Type"
        options={filterOptionsData.whitelabelType}
        selected={activeFilters.whitelabelType}
        onChange={(val) => onFilterChange('whitelabelType', val as string[])}
        type="checkbox"
      />
      <FilterSection
        title="Pricing Model"
        options={filterOptionsData.pricingModel}
        selected={activeFilters.pricingModel}
        onChange={(val) => onFilterChange('pricingModel', val as string[])}
        type="checkbox"
      />
      <FilterSection
        title="Client Size"
        options={filterOptionsData.idealClientSize}
        selected={activeFilters.idealClientSize}
        onChange={(val) => onFilterChange('idealClientSize', val as string[])}
        type="checkbox"
      />
      <FilterSection
        title="Implementation Time"
        options={filterOptionsData.implementationTime}
        selected={activeFilters.implementationTime}
        onChange={(val) => onFilterChange('implementationTime', val as string[])}
        type="checkbox"
      />
      <FilterSection
        title="Integration Methods"
        options={filterOptionsData.integrationMethods}
        selected={activeFilters.integrationMethods}
        onChange={(val) => onFilterChange('integrationMethods', val as string[])}
        type="checkbox"
      />
    </form>
  );
};
