"use client";

import { useEffect, useState } from "react";

interface DesktopAreaProps {
  children: React.ReactNode;
}

export function DesktopArea({ children }: DesktopAreaProps) {
  const [glowActive, setGlowActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setGlowActive(false), 18000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 relative overflow-hidden desktop-wallpaper">
      {/* Subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]" />

      {/* AI activity glow overlay */}
      <div
        className="absolute inset-0 z-[55] pointer-events-none transition-opacity duration-1000"
        style={{
          boxShadow: "inset 0 0 60px 0 hsla(170,60%,40%,0.07), inset 0 0 2px 0 hsla(170,70%,50%,0.15)",
          animation: glowActive ? "borderGlow 3s ease-in-out infinite" : "none",
          opacity: glowActive ? 1 : 0,
        }}
      />

      {children}
    </div>
  );
}
