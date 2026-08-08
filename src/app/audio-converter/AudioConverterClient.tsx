"use client";

import React, { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { UploadCloud, Download, CheckCircle2, ArrowRightLeft, Loader2, Settings } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function AudioConverterClient() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  const [targetFormat, setTargetFormat] = useState("mp3");
  
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    if (!ffmpegRef.current) {
      ffmpegRef.current = new FFmpeg();
    }
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
    const ffmpeg = ffmpegRef.current!;
    ffmpeg.on("progress", ({ progress }) => {
      setProgress(Math.round(progress * 100));
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });
    setIsReady(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type.startsWith("audio/")) {
        setFile(selectedFile);
        setAudioUrl(null);
      } else {
        alert("Please upload a valid audio file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith("audio/")) {
        setFile(selectedFile);
        setAudioUrl(null);
      } else {
        alert("Please upload a valid audio file.");
      }
    }
  };

  const convertAudio = async () => {
    if (!file || !isReady) return;
    setIsProcessing(true);
    setProgress(0);

    try {
      const ffmpeg = ffmpegRef.current!;
      await ffmpeg.writeFile(file.name, await fetchFile(file));
      
      const outputName = `converted_${file.name.replace(/\.[^/.]+$/, "")}.${targetFormat}`;
      
      // Execute ffmpeg command
      await ffmpeg.exec(["-i", file.name, outputName]);
      
      const data = await ffmpeg.readFile(outputName);
      let mimeType = `audio/${targetFormat}`;
      if (targetFormat === "ogg") mimeType = "audio/ogg";
      if (targetFormat === "aac") mimeType = "audio/aac";
      
      const blob = new Blob([data as any], { type: mimeType });
      setAudioUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("An error occurred during audio conversion.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="Universal Audio Converter"
      description="Convert any audio file into MP3, WAV, AAC, or OGG instantly."
      breadcrumbs={[{ label: "Audio Tools", href: "/audio-tools" }, { label: "Audio Converter", href: "/audio-converter" }]}
      faq={[
        { question: "What formats are supported?", answer: "You can upload almost any audio file format and convert it into MP3, WAV, AAC, or OGG." },
        { question: "Is my audio uploaded?", answer: "No. FileFlow uses WebAssembly to run a real audio converter inside your browser. Your files never leave your device." }
      ]}
      relatedTools={[
        { name: "Audio Compressor", href: "/audio-compressor", icon: <CheckCircle2 /> },
        { name: "Audio Cutter", href: "/audio-cutter", icon: <CheckCircle2 /> }
      ]}
    >
      <div className="max-w-3xl mx-auto">
        {!isReady ? (
          <div className="glass-card text-center py-12 flex flex-col items-center">
            <Loader2 size={48} className="text-primary animate-spin mb-4" />
            <h3 className="mb-2">Loading Audio Engine...</h3>
            <p className="text-muted text-sm max-w-md mx-auto">
              We're loading our secure browser-side audio engine (FFmpeg WebAssembly). This only takes a moment and ensures your files never need to be uploaded to a server.
            </p>
          </div>
        ) : !audioUrl ? (
          <>
            <div 
              className="dropzone mb-8" 
              onDrop={handleDrop} 
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop your audio here</h3>
              <p className="text-muted">Almost any audio format supported</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="audio/*" 
                onChange={handleFileChange} 
              />
            </div>

            {file && (
              <div className="glass-card text-center">
                <h3 className="mb-2 truncate" title={file.name}>{file.name}</h3>
                <p className="text-muted text-sm mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                <div className="flex flex-col gap-4 mb-8 p-6 bg-background rounded-lg border border-border text-left">
                  <label className="label flex items-center gap-2 mb-2"><Settings size={16}/> Target Format</label>
                  
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <label className={`flex flex-col items-center justify-center p-4 rounded border cursor-pointer transition-all ${targetFormat === "mp3" ? "border-primary bg-primary/10" : "border-border hover:border-primary"}`}>
                      <input type="radio" name="format" value="mp3" checked={targetFormat === "mp3"} onChange={() => setTargetFormat("mp3")} className="hidden" />
                      <span className="font-medium">MP3</span>
                      <span className="text-xs text-muted">Universal</span>
                    </label>
                    <label className={`flex flex-col items-center justify-center p-4 rounded border cursor-pointer transition-all ${targetFormat === "wav" ? "border-primary bg-primary/10" : "border-border hover:border-primary"}`}>
                      <input type="radio" name="format" value="wav" checked={targetFormat === "wav"} onChange={() => setTargetFormat("wav")} className="hidden" />
                      <span className="font-medium">WAV</span>
                      <span className="text-xs text-muted">Lossless</span>
                    </label>
                    <label className={`flex flex-col items-center justify-center p-4 rounded border cursor-pointer transition-all ${targetFormat === "aac" ? "border-primary bg-primary/10" : "border-border hover:border-primary"}`}>
                      <input type="radio" name="format" value="aac" checked={targetFormat === "aac"} onChange={() => setTargetFormat("aac")} className="hidden" />
                      <span className="font-medium">AAC</span>
                      <span className="text-xs text-muted">Apple</span>
                    </label>
                    <label className={`flex flex-col items-center justify-center p-4 rounded border cursor-pointer transition-all ${targetFormat === "ogg" ? "border-primary bg-primary/10" : "border-border hover:border-primary"}`}>
                      <input type="radio" name="format" value="ogg" checked={targetFormat === "ogg"} onChange={() => setTargetFormat("ogg")} className="hidden" />
                      <span className="font-medium">OGG</span>
                      <span className="text-xs text-muted">Web</span>
                    </label>
                  </div>
                </div>

                {isProcessing && (
                  <div className="mb-6 max-w-md mx-auto">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Converting audio...</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={convertAudio} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : (
                      <>
                        <ArrowRightLeft size={18} /> Convert Audio
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="glass-card text-center py-12 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-success mb-6" />
            <h2 className="mb-4">Conversion Successful!</h2>
            
            <audio controls src={audioUrl} className="mb-8 w-full max-w-md" />

            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setAudioUrl(null); }}>
                Convert More
              </button>
              <a href={audioUrl} download={`converted_${file?.name.replace(/\.[^/.]+$/, "")}.${targetFormat}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Download {targetFormat.toUpperCase()}
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
