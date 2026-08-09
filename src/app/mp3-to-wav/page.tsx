import { Metadata } from "next";
import Mp3ToWavClient from "./Mp3ToWavClient";

export const metadata: Metadata = {
  title: "MP3 to WAV Converter Online Free | Filoza",
  description: "Convert compressed MP3 audio into uncompressed high-quality WAV format instantly and securely directly in your browser. No file size limits.",
};

export default function Mp3ToWavPage() {
  return <Mp3ToWavClient />;
}
