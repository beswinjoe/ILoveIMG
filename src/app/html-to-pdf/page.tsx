import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import HtmlToPdfClient from './HtmlToPdfClient';
export const metadata: Metadata = {
  title: "HTML to PDF Converter - Convert HTML to PDF Online | Filoza",
  description: "Convert HTML files or code to PDF format online. Render web content as a downloadable PDF document. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/html-to-pdf"
  },
  openGraph: {
    title: "HTML to PDF Converter - Convert HTML to PDF Online | Filoza",
    description: "Convert HTML files or code to PDF format online. Render web content as a downloadable PDF document. Processed in your browser.",
    url: "https://filoza.vercel.app/html-to-pdf",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML to PDF Converter - Convert HTML to PDF Online | Filoza",
    description: "Convert HTML files or code to PDF format online. Render web content as a downloadable PDF document. Processed in your browser."
  }
};
export default function HtmlToPdfPage() {
  const faq = [{
    question: "Is my file uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('html-to-pdf', 'HTML to PDF', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="HTML to PDF"
      description="Convert HTML files to PDF format."
      breadcrumbs={[{
  label: "Documents",
  href: "/documents"
}, {
  label: "HTML to PDF",
  href: "/html-to-pdf"
}]}
      faq={[{
  question: "Is my file uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <HtmlToPdfClient />
    </ToolLayout>
    </>;
}