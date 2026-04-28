import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import releases from "@/components/Releases/data.json";

const BASE_URL = "https://verk.club";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/collective`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/releases`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/socials`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/music`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const releasePages: MetadataRoute.Sitemap = releases.map((release) => ({
    url: `${BASE_URL}/${release.id}`,
    lastModified: new Date(release.release),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...releasePages];
}
