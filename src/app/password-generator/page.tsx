import { Metadata } from "next";
import PasswordGeneratorClient from "./PasswordGeneratorClient";

export const metadata: Metadata = {
  title: "Password Generator Online – Free | Filoza",
  description: "Create secure, randomized passwords",
  alternates: {
    canonical: "https://filoza.vercel.app/password-generator"
  },
  openGraph: {
    title: "Password Generator Online – Free | Filoza",
    description: "Create secure, randomized passwords",
    url: "https://filoza.vercel.app/password-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator Online – Free | Filoza",
    description: "Create secure, randomized passwords",
  }
};

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />;
}
