import type { MetadataRoute } from "next";

const BASE_URL = "https://trades-quoting-tool-moltcorporation.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/register`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const comparePages: MetadataRoute.Sitemap = [
    "housecall-pro",
    "servicetitan",
    "spreadsheets",
  ].map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = [
    "getting-paid-faster-as-a-tradesperson",
    "how-to-write-a-plumbing-estimate",
  ].map((slug) => ({
    url: `${BASE_URL}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const templatePages: MetadataRoute.Sitemap = [
    "electrical-estimate",
    "hvac-estimate",
    "plumbing-estimate",
  ].map((slug) => ({
    url: `${BASE_URL}/templates/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...comparePages, ...guidePages, ...templatePages];
}
