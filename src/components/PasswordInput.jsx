/**
 * PasswordInput.jsx
 *
 * Minimal password input with inline action buttons.
 * - Monospace font, dark zinc background
 * - Show/hide, copy, clear — tiny inline SVG buttons
 * - Subtle "Copied" inline feedback
 */

import { useState, useRef } from 'react';

export default function PasswordInput({ password, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  /** Copy password to clipboard with brief feedback */
  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  /** Clear input and refocus */
  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-6">
      {/* Label */}
      <label
        htmlFor="password-input"
        className="block text-xs font-medium uppercase tracking-wider text-zinc-500 mb-3"
      >
        Password
      </label>

      {/* Input with inline action buttons */}
      <div className="relative">
        <input
          ref={inputRef}
          id="password-input"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter password"
          autoComplete="off"
          spellCheck="false"
          aria-label="Password input"
          className="w-full px-4 py-3 pr-28 bg-zinc-900 border border-white/[0.08] rounded-xl
                     font-mono text-sm text-zinc-100 placeholder-zinc-600
                     focus:outline-none focus:border-white/[0.16]
                     transition-colors duration-200"
        />

        {/* Action buttons — aligned inside the input, right side */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
          {/* Show / Hide */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {showPassword ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>

          {/* Copy */}
          <button
            type="button"
            onClick={handleCopy}
            disabled={!password}
            aria-label="Copy password"
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300
                       disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          </button>

          {/* Clear */}
          <button
            type="button"
            onClick={handleClear}
            disabled={!password}
            aria-label="Clear password"
            className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400
                       disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Inline "Copied" feedback */}
      {copied && (
        <p className="mt-2 text-xs text-emerald-400 transition-opacity duration-200">
          Copied to clipboard
        </p>
      )}
    </div>
  );
}
