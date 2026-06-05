import createMiddleware from "next-intl/middleware";

const nextIntlProxy = createMiddleware({
    locales: ["en", "fr"],
    defaultLocale: "fr",
});

export default nextIntlProxy;

export const proxy = nextIntlProxy;

export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
