import { Metadata } from "next";
import FileTransferClient from "./FileTransferClient";

export const metadata: Metadata = {
  title: "Large File Transfer – Send Large Files Securely | Filoza",
  description: "Send large files securely with password protection and self-destructing links.",
  alternates: {
    canonical: "https://filoza.vercel.app/file-transfer"
  },
  openGraph: {
    title: "Large File Transfer – Send Large Files Securely | Filoza",
    description: "Send large files securely with password protection and self-destructing links.",
    url: "https://filoza.vercel.app/file-transfer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Large File Transfer – Send Large Files Securely | Filoza",
    description: "Send large files securely with password protection and self-destructing links.",
  }
};

export default function FileTransferPage() {
  return <FileTransferClient />;
}
