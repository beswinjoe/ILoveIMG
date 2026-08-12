import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import FileTransferClient from "./FileTransferClient";

export const metadata: Metadata = {
  title: "Large File Transfer - Send Files Securely Online | Filoza",
  description: "Send large files securely with encrypted, self-destructing download links. Set passwords and expiration dates. Files are encrypted before upload.",
  alternates: {
    canonical: "https://filoza.vercel.app/file-transfer"
  },
  openGraph: {
    title: "Large File Transfer - Send Files Securely Online | Filoza",
    description: "Send large files securely with encrypted, self-destructing download links. Set passwords and expiration dates. Files are encrypted before upload.",
    url: "https://filoza.vercel.app/file-transfer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Large File Transfer - Send Files Securely Online | Filoza",
    description: "Send large files securely with encrypted, self-destructing download links. Set passwords and expiration dates. Files are encrypted before upload.",
  }
};

export default function FileTransferPage() {
  const faq = [
        { question: "Are my files secure?", answer: "Yes. Files are encrypted in your browser before upload, stored in a private bucket, and automatically deleted after they expire." },
        { question: "What is the size limit?", answer: "Maximum transfer size is 300 MB total across all files." },
        { question: "Can I password-protect the transfer?", answer: "Yes. You can set an optional password that recipients must enter to download the files." }
      ];
  const jsonLd = generateToolJsonLd('file-transfer', 'File Transfer', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <FileTransferClient />
    </>
  );
}
