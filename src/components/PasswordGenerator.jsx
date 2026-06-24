/**
 * PasswordGenerator.jsx
 * 
 * Interactive password generator with configurable length
 * and character type toggles. Generates cryptographically
 * secure random passwords on demand.
 */

import { useState, useCallback } from 'react';
import { generatePassword } from '../utils/passwordGenerator';

export default function PasswordGenerator({ onGenerate }) {
  // Generator configuration state
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  // Toggle a character type option
  const toggleOption = useCallback((key) => {
    setOptions(prev => {
      const next = { ...prev, [key]: !prev[key] };
      // Prevent disabling ALL options
      if (!Object.values(next).some(Boolean)) return prev;
      return next;
    });
  }, []);

  // Generate and send password to parent
  const handleGenerate = useCallback(() => {
    const pwd = generatePassword({ length, ...options });
    onGenerate(pwd);
  }, [length, options, onGenerate]);

  // Character type toggle buttons config
  const toggles = [
    { key: 'uppercase', label: 'A-Z', icon: '🔠' },
    { key: 'lowercase', label: 'a-z', icon: '🔡' },
    { key: 'numbers', label: '0-9', icon: '🔢' },
    { key: 'symbols', label: '!@#', icon: '⚡' },
  ];

  return (
    <div className="glass-card p-6 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-neon-purple/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-100">Password Generator</h2>
          <p className="text-sm text-gray-400">Generate a strong random password</p>
        </div>
      </div>

      {/* Length Slider */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="pwd-length" className="text-sm text-gray-400">Length</label>
          <span className="text-sm font-mono font-bold text-neon-cyan">{length}</span>
        </div>
        <input
          id="pwd-length"
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer
                     bg-dark-800 border border-dark-400/20
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-neon-cyan
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,240,255,0.4)]
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:transition-all
                     [&::-webkit-slider-thumb]:hover:shadow-[0_0_16px_rgba(0,240,255,0.6)]"
          aria-label={`Password length: ${length} characters`}
        />
        <div className="flex justify-between text-[10px] text-gray-600 mt-1">
          <span>8</span>
          <span>24</span>
          <span>40</span>
          <span>56</span>
          <span>64</span>
        </div>
      </div>

      {/* Character Type Toggles */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        {toggles.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => toggleOption(key)}
            aria-pressed={options[key]}
            aria-label={`Toggle ${label}`}
            className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-medium
                        border transition-all duration-200 ${
                          options[key]
                            ? 'bg-neon-cyan/8 border-neon-cyan/25 text-neon-cyan'
                            : 'bg-dark-800/50 border-dark-400/20 text-gray-500 hover:border-dark-400/40'
                        }`}
          >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full py-3.5 rounded-xl font-semibold text-sm
                   bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20
                   border border-neon-cyan/30 text-neon-cyan
                   hover:from-neon-cyan/30 hover:to-neon-blue/30
                   hover:border-neon-cyan/50 hover:shadow-cyber
                   active:scale-[0.98] transition-all duration-200"
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
          Generate Secure Password
        </span>
      </button>
    </div>
  );
}
