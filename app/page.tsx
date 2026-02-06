"use client";

import { TitleBar } from "@/components/ide/title-bar";
import { ActivityBar } from "@/components/ide/activity-bar";
import { FileExplorer } from "@/components/ide/file-explorer";
import { EditorTabs } from "@/components/ide/editor-tabs";
import { CodeEditor } from "@/components/ide/code-editor";
import { TerminalPanel } from "@/components/ide/terminal-panel";
import { StatusBar } from "@/components/ide/status-bar";
import { AiCursor } from "@/components/ide/ai-cursor";
import { AiActivityPanel } from "@/components/ide/ai-activity-panel";
import { GdprAlertOverlay } from "@/components/ide/gdpr-alert-overlay";

export default function Page() {
  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <TitleBar />

      <div className="flex flex-1 overflow-hidden relative">
        <ActivityBar />
        <FileExplorer />

        {/* Main editor area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <EditorTabs />
          <CodeEditor />
          <TerminalPanel />

          {/* GDPR alert toasts */}
          <GdprAlertOverlay />
        </div>

        <AiActivityPanel />

        {/* AI Cursor overlay */}
        <AiCursor />
      </div>

      <StatusBar />
    </main>
  );
}
