import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import Mp3ToWavClient from "./Mp3ToWavClient";
export const metadata: Metadata = {
  title: "MP3 to WAV Converter - Convert MP3 Audio to WAV Online | Filoza",
  description: "Convert MP3 audio files to uncompressed WAV format online. Get lossless audio output. Processed in your browser using WebAssembly.",
  alternates: {
    canonical: "https://filoza.vercel.app/mp3-to-wav"
  },
  openGraph: {
    title: "MP3 to WAV Converter - Convert MP3 Audio to WAV Online | Filoza",
    description: "Convert MP3 audio files to uncompressed WAV format online. Get lossless audio output. Processed in your browser using WebAssembly.",
    url: "https://filoza.vercel.app/mp3-to-wav",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "MP3 to WAV Converter - Convert MP3 Audio to WAV Online | Filoza",
    description: "Convert MP3 audio files to uncompressed WAV format online. Get lossless audio output. Processed in your browser using WebAssembly."
  }
};
export default function Mp3ToWavPage() {
  const faq = [{
    question: "Is my audio uploaded?",
    answer: "No. Filoza uses WebAssembly to run a real audio converter inside your browser. Your files never leave your device."
  }];
  const jsonLd = generateToolJsonLd('mp3-to-wav', 'MP3 to WAV', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your audio file.", "Choose your conversion or edit settings.", "Process the audio.", "Download the resulting file."]}
      supportedFormats="MP3, WAV, OGG, M4A"
      title="MP3 to WAV"
      description="Convert compressed MP3 audio into uncompressed high-quality WAV format."
      breadcrumbs={[{
  label: "Audio Tools",
  href: "/audio-tools"
}, {
  label: "MP3 to WAV",
  href: "/mp3-to-wav"
}]}
      faq={[{
  question: "Is my audio uploaded?",
  answer: "No. Filoza uses WebAssembly to run a real audio converter inside your browser. Your files never leave your device."
}]}
      relatedTools={[{
  name: "WAV to MP3",
  href: "/wav-to-mp3",
  icon: <CheckCircle2 />
}, {
  name: "Audio Compressor",
  href: "/audio-compressor",
  icon: <CheckCircle2 />
}]}>
      <Mp3ToWavClient />
    </ToolLayout>
    </>;
}