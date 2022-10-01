/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@use "src/styles/variables.scss" as vars;`,
  },
  images: {
    domains: ["wallpaperaccess.com"],
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
