import { ArchiveRestore } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import RarExtractorClient from "./RarExtractorClient";
export const metadata: Metadata = {
  title: "RAR Extractor - Extract RAR Files Online | Filoza",
  description: "Extract files from RAR archives online. Browse and download contents without installing software. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/rar-extractor"
  },
  openGraph: {
    title: "RAR Extractor - Extract RAR Files Online | Filoza",
    description: "Extract files from RAR archives online. Browse and download contents without installing software. Processed locally in your browser.",
    url: "https://filoza.vercel.app/rar-extractor",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "RAR Extractor - Extract RAR Files Online | Filoza",
    description: "Extract files from RAR archives online. Browse and download contents without installing software. Processed locally in your browser."
  }
};
export default function RarExtractorPage() {
  const faq = [{
    question: "Is my file uploaded to a server?",
    answer: "No. The entire extraction process happens securely within your browser using WebAssembly."
  }, {
    question: "Can I extract password-protected RARs?",
    answer: "Currently, this browser-based extractor does not support encrypted archives."
  }];
  const jsonLd = generateToolJsonLd('rar-extractor', 'Extract RAR File', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout title="RAR & 7Z Extractor"
      description="Extract files from RAR, 7Z, and other archives directly in your browser. No uploads, 100% private."
      breadcrumbs={[{
  label: "Archive",
  href: "/#archive"
}, {
  label: "RAR Extractor",
  href: "/rar-extractor"
}]}
      howItWorks={["Drag and drop your .rar or .7z file into the box above.", "Wait a moment while we read the archive structure locally.", "Browse the contents of the archive.", "Click the download button next to any file you want to save."]}
      supportedFormats=".rar, .7z, .tar, .gz"
      faq={[{
  question: "Is my file uploaded to a server?",
  answer: "No. The entire extraction process happens securely within your browser using WebAssembly."
}, {
  question: "Can I extract password-protected RARs?",
  answer: "Currently, this browser-based extractor does not support encrypted archives."
}]}
      relatedTools={[{
  name: "ZIP Creator",
  href: "/zip-creator",
  icon: <ArchiveRestore />
}, {
  name: "ZIP Extractor",
  href: "/zip-extractor",
  icon: <ArchiveRestore />
}]}>
      <RarExtractorClient />
    </ToolLayout>
    </>;
}