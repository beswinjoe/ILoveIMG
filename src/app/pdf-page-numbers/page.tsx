import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import PdfPageNumbersClient from './PdfPageNumbersClient';
export const metadata: Metadata = {
  title: "Add Page Numbers to PDF - Number PDF Pages Online | Filoza",
  description: "Add page numbers to your PDF documents online. Choose position and starting number. Free, fast, and processed safely and securely in your web browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-page-numbers"
  },
  openGraph: {
    title: "Add Page Numbers to PDF - Number PDF Pages Online | Filoza",
    description: "Add page numbers to your PDF documents online. Choose position and starting number. Free, fast, and processed safely and securely in your web browser.",
    url: "https://filoza.vercel.app/pdf-page-numbers",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Page Numbers to PDF - Number PDF Pages Online | Filoza",
    description: "Add page numbers to your PDF documents online. Choose position and starting number. Free, fast, and processed safely and securely in your web browser."
  }
};
export default function PdfPageNumbersPage() {
  const faq = [{
    question: "Are my files uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('pdf-page-numbers', 'Add PDF Page Numbers', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Select or drag and drop your PDF file.", "Apply your desired PDF modifications.", "Click process.", "Download your new PDF document."]}
      supportedFormats="PDF"
      title="PDF Page Numbers"
      description="Add page numbers to your PDF documents easily."
      breadcrumbs={[{
  label: "PDF Tools",
  href: "/pdf-tools"
}, {
  label: "PDF Page Numbers",
  href: "/pdf-page-numbers"
}]}
      faq={[{
  question: "Are my files uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <PdfPageNumbersClient />
    </ToolLayout>
    </>;
}