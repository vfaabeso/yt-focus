import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // Keep compiled pages alive in RAM for 60 seconds
    pagesBufferLength: 5,      // Keep up to 5 pages compiled in memory concurrently
  },
};

export default nextConfig;
