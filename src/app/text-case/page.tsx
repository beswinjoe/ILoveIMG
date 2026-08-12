import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import TextCaseClient from "./TextCaseClient";

export const metadata: Metadata = {
  title: "Text Case Converter - Change Text Case Online | Filoza",
  description: "Convert text between uppercase, lowercase, title case, sentence case, and more online. Paste your text and transform it instantly.",
  alternates: {
    canonical: "https://filoza.vercel.app/text-case"
  },
  openGraph: {
    title: "Text Case Converter - Change Text Case Online | Filoza",
    description: "Convert text between uppercase, lowercase, title case, sentence case, and more online. Paste your text and transform it instantly.",
    url: "https://filoza.vercel.app/text-case",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Case Converter - Change Text Case Online | Filoza",
    description: "Convert text between uppercase, lowercase, title case, sentence case, and more online. Paste your text and transform it instantly.",
  }
};

export default function TextCasePage() {
  const faq = [
        { question: "Is my text saved?", answer: "No. The text you enter is processed entirely in your browser and is never sent to our servers." }
      ];
  const jsonLd = generateToolJsonLd('text-case', 'Text Case Converter', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <TextCaseClient />
    </>
  );
}
