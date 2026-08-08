import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ToolLayoutProps {
  title: string;
  description: string;
  breadcrumbs: { label: string; href: string }[];
  children: React.ReactNode;
  faq?: { question: string; answer: string }[];
  relatedTools?: { name: string; href: string; icon: React.ReactNode }[];
}

export default function ToolLayout({ title, description, breadcrumbs, children, faq, relatedTools }: ToolLayoutProps) {
  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight size={14} />
            <Link 
              href={crumb.href} 
              className={idx === breadcrumbs.length - 1 ? "text-foreground font-medium pointer-events-none" : "hover:text-primary transition-colors"}
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

      {/* Ad Container */}
      <div className="ad-container max-w-4xl mx-auto">Advertisement Space</div>

      {/* Privacy Guarantee */}
      <div className="glass-card max-w-4xl mx-auto mb-16 text-center">
        <h3 className="mb-2">Your files stay on your device</h3>
        <p className="text-muted">
          We use advanced browser technologies to process your files locally. 
          Your data is never uploaded to our servers, guaranteeing 100% privacy and lightning-fast speed.
        </p>
      </div>

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="mb-6" style={{ fontSize: "1.75rem" }}>Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faq.map((item, idx) => (
              <div key={idx} className="glass-card p-6" style={{ padding: "1.5rem" }}>
                <h4 className="mb-2" style={{ fontSize: "1.125rem" }}>{item.question}</h4>
                <p className="text-muted">{item.answer}</p>
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
