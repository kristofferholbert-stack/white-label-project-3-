
import React, { useState } from 'react';
import type { Priorities } from './types';

interface Step2PrioritiesProps {
  priorities: Priorities;
  onBack: () => void;
  onSubmit: (priorities: Priorities) => void;
}

interface PrioritySliderProps {
  label: string;
  lowLabel: string;
  highLabel: string;
  value: number;
  onChange: (value: number) => void;
  description: string;
}

const PrioritySlider: React.FC<PrioritySliderProps> = ({ label, lowLabel, highLabel, value, onChange, description }) => {
    
    const getLabelForValue = () => {
        if (value < 15) return lowLabel;
        if (value > 85) return highLabel;
        if (value > 40 && value < 60) return "Balanced";
        return null;
    }

    const valueLabel = getLabelForValue();

    return (
        <div className="p-6 bg-white border border-slate-200 rounded-xl">
            <div className="flex justify-between items-center">
                <label className="text-lg font-bold text-slate-800">{label}</label>
                {valueLabel && <span className="px-3 py-1 text-sm font-semibold text-primary-800 bg-primary-100 rounded-full">{valueLabel}</span>}
            </div>
            <p className="text-sm text-slate-500 mt-1 mb-6">{description}</p>
            <div className="relative">
                <input type="range" min="0" max="100" value={value} onChange={(e) => onChange(parseInt(e.target.value, 10))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
            </div>
            <div className="flex justify-between text-xs font-medium text-slate-500 mt-2">
                <span className="text-left w-1/3">{lowLabel}</span>
                <span className="text-center w-1/3 text-primary-700 font-bold">{value}%</span>
                <span className="text-right w-1/3">{highLabel}</span>
            </div>
        </div>
    );
};


export const Step2Priorities: React.FC<Step2PrioritiesProps> = ({ priorities: initialPriorities, onBack, onSubmit }) => {
  const [priorities, setPriorities] = useState<Priorities>(initialPriorities);

  const updatePriority = (key: keyof Priorities, value: number) => {
    setPriorities(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(priorities);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Set Your Business Priorities</h1>
        <p className="mt-3 max-w-xl mx-auto text-md text-slate-600">
          Tell us what matters most for your agency's business model. This helps our AI understand the kind of partnership that will be most profitable for you.
        </p>
      </div>
      
      <div className="space-y-6">
        <PrioritySlider
          label="Profitability Model"
          lowLabel="Low Client Cost"
          highLabel="High Agency Margin"
          value={priorities.marginVsCost}
          onChange={(v) => updatePriority('marginVsCost', v)}
          description="Should the solution be affordable for your clients, or offer the highest possible resale margin for your agency?"
        />
        <PrioritySlider
          label="Implementation Style"
          lowLabel="Fast & Simple Setup"
          highLabel="Deep Customization"
          value={priorities.speedVsCustomization}
          onChange={(v) => updatePriority('speedVsCustomization', v)}
          description="Do you prefer a turnkey solution you can launch quickly, or a flexible platform you can deeply customize and integrate?"
        />
        <PrioritySlider
          label="Technical Power"
          lowLabel="Easy to Integrate"
          highLabel="Powerful API"
          value={priorities.easeVsPower}
          onChange={(v) => updatePriority('easeVsPower', v)}
          description="Are you looking for a simple, no-code integration, or a powerful, developer-focused API to build a unique product?"
        />
      </div>

      <div className="mt-10 flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-slate-600 font-semibold py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Next: Refine Details
        </button>
      </div>
    </div>
  );
};
