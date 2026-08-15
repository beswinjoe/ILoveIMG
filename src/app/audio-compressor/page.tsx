import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import AudioCompressorClient from "./AudioCompressorClient";
export const metadata: Metadata = {
  title: "Audio Compressor - Reduce Audio File Size Online | Filoza",
  description: "Compress audio files to reduce their size online. Supports MP3, WAV, OGG, and M4A formats. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/audio-compressor"
  },
  openGraph: {
    title: "Audio Compressor - Reduce Audio File Size Online | Filoza",
    description: "Compress audio files to reduce their size online. Supports MP3, WAV, OGG, and M4A formats. Processed locally in your browser.",
    url: "https://filoza.vercel.app/audio-compressor",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Compressor - Reduce Audio File Size Online | Filoza",
    description: "Compress audio files to reduce their size online. Supports MP3, WAV, OGG, and M4A formats. Processed locally in your browser."
  }
};
export default function AudioCompressorPage() {
  const faq = [{
    question: "Is my audio uploaded?",
    answer: "No. Filoza uses WebAssembly to run a real audio compressor inside your browser. Your files never leave your device."
  }, {
    question: "Will I lose quality?",
    answer: "Compression always involves some loss of data, but we allow you to choose the bitrate. 128kbps is near-CD quality, while 64kbps is great for spoken word (like podcasts) and yields much smaller files."
  }];
  const jsonLd = generateToolJsonLd('audio-compressor', 'Compress Audio', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your audio file.", "Choose your conversion or edit settings.", "Process the audio.", "Download the resulting file."]}
      supportedFormats="MP3, WAV, OGG, M4A"
      title="Audio Compressor"
      description="Compress audio files to reduce file size while maintaining listening quality."
      breadcrumbs={[{
  label: "Audio Tools",
  href: "/audio-tools"
}, {
  label: "Compress Audio",
  href: "/audio-compressor"
}]}
      faq={[{
  question: "Is my audio uploaded?",
  answer: "No. Filoza uses WebAssembly to run a real audio compressor inside your browser. Your files never leave your device."
}, {
  question: "Will I lose quality?",
  answer: "Compression always involves some loss of data, but we allow you to choose the bitrate. 128kbps is near-CD quality, while 64kbps is great for spoken word (like podcasts) and yields much smaller files."
}]}
      relatedTools={[{
  name: "Audio Converter",
  href: "/audio-converter",
  icon: <CheckCircle2 />
}, {
  name: "Audio Volume",
  href: "/audio-volume",
  icon: <CheckCircle2 />
}]}>
      <AudioCompressorClient />
    </ToolLayout>
    </>;
}