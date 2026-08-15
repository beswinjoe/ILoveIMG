import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import PdfWatermarkClient from "./PdfWatermarkClient";
export const metadata: Metadata = {
  title: "Watermark PDF - Add Watermarks to PDF Pages Online | Filoza",
  description: "Add text watermarks to PDF pages online. Customize font, size, color, opacity, and position. Free and processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-watermark"
  },
  openGraph: {
    title: "Watermark PDF - Add Watermarks to PDF Pages Online | Filoza",
    description: "Add text watermarks to PDF pages online. Customize font, size, color, opacity, and position. Free and processed in your browser.",
    url: "https://filoza.vercel.app/pdf-watermark",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Watermark PDF - Add Watermarks to PDF Pages Online | Filoza",
    description: "Add text watermarks to PDF pages online. Customize font, size, color, opacity, and position. Free and processed in your browser."
  }
};
export default function PdfWatermarkPage() {
  const faq = [{
    question: "Is my data secure?",
    answer: "Yes! All processing happens securely in your web browser. Your PDFs never leave your device."
  }, {
    question: "Can I adjust the opacity?",
    answer: "Yes, you can adjust the opacity slider to make the watermark more or less transparent."
  }];
  const jsonLd = generateToolJsonLd('pdf-watermark', 'Watermark PDF', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Select or drag and drop your PDF file.", "Apply your desired PDF modifications.", "Click process.", "Download your new PDF document."]}
      supportedFormats="PDF"
      title="Watermark PDF"
      description="Stamp text over your PDF in seconds to protect your documents."
      breadcrumbs={[{
  label: "PDF Tools",
  href: "/pdf-tools"
}, {
  label: "Watermark",
  href: "/pdf-watermark"
}]}
      faq={[{
  question: "Is my data secure?",
  answer: "Yes! All processing happens securely in your web browser. Your PDFs never leave your device."
}, {
  question: "Can I adjust the opacity?",
  answer: "Yes, you can adjust the opacity slider to make the watermark more or less transparent."
}]}
      relatedTools={[{
  name: "Merge PDF",
  href: "/pdf-merge",
  icon: <CheckCircle2 />
}, {
  name: "Compress PDF",
  href: "/pdf-compress",
  icon: <CheckCircle2 />
}]}>
      <PdfWatermarkClient />
    </ToolLayout>
    </>;
}