import React, { useState, useMemo } from 'react';
import type { Page } from './types';
import { ENHANCED_INSPIRATIONS } from './constants';

interface InspirationsPageProps {
    onSelectInspiration: (goal: string) => void;
    onBack: () => void;
}

// Icons
const BackArrowIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const FilterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;

export const InspirationsPage: React.FC<InspirationsPageProps> = ({ onSelectInspiration, onBack }) => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const categories = ['All', ...new Set(ENHANCED_INSPIRATIONS.map(i => i.category))];

    const filteredItems = useMemo(() => {
        return ENHANCED_INSPIRATIONS.filter(item => {
            const matchesCategory = filter === 'All' || item.category === filter;
            const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [filter, search]);

    return (
        <main className="flex-grow bg-gray-950 min-h-screen flex flex-col pt-20">
            {/* Sticky Header */}
            <div className="sticky top-[80px] z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
                                <BackArrowIcon />
                            </button>
                            <h1 className="text-xl font-bold text-white">Business Models</h1>
                            <span className="px-2 py-1 bg-slate-800 rounded-md text-xs text-slate-400 font-mono">{filteredItems.length}</span>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-grow md:flex-grow-0">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none"><SearchIcon /></div>
                                <input
                                    type="text"
                                    placeholder="Filter models..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full md:w-64 bg-slate-950 border border-slate-700 text-sm rounded-lg py-2 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none placeholder-slate-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pills */}
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                                    filter === cat
                                    ? 'bg-white text-slate-900'
                                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-slate-900 border border-slate-800 rounded-2xl p-1 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/10 flex flex-col h-full"
                        >
                            <div className="bg-slate-950/50 rounded-xl p-6 h-full flex flex-col relative overflow-hidden">
                                {/* Hover Glow */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${item.trending ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                                        {item.trending ? <ZapIcon /> : <FilterIcon />}
                                    </div>
                                    {item.trending && <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">Hot</span>}
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{item.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">{item.description}</p>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-2 mb-6">
                                    <div className="bg-slate-900 rounded p-2 border border-slate-800 text-center">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Difficulty</p>
                                        <p className={`text-xs font-bold ${item.difficulty === 'Easy' ? 'text-green-400' : item.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{item.difficulty}</p>
                                    </div>
                                    <div className="bg-slate-900 rounded p-2 border border-slate-800 text-center">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Potential</p>
                                        <p className="text-xs font-bold text-white">{item.potential}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => onSelectInspiration(item.prompt)}
                                    className="w-full py-2 bg-slate-800 hover:bg-primary-600 text-white text-sm font-bold rounded-lg transition-colors border border-slate-700 hover:border-primary-500 group-hover:shadow-lg"
                                >
                                    Launch This
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 text-slate-500 mb-4">
                              <SearchIcon />
                        </div>
                        <h3 className="text-xl font-bold text-white">No models found</h3>
                        <p className="text-slate-400">Try adjusting your filters or search query.</p>
                        <button onClick={() => {setFilter('All'); setSearch('')}} className="mt-4 text-primary-400 hover:text-primary-300 text-sm font-bold">Clear Filters</button>
                    </div>
                )}
            </div>
        </main>
    );
};
