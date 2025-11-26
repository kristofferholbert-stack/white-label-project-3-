import React from 'react';

interface IdentityLevel {
  name: string;
  slug: string;
  min_mrr: number;
  max_mrr: number | null;
  badge_icon: string;
  badge_color: string;
  description: string;
}

interface IdentityBadgeProps {
  level: IdentityLevel;
  currentMRR: number;
  size?: 'small' | 'medium' | 'large';
  showProgress?: boolean;
}

export const IdentityBadge: React.FC<IdentityBadgeProps> = ({
  level,
  currentMRR,
  size = 'medium',
  showProgress = false
}) => {
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const iconSizes = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl'
  };

  const progressPercentage = level.max_mrr
    ? Math.min(((currentMRR - level.min_mrr) / (level.max_mrr - level.min_mrr)) * 100, 100)
    : 100;

  return (
    <div className="inline-block">
      <div
        className={`inline-flex items-center gap-2 rounded-full font-bold transition-all ${sizeClasses[size]}`}
        style={{
          background: `linear-gradient(135deg, ${level.badge_color}20, ${level.badge_color}40)`,
          border: `2px solid ${level.badge_color}80`,
          color: level.badge_color
        }}
      >
        <span className={iconSizes[size]}>{level.badge_icon}</span>
        <span>{level.name}</span>
      </div>

      {showProgress && level.max_mrr && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>${(level.min_mrr / 1000).toFixed(0)}k</span>
            <span className="font-bold" style={{ color: level.badge_color }}>
              {progressPercentage.toFixed(0)}%
            </span>
            <span>${(level.max_mrr / 1000).toFixed(0)}k</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500 rounded-full"
              style={{
                width: `${progressPercentage}%`,
                background: `linear-gradient(90deg, ${level.badge_color}80, ${level.badge_color})`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
