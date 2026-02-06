"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type AiLoaderProps = ComponentProps<"span"> & {
  dotSize?: string;
};

export function AiLoader({ dotSize = "w-1 h-1", className, ...props }: AiLoaderProps) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} {...props}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn("rounded-full bg-[#06d6a0]", dotSize)}
          style={{
            animation: "dotPulse 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </span>
  );
}
