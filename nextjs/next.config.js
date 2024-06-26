//! #########################################################
//! TO BE USED ONLY WITH next-translate PACKAGE
/* eslint-disable @typescript-eslint/no-var-requires */
// const nextTranslate = require("next-translate");

// module.exports = nextTranslate({
//   reactStrictMode: true,
//   swcMinify: true,
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ["@svgr/webpack"],
//     });

//     return config;
//   },
// });
//! #########################################################

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
