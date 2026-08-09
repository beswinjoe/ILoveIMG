import { Metadata } from "next";
import PngToJpgClient from "./PngToJpgClient";

export const metadata: Metadata = {
  title: "PNG to JPG Online – Free | Filoza",
  description: "Convert PNG to optimized JPG. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/png-to-jpg"
  },
  openGraph: {
    title: "PNG to JPG Online – Free | Filoza",
    description: "Convert PNG to optimized JPG. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/png-to-jpg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PNG to JPG Online – Free | Filoza",
    description: "Convert PNG to optimized JPG. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function PngToJpgPage() {
  return <PngToJpgClient />;
}
