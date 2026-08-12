import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import PdfSplitClient from "./PdfSplitClient";

export const metadata: Metadata = {
  title: "Split PDF Online - Extract Pages from PDFs for Free | Filoza",
  description: "Split PDF files by selecting specific pages or page ranges. Extract individual pages into separate PDF documents. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-split"
  },
  openGraph: {
    title: "Split PDF Online - Extract Pages from PDFs for Free | Filoza",
    description: "Split PDF files by selecting specific pages or page ranges. Extract individual pages into separate PDF documents. Processed in your browser.",
    url: "https://filoza.vercel.app/pdf-split",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF Online - Extract Pages from PDFs for Free | Filoza",
    description: "Split PDF files by selecting specific pages or page ranges. Extract individual pages into separate PDF documents. Processed in your browser.",
  }
};

export default function PdfSplitPage() {
  const faq = [
        { question: "Can I extract specific pages?", answer: "Yes, you can choose 'Custom Ranges' and enter pages like '1-3, 5' to create a new PDF with only those pages." },
        { question: "Is my data secure?", answer: "Yes! All processing happens securely in your web browser. Your PDFs never leave your device." }
      ];
  const jsonLd = generateToolJsonLd('pdf-split', 'Split PDF', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <PdfSplitClient />
    </>
  );
}
