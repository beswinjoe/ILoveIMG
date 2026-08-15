import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import CsvToExcelClient from './CsvToExcelClient';
export const metadata: Metadata = {
  title: "CSV to Excel Converter - Convert CSV to XLSX Online | Filoza",
  description: "Convert CSV files to Excel (XLSX) format online. Open CSV data in Excel with proper columns. Processed securely and locally in your web browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/csv-to-excel"
  },
  openGraph: {
    title: "CSV to Excel Converter - Convert CSV to XLSX Online | Filoza",
    description: "Convert CSV files to Excel (XLSX) format online. Open CSV data in Excel with proper columns. Processed securely and locally in your web browser.",
    url: "https://filoza.vercel.app/csv-to-excel",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "CSV to Excel Converter - Convert CSV to XLSX Online | Filoza",
    description: "Convert CSV files to Excel (XLSX) format online. Open CSV data in Excel with proper columns. Processed securely and locally in your web browser."
  }
};
export default function CsvToExcelPage() {
  const faq = [{
    question: "Is my file uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('csv-to-excel', 'CSV to Excel', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="CSV to Excel"
      description="Convert CSV files to Excel (.xlsx) format."
      breadcrumbs={[{
  label: "Documents",
  href: "/documents"
}, {
  label: "CSV to Excel",
  href: "/csv-to-excel"
}]}
      faq={[{
  question: "Is my file uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <CsvToExcelClient />
    </ToolLayout>
    </>;
}