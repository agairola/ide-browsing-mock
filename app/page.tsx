"use client";

import { MacMenuBar } from "@/components/desktop/mac-menu-bar";
import { MacDock } from "@/components/desktop/mac-dock";
import { DesktopArea } from "@/components/desktop/desktop-area";
import { IdeWindow } from "@/components/desktop/ide-window";
import { EndpointToolWindow } from "@/components/desktop/endpoint-tool-window";
import { AiCursor } from "@/components/ide/ai-cursor";

export default function Page() {
  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden bg-black">
      <MacMenuBar />

      <DesktopArea>
        <IdeWindow />
        <EndpointToolWindow />
        <AiCursor />
        <MacDock />
      </DesktopArea>
    </main>
  );
}
