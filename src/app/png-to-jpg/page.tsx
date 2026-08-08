import { Metadata } from "next";
import PngToJpgClient from "./PngToJpgClient";

export const metadata: Metadata = {
  title: "PNG to JPG Converter - Convert PNG to JPG Free | ImageTools",
  description: "Convert PNG images to JPG/JPEG online. Add custom background colors for transparent PNGs before downloading.",
};

export default function PngToJpgPage() {
  return <PngToJpgClient />;
}
