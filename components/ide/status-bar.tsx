"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, GitBranch, ShieldAlert } from "lucide-react";

export function StatusBar() {
  const [violationCount, setViolationCount] = useState(0);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const steps = [
      { count: 3, delay: 4000 },
      { count: 5, delay: 7000 },
      { count: 8, delay: 10000 },
      { count: 11, delay: 14000 },
      { count: 13, delay: 17000 },
    ];
    const timers = steps.map((s) =>
      setTimeout(() => setViolationCount(s.count), s.delay)
    );
    const scanTimer = setTimeout(() => setScanning(false), 18000);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(scanTimer);
    };
  }, []);

  const barColor = violationCount > 0 ? "bg-[hsl(0,60%,35%)]" : "bg-[hsl(210,80%,35%)]";

  return (
    <div className={`flex items-center justify-between h-6 px-3 text-[11px] text-[hsl(0,0%,92%)] ${barColor} transition-colors duration-500 select-none`}>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <GitBranch className="w-3.5 h-3.5" />
          main
        </span>
        {violationCount > 0 && (
          <span className="flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            {violationCount} GDPR violations
          </span>
        )}
        {scanning && (
          <span className="flex items-center gap-1" style={{ animation: "glowPulse 1.5s ease-in-out infinite" }}>
            <ShieldAlert className="w-3.5 h-3.5" />
            Scanning...
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span>TypeScript</span>
        <span>UTF-8</span>
        <span>LF</span>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
}
