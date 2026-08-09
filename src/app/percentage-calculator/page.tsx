import { Metadata } from "next";
import PercentageCalculatorClient from "./PercentageCalculatorClient";

export const metadata: Metadata = {
  title: "Percentage Calculator Online – Free | Filoza",
  description: "Calculate percentage increases",
  alternates: {
    canonical: "https://filoza.vercel.app/percentage-calculator"
  },
  openGraph: {
    title: "Percentage Calculator Online – Free | Filoza",
    description: "Calculate percentage increases",
    url: "https://filoza.vercel.app/percentage-calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Percentage Calculator Online – Free | Filoza",
    description: "Calculate percentage increases",
  }
};

export default function PercentageCalculatorPage() {
  return <PercentageCalculatorClient />;
}
