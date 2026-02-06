"use client";

import { GitBranch } from "lucide-react";

export function StatusBar() {
  return (
    <div className="flex items-center justify-between h-[22px] px-3 text-[11px] text-[hsl(0,0%,82%)] bg-[hsl(210,80%,35%)] select-none shrink-0">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <GitBranch className="w-3.5 h-3.5" />
          main
        </span>
        <span className="flex items-center gap-1">
          0 errors, 0 warnings
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span>Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>LF</span>
        <span>TypeScript</span>
      </div>
    </div>
  );
}
