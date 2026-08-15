import ToolLayout from "@/components/ToolLayout";
import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import PdfToWordClient from './PdfToWordClient';
export const metadata: Metadata = {
  title: "PDF to Word Converter - Convert PDF to DOCX Online | Filoza",
  description: "Convert PDF documents to editable Word (DOCX) files online. Extract text and structure from PDFs. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-to-word"
  },
  openGraph: {
    title: "PDF to Word Converter - Convert PDF to DOCX Online | Filoza",
    description: "Convert PDF documents to editable Word (DOCX) files online. Extract text and structure from PDFs. Processed in your browser.",
    url: "https://filoza.vercel.app/pdf-to-word",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Word Converter - Convert PDF to DOCX Online | Filoza",
    description: "Convert PDF documents to editable Word (DOCX) files online. Extract text and structure from PDFs. Processed in your browser."
  }
};
export default function PdfToWordPage() {
  const faq = [{
    question: "Is my file uploaded anywhere?",
    answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
  }];
  const jsonLd = generateToolJsonLd('pdf-to-word', 'PDF to Word', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your file or paste your data.", "Adjust the tool settings.", "Run the tool.", "Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="PDF to Word"
      description="Convert PDF documents into editable Word (DOCX) files."
      breadcrumbs={[{
  label: "Documents",
  href: "/documents"
}, {
  label: "PDF to Word",
  href: "/pdf-to-word"
}]}
      faq={[{
  question: "Is my file uploaded anywhere?",
  answer: "No. Filoza processes your files entirely within your browser for 100% privacy."
}]}>
      <PdfToWordClient />
    </ToolLayout>
    </>;
}