"use client";

import React, { useState, useRef, useEffect } from "react";
import { fetchFile } from "@ffmpeg/util";
import { UploadCloud, Download, CheckCircle2, ArrowRightLeft, Loader2, Settings } from "lucide-react";
import { ffmpegService } from "@/lib/ffmpeg";
export default function AudioConverterClient() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [engineLoading, setEngineLoading] = useState(false);
  const [targetFormat, setTargetFormat] = useState("mp3");
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
    if (!file) return;
    setIsProcessing(true);
    setEngineLoading(true);
    setProgress(0);
    try {
      const ffmpeg = await ffmpegService.load(p => {
        setProgress(Math.round(p * 100));
      });
      setEngineLoading(false);
      await ffmpeg.writeFile(file.name, await fetchFile(file));
      const outputName = `converted_${file.name.replace(/\.[^/.]+$/, "")}.${targetFormat}`;

      // Execute ffmpeg command
      await ffmpeg.exec(["-i", file.name, outputName]);
      const data = await ffmpeg.readFile(outputName);
      let mimeType = `audio/${targetFormat}`;
      if (targetFormat === "ogg") mimeType = "audio/ogg";
      if (targetFormat === "aac") mimeType = "audio/aac";
      const blob = new Blob([data as BlobPart], {
        type: mimeType
      });
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
  return <>
      <div className="max-w-3xl mx-auto">
        {!audioUrl ? <>
            <div className="dropzone mb-8" onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileInputRef.current?.click()}>
              <UploadCloud className="dropzone-icon" />
              <h3>Drag & Drop your audio here</h3>
              <p className="text-muted">Almost any audio format supported</p>
              <input type="file" ref={fileInputRef} className="hidden" accept="audio/*" onChange={handleFileChange} />
            </div>

            {file && <div className="glass-card text-center">
                <h3 className="mb-2 truncate" title={file.name}>{file.name}</h3>
                <p className="text-muted text-sm mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                <div className="flex flex-col gap-4 mb-8 p-6 bg-background rounded-lg border border-border text-left">
                  <label className="label flex items-center gap-2 mb-2"><Settings size={16} /> Target Format</label>
                  
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

                {isProcessing && <div className="mb-6 max-w-md mx-auto">
                    <div className="flex justify-between text-sm mb-2">
                      <span>{engineLoading ? "Downloading audio engine..." : "Converting audio..."}</span>
                      {!engineLoading && <span className="font-medium">{progress}%</span>}
                    </div>
                    <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
                      {engineLoading ? <div className="bg-primary h-2.5 w-full animate-pulse"></div> : <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{
                width: `${progress}%`
              }}></div>}
                    </div>
                  </div>}

                <div className="flex justify-center gap-4">
                  <button className="btn btn-secondary" onClick={() => setFile(null)} disabled={isProcessing}>
                    Upload Another
                  </button>
                  <button className="btn btn-primary" onClick={convertAudio} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : <>
                        <ArrowRightLeft size={18} /> Convert Audio
                      </>}
                  </button>
                </div>
              </div>}
          </> : <div className="glass-card text-center py-12 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-success mb-6" />
            <h2 className="mb-4">Conversion Successful!</h2>
            
            <audio controls src={audioUrl} className="mb-8 w-full max-w-md" />

            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={() => {
            if (audioUrl) URL.revokeObjectURL(audioUrl);
            setFile(null);
            setAudioUrl(null);
          }}>
                Convert Another
              </button>
              <a href={audioUrl} download={`converted_${file?.name.replace(/\.[^/.]+$/, "")}.${targetFormat}`} className="btn btn-primary" style={{
            textDecoration: 'none'
          }}>
                <Download size={18} /> Download {targetFormat.toUpperCase()}
              </a>
            </div>
          </div>}
      </div>
    </>;
}