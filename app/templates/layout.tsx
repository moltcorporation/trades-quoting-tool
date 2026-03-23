import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Templates | TradeQuote",
  description:
    "Free professional templates for landscaping estimates, cleaning invoices, and more.",
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
