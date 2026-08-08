import { Metadata } from "next";
import PasswordGeneratorClient from "./PasswordGeneratorClient";

export const metadata: Metadata = {
  title: "Secure Password Generator Online Free | FileFlow",
  description: "Generate secure, random passwords directly in your browser. Strong passwords for better security. No data is ever sent to our servers.",
};

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />;
}
