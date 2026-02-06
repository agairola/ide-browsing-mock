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
} from "lucide-react";
import {
  ChainOfThought,
  ChainOfThoughtHeader,
  ChainOfThoughtContent,
  ChainOfThoughtStep,
} from "@/components/ai-elements/chain-of-thought";
import {
  Reasoning,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { AiLoader } from "./ai-loader";

/* ─── Scan step data ─── */
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

/* ─── Reasoning block data ─── */
interface ReasoningBlock {
  opensAt: number;
  closesAt: number;
  content: string;
  /** Insert before this step index */
  beforeStep: number;
}

const reasoningBlocks: ReasoningBlock[] = [
  {
    opensAt: 1,
    closesAt: 2.5,
    content: "Parsing AST and identifying credential patterns in user-service.ts...",
    beforeStep: 1,
  },
  {
    opensAt: 4.5,
    closesAt: 7,
    content: "Cross-referencing fields against Art. 32 security requirements. Checking encryption status of SSN, credit card, and PII fields...",
    beforeStep: 3,
  },
  {
    opensAt: 7.5,
    closesAt: 10,
    content: "Following console.log and localStorage calls to trace PII data flow paths through the service layer...",
    beforeStep: 4,
  },
  {
    opensAt: 10.5,
    closesAt: 14,
    content: "Scanning for consent verification patterns before email dispatch. Checking GDPR Art. 7 compliance for marketing communications...",
    beforeStep: 5,
  },
];

export function ScanSteps() {
  const [completedSteps, setCompletedSteps] = useState(0);
  const [now, setNow] = useState(0);

  // Track completed steps
  useEffect(() => {
    const timers = scanSteps.map((step, i) =>
      setTimeout(() => setCompletedSteps(i + 1), step.delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Track elapsed time for reasoning blocks (updates every 200ms)
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setNow((Date.now() - start) / 1000);
    }, 200);
    const stop = setTimeout(() => clearInterval(interval), 19000);
    return () => {
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, []);

  // Build interleaved elements: reasoning blocks + steps
  const elements: React.ReactNode[] = [];

  for (let s = 0; s < scanSteps.length; s++) {
    // Insert reasoning blocks that go before this step
    for (const rb of reasoningBlocks) {
      if (rb.beforeStep === s) {
        const isStreaming = now >= rb.opensAt && now < rb.closesAt;
        const hasAppeared = now >= rb.opensAt;
        const duration = isStreaming
          ? Math.round(now - rb.opensAt)
          : Math.round(rb.closesAt - rb.opensAt);

        if (hasAppeared) {
          elements.push(
            <Reasoning
              key={`reasoning-${rb.beforeStep}`}
              isStreaming={isStreaming}
              duration={duration}
              open={false}
              defaultOpen={false}
            >
              <ReasoningTrigger className="cursor-default hover:bg-transparent" />
            </Reasoning>
          );
        }
      }
    }

    // Render step
    const step = scanSteps[s];
    const state =
      s < completedSteps ? "done" : s === completedSteps ? "active" : "pending";

    elements.push(
      <ChainOfThoughtStep
        key={step.label}
        icon={step.icon}
        label={step.label}
        description={step.detail}
        status={state === "done" ? "complete" : state === "active" ? "active" : "pending"}
      >
        <div className="flex items-center gap-1.5 mt-0.5">
          {state === "done" ? (
            step.findings ? (
              <span className="inline-flex items-center gap-1 text-[8px] font-bold text-[hsl(0,72%,65%)] bg-[hsla(0,72%,51%,0.1)] px-1.5 py-0.5 rounded-full">
                <FileWarning className="w-2.5 h-2.5" />
                {step.findings} violation{step.findings > 1 ? "s" : ""}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[8px] font-medium text-[#06d6a0]">
                <CheckCircle2 className="w-2.5 h-2.5" />
                Pass
              </span>
            )
          ) : state === "active" ? (
            <AiLoader />
          ) : null}
        </div>
      </ChainOfThoughtStep>
    );
  }

  return (
    <div className="px-3 py-2 flex-shrink-0">
      <ChainOfThought defaultOpen={true}>
        <ChainOfThoughtHeader>Scan Steps</ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          <div className="space-y-0.5">
            {elements}
          </div>
        </ChainOfThoughtContent>
      </ChainOfThought>
    </div>
  );
}
