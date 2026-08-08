import Link from "next/link";
import { Metadata } from "next";
import { QrCode, KeyRound, Braces, AlignLeft, Palette, Code, Hash, Type, Clock, Scale, Percent, Wrench, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Other Utilities - Free Browser Tools | FileFlow",
  description: "Useful everyday tools for text, data, calculations and more.",
};

export default function UtilitiesPage() {
  const tools = [
    {
      name: "QR Code Generator",
      description: "Generate customized QR codes from text or URLs.",
      href: "/qr-generator",
      icon: <QrCode size={20} className="text-secondary" />,
    },
    {
      name: "Password Generator",
      description: "Create strong, secure, randomized passwords instantly.",
      href: "/password-generator",
      icon: <KeyRound size={20} className="text-secondary" />,
    },
    {
      name: "JSON Formatter",
      description: "Format, validate, and beautify your JSON data.",
      href: "/json-formatter",
      icon: <Braces size={20} className="text-secondary" />,
    },
    {
      name: "Word Counter",
      description: "Count words, characters, and sentences in your text.",
      href: "/word-counter",
      icon: <AlignLeft size={20} className="text-secondary" />,
    },
    {
      name: "Color Picker",
      description: "Pick colors and convert between HEX, RGB, and HSL.",
      href: "/color-picker",
      icon: <Palette size={20} className="text-secondary" />,
    },
    {
      name: "Base64 Encoder",
      description: "Encode and decode text or files to Base64 format.",
      href: "/base64",
      icon: <Code size={20} className="text-secondary" />,
    },
    {
      name: "UUID Generator",
      description: "Generate unique random UUIDs (v4) for your projects.",
      href: "/uuid-generator",
      icon: <Hash size={20} className="text-secondary" />,
    },
    {
      name: "Text Case Converter",
      description: "Convert text to uppercase, lowercase, title case, and more.",
      href: "/text-case",
      icon: <Type size={20} className="text-secondary" />,
    },
    {
      name: "Timestamp Converter",
      description: "Convert Unix timestamps to human-readable dates.",
      href: "/timestamp",
      icon: <Clock size={20} className="text-secondary" />,
    },
    {
      name: "Unit Converter",
      description: "Convert between various units of measurement.",
      href: "/unit-converter",
      icon: <Scale size={20} className="text-secondary" />,
    },
    {
      name: "Percentage Calculator",
      description: "Calculate percentage increases, decreases, and differences.",
      href: "/percentage-calculator",
      icon: <Percent size={20} className="text-secondary" />,
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
          color: 'var(--secondary)', marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Wrench size={28} />
        </div>
        <h1 style={{ fontSize: "clamp(3rem, 5vw, 4rem)", marginBottom: "1rem", letterSpacing: '-0.02em', fontWeight: 800 }}>Other Utilities</h1>
        <p className="text-muted" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
          Useful everyday tools for text, data, calculations and more.
        </p>
      </div>

      {/* Tools Grid */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>Popular Utilities</h2>
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
