import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Archive } from "lucide-react";
import { toolsData } from "@/lib/tools";
import { categorySeo, generateCategoryJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Archive Tools - Extract & Create ZIP, RAR Online | Filoza",
  description: "Free online archive tools to create and extract ZIP and RAR files. All processing happens locally in your browser — no files are uploaded.",
  alternates: {
    canonical: "https://filoza.vercel.app/archive"
  },
  openGraph: {
    title: "Archive Tools - Extract & Create ZIP, RAR Online | Filoza",
    description: "Free online archive tools to create and extract ZIP and RAR files. All processing happens locally in your browser — no files are uploaded.",
    url: "https://filoza.vercel.app/archive",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Archive Tools - Extract & Create ZIP, RAR Online | Filoza",
    description: "Free online archive tools to create and extract ZIP and RAR files. All processing happens locally in your browser — no files are uploaded.",
  }
};

export default function ArchivePage() {
  const tools = toolsData.filter(t => t.category === "Archive");
  const seo = categorySeo['archive'];
  const jsonLd = generateCategoryJsonLd('archive', 'Archive Tools', tools.map(t => ({ name: t.name, href: t.href })));

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      
      <div style={{ paddingTop: '80px', paddingBottom: '40px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          display: 'inline-flex', alignItems: 'center', justifyItems: 'center', 
          padding: '0.75rem', borderRadius: '16px', 
          backgroundColor: 'var(--surface)', border: '1px solid var(--border)',
          color: 'var(--primary)', marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Archive size={28} />
        </div>
        <h1 style={{ fontSize: "clamp(3rem, 5vw, 4rem)", marginBottom: "1rem", letterSpacing: '-0.02em', fontWeight: 800 }}>Archive Tools</h1>
        <p className="text-muted" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
          Create and extract ZIP and RAR archive files — all processed locally in your browser.
        </p>
      </div>

      <div className="category-grid sm:grid-cols-2 lg:grid-cols-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', marginBottom: '4rem' }}>
        {tools.map((tool, idx) => (
          <Link prefetch={false} href={tool.href} key={idx} className="glass-card flex flex-col gap-3" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
            <div className="flex items-center gap-3 mb-1">
              <div style={{ 
                padding: '0.5rem', borderRadius: '12px', 
                backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' 
              }}>
                {React.cloneElement(tool.icon as React.ReactElement<{ size?: number; style?: React.CSSProperties }>, { size: 20, style: { color: 'var(--primary)' } })}
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

      {seo && (
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Related Categories</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {seo.relatedCategories.map((cat, idx) => (
              <Link key={idx} href={cat.href} className="glass-card flex items-center gap-2" style={{ padding: '0.75rem 1.25rem', textDecoration: 'none', color: 'inherit' }}>
                <span className="font-medium">{cat.label}</span>
                <ArrowRight size={14} className="text-primary" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
