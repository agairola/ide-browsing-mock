"use client";

import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface TermLine {
  text: string;
  color: string;
  delay: number;
}

const terminalOutput: TermLine[] = [
  { text: "$ npm run dev", color: "hsl(220,10%,70%)", delay: 0 },
  { text: "", color: "", delay: 0.3 },
  { text: "> my-project@0.1.0 dev", color: "hsl(220,10%,50%)", delay: 0.5 },
  { text: "> next dev --turbopack", color: "hsl(220,10%,50%)", delay: 0.6 },
  { text: "", color: "", delay: 0.8 },
  { text: "  ▲ Next.js 16.0.1 (Turbopack)", color: "hsl(0,0%,90%)", delay: 1.2 },
  { text: "  - Local:        http://localhost:3000", color: "hsl(220,10%,55%)", delay: 1.4 },
  { text: "  - Network:      http://192.168.1.42:3000", color: "hsl(220,10%,55%)", delay: 1.5 },
  { text: "", color: "", delay: 1.7 },
  { text: " ✓ Starting...", color: "hsl(160,60%,45%)", delay: 2 },
  { text: " ✓ Ready in 1.2s", color: "hsl(160,60%,45%)", delay: 2.8 },
  { text: "", color: "", delay: 3.2 },
  { text: " ○ Compiling /services/user-service ...", color: "hsl(220,10%,55%)", delay: 3.5 },
  { text: " ✓ Compiled /services/user-service in 340ms", color: "hsl(160,60%,45%)", delay: 4.5 },
  { text: " ○ Compiling /dashboard ...", color: "hsl(220,10%,55%)", delay: 6 },
  { text: " ✓ Compiled /dashboard in 180ms", color: "hsl(160,60%,45%)", delay: 7 },
];

export function TerminalPanel() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timers = terminalOutput.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(i + 1);
      }, line.delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-36 bg-[hsl(220,14%,8%)] border-t border-border flex flex-col">
      {/* Terminal header */}
      <div className="flex items-center h-8 px-3 border-b border-border shrink-0">
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-muted-foreground px-1">Problems</span>
          <span className="text-muted-foreground px-1">Output</span>
          <span className="text-foreground border-b border-foreground pb-1 px-1">Terminal</span>
          <span className="text-muted-foreground px-1">Debug Console</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>

      {/* Terminal content */}
      <div className="flex-1 overflow-auto p-2 font-mono text-xs leading-5">
        {terminalOutput.slice(0, visibleLines).map((line, i) => (
          <div
            key={`term-${i}`}
            style={{
              color: line.color || "transparent",
              animation: "slideInFromLeft 0.3s ease-out",
            }}
          >
            {line.text || "\u00A0"}
          </div>
        ))}
        <span
          className="inline-block w-1.5 h-3.5 bg-foreground ml-0.5"
          style={{ animation: "typingCursor 1s step-end infinite" }}
        />
      </div>
    </div>
  );
}
