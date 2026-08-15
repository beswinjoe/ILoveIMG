import { FileArchive, UploadCloud } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import ZipCreatorClient from "./ZipCreatorClient";
export const metadata: Metadata = {
  title: "ZIP Creator - Create ZIP Archives Online | Filoza",
  description: "Create ZIP archives from multiple files online. Combine files into a single .zip download. All processing happens locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/zip-creator"
  },
  openGraph: {
    title: "ZIP Creator - Create ZIP Archives Online | Filoza",
    description: "Create ZIP archives from multiple files online. Combine files into a single .zip download. All processing happens locally in your browser.",
    url: "https://filoza.vercel.app/zip-creator",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ZIP Creator - Create ZIP Archives Online | Filoza",
    description: "Create ZIP archives from multiple files online. Combine files into a single .zip download. All processing happens locally in your browser."
  }
};
export default function ZipCreatorPage() {
  const faq = [{
    question: "Is it safe to zip my files here?",
    answer: "Yes! All zipping is done completely in your web browser. Your files never leave your device."
  }, {
    question: "Is there a file size limit?",
    answer: "The only limit is your device's memory. Extremely large files might cause your browser to crash, but typical usage is perfectly fine."
  }];
  const jsonLd = generateToolJsonLd('zip-creator', 'Create ZIP File', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout title="ZIP Creator"
      description="Combine multiple files into a single ZIP archive locally. Secure, private, and fast."
      breadcrumbs={[{
  label: "Archive",
  href: "/#archive"
}, {
  label: "ZIP Creator",
  href: "/zip-creator"
}]}
      howItWorks={["Drag and drop any files into the upload box.", "Add or remove files from the list as needed.", "Click 'Create ZIP Archive'.", "Wait for the compression to finish and download your ZIP file."]}
      supportedFormats="Any file format"
      faq={[{
  question: "Is it safe to zip my files here?",
  answer: "Yes! All zipping is done completely in your web browser. Your files never leave your device."
}, {
  question: "Is there a file size limit?",
  answer: "The only limit is your device's memory. Extremely large files might cause your browser to crash, but typical usage is perfectly fine."
}]}
      relatedTools={[{
  name: "ZIP Extractor",
  href: "/zip-extractor",
  icon: <FileArchive />
}, {
  name: "Large File Transfer",
  href: "/file-transfer",
  icon: <UploadCloud />
}]}>
      <ZipCreatorClient />
    </ToolLayout>
    </>;
}