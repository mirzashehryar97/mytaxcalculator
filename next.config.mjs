import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  headers() {
    return Promise.resolve([
      {
        source: '/embed/:path*',
        headers: [{ key: 'Content-Security-Policy', value: 'frame-ancestors *;' }],
      },
    ]);
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  webpack(config, { isServer }) {
    if (process.env.ANALYZE === 'true' && !isServer) {
      config.optimization ??= {};
      config.optimization.concatenateModules = false;
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
