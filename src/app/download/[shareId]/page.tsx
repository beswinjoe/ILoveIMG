import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import DownloadClient from "./DownloadClient";
export const metadata: Metadata = {
  title: "Download Transfer | Filoza",
  description: "Securely download your file transfer from Filoza. Encrypted end-to-end, your files are protected and automatically expire after the designated time.",
  robots: {
    index: false,
    follow: false
  }
};
export default function DownloadPage({
  params
}: {
  params: Promise<{
    shareId: string;
  }>;
}) {
  // Pass the promise to the client component or resolve it here? 
  // Client component can use React.use() if needed, but since we are server side, we can just resolve it.
  // Actually, Next.js 15 requires awaiting params, but we can just pass the promise.
  return <DownloadClient paramsPromise={params} />;
}