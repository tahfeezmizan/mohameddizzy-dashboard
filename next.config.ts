import type { NextConfig } from "next";

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

export default nextConfig;
