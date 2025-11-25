
import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Animate progress change
    setDisplayProgress(progress);
  }, [progress]);

  return (
    <div className="w-full max-w-sm mx-auto my-8">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-primary-700">Match Profile Completion</span>
        <span className="text-sm font-medium text-primary-700">{Math.round(displayProgress)}%</span>
      </div>
      <div className="w-full bg-primary-200 rounded-full h-2.5">
        <div
          className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${displayProgress}%` }}
        ></div>
      </div>
    </div>
  );
};