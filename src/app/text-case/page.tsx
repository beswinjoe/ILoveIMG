import { Metadata } from "next";
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
  return <TextCaseClient />;
}
