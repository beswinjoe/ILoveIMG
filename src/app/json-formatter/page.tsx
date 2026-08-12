import { Metadata } from "next";
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
  return <JsonFormatterClient />;
}
