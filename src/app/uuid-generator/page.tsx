import { Metadata } from "next";
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
  return <UuidGeneratorClient />;
}
