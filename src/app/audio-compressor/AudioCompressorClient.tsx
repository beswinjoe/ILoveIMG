"use client";

import React, { useState, useRef, useEffect } from "react";
import { fetchFile } from "@ffmpeg/util";
import { UploadCloud, Download, CheckCircle2, Shrink, Loader2, Settings } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { ffmpegService } from "@/lib/ffmpeg";

export default function AudioCompressorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [engineLoading, setEngineLoading] = useState(false);
  
  const [bitrate, setBitrate] = useState("64k");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  
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
      if (selectedFile.type.startsWith("audio/")) {
        setFile(selectedFile);
        setOriginalSize(selectedFile.size);
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
        setOriginalSize(selectedFile.size);
        setAudioUrl(null);
      } else {
        alert("Please upload a valid audio file.");
      }
    }
  };

  const compressAudio = async () => {
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
      
      const outputName = `compressed_${file.name.replace(/\.[^/.]+$/, "")}.mp3`;
      
      // Execute ffmpeg command to convert to MP3 with selected bitrate
      await ffmpeg.exec(["-i", file.name, "-b:a", bitrate, outputName]);
      
      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data as BlobPart], { type: "audio/mp3" });
      setCompressedSize(blob.size);
      setAudioUrl(URL.createObjectURL(blob));

      await ffmpeg.deleteFile(file.name);
      await ffmpeg.deleteFile(outputName);
    } catch (error) {
      console.error(error);
      alert("An error occurred during audio compression. Please try again.");
    }

    setIsProcessing(false);
    setEngineLoading(false);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ToolLayout
      howItWorks={["Upload your audio file.","Choose your conversion or edit settings.","Process the audio.","Download the resulting file."]}
      supportedFormats="MP3, WAV, OGG, M4A"
      title="Audio Compressor"
      description="Compress audio files to reduce file size while maintaining listening quality."
      breadcrumbs={[{ label: "Audio Tools", href: "/audio-tools" }, { label: "Compress Audio", href: "/audio-compressor" }]}
      faq={[
        { question: "Is my audio uploaded?", answer: "No. Filoza uses WebAssembly to run a real audio compressor inside your browser. Your files never leave your device." },
        { question: "Will I lose quality?", answer: "Compression always involves some loss of data, but we allow you to choose the bitrate. 128kbps is near-CD quality, while 64kbps is great for spoken word (like podcasts) and yields much smaller files." }
      ]}
      relatedTools={[
        { name: "Audio Converter", href: "/audio-converter", icon: <CheckCircle2 /> },
        { name: "Audio Volume", href: "/audio-volume", icon: <CheckCircle2 /> }
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
              <h3>Drag & Drop your audio here</h3>
              <p className="text-muted">MP3, WAV, AAC, OGG supported</p>
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
                <p className="text-muted text-sm mb-6">{formatBytes(originalSize)}</p>

                <div className="flex flex-col gap-4 mb-8 p-6 bg-background rounded-lg border border-border text-left">
                  <label className="label flex items-center gap-2 mb-2"><Settings size={16}/> Target Quality (Bitrate)</label>
                  
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center justify-between cursor-pointer p-3 rounded border border-border hover:border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="bitrate" value="128k" checked={bitrate === "128k"} onChange={() => setBitrate("128k")} className="text-primary" />
                        <span>High Quality (128 kbps)</span>
                      </div>
                      <span className="text-xs text-muted">Less compression</span>
                    </label>
                    
                    <label className="flex items-center justify-between cursor-pointer p-3 rounded border border-border hover:border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="bitrate" value="96k" checked={bitrate === "96k"} onChange={() => setBitrate("96k")} className="text-primary" />
                        <span>Medium Quality (96 kbps)</span>
                      </div>
                      <span className="text-xs text-muted">Balanced</span>
                    </label>

                    <label className="flex items-center justify-between cursor-pointer p-3 rounded border border-border hover:border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="bitrate" value="64k" checked={bitrate === "64k"} onChange={() => setBitrate("64k")} className="text-primary" />
                        <span>Low Quality (64 kbps)</span>
                      </div>
                      <span className="text-xs text-muted">More compression (Good for voice)</span>
                    </label>

                    <label className="flex items-center justify-between cursor-pointer p-3 rounded border border-border hover:border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="bitrate" value="32k" checked={bitrate === "32k"} onChange={() => setBitrate("32k")} className="text-primary" />
                        <span>Very Low Quality (32 kbps)</span>
                      </div>
                      <span className="text-xs text-muted">Max compression</span>
                    </label>
                  </div>
                </div>

                {isProcessing && (
                  <div className="mb-6 max-w-md mx-auto">
                    <div className="flex justify-between text-sm mb-2">
                      <span>{engineLoading ? "Downloading audio engine..." : "Compressing audio..."}</span>
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
                  <button className="btn btn-primary" onClick={compressAudio} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : (
                      <>
                        <Shrink size={18} /> Compress Audio
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
            <h2 className="mb-4">Compression Successful!</h2>
            
            <div className="flex gap-8 justify-center mb-8 p-4 bg-background rounded-lg border border-border w-full max-w-md">
              <div className="text-center">
                <p className="text-muted text-sm mb-1">Original</p>
                <p className="font-semibold">{formatBytes(originalSize)}</p>
              </div>
              <div className="text-center">
                <p className="text-muted text-sm mb-1">Compressed</p>
                <p className="font-semibold text-success">{formatBytes(compressedSize)}</p>
              </div>
            </div>
            
            <audio controls src={audioUrl} className="mb-8 w-full max-w-md" />

            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => { 
                if (audioUrl) URL.revokeObjectURL(audioUrl);
                setFile(null); 
                setAudioUrl(null); 
              }}>
                Compress Another
              </button>
              <a href={audioUrl} download={`compressed_${file?.name.replace(/\.[^/.]+$/, "")}.mp3`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <Download size={18} /> Download Audio
              </a>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
