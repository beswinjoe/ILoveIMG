"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, Menu, X } from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import { ThemeToggle } from './ThemeToggle';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "Images", href: "/image-tools" },
    { label: "PDFs", href: "/pdf-tools" },
    { label: "Audio", href: "/audio-tools" },
    { label: "Utilities", href: "/tools" }
  ];

  return (
    <>
      <header style={{ 
        position: 'sticky', 
        top: '16px', 
        zIndex: 1000, 
        width: '100%', 
        padding: '0 1.5rem', 
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <div 
          className="navbar-glass"
          style={{ 
            pointerEvents: 'auto', 
            borderRadius: '30px',
            maxWidth: '1400px',
            width: '100%',
            height: '72px',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            padding: '0 1.5rem'
          }}
        >
          {/* LEFT: Logo */}
          <div style={{ justifySelf: 'start', display: 'flex' }}>
            <Link href="/" className="flex items-center gap-2 logo-link" style={{ textDecoration: 'none' }}>
              <div className="flex items-center justify-center" style={{ 
                width: '32px', height: '32px', borderRadius: '10px', color: 'var(--primary)', 
                backgroundColor: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)' 
              }}>
                <Layers size={18} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--foreground)' }}>
                FileFlow
              </span>
            </Link>
          </div>

          {/* CENTER: Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-8" style={{ justifySelf: 'center' }}>
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="nav-link"
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: pathname === link.href ? 600 : 500,
                  color: pathname === link.href ? 'var(--foreground)' : 'var(--muted)',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT: Search + Theme (Desktop) */}
          <div className="hidden md:flex items-center gap-3" style={{ justifySelf: 'end' }}>
            <CommandPalette />
            <ThemeToggle />
          </div>

          {/* Mobile Right Side */}
          <div className="flex md:hidden items-center gap-2" style={{ justifySelf: 'end' }}>
            <ThemeToggle />
            <button 
              className="flex items-center justify-center mobile-menu-btn"
              style={{ padding: '0.5rem', color: 'var(--foreground)', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '50%' }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{ 
          position: 'fixed', inset: 0, zIndex: 1000, 
          backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', 
          display: 'flex', justifyContent: 'flex-end',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{ 
            width: '280px', height: '100%', 
            backgroundColor: 'var(--background)', 
            borderLeft: '1px solid var(--border)', 
            padding: '1.5rem', display: 'flex', flexDirection: 'column',
            boxShadow: '-10px 0 40px rgba(0,0,0,0.1)'
          }}>
            <div className="flex justify-between items-center mb-6">
              <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--foreground)' }}>Menu</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.5rem', background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6 pointer-events-auto">
              <CommandPalette isMobile />
            </div>
            
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ 
                    fontSize: '1.125rem', padding: '0.75rem 1rem', 
                    borderRadius: '12px',
                    textDecoration: 'none',
                    backgroundColor: pathname === link.href ? 'var(--surface-hover)' : 'transparent',
                    fontWeight: pathname === link.href ? 600 : 500,
                    color: pathname === link.href ? 'var(--foreground)' : 'var(--muted)'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
