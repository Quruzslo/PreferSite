import { MetadataRoute } from "next";
import navItems from "@/lib/navItems";

const BASE_URL = "https://prefersite.hu";

export default function sitemap(): MetadataRoute.Sitemap {
  const routesMap = new Map<string, MetadataRoute.Sitemap[number]>();
  const currentDate = new Date();

  routesMap.set("/", {
    url: BASE_URL,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  });

  navItems.forEach((item) => {
    if (item.items && Array.isArray(item.items)) {
      item.items.forEach((subItem) => {
        if (subItem.path && !subItem.path.includes("#")) {
          routesMap.set(subItem.path, {
            url: `${BASE_URL}${subItem.path}`,
            lastModified: currentDate,
            changeFrequency: "weekly" as const,
            priority: 0.9,
          });
        }
      });
    }

    if (item.path && !item.path.includes("#") && item.path !== "/") {
      routesMap.set(item.path, {
        url: `${BASE_URL}${item.path}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      });
    }
  });

  return Array.from(routesMap.values());
}
