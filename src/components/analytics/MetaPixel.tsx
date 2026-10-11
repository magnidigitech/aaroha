"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, Suspense } from "react";

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1629277058864087";

// Disallowed keys to strictly prevent Personal Identifiable Information (PII) from being sent
const PII_KEYS = new Set([
  "name",
  "fullname",
  "firstname",
  "lastname",
  "email",
  "phone",
  "phonenumber",
  "mobile",
  "mobilenumber",
  "message",
  "contactinfo",
  "address",
  "password",
  "ssn",
  "dob",
]);

/**
 * Sanitizes event parameters to strictly comply with Meta privacy guidelines.
 * Removes any potential PII fields, nulls, or circular data.
 */
function sanitizeEventParams(params?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!params || typeof params !== "object") return undefined;

  const cleanParams: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z]/g, "");
    if (!PII_KEYS.has(normalizedKey) && value !== undefined && value !== null) {
      // If string, ensure it's trimmed and not excessively long (e.g. form messages)
      if (typeof value === "string") {
        cleanParams[key] = value.slice(0, 150);
      } else if (typeof value === "number" || typeof value === "boolean") {
        cleanParams[key] = value;
      }
    }
  }

  return cleanParams;
}

/**
 * Safe helper to dispatch Meta Pixel standard or custom events.
 * Fully resilient to ad blockers, missing script objects, and tracking failures.
 */
export const trackMetaEvent = (
  eventName: "PageView" | "Lead" | "CompleteRegistration" | "Contact" | string,
  options?: Record<string, unknown>
) => {
  try {
    if (typeof window === "undefined") return;

    const win = window as unknown as { fbq?: (...args: unknown[]) => void };
    if (typeof win.fbq === "function") {
      const sanitized = sanitizeEventParams(options);
      if (sanitized && Object.keys(sanitized).length > 0) {
        win.fbq("track", eventName, sanitized);
      } else {
        win.fbq("track", eventName);
      }
    }
  } catch (err) {
    // Non-blocking catch to ensure ad-blockers or tracking errors never break site functionality
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[MetaPixel] Failed to track "${eventName}":`, err);
    }
  }
};

/**
 * Tracks route navigations as PageView events without duplicating the initial load PageView.
 */
function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);
  const lastTrackedUrl = useRef<string | null>(null);

  useEffect(() => {
    // Current URL path
    const currentUrl = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    // Skip the initial mount because the base script snippet already sends the first PageView
    if (isFirstRender.current) {
      isFirstRender.current = false;
      lastTrackedUrl.current = currentUrl;
      return;
    }

    // Only fire PageView when the pathname/search query actually changes
    if (lastTrackedUrl.current !== currentUrl) {
      lastTrackedUrl.current = currentUrl;
      trackMetaEvent("PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * Root Meta Pixel Script Component.
 * Injects the base snippet once and provides SPA route change tracking.
 */
export function MetaPixel() {
  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <Suspense fallback={null}>
        <MetaPixelTracker />
      </Suspense>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
