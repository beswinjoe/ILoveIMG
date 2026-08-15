import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import ExcelToPdfClient from './ExcelToPdfClient';
export const metadata: Metadata = {
  title: "Excel to PDF Converter - Convert XLSX to PDF Online | Filoza",
  description: "Convert Excel spreadsheets (XLSX) to PDF format online. Preserve table structure in a printable PDF. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/excel-to-pdf"
  },
  openGraph: {
    title: "Excel to PDF Converter - Convert XLSX to PDF Online | Filoza",
    description: "Convert Excel spreadsheets (XLSX) to PDF format online. Preserve table structure in a printable PDF. Processed in your browser.",
    url: "https://filoza.vercel.app/excel-to-pdf",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel to PDF Converter - Convert XLSX to PDF Online | Filoza",
    description: "Convert Excel spreadsheets (XLSX) to PDF format online. Preserve table structure in a printable PDF. Processed in your browser."
  }
};
export default function ExcelToPdfPage() {
  const faq = [{
    question: "Is my file uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('excel-to-pdf', 'Excel to PDF', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="Excel to PDF"
      description="Convert Excel files (.xlsx) to PDF format."
      breadcrumbs={[{
  label: "Documents",
  href: "/documents"
}, {
  label: "Excel to PDF",
  href: "/excel-to-pdf"
}]}
      faq={[{
  question: "Is my file uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <ExcelToPdfClient />
    </ToolLayout>
    </>;
}