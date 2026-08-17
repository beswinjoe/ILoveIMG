import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const audioTools = [
      "/audio-compressor",
      "/audio-cutter",
      "/audio-converter",
      "/audio-volume",
      "/wav-to-mp3",
      "/mp3-to-wav"
    ];

    return audioTools.map((path) => ({
      // COEP/COOP are needed ONLY for audio tools (ffmpeg/SharedArrayBuffer).
      source: path,
      headers: [
        {
          key: "Cross-Origin-Embedder-Policy",
          value: "require-corp",
        },
        {
          key: "Cross-Origin-Opener-Policy",
          value: "same-origin",
        },
      ],
    }));
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
