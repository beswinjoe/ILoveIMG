import { Metadata } from "next";
import WordCounterClient from "./WordCounterClient";

export const metadata: Metadata = {
  title: "Word Counter Online – Free | Filoza",
  description: "Count words, characters, and sentences",
  alternates: {
    canonical: "https://filoza.vercel.app/word-counter"
  },
  openGraph: {
    title: "Word Counter Online – Free | Filoza",
    description: "Count words, characters, and sentences",
    url: "https://filoza.vercel.app/word-counter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Counter Online – Free | Filoza",
    description: "Count words, characters, and sentences",
  }
};

export default function WordCounterPage() {
  return <WordCounterClient />;
}
