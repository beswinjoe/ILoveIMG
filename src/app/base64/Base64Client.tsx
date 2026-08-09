"use client";

import React, { useState } from "react";
import { Hash, Copy, Trash2, CheckCircle2, ArrowDownUp } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function Base64Client() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processText = (text: string, currentMode: "encode" | "decode") => {
    setInput(text);
    if (!text.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      if (currentMode === "encode") {
        // btoa works with ASCII. For UTF-8, we need a small workaround
        const utf8Bytes = new TextEncoder().encode(text);
        const binString = Array.from(utf8Bytes, (byte) => String.fromCodePoint(byte)).join("");
        setOutput(btoa(binString));
      } else {
        const binString = atob(text.trim());
        const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
        setOutput(new TextDecoder().decode(bytes));
      }
      setError(null);
    } catch (e: any) {
      setOutput("");
      setError(currentMode === "decode" ? "Invalid Base64 string." : e.message);
    }
  };

  const toggleMode = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    setMode(newMode);
    
    // If we have output, swap it to input for smooth UX
    if (output && !error) {
      processText(output, newMode);
    } else {
      processText(input, newMode);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <ToolLayout
      howItWorks={["Upload your file or paste your data.","Adjust the tool settings.","Run the tool.","Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="Base64 Encoder/Decoder"
      description="Easily encode text to Base64 or decode Base64 back to text instantly."
      breadcrumbs={[{ label: "Utilities", href: "/tools" }, { label: "Base64", href: "/base64" }]}
      faq={[
        { question: "Is my data secure?", answer: "Yes! All processing happens securely in your web browser. We never send your text to any server." },
        { question: "Does it support UTF-8?", answer: "Yes, this tool correctly handles UTF-8 characters (like emojis and special accents) during encoding and decoding." }
      ]}
      relatedTools={[
        { name: "JSON Formatter", href: "/json-formatter", icon: <CheckCircle2 /> },
        { name: "Text Case Converter", href: "/text-case", icon: <CheckCircle2 /> }
      ]}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-background border border-border rounded-lg p-1">
            <button 
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'encode' ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-foreground'}`}
              onClick={() => { setMode('encode'); processText(input, 'encode'); }}
            >
              Encode to Base64
            </button>
            <button 
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'decode' ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-foreground'}`}
              onClick={() => { setMode('decode'); processText(input, 'decode'); }}
            >
              Decode from Base64
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 h-[400px]">
          {/* Input Area */}
          <div className="flex-1 flex flex-col glass-card p-0 overflow-hidden border border-border">
            <div className="flex justify-between items-center p-4 bg-surface border-b border-border">
              <h3 className="m-0 text-sm font-medium">{mode === 'encode' ? 'Plain Text' : 'Base64 String'}</h3>
              <button 
                onClick={clearAll}
                className="btn btn-secondary py-1 px-3 text-xs flex items-center gap-1 hover:bg-danger/10 hover:text-danger hover:border-danger/30"
                disabled={!input && !output}
              >
                <Trash2 size={14} /> Clear
              </button>
            </div>
            
            <textarea
              className="w-full h-full p-4 bg-background resize-none focus:outline-none focus:ring-0 border-none font-mono text-sm leading-relaxed"
              placeholder={mode === 'encode' ? 'Type or paste plain text here...' : 'Paste Base64 string here...'}
              value={input}
              onChange={(e) => processText(e.target.value, mode)}
              spellCheck={false}
            ></textarea>
          </div>

          {/* Swap Button (Desktop) */}
          <div className="hidden lg:flex flex-col justify-center">
            <button 
              onClick={toggleMode}
              className="p-3 bg-surface border border-border rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all text-muted"
              title="Swap"
            >
              <ArrowDownUp size={20} className="rotate-90" />
            </button>
          </div>

          {/* Swap Button (Mobile) */}
          <div className="lg:hidden flex justify-center -my-3 z-10">
            <button 
              onClick={toggleMode}
              className="p-3 bg-surface border border-border rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all text-muted"
            >
              <ArrowDownUp size={20} />
            </button>
          </div>

          {/* Output Area */}
          <div className="flex-1 flex flex-col glass-card p-0 overflow-hidden border border-border">
            <div className="flex justify-between items-center p-4 bg-surface border-b border-border">
              <h3 className="m-0 text-sm font-medium">{mode === 'encode' ? 'Base64 Output' : 'Plain Text Output'}</h3>
              <button 
                onClick={copyToClipboard}
                className="btn btn-primary py-1 px-3 text-xs flex items-center gap-1"
                disabled={!output}
              >
                {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />} 
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            
            {error ? (
              <div className="h-full p-6 bg-danger/10 text-danger flex flex-col gap-3 font-mono text-sm">
                <p>{error}</p>
              </div>
            ) : (
              <textarea
                className="w-full h-full p-4 bg-foreground/5 text-foreground resize-none focus:outline-none focus:ring-0 border-none font-mono text-sm leading-relaxed"
                placeholder="Result will appear here..."
                value={output}
                readOnly
                spellCheck={false}
              ></textarea>
            )}
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
