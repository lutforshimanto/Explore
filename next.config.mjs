import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placehold.jp"],
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "1t2k916rlb.ufs.sh",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
