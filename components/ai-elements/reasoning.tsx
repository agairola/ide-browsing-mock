"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type ComponentProps,
} from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronRight, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReasoningContextValue {
  isStreaming: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  duration: number | undefined;
}

const ReasoningContext = createContext<ReasoningContextValue | null>(null);

function useReasoning() {
  const ctx = useContext(ReasoningContext);
  if (!ctx) throw new Error("useReasoning must be used within <Reasoning>");
  return ctx;
}

/* ─── Root ─── */
type ReasoningProps = ComponentProps<typeof Collapsible.Root> & {
  isStreaming?: boolean;
  duration?: number;
};

export function Reasoning({
  isStreaming = false,
  duration,
  open,
  defaultOpen = true,
  onOpenChange,
  className,
  children,
  ...props
}: ReasoningProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const controlled = open !== undefined;
  const currentOpen = controlled ? open : isOpen;
  const handleOpenChange = (v: boolean) => {
    if (!controlled) setIsOpen(v);
    onOpenChange?.(v);
  };

  // Auto-open when streaming starts, auto-close 1s after streaming ends
  useEffect(() => {
    if (isStreaming) {
      handleOpenChange(true);
    } else if (!isStreaming && currentOpen) {
      const t = setTimeout(() => handleOpenChange(false), 1000);
      return () => clearTimeout(t);
    }
  }, [isStreaming]);

  return (
    <ReasoningContext.Provider value={{ isStreaming, isOpen: currentOpen!, duration, setIsOpen: handleOpenChange }}>
      <Collapsible.Root
        open={currentOpen}
        onOpenChange={handleOpenChange}
        className={cn(
          "rounded-md border border-[hsl(170,15%,14%)]/40 bg-[hsl(170,15%,7%)]/30 overflow-hidden transition-all duration-300",
          isStreaming && "shadow-[0_0_8px_hsla(170,60%,40%,0.15)]",
          className
        )}
        {...props}
      >
        {children}
      </Collapsible.Root>
    </ReasoningContext.Provider>
  );
}

/* ─── Trigger ─── */
type ReasoningTriggerProps = ComponentProps<typeof Collapsible.Trigger> & {
  getThinkingMessage?: (isStreaming: boolean, duration?: number) => ReactNode;
};

function defaultThinkingMessage(isStreaming: boolean, duration?: number) {
  if (isStreaming) {
    return duration ? `Thinking for ${duration}s...` : "Thinking...";
  }
  return duration ? `Thought for ${duration}s` : "Thought process";
}

export function ReasoningTrigger({
  getThinkingMessage = defaultThinkingMessage,
  className,
  ...props
}: ReasoningTriggerProps) {
  const { isStreaming, isOpen, duration } = useReasoning();

  return (
    <Collapsible.Trigger
      className={cn(
        "flex w-full items-center gap-2 px-2.5 py-1.5 text-[10px] font-medium cursor-pointer select-none transition-colors",
        "text-[hsl(170,30%,55%)] hover:text-[hsl(170,40%,65%)] hover:bg-[hsl(170,15%,10%)]",
        className
      )}
      {...props}
    >
      <Brain className={cn("w-3 h-3 shrink-0", isStreaming && "animate-pulse")} />
      <span className="flex-1 text-left truncate">
        {getThinkingMessage(isStreaming, duration)}
      </span>
      <ChevronRight
        className={cn(
          "w-3 h-3 shrink-0 transition-transform duration-200",
          isOpen && "rotate-90"
        )}
      />
    </Collapsible.Trigger>
  );
}

/* ─── Content ─── */
type ReasoningContentProps = ComponentProps<typeof Collapsible.Content> & {
  children: string;
};

export function ReasoningContent({ children, className, ...props }: ReasoningContentProps) {
  const { isStreaming } = useReasoning();

  return (
    <Collapsible.Content
      className={cn(
        "overflow-hidden data-[state=open]:animate-[slideDown_200ms_ease-out] data-[state=closed]:animate-[slideUp_200ms_ease-in]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "px-2.5 pb-2 text-[9px] leading-relaxed text-[hsl(170,20%,45%)] border-t border-[hsl(170,15%,12%)] pt-1.5",
          isStreaming && "shimmer-text"
        )}
      >
        {children}
      </div>
    </Collapsible.Content>
  );
}
