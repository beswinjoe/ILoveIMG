import Link from "next/link";
import { Metadata } from "next";
import { FilePlus2, FileArchive, Shrink, FileImage, ImageDown, RotateCw, FileUp, ArrowRight, FileText, Trash, Droplets } from "lucide-react";

export const metadata: Metadata = {
  title: "PDF Tools - Free Browser PDF Processing | FileFlow",
  description: "Merge, split, compress and manage PDF files directly in your browser.",
};

export default function PdfToolsPage() {
  const tools = [
    {
      name: "Merge PDF",
      description: "Combine multiple PDFs into one unified document.",
      href: "/pdf-merge",
      icon: <FilePlus2 size={20} className="text-danger" />,
    },
    {
      name: "Split PDF",
      description: "Extract specific pages or separate a PDF into multiple files.",
      href: "/pdf-split",
      icon: <FileArchive size={20} className="text-danger" />,
    },
    {
      name: "Compress PDF",
      description: "Reduce file size of your PDFs for easy sharing.",
      href: "/pdf-compress",
      icon: <Shrink size={20} className="text-danger" />,
    },
    {
      name: "PDF to Images",
      description: "Extract each page of your PDF as a separate image.",
      href: "/pdf-to-images",
      icon: <ImageDown size={20} className="text-danger" />,
    },
    {
      name: "Images to PDF",
      description: "Convert a collection of images into a single PDF.",
      href: "/image-to-pdf",
      icon: <FileImage size={20} className="text-danger" />,
    },
    {
      name: "Rotate PDF",
      description: "Rotate individual PDF pages or the entire document.",
      href: "/pdf-rotate",
      icon: <RotateCw size={20} className="text-danger" />,
    },
    {
      name: "Extract Pages",
      description: "Pull specific pages out to form a new PDF.",
      href: "/pdf-page-extract",
      icon: <FileUp size={20} className="text-danger" />,
    },
    {
      name: "Delete Pages",
      description: "Remove unwanted pages from your PDF file.",
      href: "/pdf-page-delete",
      icon: <Trash size={20} className="text-danger" />,
    },
    {
      name: "Watermark PDF",
      description: "Add a text or image watermark to your PDF pages.",
      href: "/pdf-watermark",
      icon: <Droplets size={20} className="text-danger" />,
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
          color: 'var(--danger)', marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <FileText size={28} />
        </div>
        <h1 style={{ fontSize: "clamp(3rem, 5vw, 4rem)", marginBottom: "1rem", letterSpacing: '-0.02em', fontWeight: 800 }}>PDF Tools</h1>
        <p className="text-muted" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
          Merge, split, compress and manage PDF files directly in your browser.
        </p>
      </div>

      {/* Tools Grid */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>Popular PDF Tools</h2>
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
