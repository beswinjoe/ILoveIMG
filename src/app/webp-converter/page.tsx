import { Metadata } from "next";
import WebpClient from "./WebpClient";

export const metadata: Metadata = {
  title: "WebP Converter - Convert to and from WebP Free | ImageTools",
  description: "Convert JPG and PNG images to WebP format, or convert WebP back to JPG/PNG online for free.",
};

export default function WebpConverterPage() {
  return <WebpClient />;
}
