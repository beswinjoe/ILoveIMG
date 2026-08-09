import { Metadata } from "next";
import AudioConverterClient from "./AudioConverterClient";

export const metadata: Metadata = {
  title: "Audio Converter Online – Free | Filoza",
  description: "Convert between common audio formats",
  alternates: {
    canonical: "https://filoza.vercel.app/audio-converter"
  },
  openGraph: {
    title: "Audio Converter Online – Free | Filoza",
    description: "Convert between common audio formats",
    url: "https://filoza.vercel.app/audio-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Converter Online – Free | Filoza",
    description: "Convert between common audio formats",
  }
};

export default function AudioConverterPage() {
  return <AudioConverterClient />;
}
