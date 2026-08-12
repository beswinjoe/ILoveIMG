import { Metadata } from "next";
import AudioConverterClient from "./AudioConverterClient";

export const metadata: Metadata = {
  title: "Audio Converter - Convert Between Audio Formats Online | Filoza",
  description: "Convert audio files between MP3, WAV, OGG, and other formats online. Free tool powered by WebAssembly, processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/audio-converter"
  },
  openGraph: {
    title: "Audio Converter - Convert Between Audio Formats Online | Filoza",
    description: "Convert audio files between MP3, WAV, OGG, and other formats online. Free tool powered by WebAssembly, processed in your browser.",
    url: "https://filoza.vercel.app/audio-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Converter - Convert Between Audio Formats Online | Filoza",
    description: "Convert audio files between MP3, WAV, OGG, and other formats online. Free tool powered by WebAssembly, processed in your browser.",
  }
};

export default function AudioConverterPage() {
  return <AudioConverterClient />;
}
