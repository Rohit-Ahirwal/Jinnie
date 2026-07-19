"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import EditorTab from "./EditorTab";
import { useWorkspaceStore } from "@/store/workspace-store";

export default function EditorTabs() {
  const tabs = useWorkspaceStore((s) => s.tabs);

  if (tabs.length === 0) return null;

  return (
    <div className="border-b bg-muted/30">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex h-11">
          {tabs.map((tab) => (
            <EditorTab key={tab.path} file={tab} />
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
