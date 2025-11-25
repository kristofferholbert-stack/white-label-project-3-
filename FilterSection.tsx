import React, { useState } from 'react';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

interface FilterSectionProps {
  title: string;
  options: string[];
  selected?: string[];
  onChange: (value: string[]) => void;
  type: 'checkbox';
}

export const FilterSection: React.FC<FilterSectionProps> = ({ title, options, selected = [], onChange, type }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCheckboxChange = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div className="py-5 border-b border-slate-800 last:border-b-0">
      <h3 className="-my-3 flow-root">
        <button
          type="button"
          className="w-full flex justify-between items-center p-2 text-left font-bold text-slate-300 hover:text-white transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{title}</span>
          <ChevronDownIcon className={`transition-transform duration-200 text-slate-500 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </h3>
      {isOpen && (
        <div className="pt-4">
          <div className="space-y-3">
            {options.map(option => (
              <div key={option} className="flex items-center group cursor-pointer" onClick={() => handleCheckboxChange(option)}>
                <div className={`flex items-center justify-center w-4 h-4 rounded border ${selected.includes(option) ? 'bg-primary-600 border-primary-600' : 'border-slate-600 bg-slate-800 group-hover:border-primary-500'} transition-colors mr-3`}>
                     {selected.includes(option) && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                     )}
                </div>
                <label htmlFor={`${title}-${option}`} className={`text-sm cursor-pointer select-none ${selected.includes(option) ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-300'}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};