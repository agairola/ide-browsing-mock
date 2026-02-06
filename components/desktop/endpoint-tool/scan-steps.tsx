"use client";

import { useEffect, useState } from "react";
import {
  ShieldAlert,
  ScanSearch,
  FileWarning,
  Lock,
  Eye,
  Mail,
  Trash2,
  CheckCircle2,
  Loader2,
  Circle,
} from "lucide-react";

interface ScanStep {
  label: string;
  detail: string;
  icon: typeof ShieldAlert;
  delay: number;
  findings?: number;
}

const scanSteps: ScanStep[] = [
  { label: "Initialize Scanner", detail: "Loading GDPR ruleset v2.4", icon: ShieldAlert, delay: 1 },
  { label: "Parse AST", detail: "Analyzing user-service.ts", icon: ScanSearch, delay: 2.5 },
  { label: "Detect Hardcoded Secrets", detail: "3 credentials found in source", icon: Lock, delay: 4, findings: 3 },
  { label: "Scan PII Fields", detail: "SSN, credit card data unencrypted", icon: FileWarning, delay: 7, findings: 2 },
  { label: "Check PII Exposure", detail: "console.log leaking SSN & CC", icon: Eye, delay: 10, findings: 4 },
  { label: "Verify Consent Logic", detail: "No consent check before emails", icon: Mail, delay: 14, findings: 1 },
  { label: "Check Data Retention", detail: "No erasure, soft-delete only", icon: Trash2, delay: 16, findings: 2 },
  { label: "Generate Report", detail: "13 total violations detected", icon: CheckCircle2, delay: 18 },
];

export function ScanSteps() {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    const timers = scanSteps.map((step, i) =>
      setTimeout(() => setCompletedSteps(i + 1), step.delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="px-3 py-2 flex-shrink-0">
      <div className="text-[9px] font-semibold text-[hsl(170,20%,40%)] uppercase tracking-wider px-1 mb-1.5">
        Scan Steps
      </div>
      <div className="space-y-0.5">
        {scanSteps.map((step, i) => {
          const state =
            i < completedSteps ? "done" : i === completedSteps ? "active" : "pending";

          return (
            <div
              key={step.label}
              className={`flex items-start gap-2 px-2 py-1 rounded-md transition-all duration-300 ${
                state === "done"
                  ? "opacity-100"
                  : state === "active"
                  ? "bg-[hsl(170,15%,12%)] opacity-100"
                  : "opacity-25"
              }`}
              style={
                state === "done"
                  ? { animation: "slideInFromLeft 0.3s ease-out" }
                  : undefined
              }
            >
              {/* Status icon */}
              <div className="mt-0.5 shrink-0">
                {state === "done" ? (
                  step.findings ? (
                    <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[hsla(0,72%,51%,0.15)] text-[hsl(0,72%,65%)]">
                      <FileWarning className="w-2.5 h-2.5" />
                    </span>
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#06d6a0]" />
                  )
                ) : state === "active" ? (
                  <Loader2 className="w-3.5 h-3.5 text-[#06d6a0] animate-spin" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-[hsl(170,20%,30%)]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <step.icon className="w-2.5 h-2.5 text-[hsl(170,20%,40%)] shrink-0" />
                  <span className="text-[10px] font-medium text-[hsl(170,30%,80%)] truncate">
                    {step.label}
                  </span>
                </div>
                {state !== "pending" && (
                  <p className="text-[9px] text-[hsl(170,20%,45%)] mt-0.5 leading-tight">
                    {step.detail}
                  </p>
                )}
                {state === "done" && step.findings && (
                  <span className="inline-flex items-center mt-0.5 text-[8px] font-bold text-[hsl(0,72%,65%)] bg-[hsla(0,72%,51%,0.1)] px-1.5 py-0.5 rounded-full">
                    {step.findings} violation{step.findings > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
