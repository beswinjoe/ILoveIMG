"use client";

import React, { useState, useEffect } from "react";
import { Type, Copy, Trash2, CheckCircle2, AlignLeft, BarChart2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function WordCounterClient() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const calculateStats = (str: string) => {
    const trimmed = str.trim();
    
    // Words
    const wordsMatch = trimmed.match(/\b[-?(\w+)?]+\b/gi);
    const words = wordsMatch ? wordsMatch.length : 0;
    
    // Characters
    const characters = str.length;
    
    // Characters (No Spaces)
    const charactersNoSpaces = str.replace(/\s+/g, '').length;
    
    // Sentences
    const sentencesMatch = trimmed.match(/[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/g);
    const sentences = sentencesMatch ? sentencesMatch.length : 0;
    
    // Paragraphs
    const paragraphsMatch = trimmed.split(/\n+/).filter(p => p.trim().length > 0);
    const paragraphs = paragraphsMatch.length;
    
    // Reading Time (Avg 200 words per minute)
    const readingTimeMinutes = words / 200;
    const readingTimeSeconds = Math.ceil(readingTimeMinutes * 60);

    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime: readingTimeSeconds
    });
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

  const formatReadingTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} sec`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  };

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs in your text instantly."
      breadcrumbs={[{ label: "Utilities", href: "/tools" }, { label: "Word Counter", href: "/word-counter" }]}
      faq={[
        { question: "Is my text saved?", answer: "No. The text you enter is processed entirely in your browser and is never sent to our servers." },
        { question: "How is reading time calculated?", answer: "Reading time is based on an average reading speed of 200 words per minute." }
      ]}
      relatedTools={[
        { name: "Text Case Converter", href: "/text-case", icon: <CheckCircle2 /> },
        { name: "JSON Formatter", href: "/json-formatter", icon: <CheckCircle2 /> }
      ]}
    >
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* Editor Area */}
        <div className="flex-1 flex flex-col glass-card p-0 overflow-hidden border border-border">
          <div className="flex justify-between items-center p-4 bg-surface border-b border-border">
            <h3 className="flex items-center gap-2 m-0 text-sm font-medium"><AlignLeft size={16} /> Text Editor</h3>
            <div className="flex gap-2">
              <button 
                onClick={copyToClipboard}
                className="btn btn-secondary py-1 px-3 text-xs flex items-center gap-1"
                disabled={!text}
              >
                {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />} 
                {copied ? "Copied!" : "Copy"}
              </button>
              <button 
                onClick={clearText}
                className="btn btn-secondary py-1 px-3 text-xs flex items-center gap-1 hover:bg-danger/10 hover:text-danger hover:border-danger/30"
                disabled={!text}
              >
                <Trash2 size={14} /> Clear
              </button>
            </div>
          </div>
          
          <textarea
            className="w-full h-full min-h-[400px] p-6 bg-background resize-none focus:outline-none focus:ring-0 border-none text-base"
            placeholder="Type or paste your text here to see real-time statistics..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        {/* Stats Panel */}
        <div className="lg:w-80 flex flex-col gap-4">
          <div className="glass-card border border-border">
            <h3 className="mb-6 flex items-center gap-2 text-lg"><BarChart2 size={20} className="text-primary" /> Statistics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-lg border border-border flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-foreground">{stats.words}</span>
                <span className="text-xs text-muted uppercase tracking-wider font-semibold mt-1">Words</span>
              </div>
              
              <div className="bg-background p-4 rounded-lg border border-border flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-foreground">{stats.characters}</span>
                <span className="text-xs text-muted uppercase tracking-wider font-semibold mt-1">Characters</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted">Characters (no spaces)</span>
                <span className="font-medium">{stats.charactersNoSpaces}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted">Sentences</span>
                <span className="font-medium">{stats.sentences}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted">Paragraphs</span>
                <span className="font-medium">{stats.paragraphs}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted">Reading Time</span>
                <span className="font-medium">{formatReadingTime(stats.readingTime)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
