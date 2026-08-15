import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import DocxToHtmlClient from './DocxToHtmlClient';
export const metadata: Metadata = {
  title: "DOCX to HTML Converter - Convert Word to HTML Online | Filoza",
  description: "Convert Word documents (DOCX) to clean HTML code online. Get web-ready HTML from your Word files. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/docx-to-html"
  },
  openGraph: {
    title: "DOCX to HTML Converter - Convert Word to HTML Online | Filoza",
    description: "Convert Word documents (DOCX) to clean HTML code online. Get web-ready HTML from your Word files. Processed in your browser.",
    url: "https://filoza.vercel.app/docx-to-html",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "DOCX to HTML Converter - Convert Word to HTML Online | Filoza",
    description: "Convert Word documents (DOCX) to clean HTML code online. Get web-ready HTML from your Word files. Processed in your browser."
  }
};
export default function DocxToHtmlPage() {
  const faq = [{
    question: "Is my file uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('docx-to-html', 'DOCX to HTML', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="DOCX to HTML"
      description="Convert Word documents to clean HTML code."
      breadcrumbs={[{
  label: "Documents",
  href: "/documents"
}, {
  label: "DOCX to HTML",
  href: "/docx-to-html"
}]}
      faq={[{
  question: "Is my file uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <DocxToHtmlClient />
    </ToolLayout>
    </>;
}