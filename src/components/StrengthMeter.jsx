/**
 * StrengthMeter.jsx
 *
 * Visual password strength indicator.
 * - Uppercase section label
 * - Large strength label with dynamic color
 * - 4px progress bar on zinc-800 track
 * - Monospace score display
 * - Five text-only level indicators
 */

import { useMemo } from 'react';

/** Strength level thresholds — no emojis, text only */
const LEVELS = [
  { label: 'Weak', min: 0 },
  { label: 'Fair', min: 30 },
  { label: 'Good', min: 50 },
  { label: 'Strong', min: 70 },
  { label: 'Very Strong', min: 90 },
];

export default function StrengthMeter({ score, strengthLabel, strengthColor }) {
  /** Progress bar inline style — smooth transition, no glow */
  const barStyle = useMemo(() => ({
    width: `${score}%`,
    backgroundColor: strengthColor,
    transition: 'width 0.5s ease, background-color 0.3s ease',
  }), [score, strengthColor]);

  return (
    <div className="bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-6">
      {/* Section label */}
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-4">
        Strength
      </p>

      {/* Large strength label */}
      <p
        className="text-2xl font-semibold mb-5 transition-colors duration-300"
        style={{ color: strengthColor }}
      >
        {strengthLabel || 'Enter Password'}
      </p>

      {/* Progress bar — 4px height, rounded-full track */}
      <div className="mb-3">
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={barStyle}
            role="progressbar"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Password strength: ${score} out of 100`}
          />
        </div>
      </div>

      {/* Score in monospace */}
      <p className="font-mono text-sm text-zinc-400 mb-5">
        {score} <span className="text-zinc-600">/ 100</span>
      </p>

      {/* Separator */}
      <div className="border-t border-white/[0.04] pt-4">
        {/* Level indicators — text row */}
        <div className="flex justify-between gap-1">
          {LEVELS.map((level) => {
            const isActive = strengthLabel === level.label;
            return (
              <span
                key={level.label}
                className={`text-xs transition-colors duration-200 ${
                  isActive
                    ? 'text-zinc-100 font-medium'
                    : 'text-zinc-600'
                }`}
              >
                {level.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
