"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle theme"
      style={{
        display: 'flex', alignItems: 'center', justifyItems: 'center',
        padding: '0.5rem',
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid var(--border)',
        color: 'var(--muted)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        width: '38px', height: '38px',
        opacity: mounted ? 1 : 0 // prevent layout shift on hydration by keeping width constant but hiding it until mounted
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
        e.currentTarget.style.color = 'var(--foreground)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.color = 'var(--muted)';
      }}
    >
      {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
