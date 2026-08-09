"use client";

import React, { useState, useEffect } from "react";
import { Clock, Copy, CheckCircle2, RefreshCw } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function TimestampClient() {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
  
  // Convert Unix to Date
  const [unixInput, setUnixInput] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [dateOutput, setDateOutput] = useState<{ local: string, utc: string, iso: string } | null>(null);
  const [unixError, setUnixError] = useState(false);

  // Convert Date to Unix
  const [dateInput, setDateInput] = useState<string>(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  });
  const [unixOutputSeconds, setUnixOutputSeconds] = useState<number | null>(null);
  const [unixOutputMillis, setUnixOutputMillis] = useState<number | null>(null);

  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!unixInput.trim()) {
      setDateOutput(null);
      setUnixError(false);
      return;
    }
    
    let ts = Number(unixInput);
    if (isNaN(ts)) {
      setUnixError(true);
      setDateOutput(null);
      return;
    }

    // Heuristic: if timestamp is very large, assume it's in milliseconds
    if (ts > 9999999999) {
      // It's in milliseconds
    } else {
      ts = ts * 1000;
    }

    const d = new Date(ts);
    if (isNaN(d.getTime())) {
      setUnixError(true);
      setDateOutput(null);
    } else {
      setUnixError(false);
      setDateOutput({
        local: d.toLocaleString(),
        utc: d.toUTCString(),
        iso: d.toISOString()
      });
    }
  }, [unixInput]);

  useEffect(() => {
    if (!dateInput) {
      setUnixOutputSeconds(null);
      setUnixOutputMillis(null);
      return;
    }
    
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      setUnixOutputSeconds(null);
      setUnixOutputMillis(null);
    } else {
      setUnixOutputSeconds(Math.floor(d.getTime() / 1000));
      setUnixOutputMillis(d.getTime());
    }
  }, [dateInput]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolLayout
      howItWorks={["Upload your file or paste your data.","Adjust the tool settings.","Run the tool.","Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="Unix Timestamp Converter"
      description="Convert Unix timestamps to readable dates and vice versa. Supports seconds and milliseconds."
      breadcrumbs={[{ label: "Utilities", href: "/tools" }, { label: "Timestamp Converter", href: "/timestamp" }]}
      faq={[
        { question: "What is a Unix timestamp?", answer: "A Unix timestamp is a way to track time as a running total of seconds. This count starts at the Unix Epoch on January 1st, 1970 at UTC." },
        { question: "Does it support milliseconds?", answer: "Yes. If you input a large timestamp, it is automatically detected as milliseconds and converted appropriately." }
      ]}
      relatedTools={[
        { name: "Unit Converter", href: "/unit-converter", icon: <CheckCircle2 /> },
        { name: "JSON Formatter", href: "/json-formatter", icon: <CheckCircle2 /> }
      ]}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Current Time Widget */}
        <div className="glass-card flex flex-col items-center justify-center p-8 border border-primary/20 bg-primary/5">
          <p className="text-muted mb-2 font-medium">Current Unix Epoch Time</p>
          <div className="flex items-center gap-4">
            <span className="text-4xl sm:text-5xl font-mono font-bold text-primary tracking-wider">{currentTimestamp}</span>
            <button 
              onClick={() => copyToClipboard(currentTimestamp.toString())}
              className="p-2 bg-background border border-border rounded-md hover:bg-surface transition-colors"
              title="Copy"
            >
              {copied === currentTimestamp.toString() ? <CheckCircle2 size={20} className="text-success" /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Unix to Date */}
          <div className="glass-card flex flex-col h-full border border-border">
            <h3 className="flex items-center gap-2 mb-6"><Clock size={20} className="text-primary"/> Epoch to Date</h3>
            
            <div className="mb-6">
              <label className="label">Unix Timestamp (Seconds or Millis)</label>
              <input 
                type="text" 
                className="input w-full font-mono text-lg" 
                value={unixInput} 
                onChange={(e) => setUnixInput(e.target.value)}
                placeholder="e.g. 1672531200"
              />
              {unixError && <p className="text-danger text-sm mt-2">Invalid timestamp</p>}
            </div>

            <div className="flex-1 space-y-4">
              <div className="bg-background p-4 rounded border border-border group relative">
                <p className="text-xs text-muted mb-1 font-semibold uppercase tracking-wider">Local Time</p>
                <p className="font-medium text-lg">{dateOutput ? dateOutput.local : "---"}</p>
                {dateOutput && (
                  <button 
                    onClick={() => copyToClipboard(dateOutput.local)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                  >
                    {copied === dateOutput.local ? <CheckCircle2 size={16} className="text-success" /> : <Copy size={16} />}
                  </button>
                )}
              </div>
              <div className="bg-background p-4 rounded border border-border group relative">
                <p className="text-xs text-muted mb-1 font-semibold uppercase tracking-wider">UTC Time</p>
                <p className="font-medium text-lg">{dateOutput ? dateOutput.utc : "---"}</p>
                {dateOutput && (
                  <button 
                    onClick={() => copyToClipboard(dateOutput.utc)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                  >
                    {copied === dateOutput.utc ? <CheckCircle2 size={16} className="text-success" /> : <Copy size={16} />}
                  </button>
                )}
              </div>
              <div className="bg-background p-4 rounded border border-border group relative">
                <p className="text-xs text-muted mb-1 font-semibold uppercase tracking-wider">ISO 8601</p>
                <p className="font-mono text-base">{dateOutput ? dateOutput.iso : "---"}</p>
                {dateOutput && (
                  <button 
                    onClick={() => copyToClipboard(dateOutput.iso)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                  >
                    {copied === dateOutput.iso ? <CheckCircle2 size={16} className="text-success" /> : <Copy size={16} />}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Date to Unix */}
          <div className="glass-card flex flex-col h-full border border-border">
            <h3 className="flex items-center gap-2 mb-6"><RefreshCw size={20} className="text-primary"/> Date to Epoch</h3>
            
            <div className="mb-6">
              <label className="label">Local Date & Time</label>
              <input 
                type="datetime-local" 
                className="input w-full text-lg" 
                value={dateInput} 
                onChange={(e) => setDateInput(e.target.value)}
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="bg-background p-4 rounded border border-border group relative">
                <p className="text-xs text-muted mb-1 font-semibold uppercase tracking-wider">Timestamp in Seconds</p>
                <p className="font-mono text-lg font-bold">{unixOutputSeconds !== null ? unixOutputSeconds : "---"}</p>
                {unixOutputSeconds !== null && (
                  <button 
                    onClick={() => copyToClipboard(unixOutputSeconds.toString())}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                  >
                    {copied === unixOutputSeconds.toString() ? <CheckCircle2 size={16} className="text-success" /> : <Copy size={16} />}
                  </button>
                )}
              </div>
              <div className="bg-background p-4 rounded border border-border group relative">
                <p className="text-xs text-muted mb-1 font-semibold uppercase tracking-wider">Timestamp in Milliseconds</p>
                <p className="font-mono text-lg font-bold">{unixOutputMillis !== null ? unixOutputMillis : "---"}</p>
                {unixOutputMillis !== null && (
                  <button 
                    onClick={() => copyToClipboard(unixOutputMillis.toString())}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                  >
                    {copied === unixOutputMillis.toString() ? <CheckCircle2 size={16} className="text-success" /> : <Copy size={16} />}
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </ToolLayout>
  );
}
