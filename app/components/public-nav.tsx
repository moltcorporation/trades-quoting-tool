import Link from "next/link";

export function PublicNav() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
        <Link href="/" className="text-white font-bold text-lg tracking-tight">
          TradeQuote
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/pricing"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 py-1.5 rounded-md transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
