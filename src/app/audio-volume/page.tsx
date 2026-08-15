import { CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import AudioVolumeClient from "./AudioVolumeClient";
export const metadata: Metadata = {
  title: "Audio Volume Changer - Adjust Audio Volume Online | Filoza",
  description: "Increase or decrease audio volume online. Adjust the loudness of MP3, WAV, and OGG files securely and privately, processed directly in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/audio-volume"
  },
  openGraph: {
    title: "Audio Volume Changer - Adjust Audio Volume Online | Filoza",
    description: "Increase or decrease audio volume online. Adjust the loudness of MP3, WAV, and OGG files securely and privately, processed directly in your browser.",
    url: "https://filoza.vercel.app/audio-volume",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Audio Volume Changer - Adjust Audio Volume Online | Filoza",
    description: "Increase or decrease audio volume online. Adjust the loudness of MP3, WAV, and OGG files securely and privately, processed directly in your browser."
  }
};
export default function AudioVolumePage() {
  const faq = [{
    question: "Will it distort my audio?",
    answer: "Increasing the volume significantly (e.g. above 200%) can cause clipping and distortion if the original audio was already loud. We recommend moderate adjustments."
  }, {
    question: "Is my audio uploaded?",
    answer: "No. Filoza uses WebAssembly to run a real audio editor inside your browser. Your files never leave your device."
  }];
  const jsonLd = generateToolJsonLd('audio-volume', 'Change Audio Volume', faq);
  return <>
      {jsonLd.map((schema, idx) => <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(schema)
    }} />)}
      <ToolLayout howItWorks={["Upload your audio file.", "Choose your conversion or edit settings.", "Process the audio.", "Download the resulting file."]}
      supportedFormats="MP3, WAV, OGG, M4A"
      title="Audio Volume Adjuster"
      description="Increase or decrease the volume of your audio files without losing quality."
      breadcrumbs={[{
  label: "Audio Tools",
  href: "/audio-tools"
}, {
  label: "Audio Volume",
  href: "/audio-volume"
}]}
      faq={[{
  question: "Will it distort my audio?",
  answer: "Increasing the volume significantly (e.g. above 200%) can cause clipping and distortion if the original audio was already loud. We recommend moderate adjustments."
}, {
  question: "Is my audio uploaded?",
  answer: "No. Filoza uses WebAssembly to run a real audio editor inside your browser. Your files never leave your device."
}]}
      relatedTools={[{
  name: "Audio Compressor",
  href: "/audio-compressor",
  icon: <CheckCircle2 />
}, {
  name: "Audio Converter",
  href: "/audio-converter",
  icon: <CheckCircle2 />
}]}>
      <AudioVolumeClient />
    </ToolLayout>
    </>;
}