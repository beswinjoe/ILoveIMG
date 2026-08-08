import { Metadata } from "next";
import AudioVolumeClient from "./AudioVolumeClient";

export const metadata: Metadata = {
  title: "Audio Volume Adjuster Online Free | FileFlow",
  description: "Increase or decrease the volume of your audio files without losing quality directly in your browser securely.",
};

export default function AudioVolumePage() {
  return <AudioVolumeClient />;
}
