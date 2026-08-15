import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import Base64Client from "./Base64Client";
export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder - Encode/Decode Text Online | Filoza",
  description: "Encode text to Base64 or decode Base64 strings back to text online. Fast and useful tool for developers working with encoded data and credentials.",
  alternates: {
    canonical: "https://filoza.vercel.app/base64"
  },
  openGraph: {
    title: "Base64 Encoder & Decoder - Encode/Decode Text Online | Filoza",
    description: "Encode text to Base64 or decode Base64 strings back to text online. Fast and useful tool for developers working with encoded data and credentials.",
    url: "https://filoza.vercel.app/base64",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder & Decoder - Encode/Decode Text Online | Filoza",
    description: "Encode text to Base64 or decode Base64 strings back to text online. Fast and useful tool for developers working with encoded data and credentials."
  }
};
export default function Base64Page() {
  const faq = [{
    question: "Is my data secure?",
    answer: "Yes! All processing happens securely in your web browser. We never send your text to any server."
  }, {
    question: "Does it support UTF-8?",
    answer: "Yes, this tool correctly handles UTF-8 characters (like emojis and special accents) during encoding and decoding."
  }];
  const jsonLd = generateToolJsonLd('base64', 'Base64 Encoder/Decoder', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="Base64 Encoder/Decoder"
      description="Easily encode text to Base64 or decode Base64 back to text instantly."
      breadcrumbs={[{
  label: "Utilities",
  href: "/tools"
}, {
  label: "Base64",
  href: "/base64"
}]}
      faq={[{
  question: "Is my data secure?",
  answer: "Yes! All processing happens securely in your web browser. We never send your text to any server."
}, {
  question: "Does it support UTF-8?",
  answer: "Yes, this tool correctly handles UTF-8 characters (like emojis and special accents) during encoding and decoding."
}]}
      relatedTools={[{
  name: "JSON Formatter",
  href: "/json-formatter",
  icon: <CheckCircle2 />
}, {
  name: "Text Case Converter",
  href: "/text-case",
  icon: <CheckCircle2 />
}]}>
      <Base64Client />
    </ToolLayout>
    </>;
}