import { Metadata } from "next";
import AudioCutterClient from "./AudioCutterClient";

export const metadata: Metadata = {
  title: "Audio Cutter Online Free | FileFlow",
  description: "Trim and cut audio files directly in your browser. Perfect for creating ringtones or removing silence securely.",
};

export default function AudioCutterPage() {
  return <AudioCutterClient />;
}
