"use client";

import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolOutput,
  type ToolState,
} from "@/components/ai-elements/tool";

interface ToolAlert {
  id: string;
  severity: "critical" | "high" | "medium";
  title: string;
  article: string;
  lines: string;
  toolName: string;
  input: Record<string, unknown>;
  delay: number;
}

const OUTPUT_DELAY_MS = 1000;

const alerts: ToolAlert[] = [
  {
    id: "secrets",
    severity: "critical",
    title: "Hardcoded Credentials Detected",
    article: "Art. 32 - Security of Processing",
    lines: "L5-7",
    toolName: "detectSecrets()",
    input: { target: "L5-7", pattern: "hardcoded_credentials" },
    delay: 4.5,
  },
  {
    id: "pii-logging",
    severity: "critical",
    title: "PII Logged to Console",
    article: "Art. 5(1)(f) - Integrity & Confidentiality",
    lines: "L23-24",
    toolName: "scanPiiExposure()",
    input: { target: "L23-24", dataTypes: ["SSN", "CC"] },
    delay: 10.5,
  },
  {
    id: "localstorage",
    severity: "high",
    title: "PII Stored in localStorage",
    article: "Art. 32 - Security of Processing",
    lines: "L27-28",
    toolName: "checkStorageSecurity()",
    input: { target: "L27-28", storage: "localStorage" },
    delay: 12,
  },
  {
    id: "no-consent",
    severity: "high",
    title: "No Consent Before Marketing Email",
    article: "Art. 7 - Conditions for Consent",
    lines: "L31",
    toolName: "verifyConsent()",
    input: { target: "L31", action: "marketing_email" },
    delay: 15,
  },
  {
    id: "no-erasure",
    severity: "medium",
    title: "Right to Erasure Not Implemented",
    article: "Art. 17 - Right to Erasure",
    lines: "L37-38",
    toolName: "checkDataRetention()",
    input: { target: "L37-38", operation: "deleteUser" },
    delay: 16.5,
  },
];

const severityConfig = {
  critical: { badge: "bg-[hsl(0,72%,51%)] text-white", label: "CRIT" },
  high: { badge: "bg-[hsl(30,100%,50%)] text-[hsl(220,14%,10%)]", label: "HIGH" },
  medium: { badge: "bg-[hsl(45,100%,50%)] text-[hsl(220,14%,10%)]", label: "MED" },
};

interface AlertState {
  visible: boolean;
  toolState: ToolState;
}

export function AlertCards() {
  const [alertStates, setAlertStates] = useState<Record<string, AlertState>>({});

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    alerts.forEach((alert) => {
      // Show as input-streaming at delay
      timers.push(
        setTimeout(() => {
          setAlertStates((prev) => ({
            ...prev,
            [alert.id]: { visible: true, toolState: "input-streaming" },
          }));
        }, alert.delay * 1000)
      );

      // Transition to output-available after OUTPUT_DELAY_MS
      timers.push(
        setTimeout(() => {
          setAlertStates((prev) => ({
            ...prev,
            [alert.id]: { visible: true, toolState: "output-available" },
          }));
        }, alert.delay * 1000 + OUTPUT_DELAY_MS)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const activeAlerts = alerts.filter((a) => alertStates[a.id]?.visible);

  if (activeAlerts.length === 0) return null;

  return (
    <div className="px-3 py-2 flex-shrink-0">
      <div className="text-[9px] font-semibold text-[hsl(170,20%,40%)] uppercase tracking-wider px-1 mb-1.5">
        Tool Calls ({activeAlerts.length})
      </div>
      <div className="space-y-1.5">
        {activeAlerts.map((alert) => {
          const state = alertStates[alert.id]!;
          const config = severityConfig[alert.severity];
          const isComplete = state.toolState === "output-available";

          return (
            <div
              key={alert.id}
              style={{ animation: "slideInFromRight 0.35s ease-out" }}
            >
              <Tool open={true}>
                <ToolHeader title={alert.toolName} state={state.toolState} />
                <ToolContent>
                  {isComplete && (
                    <ToolOutput
                      output={
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[8px] font-bold px-1 py-0.5 rounded ${config.badge}`}>
                              {config.label}
                            </span>
                            <span className="text-[9px] text-[hsl(170,20%,45%)] font-mono">
                              {alert.lines}
                            </span>
                          </div>
                          <div className="text-[10px] font-semibold text-[hsl(170,30%,80%)] leading-tight">
                            {alert.title}
                          </div>
                          <div className="flex items-center gap-1 text-[8px] text-[hsl(170,20%,45%)]">
                            <ShieldAlert className="w-2.5 h-2.5" />
                            <span>{alert.article}</span>
                          </div>
                        </div>
                      }
                    />
                  )}
                </ToolContent>
              </Tool>
            </div>
          );
        })}
      </div>
    </div>
  );
}
