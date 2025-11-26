import React, { useState } from 'react';

const ThumbsUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 10v12" />
        <path d="M18 10V4a2 2 0 0 0-2-2H8.5a5.5 5.5 0 0 0-5.3 4.5L2 12v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-5l5.3-6.7A1.2 1.2 0 0 0 18 10z" />
    </svg>
);

const ThumbsDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 14V2" />
        <path d="M18 14v6a2 2 0 0 1-2 2H8.5a5.5 5.5 0 0 1-5.3-4.5L2 12V3a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v5l5.3 6.7A1.2 1.2 0 0 1 18 14z" />
    </svg>
);

export const Feedback: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mt-8 p-4 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
        <p className="font-medium text-emerald-400">Thank you for your feedback!</p>
      </div>
    );
  }

  return (
    <div className="mt-12 p-6 text-center bg-slate-900 border border-slate-800 rounded-lg">
      <p className="font-semibold text-slate-300 mb-4">Was this search helpful?</p>
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setSubmitted(true)}
          className="flex items-center gap-2 px-4 py-2 border border-slate-700 bg-slate-800 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <ThumbsUpIcon />
          <span>Yes</span>
        </button>
        <button
          onClick={() => setSubmitted(true)}
          className="flex items-center gap-2 px-4 py-2 border border-slate-700 bg-slate-800 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <ThumbsDownIcon />
          <span>No</span>
        </button>
      </div>
    </div>
  );
};