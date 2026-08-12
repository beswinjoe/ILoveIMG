import { Metadata } from "next";
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
  return <FileTransferClient />;
}
