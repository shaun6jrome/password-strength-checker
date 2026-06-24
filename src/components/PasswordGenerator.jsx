/**
 * PasswordGenerator.jsx
 *
 * Generates random passwords with configurable length and
 * character-type toggles. Uses crypto-backed generatePassword().
 *
 * Controls:
 *   - Range slider for length (8–64)
 *   - 4 toggle buttons: A-Z, a-z, 0-9, !@#
 *   - Generate button
 *
 * Props:
 *   onGenerate — callback receiving the generated password string
 */

import { useState } from 'react';
import { generatePassword } from '../utils/passwordGenerator';

const TOGGLE_OPTIONS = [
  { key: 'uppercase', label: 'A-Z' },
  { key: 'lowercase', label: 'a-z' },
  { key: 'numbers',   label: '0-9' },
  { key: 'symbols',   label: '!@#' },
];

export default function PasswordGenerator({ onGenerate }) {
  const [length, setLength] = useState(16);
  const [toggles, setToggles] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  /** Flip a single toggle on/off */
  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /** Build options and invoke the generator */
  const handleGenerate = () => {
    const password = generatePassword({ length, ...toggles });
    onGenerate?.(password);
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-zinc-900/50 p-6">
      {/* ── Header ──────────────────────────────────────────── */}
      <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        Generator
      </span>

      {/* ── Length Slider ───────────────────────────────────── */}
      <div className="mt-5 flex items-center gap-4">
        <label htmlFor="pw-length" className="text-sm text-zinc-400">
          Length
        </label>
        <input
          id="pw-length"
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-800
                     accent-zinc-400
                     [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-zinc-300"
          aria-label={`Password length: ${length}`}
        />
        <span className="w-8 text-right font-mono text-sm text-zinc-300">
          {length}
        </span>
      </div>

      {/* ── Character Toggles ───────────────────────────────── */}
      <div className="mt-4 flex flex-wrap gap-2">
        {TOGGLE_OPTIONS.map(({ key, label }) => {
          const active = toggles[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleToggle(key)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-colors
                ${
                  active
                    ? 'border-white/[0.1] bg-white/[0.06] text-zinc-300'
                    : 'border-white/[0.06] bg-transparent text-zinc-600'
                }`}
              aria-pressed={active}
              aria-label={`Toggle ${label} characters`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Separator ───────────────────────────────────────── */}
      <div className="my-5 border-t border-white/[0.04]" />

      {/* ── Generate Button ─────────────────────────────────── */}
      <button
        type="button"
        onClick={handleGenerate}
        className="w-full rounded-lg border border-white/[0.08] bg-zinc-800 px-4 py-2
                   text-sm font-medium text-zinc-300 transition-colors
                   hover:bg-zinc-700 active:bg-zinc-600"
        aria-label="Generate password"
      >
        Generate
      </button>
    </div>
  );
}
