/**
 * SecurityChecklist.jsx
 * 
 * Displays a live security validation checklist.
 * Each criterion updates in real time as the user types.
 * Shows check/cross icons with color-coded status.
 */

export default function SecurityChecklist({ checks }) {
  // Define the checklist items with labels and keys
  const checklistItems = [
    { key: 'minLength', label: 'Minimum 8 characters', icon: '📏' },
    { key: 'hasUppercase', label: 'Contains uppercase letter', icon: '🔠' },
    { key: 'hasLowercase', label: 'Contains lowercase letter', icon: '🔡' },
    { key: 'hasNumbers', label: 'Contains number', icon: '🔢' },
    { key: 'hasSpecial', label: 'Contains special character', icon: '✨' },
    { key: 'noCommonPatterns', label: 'No common patterns', icon: '🛡️' },
    { key: 'noExcessiveRepetition', label: 'No excessive repetition', icon: '🔄' },
  ];

  // Count how many checks are passing
  const passedCount = checks
    ? Object.values(checks).filter(Boolean).length
    : 0;
  const totalCount = checklistItems.length;

  return (
    <div className="glass-card p-6 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neon-green/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Security Checklist</h2>
            <p className="text-sm text-gray-400">Real-time validation status</p>
          </div>
        </div>
        {/* Pass Counter Badge */}
        <div className={`px-3 py-1 rounded-lg text-sm font-mono font-semibold border ${
          passedCount === totalCount
            ? 'text-neon-green border-neon-green/30 bg-neon-green/5'
            : 'text-gray-400 border-dark-400/30 bg-dark-800/50'
        }`}>
          {passedCount}/{totalCount}
        </div>
      </div>

      {/* Checklist Items */}
      <ul className="space-y-3" role="list" aria-label="Security checklist">
        {checklistItems.map((item, index) => {
          const isPassed = checks?.[item.key] ?? false;
          return (
            <li
              key={item.key}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isPassed
                  ? 'bg-neon-green/5 border border-neon-green/15'
                  : 'bg-dark-800/40 border border-dark-400/20'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Status Icon */}
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isPassed
                  ? 'bg-neon-green/15'
                  : 'bg-dark-600/50'
              }`}>
                {isPassed ? (
                  <svg className="w-4 h-4 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>

              {/* Item Label */}
              <span className={`text-sm font-medium transition-colors duration-300 ${
                isPassed ? 'text-gray-200' : 'text-gray-500'
              }`}>
                {item.icon} {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
