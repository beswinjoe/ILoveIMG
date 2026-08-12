import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
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
  const faq = [
        { question: "Is this secure?", answer: "Yes. The passwords are generated locally on your device using your browser's crypto API. Nothing is sent over the internet." },
        { question: "What makes a strong password?", answer: "A strong password is long (16+ characters) and includes a mix of uppercase, lowercase, numbers, and symbols to maximize entropy." }
      ];
  const jsonLd = generateToolJsonLd('password-generator', 'Password Generator', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <PasswordGeneratorClient />
    </>
  );
}
