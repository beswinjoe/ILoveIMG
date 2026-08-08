import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - FileFlow",
  description: "Learn how FileFlow protects your privacy and data.",
};

export default function PrivacyPage() {
  return (
    <div className="container py-16 max-w-4xl">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl">Privacy Policy</h1>
        <p className="text-muted">Last updated: August 2026</p>
      </div>

      <div className="prose prose-invert max-w-none text-foreground/80 space-y-8">
        
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
          <p>
            At FileFlow, we take your privacy very seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
          <p>
            The core philosophy of FileFlow is <strong>local processing</strong>. For the vast majority of our tools, your files are processed directly within your web browser and are <strong>never</strong> uploaded to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. Local Browser Processing</h2>
          <p>
            Tools involving Image, PDF, and Audio manipulation utilize WebAssembly and HTML5 technologies to run complex operations directly on your device. 
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Your files do not leave your device.</li>
            <li>We do not store, view, or retain copies of the files you process.</li>
            <li>Processing speed depends on your local hardware rather than your internet connection.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data We Collect</h2>
          <p>We may collect non-personally identifiable information automatically when you visit the site, including:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Analytics Data:</strong> We use industry-standard analytics tools to understand how users interact with our website (e.g., pages visited, time spent, browser type). This data is aggregated and anonymized.</li>
            <li><strong>Cookies:</strong> We may use cookies to store your preferences (such as dark mode settings or recently used tools) and to serve personalized advertisements.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Third-Party Services and Advertising</h2>
          <p>
            To keep FileFlow free, we display advertisements provided by third-party networks (such as Google AdSense). These third parties may use cookies and web beacons to collect information about your activities on this and other websites to provide you targeted advertising based upon your interests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:privacy@fileflow.com" className="text-primary hover:underline">privacy@fileflow.com</a>.
          </p>
        </section>
        
      </div>
    </div>
  );
}
