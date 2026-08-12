import Link from 'next/link';
import { Layers } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', backgroundColor: 'rgba(255, 255, 255, 0.4)', marginTop: 'auto', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <div className="container py-16">
        <div className="footer-grid">
          
          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column' }}>
            <Link href="/" className="flex items-center gap-2 mb-4" style={{ textDecoration: 'none' }}>
              <div className="flex items-center justify-center bg-primary" style={{ width: '32px', height: '32px', borderRadius: '8px', color: 'white', background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
                <Layers size={18} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--foreground)' }}>
                Filoza
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              70+ free online tools for images, PDFs, documents, audio, and more — all in one place. Fast, private, and works right in your browser.
            </p>
          </div>
          
          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 className="font-semibold text-foreground mb-2">Categories</h4>
            <Link href="/image-tools" className="text-muted hover:text-primary transition-colors text-sm">Image Tools</Link>
            <Link href="/pdf-tools" className="text-muted hover:text-primary transition-colors text-sm">PDF Tools</Link>
            <Link href="/documents" className="text-muted hover:text-primary transition-colors text-sm">Document Tools</Link>
            <Link href="/audio-tools" className="text-muted hover:text-primary transition-colors text-sm">Audio Tools</Link>
            <Link href="/archive" className="text-muted hover:text-primary transition-colors text-sm">Archive Tools</Link>
            <Link href="/file-transfer" className="text-muted hover:text-primary transition-colors text-sm">File Transfer</Link>
            <Link href="/tools" className="text-muted hover:text-primary transition-colors text-sm">Utilities</Link>
          </div>
          
          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 className="font-semibold text-foreground mb-2">Popular Tools</h4>
            <Link href="/image-compressor" className="text-muted hover:text-primary transition-colors text-sm">Image Compressor</Link>
            <Link href="/image-converter" className="text-muted hover:text-primary transition-colors text-sm">Image Converter</Link>
            <Link href="/pdf-merge" className="text-muted hover:text-primary transition-colors text-sm">Merge PDF</Link>
            <Link href="/pdf-compress" className="text-muted hover:text-primary transition-colors text-sm">Compress PDF</Link>
            <Link href="/word-to-pdf" className="text-muted hover:text-primary transition-colors text-sm">Word to PDF</Link>
            <Link href="/zip-extractor" className="text-muted hover:text-primary transition-colors text-sm">ZIP Extractor</Link>
            <Link href="/background-remover" className="text-muted hover:text-primary transition-colors text-sm">Background Remover</Link>
          </div>

          <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 className="font-semibold text-foreground mb-2">Legal</h4>
            <Link href="/privacy" className="text-muted hover:text-primary transition-colors text-sm">Privacy Policy</Link>
          </div>

        </div>
        
        <div className="mt-16 pt-8 text-center text-sm text-muted" style={{ borderTop: '1px solid var(--border)' }}>
          &copy; {new Date().getFullYear()} Filoza. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
