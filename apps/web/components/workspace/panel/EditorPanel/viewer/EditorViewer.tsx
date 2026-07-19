"use client";

import EmptyEditor from "./EmptyEditor";
import EditorCode from "./EditorCode";
import { useWorkspaceStore } from "@/store/workspace-store";

export default function EditorViewer() {
  const file = useWorkspaceStore((s) => s.activeFile());

  if (!file) {
    return <EmptyEditor />;
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <EditorCode language={file.language} code={file.content} />
    </div>
  );
}
