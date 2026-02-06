"use client";

import {
  Files,
  Search,
  GitBranch,
  Bug,
  Blocks,
  Settings,
  ShieldAlert,
  UserCircle,
} from "lucide-react";

const topIcons = [
  { icon: Files, label: "Explorer", active: true },
  { icon: Search, label: "Search" },
  { icon: GitBranch, label: "Source Control" },
  { icon: Bug, label: "Run and Debug" },
  { icon: Blocks, label: "Extensions" },
  { icon: ShieldAlert, label: "GDPR Scanner", active: false, alert: true },
];

const bottomIcons = [
  { icon: UserCircle, label: "Account" },
  { icon: Settings, label: "Settings" },
];

export function ActivityBar() {
  return (
    <div className="flex flex-col items-center justify-between w-12 bg-[hsl(220,14%,8%)] border-r border-border py-2">
      <div className="flex flex-col items-center gap-1">
        {topIcons.map((item) => (
          <button
            key={item.label}
            className={`relative flex items-center justify-center w-10 h-10 rounded-md transition-colors ${
              item.active
                ? "text-foreground bg-secondary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label={item.label}
            title={item.label}
            type="button"
          >
            <item.icon className="w-5 h-5" />
            {item.alert && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            )}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1">
        {bottomIcons.map((item) => (
          <button
            key={item.label}
            className="flex items-center justify-center w-10 h-10 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            aria-label={item.label}
            title={item.label}
            type="button"
          >
            <item.icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </div>
  );
}
