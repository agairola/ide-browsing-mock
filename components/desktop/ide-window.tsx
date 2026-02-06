"use client";

import { WindowChrome } from "./window-chrome";
import { ActivityBar } from "@/components/ide/activity-bar";
import { FileExplorer } from "@/components/ide/file-explorer";
import { EditorTabs } from "@/components/ide/editor-tabs";
import { CodeEditor } from "@/components/ide/code-editor";
import { TerminalPanel } from "@/components/ide/terminal-panel";
import { StatusBar } from "@/components/ide/status-bar";

export function IdeWindow() {
  return (
    <div className="absolute left-4 top-3 bottom-16 w-[58%] min-w-[580px] flex flex-col rounded-lg overflow-hidden border border-white/[0.08] shadow-[0_20px_70px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.04)] window-appear z-10">
      <WindowChrome title="user-service.ts — my-project — Visual Studio Code" variant="ide" />

      <div className="flex-1 flex overflow-hidden">
        <ActivityBar />
        <FileExplorer />

        {/* Main editor area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <EditorTabs />
          <CodeEditor />
          <TerminalPanel />
        </div>
      </div>

      <StatusBar />
    </div>
  );
}
