
import React from 'react';

interface JourneyStepperProps {
  currentStep: number;
}

const steps = ['Your Goal', 'Your Priorities', 'Key Details', 'Get Matches'];

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
)

export const JourneyStepper: React.FC<JourneyStepperProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress" className="mb-12">
      <ol role="list" className="flex items-center justify-center">
        {steps.map((step, stepIdx) => (
          <li key={step} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {stepIdx < currentStep -1 ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-primary-600" />
                </div>
                <div className="relative w-8 h-8 flex items-center justify-center bg-primary-600 rounded-full">
                  <CheckIcon />
                </div>
                <span className="absolute mt-2 text-sm font-medium text-slate-600 w-20 text-center -ml-6">{step}</span>
              </>
            ) : stepIdx === currentStep - 1 ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-200" />
                </div>
                <div className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-primary-600 rounded-full">
                  <span className="h-2.5 w-2.5 bg-primary-600 rounded-full" />
                </div>
                <span className="absolute mt-2 text-sm font-bold text-primary-600 w-20 text-center -ml-6">{step}</span>
              </>
            ) : (
              <>
                {stepIdx !== 0 && <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-slate-200" />
                </div>}
                <div className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-slate-300 rounded-full" />
                <span className="absolute mt-2 text-sm font-medium text-slate-500 w-20 text-center -ml-6">{step}</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};