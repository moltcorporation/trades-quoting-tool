import type { Metadata } from "next";
import { PublicNav } from "../components/public-nav";

export const metadata: Metadata = {
  title: "Set New Password — TradeQuote",
  description:
    "Set a new password for your TradeQuote account.",
};

export default function ResetPasswordLayout({
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
