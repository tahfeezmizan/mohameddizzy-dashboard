import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
