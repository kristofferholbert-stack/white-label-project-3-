import React, { useEffect, useState } from 'react';

const steps = [
    "Analyzing business model parameters...",
    "Scanning 1,400+ vendor APIs...",
    "Calculating profit margins...",
    "Generating launch playbook...",
    "Finalizing your blueprint..."
];

export const BlueprintLoader: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 800); // Fast enough to not bore, slow enough to read
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="w-24 h-24 relative mb-8">
                <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-primary-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M2 12h10"/><path d="M9 4v16"/><path d="m3 9 3 3-3 3"/><path d="M14 8V7c0-1.1.9-2 2-2h6"/><path d="M14 12v-1c0-1.1.9-2 2-2h6"/><path d="M14 16v-1c0-1.1.9-2 2-2h6"/><path d="M14 20v-1c0-1.1.9-2 2-2h6"/></svg>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 text-center animate-pulse">
                Building Your Stack...
            </h2>

            <div className="h-8 overflow-hidden relative w-full max-w-md text-center">
                {steps.map((step, i) => (
                    <p
                        key={i}
                        className={`absolute width-full left-0 right-0 transition-all duration-500 ${
                            i === currentStep ? 'opacity-100 translate-y-0' :
                            i < currentStep ? 'opacity-0 -translate-y-4' : 'opacity-0 translate-y-4'
                        } text-slate-400 font-mono text-sm`}
                    >
                        {step}
                    </p>
                ))}
            </div>
        </div>
    );
};
