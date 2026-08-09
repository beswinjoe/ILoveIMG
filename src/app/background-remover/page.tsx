import { Metadata } from 'next';
import BackgroundRemoverClient from './BackgroundRemoverClient';

export const metadata: Metadata = {
  title: "Remove Background from Image Online – Free | Filoza",
  description: "Automatically remove the background from any image.. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/background-remover"
  },
  openGraph: {
    title: "Remove Background from Image Online – Free | Filoza",
    description: "Automatically remove the background from any image.. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/background-remover",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Background from Image Online – Free | Filoza",
    description: "Automatically remove the background from any image.. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function Page() {
  return <BackgroundRemoverClient />;
}
