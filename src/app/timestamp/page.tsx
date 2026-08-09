import { Metadata } from "next";
import TimestampClient from "./TimestampClient";

export const metadata: Metadata = {
  title: "Timestamp Converter Online – Free | Filoza",
  description: "Convert Unix timestamps to dates",
  alternates: {
    canonical: "https://filoza.vercel.app/timestamp"
  },
  openGraph: {
    title: "Timestamp Converter Online – Free | Filoza",
    description: "Convert Unix timestamps to dates",
    url: "https://filoza.vercel.app/timestamp",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timestamp Converter Online – Free | Filoza",
    description: "Convert Unix timestamps to dates",
  }
};

export default function TimestampPage() {
  return <TimestampClient />;
}
