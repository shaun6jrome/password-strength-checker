/**
 * StrengthMeter.jsx
 * 
 * Visual password strength meter with animated progress bar,
 * color-coded strength label, and numerical score display.
 */

import { useMemo } from 'react';

export default function StrengthMeter({ score, strengthLabel, strengthColor }) {
  // Compute the background gradient for the progress bar
  const progressStyle = useMemo(() => ({
    width: `${score}%`,
    backgroundColor: strengthColor,
    boxShadow: `0 0 12px ${strengthColor}40, 0 0 24px ${strengthColor}20`,
    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s ease',
  }), [score, strengthColor]);

  // Determine the label for each strength level with an icon
  const strengthData = useMemo(() => {
    const levels = [
      { label: 'Weak', min: 0, icon: '🔴' },
      { label: 'Fair', min: 30, icon: '🟠' },
      { label: 'Good', min: 50, icon: '🔵' },
      { label: 'Strong', min: 70, icon: '🟢' },
      { label: 'Very Strong', min: 90, icon: '💎' },
    ];
    return levels;
  }, []);

  return (
    <div className="glass-card p-6 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neon-blue/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Strength Meter</h2>
            <p className="text-sm text-gray-400">Overall password security rating</p>
          </div>
        </div>
        {/* Score Badge */}
        <div
          className="px-4 py-2 rounded-xl font-mono text-lg font-bold border"
          style={{
            color: strengthColor,
            borderColor: `${strengthColor}30`,
            backgroundColor: `${strengthColor}08`,
          }}
        >
          {score}/100
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-3 bg-dark-800 rounded-full overflow-hidden border border-dark-400/30">
          <div
            className="h-full rounded-full"
            style={progressStyle}
            role="progressbar"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Password strength: ${score} out of 100`}
          />
        </div>
      </div>

      {/* Strength Label */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span
          className="text-2xl font-bold tracking-wide"
          style={{ color: strengthColor }}
        >
          {strengthLabel || 'Enter Password'}
        </span>
      </div>

      {/* Strength Level Indicators */}
      <div className="flex justify-between gap-1">
        {strengthData.map((level) => {
          const isActive = score >= level.min;
          return (
            <div
              key={level.label}
              className={`flex-1 text-center py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-dark-600/80 text-gray-200'
                  : 'bg-dark-800/50 text-gray-600'
              }`}
            >
              <span className="block text-base mb-0.5">{level.icon}</span>
              {level.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
