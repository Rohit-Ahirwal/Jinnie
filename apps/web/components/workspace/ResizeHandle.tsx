"use client";

import { PanelResizeHandle }  from "react-resizable-panels";

export default function ResizeHandle() {
  return (
    <PanelResizeHandle className="group relative w-px bg-border transition-colors hover:bg-primary">
      <div className="absolute inset-y-0 -left-1 w-2 group-hover:bg-primary/10" />
    </PanelResizeHandle>
  );
}
