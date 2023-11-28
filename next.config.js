/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: "",
                pathname: process.env.NEXT_PUBLIC_IMAGE_PATHNAME,
            },
        ],
    },
}

module.exports = nextConfig
