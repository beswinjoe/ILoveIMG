import { Metadata } from "next";
import PasswordGeneratorClient from "./PasswordGeneratorClient";

export const metadata: Metadata = {
  title: "Password Generator - Create Secure Random Passwords | Filoza",
  description: "Generate strong, randomized passwords online. Customize length, and include letters, numbers, and symbols. Generated entirely in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/password-generator"
  },
  openGraph: {
    title: "Password Generator - Create Secure Random Passwords | Filoza",
    description: "Generate strong, randomized passwords online. Customize length, and include letters, numbers, and symbols. Generated entirely in your browser.",
    url: "https://filoza.vercel.app/password-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator - Create Secure Random Passwords | Filoza",
    description: "Generate strong, randomized passwords online. Customize length, and include letters, numbers, and symbols. Generated entirely in your browser.",
  }
};

export default function PasswordGeneratorPage() {
  return <PasswordGeneratorClient />;
}
