"use client";

import { useEffect, useState } from "react";

// Cursor stops alternate between IDE window (left ~58%) and endpoint tool (right ~36%)
// IDE: x ranges ~4-55%, endpoint: x ranges ~65-92%
// Desktop coordinates (relative to DesktopArea)
const cursorStops = [
  // 0-2s: IDE code top — reading imports, credentials
  { x: 28, y: 18, delay: 0, label: "Scanning imports..." },
  // 2.5-4s: IDE code lines 5-7 — spotting hardcoded secrets
  { x: 32, y: 30, delay: 2000, label: "Detecting secrets..." },
  // 4.5-6s: Endpoint tool top — checking findings
  { x: 76, y: 22, delay: 4500, label: "Logging findings..." },
  // 6.5-8s: IDE code lines 12-19 — scanning PII fields
  { x: 30, y: 42, delay: 6500, label: "Scanning PII..." },
  // 9-10s: Endpoint tool middle — reviewing PII findings
  { x: 78, y: 42, delay: 9000, label: "Reviewing alerts..." },
  // 10.5-12s: IDE code lines 23-28 — console.log + localStorage
  { x: 33, y: 55, delay: 10500, label: "Checking exposure..." },
  // 12.5-14s: Endpoint tool middle — new alerts
  { x: 77, y: 55, delay: 12500, label: "Updating findings..." },
  // 14.5-16s: IDE code lines 31-38 — consent + retention
  { x: 28, y: 66, delay: 14500, label: "Checking consent..." },
  // 17-18s: Endpoint tool bottom — final summary
  { x: 78, y: 75, delay: 17000, label: "Generating report..." },
];

export function AiCursor() {
  const [pos, setPos] = useState({ x: cursorStops[0].x, y: cursorStops[0].y });
  const [clicking, setClicking] = useState(false);
  const [label, setLabel] = useState(cursorStops[0].label);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    cursorStops.forEach((stop) => {
      timers.push(
        setTimeout(() => {
          setPos({ x: stop.x, y: stop.y });
          setLabel(stop.label);
          // Click effect after arriving
          setTimeout(() => {
            setClicking(true);
            setTimeout(() => setClicking(false), 400);
          }, 600);
        }, stop.delay)
      );
    });

    // Loop after 18s
    const loopTimer = setTimeout(() => {
      setPos({ x: cursorStops[0].x, y: cursorStops[0].y });
      setLabel(cursorStops[0].label);
    }, 18000);
    timers.push(loopTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* Cursor */}
      <div
        className="absolute transition-all duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      >
        {/* Cursor arrow SVG */}
        <svg
          width="18"
          height="22"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(6,214,160,0.3)]"
        >
          <path
            d="M2 2L2 19L6.5 15L11 22L14 20.5L9.5 13.5L15 12L2 2Z"
            fill="hsl(0, 0%, 100%)"
            stroke="hsl(220, 14%, 10%)"
            strokeWidth="1.5"
          />
        </svg>

        {/* AI badge */}
        <div className="absolute -top-6 left-5 bg-gradient-to-r from-[#06d6a0] to-[#0a8f6f] text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-[#06d6a0]/20 whitespace-nowrap flex items-center gap-1">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
          </svg>
          {label}
        </div>

        {/* Click ripple */}
        {clicking && (
          <div className="absolute top-2 left-1">
            <span className="absolute w-4 h-4 rounded-full border-2 border-[#06d6a0] animate-ping opacity-75" />
            <span className="absolute w-4 h-4 rounded-full bg-[rgba(6,214,160,0.2)]" />
          </div>
        )}
      </div>
    </div>
  );
}
