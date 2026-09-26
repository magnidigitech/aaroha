import { MetadataRoute } from "next";
import { SERVICES_CATALOG } from "@/data/services";
import { TRAINING_COURSES } from "@/data/training";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.aaroha-inc.com";

  const staticRoutes = [
    "",
    "/services",
    "/training",
    "/industries",
    "/about",
    "/careers",
    "/contact",
    "/register",
    "/training/register",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const serviceRoutes = SERVICES_CATALOG.map((svc) => ({
    url: `${baseUrl}/services/${svc.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const courseRoutes = TRAINING_COURSES.map((course) => ({
    url: `${baseUrl}/training/${course.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...courseRoutes];
}
