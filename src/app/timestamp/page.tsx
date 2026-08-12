import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import TimestampClient from "./TimestampClient";

export const metadata: Metadata = {
  title: "Timestamp Converter - Convert Unix Timestamps to Dates | Filoza",
  description: "Convert Unix timestamps to human-readable dates and vice versa. Useful for developers working with epoch time.",
  alternates: {
    canonical: "https://filoza.vercel.app/timestamp"
  },
  openGraph: {
    title: "Timestamp Converter - Convert Unix Timestamps to Dates | Filoza",
    description: "Convert Unix timestamps to human-readable dates and vice versa. Useful for developers working with epoch time.",
    url: "https://filoza.vercel.app/timestamp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timestamp Converter - Convert Unix Timestamps to Dates | Filoza",
    description: "Convert Unix timestamps to human-readable dates and vice versa. Useful for developers working with epoch time.",
  }
};

export default function TimestampPage() {
  const faq = [
        { question: "What is a Unix timestamp?", answer: "A Unix timestamp is a way to track time as a running total of seconds. This count starts at the Unix Epoch on January 1st, 1970 at UTC." },
        { question: "Does it support milliseconds?", answer: "Yes. If you input a large timestamp, it is automatically detected as milliseconds and converted appropriately." }
      ];
  const jsonLd = generateToolJsonLd('timestamp', 'Timestamp Converter', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <TimestampClient />
    </>
  );
}
