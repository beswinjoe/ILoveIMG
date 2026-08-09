import { Metadata } from "next";
import QrGeneratorClient from "./QrGeneratorClient";

export const metadata: Metadata = {
  title: "QR Code Generator Online – Free | Filoza",
  description: "Generate QR codes from text or URLs",
  alternates: {
    canonical: "https://filoza.vercel.app/qr-generator"
  },
  openGraph: {
    title: "QR Code Generator Online – Free | Filoza",
    description: "Generate QR codes from text or URLs",
    url: "https://filoza.vercel.app/qr-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator Online – Free | Filoza",
    description: "Generate QR codes from text or URLs",
  }
};

export default function QrGeneratorPage() {
  return <QrGeneratorClient />;
}
