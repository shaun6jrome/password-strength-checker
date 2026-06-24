/**
 * App.jsx
 * 
 * Root application component for CyberShield Password Strength Analyzer.
 * Orchestrates all child components and manages the password state.
 * Provides real-time analysis as the user types.
 */

import { useState, useMemo } from 'react';
import PasswordInput from './components/PasswordInput';
import StrengthMeter from './components/StrengthMeter';
import SecurityChecklist from './components/SecurityChecklist';
import PasswordStats from './components/PasswordStats';
import Recommendations from './components/Recommendations';
import EntropyCard from './components/EntropyCard';
import { analyzePassword } from './utils/passwordAnalyzer';

export default function App() {
  // ── State: The current password string ──
  const [password, setPassword] = useState('');

  // ── Derived: Full analysis result (recalculated on every keystroke) ──
  const analysis = useMemo(() => analyzePassword(password), [password]);

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header / Hero ── */}
      <header className="relative overflow-hidden">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-cyan/5 rounded-full blur-[120px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-4">
          {/* Logo + Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-700/60 border border-dark-400/30 text-xs text-gray-400 mb-5">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              Real-time Security Analysis
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3">
              <span className="text-gray-100">Cyber</span>
              <span className="text-neon-cyan text-glow-cyan">Shield</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
              Advanced password strength analyzer with entropy estimation,
              security recommendations, and real-time visual feedback.
            </p>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Password Input — Full Width */}
        <PasswordInput password={password} onChange={setPassword} />

        {/* Strength Meter + Entropy — Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StrengthMeter
            score={analysis.score}
            strengthLabel={password ? analysis.strengthLabel : ''}
            strengthColor={analysis.strengthColor}
          />
          <EntropyCard password={password} />
        </div>

        {/* Password Stats — Full Width */}
        <PasswordStats stats={analysis.stats} />

        {/* Checklist + Recommendations — Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SecurityChecklist checks={password ? analysis.checks : null} />
          <Recommendations recommendations={analysis.recommendations} />
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-dark-400/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            <span className="text-gray-400 font-medium">CyberShield</span> — Password Strength Analyzer
          </p>
          <p>
            All analysis is performed locally. No data is transmitted.
          </p>
        </div>
      </footer>
    </div>
  );
}
