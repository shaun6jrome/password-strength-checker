/**
 * Recommendations.jsx
 *
 * Two sections stacked vertically:
 *
 * A) RECOMMENDATIONS — a simple list of text suggestions,
 *    each prefixed with a subtle arrow character.
 *
 * B) BREACH CHECK — a dashed-border card indicating planned
 *    HaveIBeenPwned API integration.
 *
 * Props:
 *   recommendations — string[] of suggestion messages
 */

export default function Recommendations({ recommendations = [] }) {
  return (
    <div className="space-y-4">
      {/* ── Section A: Recommendations ──────────────────────── */}
      <div className="rounded-2xl border border-white/[0.06] bg-zinc-900/50 p-6">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Recommendations
        </span>

        {recommendations.length > 0 ? (
          <ul className="mt-4 space-y-2" aria-label="Password recommendations">
            {recommendations.map((text, idx) => (
              <li key={idx} className="flex gap-2 text-sm leading-relaxed">
                <span className="shrink-0 text-zinc-600" aria-hidden="true">
                  &rarr;
                </span>
                <span className="text-zinc-400">{text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-zinc-600">
            No recommendations — your password looks solid.
          </p>
        )}
      </div>

      {/* ── Section B: Breach Check ─────────────────────────── */}
      <div className="rounded-2xl border border-dashed border-white/[0.08] bg-zinc-900/30 p-6">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Breach Database
        </span>

        <p className="mt-3 text-sm text-zinc-500">
          Planned integration with HaveIBeenPwned API
        </p>

        <span className="mt-3 inline-block rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-0.5 text-[11px] font-medium text-zinc-500">
          Coming soon
        </span>
      </div>
    </div>
  );
}
