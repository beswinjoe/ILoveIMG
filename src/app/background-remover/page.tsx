import { Metadata } from 'next';
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

export default function Page() {
  return <BackgroundRemoverClient />;
}
