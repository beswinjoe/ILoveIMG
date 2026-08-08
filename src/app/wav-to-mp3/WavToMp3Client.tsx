"use client";

import React, { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { UploadCloud, Download, CheckCircle2, Music, Loader2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function WavToMp3Client() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
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
    // toBlobURL is used to bypass CORS issue, urls with the same domain can be used directly.
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
      if (selectedFile.type.includes("wav") || selectedFile.name.toLowerCase().endsWith(".wav")) {
        setFile(selectedFile);
        setAudioUrl(null);
      } else {
        alert("Please upload a valid WAV file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.includes("wav") || selectedFile.name.toLowerCase().endsWith(".wav")) {
        setFile(selectedFile);
        setAudioUrl(null);
      } else {
        alert("Please upload a valid WAV file.");
      }
    }
  };

  const convertToMp3 = async () => {
    if (!file || !isReady) return;
    setIsProcessing(true);
    setProgress(0);

    try {
      const ffmpeg = ffmpegRef.current!;
      await ffmpeg.writeFile(file.name, await fetchFile(file));
      
      const outputName = file.name.replace(/\.[^/.]+$/, "") + ".mp3";
      
      // Execute ffmpeg command to convert to MP3 with 192k bitrate
      await ffmpeg.exec(["-i", file.name, "-b:a", "192k", outputName]);
      
      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data as any], { type: "audio/mp3" });
      setAudioUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("An error occurred during audio conversion.");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="WAV to MP3"
      description="Convert uncompressed WAV audio into high-quality MP3 format instantly."
      breadcrumbs={[{ label: "Audio Tools", href: "/audio-tools" }, { label: "WAV to MP3", href: "/wav-to-mp3" }]}
      faq={[
        { question: "Is my audio uploaded?", answer: "No. FileFlow uses WebAssembly to run a real audio converter inside your browser. Your files never leave your device." },
        { question: "What is the output quality?", answer: "We convert your WAV files to MP3 format using a high-quality 192kbps bitrate, perfect for general listening." }
      ]}
      relatedTools={[
        { name: "MP3 to WAV", href: "/mp3-to-wav", icon: <CheckCircle2 /> },
        { name: "Audio Compressor", href: "/audio-compressor", icon: <CheckCircle2 /> }
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
              <h3>Drag & Drop your WAV here</h3>
              <p className="text-muted">Only .wav files are supported</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".wav,audio/wav" 
                onChange={handleFileChange} 
              />
            </div>

            {file && (
              <div className="glass-card text-center">
                <h3 className="mb-2 truncate" title={file.name}>{file.name}</h3>
                <p className="text-muted text-sm mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                {isProcessing && (
                  <div className="mb-6 max-w-md mx-auto">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Converting to MP3...</span>
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
                  <button className="btn btn-primary" onClick={convertToMp3} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : (
                      <>
                        <Music size={18} /> Convert to MP3
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
            <p className="text-muted mb-8">Your MP3 file is ready to download.</p>
            
            <audio controls src={audioUrl} className="mb-8 w-full max-w-md" />

            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setAudioUrl(null); }}>
                Convert More
              </button>
              <a href={audioUrl} download={`${file?.name.replace(/\.[^/.]+$/, "")}.mp3`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Download MP3
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
