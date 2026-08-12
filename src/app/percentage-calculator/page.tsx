import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import PercentageCalculatorClient from "./PercentageCalculatorClient";

export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate Percentages Online | Filoza",
  description: "Calculate percentage increases, decreases, and differences online. A quick math tool for everyday calculations.",
  alternates: {
    canonical: "https://filoza.vercel.app/percentage-calculator"
  },
  openGraph: {
    title: "Percentage Calculator - Calculate Percentages Online | Filoza",
    description: "Calculate percentage increases, decreases, and differences online. A quick math tool for everyday calculations.",
    url: "https://filoza.vercel.app/percentage-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Percentage Calculator - Calculate Percentages Online | Filoza",
    description: "Calculate percentage increases, decreases, and differences online. A quick math tool for everyday calculations.",
  }
};

export default function PercentageCalculatorPage() {
  const faq = [
        { question: "Are my numbers saved?", answer: "No, this calculator runs entirely in your browser and your data is not stored or transmitted." },
        { question: "Can it handle decimals and negatives?", answer: "Yes, you can input decimal numbers and negative values into any of the fields." }
      ];
  const jsonLd = generateToolJsonLd('percentage-calculator', 'Percentage Calculator', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <PercentageCalculatorClient />
    </>
  );
}
