"use client";

import { useEffect, useState } from "react";
import {
  ShieldAlert,
  X,
  AlertTriangle,
  Lock,
  Eye,
  UserX,
  Database,
  Mail,
} from "lucide-react";

interface GdprAlert {
  id: string;
  severity: "critical" | "high" | "medium";
  title: string;
  description: string;
  article: string;
  lines: string;
  icon: typeof ShieldAlert;
  delay: number;
}

const alerts: GdprAlert[] = [
  {
    id: "secrets",
    severity: "critical",
    title: "Hardcoded Credentials Detected",
    description:
      "Database password and API secret key are hardcoded in source code. These will be exposed in version control.",
    article: "GDPR Art. 32 - Security of Processing",
    lines: "Lines 5-7",
    icon: Lock,
    delay: 4.5,
  },
  {
    id: "pii-logging",
    severity: "critical",
    title: "PII Logged to Console",
    description:
      "Social Security Number and credit card data are being written to console.log, visible in production logs.",
    article: "GDPR Art. 5(1)(f) - Integrity & Confidentiality",
    lines: "Lines 23-24",
    icon: Eye,
    delay: 10.5,
  },
  {
    id: "localstorage",
    severity: "high",
    title: "PII Stored in localStorage",
    description:
      "SSN and credit card data stored in browser localStorage without encryption or user consent.",
    article: "GDPR Art. 32 - Security of Processing",
    lines: "Lines 27-28",
    icon: Database,
    delay: 12,
  },
  {
    id: "no-consent",
    severity: "high",
    title: "No Consent Before Marketing Email",
    description:
      "Marketing email sent without verifying user consent or opt-in status.",
    article: "GDPR Art. 7 - Conditions for Consent",
    lines: "Line 31",
    icon: Mail,
    delay: 15,
  },
  {
    id: "no-erasure",
    severity: "medium",
    title: "Right to Erasure Not Implemented",
    description:
      'deleteUser() only soft-deletes. User PII persists indefinitely in the database.',
    article: "GDPR Art. 17 - Right to Erasure",
    lines: "Lines 37-38",
    icon: UserX,
    delay: 16.5,
  },
];

const severityConfig = {
  critical: {
    bg: "bg-[hsla(0,50%,12%,0.97)]",
    border: "border-[hsl(0,72%,40%)]",
    badge: "bg-[hsl(0,72%,51%)] text-[hsl(0,0%,100%)]",
    text: "text-[hsl(0,72%,70%)]",
    label: "CRITICAL",
  },
  high: {
    bg: "bg-[hsla(25,40%,12%,0.97)]",
    border: "border-[hsl(30,80%,35%)]",
    badge: "bg-[hsl(30,100%,50%)] text-[hsl(220,14%,10%)]",
    text: "text-[hsl(30,100%,70%)]",
    label: "HIGH",
  },
  medium: {
    bg: "bg-[hsla(40,30%,12%,0.97)]",
    border: "border-[hsl(45,70%,35%)]",
    badge: "bg-[hsl(45,100%,50%)] text-[hsl(220,14%,10%)]",
    text: "text-[hsl(45,100%,70%)]",
    label: "MEDIUM",
  },
};

export function GdprAlertOverlay() {
  const [visibleAlerts, setVisibleAlerts] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timers = alerts.map((alert) =>
      setTimeout(() => {
        setVisibleAlerts((prev) => [...prev, alert.id]);
      }, alert.delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const dismiss = (id: string) => {
    setDismissed((prev) => new Set([...prev, id]));
  };

  const activeAlerts = alerts.filter(
    (a) => visibleAlerts.includes(a.id) && !dismissed.has(a.id)
  );

  // Only show the latest 3 alerts to avoid overflow
  const displayAlerts = activeAlerts.slice(-3);

  return (
    <div className="absolute top-12 right-4 z-40 flex flex-col gap-2 pointer-events-auto w-72">
      {displayAlerts.map((alert, i) => {
        const config = severityConfig[alert.severity];
        return (
          <div
            key={alert.id}
            className={`${config.bg} ${config.border} border rounded-lg shadow-2xl overflow-hidden`}
            style={{
              animation: "slideInFromRight 0.4s ease-out",
            }}
          >
            {/* Top severity bar */}
            <div className={`h-0.5 ${alert.severity === "critical" ? "bg-[hsl(0,72%,51%)]" : alert.severity === "high" ? "bg-[hsl(30,100%,50%)]" : "bg-[hsl(45,100%,50%)]"}`} />

            <div className="p-3">
              {/* Header */}
              <div className="flex items-start gap-2 mb-2">
                <div className={`mt-0.5 p-1 rounded ${alert.severity === "critical" ? "bg-[hsla(0,72%,51%,0.15)]" : alert.severity === "high" ? "bg-[hsla(30,100%,50%,0.15)]" : "bg-[hsla(45,100%,50%,0.15)]"}`}>
                  <alert.icon className={`w-3.5 h-3.5 ${config.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${config.badge}`}>
                      {config.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {alert.lines}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-foreground leading-tight">
                    {alert.title}
                  </h4>
                </div>
                <button
                  onClick={() => dismiss(alert.id)}
                  className="text-muted-foreground hover:text-foreground shrink-0 p-0.5"
                  type="button"
                  aria-label="Dismiss alert"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Body */}
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">
                {alert.description}
              </p>

              {/* GDPR article reference */}
              <div className="flex items-center gap-1.5 text-[10px] mb-2.5">
                <ShieldAlert className={`w-3 h-3 ${config.text}`} />
                <span className={`font-medium ${config.text}`}>
                  {alert.article}
                </span>
              </div>

              {/* Action */}
              <button
                className={`w-full text-[11px] font-medium py-1.5 rounded text-center transition-colors ${
                  alert.severity === "critical"
                    ? "bg-[hsl(0,72%,51%)] hover:bg-[hsl(0,72%,45%)] text-[hsl(0,0%,100%)]"
                    : alert.severity === "high"
                    ? "bg-[hsl(30,100%,50%)] hover:bg-[hsl(30,100%,40%)] text-[hsl(220,14%,10%)]"
                    : "bg-[hsl(45,100%,50%)] hover:bg-[hsl(45,100%,40%)] text-[hsl(220,14%,10%)]"
                }`}
                type="button"
              >
                View Suggested Fix
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
