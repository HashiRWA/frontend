/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/markets",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
