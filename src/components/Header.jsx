/**
 * Header.jsx
 * 
 * Application header with animated shield logo,
 * title, description, and a floating particle effect.
 */

import { useState, useEffect } from 'react';

export default function Header() {
  // Animate the shield glow on mount
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="relative overflow-hidden">
      {/* ── Background Effects ── */}
      {/* Top radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-cyan/5 rounded-full blur-[140px]" />
      {/* Side accent glows */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-neon-purple/5 rounded-full blur-[100px]" />
      <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-neon-blue/5 rounded-full blur-[100px]" />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/[0.03] via-transparent to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-6">
        <div className="text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-700/60 border border-dark-400/30 text-xs text-gray-400 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            Real-time Security Analysis
          </div>

          {/* Animated Shield Icon */}
          <div className={`mx-auto mb-5 transition-all duration-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="relative inline-block">
              {/* Outer glow ring */}
              <div className="absolute inset-0 -m-3 rounded-full bg-neon-cyan/10 animate-pulse-slow blur-md" />
              
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="headerShieldGrad" x1="16" y1="4" x2="48" y2="60" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#00f0ff" />
                    <stop offset="100%" stopColor="#4d7cff" />
                  </linearGradient>
                  <linearGradient id="headerLockGrad" x1="24" y1="22" x2="40" y2="48" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0a0e17" />
                    <stop offset="100%" stopColor="#151d2e" />
                  </linearGradient>
                </defs>
                <path d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4z" fill="url(#headerShieldGrad)" opacity="0.9" />
                <path d="M32 8L12 18v14c0 12.8 8.96 24.64 20 28 11.04-3.36 20-15.2 20-28V18L32 8z" fill="url(#headerLockGrad)" />
                <rect x="24" y="30" width="16" height="14" rx="3" fill="#00f0ff" opacity="0.85" />
                <path d="M26 30v-5a6 6 0 0112 0v5" stroke="#00f0ff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.85" />
                <circle cx="32" cy="36" r="2.5" fill="#0a0e17" />
                <rect x="31" y="37" width="2" height="4" rx="1" fill="#0a0e17" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 transition-all duration-500 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-gray-100">Cyber</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">Shield</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed transition-all duration-500 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Advanced password strength analyzer with entropy estimation, crack time analysis,
            security recommendations, and real-time visual feedback.
          </p>

          {/* Feature Pills */}
          <div className={`flex flex-wrap justify-center gap-2 mt-5 transition-all duration-500 delay-[400ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {['Entropy Analysis', 'Crack Time', 'Strength Score', 'Password Generator'].map((pill) => (
              <span
                key={pill}
                className="px-3 py-1 rounded-full bg-dark-700/40 border border-dark-400/20 text-[11px] text-gray-500 font-medium"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom separator line */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-dark-400/30 to-transparent" />
      </div>
    </header>
  );
}
