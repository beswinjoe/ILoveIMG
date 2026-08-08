import { Metadata } from "next";
import TextCaseClient from "./TextCaseClient";

export const metadata: Metadata = {
  title: "Text Case Converter Online Free | FileFlow",
  description: "Convert text between uppercase, lowercase, title case, camelCase, and more instantly. Secure, browser-based tool.",
};

export default function TextCasePage() {
  return <TextCaseClient />;
}
