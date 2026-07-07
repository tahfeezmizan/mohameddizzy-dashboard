import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

export const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    allowedDevOrigins: ["10.10.7.24", "djarnadash.apponislam.top"],
    images: {
        dangerouslyAllowLocalIP: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.djarna.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "*.djarna.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "djarna.apponislam.top",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "5050",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "127.0.0.1",
                pathname: "/**",
            },
        ],
    },
};

export default withNextIntl(nextConfig);
