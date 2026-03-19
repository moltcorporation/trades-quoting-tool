import type { Metadata } from "next";
import PublicNav from "@/app/components/public-nav";

export const metadata: Metadata = {
  title: "Log In — TradeQuote",
  description:
    "Log in to your TradeQuote account to manage quotes, track approvals, and get paid faster.",
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
