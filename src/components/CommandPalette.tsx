"use client";

import React, { useState, useEffect } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { toolsData, ToolItem } from "../lib/tools";

export function CommandPalette({ isMobile = false }: { isMobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(typeof window !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0);

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  // Group tools by category
  const groupedTools = toolsData.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, ToolItem[]>);

  return (
    <>
      <button 
        className="search-trigger"
        onClick={() => setOpen(true)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
          padding: '0 0.875rem', width: isMobile ? '100%' : '260px', height: '44px',
          fontSize: '0.875rem', color: 'var(--muted)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          borderRadius: '100px', cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        aria-label="Search tools"
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <Search size={16} style={{ color: 'var(--muted)', flexShrink: 0 }} className="search-icon" />
          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>Search tools...</span>
        </span>
        <kbd style={{ 
          display: 'flex', alignItems: 'center', gap: '0.125rem',
          padding: '0.2rem 0.4rem', fontSize: '0.7rem', fontWeight: 600,
          backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(255, 255, 255, 0.6)', 
          borderRadius: '100px', color: 'var(--muted)'
        }}>
          <span>{isMac ? '⌘' : 'Ctrl'}</span>K
        </kbd>
      </button>

      {open && (
        <>
          {/* Overlay */}
          <div 
            className="search-backdrop"
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(235, 238, 248, 0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 9998 }} 
            onClick={() => setOpen(false)}
          />
          <div 
            className="search-modal"
            style={{
            position: 'fixed',
            top: isMobile ? '72px' : '90px',
            left: isMobile ? '12px' : '50%',
            transform: isMobile ? 'none' : 'translateX(-50%)',
            zIndex: 9999,
            width: isMobile ? 'calc(100vw - 24px)' : 'min(680px, calc(100vw - 40px))',
          }}>

          <style dangerouslySetInnerHTML={{__html: `
            .cmdk-container {
              width: 100%;
              max-height: 70vh;
              display: flex;
              flex-direction: column;
              border-radius: 24px;
              overflow: hidden;
              background: rgba(255, 255, 255, 0.92);
              backdrop-filter: blur(30px) saturate(140%);
              -webkit-backdrop-filter: blur(30px) saturate(140%);
              border: 1px solid rgba(255, 255, 255, 0.85);
              box-shadow: 0 30px 100px rgba(30, 40, 90, 0.20);
              z-index: 10000;
            }
            .cmdk-input-wrapper {
              display: flex;
              align-items: center;
              padding: 0 24px;
              border-bottom: 1px solid var(--border);
              height: 72px;
            }
            .cmdk-input {
              width: 100%;
              height: 100%;
              font-size: 22px;
              background: transparent;
              border: none;
              outline: none;
              color: var(--foreground);
            }
            .cmdk-input::placeholder {
              color: var(--muted);
            }
            .cmdk-list {
              overflow-y: auto;
              padding: 0.75rem;
              max-height: calc(70vh - 65px);
            }
            .cmdk-group-heading {
              padding: 1rem 1rem 0.5rem 1rem;
              font-size: 0.75rem;
              font-weight: 700;
              color: var(--muted);
              letter-spacing: 0.05em;
              text-transform: uppercase;
            }
            .cmdk-item {
              display: flex;
              align-items: center;
              gap: 1rem;
              padding: 0 16px;
              border-radius: 16px;
              height: 72px;
              cursor: pointer;
              transition: all 0.15s ease;
            }
            .cmdk-item[data-selected='true'] {
              background: var(--surface-hover);
            }
            .cmdk-empty {
              padding: 4rem 2rem;
              text-align: center;
              color: var(--muted);
              font-size: 1rem;
            }
          `}} />

          <Command className="cmdk-container" loop>
            <div className="cmdk-input-wrapper">
              <Search size={22} style={{ color: 'var(--muted)', marginRight: '1rem', flexShrink: 0 }} />
              <Command.Input className="cmdk-input" placeholder="Search any tool..." autoFocus />
              <kbd style={{ 
                padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 600,
                backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(255, 255, 255, 0.6)', 
                borderRadius: '8px', color: 'var(--muted)', marginLeft: '1rem'
              }}>
                Esc
              </kbd>
            </div>
            
            <Command.List className="cmdk-list">
              <Command.Empty className="cmdk-empty">
                <div style={{ marginBottom: '0.5rem', fontWeight: 600, color: 'var(--foreground)' }}>No tools found</div>
                <div style={{ fontSize: '0.9rem' }}>Try searching for image, PDF, audio, converter, or calculator.</div>
              </Command.Empty>

              {Object.entries(groupedTools).map(([category, items]) => (
                <Command.Group key={category} heading={category} className="cmdk-group">
                  {items.map((tool) => (
                    <Command.Item 
                      key={tool.href} 
                      className="cmdk-item"
                      value={`${tool.name} ${tool.category} ${tool.description} ${tool.keywords.join(' ')}`}
                      onSelect={() => runCommand(() => router.push(tool.href))}
                    >
                      <div style={{ 
                        padding: '0.5rem', borderRadius: '12px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.5)', border: '1px solid rgba(255, 255, 255, 0.6)' 
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px' }}>
                          {React.cloneElement(tool.icon as React.ReactElement<{ size?: number; style?: React.CSSProperties }>, { size: 20, style: { color: 'var(--primary)' } })}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span style={{ fontWeight: 600, fontSize: '18px', color: 'var(--foreground)', lineHeight: '1.2' }}>{tool.name}</span>
                        <span style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.4' }}>{tool.description}</span>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
          </div>
        </>
      )}
    </>
  );
}
