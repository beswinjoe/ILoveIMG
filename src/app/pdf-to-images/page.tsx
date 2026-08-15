import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import PdfToImagesClient from "./PdfToImagesClient";
export const metadata: Metadata = {
  title: "PDF to Images - Convert PDF Pages to JPG or PNG | Filoza",
  description: "Convert PDF pages to JPG or PNG images online. Extract each page as a separate image file. Free and processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-to-images"
  },
  openGraph: {
    title: "PDF to Images - Convert PDF Pages to JPG or PNG | Filoza",
    description: "Convert PDF pages to JPG or PNG images online. Extract each page as a separate image file. Free and processed in your browser.",
    url: "https://filoza.vercel.app/pdf-to-images",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Images - Convert PDF Pages to JPG or PNG | Filoza",
    description: "Convert PDF pages to JPG or PNG images online. Extract each page as a separate image file. Free and processed in your browser."
  }
};
export default function PdfToImagesPage() {
  const faq = [{
    question: "Are my PDFs uploaded?",
    answer: "No. The entire conversion happens securely inside your browser using advanced WebAssembly technologies."
  }, {
    question: "How do I download the images?",
    answer: "Once processing is complete, all images will be automatically packaged into a single ZIP file for you to download."
  }];
  const jsonLd = generateToolJsonLd('pdf-to-images', 'PDF to Images', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Select or drag and drop your PDF file.", "Apply your desired PDF modifications.", "Click process.", "Download your new PDF document."]}
      supportedFormats="PDF"
      title="PDF to Images"
      description="Convert every page of a PDF document into high-quality JPG or PNG images instantly in your browser."
      breadcrumbs={[{
  label: "PDF Tools",
  href: "/pdf-tools"
}, {
  label: "PDF to Images",
  href: "/pdf-to-images"
}]}
      faq={[{
  question: "Are my PDFs uploaded?",
  answer: "No. The entire conversion happens securely inside your browser using advanced WebAssembly technologies."
}, {
  question: "How do I download the images?",
  answer: "Once processing is complete, all images will be automatically packaged into a single ZIP file for you to download."
}]}
      relatedTools={[{
  name: "Image to PDF",
  href: "/image-to-pdf",
  icon: <CheckCircle2 />
}, {
  name: "JPG to PNG",
  href: "/jpg-to-png",
  icon: <CheckCircle2 />
}]}>
      <PdfToImagesClient />
    </ToolLayout>
    </>;
}