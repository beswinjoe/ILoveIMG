import { Metadata } from "next";
import JpgToPngClient from "./JpgToPngClient";

export const metadata: Metadata = {
  title: "JPG to PNG Converter - Convert JPG to PNG Free | ImageTools",
  description: "Convert JPG and JPEG images to PNG format instantly inside your browser. Fast, free, and secure with no server uploads.",
};

export default function JpgToPngPage() {
  return <JpgToPngClient />;
}
