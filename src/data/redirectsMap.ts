export const LEGACY_PAGE_REDIRECTS: Record<string, string> = {
  "/index.html": "/",
  "/services.html": "/services",
  "/courses.html": "/training",
  "/industries.html": "/industries",
  "/careers.html": "/careers",
};

export function resolveLegacyServiceUrl(pathname: string, searchParams?: URLSearchParams): string | null {
  if (pathname === "/service.html" || pathname.startsWith("/service.html")) {
    const slug = searchParams?.get("s");
    if (slug) {
      return `/services/${slug}`;
    }
    return "/services";
  }
  return LEGACY_PAGE_REDIRECTS[pathname] || null;
}
