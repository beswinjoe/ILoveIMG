import { Metadata } from "next";
import Base64Client from "./Base64Client";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder - Encode/Decode Text Online | Filoza",
  description: "Encode text to Base64 or decode Base64 strings back to text online. Useful for developers working with encoded data.",
  alternates: {
    canonical: "https://filoza.vercel.app/base64"
  },
  openGraph: {
    title: "Base64 Encoder & Decoder - Encode/Decode Text Online | Filoza",
    description: "Encode text to Base64 or decode Base64 strings back to text online. Useful for developers working with encoded data.",
    url: "https://filoza.vercel.app/base64",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder & Decoder - Encode/Decode Text Online | Filoza",
    description: "Encode text to Base64 or decode Base64 strings back to text online. Useful for developers working with encoded data.",
  }
};

export default function Base64Page() {
  return <Base64Client />;
}
