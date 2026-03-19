import type { Metadata } from "next";
import { PublicNav } from "../components/public-nav";

export const metadata: Metadata = {
  title: "Sign Up — TradeQuote",
  description:
    "Create your free TradeQuote account. Send professional quotes and get client approvals in one tap.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNav />
      {children}
    </>
  );
}
