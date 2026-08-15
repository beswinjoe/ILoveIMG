import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import ImageWatermarkClient from './ImageWatermarkClient';
export const metadata: Metadata = {
  title: "Image Watermark - Add Text Watermarks Online | Filoza",
  description: "Add custom text watermarks to images online to protect your copyright. Adjust position, size, opacity, and color. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-watermark"
  },
  openGraph: {
    title: "Image Watermark - Add Text Watermarks Online | Filoza",
    description: "Add custom text watermarks to images online to protect your copyright. Adjust position, size, opacity, and color. Processed in your browser.",
    url: "https://filoza.vercel.app/image-watermark",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Watermark - Add Text Watermarks Online | Filoza",
    description: "Add custom text watermarks to images online to protect your copyright. Adjust position, size, opacity, and color. Processed in your browser."
  }
};
export default function ImageWatermarkPage() {
  const faq = [{
    question: "Is my file uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('image-watermark', 'Watermark Image', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your image file.", "Select your preferred settings.", "Click the process button.", "Download your optimized image!"]}
      supportedFormats="JPG, JPEG, PNG, WebP, SVG"
      title="Image Watermark"
      description="Add a text watermark to your images to protect your copyright."
      breadcrumbs={[{
  label: "Image Tools",
  href: "/image-tools"
}, {
  label: "Image Watermark",
  href: "/image-watermark"
}]}
      faq={[{
  question: "Is my file uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <ImageWatermarkClient />
    </ToolLayout>
    </>;
}