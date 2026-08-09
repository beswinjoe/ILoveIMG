import { Metadata } from "next";
import ResizerClient from "./ResizerClient";

export const metadata: Metadata = {
  title: "Image Resizer Online – Free | Filoza",
  description: "Resize images quickly. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-resizer"
  },
  openGraph: {
    title: "Image Resizer Online – Free | Filoza",
    description: "Resize images quickly. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/image-resizer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Resizer Online – Free | Filoza",
    description: "Resize images quickly. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function ImageResizerPage() {
  return <ResizerClient />;
}
