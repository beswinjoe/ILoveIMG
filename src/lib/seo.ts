/**
 * Centralized SEO data for all Filoza pages.
 * Each tool slug maps to unique metadata, FAQ, and structured data info.
 * This avoids scattering SEO copy across 65+ page.tsx files.
 */

const BASE_URL = 'https://filoza.vercel.app';

export type PrivacyMode = 'local' | 'upload';

export interface ToolSeoData {
  title: string;
  description: string;
  privacyMode: PrivacyMode;
  supportedFormats: string;
  faq: { question: string; answer: string }[];
  relatedSlugs: string[];  // slugs like 'image-resizer', 'pdf-merge'
}

// Category page SEO data
export interface CategorySeoData {
  title: string;
  description: string;
  canonical: string;
  relatedCategories: { label: string; href: string }[];
}

export const categorySeo: Record<string, CategorySeoData> = {
  'image-tools': {
    title: 'Image Tools - Compress, Resize & Convert Images Online | Filoza',
    description: 'Free online image tools to compress, resize, crop, convert, and edit JPG, PNG, WebP, and SVG images. All processing happens in your browser.',
    canonical: `${BASE_URL}/image-tools`,
    relatedCategories: [
      { label: 'PDF Tools', href: '/pdf-tools' },
      { label: 'Document Tools', href: '/documents' },
      { label: 'Archive Tools', href: '/archive' },
    ],
  },
  'pdf-tools': {
    title: 'PDF Tools - Merge, Split, Compress & Convert PDFs Online | Filoza',
    description: 'Free online PDF tools to merge, split, compress, rotate, watermark, and convert PDF files. Works directly in your browser with no uploads.',
    canonical: `${BASE_URL}/pdf-tools`,
    relatedCategories: [
      { label: 'Image Tools', href: '/image-tools' },
      { label: 'Document Tools', href: '/documents' },
      { label: 'Archive Tools', href: '/archive' },
    ],
  },
  'audio-tools': {
    title: 'Audio Tools - Convert & Edit Audio Files Online | Filoza',
    description: 'Free online audio tools to convert, compress, trim, and adjust audio files. Supports MP3, WAV, OGG, and M4A formats in your browser.',
    canonical: `${BASE_URL}/audio-tools`,
    relatedCategories: [
      { label: 'Image Tools', href: '/image-tools' },
      { label: 'PDF Tools', href: '/pdf-tools' },
      { label: 'File Transfer', href: '/file-transfer' },
    ],
  },
  'documents': {
    title: 'Document Converter - Convert Word, Excel, CSV & More Online | Filoza',
    description: 'Free online document conversion tools. Convert between Word, PDF, Excel, CSV, JSON, Markdown, and HTML formats directly in your browser.',
    canonical: `${BASE_URL}/documents`,
    relatedCategories: [
      { label: 'PDF Tools', href: '/pdf-tools' },
      { label: 'Image Tools', href: '/image-tools' },
      { label: 'Utilities', href: '/tools' },
    ],
  },
  'archive': {
    title: 'Archive Tools - Extract & Create ZIP, RAR Files Online | Filoza',
    description: 'Free online archive tools to create and extract ZIP and RAR files. All processing happens locally in your browser — no files are uploaded.',
    canonical: `${BASE_URL}/archive`,
    relatedCategories: [
      { label: 'File Transfer', href: '/file-transfer' },
      { label: 'Image Tools', href: '/image-tools' },
      { label: 'PDF Tools', href: '/pdf-tools' },
    ],
  },
  'tools': {
    title: 'Online Utilities - QR Code, Password Generator & More | Filoza',
    description: 'Free online utilities including QR code generator, password generator, JSON formatter, color picker, unit converter, and more.',
    canonical: `${BASE_URL}/tools`,
    relatedCategories: [
      { label: 'Document Tools', href: '/documents' },
      { label: 'Image Tools', href: '/image-tools' },
      { label: 'PDF Tools', href: '/pdf-tools' },
    ],
  },
};

/**
 * SEO data for every individual tool page.
 * Keys are the URL slug (e.g., 'image-compressor').
 */
export const toolSeo: Record<string, ToolSeoData> = {
  // ─── IMAGE TOOLS ───────────────────────────────────────────────
  'image-compressor': {
    title: 'Image Compressor - Compress JPG, PNG & WebP Online | Filoza',
    description: 'Compress JPG, PNG, and WebP images online without losing quality. Adjust compression level, preview results, and download — all processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP',
    faq: [
      { question: 'Is my image uploaded to a server?', answer: 'No. Filoza compresses images entirely within your browser using JavaScript. Your files never leave your device.' },
      { question: 'What formats can I compress?', answer: 'You can compress JPG, JPEG, PNG, and WebP images.' },
      { question: 'How much can I reduce the file size?', answer: 'Depending on the original image and your quality setting, you can typically reduce file sizes by 40–80%.' },
      { question: 'Is there a file size limit?', answer: 'There is no strict limit, but very large images (over 50 MB) may be slow to process depending on your device.' },
    ],
    relatedSlugs: ['image-resizer', 'bulk-image-compressor', 'image-converter', 'jpg-to-png'],
  },
  'image-resizer': {
    title: 'Image Resizer - Resize Images Online for Free | Filoza',
    description: 'Resize images to any dimension online. Supports JPG, PNG, and WebP. Set custom width and height or scale by percentage — processed locally in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP',
    faq: [
      { question: 'Can I resize images without losing quality?', answer: 'Yes. Filoza uses high-quality resampling. For the best results, resize down rather than up.' },
      { question: 'Can I resize multiple images at once?', answer: 'This tool resizes one image at a time. For batch compression, try the Bulk Image Compressor.' },
    ],
    relatedSlugs: ['image-compressor', 'image-cropper', 'image-converter', 'bulk-image-compressor'],
  },
  'image-cropper': {
    title: 'Image Cropper - Crop Images to Any Size Online | Filoza',
    description: 'Crop images to custom dimensions or aspect ratios online. Supports JPG, PNG, and WebP. Free, fast, and processed entirely in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP',
    faq: [
      { question: 'Can I set a specific aspect ratio?', answer: 'Yes. You can crop freely or lock to common aspect ratios like 16:9, 4:3, or 1:1.' },
      { question: 'Does cropping reduce image quality?', answer: 'No. Cropping removes pixels outside the selection without recompressing the remaining image.' },
    ],
    relatedSlugs: ['image-resizer', 'image-compressor', 'rotate-image', 'flip-image'],
  },
  'jpg-to-png': {
    title: 'JPG to PNG Converter - Convert JPEG to PNG Online | Filoza',
    description: 'Convert JPG and JPEG images to PNG format online for free. Preserve image quality and gain transparency support. Processed locally in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG → PNG',
    faq: [
      { question: 'Why convert JPG to PNG?', answer: 'PNG supports transparency and lossless compression, making it ideal for graphics, logos, and images that need a transparent background.' },
      { question: 'Will the image quality change?', answer: 'PNG is a lossless format, so no additional quality is lost during conversion.' },
    ],
    relatedSlugs: ['png-to-jpg', 'image-converter', 'webp-converter', 'image-compressor'],
  },
  'png-to-jpg': {
    title: 'PNG to JPG Converter - Convert PNG to JPEG Online | Filoza',
    description: 'Convert PNG images to JPG format online. Reduce file size while maintaining quality. Free and processed in your browser with no uploads.',
    privacyMode: 'local',
    supportedFormats: 'PNG → JPG, JPEG',
    faq: [
      { question: 'Why convert PNG to JPG?', answer: 'JPG files are typically much smaller than PNG, making them better for web use and sharing when transparency is not needed.' },
      { question: 'What happens to transparent areas?', answer: 'Transparent areas in the PNG will become white in the resulting JPG, since JPEG does not support transparency.' },
    ],
    relatedSlugs: ['jpg-to-png', 'image-converter', 'webp-converter', 'image-compressor'],
  },
  'webp-converter': {
    title: 'WebP Converter - Convert WebP to JPG, PNG & Back | Filoza',
    description: 'Convert WebP images to JPG or PNG, or convert other image formats to WebP. Free online converter that works entirely in your browser.',
    privacyMode: 'local',
    supportedFormats: 'WebP ↔ JPG, PNG',
    faq: [
      { question: 'What is WebP?', answer: 'WebP is a modern image format developed by Google that provides smaller file sizes than JPG and PNG with comparable quality.' },
      { question: 'Can I convert WebP to JPG?', answer: 'Yes. This tool converts WebP to JPG, PNG, or vice versa.' },
    ],
    relatedSlugs: ['image-converter', 'jpg-to-png', 'png-to-jpg', 'image-compressor'],
  },
  'image-converter': {
    title: 'Image Converter - Convert Between JPG, PNG, WebP & More | Filoza',
    description: 'Convert images between JPG, PNG, WebP, and other formats online. Universal image format converter that processes files locally in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP, BMP, GIF',
    faq: [
      { question: 'What formats are supported?', answer: 'You can convert between JPG, PNG, WebP, BMP, and GIF formats.' },
      { question: 'Is there a file size limit?', answer: 'No strict limit, but very large images may take longer depending on your device.' },
    ],
    relatedSlugs: ['jpg-to-png', 'png-to-jpg', 'webp-converter', 'svg-to-png'],
  },
  'bulk-image-compressor': {
    title: 'Bulk Image Compressor - Compress Multiple Images at Once | Filoza',
    description: 'Compress multiple JPG, PNG, and WebP images in one batch. Reduce file sizes without uploading — all processing happens in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP',
    faq: [
      { question: 'How many images can I compress at once?', answer: 'You can add multiple images in a single batch. Processing speed depends on your device.' },
      { question: 'Are files uploaded to a server?', answer: 'No. All images are compressed locally in your browser.' },
    ],
    relatedSlugs: ['image-compressor', 'image-resizer', 'image-converter', 'zip-creator'],
  },
  'rotate-image': {
    title: 'Rotate Image Online - Rotate JPG, PNG & WebP | Filoza',
    description: 'Rotate images 90°, 180°, or 270° online. Supports JPG, PNG, and WebP. Free tool that processes images locally in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP',
    faq: [
      { question: 'Can I rotate by a custom angle?', answer: 'This tool supports 90°, 180°, and 270° rotations. For custom angles, an image editor may be more suitable.' },
    ],
    relatedSlugs: ['flip-image', 'image-cropper', 'image-resizer', 'image-compressor'],
  },
  'flip-image': {
    title: 'Flip Image Online - Mirror Images Horizontally or Vertically | Filoza',
    description: 'Flip images horizontally or vertically online. Supports JPG, PNG, and WebP formats. Free and processed entirely in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP',
    faq: [
      { question: 'What is the difference between flip and rotate?', answer: 'Flipping mirrors the image along an axis (horizontal or vertical), while rotating turns the image by a set number of degrees.' },
    ],
    relatedSlugs: ['rotate-image', 'image-cropper', 'image-resizer', 'grayscale-image'],
  },
  'grayscale-image': {
    title: 'Grayscale Image Converter - Convert Images to Black & White | Filoza',
    description: 'Convert color images to grayscale (black and white) online. Supports JPG, PNG, and WebP. Processed locally in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP',
    faq: [
      { question: 'Can I undo the grayscale conversion?', answer: 'The conversion removes color data. Download the original before converting to keep a copy.' },
    ],
    relatedSlugs: ['blur-image', 'image-compressor', 'image-converter', 'rotate-image'],
  },
  'blur-image': {
    title: 'Blur Image Online - Apply Gaussian Blur Effect | Filoza',
    description: 'Apply a gaussian blur effect to images online. Adjust blur intensity for JPG, PNG, and WebP images. Processed locally in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP',
    faq: [
      { question: 'Can I control the blur amount?', answer: 'Yes. Use the slider to adjust the blur intensity before downloading.' },
    ],
    relatedSlugs: ['grayscale-image', 'image-compressor', 'image-watermark', 'rotate-image'],
  },
  'favicon-generator': {
    title: 'Favicon Generator - Create Favicons from Images Online | Filoza',
    description: 'Generate 32×32 favicon.ico files from any image online. Upload a JPG, PNG, or WebP image and download a ready-to-use favicon.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP → ICO',
    faq: [
      { question: 'What size favicon does this generate?', answer: 'This tool generates a standard 32×32 pixel favicon in ICO format.' },
      { question: 'Can I use any image as a favicon?', answer: 'Yes, but square images work best since favicons are square. Non-square images will be resized to fit.' },
    ],
    relatedSlugs: ['image-resizer', 'image-compressor', 'svg-to-png', 'image-converter'],
  },
  'background-remover': {
    title: 'Background Remover - Remove Image Backgrounds Online | Filoza',
    description: 'Remove backgrounds from images automatically online. Get a transparent PNG result. Powered by AI and processed locally in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP → PNG (transparent)',
    faq: [
      { question: 'How does background removal work?', answer: 'Filoza uses an AI model that runs locally in your browser to detect and remove image backgrounds. No images are uploaded to a server.' },
      { question: 'What output format do I get?', answer: 'You get a PNG image with a transparent background.' },
    ],
    relatedSlugs: ['image-compressor', 'image-converter', 'image-cropper', 'image-resizer'],
  },
  'svg-to-png': {
    title: 'SVG to PNG Converter - Convert SVG Files to PNG Online | Filoza',
    description: 'Convert SVG vector graphics to PNG raster images online. Set custom dimensions and download high-quality PNG files. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'SVG → PNG',
    faq: [
      { question: 'Can I choose the output resolution?', answer: 'Yes. You can set custom width and height for the exported PNG image.' },
    ],
    relatedSlugs: ['image-converter', 'image-resizer', 'favicon-generator', 'png-to-jpg'],
  },
  'image-watermark': {
    title: 'Image Watermark - Add Text Watermarks to Images Online | Filoza',
    description: 'Add custom text watermarks to images online to protect your copyright. Adjust position, size, opacity, and color. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP',
    faq: [
      { question: 'Can I customize the watermark appearance?', answer: 'Yes. You can adjust the text, font size, color, opacity, and position of the watermark.' },
    ],
    relatedSlugs: ['image-compressor', 'image-resizer', 'blur-image', 'image-converter'],
  },

  // ─── PDF TOOLS ─────────────────────────────────────────────────
  'pdf-merge': {
    title: 'Merge PDF Files Online - Combine PDFs for Free | Filoza',
    description: 'Merge multiple PDF files into one document online. Drag to reorder pages before combining. Free and processed locally in your browser.',
    privacyMode: 'local',
    supportedFormats: 'PDF',
    faq: [
      { question: 'How many PDFs can I merge?', answer: 'There is no strict limit. You can add as many PDF files as your browser can handle.' },
      { question: 'Can I reorder the files before merging?', answer: 'Yes. Drag and drop to rearrange the order of your PDF files before combining them.' },
      { question: 'Are my PDFs uploaded to a server?', answer: 'No. All merging is done locally in your browser using pdf-lib.' },
    ],
    relatedSlugs: ['pdf-split', 'pdf-compress', 'pdf-rotate', 'pdf-page-extract'],
  },
  'pdf-split': {
    title: 'Split PDF Online - Extract Pages from PDFs for Free | Filoza',
    description: 'Split PDF files by selecting specific pages or page ranges. Extract individual pages into separate PDF documents. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'PDF',
    faq: [
      { question: 'Can I extract specific pages?', answer: 'Yes. Select individual pages or enter page ranges to split your PDF exactly how you need.' },
      { question: 'Does splitting reduce quality?', answer: 'No. Pages are extracted without any recompression or quality loss.' },
    ],
    relatedSlugs: ['pdf-merge', 'pdf-page-extract', 'pdf-page-delete', 'pdf-compress'],
  },
  'pdf-compress': {
    title: 'Compress PDF - Reduce PDF File Size Online | Filoza',
    description: 'Compress PDF files to reduce their size online. Optimizes embedded images while keeping text sharp. Free and processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'PDF',
    faq: [
      { question: 'How much can I reduce the PDF size?', answer: 'Results vary. PDFs with many images can often be reduced by 50–80%. Text-heavy PDFs may see smaller reductions.' },
      { question: 'Will compression affect text quality?', answer: 'No. Text remains sharp. Only embedded images are optimized during compression.' },
    ],
    relatedSlugs: ['pdf-merge', 'pdf-split', 'image-to-pdf', 'pdf-to-images'],
  },
  'pdf-rotate': {
    title: 'Rotate PDF Pages Online - Free PDF Page Rotation | Filoza',
    description: 'Rotate individual PDF pages 90°, 180°, or 270° online. Fix page orientation issues in your PDF documents. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'PDF',
    faq: [
      { question: 'Can I rotate individual pages?', answer: 'Yes. Select specific pages and rotate them independently without affecting other pages.' },
    ],
    relatedSlugs: ['pdf-merge', 'pdf-split', 'pdf-page-delete', 'pdf-watermark'],
  },
  'pdf-page-delete': {
    title: 'Delete PDF Pages - Remove Pages from PDFs Online | Filoza',
    description: 'Remove unwanted pages from PDF files online. Select pages to delete and download the updated PDF. Processed locally in your browser.',
    privacyMode: 'local',
    supportedFormats: 'PDF',
    faq: [
      { question: 'Can I preview pages before deleting?', answer: 'Yes. Pages are displayed as thumbnails so you can identify which ones to remove.' },
    ],
    relatedSlugs: ['pdf-page-extract', 'pdf-split', 'pdf-merge', 'pdf-rotate'],
  },
  'pdf-page-extract': {
    title: 'Extract PDF Pages - Pull Specific Pages from PDFs | Filoza',
    description: 'Extract specific pages from a PDF document online. Select the pages you need and download them as a new PDF file. Free and browser-based.',
    privacyMode: 'local',
    supportedFormats: 'PDF',
    faq: [
      { question: 'What is the difference between extract and split?', answer: 'Extract pulls selected pages into a single new PDF. Split can create multiple separate PDFs from page ranges.' },
    ],
    relatedSlugs: ['pdf-split', 'pdf-page-delete', 'pdf-merge', 'pdf-compress'],
  },
  'pdf-watermark': {
    title: 'Watermark PDF - Add Watermarks to PDF Pages Online | Filoza',
    description: 'Add text watermarks to PDF pages online. Customize font, size, color, opacity, and position. Free and processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'PDF',
    faq: [
      { question: 'Can I watermark specific pages?', answer: 'The watermark is applied to all pages. You can use the PDF Page Extract tool to isolate pages first if needed.' },
    ],
    relatedSlugs: ['pdf-merge', 'pdf-rotate', 'pdf-compress', 'image-watermark'],
  },
  'image-to-pdf': {
    title: 'Image to PDF Converter - Convert Images to PDF Online | Filoza',
    description: 'Convert JPG, PNG, and WebP images into a PDF document online. Combine multiple images into a single PDF file. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP → PDF',
    faq: [
      { question: 'Can I add multiple images to one PDF?', answer: 'Yes. Upload multiple images and they will be combined into a single PDF document, one image per page.' },
    ],
    relatedSlugs: ['pdf-to-images', 'pdf-merge', 'image-compressor', 'image-converter'],
  },
  'pdf-to-images': {
    title: 'PDF to Images - Convert PDF Pages to JPG or PNG | Filoza',
    description: 'Convert PDF pages to JPG or PNG images online. Extract each page as a separate image file. Free and processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'PDF → JPG, PNG',
    faq: [
      { question: 'What image format do I get?', answer: 'Pages are exported as PNG images by default for the highest quality.' },
    ],
    relatedSlugs: ['image-to-pdf', 'pdf-split', 'pdf-page-extract', 'image-compressor'],
  },
  'text-to-pdf': {
    title: 'Text to PDF Converter - Convert Text to PDF Online | Filoza',
    description: 'Convert plain text into a formatted PDF document online. Type or paste text and generate a clean PDF file. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'Text → PDF',
    faq: [
      { question: 'Can I format the text?', answer: 'The tool creates a clean, readable PDF from your text. For advanced formatting, try Markdown to PDF.' },
    ],
    relatedSlugs: ['txt-to-pdf', 'markdown-to-pdf', 'html-to-pdf', 'pdf-merge'],
  },
  'pdf-page-numbers': {
    title: 'Add Page Numbers to PDF - Number PDF Pages Online | Filoza',
    description: 'Add page numbers to your PDF documents online. Choose position and starting number. Free and processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'PDF',
    faq: [
      { question: 'Can I choose where the page numbers appear?', answer: 'Yes. You can place page numbers at the top or bottom, left, center, or right of each page.' },
    ],
    relatedSlugs: ['pdf-watermark', 'pdf-merge', 'pdf-rotate', 'pdf-metadata'],
  },
  'pdf-metadata': {
    title: 'PDF Metadata Editor - View & Remove PDF Metadata | Filoza',
    description: 'View or remove metadata from PDF files online. Clean author, title, and other hidden information from your PDFs. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'PDF',
    faq: [
      { question: 'What metadata can be removed?', answer: 'You can view and remove the title, author, subject, keywords, creator, and producer fields from a PDF.' },
    ],
    relatedSlugs: ['pdf-compress', 'pdf-watermark', 'exif-remover', 'pdf-merge'],
  },

  // ─── AUDIO TOOLS ───────────────────────────────────────────────
  'wav-to-mp3': {
    title: 'WAV to MP3 Converter - Convert WAV Audio to MP3 Online | Filoza',
    description: 'Convert WAV audio files to MP3 format online. Reduce audio file size while maintaining quality. Processed locally in your browser using WebAssembly.',
    privacyMode: 'local',
    supportedFormats: 'WAV → MP3',
    faq: [
      { question: 'Does the conversion reduce audio quality?', answer: 'MP3 uses lossy compression, so there is some quality reduction. At higher bitrates (192+ kbps) the difference is barely noticeable.' },
    ],
    relatedSlugs: ['mp3-to-wav', 'audio-converter', 'audio-compressor', 'audio-cutter'],
  },
  'mp3-to-wav': {
    title: 'MP3 to WAV Converter - Convert MP3 Audio to WAV Online | Filoza',
    description: 'Convert MP3 audio files to uncompressed WAV format online. Get lossless audio output. Processed in your browser using WebAssembly.',
    privacyMode: 'local',
    supportedFormats: 'MP3 → WAV',
    faq: [
      { question: 'Will converting MP3 to WAV improve quality?', answer: 'No. The conversion unpacks the compressed audio but cannot restore data lost during the original MP3 encoding.' },
    ],
    relatedSlugs: ['wav-to-mp3', 'audio-converter', 'audio-compressor', 'audio-cutter'],
  },
  'audio-compressor': {
    title: 'Audio Compressor - Reduce Audio File Size Online | Filoza',
    description: 'Compress audio files to reduce their size online. Supports MP3, WAV, OGG, and M4A formats. Processed locally in your browser.',
    privacyMode: 'local',
    supportedFormats: 'MP3, WAV, OGG, M4A',
    faq: [
      { question: 'How does audio compression work?', answer: 'The tool re-encodes your audio at a lower bitrate, reducing file size while keeping the audio listenable.' },
    ],
    relatedSlugs: ['wav-to-mp3', 'audio-converter', 'audio-cutter', 'audio-volume'],
  },
  'audio-converter': {
    title: 'Audio Converter - Convert Between Audio Formats Online | Filoza',
    description: 'Convert audio files between MP3, WAV, OGG, and other formats online. Free tool powered by WebAssembly, processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'MP3, WAV, OGG, M4A, FLAC',
    faq: [
      { question: 'What audio formats are supported?', answer: 'You can convert between MP3, WAV, OGG, M4A, and other common audio formats.' },
    ],
    relatedSlugs: ['wav-to-mp3', 'mp3-to-wav', 'audio-compressor', 'audio-cutter'],
  },
  'audio-cutter': {
    title: 'Audio Cutter - Trim & Cut Audio Files Online | Filoza',
    description: 'Trim and cut audio files online. Set start and end points to extract the section you need. Supports MP3, WAV, and OGG.',
    privacyMode: 'local',
    supportedFormats: 'MP3, WAV, OGG, M4A',
    faq: [
      { question: 'Can I preview before cutting?', answer: 'Yes. You can play the audio and adjust the start/end points before cutting.' },
    ],
    relatedSlugs: ['audio-converter', 'audio-compressor', 'audio-volume', 'wav-to-mp3'],
  },
  'audio-volume': {
    title: 'Audio Volume Changer - Adjust Audio Volume Online | Filoza',
    description: 'Increase or decrease audio volume online. Adjust the loudness of MP3, WAV, and OGG files. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'MP3, WAV, OGG, M4A',
    faq: [
      { question: 'Can I increase volume beyond 100%?', answer: 'Yes. You can boost volume above the original level, though extreme amplification may introduce distortion.' },
    ],
    relatedSlugs: ['audio-cutter', 'audio-compressor', 'audio-converter', 'wav-to-mp3'],
  },

  // ─── DOCUMENT TOOLS ────────────────────────────────────────────
  'word-to-pdf': {
    title: 'Word to PDF Converter - Convert DOCX to PDF Online | Filoza',
    description: 'Convert Word documents (DOCX) to PDF format online. Preserves formatting and layout. Free and processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'DOCX → PDF',
    faq: [
      { question: 'Does the conversion preserve formatting?', answer: 'Yes. The converter maintains headings, paragraphs, lists, and basic styles from your Word document.' },
      { question: 'Can I convert .doc files?', answer: 'This tool supports .docx files (the modern Word format). Older .doc files may not be supported.' },
    ],
    relatedSlugs: ['pdf-to-word', 'word-to-text', 'word-to-images', 'docx-to-html'],
  },
  'word-to-text': {
    title: 'Word to Text Converter - Extract Text from DOCX | Filoza',
    description: 'Extract raw text from Word (DOCX) documents online. Remove all formatting and get plain text output. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'DOCX → TXT',
    faq: [
      { question: 'Does this preserve formatting?', answer: 'No. This tool extracts plain text only. Use Word to PDF if you need to preserve formatting.' },
    ],
    relatedSlugs: ['word-to-pdf', 'docx-to-html', 'txt-to-pdf', 'txt-to-docx'],
  },
  'docx-to-html': {
    title: 'DOCX to HTML Converter - Convert Word to HTML Online | Filoza',
    description: 'Convert Word documents (DOCX) to clean HTML code online. Get web-ready HTML from your Word files. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'DOCX → HTML',
    faq: [
      { question: 'Is the HTML output clean?', answer: 'Yes. The converter produces semantic HTML with proper heading tags and paragraph elements.' },
    ],
    relatedSlugs: ['word-to-pdf', 'html-to-pdf', 'markdown-to-html', 'word-to-text'],
  },
  'word-to-images': {
    title: 'Word to Images - Convert DOCX Pages to Images | Filoza',
    description: 'Convert Word document pages into high-quality images online. Each page becomes a separate image file. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'DOCX → PNG',
    faq: [
      { question: 'What image format do I get?', answer: 'Pages are exported as PNG images for the highest quality.' },
    ],
    relatedSlugs: ['word-to-pdf', 'pdf-to-images', 'image-to-pdf', 'image-converter'],
  },
  'pdf-to-word': {
    title: 'PDF to Word Converter - Convert PDF to DOCX Online | Filoza',
    description: 'Convert PDF documents to editable Word (DOCX) files online. Extract text and structure from PDFs. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'PDF → DOCX',
    faq: [
      { question: 'Will the formatting be preserved?', answer: 'The converter extracts text content and basic structure. Complex layouts, images, and advanced formatting may not transfer perfectly.' },
    ],
    relatedSlugs: ['word-to-pdf', 'pdf-to-images', 'pdf-split', 'pdf-compress'],
  },
  'excel-to-csv': {
    title: 'Excel to CSV Converter - Convert XLSX to CSV Online | Filoza',
    description: 'Convert Excel spreadsheets (XLSX) to CSV format online. Export your spreadsheet data as a comma-separated file. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'XLSX → CSV',
    faq: [
      { question: 'Which sheet is converted?', answer: 'The first sheet in the workbook is converted by default.' },
    ],
    relatedSlugs: ['csv-to-excel', 'spreadsheet-to-json', 'excel-to-pdf', 'json-to-csv'],
  },
  'csv-to-excel': {
    title: 'CSV to Excel Converter - Convert CSV to XLSX Online | Filoza',
    description: 'Convert CSV files to Excel (XLSX) format online. Open CSV data in Excel with proper columns. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'CSV → XLSX',
    faq: [
      { question: 'Will column formatting be preserved?', answer: 'Yes. CSV data is mapped into Excel columns and rows automatically.' },
    ],
    relatedSlugs: ['excel-to-csv', 'spreadsheet-to-json', 'csv-to-pdf', 'json-to-csv'],
  },
  'spreadsheet-to-json': {
    title: 'Spreadsheet to JSON Converter - Convert Excel/CSV to JSON | Filoza',
    description: 'Convert Excel or CSV spreadsheet data into JSON format online. Useful for developers working with data APIs. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'XLSX, CSV → JSON',
    faq: [
      { question: 'How is the JSON structured?', answer: 'Each row becomes a JSON object. Column headers become the keys.' },
    ],
    relatedSlugs: ['json-to-csv', 'excel-to-csv', 'csv-to-excel', 'json-formatter'],
  },
  'json-to-csv': {
    title: 'JSON to CSV Converter - Convert JSON Data to CSV Online | Filoza',
    description: 'Convert JSON arrays and objects into CSV format online. Useful for data export and spreadsheet import. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JSON → CSV',
    faq: [
      { question: 'What JSON structure is supported?', answer: 'The tool works with JSON arrays of objects. Each object becomes a CSV row.' },
    ],
    relatedSlugs: ['spreadsheet-to-json', 'csv-to-excel', 'excel-to-csv', 'json-formatter'],
  },
  'excel-to-pdf': {
    title: 'Excel to PDF Converter - Convert XLSX to PDF Online | Filoza',
    description: 'Convert Excel spreadsheets (XLSX) to PDF format online. Preserve table structure in a printable PDF. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'XLSX → PDF',
    faq: [
      { question: 'Will formulas be included?', answer: 'The PDF contains the visible cell values, not the underlying formulas.' },
    ],
    relatedSlugs: ['excel-to-csv', 'csv-to-pdf', 'word-to-pdf', 'pdf-compress'],
  },
  'csv-to-pdf': {
    title: 'CSV to PDF Converter - Convert CSV Files to PDF Online | Filoza',
    description: 'Convert CSV files to formatted PDF tables online. Get a printable PDF from your CSV data. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'CSV → PDF',
    faq: [
      { question: 'Is the table formatted nicely?', answer: 'Yes. The CSV data is laid out in a clean table format in the PDF output.' },
    ],
    relatedSlugs: ['csv-to-excel', 'excel-to-pdf', 'json-to-csv', 'spreadsheet-to-json'],
  },
  'markdown-to-html': {
    title: 'Markdown to HTML Converter - Convert MD to HTML Online | Filoza',
    description: 'Convert Markdown documents to clean HTML code online. Supports headings, lists, code blocks, and more. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'Markdown (.md) → HTML',
    faq: [
      { question: 'Is the HTML output valid?', answer: 'Yes. The converter produces valid, semantic HTML from standard Markdown syntax.' },
    ],
    relatedSlugs: ['markdown-to-pdf', 'html-to-pdf', 'docx-to-html', 'txt-to-pdf'],
  },
  'markdown-to-pdf': {
    title: 'Markdown to PDF Converter - Convert MD to PDF Online | Filoza',
    description: 'Convert Markdown documents into formatted PDF files online. Supports headings, lists, code blocks, and more. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'Markdown (.md) → PDF',
    faq: [
      { question: 'Does it support code blocks?', answer: 'Yes. Markdown code blocks are rendered with proper formatting in the PDF output.' },
    ],
    relatedSlugs: ['markdown-to-html', 'html-to-pdf', 'txt-to-pdf', 'word-to-pdf'],
  },
  'html-to-pdf': {
    title: 'HTML to PDF Converter - Convert HTML to PDF Online | Filoza',
    description: 'Convert HTML files or code to PDF format online. Render web content as a downloadable PDF document. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'HTML → PDF',
    faq: [
      { question: 'Does it render CSS styles?', answer: 'Basic inline and embedded CSS is supported. External stylesheets may not be loaded.' },
    ],
    relatedSlugs: ['markdown-to-pdf', 'txt-to-pdf', 'docx-to-html', 'word-to-pdf'],
  },
  'txt-to-pdf': {
    title: 'TXT to PDF Converter - Convert Text Files to PDF Online | Filoza',
    description: 'Convert plain text (.txt) files to formatted PDF documents online. Upload a text file and download a clean PDF. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'TXT → PDF',
    faq: [
      { question: 'Can I style the text?', answer: 'The tool creates a clean, readable PDF. For styled output, try Markdown to PDF.' },
    ],
    relatedSlugs: ['text-to-pdf', 'txt-to-docx', 'markdown-to-pdf', 'html-to-pdf'],
  },
  'txt-to-docx': {
    title: 'TXT to DOCX Converter - Convert Text to Word Online | Filoza',
    description: 'Convert plain text (.txt) files to editable Word (DOCX) documents online. Processed in your browser with no file uploads.',
    privacyMode: 'local',
    supportedFormats: 'TXT → DOCX',
    faq: [
      { question: 'Can I edit the Word file after conversion?', answer: 'Yes. The output is a standard .docx file that can be opened and edited in any word processor.' },
    ],
    relatedSlugs: ['txt-to-pdf', 'word-to-pdf', 'word-to-text', 'docx-to-html'],
  },

  // ─── OTHER UTILITIES ───────────────────────────────────────────
  'exif-remover': {
    title: 'EXIF Remover - Remove Metadata from Images Online | Filoza',
    description: 'Remove hidden EXIF metadata from images online. Strip location data, camera info, and other metadata for privacy. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JPG, JPEG, PNG, WebP',
    faq: [
      { question: 'What metadata is removed?', answer: 'All EXIF data including GPS location, camera model, date taken, and other embedded information.' },
      { question: 'Why should I remove EXIF data?', answer: 'EXIF data can contain sensitive information like your GPS location. Removing it protects your privacy when sharing images online.' },
    ],
    relatedSlugs: ['image-compressor', 'pdf-metadata', 'image-converter', 'background-remover'],
  },
  'qr-generator': {
    title: 'QR Code Generator - Create QR Codes from Text or URLs | Filoza',
    description: 'Generate QR codes from text, URLs, or other data online. Download as PNG image. Free, fast, and works in your browser.',
    privacyMode: 'local',
    supportedFormats: 'Text, URL → QR Code (PNG)',
    faq: [
      { question: 'Can I customize the QR code?', answer: 'You can set the content (text or URL) and download it as a PNG image.' },
      { question: 'Is there a character limit?', answer: 'QR codes can store up to about 4,000 characters, but shorter content produces easier-to-scan codes.' },
    ],
    relatedSlugs: ['password-generator', 'base64', 'uuid-generator', 'color-picker'],
  },
  'password-generator': {
    title: 'Password Generator - Create Secure Random Passwords | Filoza',
    description: 'Generate strong, randomized passwords online. Customize length, and include letters, numbers, and symbols. Generated entirely in your browser.',
    privacyMode: 'local',
    supportedFormats: 'N/A (text output)',
    faq: [
      { question: 'Are the passwords truly random?', answer: 'Yes. Passwords are generated using your browser\'s cryptographic random number generator (crypto.getRandomValues).' },
      { question: 'Is my password stored anywhere?', answer: 'No. Passwords are generated locally and never sent to any server.' },
    ],
    relatedSlugs: ['uuid-generator', 'qr-generator', 'base64', 'word-counter'],
  },
  'word-counter': {
    title: 'Word Counter - Count Words, Characters & Sentences | Filoza',
    description: 'Count words, characters, sentences, and paragraphs in your text online. Useful for writers, students, and content creators.',
    privacyMode: 'local',
    supportedFormats: 'N/A (text input)',
    faq: [
      { question: 'Does it count spaces?', answer: 'The tool shows both character count with and without spaces.' },
    ],
    relatedSlugs: ['text-case', 'password-generator', 'json-formatter', 'base64'],
  },
  'json-formatter': {
    title: 'JSON Formatter & Validator - Format JSON Online | Filoza',
    description: 'Format, beautify, and validate JSON data online. Indent and syntax-highlight JSON for readability. Processed in your browser.',
    privacyMode: 'local',
    supportedFormats: 'JSON',
    faq: [
      { question: 'Does it validate JSON?', answer: 'Yes. The tool will show errors if your JSON is malformed and help you identify the issue.' },
    ],
    relatedSlugs: ['spreadsheet-to-json', 'json-to-csv', 'base64', 'word-counter'],
  },
  'color-picker': {
    title: 'Color Picker - Pick & Convert HEX, RGB, HSL Colors | Filoza',
    description: 'Pick colors and convert between HEX, RGB, and HSL formats online. Copy color values for use in design and development.',
    privacyMode: 'local',
    supportedFormats: 'HEX, RGB, HSL',
    faq: [
      { question: 'What color formats are supported?', answer: 'You can convert between HEX, RGB, and HSL color formats.' },
    ],
    relatedSlugs: ['qr-generator', 'password-generator', 'json-formatter', 'base64'],
  },
  'base64': {
    title: 'Base64 Encoder & Decoder - Encode/Decode Text Online | Filoza',
    description: 'Encode text to Base64 or decode Base64 strings back to text online. Useful for developers working with encoded data.',
    privacyMode: 'local',
    supportedFormats: 'Text ↔ Base64',
    faq: [
      { question: 'What is Base64?', answer: 'Base64 is an encoding scheme that converts binary data into ASCII text. It is commonly used in data URLs, email attachments, and APIs.' },
    ],
    relatedSlugs: ['json-formatter', 'uuid-generator', 'password-generator', 'word-counter'],
  },
  'uuid-generator': {
    title: 'UUID Generator - Generate Random UUIDs (v4) Online | Filoza',
    description: 'Generate unique random UUIDs (v4) online. Copy instantly for use in databases, APIs, and applications. Generated in your browser.',
    privacyMode: 'local',
    supportedFormats: 'N/A (UUID v4 output)',
    faq: [
      { question: 'Are the UUIDs unique?', answer: 'Yes. UUID v4 uses cryptographic randomness, making collisions statistically impossible.' },
    ],
    relatedSlugs: ['password-generator', 'qr-generator', 'base64', 'json-formatter'],
  },
  'text-case': {
    title: 'Text Case Converter - Change Text Case Online | Filoza',
    description: 'Convert text between uppercase, lowercase, title case, sentence case, and more online. Paste your text and transform it instantly.',
    privacyMode: 'local',
    supportedFormats: 'N/A (text input/output)',
    faq: [
      { question: 'What case options are available?', answer: 'Uppercase, lowercase, title case, sentence case, and more.' },
    ],
    relatedSlugs: ['word-counter', 'password-generator', 'base64', 'json-formatter'],
  },
  'timestamp': {
    title: 'Timestamp Converter - Convert Unix Timestamps to Dates | Filoza',
    description: 'Convert Unix timestamps to human-readable dates and vice versa. Useful for developers working with epoch time.',
    privacyMode: 'local',
    supportedFormats: 'Unix timestamp ↔ Date',
    faq: [
      { question: 'What is a Unix timestamp?', answer: 'A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (UTC). It is widely used in programming and databases.' },
    ],
    relatedSlugs: ['uuid-generator', 'json-formatter', 'base64', 'unit-converter'],
  },
  'unit-converter': {
    title: 'Unit Converter - Convert Length, Weight & Temperature Online | Filoza',
    description: 'Convert between units of length, weight, temperature, and more online. Supports metric and imperial units.',
    privacyMode: 'local',
    supportedFormats: 'Length, Weight, Temperature, Volume',
    faq: [
      { question: 'What unit categories are supported?', answer: 'Length, weight, temperature, volume, and more common measurement categories.' },
    ],
    relatedSlugs: ['percentage-calculator', 'timestamp', 'word-counter', 'json-formatter'],
  },
  'percentage-calculator': {
    title: 'Percentage Calculator - Calculate Percentages Online | Filoza',
    description: 'Calculate percentage increases, decreases, and differences online. A quick math tool for everyday calculations.',
    privacyMode: 'local',
    supportedFormats: 'N/A (numeric input/output)',
    faq: [
      { question: 'What calculations are supported?', answer: 'You can calculate what percentage one number is of another, find percentage increases/decreases, and more.' },
    ],
    relatedSlugs: ['unit-converter', 'timestamp', 'word-counter', 'json-formatter'],
  },

  // ─── ARCHIVE TOOLS ─────────────────────────────────────────────
  'zip-creator': {
    title: 'ZIP Creator - Create ZIP Archives Online | Filoza',
    description: 'Create ZIP archives from multiple files online. Combine files into a single .zip download. All processing happens locally in your browser.',
    privacyMode: 'local',
    supportedFormats: 'Any files → ZIP',
    faq: [
      { question: 'Is there a file size limit?', answer: 'There is no strict limit, but very large files may be slower to process depending on your device and browser.' },
      { question: 'Are my files uploaded?', answer: 'No. Files are packaged into a ZIP archive entirely within your browser.' },
    ],
    relatedSlugs: ['zip-extractor', 'rar-extractor', 'image-compressor', 'bulk-image-compressor'],
  },
  'zip-extractor': {
    title: 'ZIP Extractor - Extract ZIP Files Online | Filoza',
    description: 'Extract and browse the contents of ZIP archives online. View files and download individually or all at once. Processed locally in your browser.',
    privacyMode: 'local',
    supportedFormats: 'ZIP',
    faq: [
      { question: 'Can I preview files before downloading?', answer: 'Yes. You can browse the archive contents and download individual files or the entire archive.' },
      { question: 'Are my files uploaded to a server?', answer: 'No. ZIP extraction happens entirely in your browser. Your files never leave your device.' },
    ],
    relatedSlugs: ['zip-creator', 'rar-extractor', 'image-compressor', 'pdf-merge'],
  },
  'rar-extractor': {
    title: 'RAR Extractor - Extract RAR Files Online | Filoza',
    description: 'Extract files from RAR archives online. Browse and download contents without installing software. Processed locally in your browser.',
    privacyMode: 'local',
    supportedFormats: 'RAR',
    faq: [
      { question: 'Does this support password-protected RAR files?', answer: 'Support for password-protected archives depends on the underlying library. Try extracting to check.' },
      { question: 'Are my files uploaded?', answer: 'No. RAR extraction happens in your browser using WebAssembly. Your files stay on your device.' },
    ],
    relatedSlugs: ['zip-extractor', 'zip-creator', 'image-compressor', 'pdf-merge'],
  },

  // ─── FILE TRANSFER ─────────────────────────────────────────────
  'file-transfer': {
    title: 'Large File Transfer - Send Files Securely Online | Filoza',
    description: 'Send large files securely with encrypted, self-destructing download links. Set passwords and expiration dates. Files are encrypted before upload.',
    privacyMode: 'upload',
    supportedFormats: 'Any file type (up to 300 MB)',
    faq: [
      { question: 'Are my files secure?', answer: 'Files are encrypted in your browser before upload and stored in a private bucket. Download links expire automatically after your chosen time period.' },
      { question: 'What is the maximum file size?', answer: 'The maximum transfer size is 300 MB total across all files.' },
      { question: 'Can I password-protect the transfer?', answer: 'Yes. You can set an optional password that recipients must enter to download the files.' },
    ],
    relatedSlugs: ['zip-creator', 'zip-extractor', 'image-compressor', 'pdf-compress'],
  },
};

/**
 * Generate JSON-LD structured data for a tool page.
 */
export function generateToolJsonLd(slug: string, toolName: string) {
  const seo = toolSeo[slug];
  if (!seo) return [];

  const url = `${BASE_URL}/${slug}`;

  const schemas: Record<string, unknown>[] = [];

  // WebApplication schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': toolName,
    'url': url,
    'description': seo.description,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'browserRequirements': 'Requires a modern web browser with JavaScript enabled',
  });

  // BreadcrumbList schema
  const categoryMap: Record<string, { name: string; href: string }> = {
    'image-compressor': { name: 'Image Tools', href: '/image-tools' },
    'image-resizer': { name: 'Image Tools', href: '/image-tools' },
    'image-cropper': { name: 'Image Tools', href: '/image-tools' },
    'jpg-to-png': { name: 'Image Tools', href: '/image-tools' },
    'png-to-jpg': { name: 'Image Tools', href: '/image-tools' },
    'webp-converter': { name: 'Image Tools', href: '/image-tools' },
    'image-converter': { name: 'Image Tools', href: '/image-tools' },
    'bulk-image-compressor': { name: 'Image Tools', href: '/image-tools' },
    'rotate-image': { name: 'Image Tools', href: '/image-tools' },
    'flip-image': { name: 'Image Tools', href: '/image-tools' },
    'grayscale-image': { name: 'Image Tools', href: '/image-tools' },
    'blur-image': { name: 'Image Tools', href: '/image-tools' },
    'favicon-generator': { name: 'Image Tools', href: '/image-tools' },
    'background-remover': { name: 'Image Tools', href: '/image-tools' },
    'svg-to-png': { name: 'Image Tools', href: '/image-tools' },
    'image-watermark': { name: 'Image Tools', href: '/image-tools' },
    'pdf-merge': { name: 'PDF Tools', href: '/pdf-tools' },
    'pdf-split': { name: 'PDF Tools', href: '/pdf-tools' },
    'pdf-compress': { name: 'PDF Tools', href: '/pdf-tools' },
    'pdf-rotate': { name: 'PDF Tools', href: '/pdf-tools' },
    'pdf-page-delete': { name: 'PDF Tools', href: '/pdf-tools' },
    'pdf-page-extract': { name: 'PDF Tools', href: '/pdf-tools' },
    'pdf-watermark': { name: 'PDF Tools', href: '/pdf-tools' },
    'image-to-pdf': { name: 'PDF Tools', href: '/pdf-tools' },
    'pdf-to-images': { name: 'PDF Tools', href: '/pdf-tools' },
    'text-to-pdf': { name: 'PDF Tools', href: '/pdf-tools' },
    'pdf-page-numbers': { name: 'PDF Tools', href: '/pdf-tools' },
    'pdf-metadata': { name: 'PDF Tools', href: '/pdf-tools' },
    'wav-to-mp3': { name: 'Audio Tools', href: '/audio-tools' },
    'mp3-to-wav': { name: 'Audio Tools', href: '/audio-tools' },
    'audio-compressor': { name: 'Audio Tools', href: '/audio-tools' },
    'audio-converter': { name: 'Audio Tools', href: '/audio-tools' },
    'audio-cutter': { name: 'Audio Tools', href: '/audio-tools' },
    'audio-volume': { name: 'Audio Tools', href: '/audio-tools' },
    'word-to-pdf': { name: 'Document Tools', href: '/documents' },
    'word-to-text': { name: 'Document Tools', href: '/documents' },
    'docx-to-html': { name: 'Document Tools', href: '/documents' },
    'word-to-images': { name: 'Document Tools', href: '/documents' },
    'pdf-to-word': { name: 'Document Tools', href: '/documents' },
    'excel-to-csv': { name: 'Document Tools', href: '/documents' },
    'csv-to-excel': { name: 'Document Tools', href: '/documents' },
    'spreadsheet-to-json': { name: 'Document Tools', href: '/documents' },
    'json-to-csv': { name: 'Document Tools', href: '/documents' },
    'excel-to-pdf': { name: 'Document Tools', href: '/documents' },
    'csv-to-pdf': { name: 'Document Tools', href: '/documents' },
    'markdown-to-html': { name: 'Document Tools', href: '/documents' },
    'markdown-to-pdf': { name: 'Document Tools', href: '/documents' },
    'html-to-pdf': { name: 'Document Tools', href: '/documents' },
    'txt-to-pdf': { name: 'Document Tools', href: '/documents' },
    'txt-to-docx': { name: 'Document Tools', href: '/documents' },
    'exif-remover': { name: 'Utilities', href: '/tools' },
    'qr-generator': { name: 'Utilities', href: '/tools' },
    'password-generator': { name: 'Utilities', href: '/tools' },
    'word-counter': { name: 'Utilities', href: '/tools' },
    'json-formatter': { name: 'Utilities', href: '/tools' },
    'color-picker': { name: 'Utilities', href: '/tools' },
    'base64': { name: 'Utilities', href: '/tools' },
    'uuid-generator': { name: 'Utilities', href: '/tools' },
    'text-case': { name: 'Utilities', href: '/tools' },
    'timestamp': { name: 'Utilities', href: '/tools' },
    'unit-converter': { name: 'Utilities', href: '/tools' },
    'percentage-calculator': { name: 'Utilities', href: '/tools' },
    'zip-creator': { name: 'Archive Tools', href: '/archive' },
    'zip-extractor': { name: 'Archive Tools', href: '/archive' },
    'rar-extractor': { name: 'Archive Tools', href: '/archive' },
    'file-transfer': { name: 'File Transfer', href: '/file-transfer' },
  };

  const cat = categoryMap[slug];
  if (cat) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
        { '@type': 'ListItem', 'position': 2, 'name': cat.name, 'item': `${BASE_URL}${cat.href}` },
        { '@type': 'ListItem', 'position': 3, 'name': toolName, 'item': url },
      ],
    });
  }

  // FAQPage schema (only if there are 2+ FAQs)
  if (seo.faq.length >= 2) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': seo.faq.map(f => ({
        '@type': 'Question',
        'name': f.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.answer,
        },
      })),
    });
  }

  return schemas;
}

/**
 * Generate JSON-LD for a category page.
 */
export function generateCategoryJsonLd(slug: string, categoryName: string, toolNames: { name: string; href: string }[]) {
  const seo = categorySeo[slug];
  if (!seo) return [];

  const schemas: Record<string, unknown>[] = [];

  // CollectionPage schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': categoryName,
    'url': seo.canonical,
    'description': seo.description,
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': toolNames.map((tool, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'name': tool.name,
        'url': `${BASE_URL}${tool.href}`,
      })),
    },
  });

  // BreadcrumbList
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL },
      { '@type': 'ListItem', 'position': 2, 'name': categoryName, 'item': seo.canonical },
    ],
  });

  return schemas;
}
