import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import PdfMetadataClient from './PdfMetadataClient';
export const metadata: Metadata = {
  title: "PDF Metadata Editor - View & Remove PDF Metadata | Filoza",
  description: "View or remove metadata from PDF files online. Clean author, title, and other hidden information from your PDFs. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-metadata"
  },
  openGraph: {
    title: "PDF Metadata Editor - View & Remove PDF Metadata | Filoza",
    description: "View or remove metadata from PDF files online. Clean author, title, and other hidden information from your PDFs. Processed in your browser.",
    url: "https://filoza.vercel.app/pdf-metadata",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Metadata Editor - View & Remove PDF Metadata | Filoza",
    description: "View or remove metadata from PDF files online. Clean author, title, and other hidden information from your PDFs. Processed in your browser."
  }
};
export default function PdfMetadataPage() {
  const faq = [{
    question: "Are my files uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('pdf-metadata', 'PDF Metadata', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Select or drag and drop your PDF file.", "Apply your desired PDF modifications.", "Click process.", "Download your new PDF document."]}
      supportedFormats="PDF"
      title="PDF Metadata Viewer"
      description="View or remove metadata from your PDF files."
      breadcrumbs={[{
  label: "PDF Tools",
  href: "/pdf-tools"
}, {
  label: "PDF Metadata Viewer",
  href: "/pdf-metadata"
}]}
      faq={[{
  question: "Are my files uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <PdfMetadataClient />
    </ToolLayout>
    </>;
}