/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['pixabay.com', 'cdn.pixabay.com'],
        loader: 'akamai',
        path: '',
    },
}

module.exports = nextConfig
