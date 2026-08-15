import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import WebpClient from "./WebpClient";

export const metadata: Metadata = {
  title: "WebP Converter - Convert WebP to JPG, PNG & Back | Filoza",
  description: "Convert WebP images to JPG or PNG, or convert other image formats to WebP. Free online converter that works entirely in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/webp-converter"
  },
  openGraph: {
    title: "WebP Converter - Convert WebP to JPG, PNG & Back | Filoza",
    description: "Convert WebP images to JPG or PNG, or convert other image formats to WebP. Free online converter that works entirely in your browser.",
    url: "https://filoza.vercel.app/webp-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebP Converter - Convert WebP to JPG, PNG & Back | Filoza",
    description: "Convert WebP images to JPG or PNG, or convert other image formats to WebP. Free online converter that works entirely in your browser.",
  }
};

export default function WebpPage() {
  const faq: any[] = [];
  const jsonLd = generateToolJsonLd('webp-converter', 'WebP Converter', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <WebpClient />
    </>
  );
}
