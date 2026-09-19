import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pins the project root so a stray lockfile in a parent folder is ignored.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
