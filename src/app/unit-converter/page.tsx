import { Metadata } from "next";
import UnitConverterClient from "./UnitConverterClient";

export const metadata: Metadata = {
  title: "Unit Converter Online – Free | Filoza",
  description: "Convert between units of measurement",
  alternates: {
    canonical: "https://filoza.vercel.app/unit-converter"
  },
  openGraph: {
    title: "Unit Converter Online – Free | Filoza",
    description: "Convert between units of measurement",
    url: "https://filoza.vercel.app/unit-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unit Converter Online – Free | Filoza",
    description: "Convert between units of measurement",
  }
};

export default function UnitConverterPage() {
  return <UnitConverterClient />;
}
