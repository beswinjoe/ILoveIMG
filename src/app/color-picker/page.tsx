import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
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
  const faq = [
        { question: "Is my image uploaded?", answer: "No. Filoza processes your images securely inside your browser. They never leave your device." },
        { question: "How do I extract a color from an image?", answer: "Upload an image, then hover over it to see the color under your cursor. Click to select and save the color." }
      ];
  const jsonLd = generateToolJsonLd('color-picker', 'Color Picker', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ColorPickerClient />
    </>
  );
}
