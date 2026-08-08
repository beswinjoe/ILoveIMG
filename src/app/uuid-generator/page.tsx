import { Metadata } from "next";
import UuidGeneratorClient from "./UuidGeneratorClient";

export const metadata: Metadata = {
  title: "UUID Generator Online Free | FileFlow",
  description: "Generate random, secure Universally Unique Identifiers (UUID v4) instantly and securely in your browser.",
};

export default function UuidGeneratorPage() {
  return <UuidGeneratorClient />;
}
