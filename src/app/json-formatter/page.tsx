import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import JsonFormatterClient from "./JsonFormatterClient";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Format JSON Online | Filoza",
  description: "Format, beautify, and validate JSON data online. Indent and syntax-highlight JSON for readability. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/json-formatter"
  },
  openGraph: {
    title: "JSON Formatter & Validator - Format JSON Online | Filoza",
    description: "Format, beautify, and validate JSON data online. Indent and syntax-highlight JSON for readability. Processed in your browser.",
    url: "https://filoza.vercel.app/json-formatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter & Validator - Format JSON Online | Filoza",
    description: "Format, beautify, and validate JSON data online. Indent and syntax-highlight JSON for readability. Processed in your browser.",
  }
};

export default function JsonFormatterPage() {
  const faq = [
        { question: "Is my JSON data safe?", answer: "Yes! All processing happens securely in your web browser. We never send your data to any server." },
        { question: "How does the validator work?", answer: "We parse your JSON strictly using the browser's native JSON parser. If there is a syntax error, we display the exact error message." }
      ];
  const jsonLd = generateToolJsonLd('json-formatter', 'JSON Formatter', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <JsonFormatterClient />
    </>
  );
}
