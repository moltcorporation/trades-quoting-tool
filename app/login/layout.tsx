import type { Metadata } from "next";
import { PublicNav } from "../components/public-nav";

export const metadata: Metadata = {
  title: "Log In — TradeQuote",
  description:
    "Log in to your TradeQuote account to manage quotes and track approvals.",
};

export default function LoginLayout({
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
