/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#edfcf5',
          100: '#d4f7e6',
          200: '#abefd2',
          300: '#73e2b7',
          400: '#39cd96',
          500: '#16b57e',
          600: '#0a9265',
          700: '#087553',
          800: '#095c43',
          900: '#084b38',
          950: '#032a20',
        },
        neon: {
          cyan: '#00f0ff',
          green: '#39ff14',
          purple: '#bf00ff',
          pink: '#ff007f',
          blue: '#4d7cff',
        },
        dark: {
          900: '#0a0e17',
          800: '#0f1523',
          700: '#151d2e',
          600: '#1a2438',
          500: '#1f2d45',
          400: '#283a55',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'progress': 'progressFill 0.6s ease-out',
        'scan-line': 'scanLine 3s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 240, 255, 0.2), 0 0 10px rgba(0, 240, 255, 0.1)' },
          '100%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.4), 0 0 30px rgba(0, 240, 255, 0.2)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      boxShadow: {
        'cyber': '0 0 15px rgba(0, 240, 255, 0.15), 0 0 30px rgba(0, 240, 255, 0.05)',
        'cyber-lg': '0 0 25px rgba(0, 240, 255, 0.2), 0 0 50px rgba(0, 240, 255, 0.1)',
        'neon-green': '0 0 15px rgba(57, 255, 20, 0.15)',
        'neon-red': '0 0 15px rgba(255, 0, 80, 0.15)',
      },
    },
  },
  plugins: [],
}
