import { Metadata } from "next";
import Base64Client from "./Base64Client";

export const metadata: Metadata = {
  title: "Base64 Encoder Online – Free | Filoza",
  description: "Encode and decode text to Base64",
  alternates: {
    canonical: "https://filoza.vercel.app/base64"
  },
  openGraph: {
    title: "Base64 Encoder Online – Free | Filoza",
    description: "Encode and decode text to Base64",
    url: "https://filoza.vercel.app/base64",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder Online – Free | Filoza",
    description: "Encode and decode text to Base64",
  }
};

export default function Base64Page() {
  return <Base64Client />;
}
