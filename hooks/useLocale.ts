"use client";

import { usePathname } from "next/navigation";

// Helper function to get locale from pathname
export const getLocaleFromPath = (pathname: string): string => {
  const pathSegments = pathname.split("/");
  const firstSegment = pathSegments[1];
  if (firstSegment === "en" || firstSegment === "fr") {
    return firstSegment;
  }
  return "fr"; // Default locale
};

// Helper function to prepend locale to path
export const getPathWithLocale = (path: string, locale: string): string => {
  return `/${locale}${path}`;
};

export function useLocale() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  const getPath = (path: string) => getPathWithLocale(path, locale);

  return {
    locale,
    getPath,
    getPathWithLocale: (path: string, targetLocale: string) => getPathWithLocale(path, targetLocale),
  };
}
