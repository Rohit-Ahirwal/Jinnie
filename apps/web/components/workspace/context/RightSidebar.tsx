"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarSection from "./SidebarSection";
import SourceChip from "./SourceChip";
import { useNewMessagesStore } from "@/store/repository-store";

interface Source {
  path: string;
  filename: string;
  language: string;
  score: number;
  chunk_index: number;
}

export default function RightSidebar() {

  const newMessages = useNewMessagesStore((state) => state.newMessages);
  
  return (
    <aside className="flex h-full w-full flex-col border-l bg-card">
      <div className="border-b p-4">
        <h2 className="text-sm font-semibold">Context</h2>

        <p className="text-xs text-muted-foreground">
          Sources used for this response
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-6 p-4">
          <SidebarSection title="Files">
            {newMessages.map((message) => (
              <div className="flex flex-col gap-2" key={message.message.id}>
                {message.sources?.map((source) => (
                  <SourceChip key={source.path} name={source.filename} />
                ))}
              </div>
            ))}
          </SidebarSection>
        </div>
      </ScrollArea>
    </aside>
  );
}
