"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type ComponentProps,
} from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronRight, Brain, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChainOfThoughtContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChainOfThoughtContext = createContext<ChainOfThoughtContextValue | null>(null);

function useChainOfThought() {
  const ctx = useContext(ChainOfThoughtContext);
  if (!ctx) throw new Error("useChainOfThought must be used within <ChainOfThought>");
  return ctx;
}

/* ─── Root ─── */
export type ChainOfThoughtProps = ComponentProps<"div"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ChainOfThought({
  open,
  defaultOpen = true,
  onOpenChange,
  className,
  children,
  ...props
}: ChainOfThoughtProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const controlled = open !== undefined;
  const currentOpen = controlled ? open : isOpen;
  const handleOpenChange = (v: boolean) => {
    if (!controlled) setIsOpen(v);
    onOpenChange?.(v);
  };

  return (
    <ChainOfThoughtContext.Provider value={{ isOpen: currentOpen!, setIsOpen: handleOpenChange }}>
      <Collapsible.Root
        open={currentOpen}
        onOpenChange={handleOpenChange}
        className={cn("", className)}
        {...props}
      >
        {children}
      </Collapsible.Root>
    </ChainOfThoughtContext.Provider>
  );
}

/* ─── Header (trigger) ─── */
export type ChainOfThoughtHeaderProps = ComponentProps<typeof Collapsible.Trigger> & {
  children: ReactNode;
};

export function ChainOfThoughtHeader({ children, className, ...props }: ChainOfThoughtHeaderProps) {
  const { isOpen } = useChainOfThought();

  return (
    <Collapsible.Trigger
      className={cn(
        "flex w-full items-center gap-2 px-1 py-1 text-[9px] font-semibold uppercase tracking-wider cursor-pointer select-none transition-colors",
        "text-[hsl(170,20%,40%)] hover:text-[hsl(170,30%,55%)]",
        className
      )}
      {...props}
    >
      <Brain className="w-3 h-3 shrink-0" />
      <span className="flex-1 text-left">{children}</span>
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
export type ChainOfThoughtContentProps = ComponentProps<typeof Collapsible.Content>;

export function ChainOfThoughtContent({ className, children, ...props }: ChainOfThoughtContentProps) {
  return (
    <Collapsible.Content
      className={cn(
        "overflow-hidden data-[state=open]:animate-[slideDown_200ms_ease-out] data-[state=closed]:animate-[slideUp_200ms_ease-in]",
        className
      )}
      {...props}
    >
      <div className="space-y-0.5 py-1">{children}</div>
    </Collapsible.Content>
  );
}

/* ─── Step ─── */
const stepStatusStyles = {
  active: "opacity-100",
  complete: "opacity-80",
  pending: "opacity-25",
};

export type ChainOfThoughtStepProps = ComponentProps<"div"> & {
  icon?: LucideIcon;
  label: ReactNode;
  description?: ReactNode;
  status?: "complete" | "active" | "pending";
};

export function ChainOfThoughtStep({
  icon: Icon,
  label,
  description,
  status = "pending",
  className,
  children,
  ...props
}: ChainOfThoughtStepProps) {
  return (
    <div
      className={cn(
        "transition-all duration-300",
        stepStatusStyles[status],
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-2 px-2 py-1 rounded-md">
        {Icon && (
          <div className="mt-0.5 shrink-0">
            <Icon className="w-3 h-3 text-[hsl(170,20%,40%)]" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-medium text-[hsl(170,30%,80%)]">{label}</span>
          {description && status !== "pending" && (
            <p className="text-[9px] text-[hsl(170,20%,45%)] mt-0.5 leading-tight">{description}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
