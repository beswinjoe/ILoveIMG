import Link from "next/link";
import { Metadata } from "next";
import { Maximize, Minimize, Crop, Repeat, Layers, ArrowRight, FileImage, Copy } from "lucide-react";

export const metadata: Metadata = {
  title: "Image Tools - Free Browser Image Processing | FileFlow",
  description: "Compress, resize, crop, and convert images quickly and privately in your browser.",
};

export default function ImageToolsPage() {
  const tools = [
    {
      name: "Image Compressor",
      description: "Compress JPG, PNG, or WebP while preserving quality.",
      href: "/image-compressor",
      icon: <Minimize size={20} className="text-primary" />,
    },
    {
      name: "Image Resizer",
      description: "Resize images to your exact dimensions.",
      href: "/image-resizer",
      icon: <Maximize size={20} className="text-primary" />,
    },
    {
      name: "JPG to PNG",
      description: "Convert JPG to transparent PNG format.",
      href: "/jpg-to-png",
      icon: <Copy size={20} className="text-primary" />,
    },
    {
      name: "PNG to JPG",
      description: "Convert PNG to optimized JPG.",
      href: "/png-to-jpg",
      icon: <Copy size={20} className="text-primary" />,
    },
    {
      name: "WebP Converter",
      description: "Convert between WebP and other formats.",
      href: "/webp-converter",
      icon: <Repeat size={20} className="text-primary" />,
    },
    {
      name: "Image Cropper",
      description: "Crop photos easily in your browser.",
      href: "/image-cropper",
      icon: <Crop size={20} className="text-primary" />,
    },
    {
      name: "Image Converter",
      description: "Universal image format converter.",
      href: "/image-converter",
      icon: <Repeat size={20} className="text-primary" />,
    },
    {
      name: "Bulk Image Compressor",
      description: "Compress multiple images at once.",
      href: "/bulk-image-compressor",
      icon: <Layers size={20} className="text-primary" />,
    },
  ];

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      
      {/* Category Hero */}
      <div style={{ paddingTop: '80px', paddingBottom: '40px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          display: 'inline-flex', alignItems: 'center', justifyItems: 'center', 
          padding: '0.75rem', borderRadius: '16px', 
          backgroundColor: 'var(--surface)', border: '1px solid var(--border)',
          color: 'var(--primary)', marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <FileImage size={28} />
        </div>
        <h1 style={{ fontSize: "clamp(3rem, 5vw, 4rem)", marginBottom: "1rem", letterSpacing: '-0.02em', fontWeight: 800 }}>Image Tools</h1>
        <p className="text-muted" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
          Compress, resize, crop, and convert images quickly and privately in your browser.
        </p>
      </div>

      {/* Tools Grid */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>Popular Image Tools</h2>
      </div>

      <div className="category-grid sm:grid-cols-2 lg:grid-cols-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', marginBottom: '4rem' }}>
        {tools.map((tool, idx) => (
          <Link href={tool.href} key={idx} className="glass-card flex flex-col gap-3" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
            <div className="flex items-center gap-3 mb-1">
              <div style={{ 
                padding: '0.5rem', borderRadius: '12px', 
                backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' 
              }}>
                {tool.icon}
              </div>
              <h3 style={{ fontSize: "1.125rem", margin: 0 }}>{tool.name}</h3>
            </div>
            <p className="text-muted text-sm flex-1" style={{ margin: 0 }}>{tool.description}</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
              Open Tool <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      {/* Ad Container */}
      <div className="ad-container" style={{ border: '1px dashed var(--border)', backgroundColor: 'var(--surface)', borderRadius: '16px', maxWidth: '800px', margin: '0 auto' }}>
        Advertisement Space
      </div>
    </div>
  );
}
