import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import CsvToPdfClient from './CsvToPdfClient';
export const metadata: Metadata = {
  title: "CSV to PDF Converter - Convert CSV to PDF Online | Filoza",
  description: "Convert CSV files to formatted PDF tables online. Get a printable PDF from your CSV data securely, privately, and processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/csv-to-pdf"
  },
  openGraph: {
    title: "CSV to PDF Converter - Convert CSV to PDF Online | Filoza",
    description: "Convert CSV files to formatted PDF tables online. Get a printable PDF from your CSV data securely, privately, and processed locally in your browser.",
    url: "https://filoza.vercel.app/csv-to-pdf",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "CSV to PDF Converter - Convert CSV to PDF Online | Filoza",
    description: "Convert CSV files to formatted PDF tables online. Get a printable PDF from your CSV data securely, privately, and processed locally in your browser."
  }
};
export default function CsvToPdfPage() {
  const faq = [{
    question: "Is my file uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('csv-to-pdf', 'CSV to PDF', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="CSV to PDF"
      description="Convert CSV files to PDF format."
      breadcrumbs={[{
  label: "Documents",
  href: "/documents"
}, {
  label: "CSV to PDF",
  href: "/csv-to-pdf"
}]}
      faq={[{
  question: "Is my file uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <CsvToPdfClient />
    </ToolLayout>
    </>;
}