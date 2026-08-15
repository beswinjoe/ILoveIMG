"use client";

import React, { useState, useEffect } from "react";
import { Key, Copy, CheckCircle2, RefreshCw, ShieldCheck, Settings } from "lucide-react";
export default function PasswordGeneratorClient() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState<{
    label: string;
    color: string;
    score: number;
  }>({
    label: "Strong",
    color: "text-success",
    score: 4
  });
  useEffect(() => {
    generatePassword();
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols]);
  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return {
      label: "Weak",
      color: "text-danger",
      score: 0
    };
    if (pwd.length > 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    if (score < 3) return {
      label: "Weak",
      color: "text-danger",
      score
    };
    if (score < 5) return {
      label: "Fair",
      color: "text-warning",
      score
    };
    if (score < 7) return {
      label: "Good",
      color: "text-primary",
      score
    };
    return {
      label: "Strong",
      color: "text-success",
      score
    };
  };
  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let charset = "";
    if (useUppercase) charset += uppercase;
    if (useLowercase) charset += lowercase;
    if (useNumbers) charset += numbers;
    if (useSymbols) charset += symbols;
    if (charset === "") {
      setPassword("");
      setStrength({
        label: "None",
        color: "text-muted",
        score: 0
      });
      return;
    }
    let newPassword = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      newPassword += charset[array[i] % charset.length];
    }
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));
    setCopied(false);
  };
  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return <>
      <div className="max-w-2xl mx-auto">
        <div className="glass-card mb-8">
          
          <div className="relative mb-6">
            <div className="flex items-center p-4 bg-background border border-border rounded-lg break-all min-h-[80px]">
              <span className="text-2xl font-mono tracking-wider w-full text-center pr-12">{password || "Select options below"}</span>
            </div>
            {password && <button onClick={copyToClipboard} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-muted hover:text-foreground transition-colors hover:bg-surface rounded-md" title="Copy to clipboard">
                {copied ? <CheckCircle2 className="text-success" size={24} /> : <Copy size={24} />}
              </button>}
          </div>

          {password && <div className="flex items-center justify-between mb-8 px-2">
              <span className="text-sm text-muted">Password Strength:</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => <div key={i} className={`h-2 w-8 rounded-full ${i < Math.ceil(strength.score / 2) ? strength.label === 'Weak' ? 'bg-danger' : strength.label === 'Fair' ? 'bg-warning' : strength.label === 'Good' ? 'bg-primary' : 'bg-success' : 'bg-border'}`} />)}
                </div>
                <span className={`text-sm font-medium ${strength.color}`}>{strength.label}</span>
              </div>
            </div>}

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="label flex items-center gap-2 m-0"><Settings size={16} /> Password Length</label>
                <span className="font-bold text-xl text-primary">{length}</span>
              </div>
              <input type="range" min="4" max="64" value={length} onChange={e => setLength(parseInt(e.target.value))} className="w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-4 border border-border rounded hover:border-primary cursor-pointer transition-colors bg-background">
                <input type="checkbox" checked={useUppercase} onChange={e => setUseUppercase(e.target.checked)} className="w-5 h-5 text-primary" />
                <span>Uppercase (A-Z)</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-border rounded hover:border-primary cursor-pointer transition-colors bg-background">
                <input type="checkbox" checked={useLowercase} onChange={e => setUseLowercase(e.target.checked)} className="w-5 h-5 text-primary" />
                <span>Lowercase (a-z)</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-border rounded hover:border-primary cursor-pointer transition-colors bg-background">
                <input type="checkbox" checked={useNumbers} onChange={e => setUseNumbers(e.target.checked)} className="w-5 h-5 text-primary" />
                <span>Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-border rounded hover:border-primary cursor-pointer transition-colors bg-background">
                <input type="checkbox" checked={useSymbols} onChange={e => setUseSymbols(e.target.checked)} className="w-5 h-5 text-primary" />
                <span>Symbols (!@#$)</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button className="btn btn-primary w-full sm:w-auto min-w-[200px]" onClick={generatePassword}>
              <RefreshCw size={18} /> Regenerate
            </button>
            <button className="btn btn-secondary w-full sm:w-auto min-w-[200px]" onClick={copyToClipboard}>
              {copied ? <><CheckCircle2 size={18} /> Copied!</> : <><Copy size={18} /> Copy Password</>}
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-muted flex items-center justify-center gap-2">
          <ShieldCheck size={16} className="text-success" />
          Generated securely in your browser using Crypto API
        </div>
      </div>
    </>;
}