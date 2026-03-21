"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckoutLink } from "../components/checkout-link";

export function PricingCards({
  proMonthlyUrl,
  proAnnualUrl,
}: {
  proMonthlyUrl: string;
  proAnnualUrl: string;
}) {
  const [isAnnual, setIsAnnual] = useState(false);

  const proPrice = isAnnual ? "$15" : "$19";
  const proPeriod = isAnnual ? "/mo" : "/mo";
  const proCtaLabel = isAnnual ? "Upgrade to Pro — $15/mo" : "Upgrade to Pro";
  const proUrl = isAnnual ? proAnnualUrl : proMonthlyUrl;

  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Get started with the basics",
      features: [
        "3 active quotes at a time",
        "Quote builder",
        "Client approval page",
      ],
      cta: "Get Started",
      href: "/register",
      featured: false,
    },
    {
      name: "Pro",
      price: proPrice,
      period: proPeriod,
      description: "Everything you need to grow",
      features: [
        "Unlimited quotes",
        "Payment tracking",
        "Priority support",
      ],
      cta: proCtaLabel,
      href: proUrl,
      featured: true,
    },
  ];

  return (
    <>
      {/* Billing toggle */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <span className={`text-sm font-medium ${!isAnnual ? "text-slate-900" : "text-slate-400"}`}>Monthly</span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAnnual ? "bg-amber-500" : "bg-slate-300"}`}
          aria-label="Toggle annual billing"
        >
          <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${isAnnual ? "translate-x-6" : "translate-x-1"}`} />
        </button>
        <span className={`text-sm font-medium ${isAnnual ? "text-slate-900" : "text-slate-400"}`}>Annual</span>
        {isAnnual && (
          <span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-semibold text-white">
            Save 21%
          </span>
        )}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-2xl border p-8 ${
              tier.featured
                ? "border-amber-500 bg-white shadow-lg ring-1 ring-amber-500"
                : "border-slate-200 bg-white"
            }`}
          >
            {tier.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-4 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
            )}
            <h2 className="text-lg font-semibold text-slate-900">
              {tier.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{tier.description}</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-slate-900">
                {tier.price}
              </span>
              <span className="text-sm text-slate-500">{tier.period}</span>
            </div>
            {tier.featured && isAnnual && (
              <p className="mt-1 text-xs text-green-600">$180/yr — save $48 vs monthly</p>
            )}
            <ul className="mt-8 space-y-3">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-slate-700"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              {tier.href.startsWith("http") ? (
                <CheckoutLink
                  href={tier.href}
                  plan={`${tier.name.toLowerCase()}${isAnnual && tier.featured ? "_annual" : ""}`}
                  className={`block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition ${
                    tier.featured
                      ? "bg-amber-500 text-white hover:bg-amber-600"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {tier.cta}
                </CheckoutLink>
              ) : (
                <Link
                  href={tier.href}
                  className={`block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition ${
                    tier.featured
                      ? "bg-amber-500 text-white hover:bg-amber-600"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {tier.cta}
                </Link>
              )}
            </div>
            {tier.featured && (
              <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5 text-amber-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                7-day money-back guarantee
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
