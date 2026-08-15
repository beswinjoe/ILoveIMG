import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import DownloadClient from "../download/[shareId]/DownloadClient";

export const metadata: Metadata = {
  title: "Download Transfer | Filoza",
  description: "Securely download your file transfer from Filoza. Encrypted end-to-end, your files are protected and automatically expire after the designated time.",
  robots: {
    index: false,
    follow: false
  }
};

export default function CustomSlugPage({
  params
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  // Map the slug param to shareId so DownloadClient can process it identically
  const mappedParams = params.then(p => ({ shareId: p.slug }));
  return <DownloadClient paramsPromise={mappedParams} />;
}
