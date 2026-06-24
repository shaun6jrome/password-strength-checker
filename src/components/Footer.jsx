export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 py-10 border-t border-white/[0.04] text-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-zinc-500 mb-2">
          &copy; {currentYear} CyberShield. All rights reserved.
        </p>
        <p className="text-xs text-zinc-600">
          Client-side analysis only. Your password never leaves your device.
        </p>
      </div>
    </footer>
  );
}
