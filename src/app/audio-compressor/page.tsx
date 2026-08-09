import { Metadata } from "next";
import AudioCompressorClient from "./AudioCompressorClient";

export const metadata: Metadata = {
  title: "Audio Compressor Online – Free | Filoza",
  description: "Reduce audio file sizes",
  alternates: {
    canonical: "https://filoza.vercel.app/audio-compressor"
  },
  openGraph: {
    title: "Audio Compressor Online – Free | Filoza",
    description: "Reduce audio file sizes",
    url: "https://filoza.vercel.app/audio-compressor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Compressor Online – Free | Filoza",
    description: "Reduce audio file sizes",
  }
};

export default function AudioCompressorPage() {
  return <AudioCompressorClient />;
}
