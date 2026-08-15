import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import ColorPickerClient from "./ColorPickerClient";
export const metadata: Metadata = {
  title: "Color Picker - Pick & Convert HEX, RGB, HSL Colors | Filoza",
  description: "Pick colors and convert between HEX, RGB, and HSL formats online. Easily copy color values for use in design, development, and digital arts projects.",
  alternates: {
    canonical: "https://filoza.vercel.app/color-picker"
  },
  openGraph: {
    title: "Color Picker - Pick & Convert HEX, RGB, HSL Colors | Filoza",
    description: "Pick colors and convert between HEX, RGB, and HSL formats online. Easily copy color values for use in design, development, and digital arts projects.",
    url: "https://filoza.vercel.app/color-picker",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Picker - Pick & Convert HEX, RGB, HSL Colors | Filoza",
    description: "Pick colors and convert between HEX, RGB, and HSL formats online. Easily copy color values for use in design, development, and digital arts projects."
  }
};
export default function ColorPickerPage() {
  const faq = [{
    question: "Is my image uploaded?",
    answer: "No. Filoza processes your images securely inside your browser. They never leave your device."
  }, {
    question: "How do I extract a color from an image?",
    answer: "Upload an image, then hover over it to see the color under your cursor. Click to select and save the color."
  }];
  const jsonLd = generateToolJsonLd('color-picker', 'Color Picker', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="Color Picker"
      description="Extract colors from images or use the color wheel to get HEX and RGB values."
      breadcrumbs={[{
  label: "Utilities",
  href: "/tools"
}, {
  label: "Color Picker",
  href: "/color-picker"
}]}
      faq={[{
  question: "Is my image uploaded?",
  answer: "No. Filoza processes your images securely inside your browser. They never leave your device."
}, {
  question: "How do I extract a color from an image?",
  answer: "Upload an image, then hover over it to see the color under your cursor. Click to select and save the color."
}]}
      relatedTools={[{
  name: "Image Converter",
  href: "/image-converter",
  icon: <CheckCircle2 />
}]}>
      <ColorPickerClient />
    </ToolLayout>
    </>;
}