"use client";

import React, { useState, useEffect } from "react";
import { Percent, CheckCircle2, ArrowRight } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function PercentageCalculatorClient() {
  // Mode 1: What is X% of Y?
  const [calc1X, setCalc1X] = useState("15");
  const [calc1Y, setCalc1Y] = useState("100");
  const [calc1Result, setCalc1Result] = useState<number | null>(15);

  useEffect(() => {
    const x = parseFloat(calc1X);
    const y = parseFloat(calc1Y);
    if (!isNaN(x) && !isNaN(y)) {
      setCalc1Result((x / 100) * y);
    } else {
      setCalc1Result(null);
    }
  }, [calc1X, calc1Y]);

  // Mode 2: X is what percent of Y?
  const [calc2X, setCalc2X] = useState("20");
  const [calc2Y, setCalc2Y] = useState("80");
  const [calc2Result, setCalc2Result] = useState<number | null>(25);

  useEffect(() => {
    const x = parseFloat(calc2X);
    const y = parseFloat(calc2Y);
    if (!isNaN(x) && !isNaN(y) && y !== 0) {
      setCalc2Result((x / y) * 100);
    } else {
      setCalc2Result(null);
    }
  }, [calc2X, calc2Y]);

  // Mode 3: Percentage Increase/Decrease from X to Y
  const [calc3X, setCalc3X] = useState("50");
  const [calc3Y, setCalc3Y] = useState("75");
  const [calc3Result, setCalc3Result] = useState<{ value: number, isIncrease: boolean } | null>({ value: 50, isIncrease: true });

  useEffect(() => {
    const x = parseFloat(calc3X);
    const y = parseFloat(calc3Y);
    if (!isNaN(x) && !isNaN(y) && x !== 0) {
      const diff = y - x;
      const percent = (diff / Math.abs(x)) * 100;
      setCalc3Result({
        value: Math.abs(percent),
        isIncrease: percent >= 0
      });
    } else {
      setCalc3Result(null);
    }
  }, [calc3X, calc3Y]);

  const formatResult = (num: number | null) => {
    if (num === null) return "---";
    // Avoid too many decimals
    return parseFloat(num.toFixed(6)).toString();
  };

  return (
    <ToolLayout
      title="Percentage Calculator"
      description="Easily calculate percentages, percentage changes, and differences instantly."
      breadcrumbs={[{ label: "Utilities", href: "/tools" }, { label: "Percentage Calculator", href: "/percentage-calculator" }]}
      faq={[
        { question: "Are my numbers saved?", answer: "No, this calculator runs entirely in your browser and your data is not stored or transmitted." },
        { question: "Can it handle decimals and negatives?", answer: "Yes, you can input decimal numbers and negative values into any of the fields." }
      ]}
      relatedTools={[
        { name: "Unit Converter", href: "/unit-converter", icon: <CheckCircle2 /> },
        { name: "Word Counter", href: "/word-counter", icon: <CheckCircle2 /> }
      ]}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        
        {/* Calc 1 */}
        <div className="glass-card flex flex-col md:flex-row items-center gap-6 p-8 border border-border">
          <div className="flex-1 flex flex-wrap items-center gap-4 text-xl">
            <span className="font-medium text-muted whitespace-nowrap">What is</span>
            <input 
              type="number" 
              className="input text-center w-24 text-xl p-2 font-semibold bg-background" 
              value={calc1X} 
              onChange={(e) => setCalc1X(e.target.value)} 
            />
            <span className="font-medium text-muted whitespace-nowrap">% of</span>
            <input 
              type="number" 
              className="input text-center w-32 text-xl p-2 font-semibold bg-background" 
              value={calc1Y} 
              onChange={(e) => setCalc1Y(e.target.value)} 
            />
            <span className="font-medium text-muted">?</span>
          </div>
          
          <div className="hidden md:flex text-muted"><ArrowRight size={24} /></div>
          
          <div className="w-full md:w-48 bg-primary/10 border border-primary/20 rounded-xl p-4 flex flex-col items-center justify-center min-h-[100px]">
            <span className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">Result</span>
            <span className="text-3xl font-bold text-primary break-all text-center">{formatResult(calc1Result)}</span>
          </div>
        </div>

        {/* Calc 2 */}
        <div className="glass-card flex flex-col md:flex-row items-center gap-6 p-8 border border-border">
          <div className="flex-1 flex flex-wrap items-center gap-4 text-xl">
            <input 
              type="number" 
              className="input text-center w-32 text-xl p-2 font-semibold bg-background" 
              value={calc2X} 
              onChange={(e) => setCalc2X(e.target.value)} 
            />
            <span className="font-medium text-muted whitespace-nowrap">is what % of</span>
            <input 
              type="number" 
              className="input text-center w-32 text-xl p-2 font-semibold bg-background" 
              value={calc2Y} 
              onChange={(e) => setCalc2Y(e.target.value)} 
            />
            <span className="font-medium text-muted">?</span>
          </div>
          
          <div className="hidden md:flex text-muted"><ArrowRight size={24} /></div>
          
          <div className="w-full md:w-48 bg-background border border-border rounded-xl p-4 flex flex-col items-center justify-center min-h-[100px]">
            <span className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">Result</span>
            <span className="text-3xl font-bold break-all text-center">
              {formatResult(calc2Result)}{calc2Result !== null ? "%" : ""}
            </span>
          </div>
        </div>

        {/* Calc 3 */}
        <div className="glass-card flex flex-col md:flex-row items-center gap-6 p-8 border border-border">
          <div className="flex-1 flex flex-wrap items-center gap-4 text-xl">
            <span className="font-medium text-muted whitespace-nowrap">Change from</span>
            <input 
              type="number" 
              className="input text-center w-32 text-xl p-2 font-semibold bg-background" 
              value={calc3X} 
              onChange={(e) => setCalc3X(e.target.value)} 
            />
            <span className="font-medium text-muted whitespace-nowrap">to</span>
            <input 
              type="number" 
              className="input text-center w-32 text-xl p-2 font-semibold bg-background" 
              value={calc3Y} 
              onChange={(e) => setCalc3Y(e.target.value)} 
            />
            <span className="font-medium text-muted">is</span>
          </div>
          
          <div className="hidden md:flex text-muted"><ArrowRight size={24} /></div>
          
          <div className={`w-full md:w-48 border rounded-xl p-4 flex flex-col items-center justify-center min-h-[100px] ${
            calc3Result === null ? 'bg-background border-border' : 
            calc3Result.value === 0 ? 'bg-background border-border' :
            calc3Result.isIncrease ? 'bg-success/10 border-success/30 text-success' : 'bg-danger/10 border-danger/30 text-danger'
          }`}>
            <span className="text-xs uppercase tracking-wider text-muted font-semibold mb-1">
              {calc3Result === null ? "Result" : calc3Result.value === 0 ? "No Change" : calc3Result.isIncrease ? "Increase" : "Decrease"}
            </span>
            <span className="text-3xl font-bold break-all text-center flex items-center">
              {calc3Result !== null && calc3Result.value !== 0 && (
                <span className="mr-1 text-2xl">
                  {calc3Result.isIncrease ? "↑" : "↓"}
                </span>
              )}
              {formatResult(calc3Result ? calc3Result.value : null)}{calc3Result !== null ? "%" : ""}
            </span>
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
