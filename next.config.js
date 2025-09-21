/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  }
};

// Dynamically add backend media host from env so Next/Image accepts it
try {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    const u = new URL(process.env.NEXT_PUBLIC_BACKEND_URL);
    const host = u.hostname;
    const protocol = (u.protocol || 'https:').replace(':', '');
    if (host && !nextConfig.images.remotePatterns.some(p => p.hostname === host)) {
      nextConfig.images.remotePatterns.push({ protocol, hostname: host });
    }
  }
} catch {}

module.exports = nextConfig;
