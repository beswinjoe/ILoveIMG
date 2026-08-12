import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import WordCounterClient from "./WordCounterClient";

export const metadata: Metadata = {
  title: "Word Counter - Count Words, Characters & Sentences | Filoza",
  description: "Count words, characters, sentences, and paragraphs in your text online. Useful for writers, students, and content creators.",
  alternates: {
    canonical: "https://filoza.vercel.app/word-counter"
  },
  openGraph: {
    title: "Word Counter - Count Words, Characters & Sentences | Filoza",
    description: "Count words, characters, sentences, and paragraphs in your text online. Useful for writers, students, and content creators.",
    url: "https://filoza.vercel.app/word-counter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Counter - Count Words, Characters & Sentences | Filoza",
    description: "Count words, characters, sentences, and paragraphs in your text online. Useful for writers, students, and content creators.",
  }
};

export default function WordCounterPage() {
  const faq = [
        { question: "Is my text saved?", answer: "No. The text you enter is processed entirely in your browser and is never sent to our servers." },
        { question: "How is reading time calculated?", answer: "Reading time is based on an average reading speed of 200 words per minute." }
      ];
  const jsonLd = generateToolJsonLd('word-counter', 'Word Counter', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <WordCounterClient />
    </>
  );
}
