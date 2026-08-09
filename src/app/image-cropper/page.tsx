import { Metadata } from "next";
import CropperClient from "./CropperClient";

export const metadata: Metadata = {
  title: "Image Cropper Online – Free | Filoza",
  description: "Crop images to any size. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-cropper"
  },
  openGraph: {
    title: "Image Cropper Online – Free | Filoza",
    description: "Crop images to any size. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/image-cropper",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Cropper Online – Free | Filoza",
    description: "Crop images to any size. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function ImageCropperPage() {
  return <CropperClient />;
}
