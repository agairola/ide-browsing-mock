export function TitleBar() {
  return (
    <div className="flex items-center h-9 bg-[hsl(220,14%,8%)] border-b border-border px-3 select-none">
      {/* macOS traffic lights */}
      <div className="flex items-center gap-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>

      <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
        user-service.ts - my-project - Visual Studio Code
      </div>

      <div className="w-16" />
    </div>
  );
}
