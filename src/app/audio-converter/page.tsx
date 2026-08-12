import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import AudioConverterClient from "./AudioConverterClient";

export const metadata: Metadata = {
  title: "Audio Converter - Convert Between Audio Formats Online | Filoza",
  description: "Convert audio files between MP3, WAV, OGG, and other formats online. Free tool powered by WebAssembly, processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/audio-converter"
  },
  openGraph: {
    title: "Audio Converter - Convert Between Audio Formats Online | Filoza",
    description: "Convert audio files between MP3, WAV, OGG, and other formats online. Free tool powered by WebAssembly, processed in your browser.",
    url: "https://filoza.vercel.app/audio-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Converter - Convert Between Audio Formats Online | Filoza",
    description: "Convert audio files between MP3, WAV, OGG, and other formats online. Free tool powered by WebAssembly, processed in your browser.",
  }
};

export default function AudioConverterPage() {
  const faq = [
        { question: "What formats are supported?", answer: "You can upload almost any audio file format and convert it into MP3, WAV, AAC, or OGG." },
        { question: "Is my audio uploaded?", answer: "No. Filoza uses WebAssembly to run a real audio converter inside your browser. Your files never leave your device." }
      ];
  const jsonLd = generateToolJsonLd('audio-converter', 'Audio Converter', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <AudioConverterClient />
    </>
  );
}
