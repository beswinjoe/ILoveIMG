import { Metadata } from "next";
import WavToMp3Client from "./WavToMp3Client";

export const metadata: Metadata = {
  title: "WAV to MP3 Converter Online Free | Filoza",
  description: "Convert uncompressed WAV audio into high-quality MP3 format instantly and securely directly in your browser. No file size limits.",
};

export default function WavToMp3Page() {
  return <WavToMp3Client />;
}
