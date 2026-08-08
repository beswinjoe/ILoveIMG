import { Metadata } from "next";
import Base64Client from "./Base64Client";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder Online Free | FileFlow",
  description: "Easily encode text to Base64 or decode Base64 back to text instantly. Secure, browser-based tool with full UTF-8 support.",
};

export default function Base64Page() {
  return <Base64Client />;
}
