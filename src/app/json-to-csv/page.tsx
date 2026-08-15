import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import JsonToCsvClient from './JsonToCsvClient';
export const metadata: Metadata = {
  title: "JSON to CSV Converter - JSON Data to CSV Online | Filoza",
  description: "Convert JSON arrays and objects into CSV format online. Useful for data export and spreadsheet import. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/json-to-csv"
  },
  openGraph: {
    title: "JSON to CSV Converter - JSON Data to CSV Online | Filoza",
    description: "Convert JSON arrays and objects into CSV format online. Useful for data export and spreadsheet import. Processed in your browser.",
    url: "https://filoza.vercel.app/json-to-csv",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to CSV Converter - JSON Data to CSV Online | Filoza",
    description: "Convert JSON arrays and objects into CSV format online. Useful for data export and spreadsheet import. Processed in your browser."
  }
};
export default function JsonToCsvPage() {
  const faq = [{
    question: "Is my file uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('json-to-csv', 'JSON to CSV', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="JSON to CSV"
      description="Convert JSON data into CSV format."
      breadcrumbs={[{
  label: "Documents",
  href: "/documents"
}, {
  label: "JSON to CSV",
  href: "/json-to-csv"
}]}
      faq={[{
  question: "Is my file uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <JsonToCsvClient />
    </ToolLayout>
    </>;
}