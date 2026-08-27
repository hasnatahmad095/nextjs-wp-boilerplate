/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16 auto-generates AGENTS.md / CLAUDE.md on dev/build.
  // Disabled to keep this template repo clean — flip to `true` to opt in.
  agentRules: false,
  images: {
    // Allow images served from your WordPress site(s).
    // `domains` was removed in Next.js 16 — use `remotePatterns` instead.
    // Example:
    // remotePatterns: [
    //   { protocol: "https", hostname: "your-wordpress-site.com" },
    //   { protocol: "https", hostname: "cdn.your-site.com" },
    // ],
    remotePatterns: [],
  },
};

export default nextConfig;
