"use client";

import { useEffect } from "react";

interface ConversionEventProps {
  event: string;
  userId?: string;
}

export function ConversionEvent({ event, userId }: ConversionEventProps) {
  useEffect(() => {
    // Read UTM from cookie
    let utmSource: string | undefined;
    let utmMedium: string | undefined;
    let utmCampaign: string | undefined;

    try {
      const utmCookie = document.cookie
        .split("; ")
        .find((c) => c.startsWith("utm="));
      if (utmCookie) {
        const utmData = JSON.parse(
          decodeURIComponent(utmCookie.split("=").slice(1).join("="))
        );
        utmSource = utmData.utm_source;
        utmMedium = utmData.utm_medium;
        utmCampaign = utmData.utm_campaign;
      }
    } catch {
      // Cookie parse failed
    }

    // Push to GTM dataLayer if available
    if (typeof window !== "undefined" && "dataLayer" in window) {
      (window as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
        event,
        userId,
        utmSource,
        utmMedium,
        utmCampaign,
      });
    }
  }, [event, userId]);

  return null;
}
