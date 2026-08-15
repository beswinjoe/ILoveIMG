import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import PdfPageExtractClient from "./PdfPageExtractClient";
export const metadata: Metadata = {
  title: "Extract PDF Pages - Pull Specific Pages from PDFs | Filoza",
  description: "Extract specific pages from a PDF document online. Select the pages you need and download them as a new PDF file. Free and browser-based.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-page-extract"
  },
  openGraph: {
    title: "Extract PDF Pages - Pull Specific Pages from PDFs | Filoza",
    description: "Extract specific pages from a PDF document online. Select the pages you need and download them as a new PDF file. Free and browser-based.",
    url: "https://filoza.vercel.app/pdf-page-extract",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Extract PDF Pages - Pull Specific Pages from PDFs | Filoza",
    description: "Extract specific pages from a PDF document online. Select the pages you need and download them as a new PDF file. Free and browser-based."
  }
};
export default function PdfPageExtractPage() {
  const faq = [{
    question: "How do I specify which pages to extract?",
    answer: "Enter the page numbers separated by commas (e.g., '1, 4, 7') or use dashes for ranges (e.g., '1-3')."
  }, {
    question: "Is my data secure?",
    answer: "Yes! All processing happens securely in your web browser. Your PDFs never leave your device."
  }];
  const jsonLd = generateToolJsonLd('pdf-page-extract', 'Extract PDF Pages', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Select or drag and drop your PDF file.", "Apply your desired PDF modifications.", "Click process.", "Download your new PDF document."]}
      supportedFormats="PDF"
      title="Extract PDF Pages"
      description="Extract specific pages from your PDF and save them as a new document."
      breadcrumbs={[{
  label: "PDF Tools",
  href: "/pdf-tools"
}, {
  label: "Extract Pages",
  href: "/pdf-page-extract"
}]}
      faq={[{
  question: "How do I specify which pages to extract?",
  answer: "Enter the page numbers separated by commas (e.g., '1, 4, 7') or use dashes for ranges (e.g., '1-3')."
}, {
  question: "Is my data secure?",
  answer: "Yes! All processing happens securely in your web browser. Your PDFs never leave your device."
}]}
      relatedTools={[{
  name: "Delete PDF Pages",
  href: "/pdf-page-delete",
  icon: <CheckCircle2 />
}, {
  name: "Split PDF",
  href: "/pdf-split",
  icon: <CheckCircle2 />
}]}>
      <PdfPageExtractClient />
    </ToolLayout>
    </>;
}