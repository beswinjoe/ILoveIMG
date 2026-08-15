import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import GrayscaleImageClient from './GrayscaleImageClient';
export const metadata: Metadata = {
  title: "Grayscale Image Converter - Black & White Online | Filoza",
  description: "Convert color images to grayscale (black and white) online. Supports JPG, PNG, and WebP. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/grayscale-image"
  },
  openGraph: {
    title: "Grayscale Image Converter - Black & White Online | Filoza",
    description: "Convert color images to grayscale (black and white) online. Supports JPG, PNG, and WebP. Processed locally in your browser.",
    url: "https://filoza.vercel.app/grayscale-image",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Grayscale Image Converter - Black & White Online | Filoza",
    description: "Convert color images to grayscale (black and white) online. Supports JPG, PNG, and WebP. Processed locally in your browser."
  }
};
export default function GrayscaleImagePage() {
  const faq = [{
    question: "Is my image uploaded?",
    answer: "No. Filoza processes your image entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('grayscale-image', 'Grayscale Image', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your image file.", "Select your preferred settings.", "Click the process button.", "Download your optimized image!"]}
      supportedFormats="JPG, JPEG, PNG, WebP, SVG"
      title="Grayscale Image"
      description="Convert your images to black and white instantly."
      breadcrumbs={[{
  label: "Image Tools",
  href: "/image-tools"
}, {
  label: "Grayscale Image",
  href: "/grayscale-image"
}]}
      faq={[{
  question: "Is my image uploaded?",
  answer: "No. Filoza processes your image entirely within your browser for 100% privacy."
}]}>
      <GrayscaleImageClient />
    </ToolLayout>
    </>;
}