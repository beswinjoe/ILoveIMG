import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
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
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "WAV to MP3 Converter - Convert WAV Audio to MP3 Online | Filoza",
    description: "Convert WAV audio files to MP3 format online. Reduce audio file size while maintaining quality. Processed locally in your browser using WebAssembly."
  }
};
export default function WavToMp3Page() {
  const faq = [{
    question: "Is my audio uploaded?",
    answer: "No. Filoza uses WebAssembly to run a real audio converter inside your browser. Your files never leave your device."
  }, {
    question: "What is the output quality?",
    answer: "We convert your WAV files to MP3 format using a high-quality 192kbps bitrate, perfect for general listening."
  }];
  const jsonLd = generateToolJsonLd('wav-to-mp3', 'WAV to MP3', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your audio file.", "Choose your conversion or edit settings.", "Process the audio.", "Download the resulting file."]}
      supportedFormats="MP3, WAV, OGG, M4A"
      title="WAV to MP3"
      description="Convert uncompressed WAV audio into high-quality MP3 format instantly."
      breadcrumbs={[{
  label: "Audio Tools",
  href: "/audio-tools"
}, {
  label: "WAV to MP3",
  href: "/wav-to-mp3"
}]}
      faq={[{
  question: "Is my audio uploaded?",
  answer: "No. Filoza uses WebAssembly to run a real audio converter inside your browser. Your files never leave your device."
}, {
  question: "What is the output quality?",
  answer: "We convert your WAV files to MP3 format using a high-quality 192kbps bitrate, perfect for general listening."
}]}
      relatedTools={[{
  name: "MP3 to WAV",
  href: "/mp3-to-wav",
  icon: <CheckCircle2 />
}, {
  name: "Audio Compressor",
  href: "/audio-compressor",
  icon: <CheckCircle2 />
}]}>
      <WavToMp3Client />
    </ToolLayout>
    </>;
}