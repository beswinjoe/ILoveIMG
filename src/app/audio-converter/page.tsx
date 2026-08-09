import { Metadata } from "next";
import AudioConverterClient from "./AudioConverterClient";

export const metadata: Metadata = {
  title: "Universal Audio Converter Online Free | Filoza",
  description: "Convert any audio file into MP3, WAV, AAC, or OGG instantly and securely directly in your browser. No uploads required.",
};

export default function AudioConverterPage() {
  return <AudioConverterClient />;
}
