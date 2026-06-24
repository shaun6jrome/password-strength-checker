/**
 * EntropyCard.jsx
 *
 * Password entropy analysis display.
 * - Uppercase section label
 * - Two side-by-side stats: bits + resistance level
 * - Thin progress bar (0–128 bits scale)
 * - One-line security explanation
 */

import { useMemo } from 'react';
import {
  calculateEntropy,
  getResistanceLevel,
  getSecurityExplanation,
  getResistanceColor,
} from '../utils/entropyCalculator';

export default function EntropyCard({ password }) {
  const entropy = useMemo(() => calculateEntropy(password), [password]);
  const resistanceLevel = useMemo(() => getResistanceLevel(entropy), [entropy]);
  const explanation = useMemo(() => getSecurityExplanation(entropy), [entropy]);
  const resistanceColor = useMemo(() => getResistanceColor(resistanceLevel), [resistanceLevel]);

  /** Gauge capped at 128 bits */
  const gaugePercent = Math.min((entropy / 128) * 100, 100);

  return (
    <div className="bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-6">
      {/* Section label */}
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-5">
        Entropy
      </p>

      {/* Two stat boxes side by side */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {/* Entropy bits */}
        <div className="bg-zinc-900 border border-white/[0.06] rounded-xl p-4">
          <p className="text-xs text-zinc-500 mb-1">Bits</p>
          <p
            className="text-2xl font-mono font-semibold transition-colors duration-300"
            style={{ color: resistanceColor }}
          >
            {entropy}
          </p>
        </div>

        {/* Resistance level */}
        <div className="bg-zinc-900 border border-white/[0.06] rounded-xl p-4">
          <p className="text-xs text-zinc-500 mb-1">Resistance</p>
          <p
            className="text-lg font-semibold transition-colors duration-300"
            style={{ color: resistanceColor }}
          >
            {entropy > 0 ? resistanceLevel : '\u2014'}
          </p>
        </div>
      </div>

      {/* Progress bar — thin, 0 to 128 bits */}
      <div className="mb-2">
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${gaugePercent}%`,
              backgroundColor: resistanceColor,
            }}
            role="meter"
            aria-valuenow={entropy}
            aria-valuemin={0}
            aria-valuemax={128}
            aria-label={`Password entropy: ${entropy} bits`}
          />
        </div>
      </div>

      {/* Scale labels */}
      <div className="flex justify-between text-[10px] text-zinc-600 font-mono mb-5">
        <span>0</span>
        <span>128 bits</span>
      </div>

      {/* Separator + explanation */}
      <div className="border-t border-white/[0.04] pt-4">
        <p className="text-xs text-zinc-500 leading-relaxed">
          {entropy > 0 ? explanation : 'Enter a password to see entropy analysis.'}
        </p>
      </div>
    </div>
  );
}
