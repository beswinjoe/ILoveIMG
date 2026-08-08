import Link from 'next/link';
import { 
  FileImage, 
  FileText,
  Music,
  Wrench,
  ShieldCheck,
  Zap,
  ArrowRight,
  Maximize,
  ImageDown,
  Repeat,
  Copy,
  FilePlus2,
  FileArchive,
  Shrink,
  RotateCw,
  FileUp,
  ArrowRightLeft,
  Volume2,
  Scissors
} from 'lucide-react';

export default function Home() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      
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
          backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)', borderRadius: '24px',
          animation: 'float 6s ease-in-out infinite' 
        }}>
          <FileImage size={32} style={{ color: 'var(--primary)', opacity: 0.9 }} />
        </div>
        
        <div className="hidden md:flex items-center justify-center" style={{ 
          position: 'absolute', bottom: '20%', right: '10%', width: '90px', height: '90px', 
          backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)', borderRadius: '28px',
          animation: 'float 7s ease-in-out infinite 1s' 
        }}>
          <Music size={36} style={{ color: 'var(--success)', opacity: 0.9 }} />
        </div>

        <div className="hidden md:flex items-center justify-center" style={{ 
          position: 'absolute', top: '25%', right: '15%', width: '70px', height: '70px', 
          backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)', borderRadius: '20px',
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
            padding: 0.6rem; border-radius: 14px; background-color: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.2);
          }
          [data-theme='dark'] .tool-card .icon-container {
             background-color: rgba(255,255,255,0.05);
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
            All Your Tools.<br />
            <span style={{ color: 'var(--primary)' }}>One Smart Platform.</span>
          </h1>
          
          <p style={{ margin: '0 auto 2.5rem', maxWidth: '600px', fontSize: '1.125rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Image, PDF, audio and more tools to boost your productivity. Fast, private and works right in your browser.
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
          <Link href="/image-compressor" className="glass-card tool-card">
            <div className="icon-container"><ImageDown size={20} style={{ color: 'var(--primary)' }} /></div>
            <h3 style={{ fontSize: '1.125rem', margin: 0 }}>Image Compressor</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0 }}>Shrink file size of JPG, PNG, WebP while keeping quality.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Compress Image <ArrowRight size={14} /></div>
          </Link>
          
          <Link href="/image-resizer" className="glass-card tool-card">
            <div className="icon-container"><Maximize size={20} style={{ color: 'var(--primary)' }} /></div>
            <h3 style={{ fontSize: '1.125rem', margin: 0 }}>Image Resizer</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0 }}>Resize images exactly to your needed dimensions.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Resize Image <ArrowRight size={14} /></div>
          </Link>

          <Link href="/jpg-to-png" className="glass-card tool-card">
            <div className="icon-container"><Copy size={20} style={{ color: 'var(--primary)' }} /></div>
            <h3 style={{ fontSize: '1.125rem', margin: 0 }}>JPG to PNG</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0 }}>Easily convert your JPEG files to PNG format.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Convert JPG <ArrowRight size={14} /></div>
          </Link>

          <Link href="/pdf-merge" className="glass-card tool-card">
            <div className="icon-container"><FilePlus2 size={20} className="text-danger" /></div>
            <h3 style={{ fontSize: '1.125rem', margin: 0 }}>Merge PDF</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0 }}>Combine multiple PDFs into one document.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Merge PDF <ArrowRight size={14} /></div>
          </Link>

          <Link href="/pdf-compress" className="glass-card tool-card">
            <div className="icon-container"><Shrink size={20} className="text-danger" /></div>
            <h3 style={{ fontSize: '1.125rem', margin: 0 }}>Compress PDF</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0 }}>Reduce file size of your PDFs for easy sharing.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Compress PDF <ArrowRight size={14} /></div>
          </Link>

          <Link href="/wav-to-mp3" className="glass-card tool-card">
            <div className="icon-container"><ArrowRightLeft size={20} className="text-success" /></div>
            <h3 style={{ fontSize: '1.125rem', margin: 0 }}>WAV to MP3</h3>
            <p className="text-muted text-sm" style={{ flexGrow: 1, margin: 0 }}>Convert uncompressed WAV audio to MP3.</p>
            <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Convert Audio <ArrowRight size={14} /></div>
          </Link>
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
        
        <div className="category-grid sm:grid-cols-2 lg:grid-cols-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))' }}>
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
