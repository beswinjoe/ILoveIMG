import { Metadata } from "next";
import UnitConverterClient from "./UnitConverterClient";

export const metadata: Metadata = {
  title: "Unit Converter Online Free | FileFlow",
  description: "Quickly and securely convert between units of length, weight, temperature, and digital data in your browser.",
};

export default function UnitConverterPage() {
  return <UnitConverterClient />;
}
