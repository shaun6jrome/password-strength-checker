/**
 * Recommendations.jsx
 * 
 * Displays dynamic security recommendations based on
 * the current password analysis. Also includes a 
 * "Breach Check Placeholder" section for future API integration.
 */

export default function Recommendations({ recommendations }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Security Recommendations Card ── */}
      <div className="glass-card p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Recommendations</h2>
            <p className="text-sm text-gray-400">Tips to improve your password</p>
          </div>
        </div>

        {/* Recommendation Items */}
        <ul className="space-y-2.5" role="list" aria-label="Security recommendations">
          {recommendations.map((rec, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-dark-800/40 border border-dark-400/15
                         transition-all duration-300 hover:border-dark-400/30"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <span className="text-sm text-gray-300 leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Breach Check Placeholder Card ── */}
      <div className="glass-card p-6 md:p-8 border-dashed border-dark-400/40 relative overflow-hidden">
        {/* Decorative scan line */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-scan-line" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Breach Database Check</h2>
            <p className="text-sm text-gray-400">HaveIBeenPwned API Integration</p>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-400/15 text-center">
          <div className="text-4xl mb-3">🔒</div>
          <p className="text-sm font-semibold text-gray-300 mb-2">
            Future Enhancement: Breach Database Check
          </p>
          <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
            This section will integrate with the HaveIBeenPwned API to check if your
            password has appeared in known data breaches. Uses k-anonymity model for
            privacy — your full password is never sent over the network.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-600/50 border border-dark-400/20 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
}
