/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
  },
  experimental: {
    mdxRs: true
  }
};
const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);
