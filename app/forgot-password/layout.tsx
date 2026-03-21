import type { Metadata } from "next";
import { PublicNav } from "../components/public-nav";

export const metadata: Metadata = {
  title: "Reset Password — TradeQuote",
  description:
    "Forgot your TradeQuote password? Enter your email to receive a password reset link.",
};

export default function ForgotPasswordLayout({
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
