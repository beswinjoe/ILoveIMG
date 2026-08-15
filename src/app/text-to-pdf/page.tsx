import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import TextToPdfClient from './TextToPdfClient';
export const metadata: Metadata = {
  title: "Text to PDF Converter - Convert Text to PDF Online | Filoza",
  description: "Convert plain text into a formatted PDF document online. Type or paste text and generate a clean PDF file. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/text-to-pdf"
  },
  openGraph: {
    title: "Text to PDF Converter - Convert Text to PDF Online | Filoza",
    description: "Convert plain text into a formatted PDF document online. Type or paste text and generate a clean PDF file. Processed in your browser.",
    url: "https://filoza.vercel.app/text-to-pdf",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Text to PDF Converter - Convert Text to PDF Online | Filoza",
    description: "Convert plain text into a formatted PDF document online. Type or paste text and generate a clean PDF file. Processed in your browser."
  }
};
export default function TextToPdfPage() {
  const faq = [{
    question: "Are my files uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('text-to-pdf', 'Text to PDF', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Select or drag and drop your PDF file.", "Apply your desired PDF modifications.", "Click process.", "Download your new PDF document."]}
      supportedFormats="PDF"
      title="Text to PDF"
      description="Instantly convert your raw text into a neat PDF document."
      breadcrumbs={[{
  label: "PDF Tools",
  href: "/pdf-tools"
}, {
  label: "Text to PDF",
  href: "/text-to-pdf"
}]}
      faq={[{
  question: "Are my files uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <TextToPdfClient />
    </ToolLayout>
    </>;
}