"use client";

import { trackEvent } from "@/lib/track";

export function CheckoutLink({
  href,
  className,
  children,
  plan,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  plan: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent("checkout_initiated", { plan, source: "pricing" })}
    >
      {children}
    </a>
  );
}
