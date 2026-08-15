import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import ResizerClient from "./ResizerClient";

export const metadata: Metadata = {
  title: "Image Resizer - Resize Images Online for Free | Filoza",
  description: "Resize images to any dimension online. Supports JPG, PNG, and WebP. Set custom width and height or scale by percentage — processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-resizer"
  },
  openGraph: {
    title: "Image Resizer - Resize Images Online for Free | Filoza",
    description: "Resize images to any dimension online. Supports JPG, PNG, and WebP. Set custom width and height or scale by percentage — processed locally in your browser.",
    url: "https://filoza.vercel.app/image-resizer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Resizer - Resize Images Online for Free | Filoza",
    description: "Resize images to any dimension online. Supports JPG, PNG, and WebP. Set custom width and height or scale by percentage — processed locally in your browser.",
  }
};

export default function ResizerPage() {
  const faq: any[] = [];
  const jsonLd = generateToolJsonLd('image-resizer', 'Image Resizer', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ResizerClient />
    </>
  );
}
