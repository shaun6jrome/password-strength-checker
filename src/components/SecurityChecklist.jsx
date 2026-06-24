/**
 * SecurityChecklist.jsx
 *
 * Displays a 7-item password requirement checklist.
 * Each item shows a small status dot (emerald = pass, zinc-700 = fail)
 * and a text label that dims when the requirement is not met.
 *
 * Props:
 *   checks — object with boolean keys:
 *     minLength, hasUppercase, hasLowercase, hasNumbers,
 *     hasSpecial, noCommonPatterns, noExcessiveRepetition
 */

const CHECKLIST_ITEMS = [
  { key: 'minLength',              label: 'Min 8 characters' },
  { key: 'hasUppercase',           label: 'Uppercase letter' },
  { key: 'hasLowercase',           label: 'Lowercase letter' },
  { key: 'hasNumbers',             label: 'Number' },
  { key: 'hasSpecial',             label: 'Special character' },
  { key: 'noCommonPatterns',       label: 'No common patterns' },
  { key: 'noExcessiveRepetition',  label: 'No excessive repetition' },
];

export default function SecurityChecklist({ checks }) {
  const safeChecks = checks || {};
  const passed = CHECKLIST_ITEMS.filter((item) => safeChecks[item.key]).length;
  const total = CHECKLIST_ITEMS.length;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-zinc-900/50 p-6">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Security Checklist
        </span>
        <span className="font-mono text-xs text-zinc-500">
          {passed} / {total}
        </span>
      </div>

      {/* ── Items ───────────────────────────────────────────── */}
      <ul className="space-y-2" aria-label="Password security checklist">
        {CHECKLIST_ITEMS.map((item) => {
          const met = !!safeChecks[item.key];
          return (
            <li key={item.key} className="flex items-center gap-3">
              {/* Status dot */}
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  met ? 'bg-emerald-400' : 'bg-zinc-700'
                }`}
                aria-hidden="true"
              />
              {/* Label */}
              <span
                className={`text-sm ${
                  met ? 'text-zinc-300' : 'text-zinc-600'
                }`}
              >
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
