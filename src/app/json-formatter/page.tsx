import { Metadata } from "next";
import JsonFormatterClient from "./JsonFormatterClient";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator Online Free | FileFlow",
  description: "Format, validate, and minify your JSON data instantly and securely in your browser. No data is sent to our servers.",
};

export default function JsonFormatterPage() {
  return <JsonFormatterClient />;
}
