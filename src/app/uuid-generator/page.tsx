import { Metadata } from "next";
import UuidGeneratorClient from "./UuidGeneratorClient";

export const metadata: Metadata = {
  title: "UUID Generator Online – Free | Filoza",
  description: "Generate unique random UUIDs (v4)",
  alternates: {
    canonical: "https://filoza.vercel.app/uuid-generator"
  },
  openGraph: {
    title: "UUID Generator Online – Free | Filoza",
    description: "Generate unique random UUIDs (v4)",
    url: "https://filoza.vercel.app/uuid-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID Generator Online – Free | Filoza",
    description: "Generate unique random UUIDs (v4)",
  }
};

export default function UuidGeneratorPage() {
  return <UuidGeneratorClient />;
}
