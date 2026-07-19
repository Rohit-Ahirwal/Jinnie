"use client";
import { RepositoryTreeNode as TreeNode } from "@/types"
import { useState } from "react";
import RepositoryTreeNode from "./RepositoryTreeNode";


interface RepositoryTreeProps {
  tree: TreeNode[];
  selected?: string;
  onSelect: (path: string) => void;
}

export default function RepositoryTree({
  tree,
  selected,
  onSelect,
}: RepositoryTreeProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);

      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }

      return next;
    });
  };

  return (
    <div className="select-none text-sm">
      {tree.map((node) => (
        <RepositoryTreeNode
          key={node.path}
          node={node}
          level={0}
          expanded={expanded}
          selected={selected}
          onToggle={toggleFolder}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
