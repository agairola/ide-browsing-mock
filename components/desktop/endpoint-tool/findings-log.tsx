"use client";

import { useEffect, useState, useRef } from "react";

interface LogLine {
  text: string;
  color: string;
  delay: number;
}

const CHAR_DELAY_MS = 25;

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

interface LineState {
  lineIndex: number;
  charCount: number;
  complete: boolean;
}

export function FindingsLog() {
  const [lines, setLines] = useState<LineState[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    logOutput.forEach((line, i) => {
      // Start revealing this line at its delay
      timers.push(
        setTimeout(() => {
          if (!line.text) {
            // Empty line — add immediately as complete
            setLines((prev) => [...prev, { lineIndex: i, charCount: 0, complete: true }]);
            return;
          }

          // Add line with 0 chars
          setLines((prev) => [...prev, { lineIndex: i, charCount: 0, complete: false }]);

          // Stream characters
          const chars = line.text.length;
          for (let c = 1; c <= chars; c++) {
            timers.push(
              setTimeout(() => {
                setLines((prev) =>
                  prev.map((l) =>
                    l.lineIndex === i
                      ? { ...l, charCount: c, complete: c >= chars }
                      : l
                  )
                );
              }, c * CHAR_DELAY_MS)
            );
          }
        }, line.delay * 1000)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const currentStreamingIndex = lines.length > 0 && !lines[lines.length - 1].complete
    ? lines[lines.length - 1].lineIndex
    : -1;

  return (
    <div className="px-3 py-2 flex-1 min-h-0 overflow-hidden">
      <div className="text-[9px] font-semibold text-[hsl(170,20%,40%)] uppercase tracking-wider px-1 mb-1.5">
        Findings Log
      </div>
      <div
        ref={scrollRef}
        className="h-full overflow-auto rounded-md bg-[hsl(170,15%,5%)] border border-[hsl(170,15%,12%)] p-2 font-mono text-[10px] leading-4"
      >
        {lines.map((ls) => {
          const line = logOutput[ls.lineIndex];
          const isStreaming = ls.lineIndex === currentStreamingIndex;
          const displayText = line.text ? line.text.slice(0, ls.charCount) : "\u00A0";

          return (
            <div
              key={`log-${ls.lineIndex}`}
              className={isStreaming ? "streaming-line" : ""}
              style={{
                color: line.color || "transparent",
              }}
            >
              {displayText}
            </div>
          );
        })}
        <span
          className="inline-block w-1.5 h-3 bg-[#06d6a0] ml-0.5"
          style={{ animation: "typingCursor 1s step-end infinite" }}
        />
      </div>
    </div>
  );
}
