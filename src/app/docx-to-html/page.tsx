import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import DocxToHtmlClient from './DocxToHtmlClient';

export const metadata: Metadata = {
  title: "DOCX to HTML Converter - Convert Word to HTML Online | Filoza",
  description: "Convert Word documents (DOCX) to clean HTML code online. Get web-ready HTML from your Word files. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/docx-to-html"
  },
  openGraph: {
    title: "DOCX to HTML Converter - Convert Word to HTML Online | Filoza",
    description: "Convert Word documents (DOCX) to clean HTML code online. Get web-ready HTML from your Word files. Processed in your browser.",
    url: "https://filoza.vercel.app/docx-to-html",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOCX to HTML Converter - Convert Word to HTML Online | Filoza",
    description: "Convert Word documents (DOCX) to clean HTML code online. Get web-ready HTML from your Word files. Processed in your browser.",
  }
};

export default function DocxToHtmlPage() {
  const faq = [
        { question: "Is my file uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('docx-to-html', 'DOCX to HTML', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <DocxToHtmlClient />
    </>
  );
}
