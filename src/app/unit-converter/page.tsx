import { Metadata } from "next";
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
  return <UnitConverterClient />;
}
