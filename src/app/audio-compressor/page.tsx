import { Metadata } from "next";
import AudioCompressorClient from "./AudioCompressorClient";

export const metadata: Metadata = {
  title: "Compress Audio Online Free | FileFlow",
  description: "Compress audio files to reduce file size while maintaining listening quality securely directly in your browser. No uploads required.",
};

export default function AudioCompressorPage() {
  return <AudioCompressorClient />;
}
