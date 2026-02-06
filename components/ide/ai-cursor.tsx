"use client";

import { useEffect, useState } from "react";

const cursorStops = [
  { x: 45, y: 30, delay: 0 },
  { x: 22, y: 12, delay: 2000 },
  { x: 55, y: 28, delay: 4000 },
  { x: 40, y: 42, delay: 6500 },
  { x: 60, y: 52, delay: 9000 },
  { x: 30, y: 60, delay: 11000 },
  { x: 50, y: 38, delay: 13500 },
  { x: 25, y: 48, delay: 15500 },
];

export function AiCursor() {
  const [pos, setPos] = useState({ x: 45, y: 30 });
  const [clicking, setClicking] = useState(false);
  const [stopIndex, setStopIndex] = useState(0);

  useEffect(() => {
    let idx = 0;
    const timers: NodeJS.Timeout[] = [];

    cursorStops.forEach((stop, i) => {
      timers.push(
        setTimeout(() => {
          setPos({ x: stop.x, y: stop.y });
          setStopIndex(i);
          // Click effect
          setTimeout(() => {
            setClicking(true);
            setTimeout(() => setClicking(false), 400);
          }, 600);
        }, stop.delay)
      );
    });

    // Loop
    const loopTimer = setTimeout(() => {
      idx = 0;
      setPos({ x: cursorStops[0].x, y: cursorStops[0].y });
      setStopIndex(0);
    }, 18000);
    timers.push(loopTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* Cursor */}
      <div
        className="absolute transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
      >
        {/* Cursor arrow SVG */}
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <path
            d="M2 2L2 19L6.5 15L11 22L14 20.5L9.5 13.5L15 12L2 2Z"
            fill="hsl(0, 0%, 100%)"
            stroke="hsl(220, 14%, 10%)"
            strokeWidth="1.5"
          />
        </svg>

        {/* AI badge */}
        <div className="absolute -top-5 left-5 bg-[hsl(210,100%,56%)] text-[hsl(0,0%,100%)] text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-lg whitespace-nowrap">
          AI Agent
        </div>

        {/* Click ripple */}
        {clicking && (
          <div className="absolute top-2 left-1">
            <span className="absolute w-4 h-4 rounded-full border-2 border-[hsl(210,100%,56%)] animate-ping opacity-75" />
            <span className="absolute w-4 h-4 rounded-full bg-[hsla(210,100%,56%,0.2)]" style={{ animation: "click-ring 0.5s ease-out forwards" }} />
          </div>
        )}
      </div>
    </div>
  );
}
