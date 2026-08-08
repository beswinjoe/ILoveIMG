import { Metadata } from "next";
import CropperClient from "./CropperClient";

export const metadata: Metadata = {
  title: "Image Cropper - Crop Images Online Free | ImageTools",
  description: "Crop pictures online for free. Adjust aspect ratios easily in your browser without uploading your photos.",
};

export default function ImageCropperPage() {
  return <CropperClient />;
}
