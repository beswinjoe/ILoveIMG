import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import BackgroundRemoverClient from './BackgroundRemoverClient';

export const metadata: Metadata = {
  title: "Background Remover - Remove Image Backgrounds Online | Filoza",
  description: "Remove backgrounds from images automatically online. Get a transparent PNG result. Powered by AI and processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/background-remover"
  },
  openGraph: {
    title: "Background Remover - Remove Image Backgrounds Online | Filoza",
    description: "Remove backgrounds from images automatically online. Get a transparent PNG result. Powered by AI and processed locally in your browser.",
    url: "https://filoza.vercel.app/background-remover",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Background Remover - Remove Image Backgrounds Online | Filoza",
    description: "Remove backgrounds from images automatically online. Get a transparent PNG result. Powered by AI and processed locally in your browser.",
  }
};

export default function BackgroundRemoverPage() {
  const faq = [
        { question: "Is my image uploaded?", answer: "No! Filoza uses an advanced WebAssembly AI model that runs entirely inside your browser. Your images never leave your device." },
        { question: "Why does it take time to load initially?", answer: "The AI model (~40MB) needs to be downloaded to your browser the very first time you use the tool. Subsequent uses will be much faster!" }
      ];
  const jsonLd = generateToolJsonLd('background-remover', 'Background Remover', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <BackgroundRemoverClient />
    </>
  );
}
