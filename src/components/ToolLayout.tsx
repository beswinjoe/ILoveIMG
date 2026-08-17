import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import AdBanner from "@/components/AdBanner";

interface ToolLayoutProps {
  title: string;
  description: string;
  breadcrumbs: { label: string; href: string }[];
  children: React.ReactNode;
  howItWorks?: string[];
  supportedFormats?: string;
  faq?: { question: string; answer: string }[];
  relatedTools?: { name: string; href: string; icon: React.ReactNode }[];
  /** Controls the privacy section text. Defaults to 'local'. */
  privacyMode?: 'local' | 'upload';
}

export default function ToolLayout({ title, description, breadcrumbs, children, howItWorks, supportedFormats, faq, relatedTools, privacyMode = 'local' }: ToolLayoutProps) {
  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight size={14} />
            <Link 
              href={crumb.href} 
              className={idx === breadcrumbs.length - 1 ? "text-foreground font-medium pointer-events-none" : "hover:text-primary transition-colors"}
              aria-current={idx === breadcrumbs.length - 1 ? "page" : undefined}
            >
              {crumb.label}
            </Link>
          </React.Fragment>
        ))}
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="mb-4" style={{ fontSize: "2.5rem" }}>{title}</h1>
        <p className="text-muted max-w-2xl mx-auto" style={{ fontSize: "1.125rem" }}>{description}</p>
      </div>

      {/* Main Tool Area */}
      <div className="mb-16">
        {children}
      </div>

      {/* Ad Banner */}
      <div className="max-w-4xl mx-auto">
        <AdBanner />
      </div>

      {/* How it works */}
      {howItWorks && howItWorks.length > 0 && (
        <section className="max-w-4xl mx-auto mb-16 p-8 glass-card">
          <h2 className="mb-6" style={{ fontSize: "1.75rem" }}>How it works</h2>
          <ol style={{ paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }} className="text-muted">
            {howItWorks.map((step, idx) => (
              <li key={idx} style={{ fontSize: "1.125rem" }}>{step}</li>
            ))}
          </ol>
        </section>
      )}

      {/* Supported formats */}
      {supportedFormats && (
        <section className="max-w-4xl mx-auto mb-16 p-8 glass-card text-center">
          <h2 className="mb-4" style={{ fontSize: "1.75rem" }}>Supported Formats</h2>
          <p className="text-muted" style={{ fontSize: "1.125rem" }}>{supportedFormats}</p>
        </section>
      )}

      {/* Privacy / Security */}
      <div className="glass-card max-w-4xl mx-auto mb-16 text-center p-8">
        {privacyMode === 'local' ? (
          <>
            <h3 className="mb-2" style={{ fontSize: "1.5rem" }}>Processed in your browser</h3>
            <p className="text-muted" style={{ fontSize: "1.125rem" }}>
              This tool uses browser technologies to process your files locally on your device. 
              Your files are not uploaded to any server.
            </p>
          </>
        ) : (
          <>
            <h3 className="mb-2" style={{ fontSize: "1.5rem" }}>Encrypted file transfer</h3>
            <p className="text-muted" style={{ fontSize: "1.125rem" }}>
              Files are encrypted in your browser before being uploaded to our secure storage. 
              Download links are time-limited and automatically expire. You can also set a password for additional protection.
            </p>
          </>
        )}
      </div>

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="mb-6" style={{ fontSize: "1.75rem" }}>Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faq.map((item, idx) => (
              <div key={idx} className="glass-card p-6" style={{ padding: "1.5rem" }}>
                <h3 className="mb-2" style={{ fontSize: "1.125rem" }}>{item.question}</h3>
                <p className="text-muted" style={{ fontSize: "1.125rem" }}>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools */}
      {relatedTools && relatedTools.length > 0 && (
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="mb-6" style={{ fontSize: "1.75rem" }}>Related Tools</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(250px, 100%), 1fr))", gap: "1rem" }}>
            {relatedTools.map((tool, idx) => (
              <Link key={idx} href={tool.href} className="glass-card flex items-center gap-4 hover:border-primary transition-colors">
                <div className="text-primary">{tool.icon}</div>
                <span className="font-medium">{tool.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
