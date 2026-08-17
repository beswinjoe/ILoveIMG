import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // COEP/COOP are needed ONLY for audio tools (ffmpeg/SharedArrayBuffer).
        // They must NOT be applied to API routes or file-transfer.
        source: "/:path((?!api|file-transfer|download).*)",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
