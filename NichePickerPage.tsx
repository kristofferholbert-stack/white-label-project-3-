import React from 'react';
import { NicheRoulette } from './NicheRoulette';

export const NichePickerPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <NicheRoulette />
             <div className="mt-8 text-center">
                <a href="/" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">Back to Home</a>
            </div>
        </div>
    );
};
