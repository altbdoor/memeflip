const basePath = process.env.PAGES_BASE_PATH;
let assetPrefix = process.env.PAGES_BASE_PATH;

if (assetPrefix && !assetPrefix.endsWith("/")) {
  assetPrefix += "/";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix,
};

export default nextConfig;
