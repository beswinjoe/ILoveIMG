"use client";

import React, { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { UploadCloud, Download, CheckCircle2, Scissors, Loader2, Settings } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";

export default function AudioCutterClient() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  const [startTime, setStartTime] = useState("00:00:00");
  const [duration, setDuration] = useState("00:00:30"); // 30 seconds default
  
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

  const cutAudio = async () => {
    if (!file || !isReady) return;
    setIsProcessing(true);
    setProgress(0);

    try {
      const ffmpeg = ffmpegRef.current!;
      await ffmpeg.writeFile(file.name, await fetchFile(file));
      
      const extension = file.name.split('.').pop() || 'mp3';
      const outputName = `cut_${file.name.replace(/\.[^/.]+$/, "")}.${extension}`;
      
      // Execute ffmpeg command to cut audio using -ss (start time) and -t (duration)
      await ffmpeg.exec(["-ss", startTime, "-t", duration, "-i", file.name, "-c", "copy", outputName]);
      
      const data = await ffmpeg.readFile(outputName);
      
      // Attempt to copy without re-encoding, if it fails because of container issues we'd need to re-encode.
      // But for simple trim, -c copy works for many formats.
      const blob = new Blob([data as any], { type: file.type || "audio/mpeg" });
      setAudioUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
      alert("An error occurred during audio cutting. Please verify your timestamp format (HH:MM:SS).");
    }

    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="Audio Cutter"
      description="Trim and cut audio files. Perfect for creating ringtones or removing silence."
      breadcrumbs={[{ label: "Audio Tools", href: "/audio-tools" }, { label: "Audio Cutter", href: "/audio-cutter" }]}
      faq={[
        { question: "How do I format the time?", answer: "Use the HH:MM:SS format. For example, to start at 1 minute and 30 seconds, enter 00:01:30." },
        { question: "Is my audio uploaded?", answer: "No. FileFlow uses WebAssembly to run a real audio editor inside your browser. Your files never leave your device." }
      ]}
      relatedTools={[
        { name: "Audio Volume", href: "/audio-volume", icon: <CheckCircle2 /> },
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
                  {/* Basic audio preview to help user find timestamps */}
                  <audio controls src={URL.createObjectURL(file)} className="w-full max-w-md" />
                </div>

                <div className="flex flex-col gap-4 mb-8 p-6 bg-background rounded-lg border border-border text-left">
                  <label className="label flex items-center gap-2 mb-2"><Settings size={16}/> Cut Settings</label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Start Time (HH:MM:SS)</label>
                      <input 
                        type="text" 
                        value={startTime} 
                        onChange={(e) => setStartTime(e.target.value)}
                        className="input w-full font-mono"
                        placeholder="00:00:00"
                        disabled={isProcessing}
                      />
                    </div>
                    <div>
                      <label className="label">Duration (HH:MM:SS)</label>
                      <input 
                        type="text" 
                        value={duration} 
                        onChange={(e) => setDuration(e.target.value)}
                        className="input w-full font-mono"
                        placeholder="00:00:30"
                        disabled={isProcessing}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted mt-2">
                    Enter the exact start time and how long you want the cut snippet to be.
                  </p>
                </div>

                {isProcessing && (
                  <div className="mb-6 max-w-md mx-auto">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Cutting audio...</span>
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
                  <button className="btn btn-primary" onClick={cutAudio} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : (
                      <>
                        <Scissors size={18} /> Cut Audio
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
            <h2 className="mb-4">Audio Cut Successfully!</h2>
            
            <audio controls src={audioUrl} className="mb-8 w-full max-w-md" />

            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => { setFile(null); setAudioUrl(null); }}>
                Cut More
              </button>
              <a href={audioUrl} download={`cut_${file?.name}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Download Snippet
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
