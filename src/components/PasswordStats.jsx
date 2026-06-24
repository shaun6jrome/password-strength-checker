/**
 * PasswordStats.jsx
 * 
 * Displays detailed password character statistics in a
 * clean grid layout with individual stat cards.
 */

export default function PasswordStats({ stats }) {
  // Define the stat items to display
  const statItems = [
    {
      label: 'Length',
      value: stats?.length ?? 0,
      icon: '📐',
      color: '#00f0ff',
      description: 'Total characters',
    },
    {
      label: 'Uppercase',
      value: stats?.uppercase ?? 0,
      icon: '🔠',
      color: '#bf00ff',
      description: 'A–Z letters',
    },
    {
      label: 'Lowercase',
      value: stats?.lowercase ?? 0,
      icon: '🔡',
      color: '#4d7cff',
      description: 'a–z letters',
    },
    {
      label: 'Numbers',
      value: stats?.numbers ?? 0,
      icon: '🔢',
      color: '#ffaa00',
      description: '0–9 digits',
    },
    {
      label: 'Symbols',
      value: stats?.symbols ?? 0,
      icon: '⚡',
      color: '#ff007f',
      description: 'Special chars',
    },
  ];

  return (
    <div className="glass-card p-6 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-neon-purple/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-neon-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-100">Password Statistics</h2>
          <p className="text-sm text-gray-400">Character composition breakdown</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {statItems.map((item, index) => (
          <div
            key={item.label}
            className="relative p-4 rounded-xl bg-dark-800/60 border border-dark-400/20
                       hover:border-opacity-50 transition-all duration-300 group text-center"
            style={{
              animationDelay: `${index * 80}ms`,
              '--hover-color': `${item.color}25`,
            }}
          >
            {/* Icon */}
            <div className="text-2xl mb-2">{item.icon}</div>

            {/* Value */}
            <div
              className="text-2xl font-bold font-mono mb-1 transition-all duration-300"
              style={{ color: item.value > 0 ? item.color : '#4b5563' }}
            >
              {item.value}
            </div>

            {/* Label */}
            <div className="text-xs font-semibold text-gray-300 mb-0.5">{item.label}</div>
            <div className="text-[10px] text-gray-500">{item.description}</div>

            {/* Active indicator dot */}
            {item.value > 0 && (
              <div
                className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: item.color }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
