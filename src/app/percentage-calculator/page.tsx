import { Metadata } from "next";
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
  return <PercentageCalculatorClient />;
}
