import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import ImageToPdfClient from "./ImageToPdfClient";
export const metadata: Metadata = {
  title: "Image to PDF Converter - Convert Images to PDF Online | Filoza",
  description: "Convert JPG, PNG, and WebP images into a PDF document online. Combine multiple images into a single PDF file. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-to-pdf"
  },
  openGraph: {
    title: "Image to PDF Converter - Convert Images to PDF Online | Filoza",
    description: "Convert JPG, PNG, and WebP images into a PDF document online. Combine multiple images into a single PDF file. Processed in your browser.",
    url: "https://filoza.vercel.app/image-to-pdf",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to PDF Converter - Convert Images to PDF Online | Filoza",
    description: "Convert JPG, PNG, and WebP images into a PDF document online. Combine multiple images into a single PDF file. Processed in your browser."
  }
};
export default function ImageToPdfPage() {
  const faq = [{
    question: "Are my images uploaded anywhere?",
    answer: "No. The PDF generation happens entirely in your browser using local processing power."
  }, {
    question: "Can I upload multiple images?",
    answer: "Yes! You can select multiple images, and each image will become a new page in the final PDF."
  }];
  const jsonLd = generateToolJsonLd('image-to-pdf', 'Image to PDF', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Select or drag and drop your PDF file.", "Apply your desired PDF modifications.", "Click process.", "Download your new PDF document."]}
      supportedFormats="PDF"
      title="Image to PDF"
      description="Convert JPG, PNG, and WebP images to a single PDF document instantly."
      breadcrumbs={[{
  label: "Image Tools",
  href: "/image-tools"
}, {
  label: "Image to PDF",
  href: "/image-to-pdf"
}]}
      faq={[{
  question: "Are my images uploaded anywhere?",
  answer: "No. The PDF generation happens entirely in your browser using local processing power."
}, {
  question: "Can I upload multiple images?",
  answer: "Yes! You can select multiple images, and each image will become a new page in the final PDF."
}]}
      relatedTools={[{
  name: "Image Compressor",
  href: "/image-compressor",
  icon: <CheckCircle2 />
}]}>
      <ImageToPdfClient />
    </ToolLayout>
    </>;
}