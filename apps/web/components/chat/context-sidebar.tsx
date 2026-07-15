"use client";

import RepositoryContext from "./repository-context";
import ReferencedFiles from "./referenced-files";
import RepositorySymbols from "./repository-symbols";

export default function ContextSidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-5 py-4">
        <h2 className="font-semibold">Repository Context</h2>

        <p className="text-sm text-muted-foreground">
          Live repository information
        </p>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-5">
        <RepositoryContext />

        <ReferencedFiles />

        <RepositorySymbols />
      </div>
    </div>
  );
}
