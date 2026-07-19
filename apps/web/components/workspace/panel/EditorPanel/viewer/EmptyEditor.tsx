"use client";

import { FileCode2 } from "lucide-react";

export default function EmptyEditor() {
  return (
    <div className="flex flex-1 items-center justify-center bg-background">
      <div className="max-w-sm text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <FileCode2 className="h-8 w-8 text-muted-foreground" />
        </div>

        <h2 className="mt-6 text-lg font-semibold">Open a file</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Select a file from the repository explorer to inspect its contents.
        </p>
      </div>
    </div>
  );
}
