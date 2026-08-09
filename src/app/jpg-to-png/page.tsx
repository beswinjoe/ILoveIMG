import { Metadata } from "next";
import JpgToPngClient from "./JpgToPngClient";

export const metadata: Metadata = {
  title: "JPG to PNG Online – Free | Filoza",
  description: "Convert JPG to transparent PNG format. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/jpg-to-png"
  },
  openGraph: {
    title: "JPG to PNG Online – Free | Filoza",
    description: "Convert JPG to transparent PNG format. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/jpg-to-png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PNG Online – Free | Filoza",
    description: "Convert JPG to transparent PNG format. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function JpgToPngPage() {
  return <JpgToPngClient />;
}
