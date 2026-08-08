import { Metadata } from "next";
import PercentageCalculatorClient from "./PercentageCalculatorClient";

export const metadata: Metadata = {
  title: "Percentage Calculator Online Free | FileFlow",
  description: "Calculate percentages, percentage changes, and differences instantly in your browser. Secure and easy to use.",
};

export default function PercentageCalculatorPage() {
  return <PercentageCalculatorClient />;
}
