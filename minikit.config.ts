const ROOT_URL = 'https://base-app-colory.vercel.app/';
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig =
  "accountAssociation": {
    "header": "eyJmaWQiOjUwMzg5MiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDQ1YWZDNWQ1MzA4ZTM0ODJCMEU4ZEVBNTRGM2JjMTRCNTkxQzgzQzkifQ",
    "payload": "eyJkb21haW4iOiJuZXctbWluaS1hcHAtY29sb3J5LnZlcmNlbC5hcHAifQ",
    "signature": "MHhhYTU1MmE2MmE3Y2Y3NjRiMzI5OWVlYTU3NGJhNGYwODM3NjRhY2VhYzM2Zjc3MTY1MmM5MmRhZmZhZmY3MjMzNDhiYThmYWU2ZDAzNWJiNzQ4ZTJlYzZmNTFlYWQ5ZDIwNGNmZTg5MzFmMmUyMDU4ODI5NTU5ZGMyODM2MDcxYzFi"
}
  miniapp: {
    version: "1",
    name: "COLORY", 
    subtitle: "Your AI Ad Companion", 
    description: "Ads",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/blue-icon.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["marketing", "ads", "quickstart", "waitlist"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`, 
    tagline: "",
    ogTitle: "",
    ogDescription: "",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
  },
} as const;

