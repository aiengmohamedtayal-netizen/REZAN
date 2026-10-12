import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checkout", "/account", "/orders"],
      },
      // Allow Ad verification bots for ad monetization
      {
        userAgent: ["Mediapartners-Google", "Google-Display-Ads-Bot"],
        allow: "/",
      },
      // Block AI scrapers from ingesting content for model training without ad impressions
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "ClaudeBot",
          "Claude-Web",
          "Anthropic-AI",
          "Google-Extended",
          "Bytespider",
          "Diffbot",
          "FacebookBot",
          "Applebot-Extended",
          "cohere-ai",
          "Omgilibot",
          "ImagesiftBot",
        ],
        disallow: "/",
      },
    ],
  };
}
