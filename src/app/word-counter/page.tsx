import { Metadata } from "next";
import WordCounterClient from "./WordCounterClient";

export const metadata: Metadata = {
  title: "Word Counter Online Free | Filoza",
  description: "Count words, characters, sentences, and paragraphs in your text instantly and securely. No data is sent to our servers.",
};

export default function WordCounterPage() {
  return <WordCounterClient />;
}
