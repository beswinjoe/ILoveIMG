import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import FaviconGeneratorClient from './FaviconGeneratorClient';
export const metadata: Metadata = {
  title: "Favicon Generator - Create Favicons from Images | Filoza",
  description: "Generate 32×32 favicon.ico files from any image online. Upload a JPG, PNG, or WebP image and download a ready-to-use favicon.",
  alternates: {
    canonical: "https://filoza.vercel.app/favicon-generator"
  },
  openGraph: {
    title: "Favicon Generator - Create Favicons from Images | Filoza",
    description: "Generate 32×32 favicon.ico files from any image online. Upload a JPG, PNG, or WebP image and download a ready-to-use favicon.",
    url: "https://filoza.vercel.app/favicon-generator",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Favicon Generator - Create Favicons from Images | Filoza",
    description: "Generate 32×32 favicon.ico files from any image online. Upload a JPG, PNG, or WebP image and download a ready-to-use favicon."
  }
};
export default function FaviconGeneratorPage() {
  const faq = [{
    question: "Is my image uploaded?",
    answer: "No. Filoza processes your image entirely within your browser for 100% privacy."
  }, {
    question: "What size is the favicon?",
    answer: "We generate a standard 32x32 pixel PNG file that you can use on any website."
  }];
  const jsonLd = generateToolJsonLd('favicon-generator', 'Favicon Generator', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your image file.", "Select your preferred settings.", "Click the process button.", "Download your optimized image!"]}
      supportedFormats="JPG, JPEG, PNG, WebP, SVG"
      title="Favicon Generator"
      description="Generate 32x32 favicons from your images instantly."
      breadcrumbs={[{
  label: "Image Tools",
  href: "/image-tools"
}, {
  label: "Favicon Generator",
  href: "/favicon-generator"
}]}
      faq={[{
  question: "Is my image uploaded?",
  answer: "No. Filoza processes your image entirely within your browser for 100% privacy."
}, {
  question: "What size is the favicon?",
  answer: "We generate a standard 32x32 pixel PNG file that you can use on any website."
}]}>
      <FaviconGeneratorClient />
    </ToolLayout>
    </>;
}