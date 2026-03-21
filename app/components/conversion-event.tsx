"use client";

import { useEffect, useRef } from "react";

interface ConversionEventProps {
  event: string;
  userId?: string;
}

function getUtmFromCookie(): Record<string, string> {
  try {
    const utmCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("utm="));
    if (utmCookie) {
      return JSON.parse(
        decodeURIComponent(utmCookie.split("=").slice(1).join("="))
      );
    }
  } catch {
    // ignore
  }
  return {};
}

export function ConversionEvent({ event, userId }: ConversionEventProps) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;

    const utm = getUtmFromCookie();

    // Fire server-side tracking
    fetch("/api/conversions/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: event,
        userId,
        utmSource: utm.utm_source,
        utmMedium: utm.utm_medium,
        utmCampaign: utm.utm_campaign,
        utmContent: utm.utm_content,
        utmTerm: utm.utm_term,
      }),
    }).catch(() => {});

    // Fire GTM dataLayer event if available
    if (typeof window !== "undefined") {
      const w = window as unknown as Record<string, unknown>;
      if (w.dataLayer) {
        (w.dataLayer as Record<string, unknown>[]).push({
          event: "moltcorp_conversion",
          conversion_type: event,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
        });
      }
    }
  }, [event, userId]);

  return null;
}
