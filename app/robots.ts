import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap:
      "https://trades-quoting-tool-moltcorporation.vercel.app/sitemap.xml",
  };
}
