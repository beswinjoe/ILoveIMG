import { Metadata } from "next";
import JsonFormatterClient from "./JsonFormatterClient";

export const metadata: Metadata = {
  title: "JSON Formatter Online – Free | Filoza",
  description: "Format and validate JSON data",
  alternates: {
    canonical: "https://filoza.vercel.app/json-formatter"
  },
  openGraph: {
    title: "JSON Formatter Online – Free | Filoza",
    description: "Format and validate JSON data",
    url: "https://filoza.vercel.app/json-formatter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter Online – Free | Filoza",
    description: "Format and validate JSON data",
  }
};

export default function JsonFormatterPage() {
  return <JsonFormatterClient />;
}
