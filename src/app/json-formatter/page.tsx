import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import JsonFormatterClient from "./JsonFormatterClient";
export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Format JSON Online | Filoza",
  description: "Format, beautify, and validate JSON data online. Indent and syntax-highlight JSON for readability. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/json-formatter"
  },
  openGraph: {
    title: "JSON Formatter & Validator - Format JSON Online | Filoza",
    description: "Format, beautify, and validate JSON data online. Indent and syntax-highlight JSON for readability. Processed in your browser.",
    url: "https://filoza.vercel.app/json-formatter",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter & Validator - Format JSON Online | Filoza",
    description: "Format, beautify, and validate JSON data online. Indent and syntax-highlight JSON for readability. Processed in your browser."
  }
};
export default function JsonFormatterPage() {
  const faq = [{
    question: "Is my JSON data safe?",
    answer: "Yes! All processing happens securely in your web browser. We never send your data to any server."
  }, {
    question: "How does the validator work?",
    answer: "We parse your JSON strictly using the browser's native JSON parser. If there is a syntax error, we display the exact error message."
  }];
  const jsonLd = generateToolJsonLd('json-formatter', 'JSON Formatter', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="JSON Formatter & Validator"
      description="Format, validate, and minify your JSON data instantly in your browser."
      breadcrumbs={[{
  label: "Utilities",
  href: "/tools"
}, {
  label: "JSON Formatter",
  href: "/json-formatter"
}]}
      faq={[{
  question: "Is my JSON data safe?",
  answer: "Yes! All processing happens securely in your web browser. We never send your data to any server."
}, {
  question: "How does the validator work?",
  answer: "We parse your JSON strictly using the browser's native JSON parser. If there is a syntax error, we display the exact error message."
}]}
      relatedTools={[{
  name: "Base64 Encoder",
  href: "/base64",
  icon: <CheckCircle2 />
}, {
  name: "Word Counter",
  href: "/word-counter",
  icon: <CheckCircle2 />
}]}>
      <JsonFormatterClient />
    </ToolLayout>
    </>;
}