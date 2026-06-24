/**
 * PasswordStats.jsx
 *
 * Displays a grid of 5 password composition statistics:
 * Length, Upper, Lower, Digits, Symbols.
 * Values are rendered in monospace; zero values are dimmed.
 *
 * Props:
 *   stats — object with numeric keys:
 *     length, uppercase, lowercase, numbers, symbols
 */

const STAT_FIELDS = [
  { key: 'length',    label: 'Length' },
  { key: 'uppercase', label: 'Upper' },
  { key: 'lowercase', label: 'Lower' },
  { key: 'numbers',   label: 'Digits' },
  { key: 'symbols',   label: 'Symbols' },
];

export default function PasswordStats({ stats = {} }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-zinc-900/50 p-6">
      {/* ── Header ──────────────────────────────────────────── */}
      <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        Composition
      </span>

      {/* ── Stats Grid ──────────────────────────────────────── */}
      <div
        className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-5"
        aria-label="Password composition statistics"
      >
        {STAT_FIELDS.map(({ key, label }) => {
          const value = stats[key] ?? 0;
          const hasValue = value > 0;

          return (
            <div key={key} className="flex flex-col">
              {/* Numeric value */}
              <span
                className={`font-mono text-2xl font-semibold ${
                  hasValue ? 'text-zinc-200' : 'text-zinc-700'
                }`}
              >
                {value}
              </span>
              {/* Label */}
              <span className="mt-1 text-xs text-zinc-500">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
