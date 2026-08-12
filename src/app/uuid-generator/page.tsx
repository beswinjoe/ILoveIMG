import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import UuidGeneratorClient from "./UuidGeneratorClient";

export const metadata: Metadata = {
  title: "UUID Generator - Generate Random UUIDs (v4) Online | Filoza",
  description: "Generate unique random UUIDs (v4) online. Copy instantly for use in databases, APIs, and applications. Generated in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/uuid-generator"
  },
  openGraph: {
    title: "UUID Generator - Generate Random UUIDs (v4) Online | Filoza",
    description: "Generate unique random UUIDs (v4) online. Copy instantly for use in databases, APIs, and applications. Generated in your browser.",
    url: "https://filoza.vercel.app/uuid-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID Generator - Generate Random UUIDs (v4) Online | Filoza",
    description: "Generate unique random UUIDs (v4) online. Copy instantly for use in databases, APIs, and applications. Generated in your browser.",
  }
};

export default function UuidGeneratorPage() {
  const faq = [
        { question: "What is a UUID?", answer: "A Universally Unique Identifier (UUID) is a 128-bit number used to identify information in computer systems. The probability of generating a duplicate UUID is close enough to zero to be negligible." },
        { question: "Are these UUIDs secure?", answer: "Yes. They are generated using your browser's crypto API which provides cryptographically strong random values." }
      ];
  const jsonLd = generateToolJsonLd('uuid-generator', 'UUID Generator', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <UuidGeneratorClient />
    </>
  );
}
