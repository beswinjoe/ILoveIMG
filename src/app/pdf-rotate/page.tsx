import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import PdfRotateClient from "./PdfRotateClient";

export const metadata: Metadata = {
  title: "Rotate PDF Pages Online - Free PDF Page Rotation | Filoza",
  description: "Rotate individual PDF pages 90°, 180°, or 270° online. Fix page orientation issues in your PDF documents. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-rotate"
  },
  openGraph: {
    title: "Rotate PDF Pages Online - Free PDF Page Rotation | Filoza",
    description: "Rotate individual PDF pages 90°, 180°, or 270° online. Fix page orientation issues in your PDF documents. Processed in your browser.",
    url: "https://filoza.vercel.app/pdf-rotate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate PDF Pages Online - Free PDF Page Rotation | Filoza",
    description: "Rotate individual PDF pages 90°, 180°, or 270° online. Fix page orientation issues in your PDF documents. Processed in your browser.",
  }
};

export default function PdfRotatePage() {
  const faq = [
        { question: "Is my data secure?", answer: "Yes! All processing happens securely in your web browser. Your PDFs never leave your device." },
        { question: "Does this rotate every page?", answer: "Yes, this tool applies the selected rotation to all pages in the PDF document simultaneously." }
      ];
  const jsonLd = generateToolJsonLd('pdf-rotate', 'Rotate PDF', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <PdfRotateClient />
    </>
  );
}
