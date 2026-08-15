import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import PdfCompressClient from "./PdfCompressClient";
export const metadata: Metadata = {
  title: "Compress PDF - Reduce PDF File Size Online | Filoza",
  description: "Compress PDF files to reduce their size online. Optimizes embedded images while keeping text sharp. Free and processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-compress"
  },
  openGraph: {
    title: "Compress PDF - Reduce PDF File Size Online | Filoza",
    description: "Compress PDF files to reduce their size online. Optimizes embedded images while keeping text sharp. Free and processed in your browser.",
    url: "https://filoza.vercel.app/pdf-compress",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF - Reduce PDF File Size Online | Filoza",
    description: "Compress PDF files to reduce their size online. Optimizes embedded images while keeping text sharp. Free and processed in your browser."
  }
};
export default function PdfCompressPage() {
  const faq = [{
    question: "Why didn't my file size change much?",
    answer: "Filoza processes your PDFs entirely on your device for absolute privacy. Because we don't upload your files to a server, we can't run heavy image-downsampling algorithms. Our tool optimizes the internal structure of the PDF, which works great for some files, but won't compress large embedded images as aggressively as server-based tools."
  }, {
    question: "Is my data secure?",
    answer: "Yes! All processing happens securely in your web browser. Your PDFs never leave your device."
  }];
  const jsonLd = generateToolJsonLd('pdf-compress', 'Compress PDF', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Select or drag and drop your PDF file.", "Apply your desired PDF modifications.", "Click process.", "Download your new PDF document."]}
      supportedFormats="PDF"
      title="Compress PDF"
      description="Reduce file size of your PDF document securely in your browser."
      breadcrumbs={[{
  label: "PDF Tools",
  href: "/pdf-tools"
}, {
  label: "Compress PDF",
  href: "/pdf-compress"
}]}
      faq={[{
  question: "Why didn't my file size change much?",
  answer: "Filoza processes your PDFs entirely on your device for absolute privacy. Because we don't upload your files to a server, we can't run heavy image-downsampling algorithms. Our tool optimizes the internal structure of the PDF, which works great for some files, but won't compress large embedded images as aggressively as server-based tools."
}, {
  question: "Is my data secure?",
  answer: "Yes! All processing happens securely in your web browser. Your PDFs never leave your device."
}]}
      relatedTools={[{
  name: "Merge PDF",
  href: "/pdf-merge",
  icon: <CheckCircle2 />
}]}>
      <PdfCompressClient />
    </ToolLayout>
    </>;
}