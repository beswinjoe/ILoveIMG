import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import PngToJpgClient from "./PngToJpgClient";

export const metadata: Metadata = {
  title: "PNG to JPG Converter - Convert PNG to JPEG Online | Filoza",
  description: "Convert PNG images to JPG format online. Reduce file size while maintaining quality. Free and processed in your browser with no uploads.",
  alternates: {
    canonical: "https://filoza.vercel.app/png-to-jpg"
  },
  openGraph: {
    title: "PNG to JPG Converter - Convert PNG to JPEG Online | Filoza",
    description: "Convert PNG images to JPG format online. Reduce file size while maintaining quality. Free and processed in your browser with no uploads.",
    url: "https://filoza.vercel.app/png-to-jpg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG to JPG Converter - Convert PNG to JPEG Online | Filoza",
    description: "Convert PNG images to JPG format online. Reduce file size while maintaining quality. Free and processed in your browser with no uploads.",
  }
};

export default function PngToJpgPage() {
  const faq: any[] = [];
  const jsonLd = generateToolJsonLd('png-to-jpg', 'PNG to JPG', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <PngToJpgClient />
    </>
  );
}
