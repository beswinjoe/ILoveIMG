import { Metadata } from 'next';
import BackgroundRemoverClient from './BackgroundRemoverClient';

export const metadata: Metadata = {
  title: 'Background Remover - Remove Image Background Online | Filoza',
  description: 'Automatically detect and remove the background from any image. Free, fast, and secure client-side processing.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/background-remover'
  }
};

export default function Page() {
  return <BackgroundRemoverClient />;
}
