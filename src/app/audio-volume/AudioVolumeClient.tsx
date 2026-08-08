"use client";

import React, { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { UploadCloud, Download, CheckCircle2, Volume2, Loader2, Settings } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function AudioVolumeClient() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  const [volume, setVolume] = useState(1.5); // Default to 150%
  
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

  const adjustVolume = async () => {
    if (!file || !isReady) return;
    setIsProcessing(true);
    setProgress(0);

    try {
      const ffmpeg = ffmpegRef.current!;
      await ffmpeg.writeFile(file.name, await fetchFile(file));
      
      const extension = file.name.split('.').pop() || 'mp3';
      const outputName = `volume_${file.name.replace(/\.[^/.]+$/, "")}.${extension}`;
      
      // Execute ffmpeg command to adjust volume using audio filter
      await ffmpeg.exec(["-i", file.name, "-filter:a", `volume=${volume}`, outputName]);
      
      const data = await ffmpeg.readFile(outputName);
      
      const blob = new Blob([data as any], { type: file.type || "audio/mpeg" });
      setAudioUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("An error occurred during volume adjustment.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="Audio Volume Adjuster"
      description="Increase or decrease the volume of your audio files without losing quality."
      breadcrumbs={[{ label: "Audio Tools", href: "/audio-tools" }, { label: "Audio Volume", href: "/audio-volume" }]}
      faq={[
        { question: "Will it distort my audio?", answer: "Increasing the volume significantly (e.g. above 200%) can cause clipping and distortion if the original audio was already loud. We recommend moderate adjustments." },
        { question: "Is my audio uploaded?", answer: "No. FileFlow uses WebAssembly to run a real audio editor inside your browser. Your files never leave your device." }
      ]}
      relatedTools={[
        { name: "Audio Compressor", href: "/audio-compressor", icon: <CheckCircle2 /> },
        { name: "Audio Converter", href: "/audio-converter", icon: <CheckCircle2 /> }
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
                
                <div className="mb-6 flex justify-center">
                  <audio controls src={URL.createObjectURL(file)} className="w-full max-w-md" />
                </div>

                <div className="flex flex-col gap-4 mb-8 p-6 bg-background rounded-lg border border-border text-left">
                  <label className="label flex items-center gap-2 mb-4"><Settings size={16}/> Volume Level</label>
                  
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-4xl font-bold text-primary">{Math.round(volume * 100)}%</span>
                    
                    <input 
                      type="range" 
                      min="0.1" 
                      max="3.0" 
                      step="0.1" 
                      value={volume} 
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full max-w-md"
                      disabled={isProcessing}
                    />
                    
                    <div className="flex justify-between w-full max-w-md text-xs text-muted">
                      <span>Quieter</span>
                      <span>Normal (100%)</span>
                      <span>Louder</span>
                    </div>
                  </div>
                </div>

                {isProcessing && (
                  <div className="mb-6 max-w-md mx-auto">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Adjusting volume...</span>
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
                  <button className="btn btn-primary" onClick={adjustVolume} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : (
                      <>
                        <Volume2 size={18} /> Apply Volume
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
            <h2 className="mb-4">Volume Adjusted!</h2>
            
            <audio controls src={audioUrl} className="mb-8 w-full max-w-md" />

            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setAudioUrl(null); }}>
                Adjust More
              </button>
              <a href={audioUrl} download={`volume_${file?.name}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Download Audio
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
