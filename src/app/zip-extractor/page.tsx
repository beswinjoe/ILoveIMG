import { ArchiveRestore } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import ZipExtractorClient from "./ZipExtractorClient";
export const metadata: Metadata = {
  title: "ZIP Extractor - Extract ZIP Files Online | Filoza",
  description: "Extract and browse the contents of ZIP archives online. View files and download individually or all at once. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/zip-extractor"
  },
  openGraph: {
    title: "ZIP Extractor - Extract ZIP Files Online | Filoza",
    description: "Extract and browse the contents of ZIP archives online. View files and download individually or all at once. Processed locally in your browser.",
    url: "https://filoza.vercel.app/zip-extractor",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ZIP Extractor - Extract ZIP Files Online | Filoza",
    description: "Extract and browse the contents of ZIP archives online. View files and download individually or all at once. Processed locally in your browser."
  }
};
export default function ZipExtractorPage() {
  const faq = [{
    question: "Is my ZIP file uploaded to a server?",
    answer: "No. The entire extraction process happens securely within your browser using JavaScript."
  }, {
    question: "Can I extract password-protected ZIPs?",
    answer: "Currently, this browser-based extractor does not support AES encrypted ZIP files."
  }];
  const jsonLd = generateToolJsonLd('zip-extractor', 'Extract ZIP File', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout title="ZIP Extractor"
      description="Extract files from a ZIP archive directly in your browser. No uploads, 100% private."
      breadcrumbs={[{
  label: "Archive",
  href: "/#archive"
}, {
  label: "ZIP Extractor",
  href: "/zip-extractor"
}]}
      howItWorks={["Drag and drop your .zip file into the box above.", "Wait a moment while we read the archive structure locally.", "Browse the contents of the ZIP file.", "Click the download button next to any file you want to save."]}
      supportedFormats=".zip files"
      faq={[{
  question: "Is my ZIP file uploaded to a server?",
  answer: "No. The entire extraction process happens securely within your browser using JavaScript."
}, {
  question: "Can I extract password-protected ZIPs?",
  answer: "Currently, this browser-based extractor does not support AES encrypted ZIP files."
}]}
      relatedTools={[{
  name: "ZIP Creator",
  href: "/zip-creator",
  icon: <ArchiveRestore />
}, {
  name: "RAR Extractor",
  href: "/rar-extractor",
  icon: <ArchiveRestore />
}]}>
      <ZipExtractorClient />
    </ToolLayout>
    </>;
}