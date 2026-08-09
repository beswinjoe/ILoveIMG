import { Metadata } from "next";
import AudioVolumeClient from "./AudioVolumeClient";

export const metadata: Metadata = {
  title: "Audio Volume Online – Free | Filoza",
  description: "Increase or decrease audio volume",
  alternates: {
    canonical: "https://filoza.vercel.app/audio-volume"
  },
  openGraph: {
    title: "Audio Volume Online – Free | Filoza",
    description: "Increase or decrease audio volume",
    url: "https://filoza.vercel.app/audio-volume",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Volume Online – Free | Filoza",
    description: "Increase or decrease audio volume",
  }
};

export default function AudioVolumePage() {
  return <AudioVolumeClient />;
}
