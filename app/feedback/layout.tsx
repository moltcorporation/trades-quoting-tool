import type { Metadata } from "next";
import PublicNav from "@/app/components/public-nav";

export const metadata: Metadata = {
  title: "Feedback — TradeQuote",
  description:
    "Share your feedback, report bugs, or request features for TradeQuote.",
};

export default function FeedbackLayout({
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
