import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import PdfMergeClient from "./PdfMergeClient";

export const metadata: Metadata = {
  title: "Merge PDF Files Online - Combine PDFs for Free | Filoza",
  description: "Merge multiple PDF files into one document online. Drag to reorder pages before combining. Free and processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-merge"
  },
  openGraph: {
    title: "Merge PDF Files Online - Combine PDFs for Free | Filoza",
    description: "Merge multiple PDF files into one document online. Drag to reorder pages before combining. Free and processed locally in your browser.",
    url: "https://filoza.vercel.app/pdf-merge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Files Online - Combine PDFs for Free | Filoza",
    description: "Merge multiple PDF files into one document online. Drag to reorder pages before combining. Free and processed locally in your browser.",
  }
};

export default function PdfMergePage() {
  const faq = [
        { question: "Is my data secure?", answer: "Yes! All processing happens securely in your web browser. Your PDFs never leave your device." },
        { question: "Can I reorder the files?", answer: "Yes, once you upload files, you can use the Up/Down buttons to change the order they will appear in the final PDF." }
      ];
  const jsonLd = generateToolJsonLd('pdf-merge', 'Merge PDF', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <PdfMergeClient />
    </>
  );
}
