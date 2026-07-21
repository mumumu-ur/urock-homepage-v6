import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Legacy prototype assets live at the repo root and must not be traced/compiled.
  outputFileTracingExcludes: {
    "*": ["./_ds/**", "./uploads/**", "./support.js", "./*.dc.html"],
  },
};

export default withNextIntl(nextConfig);
