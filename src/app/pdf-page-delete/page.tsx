import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import PdfPageDeleteClient from "./PdfPageDeleteClient";
export const metadata: Metadata = {
  title: "Delete PDF Pages - Remove Pages from PDFs Online | Filoza",
  description: "Remove unwanted pages from PDF files online. Select pages to delete and download the updated PDF. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-page-delete"
  },
  openGraph: {
    title: "Delete PDF Pages - Remove Pages from PDFs Online | Filoza",
    description: "Remove unwanted pages from PDF files online. Select pages to delete and download the updated PDF. Processed locally in your browser.",
    url: "https://filoza.vercel.app/pdf-page-delete",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Delete PDF Pages - Remove Pages from PDFs Online | Filoza",
    description: "Remove unwanted pages from PDF files online. Select pages to delete and download the updated PDF. Processed locally in your browser."
  }
};
export default function PdfPageDeletePage() {
  const faq = [{
    question: "How do I specify which pages to delete?",
    answer: "Enter the page numbers separated by commas (e.g., '1, 4, 7') or use dashes for ranges (e.g., '1-3')."
  }, {
    question: "Is my data secure?",
    answer: "Yes! All processing happens securely in your web browser. Your PDFs never leave your device."
  }];
  const jsonLd = generateToolJsonLd('pdf-page-delete', 'Delete PDF Pages', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Select or drag and drop your PDF file.", "Apply your desired PDF modifications.", "Click process.", "Download your new PDF document."]}
      supportedFormats="PDF"
      title="Delete PDF Pages"
      description="Remove unwanted pages from your PDF document easily and securely."
      breadcrumbs={[{
  label: "PDF Tools",
  href: "/pdf-tools"
}, {
  label: "Delete Pages",
  href: "/pdf-page-delete"
}]}
      faq={[{
  question: "How do I specify which pages to delete?",
  answer: "Enter the page numbers separated by commas (e.g., '1, 4, 7') or use dashes for ranges (e.g., '1-3')."
}, {
  question: "Is my data secure?",
  answer: "Yes! All processing happens securely in your web browser. Your PDFs never leave your device."
}]}
      relatedTools={[{
  name: "Extract PDF Pages",
  href: "/pdf-page-extract",
  icon: <CheckCircle2 />
}, {
  name: "Split PDF",
  href: "/pdf-split",
  icon: <CheckCircle2 />
}]}>
      <PdfPageDeleteClient />
    </ToolLayout>
    </>;
}