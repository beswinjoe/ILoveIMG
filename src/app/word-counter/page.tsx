import { Metadata } from "next";
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
  return <WordCounterClient />;
}
