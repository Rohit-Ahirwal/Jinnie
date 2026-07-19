"use client";

import EditorSidebar from "./sidebar/EditorSidebar";
import EditorTabs from "./viewer/EditorTabs";
import EditorViewer from "./viewer/EditorViewer";

export default function EditorPanel() {
  return (
    <div className="flex h-full overflow-hidden bg-background">
      <EditorSidebar />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col border-l">
        <EditorTabs />
        <EditorViewer />
      </div>
    </div>
  );
}