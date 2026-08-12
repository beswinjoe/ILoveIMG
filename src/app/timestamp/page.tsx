import { Metadata } from "next";
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
  return <TimestampClient />;
}
