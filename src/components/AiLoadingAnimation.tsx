
import React from 'react';

const LogoIcon = () => (
    <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-600">
        <path d="M16 2.66699L29.3333 10.0003L16 17.3337L2.66667 10.0003L16 2.66699Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M29.3333 22.0003L16 29.3337L2.66667 22.0003" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M29.3333 16.0003L16 23.3337L2.66667 16.0003" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const loadingSteps = [
    "Analyzing your unique business goal...",
    "Evaluating your agency's priorities...",
    "Cross-referencing our database of solutions...",
    "Calculating AI match scores...",
    "Generating personalized insights...",
];

export const AiLoadingAnimation: React.FC = () => {
    const [currentStep, setCurrentStep] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % loadingSteps.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="flex-grow flex flex-col items-center justify-center bg-slate-50 p-4 absolute inset-0 z-50">
            <div className="relative flex items-center justify-center">
                <div className="absolute w-48 h-48 bg-primary-200 rounded-full animate-ping opacity-20"></div>
                <div className="absolute w-32 h-32 bg-primary-200 rounded-full animate-ping opacity-30 [animation-delay:0.5s]"></div>
                <LogoIcon />
            </div>
            <h1 className="mt-8 text-2xl font-bold text-slate-800 tracking-tight">Gemini is finding your matches...</h1>
            <div className="mt-4 h-6 w-full max-w-md text-center">
                <p className="text-slate-600 transition-opacity duration-500">{loadingSteps[currentStep]}</p>
            </div>
        </main>
    );
};