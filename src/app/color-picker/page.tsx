import { Metadata } from "next";
import ColorPickerClient from "./ColorPickerClient";

export const metadata: Metadata = {
  title: "Image Color Picker Online Free | FileFlow",
  description: "Extract colors from images to get HEX and RGB values securely directly in your browser. No uploads required.",
};

export default function ColorPickerPage() {
  return <ColorPickerClient />;
}
