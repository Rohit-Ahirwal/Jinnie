"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function RightSidebar() {
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
          
        </div>
      </ScrollArea>
    </aside>
  );
}
