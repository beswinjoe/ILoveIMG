import { Metadata } from "next";
import CropperClient from "./CropperClient";

export const metadata: Metadata = {
  title: "Image Cropper - Crop Images to Any Size Online | Filoza",
  description: "Crop images to custom dimensions or aspect ratios online. Supports JPG, PNG, and WebP. Free, fast, and processed entirely in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-cropper"
  },
  openGraph: {
    title: "Image Cropper - Crop Images to Any Size Online | Filoza",
    description: "Crop images to custom dimensions or aspect ratios online. Supports JPG, PNG, and WebP. Free, fast, and processed entirely in your browser.",
    url: "https://filoza.vercel.app/image-cropper",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Cropper - Crop Images to Any Size Online | Filoza",
    description: "Crop images to custom dimensions or aspect ratios online. Supports JPG, PNG, and WebP. Free, fast, and processed entirely in your browser.",
  }
};

export default function ImageCropperPage() {
  return <CropperClient />;
}
