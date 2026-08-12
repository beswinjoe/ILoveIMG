import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import RarExtractorClient from "./RarExtractorClient";

export const metadata: Metadata = {
  title: "RAR Extractor - Extract RAR Files Online | Filoza",
  description: "Extract files from RAR archives online. Browse and download contents without installing software. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/rar-extractor"
  },
  openGraph: {
    title: "RAR Extractor - Extract RAR Files Online | Filoza",
    description: "Extract files from RAR archives online. Browse and download contents without installing software. Processed locally in your browser.",
    url: "https://filoza.vercel.app/rar-extractor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RAR Extractor - Extract RAR Files Online | Filoza",
    description: "Extract files from RAR archives online. Browse and download contents without installing software. Processed locally in your browser.",
  }
};

export default function RarExtractorPage() {
  const faq = [
        { question: "Is my file uploaded to a server?", answer: "No. The entire extraction process happens securely within your browser using WebAssembly." },
        { question: "Can I extract password-protected RARs?", answer: "Currently, this browser-based extractor does not support encrypted archives." }
      ];
  const jsonLd = generateToolJsonLd('rar-extractor', 'Extract RAR File', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <RarExtractorClient />
    </>
  );
}
