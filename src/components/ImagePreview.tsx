"use client";

import React, { useState, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';

interface ImagePreviewProps {
  originalSrc: string;
  resultSrc?: string | null;
  transparent?: boolean;
  originalLabel?: string;
  resultLabel?: string;
}

export default function ImagePreview({
  originalSrc,
  resultSrc,
  transparent = false,
  originalLabel = "Original",
  resultLabel = "Result"
}: ImagePreviewProps) {
  const [view, setView] = useState<'original' | 'result'>('original');
  
  // If resultSrc changes (becomes available), switch to result view automatically
  useEffect(() => {
    if (resultSrc) {
      setView('result');
    } else {
      setView('original');
    }
  }, [resultSrc]);

  // If no resultSrc, always show original
  const currentView = (!resultSrc || view === 'original') ? 'original' : 'result';
  const currentSrc = currentView === 'original' ? originalSrc : resultSrc;

  // Checkerboard style for transparent images
  const checkerboardStyle = transparent ? {
    backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  } : { backgroundColor: "var(--background)" };

  return (
    <div className="w-full flex flex-col items-center">
      {resultSrc && (
        <div className="flex bg-[var(--surface)] border border-[var(--border)] rounded-full p-1 mb-6 shadow-sm overflow-hidden" style={{ display: 'inline-flex' }}>
          <button 
            onClick={() => setView('original')}
            className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            style={{ 
              backgroundColor: currentView === 'original' ? 'var(--primary)' : 'transparent',
              color: currentView === 'original' ? '#fff' : 'var(--muted)'
            }}
          >
            {originalLabel}
          </button>
          <button 
            onClick={() => setView('result')}
            className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            style={{ 
              backgroundColor: currentView === 'result' ? 'var(--primary)' : 'transparent',
              color: currentView === 'result' ? '#fff' : 'var(--muted)'
            }}
          >
            {resultLabel}
          </button>
        </div>
      )}
      
      <div 
        className="w-full flex items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] shadow-sm relative"
        style={{ 
          minHeight: '200px',
          maxHeight: '55vh',
          backgroundColor: 'var(--background)'
        }}
      >
        {!currentSrc ? (
          <div className="flex flex-col items-center justify-center text-muted gap-2">
            <ImageIcon size={32} style={{ opacity: 0.5 }} />
            <p>No image available</p>
          </div>
        ) : (
          <img 
            src={currentSrc} 
            alt={`${currentView} preview`}
            className="max-w-full max-h-full"
            style={{ 
              objectFit: 'contain',
              maxHeight: '55vh',
              ...checkerboardStyle
            }}
          />
        )}
      </div>
    </div>
  );
}
