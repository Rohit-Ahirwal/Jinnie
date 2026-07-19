"use client";

import { cn } from "@/lib/utils";
import { RepositoryTreeNode } from "@/types";
import { getFileIcon } from "@/icon";

interface RepositoryTreeItemProps {
  node: RepositoryTreeNode;
  level: number;
  selected: boolean;
  onClick(): void;
}

export default function RepositoryTreeItem({
  node,
  level,
  selected,
  onClick,
}: RepositoryTreeItemProps) {
  const Icon = getFileIcon(node.name);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
        "hover:bg-muted/60",
        selected && "bg-accent text-accent-foreground",
      )}
      style={{
        paddingLeft: `${level * 16 + 28}px`,
      }}
    >
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />

      <span className="truncate">{node.name}</span>
    </button>
  );
}
