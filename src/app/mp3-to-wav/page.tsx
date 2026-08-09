import { Metadata } from "next";
import Mp3ToWavClient from "./Mp3ToWavClient";

export const metadata: Metadata = {
  title: "MP3 to WAV Online – Free | Filoza",
  description: "Convert MP3 audio to WAV",
  alternates: {
    canonical: "https://filoza.vercel.app/mp3-to-wav"
  },
  openGraph: {
    title: "MP3 to WAV Online – Free | Filoza",
    description: "Convert MP3 audio to WAV",
    url: "https://filoza.vercel.app/mp3-to-wav",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MP3 to WAV Online – Free | Filoza",
    description: "Convert MP3 audio to WAV",
  }
};

export default function Mp3ToWavPage() {
  return <Mp3ToWavClient />;
}
