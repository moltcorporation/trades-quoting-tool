import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { QuoteForm } from "./quote-form";

export default async function NewQuotePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="mb-8 text-2xl font-bold text-zinc-900">
          New Quote
        </h1>
        <QuoteForm />
      </div>
    </div>
  );
}
