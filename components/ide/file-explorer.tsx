"use client";

import {
  ChevronDown,
  ChevronRight,
  FileText,
  FileCode,
  FolderOpen,
  Folder,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

interface FileItem {
  name: string;
  type: "file" | "folder";
  icon?: string;
  children?: FileItem[];
  active?: boolean;
  warning?: boolean;
}

const fileTree: FileItem[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "dashboard.tsx", type: "file", icon: "tsx" },
          { name: "sidebar.tsx", type: "file", icon: "tsx" },
          { name: "header.tsx", type: "file", icon: "tsx" },
          { name: "data-table.tsx", type: "file", icon: "tsx" },
        ],
      },
      {
        name: "services",
        type: "folder",
        children: [
          {
            name: "user-service.ts",
            type: "file",
            icon: "ts",
            active: true,
            warning: true,
          },
          { name: "auth-handler.ts", type: "file", icon: "ts", warning: true },
          { name: "analytics.ts", type: "file", icon: "ts" },
          { name: "data-export.ts", type: "file", icon: "ts" },
        ],
      },
      {
        name: "hooks",
        type: "folder",
        children: [
          { name: "use-auth.ts", type: "file", icon: "ts" },
          { name: "use-data.ts", type: "file", icon: "ts" },
        ],
      },
      {
        name: "utils",
        type: "folder",
        children: [
          { name: "helpers.ts", type: "file", icon: "ts" },
          { name: "constants.ts", type: "file", icon: "ts" },
        ],
      },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [{ name: "favicon.ico", type: "file" }],
  },
  { name: ".env.example", type: "file" },
  { name: "package.json", type: "file", icon: "json" },
  { name: "tsconfig.json", type: "file", icon: "json" },
];

function getFileIcon(item: FileItem) {
  if (item.type === "folder") return null;
  switch (item.icon) {
    case "tsx":
      return <FileCode className="w-4 h-4 text-[#519aba] shrink-0" />;
    case "ts":
      return <FileCode className="w-4 h-4 text-[#3178c6] shrink-0" />;
    case "json":
      return <FileText className="w-4 h-4 text-[#cbcb41] shrink-0" />;
    default:
      return <FileText className="w-4 h-4 text-muted-foreground shrink-0" />;
  }
}

function FileTreeItem({
  item,
  depth = 0,
}: {
  item: FileItem;
  depth?: number;
}) {
  const [open, setOpen] = useState(
    item.type === "folder" &&
      (item.name === "src" ||
        item.name === "services" ||
        item.name === "components")
  );

  if (item.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 w-full py-0.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors rounded-sm"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          type="button"
        >
          {open ? (
            <ChevronDown className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          )}
          {open ? (
            <FolderOpen className="w-4 h-4 text-[#e8a427] shrink-0" />
          ) : (
            <Folder className="w-4 h-4 text-[#e8a427] shrink-0" />
          )}
          <span className="truncate font-mono">{item.name}</span>
        </button>
        {open && item.children && (
          <div>
            {item.children.map((child) => (
              <FileTreeItem key={child.name} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      className={`flex items-center gap-1.5 w-full py-0.5 text-xs transition-colors rounded-sm ${
        item.active
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      }`}
      style={{ paddingLeft: `${depth * 12 + 24}px` }}
      type="button"
    >
      {getFileIcon(item)}
      <span className="truncate font-mono">{item.name}</span>
      {item.warning && (
        <AlertTriangle className="w-3 h-3 text-[#f59e0b] shrink-0 ml-auto mr-2" />
      )}
    </button>
  );
}

export function FileExplorer() {
  return (
    <div className="w-56 bg-[hsl(220,14%,10%)] border-r border-border flex flex-col overflow-hidden">
      <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Explorer
      </div>
      <div className="px-1 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground/80 pl-3">
        my-project
      </div>
      <div className="flex-1 overflow-y-auto py-1">
        {fileTree.map((item) => (
          <FileTreeItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
