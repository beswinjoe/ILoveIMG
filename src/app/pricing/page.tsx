import { Metadata } from "next";
import { CheckCircle2, Zap, Shield, Infinity as InfinityIcon } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Premium - FileFlow",
  description: "Upgrade to FileFlow Premium for unlimited, faster, and ad-free access to all our tools.",
};

export default function PricingPage() {
  return (
    <div className="container py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="mb-4" style={{ fontSize: "3rem" }}>Upgrade to FileFlow Premium</h1>
        <p className="text-muted max-w-2xl mx-auto" style={{ fontSize: "1.25rem" }}>
          Get the most out of your files with faster processing, ad-free experience, and unlimited access to all features.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        
        {/* Free Plan */}
        <div className="glass-card border border-border p-8 flex flex-col">
          <h2 className="text-2xl mb-2">Free</h2>
          <p className="text-muted mb-6">Perfect for occasional use.</p>
          <div className="text-4xl font-bold mb-8">$0<span className="text-lg text-muted font-normal"> / forever</span></div>
          
          <ul className="flex flex-col gap-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-muted"><CheckCircle2 size={20} className="text-primary"/> Access to all basic tools</li>
            <li className="flex items-center gap-3 text-muted"><CheckCircle2 size={20} className="text-primary"/> Standard processing speed</li>
            <li className="flex items-center gap-3 text-muted"><CheckCircle2 size={20} className="text-primary"/> Contains ads</li>
            <li className="flex items-center gap-3 text-muted"><CheckCircle2 size={20} className="text-primary"/> Standard file size limits</li>
          </ul>

          <Link href="/" className="btn btn-secondary w-full text-center block">
            Continue with Free
          </Link>
        </div>

        {/* Premium Plan */}
        <div className="glass-card border-2 border-primary p-8 flex flex-col relative shadow-[0_0_40px_-15px_rgba(59,130,246,0.3)]">
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            Most Popular
          </div>
          
          <h2 className="text-2xl mb-2 flex items-center gap-2"><Zap className="text-primary"/> Premium</h2>
          <p className="text-muted mb-6">For power users and professionals.</p>
          <div className="text-4xl font-bold mb-8">$6.99<span className="text-lg text-muted font-normal"> / month</span></div>
          
          <ul className="flex flex-col gap-4 mb-8 flex-1">
            <li className="flex items-center gap-3 font-medium"><CheckCircle2 size={20} className="text-primary"/> Unlimited access to all tools</li>
            <li className="flex items-center gap-3 font-medium"><InfinityIcon size={20} className="text-primary"/> No file size limits</li>
            <li className="flex items-center gap-3 font-medium"><Shield size={20} className="text-primary"/> Completely Ad-Free</li>
            <li className="flex items-center gap-3 font-medium"><Zap size={20} className="text-primary"/> Priority processing speed</li>
            <li className="flex items-center gap-3 font-medium"><CheckCircle2 size={20} className="text-primary"/> Priority customer support</li>
          </ul>

          <button className="btn btn-primary w-full shadow-lg hover:shadow-primary/25 transition-all">
            Get Premium
          </button>
        </div>

      </div>

      <div className="text-center max-w-2xl mx-auto">
        <h3 className="mb-4">Questions about Premium?</h3>
        <p className="text-muted mb-6">
          FileFlow is committed to keeping the core tools free for everyone. Our premium plan helps support development and server costs while providing power users with the features they need.
        </p>
        <Link href="/contact" className="text-primary hover:underline">Contact our support team</Link>
      </div>
    </div>
  );
}
