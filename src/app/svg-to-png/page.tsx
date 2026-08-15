import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import SvgToPngClient from './SvgToPngClient';
export const metadata: Metadata = {
  title: "SVG to PNG Converter - Convert SVG Files to PNG Online | Filoza",
  description: "Convert SVG vector graphics to PNG raster images online. Set custom dimensions and download high-quality PNG files. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/svg-to-png"
  },
  openGraph: {
    title: "SVG to PNG Converter - Convert SVG Files to PNG Online | Filoza",
    description: "Convert SVG vector graphics to PNG raster images online. Set custom dimensions and download high-quality PNG files. Processed in your browser.",
    url: "https://filoza.vercel.app/svg-to-png",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "SVG to PNG Converter - Convert SVG Files to PNG Online | Filoza",
    description: "Convert SVG vector graphics to PNG raster images online. Set custom dimensions and download high-quality PNG files. Processed in your browser."
  }
};
export default function SvgToPngPage() {
  const faq = [{
    question: "Is my file uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('svg-to-png', 'SVG to PNG', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your image file.", "Select your preferred settings.", "Click the process button.", "Download your optimized image!"]}
      supportedFormats="JPG, JPEG, PNG, WebP, SVG"
      title="SVG to PNG"
      description="Convert scalable vector graphics (SVG) into standard PNG images."
      breadcrumbs={[{
  label: "Image Tools",
  href: "/image-tools"
}, {
  label: "SVG to PNG",
  href: "/svg-to-png"
}]}
      faq={[{
  question: "Is my file uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <SvgToPngClient />
    </ToolLayout>
    </>;
}