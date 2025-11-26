
import React from 'react';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'stacks' | 'services';
  filters: {
    niche: string;
    goal: string;
    teamSize: string;
    serviceType: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    niche: string;
    goal: string;
    teamSize: string;
    serviceType: string;
  }>>;
  options: {
    niche: string[];
    goal: string[];
    teamSize: string[];
    serviceType: string[];
  };
}

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  filters,
  setFilters,
  options,
}) => {
  if (!isOpen) return null;

  const handleChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-xs bg-slate-900 border-l border-slate-800 h-full shadow-2xl overflow-y-auto animate-fade-in-right">
        <div className="p-4 flex justify-between items-center border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">Filters</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
            <XIcon />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {activeTab === 'stacks' ? (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">Niche</label>
                <select
                  value={filters.niche}
                  onChange={(e) => handleChange('niche', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  <option value="">All Niches</option>
                  {options.niche.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">Revenue Goal</label>
                <select
                  value={filters.goal}
                  onChange={(e) => handleChange('goal', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  <option value="">Any Goal</option>
                  {options.goal.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">Team Size</label>
                <select
                  value={filters.teamSize}
                  onChange={(e) => handleChange('teamSize', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  <option value="">Any Size</option>
                  {options.teamSize.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Service Type</label>
              <select
                value={filters.serviceType}
                onChange={(e) => handleChange('serviceType', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="">All Services</option>
                {options.serviceType.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          )}
          
          <button 
            onClick={() => {
                setFilters({ niche: '', goal: '', teamSize: '', serviceType: '' });
                onClose();
            }}
            className="w-full py-3 border border-slate-700 text-slate-400 font-bold rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            Clear All
          </button>
          
           <button 
            onClick={onClose}
            className="w-full py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
};
