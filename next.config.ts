import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

export const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    allowedDevOrigins: ["10.10.7.24", "djarnadash.apponislam.top"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "djarna.apponislam.top",
            },
        ],
    },
};

export default withNextIntl(nextConfig);
