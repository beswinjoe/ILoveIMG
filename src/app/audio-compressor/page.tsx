import { Metadata } from "next";
import AudioCompressorClient from "./AudioCompressorClient";

export const metadata: Metadata = {
  title: "Audio Compressor - Reduce Audio File Size Online | Filoza",
  description: "Compress audio files to reduce their size online. Supports MP3, WAV, OGG, and M4A formats. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/audio-compressor"
  },
  openGraph: {
    title: "Audio Compressor - Reduce Audio File Size Online | Filoza",
    description: "Compress audio files to reduce their size online. Supports MP3, WAV, OGG, and M4A formats. Processed locally in your browser.",
    url: "https://filoza.vercel.app/audio-compressor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Compressor - Reduce Audio File Size Online | Filoza",
    description: "Compress audio files to reduce their size online. Supports MP3, WAV, OGG, and M4A formats. Processed locally in your browser.",
  }
};

export default function AudioCompressorPage() {
  return <AudioCompressorClient />;
}
