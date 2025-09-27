/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enabling React Strict Mode

  async headers() {
    return [
      {
        source: "/api/:path*", // Apply to all API routes under pages/api
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "production"
                ? "https://your-production-domain.com"
                : "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
