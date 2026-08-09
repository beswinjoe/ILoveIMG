"use client";

import React, { useState, useRef, useEffect } from "react";
import { fetchFile } from "@ffmpeg/util";
import { UploadCloud, Download, CheckCircle2, Music, Loader2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { ffmpegService } from "@/lib/ffmpeg";

export default function Mp3ToWavClient() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [engineLoading, setEngineLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type.includes("mpeg") || selectedFile.name.toLowerCase().endsWith(".mp3")) {
        setFile(selectedFile);
        setAudioUrl(null);
      } else {
        alert("Please upload a valid MP3 file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.includes("mpeg") || selectedFile.name.toLowerCase().endsWith(".mp3")) {
        setFile(selectedFile);
        setAudioUrl(null);
      } else {
        alert("Please upload a valid MP3 file.");
      }
    }
  };

  const convertToWav = async () => {
    if (!file) return;
    setIsProcessing(true);
    setEngineLoading(true);
    setProgress(0);

    try {
      const ffmpeg = await ffmpegService.load((p) => {
        setProgress(Math.round(p * 100));
      });
      
      setEngineLoading(false);

      await ffmpeg.writeFile(file.name, await fetchFile(file));
      
      const outputName = file.name.replace(/\.[^/.]+$/, "") + ".wav";
      
      // Execute ffmpeg command to convert to WAV
      await ffmpeg.exec(["-i", file.name, outputName]);
      
      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data as BlobPart], { type: "audio/wav" });
      setAudioUrl(URL.createObjectURL(blob));

      await ffmpeg.deleteFile(file.name);
      await ffmpeg.deleteFile(outputName);
    } catch (error) {
      console.error(error);
      alert("An error occurred during audio conversion. Please try again.");
    }

    setIsProcessing(false);
    setEngineLoading(false);
  };

  return (
    <ToolLayout
      title="MP3 to WAV"
      description="Convert compressed MP3 audio into uncompressed high-quality WAV format."
      breadcrumbs={[{ label: "Audio Tools", href: "/audio-tools" }, { label: "MP3 to WAV", href: "/mp3-to-wav" }]}
      faq={[
        { question: "Is my audio uploaded?", answer: "No. Filoza uses WebAssembly to run a real audio converter inside your browser. Your files never leave your device." }
      ]}
      relatedTools={[
        { name: "WAV to MP3", href: "/wav-to-mp3", icon: <CheckCircle2 /> },
        { name: "Audio Compressor", href: "/audio-compressor", icon: <CheckCircle2 /> }
      ]}
    >
      <div className="max-w-3xl mx-auto">
        {!audioUrl ? (
          <>
            <div 
              className="dropzone mb-8" 
              onDrop={handleDrop} 
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop your MP3 here</h3>
              <p className="text-muted">Only .mp3 files are supported</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".mp3,audio/mpeg" 
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
                      <span>{engineLoading ? "Downloading audio engine..." : "Converting to WAV..."}</span>
                      {!engineLoading && <span className="font-medium">{progress}%</span>}
                    </div>
                    <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
                      {engineLoading ? (
                        <div className="bg-primary h-2.5 w-full animate-pulse"></div>
                      ) : (
                        <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={convertToWav} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : (
                      <>
                        <Music size={18} /> Convert to WAV
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
            <p className="text-muted mb-8">Your WAV file is ready to download.</p>
            
            <audio controls src={audioUrl} className="mb-8 w-full max-w-md" />

            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => { 
                if (audioUrl) URL.revokeObjectURL(audioUrl);
                setFile(null); 
                setAudioUrl(null); 
              }}>
                Convert More
              </button>
              <a href={audioUrl} download={`${file?.name.replace(/\.[^/.]+$/, "")}.wav`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Download WAV
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
