import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import PercentageCalculatorClient from "./PercentageCalculatorClient";
export const metadata: Metadata = {
  title: "Percentage Calculator - Calculate Percentages Online | Filoza",
  description: "Calculate percentage increases, decreases, and differences online. A quick, accurate math tool for all your everyday calculations and business needs.",
  alternates: {
    canonical: "https://filoza.vercel.app/percentage-calculator"
  },
  openGraph: {
    title: "Percentage Calculator - Calculate Percentages Online | Filoza",
    description: "Calculate percentage increases, decreases, and differences online. A quick, accurate math tool for all your everyday calculations and business needs.",
    url: "https://filoza.vercel.app/percentage-calculator",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Percentage Calculator - Calculate Percentages Online | Filoza",
    description: "Calculate percentage increases, decreases, and differences online. A quick, accurate math tool for all your everyday calculations and business needs."
  }
};
export default function PercentageCalculatorPage() {
  const faq = [{
    question: "Are my numbers saved?",
    answer: "No, this calculator runs entirely in your browser and your data is not stored or transmitted."
  }, {
    question: "Can it handle decimals and negatives?",
    answer: "Yes, you can input decimal numbers and negative values into any of the fields."
  }];
  const jsonLd = generateToolJsonLd('percentage-calculator', 'Percentage Calculator', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="Percentage Calculator"
      description="Easily calculate percentages, percentage changes, and differences instantly."
      breadcrumbs={[{
  label: "Utilities",
  href: "/tools"
}, {
  label: "Percentage Calculator",
  href: "/percentage-calculator"
}]}
      faq={[{
  question: "Are my numbers saved?",
  answer: "No, this calculator runs entirely in your browser and your data is not stored or transmitted."
}, {
  question: "Can it handle decimals and negatives?",
  answer: "Yes, you can input decimal numbers and negative values into any of the fields."
}]}
      relatedTools={[{
  name: "Unit Converter",
  href: "/unit-converter",
  icon: <CheckCircle2 />
}, {
  name: "Word Counter",
  href: "/word-counter",
  icon: <CheckCircle2 />
}]}>
      <PercentageCalculatorClient />
    </ToolLayout>
    </>;
}