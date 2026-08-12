import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import WavToMp3Client from "./WavToMp3Client";

export const metadata: Metadata = {
  title: "WAV to MP3 Converter - Convert WAV Audio to MP3 Online | Filoza",
  description: "Convert WAV audio files to MP3 format online. Reduce audio file size while maintaining quality. Processed locally in your browser using WebAssembly.",
  alternates: {
    canonical: "https://filoza.vercel.app/wav-to-mp3"
  },
  openGraph: {
    title: "WAV to MP3 Converter - Convert WAV Audio to MP3 Online | Filoza",
    description: "Convert WAV audio files to MP3 format online. Reduce audio file size while maintaining quality. Processed locally in your browser using WebAssembly.",
    url: "https://filoza.vercel.app/wav-to-mp3",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WAV to MP3 Converter - Convert WAV Audio to MP3 Online | Filoza",
    description: "Convert WAV audio files to MP3 format online. Reduce audio file size while maintaining quality. Processed locally in your browser using WebAssembly.",
  }
};

export default function WavToMp3Page() {
  const faq = [
        { question: "Is my audio uploaded?", answer: "No. Filoza uses WebAssembly to run a real audio converter inside your browser. Your files never leave your device." },
        { question: "What is the output quality?", answer: "We convert your WAV files to MP3 format using a high-quality 192kbps bitrate, perfect for general listening." }
      ];
  const jsonLd = generateToolJsonLd('wav-to-mp3', 'WAV to MP3', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <WavToMp3Client />
    </>
  );
}
