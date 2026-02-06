"use client";

import { useEffect, useState } from "react";
import { Shield, Circle } from "lucide-react";

export function ToolHeader() {
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setScanning(false), 18000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 py-3 border-b border-[hsl(170,20%,15%)]/30">
      {/* Branding */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#06d6a0] to-[#0a8f6f] flex items-center justify-center shadow-lg shadow-[#06d6a0]/10">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-[13px] font-bold text-[hsl(170,50%,85%)] tracking-tight leading-none">
            dontgetfined.ai
          </div>
          <div className="text-[10px] text-[hsl(170,20%,45%)] mt-0.5">
            GDPR Compliance Scanner v2.4
          </div>
        </div>
      </div>

      {/* Scan target */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[hsl(170,15%,11%)]/30 rounded-md px-2.5 py-1.5 flex-1 mr-2">
          <span className="text-[10px] text-[hsl(170,20%,40%)] uppercase tracking-wider font-medium">Target</span>
          <span className="text-[11px] text-[hsl(170,30%,75%)] font-mono">user-service.ts</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Circle
            className={`w-2 h-2 ${scanning ? "text-[#06d6a0] fill-[#06d6a0]" : "text-[hsl(0,72%,51%)] fill-[hsl(0,72%,51%)]"}`}
            style={scanning ? { animation: "glowPulse 1.5s ease-in-out infinite" } : undefined}
          />
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${scanning ? "shimmer-text" : "text-[hsl(0,72%,65%)]"}`}>
            {scanning ? "Scanning" : "Failed"}
          </span>
        </div>
      </div>
    </div>
  );
}
