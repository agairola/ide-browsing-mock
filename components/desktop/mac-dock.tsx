"use client";

import {
  Globe,
  Mail,
  MessageSquare,
  Settings,
  FolderOpen,
  Music,
} from "lucide-react";

interface DockApp {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const dockApps: DockApp[] = [
  {
    label: "Finder",
    icon: (
      <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-[#3a8bfd] to-[#1162dc] flex items-center justify-center shadow-inner">
        <FolderOpen className="w-6 h-6 text-white" />
      </div>
    ),
  },
  {
    label: "Visual Studio Code",
    active: true,
    icon: (
      <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-[#2ea2ee] to-[#0066b8] flex items-center justify-center shadow-inner">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M17 2L7 11.5L17 21L21 19V4L17 2Z" fill="white" opacity="0.9" />
          <path d="M7 11.5L2 7L4 5L10 11.5L4 18L2 16L7 11.5Z" fill="white" opacity="0.7" />
        </svg>
      </div>
    ),
  },
  {
    label: "dontgetfined.ai",
    active: true,
    icon: (
      <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-[#06d6a0] to-[#0a8f6f] flex items-center justify-center shadow-inner">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M12 8C13.657 8 15 9.343 15 11C15 12.657 13.657 14 12 14C10.343 14 9 12.657 9 11C9 9.343 10.343 8 12 8Z" fill="white" opacity="0.9" />
          <path d="M12 14V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M9 16H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
  },
  {
    label: "Safari",
    icon: (
      <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-[#5ac8fa] to-[#007aff] flex items-center justify-center shadow-inner">
        <Globe className="w-6 h-6 text-white" />
      </div>
    ),
  },
  {
    label: "Mail",
    icon: (
      <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-[#5ac8fa] to-[#2e78d2] flex items-center justify-center shadow-inner">
        <Mail className="w-6 h-6 text-white" />
      </div>
    ),
  },
  {
    label: "Messages",
    icon: (
      <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-[#69db7c] to-[#34a853] flex items-center justify-center shadow-inner">
        <MessageSquare className="w-6 h-6 text-white" />
      </div>
    ),
  },
  {
    label: "Music",
    icon: (
      <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-[#fc5c7d] to-[#e2334a] flex items-center justify-center shadow-inner">
        <Music className="w-6 h-6 text-white" />
      </div>
    ),
  },
  {
    label: "System Preferences",
    icon: (
      <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-[#8e8e93] to-[#636366] flex items-center justify-center shadow-inner">
        <Settings className="w-6 h-6 text-white" />
      </div>
    ),
  },
];

export function MacDock() {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-end gap-1 px-2 py-1.5 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/[0.12] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        {dockApps.map((app, i) => (
          <div key={app.label} className="flex items-end">
            {/* Separator between app groups */}
            {i === 3 && (
              <div className="w-px h-8 bg-white/10 mx-1.5 self-center shrink-0" />
            )}
            <div className="flex flex-col items-center">
              <div
                className="w-11 h-11 cursor-pointer transition-transform duration-200 hover:scale-125 hover:-translate-y-2"
                title={app.label}
              >
                {app.icon}
              </div>
              {/* Active indicator dot */}
              {app.active && (
                <div className="w-1 h-1 rounded-full bg-white/60 mt-0.5" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
