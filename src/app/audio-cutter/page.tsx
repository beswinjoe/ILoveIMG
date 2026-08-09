import { Metadata } from "next";
import AudioCutterClient from "./AudioCutterClient";

export const metadata: Metadata = {
  title: "Audio Cutter Online – Free | Filoza",
  description: "Trim and cut audio files",
  alternates: {
    canonical: "https://filoza.vercel.app/audio-cutter"
  },
  openGraph: {
    title: "Audio Cutter Online – Free | Filoza",
    description: "Trim and cut audio files",
    url: "https://filoza.vercel.app/audio-cutter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Cutter Online – Free | Filoza",
    description: "Trim and cut audio files",
  }
};

export default function AudioCutterPage() {
  return <AudioCutterClient />;
}
