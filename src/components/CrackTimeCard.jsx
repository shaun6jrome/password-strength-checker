/**
 * CrackTimeCard.jsx
 *
 * Estimated brute-force crack time display.
 * - Uppercase section label
 * - Large monospace time value with dynamic color
 * - Muted attack-rate subtitle
 * - One-line explanation
 */

import { useMemo } from 'react';
import { calculateEntropy } from '../utils/entropyCalculator';
import { estimateCrackTime } from '../utils/crackTimeEstimator';

export default function CrackTimeCard({ password }) {
  const entropy = useMemo(() => calculateEntropy(password), [password]);
  const crackTime = useMemo(() => estimateCrackTime(entropy), [entropy]);

  return (
    <div className="bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-6">
      {/* Section label */}
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-5">
        Time to Crack
      </p>

      {/* Primary time display */}
      <p
        className="text-3xl font-mono font-semibold mb-1.5 transition-colors duration-300"
        style={{ color: crackTime.color }}
      >
        {crackTime.display}
      </p>

      {/* Attack rate context */}
      <p className="text-xs text-zinc-600 mb-5">
        at 10B guesses / sec
      </p>

      {/* Separator + explanation */}
      <div className="border-t border-white/[0.04] pt-4">
        <p className="text-xs text-zinc-500 leading-relaxed">
          {entropy > 0
            ? 'Assumes offline brute-force with modern GPU hardware at 10 billion guesses per second.'
            : 'Enter a password to estimate crack time.'}
        </p>
      </div>
    </div>
  );
}
