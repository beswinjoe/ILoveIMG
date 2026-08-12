import { Metadata } from "next";
import WavToMp3Client from "./WavToMp3Client";

export const metadata: Metadata = {
  title: "WAV to MP3 Converter - Convert WAV Audio to MP3 Online | Filoza",
  description: "Convert WAV audio files to MP3 format online. Reduce audio file size while maintaining quality. Processed locally in your browser using WebAssembly.",
  alternates: {
    canonical: "https://filoza.vercel.app/wav-to-mp3"
  },
  openGraph: {
    title: "WAV to MP3 Converter - Convert WAV Audio to MP3 Online | Filoza",
    description: "Convert WAV audio files to MP3 format online. Reduce audio file size while maintaining quality. Processed locally in your browser using WebAssembly.",
    url: "https://filoza.vercel.app/wav-to-mp3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WAV to MP3 Converter - Convert WAV Audio to MP3 Online | Filoza",
    description: "Convert WAV audio files to MP3 format online. Reduce audio file size while maintaining quality. Processed locally in your browser using WebAssembly.",
  }
};

export default function WavToMp3Page() {
  return <WavToMp3Client />;
}
