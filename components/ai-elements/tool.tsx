"use client";

import {
  type ReactNode,
  type ComponentProps,
} from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronRight, Wrench, CircleDot, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* Local type alias — replaces `import { type ToolUIPart } from "ai"` */
export type ToolState =
  | "input-streaming"
  | "input-available"
  | "output-available"
  | "output-error";

/* ─── Root ─── */
export type ToolProps = ComponentProps<typeof Collapsible.Root>;

export function Tool({ className, children, ...props }: ToolProps) {
  return (
    <Collapsible.Root
      className={cn(
        "rounded-md border border-[hsl(170,15%,14%)]/40 bg-[hsl(170,15%,7%)]/30 overflow-hidden transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </Collapsible.Root>
  );
}

/* ─── Header ─── */
export type ToolHeaderProps = ComponentProps<typeof Collapsible.Trigger> & {
  title: string;
  state: ToolState;
};

function getStatusBadge(state: ToolState): { label: string; icon: ReactNode; classes: string } {
  switch (state) {
    case "input-streaming":
      return {
        label: "Running",
        icon: <Loader2 className="w-2.5 h-2.5 animate-spin" />,
        classes: "bg-[hsla(170,60%,40%,0.15)] text-[hsl(170,50%,55%)]",
      };
    case "input-available":
      return {
        label: "Running",
        icon: <CircleDot className="w-2.5 h-2.5 animate-pulse" />,
        classes: "bg-[hsla(170,60%,40%,0.15)] text-[hsl(170,50%,55%)]",
      };
    case "output-available":
      return {
        label: "Done",
        icon: <CheckCircle2 className="w-2.5 h-2.5" />,
        classes: "bg-[hsla(170,60%,40%,0.1)] text-[hsl(170,40%,50%)]",
      };
    case "output-error":
      return {
        label: "Error",
        icon: <AlertCircle className="w-2.5 h-2.5" />,
        classes: "bg-[hsla(0,72%,51%,0.12)] text-[hsl(0,72%,65%)]",
      };
  }
}

export function ToolHeader({ title, state, className, ...props }: ToolHeaderProps) {
  const badge = getStatusBadge(state);

  return (
    <Collapsible.Trigger
      className={cn(
        "flex w-full items-center gap-2 px-2.5 py-1.5 text-[10px] font-medium cursor-pointer select-none transition-colors",
        "text-[hsl(170,30%,70%)] hover:bg-[hsl(170,15%,10%)]",
        className
      )}
      {...props}
    >
      <Wrench className="w-3 h-3 shrink-0 text-[hsl(170,20%,40%)]" />
      <code className="flex-1 text-left font-mono text-[10px] truncate">{title}</code>
      <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase", badge.classes)}>
        {badge.icon}
        {badge.label}
      </span>
      <ChevronRight className="w-3 h-3 shrink-0 text-[hsl(170,20%,35%)] transition-transform duration-200 group-data-[state=open]:rotate-90" />
    </Collapsible.Trigger>
  );
}

/* ─── Content ─── */
export type ToolContentProps = ComponentProps<typeof Collapsible.Content>;

export function ToolContent({ className, children, ...props }: ToolContentProps) {
  return (
    <Collapsible.Content
      className={cn(
        "overflow-hidden data-[state=open]:animate-[slideDown_200ms_ease-out] data-[state=closed]:animate-[slideUp_200ms_ease-in]",
        className
      )}
      {...props}
    >
      <div className="border-t border-[hsl(170,15%,12%)]/30">{children}</div>
    </Collapsible.Content>
  );
}

/* ─── Input ─── */
export type ToolInputProps = ComponentProps<"div"> & {
  input: Record<string, unknown>;
};

export function ToolInput({ input, className, ...props }: ToolInputProps) {
  return (
    <div className={cn("px-2.5 py-1.5", className)} {...props}>
      <div className="text-[8px] font-semibold text-[hsl(170,20%,35%)] uppercase tracking-wider mb-1">Input</div>
      <pre className="text-[9px] font-mono text-[hsl(170,25%,50%)] bg-[hsl(170,15%,5%)] rounded px-2 py-1.5 overflow-x-auto leading-relaxed">
        {JSON.stringify(input, null, 2)}
      </pre>
    </div>
  );
}

/* ─── Output ─── */
export type ToolOutputProps = ComponentProps<"div"> & {
  output?: ReactNode;
  errorText?: string;
};

export function ToolOutput({ output, errorText, className, ...props }: ToolOutputProps) {
  if (!output && !errorText) return null;

  return (
    <div className={cn("px-2.5 py-1.5 border-t border-[hsl(170,15%,12%)]/30", className)} {...props}>
      <div className="text-[8px] font-semibold text-[hsl(170,20%,35%)] uppercase tracking-wider mb-1">
        {errorText ? "Error" : "Output"}
      </div>
      {errorText ? (
        <div className="text-[9px] text-[hsl(0,72%,65%)] bg-[hsla(0,72%,51%,0.06)] rounded px-2 py-1.5">
          {errorText}
        </div>
      ) : (
        <div className="text-[9px] text-[hsl(170,25%,55%)]">{output}</div>
      )}
    </div>
  );
}
