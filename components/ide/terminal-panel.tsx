"use client";

import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface TermLine {
  text: string;
  color: string;
  delay: number;
}

const terminalOutput: TermLine[] = [
  { text: "$ gdpr-scanner --watch src/services/user-service.ts", color: "hsl(220,10%,70%)", delay: 0 },
  { text: "", color: "", delay: 0.5 },
  { text: "[scanner] Initializing GDPR compliance scan...", color: "hsl(210,100%,56%)", delay: 1.5 },
  { text: "[scanner] Analyzing AST for hardcoded secrets...", color: "hsl(210,100%,56%)", delay: 2.5 },
  { text: "", color: "", delay: 3 },
  { text: "  CRITICAL  Line 5: Hardcoded database host in source code", color: "hsl(0,72%,65%)", delay: 3.2 },
  { text: "  CRITICAL  Line 6: Hardcoded database password detected", color: "hsl(0,72%,65%)", delay: 3.7 },
  { text: "  CRITICAL  Line 7: Hardcoded API secret key (live credential)", color: "hsl(0,72%,65%)", delay: 4.2 },
  { text: "", color: "", delay: 5 },
  { text: "[scanner] Scanning for PII exposure patterns...", color: "hsl(210,100%,56%)", delay: 5.5 },
  { text: "", color: "", delay: 6 },
  { text: "  HIGH  Line 12: SSN field stored without encryption (Art. 32)", color: "hsl(30,100%,65%)", delay: 6.5 },
  { text: "  HIGH  Line 14: Credit card data unencrypted (Art. 32)", color: "hsl(30,100%,65%)", delay: 7 },
  { text: "  MEDIUM  Line 19: SELECT * over-fetches sensitive PII (Art. 5)", color: "hsl(45,100%,60%)", delay: 8 },
  { text: "", color: "", delay: 9 },
  { text: "[scanner] Checking for PII logging / exposure...", color: "hsl(210,100%,56%)", delay: 9.5 },
  { text: "", color: "", delay: 10 },
  { text: "  CRITICAL  Line 23: SSN logged to console (Art. 5(1)(f))", color: "hsl(0,72%,65%)", delay: 10 },
  { text: "  CRITICAL  Line 24: Credit card logged to console (Art. 5(1)(f))", color: "hsl(0,72%,65%)", delay: 10.5 },
  { text: "  HIGH  Line 27: SSN stored in localStorage unencrypted (Art. 32)", color: "hsl(30,100%,65%)", delay: 11.5 },
  { text: "  HIGH  Line 28: CC stored in localStorage unencrypted (Art. 32)", color: "hsl(30,100%,65%)", delay: 12 },
  { text: "", color: "", delay: 13 },
  { text: "[scanner] Checking consent & data retention...", color: "hsl(210,100%,56%)", delay: 13.5 },
  { text: "", color: "", delay: 14 },
  { text: "  HIGH  Line 31: Email sent without consent check (Art. 7)", color: "hsl(30,100%,65%)", delay: 14.5 },
  { text: "  MEDIUM  Line 37: No data retention policy (Art. 17 Right to Erasure)", color: "hsl(45,100%,60%)", delay: 15.5 },
  { text: "  MEDIUM  Line 38: Soft-delete retains PII indefinitely (Art. 17)", color: "hsl(45,100%,60%)", delay: 16 },
  { text: "", color: "", delay: 17 },
  { text: "[scanner] Scan complete: 5 critical, 5 high, 3 medium violations found", color: "hsl(0,72%,65%)", delay: 17.5 },
  { text: "[scanner] GDPR compliance: FAIL", color: "hsl(0,72%,65%)", delay: 18 },
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
    <div className="h-44 bg-[hsl(220,14%,8%)] border-t border-border flex flex-col">
      {/* Terminal header */}
      <div className="flex items-center h-8 px-3 border-b border-border shrink-0">
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-foreground border-b border-foreground pb-1 px-1">Problems</span>
          <span className="text-muted-foreground px-1">Output</span>
          <span className="text-muted-foreground px-1">Terminal</span>
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
