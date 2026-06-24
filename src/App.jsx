/**
 * App.jsx
 * 
 * Root application component for CyberShield Password Strength Analyzer.
 * Orchestrates all child components and manages the password state.
 * Provides real-time analysis as the user types.
 */

import { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PasswordInput from './components/PasswordInput';
import StrengthMeter from './components/StrengthMeter';
import SecurityChecklist from './components/SecurityChecklist';
import PasswordStats from './components/PasswordStats';
import Recommendations from './components/Recommendations';
import EntropyCard from './components/EntropyCard';
import PasswordGenerator from './components/PasswordGenerator';
import CrackTimeCard from './components/CrackTimeCard';
import { analyzePassword } from './utils/passwordAnalyzer';

export default function App() {
  // ── State: The current password string ──
  const [password, setPassword] = useState('');

  // ── Derived: Full analysis result (recalculated on every keystroke) ──
  const analysis = useMemo(() => analyzePassword(password), [password]);

  // ── Handler: Receive password from generator ──
  const handleGenerate = useCallback((generatedPwd) => {
    setPassword(generatedPwd);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ── */}
      <Header />

      {/* ── Main Content ── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-6 mt-8">
        {/* Password Input — Full Width */}
        <PasswordInput password={password} onChange={setPassword} />

        {/* Strength Meter + Crack Time — Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StrengthMeter
            score={analysis.score}
            strengthLabel={password ? analysis.strengthLabel : ''}
            strengthColor={analysis.strengthColor}
          />
          <CrackTimeCard password={password} />
        </div>

        {/* Entropy + Generator — Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EntropyCard password={password} />
          <PasswordGenerator onGenerate={handleGenerate} />
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
      <Footer />
    </div>
  );
}
