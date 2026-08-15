"use client";

import React, { useState } from "react";
import { CaseSensitive, Copy, Trash2, CheckCircle2, Type } from "lucide-react";
export default function TextCaseClient() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const toSentenceCase = () => {
    const result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
    setText(result);
  };
  const toLowerCase = () => {
    setText(text.toLowerCase());
  };
  const toUpperCase = () => {
    setText(text.toUpperCase());
  };
  const toTitleCase = () => {
    const result = text.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
    setText(result);
  };
  const toCamelCase = () => {
    const result = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
    setText(result);
  };
  const toPascalCase = () => {
    const result = text.replace(/\w\S*/g, m => m.charAt(0).toUpperCase() + m.substr(1).toLowerCase()).replace(/\s+/g, '');
    setText(result);
  };
  const toSnakeCase = () => {
    const result = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || '';
    setText(result);
  };
  const toKebabCase = () => {
    const result = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || '';
    setText(result);
  };
  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const clearText = () => {
    setText("");
  };
  return <>
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        
        {/* Actions */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button className="btn btn-secondary text-sm py-2 px-4" onClick={toSentenceCase} disabled={!text}>Sentence case</button>
          <button className="btn btn-secondary text-sm py-2 px-4" onClick={toLowerCase} disabled={!text}>lower case</button>
          <button className="btn btn-secondary text-sm py-2 px-4" onClick={toUpperCase} disabled={!text}>UPPER CASE</button>
          <button className="btn btn-secondary text-sm py-2 px-4" onClick={toTitleCase} disabled={!text}>Title Case</button>
          <button className="btn btn-secondary text-sm py-2 px-4" onClick={toCamelCase} disabled={!text}>camelCase</button>
          <button className="btn btn-secondary text-sm py-2 px-4" onClick={toPascalCase} disabled={!text}>PascalCase</button>
          <button className="btn btn-secondary text-sm py-2 px-4" onClick={toSnakeCase} disabled={!text}>snake_case</button>
          <button className="btn btn-secondary text-sm py-2 px-4" onClick={toKebabCase} disabled={!text}>kebab-case</button>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col glass-card p-0 overflow-hidden border border-border">
          <div className="flex justify-between items-center p-4 bg-surface border-b border-border">
            <h3 className="flex items-center gap-2 m-0 text-sm font-medium"><Type size={16} /> Text Editor</h3>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="btn btn-primary py-1 px-3 text-xs flex items-center gap-1" disabled={!text}>
                {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />} 
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={clearText} className="btn btn-secondary py-1 px-3 text-xs flex items-center gap-1 hover:bg-danger/10 hover:text-danger hover:border-danger/30" disabled={!text}>
                <Trash2 size={14} /> Clear
              </button>
            </div>
          </div>
          
          <textarea className="w-full h-full min-h-[400px] p-6 bg-background resize-none focus:outline-none focus:ring-0 border-none text-base" placeholder="Type or paste your text here..." value={text} onChange={e => setText(e.target.value)}></textarea>
        </div>

      </div>
    </>;
}