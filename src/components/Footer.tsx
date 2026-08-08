import Link from 'next/link';
import { Layers } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--surface)', marginTop: 'auto', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)' }}>
      <div className="container py-16">
        <div className="flex justify-between flex-wrap gap-12">
          
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-4" style={{ textDecoration: 'none' }}>
              <div className="flex items-center justify-center bg-primary" style={{ width: '32px', height: '32px', borderRadius: '8px', color: 'white', background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
                <Layers size={18} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--foreground)' }}>
                FileFlow
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              All your files. One smart platform. Fast, private and easy-to-use tools for images, PDFs, audio and more — directly in your browser.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-16">
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-foreground mb-2">Tools</h4>
              <Link href="/image-tools" className="text-muted hover:text-primary transition-colors text-sm">Image Tools</Link>
              <Link href="/pdf-tools" className="text-muted hover:text-primary transition-colors text-sm">PDF Tools</Link>
              <Link href="/audio-tools" className="text-muted hover:text-primary transition-colors text-sm">Audio Tools</Link>
              <Link href="/tools" className="text-muted hover:text-primary transition-colors text-sm">Other Utilities</Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-foreground mb-2">Company</h4>
              <Link href="/" className="text-muted hover:text-primary transition-colors text-sm">About</Link>
              <Link href="/" className="text-muted hover:text-primary transition-colors text-sm">Blog</Link>
              <Link href="/" className="text-muted hover:text-primary transition-colors text-sm">FAQ</Link>
              <Link href="/" className="text-muted hover:text-primary transition-colors text-sm">Contact</Link>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-foreground mb-2">Legal</h4>
              <Link href="/privacy" className="text-muted hover:text-primary transition-colors text-sm">Privacy Policy</Link>
              <Link href="/" className="text-muted hover:text-primary transition-colors text-sm">Terms of Service</Link>
            </div>
          </div>

        </div>
        
        <div className="mt-16 pt-8 text-center text-sm text-muted" style={{ borderTop: '1px solid var(--border)' }}>
          &copy; {new Date().getFullYear()} FileFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
