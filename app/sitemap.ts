import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://allmypdfs.vercel.app",
      lastModified: new Date(),
    },
  ];
}
