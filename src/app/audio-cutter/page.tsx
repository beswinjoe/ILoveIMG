import { Metadata } from "next";
import AudioCutterClient from "./AudioCutterClient";

export const metadata: Metadata = {
  title: "Audio Cutter - Trim & Cut Audio Files Online | Filoza",
  description: "Trim and cut audio files online. Set start and end points to extract the section you need. Supports MP3, WAV, and OGG.",
  alternates: {
    canonical: "https://filoza.vercel.app/audio-cutter"
  },
  openGraph: {
    title: "Audio Cutter - Trim & Cut Audio Files Online | Filoza",
    description: "Trim and cut audio files online. Set start and end points to extract the section you need. Supports MP3, WAV, and OGG.",
    url: "https://filoza.vercel.app/audio-cutter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Cutter - Trim & Cut Audio Files Online | Filoza",
    description: "Trim and cut audio files online. Set start and end points to extract the section you need. Supports MP3, WAV, and OGG.",
  }
};

export default function AudioCutterPage() {
  return <AudioCutterClient />;
}
