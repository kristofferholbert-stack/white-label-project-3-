import React, { useState } from 'react';
import type { Category } from '../types/types';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

interface CategoryFilterSectionProps {
  title: string;
  categories: Category[];
  selected?: string[];
  onChange: (value: string[]) => void;
}

const SubCategoryList: React.FC<{
  category: Category;
  selected: string[];
  handleCheckboxChange: (subCategory: string) => void;
}> = ({ category, selected, handleCheckboxChange }) => {
  return (
    <div className="pt-2 pb-4 pl-2 space-y-3 bg-slate-900/50 rounded-b-lg">
      {category.subCategories.map(sub => (
        <div key={sub} className="flex items-center px-3 py-1 group cursor-pointer" onClick={() => handleCheckboxChange(sub)}>
          <div className={`flex items-center justify-center w-4 h-4 rounded border ${selected.includes(sub) ? 'bg-primary-600 border-primary-600' : 'border-slate-600 bg-slate-800 group-hover:border-primary-500'} transition-colors mr-3`}>
             {selected.includes(sub) && (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
             )}
          </div>
          <label htmlFor={`${category.name}-${sub}`} className={`text-sm cursor-pointer select-none ${selected.includes(sub) ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-300'}`}>
            {sub}
          </label>
        </div>
      ))}
    </div>
  );
};

export const CategoryFilterSection: React.FC<CategoryFilterSectionProps> = ({ title, categories, selected = [], onChange }) => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleCheckboxChange = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div className="py-5 border-b border-slate-800">
      <h3 className="-my-3 flow-root">
        <div className="py-3 w-full text-left text-lg font-bold text-white">
          {title}
        </div>
      </h3>
      <div className="pt-4">
        <div className="space-y-2">
          {categories.map(category => {
            const isOpen = openCategories.includes(category.name);
            const activeCount = category.subCategories.filter(sub => selected.includes(sub)).length;
            
            return (
            <div key={category.name} className={`border transition-colors rounded-lg overflow-hidden ${isOpen ? 'border-slate-700 bg-slate-800/30' : 'border-transparent hover:bg-slate-800/50'}`}>
              <button
                className="w-full flex justify-between items-center p-3 text-left font-semibold text-slate-300 hover:text-white transition-colors"
                onClick={() => toggleCategory(category.name)}
              >
                <div className="flex items-center gap-2">
                     <span>{category.name}</span>
                     {activeCount > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary-600 rounded-full">
                            {activeCount}
                        </span>
                     )}
                </div>
                <ChevronDownIcon className={`transition-transform duration-200 text-slate-500 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <SubCategoryList
                  category={category}
                  selected={selected}
                  handleCheckboxChange={handleCheckboxChange}
                />
              )}
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};