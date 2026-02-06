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

export function AiActivityPanel() {
  const [completedSteps, setCompletedSteps] = useState<number>(0);

  useEffect(() => {
    const timers = scanSteps.map((step, i) =>
      setTimeout(() => setCompletedSteps(i + 1), step.delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-64 bg-[hsl(220,14%,10%)] border-l border-border flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-border flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-[hsl(210,100%,56%)]" />
        <span className="text-xs font-semibold text-foreground">GDPR Compliance Scanner</span>
      </div>

      {/* Status */}
      <div className="px-3 py-2 border-b border-border">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5">
          <span>{completedSteps < scanSteps.length ? "Scanning..." : "Scan Complete"}</span>
          <span>{Math.round((completedSteps / scanSteps.length) * 100)}%</span>
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${(completedSteps / scanSteps.length) * 100}%`,
              backgroundColor: completedSteps >= scanSteps.length ? "hsl(0,72%,51%)" : "hsl(210,100%,56%)",
            }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-auto px-2 py-2">
        {scanSteps.map((step, i) => {
          const state =
            i < completedSteps ? "done" : i === completedSteps ? "active" : "pending";

          return (
            <div
              key={step.label}
              className={`flex items-start gap-2 px-2 py-1.5 rounded-md mb-0.5 transition-colors duration-300 ${
                state === "done" ? "opacity-100" : state === "active" ? "bg-secondary/50 opacity-100" : "opacity-30"
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
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[hsla(0,72%,51%,0.15)] text-[hsl(0,72%,65%)]">
                      <FileWarning className="w-3 h-3" />
                    </span>
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[hsl(160,60%,45%)]" />
                  )
                ) : state === "active" ? (
                  <Loader2 className="w-4 h-4 text-[hsl(210,100%,56%)] animate-spin" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <step.icon className="w-3 h-3 text-muted-foreground shrink-0" />
                  <span className="text-[11px] font-medium text-foreground truncate">
                    {step.label}
                  </span>
                </div>
                {state !== "pending" && (
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                    {step.detail}
                  </p>
                )}
                {state === "done" && step.findings && (
                  <span className="inline-flex items-center mt-0.5 text-[9px] font-medium text-[hsl(0,72%,65%)] bg-[hsla(0,72%,51%,0.1)] px-1.5 py-0.5 rounded-full">
                    {step.findings} violation{step.findings > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary footer */}
      {completedSteps >= scanSteps.length && (
        <div className="px-3 py-2.5 border-t border-border" style={{ animation: "slideInFromLeft 0.4s ease-out" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[hsl(0,72%,51%)]" />
            <span className="text-[11px] font-semibold text-[hsl(0,72%,65%)]">
              COMPLIANCE: FAIL
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-center">
            <div className="bg-[hsla(0,72%,51%,0.1)] rounded px-1 py-1">
              <div className="text-sm font-bold text-[hsl(0,72%,65%)]">5</div>
              <div className="text-[9px] text-muted-foreground">Critical</div>
            </div>
            <div className="bg-[hsla(30,100%,50%,0.1)] rounded px-1 py-1">
              <div className="text-sm font-bold text-[hsl(30,100%,65%)]">5</div>
              <div className="text-[9px] text-muted-foreground">High</div>
            </div>
            <div className="bg-[hsla(45,100%,50%,0.1)] rounded px-1 py-1">
              <div className="text-sm font-bold text-[hsl(45,100%,65%)]">3</div>
              <div className="text-[9px] text-muted-foreground">Medium</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
