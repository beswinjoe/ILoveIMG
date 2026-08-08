import React from 'react';
import { 
  ImageDown, Maximize, Crop, ArrowRightLeft, FileImage, Images, 
  Files, Scissors, FileDown, RotateCw, FileX, FileOutput, Stamp,
  AudioLines, AudioWaveform, Volume2,
  QrCode, KeyRound, FileText, Braces, Pipette, Binary, Fingerprint, CaseUpper, Clock, Ruler, Percent,
  Wrench
} from 'lucide-react';

export type ToolCategory = 'Image Tools' | 'PDF Tools' | 'Audio Tools' | 'Other Utilities';

export interface ToolItem {
  name: string;
  href: string;
  category: ToolCategory;
  description: string;
  keywords: string[];
  icon: React.ReactNode;
}

export const toolsData: ToolItem[] = [
  // IMAGE TOOLS
  {
    name: "Image Compressor",
    href: "/image-compressor",
    category: "Image Tools",
    description: "Compress JPG, PNG and WebP images",
    keywords: ["compress", "image", "jpg", "png", "webp", "reduce", "size"],
    icon: <ImageDown />
  },
  {
    name: "Image Resizer",
    href: "/image-resizer",
    category: "Image Tools",
    description: "Resize images quickly",
    keywords: ["resize", "image", "scale", "dimensions", "width", "height"],
    icon: <Maximize />
  },
  {
    name: "Image Cropper",
    href: "/image-cropper",
    category: "Image Tools",
    description: "Crop images to any size",
    keywords: ["crop", "image", "cut", "trim", "aspect", "ratio"],
    icon: <Crop />
  },
  {
    name: "JPG to PNG",
    href: "/jpg-to-png",
    category: "Image Tools",
    description: "Convert JPG to transparent PNG format",
    keywords: ["convert", "jpg", "png", "transparent", "format"],
    icon: <ArrowRightLeft />
  },
  {
    name: "PNG to JPG",
    href: "/png-to-jpg",
    category: "Image Tools",
    description: "Convert PNG to optimized JPG",
    keywords: ["convert", "png", "jpg", "jpeg", "optimize"],
    icon: <ArrowRightLeft />
  },
  {
    name: "WebP Converter",
    href: "/webp-converter",
    category: "Image Tools",
    description: "Convert between WebP and other formats",
    keywords: ["convert", "webp", "image", "format"],
    icon: <FileImage />
  },
  {
    name: "Image Converter",
    href: "/image-converter",
    category: "Image Tools",
    description: "Universal image format converter",
    keywords: ["convert", "image", "format", "universal"],
    icon: <FileImage />
  },
  {
    name: "Bulk Image Compressor",
    href: "/bulk-image-compressor",
    category: "Image Tools",
    description: "Compress multiple images at once",
    keywords: ["compress", "bulk", "batch", "multiple", "images"],
    icon: <Images />
  },

  // PDF TOOLS
  {
    name: "Merge PDF",
    href: "/pdf-merge",
    category: "PDF Tools",
    description: "Combine multiple PDF files",
    keywords: ["merge", "pdf", "combine", "join", "files"],
    icon: <Files />
  },
  {
    name: "Split PDF",
    href: "/pdf-split",
    category: "PDF Tools",
    description: "Split PDF pages into separate files",
    keywords: ["split", "pdf", "separate", "extract", "pages"],
    icon: <Scissors />
  },
  {
    name: "Compress PDF",
    href: "/pdf-compress",
    category: "PDF Tools",
    description: "Reduce file size of your PDFs",
    keywords: ["compress", "pdf", "reduce", "size", "optimize"],
    icon: <FileDown />
  },
  {
    name: "Rotate PDF",
    href: "/pdf-rotate",
    category: "PDF Tools",
    description: "Rotate individual PDF pages",
    keywords: ["rotate", "pdf", "turn", "orientation", "pages"],
    icon: <RotateCw />
  },
  {
    name: "Delete PDF Pages",
    href: "/pdf-page-delete",
    category: "PDF Tools",
    description: "Remove unwanted pages from a PDF",
    keywords: ["delete", "remove", "pdf", "pages"],
    icon: <FileX />
  },
  {
    name: "Extract PDF Pages",
    href: "/pdf-page-extract",
    category: "PDF Tools",
    description: "Pull specific pages out of a PDF",
    keywords: ["extract", "pull", "pdf", "pages"],
    icon: <FileOutput />
  },
  {
    name: "Watermark PDF",
    href: "/pdf-watermark",
    category: "PDF Tools",
    description: "Add a watermark to your PDF",
    keywords: ["watermark", "pdf", "stamp", "brand"],
    icon: <Stamp />
  },
  {
    name: "Image to PDF",
    href: "/image-to-pdf",
    category: "PDF Tools",
    description: "Convert images to PDF format",
    keywords: ["convert", "image", "pdf", "jpg", "png"],
    icon: <FileImage />
  },
  {
    name: "PDF to Images",
    href: "/pdf-to-images",
    category: "PDF Tools",
    description: "Extract PDF pages as images",
    keywords: ["convert", "pdf", "image", "extract", "pages"],
    icon: <Images />
  },

  // AUDIO TOOLS
  {
    name: "WAV to MP3",
    href: "/wav-to-mp3",
    category: "Audio Tools",
    description: "Convert WAV audio to MP3",
    keywords: ["convert", "wav", "mp3", "audio"],
    icon: <AudioLines />
  },
  {
    name: "MP3 to WAV",
    href: "/mp3-to-wav",
    category: "Audio Tools",
    description: "Convert MP3 audio to WAV",
    keywords: ["convert", "mp3", "wav", "audio"],
    icon: <AudioLines />
  },
  {
    name: "Audio Compressor",
    href: "/audio-compressor",
    category: "Audio Tools",
    description: "Reduce audio file sizes",
    keywords: ["compress", "audio", "reduce", "size"],
    icon: <AudioWaveform />
  },
  {
    name: "Audio Converter",
    href: "/audio-converter",
    category: "Audio Tools",
    description: "Convert between common audio formats",
    keywords: ["convert", "audio", "format"],
    icon: <ArrowRightLeft />
  },
  {
    name: "Audio Cutter",
    href: "/audio-cutter",
    category: "Audio Tools",
    description: "Trim and cut audio files",
    keywords: ["cut", "trim", "audio", "clip"],
    icon: <Scissors />
  },
  {
    name: "Audio Volume",
    href: "/audio-volume",
    category: "Audio Tools",
    description: "Increase or decrease audio volume",
    keywords: ["volume", "audio", "increase", "decrease", "loudness"],
    icon: <Volume2 />
  },

  // OTHER UTILITIES
  {
    name: "QR Code Generator",
    href: "/qr-generator",
    category: "Other Utilities",
    description: "Generate QR codes from text or URLs",
    keywords: ["qr", "code", "generate", "create", "barcode"],
    icon: <QrCode />
  },
  {
    name: "Password Generator",
    href: "/password-generator",
    category: "Other Utilities",
    description: "Create secure, randomized passwords",
    keywords: ["password", "generate", "secure", "random"],
    icon: <KeyRound />
  },
  {
    name: "Word Counter",
    href: "/word-counter",
    category: "Other Utilities",
    description: "Count words, characters, and sentences",
    keywords: ["word", "count", "characters", "sentences", "text"],
    icon: <FileText />
  },
  {
    name: "JSON Formatter",
    href: "/json-formatter",
    category: "Other Utilities",
    description: "Format and validate JSON data",
    keywords: ["json", "format", "validate", "beautify"],
    icon: <Braces />
  },
  {
    name: "Color Picker",
    href: "/color-picker",
    category: "Other Utilities",
    description: "Pick colors and convert HEX, RGB, HSL",
    keywords: ["color", "picker", "hex", "rgb", "hsl", "convert"],
    icon: <Pipette />
  },
  {
    name: "Base64 Encoder",
    href: "/base64",
    category: "Other Utilities",
    description: "Encode and decode text to Base64",
    keywords: ["base64", "encode", "decode", "text"],
    icon: <Binary />
  },
  {
    name: "UUID Generator",
    href: "/uuid-generator",
    category: "Other Utilities",
    description: "Generate unique random UUIDs (v4)",
    keywords: ["uuid", "generate", "random", "unique", "guid"],
    icon: <Fingerprint />
  },
  {
    name: "Text Case Converter",
    href: "/text-case",
    category: "Other Utilities",
    description: "Convert text to uppercase, lowercase",
    keywords: ["text", "case", "convert", "uppercase", "lowercase", "title"],
    icon: <CaseUpper />
  },
  {
    name: "Timestamp Converter",
    href: "/timestamp",
    category: "Other Utilities",
    description: "Convert Unix timestamps to dates",
    keywords: ["timestamp", "unix", "convert", "date", "time"],
    icon: <Clock />
  },
  {
    name: "Unit Converter",
    href: "/unit-converter",
    category: "Other Utilities",
    description: "Convert between units of measurement",
    keywords: ["unit", "convert", "measurement", "weight", "length", "temperature"],
    icon: <Ruler />
  },
  {
    name: "Percentage Calculator",
    href: "/percentage-calculator",
    category: "Other Utilities",
    description: "Calculate percentage increases",
    keywords: ["percentage", "calculate", "math", "increase", "decrease"],
    icon: <Percent />
  }
];
