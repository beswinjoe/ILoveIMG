import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import ExcelToCsvClient from './ExcelToCsvClient';
export const metadata: Metadata = {
  title: "Excel to CSV Converter - Convert XLSX to CSV Online | Filoza",
  description: "Convert Excel spreadsheets (XLSX) to CSV format online. Export your spreadsheet data as a comma-separated file. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/excel-to-csv"
  },
  openGraph: {
    title: "Excel to CSV Converter - Convert XLSX to CSV Online | Filoza",
    description: "Convert Excel spreadsheets (XLSX) to CSV format online. Export your spreadsheet data as a comma-separated file. Processed in your browser.",
    url: "https://filoza.vercel.app/excel-to-csv",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel to CSV Converter - Convert XLSX to CSV Online | Filoza",
    description: "Convert Excel spreadsheets (XLSX) to CSV format online. Export your spreadsheet data as a comma-separated file. Processed in your browser."
  }
};
export default function ExcelToCsvPage() {
  const faq = [{
    question: "Is my file uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('excel-to-csv', 'Excel to CSV', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="Excel to CSV"
      description="Convert Excel files (.xlsx) to CSV format easily."
      breadcrumbs={[{
  label: "Documents",
  href: "/documents"
}, {
  label: "Excel to CSV",
  href: "/excel-to-csv"
}]}
      faq={[{
  question: "Is my file uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <ExcelToCsvClient />
    </ToolLayout>
    </>;
}