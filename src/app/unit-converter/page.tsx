import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import UnitConverterClient from "./UnitConverterClient";

export const metadata: Metadata = {
  title: "Unit Converter - Convert Length, Weight & Temperature Online | Filoza",
  description: "Convert between units of length, weight, temperature, and more online. Supports metric and imperial units.",
  alternates: {
    canonical: "https://filoza.vercel.app/unit-converter"
  },
  openGraph: {
    title: "Unit Converter - Convert Length, Weight & Temperature Online | Filoza",
    description: "Convert between units of length, weight, temperature, and more online. Supports metric and imperial units.",
    url: "https://filoza.vercel.app/unit-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unit Converter - Convert Length, Weight & Temperature Online | Filoza",
    description: "Convert between units of length, weight, temperature, and more online. Supports metric and imperial units.",
  }
};

export default function UnitConverterPage() {
  const faq = [
        { question: "How accurate is the converter?", answer: "The converter uses standard scientific conversion rates and provides up to 6 decimal places of precision." }
      ];
  const jsonLd = generateToolJsonLd('unit-converter', 'Unit Converter', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <UnitConverterClient />
    </>
  );
}
