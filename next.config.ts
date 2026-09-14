import type { NextConfig } from "next";
import path from "path";
const nextConfig: NextConfig = {
    turbopack: {
        root: path.resolve(__dirname),
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "/aida-public/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/mutual-funds-research/top-performing-mutual-funds",
                destination: "/mutual-funds",
            },
            {
                source: "/mutual-funds-research/fund-card",
                destination: "/mutual-funds/fund-card",
            },
        ];
    },
};
export default nextConfig;
