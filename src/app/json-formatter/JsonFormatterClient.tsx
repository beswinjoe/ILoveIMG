"use client";

import React, { useState } from "react";
import { Braces, Copy, Trash2, CheckCircle2, AlertCircle, AlignLeft, Check } from "lucide-react";
export default function JsonFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState(2);
  const formatJSON = () => {
    if (!input.trim()) {
      setError("Please enter some JSON to format.");
      setOutput("");
      return;
    }
    try {
      // First parse to validate
      const parsed = JSON.parse(input);
      // Then stringify with indent
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      setOutput("");
    }
  };
  const minifyJSON = () => {
    if (!input.trim()) {
      setError("Please enter some JSON to minify.");
      setOutput("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      setOutput("");
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
  return <>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 h-full min-h-[600px]">
        
        {/* Input Area */}
        <div className="flex-1 flex flex-col glass-card p-0 overflow-hidden border border-border">
          <div className="flex justify-between items-center p-4 bg-surface border-b border-border">
            <h3 className="flex items-center gap-2 m-0 text-sm font-medium"><AlignLeft size={16} /> Input JSON</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Indent:</span>
                <select className="bg-background border border-border rounded text-xs p-1" value={indent} onChange={e => setIndent(Number(e.target.value))}>
                  <option value={2}>2 Spaces</option>
                  <option value={4}>4 Spaces</option>
                </select>
              </div>
              <button onClick={clearAll} className="btn btn-secondary py-1 px-3 text-xs flex items-center gap-1 hover:bg-danger/10 hover:text-danger hover:border-danger/30" disabled={!input && !output}>
                <Trash2 size={14} /> Clear
              </button>
            </div>
          </div>
          
          <textarea className="w-full h-[500px] p-4 bg-background resize-none focus:outline-none focus:ring-0 border-none font-mono text-sm leading-relaxed" placeholder='{"paste": "your JSON here"}' value={input} onChange={e => setInput(e.target.value)} spellCheck={false}></textarea>

          <div className="p-4 bg-surface border-t border-border flex gap-3 justify-center">
            <button className="btn btn-primary w-full max-w-[200px]" onClick={formatJSON}>
              <Braces size={16} /> Format JSON
            </button>
            <button className="btn btn-secondary w-full max-w-[200px]" onClick={minifyJSON}>
              Minify JSON
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div className="flex-1 flex flex-col glass-card p-0 overflow-hidden border border-border">
          <div className="flex justify-between items-center p-4 bg-surface border-b border-border">
            <h3 className="flex items-center gap-2 m-0 text-sm font-medium"><Check size={16} /> Result</h3>
            <button onClick={copyToClipboard} className="btn btn-primary py-1 px-3 text-xs flex items-center gap-1" disabled={!output}>
              {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />} 
              {copied ? "Copied!" : "Copy Output"}
            </button>
          </div>
          
          {error ? <div className="h-[500px] p-6 bg-danger/10 text-danger flex flex-col gap-3 font-mono text-sm border-b border-border">
              <div className="flex items-center gap-2 font-bold mb-2">
                <AlertCircle size={18} /> Error parsing JSON
              </div>
              <p>{error}</p>
            </div> : <textarea className="w-full h-[500px] p-4 bg-foreground/5 text-foreground resize-none focus:outline-none focus:ring-0 border-none font-mono text-sm leading-relaxed border-b border-border" placeholder="Formatted output will appear here..." value={output} readOnly spellCheck={false}></textarea>}

          <div className="p-4 bg-surface text-center text-xs text-muted">
            {error ? "Invalid JSON" : output ? "Valid JSON" : "Waiting for input..."}
          </div>
        </div>

      </div>
    </>;
}