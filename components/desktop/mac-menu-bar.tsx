"use client";

import { useEffect, useState } from "react";
import { Apple, Wifi, Battery, Search } from "lucide-react";

export function MacMenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between h-[25px] bg-black/60 backdrop-blur-2xl px-3 text-[13px] text-white/90 select-none z-50 shrink-0 border-b border-white/[0.04]">
      <div className="flex items-center gap-4">
        {/* Apple logo */}
        <svg width="14" height="17" viewBox="0 0 14 17" fill="currentColor" className="opacity-90">
          <path d="M13.1 12.5c-.3.7-.7 1.3-1.1 1.8-.6.8-1.1 1.3-1.5 1.6-.6.5-1.3.7-2 .8-.5 0-1.1-.1-1.8-.4-.7-.3-1.3-.4-1.8-.4-.6 0-1.1.1-1.8.4-.6.3-1.2.4-1.6.4C.7 16.8 0 16.5 0 16.5c-.4-.3-.9-.9-1.5-1.6C-2.2 14-.3 13-.3 11.9c0-1 .2-1.9.7-2.6.5-.8 1.2-1.2 2-1.3.5 0 1.2.2 2 .5.8.3 1.3.5 1.5.5.2 0 .7-.2 1.7-.6.9-.3 1.6-.5 2.1-.4 1.6.1 2.8.8 3.5 2-1.4.9-2.1 2.1-2 3.6 0 1.2.4 2.2 1.3 3 .4.4.8.7 1.3.9l-.3.8zM9.6 1c0 .9-.3 1.8-1 2.6-.8.9-1.7 1.5-2.8 1.4 0-.1 0-.2 0-.4 0-.9.4-1.8 1-2.5.3-.4.8-.7 1.3-1 .5-.3 1-.4 1.5-.5 0 .1 0 .3 0 .4z" transform="translate(1.5 0)" />
        </svg>

        {/* App menu items */}
        <span className="font-semibold text-[13px]">dontgetfined.ai</span>
        <span className="text-white/60">File</span>
        <span className="text-white/60">Edit</span>
        <span className="text-white/60">View</span>
        <span className="text-white/60">Window</span>
        <span className="text-white/60">Help</span>
      </div>

      <div className="flex items-center gap-3">
        <Wifi className="w-[15px] h-[15px] opacity-70" />
        <Search className="w-[15px] h-[15px] opacity-70" />
        <div className="flex items-center gap-1 opacity-70">
          <Battery className="w-[18px] h-[18px]" />
          <span className="text-[11px]">100%</span>
        </div>
        <span className="text-[13px] opacity-90">{time}</span>
      </div>
    </div>
  );
}
