import { Metadata } from "next";
import ResizerClient from "./ResizerClient";

export const metadata: Metadata = {
  title: "Image Resizer - Resize Images Online Free | ImageTools",
  description: "Resize images online for free. Change image dimensions, lock aspect ratio, and download instantly without uploading files.",
};

export default function ImageResizerPage() {
  return <ResizerClient />;
}
