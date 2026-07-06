import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
    locales: ["en", "fr"],
    defaultLocale: "fr",
    localeDetection: false,
});

// Next.js 16 requires the exported function to be named "proxy"
export function proxy(request: import("next/server").NextRequest) {
    return intlMiddleware(request);
}

export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
