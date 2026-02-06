"use client";

import { useEffect, useRef, useState } from "react";
import { Shield } from "lucide-react";
import { WindowChrome } from "./window-chrome";
import { ToolHeader } from "./endpoint-tool/tool-header";
import { ScanProgress } from "./endpoint-tool/scan-progress";
import { ScanSteps } from "./endpoint-tool/scan-steps";
import { AlertCards } from "./endpoint-tool/alert-cards";
import { ScanSummary } from "./endpoint-tool/scan-summary";

export function EndpointToolWindow() {
  const [scanDone, setScanDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setScanDone(true), 18000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scanDone && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [scanDone]);

  return (
    <div className="absolute right-4 top-3 bottom-16 w-[36%] min-w-[320px] flex flex-col rounded-lg overflow-hidden border border-[#06d6a0]/10 shadow-[0_20px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04)] window-appear z-20"
      style={{ animationDelay: "0.15s" }}
    >
      <WindowChrome
        title="dontgetfined.ai — GDPR Scanner"
        variant="tool"
        icon={<Shield className="w-3.5 h-3.5 text-[#06d6a0]" />}
      />

      <div className="flex-1 flex flex-col bg-[hsl(170,18%,6%)]/40 backdrop-blur-xl overflow-hidden">
        <ToolHeader />
        <ScanProgress />

        {/* Scrollable middle */}
        <div ref={scrollRef} className="flex-1 flex flex-col overflow-auto min-h-0">
          {scanDone ? (
            <>
              <AlertCards />
              <ScanSteps />
            </>
          ) : (
            <>
              <ScanSteps />
              <AlertCards />
            </>
          )}
        </div>

        <ScanSummary />
      </div>
    </div>
  );
}
