/**
 * Footer.jsx
 * 
 * Application footer with privacy notice and branding.
 */

export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-8">
      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-dark-400/30 to-transparent mb-6" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-neon-cyan/60" viewBox="0 0 64 64" fill="none">
            <path d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4z" fill="currentColor" />
          </svg>
          <span className="text-sm text-gray-400 font-medium">CyberShield</span>
          <span className="text-xs text-gray-600">v1.0</span>
        </div>

        {/* Privacy Notice */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green/60" />
          All analysis is performed locally — no data is transmitted
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/shaun6jrome/password-strength-checker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-neon-cyan transition-colors"
          >
            GitHub
          </a>
          <span className="text-gray-700">•</span>
          <span className="text-xs text-gray-600">
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
