"use client";

import { useEffect, useState } from "react";

const TOTAL_STEPS = 8;

const stepDelays = [1, 2.5, 4, 7, 10, 14, 16, 18];

export function ScanProgress() {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    const timers = stepDelays.map((delay, i) =>
      setTimeout(() => setCompletedSteps(i + 1), delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const pct = Math.round((completedSteps / TOTAL_STEPS) * 100);
  const done = completedSteps >= TOTAL_STEPS;

  return (
    <div className="px-4 py-2.5 border-b border-[hsl(170,20%,15%)]">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-medium text-[hsl(170,20%,50%)] uppercase tracking-wider">
          {done ? "Scan Complete" : "Scanning..."}
        </span>
        <span className={`text-[11px] font-bold tabular-nums ${done ? "text-[hsl(0,72%,65%)]" : "text-[#06d6a0]"}`}>
          {pct}%
        </span>
      </div>
      <div className="h-1.5 bg-[hsl(170,15%,12%)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: done
              ? "linear-gradient(90deg, hsl(0,72%,51%), hsl(0,72%,40%))"
              : "linear-gradient(90deg, #06d6a0, #0a8f6f)",
          }}
        />
      </div>
    </div>
  );
}
