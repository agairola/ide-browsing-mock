"use client";

import { useEffect, useState } from "react";

interface LogLine {
  text: string;
  color: string;
  delay: number;
}

const logOutput: LogLine[] = [
  { text: "$ gdpr-scan --target user-service.ts", color: "hsl(170,20%,55%)", delay: 0 },
  { text: "", color: "", delay: 0.5 },
  { text: "[init] Loading GDPR ruleset v2.4...", color: "hsl(170,50%,50%)", delay: 1.5 },
  { text: "[ast] Analyzing user-service.ts...", color: "hsl(170,50%,50%)", delay: 2.5 },
  { text: "", color: "", delay: 3 },
  { text: "  CRITICAL  L5: Hardcoded database host", color: "hsl(0,72%,65%)", delay: 3.2 },
  { text: "  CRITICAL  L6: Hardcoded database password", color: "hsl(0,72%,65%)", delay: 3.7 },
  { text: "  CRITICAL  L7: Hardcoded API secret key", color: "hsl(0,72%,65%)", delay: 4.2 },
  { text: "", color: "", delay: 5 },
  { text: "[pii] Scanning for PII exposure...", color: "hsl(170,50%,50%)", delay: 5.5 },
  { text: "", color: "", delay: 6 },
  { text: "  HIGH  L12: SSN field unencrypted (Art. 32)", color: "hsl(30,100%,65%)", delay: 6.5 },
  { text: "  HIGH  L14: Credit card unencrypted (Art. 32)", color: "hsl(30,100%,65%)", delay: 7 },
  { text: "  MEDIUM  L19: SELECT * over-fetches PII (Art. 5)", color: "hsl(45,100%,60%)", delay: 8 },
  { text: "", color: "", delay: 9 },
  { text: "[log] Checking PII logging...", color: "hsl(170,50%,50%)", delay: 9.5 },
  { text: "", color: "", delay: 10 },
  { text: "  CRITICAL  L23: SSN logged to console", color: "hsl(0,72%,65%)", delay: 10 },
  { text: "  CRITICAL  L24: CC logged to console", color: "hsl(0,72%,65%)", delay: 10.5 },
  { text: "  HIGH  L27: SSN in localStorage", color: "hsl(30,100%,65%)", delay: 11.5 },
  { text: "  HIGH  L28: CC in localStorage", color: "hsl(30,100%,65%)", delay: 12 },
  { text: "", color: "", delay: 13 },
  { text: "[consent] Checking consent & retention...", color: "hsl(170,50%,50%)", delay: 13.5 },
  { text: "", color: "", delay: 14 },
  { text: "  HIGH  L31: No consent for email (Art. 7)", color: "hsl(30,100%,65%)", delay: 14.5 },
  { text: "  MEDIUM  L37: No retention policy (Art. 17)", color: "hsl(45,100%,60%)", delay: 15.5 },
  { text: "  MEDIUM  L38: Soft-delete retains PII (Art. 17)", color: "hsl(45,100%,60%)", delay: 16 },
  { text: "", color: "", delay: 17 },
  { text: "[done] 5 critical, 5 high, 3 medium found", color: "hsl(0,72%,65%)", delay: 17.5 },
  { text: "[done] GDPR compliance: FAIL", color: "hsl(0,72%,65%)", delay: 18 },
];

export function FindingsLog() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = logOutput.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="px-3 py-2 flex-1 min-h-0 overflow-hidden">
      <div className="text-[9px] font-semibold text-[hsl(170,20%,40%)] uppercase tracking-wider px-1 mb-1.5">
        Findings Log
      </div>
      <div className="h-full overflow-auto rounded-md bg-[hsl(170,15%,5%)] border border-[hsl(170,15%,12%)] p-2 font-mono text-[10px] leading-4">
        {logOutput.slice(0, visibleLines).map((line, i) => (
          <div
            key={`log-${i}`}
            style={{
              color: line.color || "transparent",
              animation: "slideInFromLeft 0.2s ease-out",
            }}
          >
            {line.text || "\u00A0"}
          </div>
        ))}
        <span
          className="inline-block w-1.5 h-3 bg-[#06d6a0] ml-0.5"
          style={{ animation: "typingCursor 1s step-end infinite" }}
        />
      </div>
    </div>
  );
}
