import React, { useState, useEffect, useRef } from 'react';
import { ROI_PROTOCOL_PRODUCT } from './constants';

interface Niche {
  name: string;
  retainer: string;
  scriptUrl: string;
}

const NICHES: Niche[] = [
  { name: 'Roofing Companies', retainer: '$1,500/mo', scriptUrl: ROI_PROTOCOL_PRODUCT.price === '$17' ? 'https://buy.stripe.com/test_roi_protocol' : '#' },
  { name: 'HVAC Contractors', retainer: '$1,800/mo', scriptUrl: ROI_PROTOCOL_PRODUCT.price === '$17' ? 'https://buy.stripe.com/test_roi_protocol' : '#' },
  { name: 'MedSpas', retainer: '$2,500/mo', scriptUrl: ROI_PROTOCOL_PRODUCT.price === '$17' ? 'https://buy.stripe.com/test_roi_protocol' : '#' },
  { name: 'Solar Installers', retainer: '$2,000/mo', scriptUrl: ROI_PROTOCOL_PRODUCT.price === '$17' ? 'https://buy.stripe.com/test_roi_protocol' : '#' },
  { name: 'Landscapers', retainer: '$1,200/mo', scriptUrl: ROI_PROTOCOL_PRODUCT.price === '$17' ? 'https://buy.stripe.com/test_roi_protocol' : '#' },
  { name: 'Dentists', retainer: '$1,500/mo', scriptUrl: ROI_PROTOCOL_PRODUCT.price === '$17' ? 'https://buy.stripe.com/test_roi_protocol' : '#' },
  { name: 'Personal Injury Lawyers', retainer: '$3,000/mo', scriptUrl: ROI_PROTOCOL_PRODUCT.price === '$17' ? 'https://buy.stripe.com/test_roi_protocol' : '#' },
  { name: 'Gyms & Fitness', retainer: '$1,000/mo', scriptUrl: ROI_PROTOCOL_PRODUCT.price === '$17' ? 'https://buy.stripe.com/test_roi_protocol' : '#' },
];

export const NicheRoulette: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentNiche, setCurrentNiche] = useState<Niche | null>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setCurrentNiche(null);

    let speed = 50;
    let counter = 0;
    const maxCount = 30 + Math.floor(Math.random() * 10); // Random spins between 30 and 40

    const spin = () => {
      setDisplayIndex(prev => (prev + 1) % NICHES.length);
      counter++;

      if (counter < maxCount) {
        // Slow down towards the end
        if (counter > maxCount - 10) {
           speed += 30;
        }
        intervalRef.current = setTimeout(spin, speed);
      } else {
        // Stop
        const finalIndex = (displayIndex + 1) % NICHES.length; // It will be the next one actually due to setDisplayIndex logic in next render, but let's just grab one
        // Actually, let's just pick a random one to be sure and set it
        const winnerIndex = Math.floor(Math.random() * NICHES.length);
        setDisplayIndex(winnerIndex);
        setCurrentNiche(NICHES[winnerIndex]);
        setIsSpinning(false);
      }
    };

    spin();
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 border-4 border-amber-500 rounded-3xl p-8 shadow-2xl shadow-amber-500/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter transform -rotate-2">
          <span className="text-amber-500">Niche</span> Roulette
        </h2>
        <p className="text-slate-400 text-sm mt-2">Stop overthinking. Let fate decide your fortune.</p>
      </div>

      <div className="bg-black border-4 border-slate-700 rounded-xl p-6 mb-8 relative overflow-hidden h-48 flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

        {/* Slot Machine Window */}
        <div className="relative z-10 text-center">
            {isSpinning ? (
                 <div className="animate-pulse">
                    <div className="text-3xl font-bold text-slate-300 blur-sm">{NICHES[displayIndex].name}</div>
                    <div className="text-xl text-slate-500 blur-sm mt-2">{NICHES[displayIndex].retainer}</div>
                 </div>
            ) : currentNiche ? (
                <div className="animate-bounce-in">
                    <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Winner</div>
                    <div className="text-3xl font-bold text-white text-shadow-glow">{currentNiche.name}</div>
                    <div className="text-xl text-emerald-400 font-mono mt-2">{currentNiche.retainer}</div>
                </div>
            ) : (
                <div className="text-slate-600 font-mono text-4xl">???</div>
            )}
        </div>
      </div>

      <div className="space-y-4">
        <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`w-full py-4 rounded-xl font-black text-xl uppercase tracking-widest transition-all transform shadow-lg
            ${isSpinning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed translate-y-1'
                : 'bg-gradient-to-b from-amber-400 to-orange-600 text-white hover:from-amber-300 hover:to-orange-500 hover:-translate-y-1 shadow-orange-900/50'
            }`}
        >
            {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
        </button>

        {currentNiche && !isSpinning && (
             <div className="animate-fade-in-up">
                 <a
                    href="https://buy.stripe.com/test_roi_protocol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-center transition-colors border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                 >
                     Download {currentNiche.name} Script
                 </a>
                 <p className="text-xs text-center text-slate-500 mt-2">
                    Includes cold email templates & objection handling.
                 </p>
             </div>
        )}
      </div>
    </div>
  );
};
