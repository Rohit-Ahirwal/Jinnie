"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { FileIcon } from "./file-icons";
import { TreeNode } from "@/app/types";

interface Props {
  node: TreeNode;
  level?: number;
}

export default function FileTreeNode({ node, level = 0 }: Props) {
  const [open, setOpen] = useState(level < 1);

  if (node.type === "file") {
    return (
      <button
        className={cn(
          "flex h-9 w-full items-center gap-2 rounded-xl px-3 text-sm transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
        )}
        style={{
          paddingLeft: level * 18 + 12,
        }}
      >
        <FileIcon filename={node.name} />

        <span className="truncate">{node.name}</span>
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-full items-center gap-2 rounded-xl px-3 text-sm transition-colors hover:bg-accent"
        style={{
          paddingLeft: level * 18 + 12,
        }}
      >
        <motion.div
          animate={{
            rotate: open ? 90 : 0,
          }}
        >
          <ChevronRight className="size-4" />
        </motion.div>

        <FileIcon folder open={open} filename="" />

        <span className="truncate font-medium">{node.name}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="overflow-hidden"
          >
            {node.children?.map((child) => (
              <FileTreeNode key={child.id} node={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
