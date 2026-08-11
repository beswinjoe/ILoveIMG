import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  FileImage, 
  FileText,
  Music,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Archive,
  Send
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
      <section className="container py-12" id="popular">
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem', fontWeight: 800 }}>Popular Tools</h2>
          <p className="text-muted" style={{ fontSize: '1rem' }}>The essential utilities you need every day.</p>
        </div>

        <div className="category-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {toolsData
            .filter(t => ['Image Compressor', 'Image Resizer', 'JPG to PNG', 'Merge PDF', 'Compress PDF', 'WAV to MP3'].includes(t.name))
            .map((tool) => (
            <Link prefetch={false} key={tool.href} href={tool.href} className="glass-card tool-card" style={{ height: '100%' }}>
              <div className="icon-container" style={{ 
                color: tool.category === 'PDF Tools' ? 'var(--danger)' : 
                       tool.category === 'Audio Tools' ? 'var(--success)' : 
                       'var(--primary)' 
              }}>
                {React.cloneElement(tool.icon as React.ReactElement<{ size?: number; style?: React.CSSProperties }>, { size: 24 })}
              </div>
              <h3 style={{ fontSize: '1.125rem', margin: '0.5rem 0 0 0' }}>{tool.name}</h3>
              <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0, lineHeight: 1.5 }}>{tool.description}</p>
              <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto', paddingTop: '1rem' }}>
                Open Tool <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 
        ========================================
        ADVERTISEMENT
        ======================================== 
      */}
      <div className="container py-8">
        <div className="ad-container" style={{ border: '1px dashed var(--border)', backgroundColor: 'var(--surface)', backdropFilter: 'var(--glass-blur)', borderRadius: '16px' }}>Advertisement Space</div>
      </div>

      {/* 
        ========================================
        ALL CATEGORIES
        ======================================== 
      */}
      <section className="container py-12">
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem', fontWeight: 800 }}>All Categories</h2>
          <p className="text-muted" style={{ fontSize: '1rem' }}>Tools organized by file type.</p>
        </div>

        <div className="category-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {/* Image Tools */}
          <Link prefetch={false} href="/image-tools" className="glass-card tool-card" style={{ height: '100%' }}>
            <div className="icon-container" style={{ color: 'var(--primary)' }}>
              <FileImage size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', margin: '0.5rem 0 0 0', fontWeight: 700 }}>Image Tools</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0, lineHeight: 1.5 }}>Compress, resize, crop, and convert.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto', paddingTop: '1rem' }}>
              View Image Tools <ArrowRight size={14} />
            </div>
          </Link>

          {/* PDF Tools */}
          <Link prefetch={false} href="/pdf-tools" className="glass-card tool-card" style={{ height: '100%' }}>
            <div className="icon-container" style={{ color: 'var(--danger)' }}>
              <FileText size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', margin: '0.5rem 0 0 0', fontWeight: 700 }}>PDF Tools</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0, lineHeight: 1.5 }}>Merge, split, rotate, and extract.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto', paddingTop: '1rem' }}>
              View PDF Tools <ArrowRight size={14} />
            </div>
          </Link>

          {/* Audio Tools */}
          <Link prefetch={false} href="/audio-tools" className="glass-card tool-card" style={{ height: '100%' }}>
            <div className="icon-container" style={{ color: 'var(--success)' }}>
              <Music size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', margin: '0.5rem 0 0 0', fontWeight: 700 }}>Audio Tools</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0, lineHeight: 1.5 }}>Convert, cut, and adjust volume.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto', paddingTop: '1rem' }}>
              View Audio Tools <ArrowRight size={14} />
            </div>
          </Link>

          {/* Documents */}
          <Link prefetch={false} href="/documents" className="glass-card tool-card" style={{ height: '100%' }}>
            <div className="icon-container" style={{ color: 'var(--secondary)' }}>
              <FileText size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', margin: '0.5rem 0 0 0', fontWeight: 700 }}>Documents</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0, lineHeight: 1.5 }}>Word, Excel, CSV, and Markdown converters.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto', paddingTop: '1rem' }}>
              View Documents <ArrowRight size={14} />
            </div>
          </Link>

          {/* Other Utilities */}
          <Link prefetch={false} href="/tools" className="glass-card tool-card" style={{ height: '100%' }}>
            <div className="icon-container" style={{ color: 'var(--primary)' }}>
              <Wrench size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', margin: '0.5rem 0 0 0', fontWeight: 700 }}>Other Utilities</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0, lineHeight: 1.5 }}>QR codes, passwords, JSON formatting.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto', paddingTop: '1rem' }}>
              View Utilities <ArrowRight size={14} />
            </div>
          </Link>

          {/* Archive */}
          <Link prefetch={false} href="/archive" className="glass-card tool-card" style={{ height: '100%' }}>
            <div className="icon-container" style={{ color: 'var(--primary)' }}>
              <Archive size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', margin: '0.5rem 0 0 0', fontWeight: 700 }}>Archive Tools</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0, lineHeight: 1.5 }}>Create and extract ZIP & RAR files.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto', paddingTop: '1rem' }}>
              View Archive Tools <ArrowRight size={14} />
            </div>
          </Link>

          {/* File Transfer */}
          <Link prefetch={false} href="/file-transfer" className="glass-card tool-card" style={{ height: '100%' }}>
            <div className="icon-container" style={{ color: 'var(--success)' }}>
              <Send size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', margin: '0.5rem 0 0 0', fontWeight: 700 }}>File Transfer</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0, lineHeight: 1.5 }}>Send large files with secure links.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto', paddingTop: '1rem' }}>
              View Transfer <ArrowRight size={14} />
            </div>
          </Link>

        </div>
      </section>

    </div>
  );
}
