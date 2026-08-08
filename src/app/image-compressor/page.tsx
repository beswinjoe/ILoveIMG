import { Metadata } from "next";
import CompressorClient from "./CompressorClient";

export const metadata: Metadata = {
  title: "Image Compressor - Compress Images Online Free | ImageTools",
  description: "Compress JPG, PNG and WebP images online for free. Reduce image file size directly in your browser without uploading your files.",
};

export default function ImageCompressorPage() {
  return <CompressorClient />;
}
