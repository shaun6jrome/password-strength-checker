/**
 * CrackTimeCard.jsx
 * 
 * Displays the estimated time required to brute-force
 * the current password, based on entropy analysis.
 * Shows a human-readable duration with color-coded severity.
 */

import { useMemo } from 'react';
import { calculateEntropy } from '../utils/entropyCalculator';
import { estimateCrackTime } from '../utils/crackTimeEstimator';

export default function CrackTimeCard({ password }) {
  const entropy = useMemo(() => calculateEntropy(password), [password]);
  const crackTime = useMemo(() => estimateCrackTime(entropy), [entropy]);

  return (
    <div className="glass-card p-6 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-100">Time to Crack</h2>
          <p className="text-sm text-gray-400">Estimated brute-force resistance</p>
        </div>
      </div>

      {/* Main Display */}
      <div className="text-center p-6 rounded-xl bg-dark-800/60 border border-dark-400/20 mb-4">
        {/* Icon */}
        <div className="text-5xl mb-3">{crackTime.icon}</div>

        {/* Time Value */}
        <div
          className="text-2xl sm:text-3xl font-bold font-mono mb-2 transition-all duration-300"
          style={{ color: crackTime.color }}
        >
          {crackTime.display}
        </div>

        {/* Subtitle */}
        <p className="text-xs text-gray-500">
          at 10 billion guesses per second
        </p>
      </div>

      {/* Info Box */}
      <div className="p-3 rounded-xl bg-dark-800/40 border border-dark-400/15">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-xs text-gray-400 leading-relaxed">
            {entropy > 0
              ? 'Based on entropy calculation assuming a well-funded attacker with modern GPU hardware performing an offline brute-force attack.'
              : 'Enter a password to see the estimated crack time.'}
          </p>
        </div>
      </div>
    </div>
  );
}
