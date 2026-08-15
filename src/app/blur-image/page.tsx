import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import BlurImageClient from './BlurImageClient';
export const metadata: Metadata = {
  title: "Blur Image Online - Apply Gaussian Blur Effect | Filoza",
  description: "Apply a gaussian blur effect to images online. Adjust blur intensity for JPG, PNG, and WebP images. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/blur-image"
  },
  openGraph: {
    title: "Blur Image Online - Apply Gaussian Blur Effect | Filoza",
    description: "Apply a gaussian blur effect to images online. Adjust blur intensity for JPG, PNG, and WebP images. Processed locally in your browser.",
    url: "https://filoza.vercel.app/blur-image",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Blur Image Online - Apply Gaussian Blur Effect | Filoza",
    description: "Apply a gaussian blur effect to images online. Adjust blur intensity for JPG, PNG, and WebP images. Processed locally in your browser."
  }
};
export default function BlurImagePage() {
  const faq = [{
    question: "Is my image uploaded?",
    answer: "No. Filoza processes your image entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('blur-image', 'Blur Image', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your image file.", "Select your preferred settings.", "Click the process button.", "Download your optimized image!"]}
      supportedFormats="JPG, JPEG, PNG, WebP, SVG"
      title="Blur Image"
      description="Apply a gaussian blur effect to your image."
      breadcrumbs={[{
  label: "Image Tools",
  href: "/image-tools"
}, {
  label: "Blur Image",
  href: "/blur-image"
}]}
      faq={[{
  question: "Is my image uploaded?",
  answer: "No. Filoza processes your image entirely within your browser for 100% privacy."
}]}>
      <BlurImageClient />
    </ToolLayout>
    </>;
}