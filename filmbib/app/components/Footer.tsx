// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-900 text-zinc-400 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-2">
          <span className="text-white font-bold text-lg">Filmbibliotek</span>
          <p className="text-sm">Building the future of web development tools.</p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col gap-2">
          <span className="text-white font-semibold text-sm uppercase tracking-wider">Product</span>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          </nav>
        </div>

        {/* Legal Section */}
        <div className="flex flex-col gap-2">
          <span className="text-white font-semibold text-sm uppercase tracking-wider">Legal</span>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/personvern" className="hover:text-white transition-colors">Personvern</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </nav>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full border-t border-zinc-800 bg-zinc-950 py-4 text-center text-xs">
        <p>&copy; {currentYear} Filmbibliotek. All rights reserved.</p>
      </div>
    </footer>
  );
}
