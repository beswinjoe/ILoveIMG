import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import UnitConverterClient from "./UnitConverterClient";
export const metadata: Metadata = {
  title: "Unit Converter - Length, Weight & Temp Online | Filoza",
  description: "Convert between units of length, weight, temperature, and more online. Supports both metric and imperial measurement systems securely in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/unit-converter"
  },
  openGraph: {
    title: "Unit Converter - Length, Weight & Temp Online | Filoza",
    description: "Convert between units of length, weight, temperature, and more online. Supports both metric and imperial measurement systems securely in your browser.",
    url: "https://filoza.vercel.app/unit-converter",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Unit Converter - Length, Weight & Temp Online | Filoza",
    description: "Convert between units of length, weight, temperature, and more online. Supports both metric and imperial measurement systems securely in your browser."
  }
};
export default function UnitConverterPage() {
  const faq = [{
    question: "How accurate is the converter?",
    answer: "The converter uses standard scientific conversion rates and provides up to 6 decimal places of precision."
  }];
  const jsonLd = generateToolJsonLd('unit-converter', 'Unit Converter', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="Unit Converter"
      description="Quickly convert between units of length, weight, temperature, and digital data."
      breadcrumbs={[{
  label: "Utilities",
  href: "/tools"
}, {
  label: "Unit Converter",
  href: "/unit-converter"
}]}
      faq={[{
  question: "How accurate is the converter?",
  answer: "The converter uses standard scientific conversion rates and provides up to 6 decimal places of precision."
}]}
      relatedTools={[{
  name: "Percentage Calculator",
  href: "/percentage-calculator",
  icon: <CheckCircle2 />
}, {
  name: "Timestamp Converter",
  href: "/timestamp",
  icon: <CheckCircle2 />
}]}>
      <UnitConverterClient />
    </ToolLayout>
    </>;
}