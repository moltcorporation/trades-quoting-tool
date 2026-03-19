import Link from "next/link";

export default function PublicNav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
          TradeQuote
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">
            Pricing
          </Link>
          <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
