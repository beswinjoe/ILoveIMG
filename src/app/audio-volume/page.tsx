import { Metadata } from "next";
import AudioVolumeClient from "./AudioVolumeClient";

export const metadata: Metadata = {
  title: "Audio Volume Changer - Adjust Audio Volume Online | Filoza",
  description: "Increase or decrease audio volume online. Adjust the loudness of MP3, WAV, and OGG files. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/audio-volume"
  },
  openGraph: {
    title: "Audio Volume Changer - Adjust Audio Volume Online | Filoza",
    description: "Increase or decrease audio volume online. Adjust the loudness of MP3, WAV, and OGG files. Processed in your browser.",
    url: "https://filoza.vercel.app/audio-volume",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Volume Changer - Adjust Audio Volume Online | Filoza",
    description: "Increase or decrease audio volume online. Adjust the loudness of MP3, WAV, and OGG files. Processed in your browser.",
  }
};

export default function AudioVolumePage() {
  return <AudioVolumeClient />;
}
