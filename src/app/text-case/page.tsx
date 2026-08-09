import { Metadata } from "next";
import TextCaseClient from "./TextCaseClient";

export const metadata: Metadata = {
  title: "Text Case Converter Online – Free | Filoza",
  description: "Convert text to uppercase, lowercase",
  alternates: {
    canonical: "https://filoza.vercel.app/text-case"
  },
  openGraph: {
    title: "Text Case Converter Online – Free | Filoza",
    description: "Convert text to uppercase, lowercase",
    url: "https://filoza.vercel.app/text-case",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Case Converter Online – Free | Filoza",
    description: "Convert text to uppercase, lowercase",
  }
};

export default function TextCasePage() {
  return <TextCaseClient />;
}
