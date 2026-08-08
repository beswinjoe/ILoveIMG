import { Metadata } from "next";
import BulkCompressorClient from "./BulkCompressorClient";

export const metadata: Metadata = {
  title: "Bulk Image Compressor - Compress Multiple Images Online Free | ImageTools",
  description: "Compress multiple JPG, PNG, and WebP images at once online for free. Download individual files or as a ZIP archive.",
};

export default function BulkImageCompressorPage() {
  return <BulkCompressorClient />;
}
