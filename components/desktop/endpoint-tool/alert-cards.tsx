"use client";

import { useEffect, useState } from "react";
import {
  ShieldAlert,
  Lock,
  Eye,
  Database,
  Mail,
  UserX,
} from "lucide-react";

interface GdprAlert {
  id: string;
  severity: "critical" | "high" | "medium";
  title: string;
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
    article: "Art. 32 - Security of Processing",
    lines: "L5-7",
    icon: Lock,
    delay: 4.5,
  },
  {
    id: "pii-logging",
    severity: "critical",
    title: "PII Logged to Console",
    article: "Art. 5(1)(f) - Integrity & Confidentiality",
    lines: "L23-24",
    icon: Eye,
    delay: 10.5,
  },
  {
    id: "localstorage",
    severity: "high",
    title: "PII Stored in localStorage",
    article: "Art. 32 - Security of Processing",
    lines: "L27-28",
    icon: Database,
    delay: 12,
  },
  {
    id: "no-consent",
    severity: "high",
    title: "No Consent Before Marketing Email",
    article: "Art. 7 - Conditions for Consent",
    lines: "L31",
    icon: Mail,
    delay: 15,
  },
  {
    id: "no-erasure",
    severity: "medium",
    title: "Right to Erasure Not Implemented",
    article: "Art. 17 - Right to Erasure",
    lines: "L37-38",
    icon: UserX,
    delay: 16.5,
  },
];

const severityConfig = {
  critical: {
    border: "border-l-[hsl(0,72%,45%)]",
    badge: "bg-[hsl(0,72%,51%)] text-white",
    icon: "text-[hsl(0,72%,65%)]",
    iconBg: "bg-[hsla(0,72%,51%,0.12)]",
    label: "CRIT",
  },
  high: {
    border: "border-l-[hsl(30,100%,45%)]",
    badge: "bg-[hsl(30,100%,50%)] text-[hsl(220,14%,10%)]",
    icon: "text-[hsl(30,100%,65%)]",
    iconBg: "bg-[hsla(30,100%,50%,0.12)]",
    label: "HIGH",
  },
  medium: {
    border: "border-l-[hsl(45,100%,45%)]",
    badge: "bg-[hsl(45,100%,50%)] text-[hsl(220,14%,10%)]",
    icon: "text-[hsl(45,100%,65%)]",
    iconBg: "bg-[hsla(45,100%,50%,0.12)]",
    label: "MED",
  },
};

export function AlertCards() {
  const [visibleAlerts, setVisibleAlerts] = useState<string[]>([]);

  useEffect(() => {
    const timers = alerts.map((alert) =>
      setTimeout(() => {
        setVisibleAlerts((prev) => [...prev, alert.id]);
      }, alert.delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const activeAlerts = alerts.filter((a) => visibleAlerts.includes(a.id));

  if (activeAlerts.length === 0) return null;

  return (
    <div className="px-3 py-2 flex-shrink-0">
      <div className="text-[9px] font-semibold text-[hsl(170,20%,40%)] uppercase tracking-wider px-1 mb-1.5">
        Alerts ({activeAlerts.length})
      </div>
      <div className="space-y-1.5 max-h-[180px] overflow-auto">
        {activeAlerts.map((alert) => {
          const config = severityConfig[alert.severity];
          return (
            <div
              key={alert.id}
              className={`bg-[hsl(170,15%,7%)] border border-[hsl(170,15%,14%)] border-l-2 ${config.border} rounded-md p-2`}
              style={{ animation: "slideInFromRight 0.35s ease-out" }}
            >
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 p-1 rounded ${config.iconBg} shrink-0`}>
                  <alert.icon className={`w-3 h-3 ${config.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`text-[8px] font-bold px-1 py-0.5 rounded ${config.badge}`}>
                      {config.label}
                    </span>
                    <span className="text-[9px] text-[hsl(170,20%,45%)] font-mono">
                      {alert.lines}
                    </span>
                  </div>
                  <h4 className="text-[10px] font-semibold text-[hsl(170,30%,80%)] leading-tight">
                    {alert.title}
                  </h4>
                  <div className="flex items-center gap-1 mt-1 text-[8px] text-[hsl(170,20%,45%)]">
                    <ShieldAlert className="w-2.5 h-2.5" />
                    <span>{alert.article}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
