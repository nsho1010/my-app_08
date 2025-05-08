/** @type {import('next').NextConfig} */
const nextConfig = {
  remotePatterns: [
    { protocol: "https", hostname: "placehold.jp" },
    { protocol: "https", hostname: "images.microcms-assets.io" },
    { protocol: "https", hostname: "iawdmpahrmkbbsvklxrm.supabase.co" },
  ],
};

export default nextConfig;
