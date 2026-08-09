"use client";

import React, { useState, useEffect } from "react";
import { Calculator, ArrowRightLeft, CheckCircle2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

type UnitCategory = "length" | "weight" | "temperature" | "data";

const categories: Record<UnitCategory, { id: string, name: string, baseMultiplier?: number }[]> = {
  length: [
    { id: "m", name: "Meters", baseMultiplier: 1 },
    { id: "km", name: "Kilometers", baseMultiplier: 1000 },
    { id: "cm", name: "Centimeters", baseMultiplier: 0.01 },
    { id: "mm", name: "Millimeters", baseMultiplier: 0.001 },
    { id: "in", name: "Inches", baseMultiplier: 0.0254 },
    { id: "ft", name: "Feet", baseMultiplier: 0.3048 },
    { id: "yd", name: "Yards", baseMultiplier: 0.9144 },
    { id: "mi", name: "Miles", baseMultiplier: 1609.344 },
  ],
  weight: [
    { id: "kg", name: "Kilograms", baseMultiplier: 1 },
    { id: "g", name: "Grams", baseMultiplier: 0.001 },
    { id: "mg", name: "Milligrams", baseMultiplier: 0.000001 },
    { id: "lb", name: "Pounds", baseMultiplier: 0.45359237 },
    { id: "oz", name: "Ounces", baseMultiplier: 0.02834952 },
  ],
  temperature: [
    { id: "c", name: "Celsius" },
    { id: "f", name: "Fahrenheit" },
    { id: "k", name: "Kelvin" },
  ],
  data: [
    { id: "b", name: "Bytes", baseMultiplier: 1 },
    { id: "kb", name: "Kilobytes (KB)", baseMultiplier: 1024 },
    { id: "mb", name: "Megabytes (MB)", baseMultiplier: 1048576 },
    { id: "gb", name: "Gigabytes (GB)", baseMultiplier: 1073741824 },
    { id: "tb", name: "Terabytes (TB)", baseMultiplier: 1099511627776 },
  ]
};

export default function UnitConverterClient() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromValue, setFromValue] = useState<string>("1");
  const [toValue, setToValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("ft");

  // Update units when category changes
  useEffect(() => {
    const units = categories[category];
    if (units.length >= 2) {
      setFromUnit(units[0].id);
      setToUnit(units[1].id);
    }
  }, [category]);

  // Convert whenever relevant state changes
  useEffect(() => {
    if (fromValue === "") {
      setToValue("");
      return;
    }

    const val = parseFloat(fromValue);
    if (isNaN(val)) {
      setToValue("");
      return;
    }

    let result = 0;

    if (category === "temperature") {
      // Special logic for temperature
      let celsius = 0;
      // Convert to Celsius first
      if (fromUnit === "c") celsius = val;
      else if (fromUnit === "f") celsius = (val - 32) * 5/9;
      else if (fromUnit === "k") celsius = val - 273.15;

      // Convert from Celsius to Target
      if (toUnit === "c") result = celsius;
      else if (toUnit === "f") result = (celsius * 9/5) + 32;
      else if (toUnit === "k") result = celsius + 273.15;
    } else {
      // Logic for multiplier-based units (Length, Weight, Data)
      const fromObj = categories[category].find(u => u.id === fromUnit);
      const toObj = categories[category].find(u => u.id === toUnit);
      
      if (fromObj && toObj && fromObj.baseMultiplier && toObj.baseMultiplier) {
        // Convert to base unit, then to target unit
        const inBase = val * fromObj.baseMultiplier;
        result = inBase / toObj.baseMultiplier;
      }
    }

    // Format output
    // Avoid scientific notation for reasonably sized numbers, allow some decimals
    if (Math.abs(result) < 0.000001 && result !== 0) {
      setToValue(result.toExponential(4));
    } else {
      // Limit to 6 decimal places, remove trailing zeros
      setToValue(parseFloat(result.toFixed(6)).toString());
    }

  }, [category, fromValue, fromUnit, toUnit]);

  const handleSwap = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    
    // We also want to swap the values to make it intuitive
    setFromValue(toValue);
  };

  return (
    <ToolLayout
      howItWorks={["Upload your file or paste your data.","Adjust the tool settings.","Run the tool.","Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="Unit Converter"
      description="Quickly convert between units of length, weight, temperature, and digital data."
      breadcrumbs={[{ label: "Utilities", href: "/tools" }, { label: "Unit Converter", href: "/unit-converter" }]}
      faq={[
        { question: "How accurate is the converter?", answer: "The converter uses standard scientific conversion rates and provides up to 6 decimal places of precision." }
      ]}
      relatedTools={[
        { name: "Percentage Calculator", href: "/percentage-calculator", icon: <CheckCircle2 /> },
        { name: "Timestamp Converter", href: "/timestamp", icon: <CheckCircle2 /> }
      ]}
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        
        <div className="glass-card flex flex-col gap-8">
          
          {/* Category Selection */}
          <div className="flex justify-center">
            <div className="inline-flex bg-background border border-border rounded-lg p-1 overflow-x-auto w-full sm:w-auto">
              {(Object.keys(categories) as UnitCategory[]).map((cat) => (
                <button 
                  key={cat}
                  className={`px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-colors capitalize whitespace-nowrap ${category === cat ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-foreground'}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            
            {/* From */}
            <div className="flex-1 w-full bg-background p-4 rounded-xl border border-border">
              <label className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 block">From</label>
              <div className="flex flex-col gap-3">
                <input 
                  type="number" 
                  className="input text-2xl font-semibold bg-transparent border-none p-0 focus:ring-0"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  placeholder="0"
                />
                <select 
                  className="input w-full bg-surface"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                >
                  {categories[category].map(u => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <button 
              onClick={handleSwap}
              className="p-3 bg-surface border border-border rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all text-muted shrink-0"
            >
              <ArrowRightLeft size={20} className="sm:rotate-0 rotate-90" />
            </button>

            {/* To */}
            <div className="flex-1 w-full bg-background p-4 rounded-xl border border-border">
              <label className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 block">To</label>
              <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  className="input text-2xl font-semibold bg-transparent border-none p-0 focus:ring-0 text-primary"
                  value={toValue}
                  readOnly
                  placeholder="0"
                />
                <select 
                  className="input w-full bg-surface"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                >
                  {categories[category].map(u => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
