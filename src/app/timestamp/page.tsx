import { Metadata } from "next";
import TimestampClient from "./TimestampClient";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter Online Free | FileFlow",
  description: "Convert Unix timestamps to readable dates and vice versa. Secure, browser-based tool supporting seconds and milliseconds.",
};

export default function TimestampPage() {
  return <TimestampClient />;
}
