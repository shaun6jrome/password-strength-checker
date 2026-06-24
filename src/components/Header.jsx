export default function Header() {
  return (
    <header className="pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Minimal Shield Icon */}
        <div className="mb-6 rounded-full border border-white/[0.08] bg-zinc-900 p-4">
          <svg
            className="h-6 w-6 text-zinc-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L3 6v6.52c0 5.48 3.86 10.63 9 12.48 5.14-1.85 9-7 9-12.48V6l-9-4z" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 mb-3">
          CyberShield
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-sm text-zinc-500 leading-relaxed">
          Advanced password strength analyzer with entropy estimation, crack time analysis, and real-time security recommendations.
        </p>
      </div>
    </header>
  );
}
