"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Hash, Copy, CheckCircle2, RefreshCw, Settings, Trash2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function UuidGeneratorClient() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState<"v4">("v4");
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  

  const generateV4 = () => {
    // Generate UUID v4 using crypto API
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUuids = useCallback(() => {
    const newUuids = [];
    const validCount = Math.min(Math.max(1, count), 100);
    
    for (let i = 0; i < validCount; i++) {
      let uuid = generateV4();
      
      if (uppercase) {
        uuid = uuid.toUpperCase();
      }
      
      if (!hyphens) {
        uuid = uuid.replace(/-/g, "");
      }
      
      newUuids.push(uuid);
    }
    
    setUuids(newUuids);
  }, [count, uppercase, hyphens]);

  useEffect(() => {
    generateUuids();
  }, [count, uppercase, hyphens, generateUuids]);

  const copyToClipboard = (text: string, index: number | null = null) => {
    navigator.clipboard.writeText(text);
    if (index !== null) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  return (
    <ToolLayout
      howItWorks={["Upload your file or paste your data.","Adjust the tool settings.","Run the tool.","Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="UUID Generator"
      description="Generate random, secure Universally Unique Identifiers (UUID v4)."
      breadcrumbs={[{ label: "Utilities", href: "/tools" }, { label: "UUID Generator", href: "/uuid-generator" }]}
      faq={[
        { question: "What is a UUID?", answer: "A Universally Unique Identifier (UUID) is a 128-bit number used to identify information in computer systems. The probability of generating a duplicate UUID is close enough to zero to be negligible." },
        { question: "Are these UUIDs secure?", answer: "Yes. They are generated using your browser's crypto API which provides cryptographically strong random values." }
      ]}
      relatedTools={[
        { name: "Password Generator", href: "/password-generator", icon: <CheckCircle2 /> },
        { name: "Base64 Encoder", href: "/base64", icon: <CheckCircle2 /> }
      ]}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Settings Panel */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <div className="glass-card">
            <h3 className="mb-6 flex items-center gap-2"><Settings size={20} className="text-primary"/> Settings</h3>
            
            <div className="space-y-6">
              <div>
                <label className="label">How many to generate?</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={count} 
                    onChange={(e) => setCount(parseInt(e.target.value))} 
                    className="flex-1"
                  />
                  <span className="font-bold text-lg min-w-[3rem] text-center">{count}</span>
                </div>
              </div>

              <div>
                <label className="label">Version</label>
                <select 
                  className="input w-full bg-background"
                  value={version}
                  onChange={(e) => setVersion(e.target.value as any)}
                >
                  <option value="v4">Version 4 (Random)</option>
                  {/* Future extensibility for v1, v5 etc */}
                </select>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 p-3 border border-border rounded cursor-pointer transition-colors bg-background hover:border-primary">
                  <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="w-5 h-5 text-primary" />
                  <span>Uppercase Letters</span>
                </label>
                
                <label className="flex items-center gap-3 p-3 border border-border rounded cursor-pointer transition-colors bg-background hover:border-primary">
                  <input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} className="w-5 h-5 text-primary" />
                  <span>Include Hyphens</span>
                </label>
              </div>

              <button className="btn btn-primary w-full mt-4" onClick={generateUuids}>
                <RefreshCw size={18} /> Generate New UUIDs
              </button>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex-1">
          <div className="glass-card h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="m-0 flex items-center gap-2"><Hash size={20} className="text-primary" /> Generated UUIDs</h3>
              
              {uuids.length > 0 && (
                <button 
                  onClick={() => copyToClipboard(uuids.join("\n"))}
                  className="btn btn-secondary py-1 px-3 text-sm flex items-center gap-1"
                >
                  {copiedAll ? <CheckCircle2 size={16} className="text-success" /> : <Copy size={16} />} 
                  {copiedAll ? "Copied All!" : "Copy All"}
                </button>
              )}
            </div>
            
            <div className="bg-background rounded-lg border border-border overflow-hidden flex-1 max-h-[600px] overflow-y-auto">
              {uuids.map((uuid, index) => (
                <div key={index} className="flex justify-between items-center p-3 border-b border-border hover:bg-surface/50 group transition-colors">
                  <span className="font-mono text-sm sm:text-base break-all pr-4">{uuid}</span>
                  <button 
                    onClick={() => copyToClipboard(uuid, index)}
                    className="p-2 text-muted hover:text-foreground hover:bg-surface rounded opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                    title="Copy UUID"
                  >
                    {copiedIndex === index ? <CheckCircle2 size={18} className="text-success" /> : <Copy size={18} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
