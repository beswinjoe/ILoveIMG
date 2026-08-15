import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import FlipImageClient from './FlipImageClient';
export const metadata: Metadata = {
  title: "Flip Image - Mirror Horizontally or Vertically | Filoza",
  description: "Flip images horizontally or vertically online. Supports JPG, PNG, and WebP formats. Free and processed entirely in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/flip-image"
  },
  openGraph: {
    title: "Flip Image - Mirror Horizontally or Vertically | Filoza",
    description: "Flip images horizontally or vertically online. Supports JPG, PNG, and WebP formats. Free and processed entirely in your browser.",
    url: "https://filoza.vercel.app/flip-image",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Flip Image - Mirror Horizontally or Vertically | Filoza",
    description: "Flip images horizontally or vertically online. Supports JPG, PNG, and WebP formats. Free and processed entirely in your browser."
  }
};
export default function FlipImagePage() {
  const faq = [{
    question: "Is my image uploaded?",
    answer: "No. Filoza processes your image entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('flip-image', 'Flip Image', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your image file.", "Select your preferred settings.", "Click the process button.", "Download your optimized image!"]}
      supportedFormats="JPG, JPEG, PNG, WebP, SVG"
      title="Flip Image"
      description="Flip your images horizontally or vertically."
      breadcrumbs={[{
  label: "Image Tools",
  href: "/image-tools"
}, {
  label: "Flip Image",
  href: "/flip-image"
}]}
      faq={[{
  question: "Is my image uploaded?",
  answer: "No. Filoza processes your image entirely within your browser for 100% privacy."
}]}>
      <FlipImageClient />
    </ToolLayout>
    </>;
}