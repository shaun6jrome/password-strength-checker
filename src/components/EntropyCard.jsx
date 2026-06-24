/**
 * EntropyCard.jsx
 * 
 * Displays password entropy calculation results including:
 * - Entropy value in bits
 * - Estimated resistance level
 * - Security explanation
 * - Visual entropy gauge
 */

import { useMemo } from 'react';
import {
  calculateEntropy,
  getResistanceLevel,
  getSecurityExplanation,
  getResistanceColor,
} from '../utils/entropyCalculator';

export default function EntropyCard({ password }) {
  // Compute entropy-related values whenever password changes
  const entropy = useMemo(() => calculateEntropy(password), [password]);
  const resistanceLevel = useMemo(() => getResistanceLevel(entropy), [entropy]);
  const explanation = useMemo(() => getSecurityExplanation(entropy), [entropy]);
  const resistanceColor = useMemo(() => getResistanceColor(resistanceLevel), [resistanceLevel]);

  // Calculate gauge percentage (cap at 128 bits for visual)
  const gaugePercent = Math.min((entropy / 128) * 100, 100);

  return (
    <div className="glass-card p-6 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-100">Entropy Analysis</h2>
          <p className="text-sm text-gray-400">
            Entropy = Length × log<sub>2</sub>(Character Set Size)
          </p>
        </div>
      </div>

      {/* Entropy Value & Resistance Level */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Entropy Bits */}
        <div className="p-4 rounded-xl bg-dark-800/60 border border-dark-400/20 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Entropy</p>
          <p
            className="text-3xl font-bold font-mono"
            style={{ color: resistanceColor }}
          >
            {entropy}
          </p>
          <p className="text-xs text-gray-500 mt-1">bits</p>
        </div>

        {/* Resistance Level */}
        <div className="p-4 rounded-xl bg-dark-800/60 border border-dark-400/20 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Resistance</p>
          <p
            className="text-lg font-bold"
            style={{ color: resistanceColor }}
          >
            {entropy > 0 ? resistanceLevel : '—'}
          </p>
          <p className="text-xs text-gray-500 mt-1">level</p>
        </div>
      </div>

      {/* Entropy Gauge Bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>0 bits</span>
          <span>128 bits</span>
        </div>
        <div className="h-2.5 bg-dark-800 rounded-full overflow-hidden border border-dark-400/20">
          <div
            className="h-full rounded-full transition-all duration-600"
            style={{
              width: `${gaugePercent}%`,
              backgroundColor: resistanceColor,
              boxShadow: `0 0 10px ${resistanceColor}30`,
              transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s ease',
            }}
            role="meter"
            aria-valuenow={entropy}
            aria-valuemin={0}
            aria-valuemax={128}
            aria-label={`Password entropy: ${entropy} bits`}
          />
        </div>
      </div>

      {/* Security Explanation */}
      <div className="p-4 rounded-xl bg-dark-800/40 border border-dark-400/15">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-sm text-gray-400 leading-relaxed">
            {entropy > 0 ? explanation : 'Enter a password to see entropy analysis.'}
          </p>
        </div>
      </div>
    </div>
  );
}
