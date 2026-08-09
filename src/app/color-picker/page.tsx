import { Metadata } from "next";
import ColorPickerClient from "./ColorPickerClient";

export const metadata: Metadata = {
  title: "Color Picker Online – Free | Filoza",
  description: "Pick colors and convert HEX, RGB, HSL",
  alternates: {
    canonical: "https://filoza.vercel.app/color-picker"
  },
  openGraph: {
    title: "Color Picker Online – Free | Filoza",
    description: "Pick colors and convert HEX, RGB, HSL",
    url: "https://filoza.vercel.app/color-picker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Picker Online – Free | Filoza",
    description: "Pick colors and convert HEX, RGB, HSL",
  }
};

export default function ColorPickerPage() {
  return <ColorPickerClient />;
}
