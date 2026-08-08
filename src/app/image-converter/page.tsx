import { Metadata } from "next";
import ConverterClient from "./ConverterClient";

export const metadata: Metadata = {
  title: "Image Converter - Convert Images Online Free | ImageTools",
  description: "Convert images between JPG, PNG, and WebP instantly in your browser. Universal image converter completely free and secure.",
};

export default function ImageConverterPage() {
  return <ConverterClient />;
}
