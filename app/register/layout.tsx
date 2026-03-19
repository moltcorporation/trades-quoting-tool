import type { Metadata } from "next";
import PublicNav from "@/app/components/public-nav";

export const metadata: Metadata = {
  title: "Create Your Account — TradeQuote",
  description:
    "Sign up for TradeQuote and start sending professional quotes to your clients in minutes. Free to start.",
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
