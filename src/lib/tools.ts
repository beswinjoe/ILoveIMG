export type ToolCategory = 'Image Tools' | 'PDF Tools' | 'Audio Tools' | 'Other Utilities';

export interface ToolItem {
  name: string;
  href: string;
  category: ToolCategory;
  description: string;
  keywords: string[];
  iconName: string; // Used to map to Lucide icons dynamically
}

export const toolsData: ToolItem[] = [
  // IMAGE TOOLS
  {
    name: "Image Compressor",
    href: "/image-compressor",
    category: "Image Tools",
    description: "Compress JPG, PNG and WebP images",
    keywords: ["compress", "image", "jpg", "png", "webp", "reduce", "size"],
    iconName: "image"
  },
  {
    name: "Image Resizer",
    href: "/image-resizer",
    category: "Image Tools",
    description: "Resize images quickly",
    keywords: ["resize", "image", "scale", "dimensions", "width", "height"],
    iconName: "image"
  },
  {
    name: "Image Cropper",
    href: "/image-cropper",
    category: "Image Tools",
    description: "Crop images to any size",
    keywords: ["crop", "image", "cut", "trim", "aspect", "ratio"],
    iconName: "image"
  },
  {
    name: "JPG to PNG",
    href: "/jpg-to-png",
    category: "Image Tools",
    description: "Convert JPG to transparent PNG format",
    keywords: ["convert", "jpg", "png", "transparent", "format"],
    iconName: "image"
  },
  {
    name: "PNG to JPG",
    href: "/png-to-jpg",
    category: "Image Tools",
    description: "Convert PNG to optimized JPG",
    keywords: ["convert", "png", "jpg", "jpeg", "optimize"],
    iconName: "image"
  },
  {
    name: "WebP Converter",
    href: "/webp-converter",
    category: "Image Tools",
    description: "Convert between WebP and other formats",
    keywords: ["convert", "webp", "image", "format"],
    iconName: "image"
  },
  {
    name: "Image Converter",
    href: "/image-converter",
    category: "Image Tools",
    description: "Universal image format converter",
    keywords: ["convert", "image", "format", "universal"],
    iconName: "image"
  },
  {
    name: "Bulk Image Compressor",
    href: "/bulk-image-compressor",
    category: "Image Tools",
    description: "Compress multiple images at once",
    keywords: ["compress", "bulk", "batch", "multiple", "images"],
    iconName: "image"
  },

  // PDF TOOLS
  {
    name: "Merge PDF",
    href: "/pdf-merge",
    category: "PDF Tools",
    description: "Combine multiple PDF files",
    keywords: ["merge", "pdf", "combine", "join", "files"],
    iconName: "file-text"
  },
  {
    name: "Split PDF",
    href: "/pdf-split",
    category: "PDF Tools",
    description: "Split PDF pages into separate files",
    keywords: ["split", "pdf", "separate", "extract", "pages"],
    iconName: "file-text"
  },
  {
    name: "Compress PDF",
    href: "/pdf-compress",
    category: "PDF Tools",
    description: "Reduce file size of your PDFs",
    keywords: ["compress", "pdf", "reduce", "size", "optimize"],
    iconName: "file-text"
  },
  {
    name: "Rotate PDF",
    href: "/pdf-rotate",
    category: "PDF Tools",
    description: "Rotate individual PDF pages",
    keywords: ["rotate", "pdf", "turn", "orientation", "pages"],
    iconName: "file-text"
  },
  {
    name: "Delete PDF Pages",
    href: "/pdf-page-delete",
    category: "PDF Tools",
    description: "Remove unwanted pages from a PDF",
    keywords: ["delete", "remove", "pdf", "pages"],
    iconName: "file-text"
  },
  {
    name: "Extract PDF Pages",
    href: "/pdf-page-extract",
    category: "PDF Tools",
    description: "Pull specific pages out of a PDF",
    keywords: ["extract", "pull", "pdf", "pages"],
    iconName: "file-text"
  },
  {
    name: "Watermark PDF",
    href: "/pdf-watermark",
    category: "PDF Tools",
    description: "Add a watermark to your PDF",
    keywords: ["watermark", "pdf", "stamp", "brand"],
    iconName: "file-text"
  },
  {
    name: "Image to PDF",
    href: "/image-to-pdf",
    category: "PDF Tools",
    description: "Convert images to PDF format",
    keywords: ["convert", "image", "pdf", "jpg", "png"],
    iconName: "file-text"
  },
  {
    name: "PDF to Images",
    href: "/pdf-to-images",
    category: "PDF Tools",
    description: "Extract PDF pages as images",
    keywords: ["convert", "pdf", "image", "extract", "pages"],
    iconName: "file-text"
  },

  // AUDIO TOOLS
  {
    name: "WAV to MP3",
    href: "/wav-to-mp3",
    category: "Audio Tools",
    description: "Convert WAV audio to MP3",
    keywords: ["convert", "wav", "mp3", "audio"],
    iconName: "music"
  },
  {
    name: "MP3 to WAV",
    href: "/mp3-to-wav",
    category: "Audio Tools",
    description: "Convert MP3 audio to WAV",
    keywords: ["convert", "mp3", "wav", "audio"],
    iconName: "music"
  },
  {
    name: "Audio Compressor",
    href: "/audio-compressor",
    category: "Audio Tools",
    description: "Reduce audio file sizes",
    keywords: ["compress", "audio", "reduce", "size"],
    iconName: "music"
  },
  {
    name: "Audio Converter",
    href: "/audio-converter",
    category: "Audio Tools",
    description: "Convert between common audio formats",
    keywords: ["convert", "audio", "format"],
    iconName: "music"
  },
  {
    name: "Audio Cutter",
    href: "/audio-cutter",
    category: "Audio Tools",
    description: "Trim and cut audio files",
    keywords: ["cut", "trim", "audio", "clip"],
    iconName: "music"
  },
  {
    name: "Audio Volume",
    href: "/audio-volume",
    category: "Audio Tools",
    description: "Increase or decrease audio volume",
    keywords: ["volume", "audio", "increase", "decrease", "loudness"],
    iconName: "music"
  },

  // OTHER UTILITIES
  {
    name: "QR Code Generator",
    href: "/qr-generator",
    category: "Other Utilities",
    description: "Generate QR codes from text or URLs",
    keywords: ["qr", "code", "generate", "create", "barcode"],
    iconName: "wrench"
  },
  {
    name: "Password Generator",
    href: "/password-generator",
    category: "Other Utilities",
    description: "Create secure, randomized passwords",
    keywords: ["password", "generate", "secure", "random"],
    iconName: "wrench"
  },
  {
    name: "Word Counter",
    href: "/word-counter",
    category: "Other Utilities",
    description: "Count words, characters, and sentences",
    keywords: ["word", "count", "characters", "sentences", "text"],
    iconName: "wrench"
  },
  {
    name: "JSON Formatter",
    href: "/json-formatter",
    category: "Other Utilities",
    description: "Format and validate JSON data",
    keywords: ["json", "format", "validate", "beautify"],
    iconName: "wrench"
  },
  {
    name: "Color Picker",
    href: "/color-picker",
    category: "Other Utilities",
    description: "Pick colors and convert HEX, RGB, HSL",
    keywords: ["color", "picker", "hex", "rgb", "hsl", "convert"],
    iconName: "wrench"
  },
  {
    name: "Base64 Encoder",
    href: "/base64",
    category: "Other Utilities",
    description: "Encode and decode text to Base64",
    keywords: ["base64", "encode", "decode", "text"],
    iconName: "wrench"
  },
  {
    name: "UUID Generator",
    href: "/uuid-generator",
    category: "Other Utilities",
    description: "Generate unique random UUIDs (v4)",
    keywords: ["uuid", "generate", "random", "unique", "guid"],
    iconName: "wrench"
  },
  {
    name: "Text Case Converter",
    href: "/text-case",
    category: "Other Utilities",
    description: "Convert text to uppercase, lowercase",
    keywords: ["text", "case", "convert", "uppercase", "lowercase", "title"],
    iconName: "wrench"
  },
  {
    name: "Timestamp Converter",
    href: "/timestamp",
    category: "Other Utilities",
    description: "Convert Unix timestamps to dates",
    keywords: ["timestamp", "unix", "convert", "date", "time"],
    iconName: "wrench"
  },
  {
    name: "Unit Converter",
    href: "/unit-converter",
    category: "Other Utilities",
    description: "Convert between units of measurement",
    keywords: ["unit", "convert", "measurement", "weight", "length", "temperature"],
    iconName: "wrench"
  },
  {
    name: "Percentage Calculator",
    href: "/percentage-calculator",
    category: "Other Utilities",
    description: "Calculate percentage increases",
    keywords: ["percentage", "calculate", "math", "increase", "decrease"],
    iconName: "wrench"
  }
];
