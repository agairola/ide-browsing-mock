"use client";

import { X, FileCode, AlertTriangle } from "lucide-react";

const tabs = [
  { name: "user-service.ts", active: true, warning: true },
  { name: "auth-handler.ts", active: false, warning: true },
  { name: "dashboard.tsx", active: false },
];

export function EditorTabs() {
  return (
    <div className="flex items-center h-9 bg-[hsl(220,14%,8%)] border-b border-border overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className={`flex items-center gap-2 h-full px-3 text-xs font-mono border-r border-border cursor-pointer transition-colors shrink-0 ${
            tab.active
              ? "bg-[hsl(220,14%,12%)] text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileCode className="w-3.5 h-3.5 text-[#3178c6] shrink-0" />
          <span>{tab.name}</span>
          {tab.warning && (
            <AlertTriangle className="w-3 h-3 text-[#f59e0b] shrink-0" />
          )}
          <X className="w-3 h-3 text-muted-foreground hover:text-foreground shrink-0" />
        </div>
      ))}
    </div>
  );
}
