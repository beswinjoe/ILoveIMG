import { Metadata } from "next";
import WavToMp3Client from "./WavToMp3Client";

export const metadata: Metadata = {
  title: "WAV to MP3 Online – Free | Filoza",
  description: "Convert WAV audio to MP3",
  alternates: {
    canonical: "https://filoza.vercel.app/wav-to-mp3"
  },
  openGraph: {
    title: "WAV to MP3 Online – Free | Filoza",
    description: "Convert WAV audio to MP3",
    url: "https://filoza.vercel.app/wav-to-mp3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WAV to MP3 Online – Free | Filoza",
    description: "Convert WAV audio to MP3",
  }
};

export default function WavToMp3Page() {
  return <WavToMp3Client />;
}
