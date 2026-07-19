"use client";

import FilesSection from "@/components/workspace/Files/FilesSection";
import { FolderTree } from "lucide-react";

export default function EditorSidebar() {
  return (
    <aside className="flex w-72 shrink-0 flex-col border-r bg-muted/20">
      <div className="flex h-12 items-center border-b px-4">
        <FolderTree className="mr-2 h-4 w-4 text-muted-foreground" />

        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Explorer
        </span>
      </div>

      <div className="flex-1 overflow-auto">
        <FilesSection />
      </div>
    </aside>
  );
}
