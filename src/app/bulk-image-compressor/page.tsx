import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import BulkCompressorClient from "./BulkCompressorClient";

export const metadata: Metadata = {
  title: "Bulk Image Compressor - Compress Images at Once | Filoza",
  description: "Compress multiple JPG, PNG, and WebP images in one batch. Reduce file sizes without uploading — all processing happens in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/bulk-image-compressor"
  },
  openGraph: {
    title: "Bulk Image Compressor - Compress Images at Once | Filoza",
    description: "Compress multiple JPG, PNG, and WebP images in one batch. Reduce file sizes without uploading — all processing happens in your browser.",
    url: "https://filoza.vercel.app/bulk-image-compressor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk Image Compressor - Compress Images at Once | Filoza",
    description: "Compress multiple JPG, PNG, and WebP images in one batch. Reduce file sizes without uploading — all processing happens in your browser.",
  }
};

export default function BulkCompressorPage() {
  const faq: { question: string; answer: string }[] = [];
  const jsonLd = generateToolJsonLd('bulk-image-compressor', 'Bulk Image Compressor', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <BulkCompressorClient />
    </>
  );
}
