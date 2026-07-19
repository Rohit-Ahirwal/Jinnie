"use client";

import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import RepositoryTreeItem from "./RepositoryTreeItem";
import { RepositoryTreeNode as TreeNode } from "@/types";

interface RepositoryTreeNodeProps {
  node: TreeNode;
  level: number;

  expanded: Set<string>;
  selected?: string;

  onToggle(path: string): void;
  onSelect(path: string): void;
}

export default function RepositoryTreeNode({
  node,
  level,
  expanded,
  selected,
  onToggle,
  onSelect,
}: RepositoryTreeNodeProps) {
  const isFolder = node.type === "folder";
  const isExpanded = expanded.has(node.path);

  if (!isFolder) {
    return (
      <RepositoryTreeItem
        node={node}
        level={level}
        selected={selected === node.path}
        onClick={() => onSelect(node.path)}
      />
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => onToggle(node.path)}
        className={cn(
          "flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-sm transition-colors",
          "hover:bg-muted/60",
        )}
        style={{
          paddingLeft: `${level * 16 + 8}px`,
        }}
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 transition-transform",
            isExpanded && "rotate-90",
          )}
        />

        {isExpanded ? (
          <FolderOpen className="h-4 w-4 shrink-0 text-blue-500" />
        ) : (
          <Folder className="h-4 w-4 shrink-0 text-blue-500" />
        )}

        <span className="truncate">{node.name}</span>
      </button>

      {isExpanded &&
        node.children?.map((child) => (
          <RepositoryTreeNode
            key={child.path}
            node={child}
            level={level + 1}
            expanded={expanded}
            selected={selected}
            onToggle={onToggle}
            onSelect={onSelect}
          />
        ))}
    </>
  );
}
