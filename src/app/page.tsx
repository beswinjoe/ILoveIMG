import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  FileImage, 
  FileText,
  Music,
  Wrench,
  ShieldCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { toolsData } from '@/lib/tools';

export const metadata: Metadata = {
  title: "Free Online File Tools – Image, PDF, Audio & More | Filoza",
  description: "Free online tools to compress, convert, resize and edit images, PDFs, documents and audio. Fast, private and easy to use with no signup.",
  openGraph: {
    title: "Free Online File Tools – Image, PDF, Audio & More | Filoza",
    description: "Free online tools to compress, convert, resize and edit images, PDFs, documents and audio.",
    url: "https://filoza.vercel.app/",
    type: "website",
    siteName: "Filoza",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online File Tools – Image, PDF, Audio & More | Filoza",
    description: "Free online tools to compress, convert, resize and edit images, PDFs, documents and audio.",
  }
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Filoza",
    "url": "https://filoza.vercel.app/"
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 
        ========================================
        HERO SECTION
        ======================================== 
      */}
      <section style={{ 
        paddingTop: '6rem', 
        paddingBottom: '4rem', 
        display: 'flex', 
        alignItems: 'center', 
        position: 'relative' 
      }}>
        
        {/* Floating Decorators */}
        <div className="hidden md:flex items-center justify-center" style={{ 
          position: 'absolute', top: '15%', left: '8%', width: '80px', height: '80px', 
          backgroundColor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.6)', borderRadius: '24px',
          animation: 'float 6s ease-in-out infinite' 
        }}>
          <FileImage size={32} style={{ color: 'var(--primary)', opacity: 0.9 }} />
        </div>
        
        <div className="hidden md:flex items-center justify-center" style={{ 
          position: 'absolute', bottom: '20%', right: '10%', width: '90px', height: '90px', 
          backgroundColor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.6)', borderRadius: '28px',
          animation: 'float 7s ease-in-out infinite 1s' 
        }}>
          <Music size={36} style={{ color: 'var(--success)', opacity: 0.9 }} />
        </div>

        <div className="hidden md:flex items-center justify-center" style={{ 
          position: 'absolute', top: '25%', right: '15%', width: '70px', height: '70px', 
          backgroundColor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.6)', borderRadius: '20px',
          animation: 'float 5s ease-in-out infinite 0.5s' 
        }}>
          <FileText size={28} style={{ color: 'var(--danger)', opacity: 0.9 }} />
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
          .tool-card {
            display: flex; flex-direction: column; align-items: flex-start; gap: 0.75rem; cursor: pointer; text-decoration: none; color: inherit;
          }
          .tool-card .icon-container {
            padding: 0.6rem; border-radius: 14px; background-color: rgba(255, 255, 255, 0.5); border: 1px solid rgba(255, 255, 255, 0.6);
          }
        `}} />

        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px' }}>
          
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 1rem', 
            marginBottom: '2rem', fontSize: '0.875rem', fontWeight: 600, 
            backgroundColor: 'var(--surface)', border: '1px solid var(--border)', 
            borderRadius: '100px', color: 'var(--muted)', backdropFilter: 'blur(10px)'
          }}>
            <ShieldCheck size={16} className="text-success" />
            100% Free • No Signup • Privacy First
          </div>
          
          <h1 style={{ margin: '0 auto 1.5rem', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1, fontWeight: 800 }}>
            Free Online <span style={{ color: 'var(--primary)' }}>File Tools</span>
          </h1>
          
          <p style={{ margin: '0 auto 2.5rem', maxWidth: '600px', fontSize: '1.125rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Images, PDFs, documents, audio and more. Fast, private and works right in your browser.
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Link href="#popular" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1.125rem', borderRadius: '100px', fontWeight: 600 }}>
              Explore Tools
            </Link>
            <Link href="/tools" className="btn" style={{ padding: '0.875rem 2rem', fontSize: '1.125rem', borderRadius: '100px', fontWeight: 600, backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              View All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        POPULAR TOOLS
        ======================================== 
      */}
      <section id="popular" className="container py-12">
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Popular Tools</h2>
          <p className="text-muted">The essential utilities you need every day.</p>
        </div>

        <div className="category-grid">
          {["/image-compressor", "/image-resizer", "/jpg-to-png", "/pdf-merge", "/pdf-compress", "/wav-to-mp3"].map((route) => {
            const tool = toolsData.find(t => t.href === route);
            if (!tool) return null;
            return (
              <Link key={tool.href} href={tool.href} className="glass-card tool-card">
                <div className="icon-container" style={{ color: tool.category === 'PDF Tools' ? 'var(--danger)' : tool.category === 'Audio Tools' ? 'var(--success)' : 'var(--primary)' }}>
                  {React.cloneElement(tool.icon as React.ReactElement<{ size?: number; style?: React.CSSProperties }>, { size: 20 })}
                </div>
                <h3 style={{ fontSize: '1.125rem', margin: 0 }}>{tool.name}</h3>
                <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0 }}>{tool.description}</p>
                <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Open Tool <ArrowRight size={14} /></div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 
        ========================================
        ADVERTISEMENT 1
        ======================================== 
      */}
      <div className="container py-8">
        <div className="ad-container" style={{ border: '1px dashed var(--border)', backgroundColor: 'var(--surface)', backdropFilter: 'var(--glass-blur)', borderRadius: '16px' }}>Advertisement Space</div>
      </div>

      {/* 
        ========================================
        CATEGORIES
        ======================================== 
      */}
      <section className="container py-12">
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>All Categories</h2>
          <p className="text-muted">Tools organized by file type.</p>
        </div>
        
        <div className="category-grid">
          <Link href="/image-tools" className="glass-card tool-card">
            <div className="icon-container"><FileImage size={24} style={{ color: 'var(--primary)' }} /></div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Image Tools</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0 }}>Compress, resize, crop, and convert.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>View Image Tools <ArrowRight size={14} /></div>
          </Link>
          <Link href="/pdf-tools" className="glass-card tool-card">
            <div className="icon-container"><FileText size={24} style={{ color: 'var(--danger)' }} /></div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>PDF Tools</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0 }}>Merge, split, rotate, and extract.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>View PDF Tools <ArrowRight size={14} /></div>
          </Link>
          <Link href="/audio-tools" className="glass-card tool-card">
            <div className="icon-container"><Music size={24} style={{ color: 'var(--success)' }} /></div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Audio Tools</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0 }}>Convert, cut, and adjust volume.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>View Audio Tools <ArrowRight size={14} /></div>
          </Link>
          <Link href="/tools" className="glass-card tool-card">
            <div className="icon-container"><Wrench size={24} style={{ color: 'var(--secondary)' }} /></div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Other Utilities</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0 }}>QR codes, passwords, JSON formatting.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>View Utilities <ArrowRight size={14} /></div>
          </Link>
        </div>
      </section>

    </div>
  );
}
