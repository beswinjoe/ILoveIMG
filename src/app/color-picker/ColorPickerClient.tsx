"use client";

import React, { useState, useRef, useEffect } from "react";
import { Palette, Copy, CheckCircle2, UploadCloud, Pipette } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function ColorPickerClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#3b82f6");
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        loadImage(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadImage(e.target.files[0]);
    }
  };

  const loadImage = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  useEffect(() => {
    if (imageSrc && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        // Calculate aspect ratio to fit within container
        const containerWidth = canvas.parentElement?.clientWidth || 800;
        const scale = Math.min(1, containerWidth / img.width);
        const w = img.width * scale;
        const h = img.height * scale;

        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
      };
      img.src = imageSrc;
    }
  }, [imageSrc]);

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    setHoverColor(hex);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
    setSelectedColor(hex);
  };

  const handleCanvasMouseLeave = () => {
    setHoverColor(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
  };

  return (
    <ToolLayout
      howItWorks={["Upload your file or paste your data.","Adjust the tool settings.","Run the tool.","Get your results instantly."]}
      supportedFormats="Various formats supported depending on the tool."
      title="Color Picker"
      description="Extract colors from images or use the color wheel to get HEX and RGB values."
      breadcrumbs={[{ label: "Utilities", href: "/tools" }, { label: "Color Picker", href: "/color-picker" }]}
      faq={[
        { question: "Is my image uploaded?", answer: "No. Filoza processes your images securely inside your browser. They never leave your device." },
        { question: "How do I extract a color from an image?", answer: "Upload an image, then hover over it to see the color under your cursor. Click to select and save the color." }
      ]}
      relatedTools={[
        { name: "Image Converter", href: "/image-converter", icon: <CheckCircle2 /> }
      ]}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Main Area */}
        <div className="flex-1">
          {!imageSrc ? (
            <div 
              className="dropzone h-full min-h-[400px] flex flex-col justify-center border-dashed" 
              onDrop={handleDrop} 
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop an image here</h3>
              <p className="text-muted mb-6">Or click to select a file</p>
              
              <div className="text-sm font-medium p-4 bg-background border border-border rounded text-left max-w-xs mx-auto">
                <div className="flex items-center gap-2 mb-2"><Pipette size={16} /> Image Color Picker</div>
                <p className="text-muted font-normal">Upload an image to extract precise colors from any pixel.</p>
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>
          ) : (
            <div className="glass-card flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-4">
                <h3 className="m-0 text-sm font-medium flex items-center gap-2"><Pipette size={16}/> Extract Color</h3>
                <button className="btn btn-secondary py-1 px-3 text-xs" onClick={() => setImageSrc(null)}>
                  Change Image
                </button>
              </div>
              
              <div className="relative border border-border rounded overflow-hidden cursor-crosshair bg-[url('/checkers.png')]">
                <canvas 
                  ref={canvasRef}
                  onMouseMove={handleCanvasMouseMove}
                  onClick={handleCanvasClick}
                  onMouseLeave={handleCanvasMouseLeave}
                  className="max-w-full"
                />
                {hoverColor && (
                  <div 
                    className="absolute top-4 left-4 p-2 bg-background/90 backdrop-blur border border-border rounded shadow-lg flex items-center gap-3 pointer-events-none"
                  >
                    <div className="w-6 h-6 rounded-full border border-border" style={{ backgroundColor: hoverColor }}></div>
                    <span className="font-mono text-sm uppercase">{hoverColor}</span>
                  </div>
                )}
              </div>
              <p className="text-muted text-xs mt-4">Click anywhere on the image to select a color.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:w-80 flex flex-col gap-6">
          <div className="glass-card">
            <h3 className="mb-6 flex items-center gap-2 text-lg"><Palette size={20} className="text-primary" /> Selected Color</h3>
            
            <div 
              className="w-full h-32 rounded-lg border border-border mb-6 shadow-inner transition-colors duration-200" 
              style={{ backgroundColor: selectedColor }}
            ></div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="label">Manual Picker</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={selectedColor} 
                    onChange={(e) => setSelectedColor(e.target.value)} 
                    className="h-10 w-12 cursor-pointer rounded border border-border bg-background p-1" 
                  />
                  <input 
                    type="text" 
                    value={selectedColor.toUpperCase()} 
                    onChange={(e) => setSelectedColor(e.target.value)} 
                    className="input w-full uppercase font-mono" 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex justify-between items-center group">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted font-semibold uppercase tracking-wider">HEX</span>
                    <span className="font-mono">{selectedColor.toUpperCase()}</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(selectedColor.toUpperCase())}
                    className="p-2 text-muted hover:text-foreground hover:bg-surface rounded opacity-0 group-hover:opacity-100 transition-all"
                  >
                    {copied === selectedColor.toUpperCase() ? <CheckCircle2 size={16} className="text-success" /> : <Copy size={16} />}
                  </button>
                </div>
                
                <div className="flex justify-between items-center group">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted font-semibold uppercase tracking-wider">RGB</span>
                    <span className="font-mono">{hexToRgb(selectedColor) || "---"}</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(`rgb(${hexToRgb(selectedColor)})`)}
                    className="p-2 text-muted hover:text-foreground hover:bg-surface rounded opacity-0 group-hover:opacity-100 transition-all"
                  >
                    {copied === `rgb(${hexToRgb(selectedColor)})` ? <CheckCircle2 size={16} className="text-success" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ToolLayout>
  );
}
