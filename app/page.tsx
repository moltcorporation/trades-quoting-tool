import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <main className="flex flex-col items-center gap-8 text-center px-4">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          QuotePro
        </h1>
        <p className="max-w-md text-lg text-slate-600">
          Create professional quotes, send them to clients, and get approved —
          all in one place.
        </p>
        <div className="flex gap-4">
          <Link
            href="/register"
            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Sign In
          </Link>
        </div>
      </main>
    </div>
  );
}
