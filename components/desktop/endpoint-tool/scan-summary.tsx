"use client";

import { useEffect, useState } from "react";

export function ScanSummary() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 18000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="px-4 py-3 border-t border-[hsl(170,20%,15%)]/30 shrink-0"
      style={{ animation: "slideInFromLeft 0.4s ease-out" }}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <span className="w-2 h-2 rounded-full bg-[hsl(0,72%,51%)] shadow-[0_0_6px_hsl(0,72%,51%)]" />
        <span className="text-[11px] font-bold text-[hsl(0,72%,65%)] uppercase tracking-wider">
          Compliance: Fail
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 text-center">
        <div className="bg-[hsla(0,72%,51%,0.1)] border border-[hsla(0,72%,51%,0.10)] rounded-md px-1 py-1.5">
          <div className="text-[15px] font-black text-[hsl(0,72%,65%)] tabular-nums">5</div>
          <div className="text-[8px] font-semibold text-[hsl(0,50%,50%)] uppercase tracking-wider">Critical</div>
        </div>
        <div className="bg-[hsla(30,100%,50%,0.08)] border border-[hsla(30,100%,50%,0.08)] rounded-md px-1 py-1.5">
          <div className="text-[15px] font-black text-[hsl(30,100%,65%)] tabular-nums">5</div>
          <div className="text-[8px] font-semibold text-[hsl(30,70%,45%)] uppercase tracking-wider">High</div>
        </div>
        <div className="bg-[hsla(45,100%,50%,0.06)] border border-[hsla(45,100%,50%,0.06)] rounded-md px-1 py-1.5">
          <div className="text-[15px] font-black text-[hsl(45,100%,65%)] tabular-nums">3</div>
          <div className="text-[8px] font-semibold text-[hsl(45,70%,45%)] uppercase tracking-wider">Medium</div>
        </div>
      </div>
    </div>
  );
}
