import { Metadata } from "next";
import ColorPickerClient from "./ColorPickerClient";

export const metadata: Metadata = {
  title: "Color Picker - Pick & Convert HEX, RGB, HSL Colors | Filoza",
  description: "Pick colors and convert between HEX, RGB, and HSL formats online. Copy color values for use in design and development.",
  alternates: {
    canonical: "https://filoza.vercel.app/color-picker"
  },
  openGraph: {
    title: "Color Picker - Pick & Convert HEX, RGB, HSL Colors | Filoza",
    description: "Pick colors and convert between HEX, RGB, and HSL formats online. Copy color values for use in design and development.",
    url: "https://filoza.vercel.app/color-picker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Picker - Pick & Convert HEX, RGB, HSL Colors | Filoza",
    description: "Pick colors and convert between HEX, RGB, and HSL formats online. Copy color values for use in design and development.",
  }
};

export default function ColorPickerPage() {
  return <ColorPickerClient />;
}
