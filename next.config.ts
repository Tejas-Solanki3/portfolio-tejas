import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow mobile devices on the same WiFi to load Next.js dev resources
  allowedDevOrigins: ['192.168.29.39'],
};

export default nextConfig;
