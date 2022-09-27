/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['pixabay.com', 'cdn.pixabay.com'],
        minimumCacheTTL: 3600
    },
}

module.exports = nextConfig
