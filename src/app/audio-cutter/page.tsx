import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import AudioCutterClient from "./AudioCutterClient";
export const metadata: Metadata = {
  title: "Audio Cutter - Trim & Cut Audio Files Online | Filoza",
  description: "Trim and cut audio files online. Set start and end points to extract the section you need. Supports MP3, WAV, and OGG formats with no uploads required.",
  alternates: {
    canonical: "https://filoza.vercel.app/audio-cutter"
  },
  openGraph: {
    title: "Audio Cutter - Trim & Cut Audio Files Online | Filoza",
    description: "Trim and cut audio files online. Set start and end points to extract the section you need. Supports MP3, WAV, and OGG formats with no uploads required.",
    url: "https://filoza.vercel.app/audio-cutter",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Cutter - Trim & Cut Audio Files Online | Filoza",
    description: "Trim and cut audio files online. Set start and end points to extract the section you need. Supports MP3, WAV, and OGG formats with no uploads required."
  }
};
export default function AudioCutterPage() {
  const faq = [{
    question: "How do I format the time?",
    answer: "Use the HH:MM:SS format. For example, to start at 1 minute and 30 seconds, enter 00:01:30."
  }, {
    question: "Is my audio uploaded?",
    answer: "No. Filoza uses WebAssembly to run a real audio editor inside your browser. Your files never leave your device."
  }];
  const jsonLd = generateToolJsonLd('audio-cutter', 'Trim Audio', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your audio file.", "Choose your conversion or edit settings.", "Process the audio.", "Download the resulting file."]}
      supportedFormats="MP3, WAV, OGG, M4A"
      title="Audio Cutter"
      description="Trim and cut audio files. Perfect for creating ringtones or removing silence."
      breadcrumbs={[{
  label: "Audio Tools",
  href: "/audio-tools"
}, {
  label: "Audio Cutter",
  href: "/audio-cutter"
}]}
      faq={[{
  question: "How do I format the time?",
  answer: "Use the HH:MM:SS format. For example, to start at 1 minute and 30 seconds, enter 00:01:30."
}, {
  question: "Is my audio uploaded?",
  answer: "No. Filoza uses WebAssembly to run a real audio editor inside your browser. Your files never leave your device."
}]}
      relatedTools={[{
  name: "Audio Volume",
  href: "/audio-volume",
  icon: <CheckCircle2 />
}, {
  name: "Audio Converter",
  href: "/audio-converter",
  icon: <CheckCircle2 />
}]}>
      <AudioCutterClient />
    </ToolLayout>
    </>;
}