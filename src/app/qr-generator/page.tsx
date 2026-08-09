import { Metadata } from "next";
import QrGeneratorClient from "./QrGeneratorClient";

export const metadata: Metadata = {
  title: "QR Code Generator Online Free | Filoza",
  description: "Create custom QR codes for URLs, text, Wi-Fi passwords, emails, and phone numbers instantly in your browser.",
};

export default function QrGeneratorPage() {
  return <QrGeneratorClient />;
}
