import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
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
  const faq = [
        { question: "Is my data secure?", answer: "Yes! All processing happens securely in your web browser. We never send your text to any server." },
        { question: "Does it support UTF-8?", answer: "Yes, this tool correctly handles UTF-8 characters (like emojis and special accents) during encoding and decoding." }
      ];
  const jsonLd = generateToolJsonLd('base64', 'Base64 Encoder/Decoder', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Base64Client />
    </>
  );
}
