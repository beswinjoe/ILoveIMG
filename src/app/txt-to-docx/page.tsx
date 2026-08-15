import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import TxtToDocxClient from './TxtToDocxClient';
export const metadata: Metadata = {
  title: "TXT to DOCX Converter - Convert Text to Word Online | Filoza",
  description: "Convert plain text (.txt) files to editable Word (DOCX) documents online. Processed in your browser with no file uploads.",
  alternates: {
    canonical: "https://filoza.vercel.app/txt-to-docx"
  },
  openGraph: {
    title: "TXT to DOCX Converter - Convert Text to Word Online | Filoza",
    description: "Convert plain text (.txt) files to editable Word (DOCX) documents online. Processed in your browser with no file uploads.",
    url: "https://filoza.vercel.app/txt-to-docx",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "TXT to DOCX Converter - Convert Text to Word Online | Filoza",
    description: "Convert plain text (.txt) files to editable Word (DOCX) documents online. Processed in your browser with no file uploads."
  }
};
export default function TxtToDocxPage() {
  const faq = [{
    question: "Is my file uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('txt-to-docx', 'TXT to DOCX', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="TXT to DOCX"
      description="Convert plain text files into editable Word documents."
      breadcrumbs={[{
  label: "Documents",
  href: "/documents"
}, {
  label: "TXT to DOCX",
  href: "/txt-to-docx"
}]}
      faq={[{
  question: "Is my file uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <TxtToDocxClient />
    </ToolLayout>
    </>;
}