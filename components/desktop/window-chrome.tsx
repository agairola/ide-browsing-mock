interface WindowChromeProps {
  title: string;
  icon?: React.ReactNode;
  variant?: "ide" | "tool";
}

export function WindowChrome({ title, icon, variant = "ide" }: WindowChromeProps) {
  return (
    <div
      className={`flex items-center h-[38px] px-3.5 select-none shrink-0 ${
        variant === "tool"
          ? "bg-[hsl(170,20%,8%)]/40 backdrop-blur-xl border-b border-[hsl(170,20%,15%)]/40"
          : "bg-[hsl(220,14%,8%)] border-b border-[hsl(220,14%,18%)]"
      }`}
    >
      {/* macOS traffic lights */}
      <div className="flex items-center gap-[7px] mr-4">
        <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.15)]" />
        <div className="w-[11px] h-[11px] rounded-full bg-[#febc2e] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.15)]" />
        <div className="w-[11px] h-[11px] rounded-full bg-[#28c840] shadow-[inset_0_-0.5px_0.5px_rgba(0,0,0,0.15)]" />
      </div>

      <div className="flex-1 flex items-center justify-center gap-2">
        {icon}
        <span
          className={`text-[12px] font-medium ${
            variant === "tool" ? "text-[hsl(170,30%,75%)]" : "text-[hsl(220,10%,55%)]"
          }`}
        >
          {title}
        </span>
      </div>

      {/* Spacer for symmetry */}
      <div className="w-[62px]" />
    </div>
  );
}
