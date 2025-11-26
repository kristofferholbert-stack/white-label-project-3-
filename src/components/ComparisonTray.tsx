
import React from 'react';
import type { Solution } from '../types/types';

interface ComparisonTrayProps {
  selectedSolutions: Solution[];
  onCompare: () => void;
  onClear: () => void;
}

export const ComparisonTray: React.FC<ComparisonTrayProps> = ({ selectedSolutions, onCompare, onClear }) => {
  if (selectedSolutions.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4">
      <div className="max-w-4xl mx-auto bg-slate-800 text-white rounded-xl shadow-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <span className="font-semibold text-slate-300 hidden sm:inline">Compare:</span>
          <div className="flex items-center gap-3">
            {selectedSolutions.map(s => (
              <img
                key={s.id}
                src={s.logo}
                alt={s.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-md object-cover ring-2 ring-slate-600"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClear}
            className="text-slate-300 hover:text-white text-sm font-medium transition-colors px-3 py-2"
          >
            Clear
          </button>
          <button
            onClick={onCompare}
            disabled={selectedSolutions.length < 2}
            className="bg-primary-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-primary-400 disabled:cursor-not-allowed"
          >
            Compare ({selectedSolutions.length}/3)
          </button>
        </div>
      </div>
    </div>
  );
};
