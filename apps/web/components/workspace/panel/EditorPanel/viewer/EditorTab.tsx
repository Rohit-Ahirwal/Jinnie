"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "@/store/workspace-store";
import { useShallow } from "zustand/react/shallow";
import { getFileIcon } from "@/icon";
import { FileResponse } from "@/types";

interface Props {
  file: FileResponse;
}

export default function EditorTab({ file }: Props) {
  const { activePath, setActive, closeFile } = useWorkspaceStore(
    useShallow((state) => ({
      activePath: state.activePath,
      setActive: state.setActive,
      closeFile: state.closeFile
    }))
  );

  const active = activePath === file.path;

  const Icon = getFileIcon(file.name);

  return (
    <button
      onClick={() => setActive(file.path)}
      className={cn(
        "group relative flex h-full min-w-[160px] max-w-[220px] items-center gap-2 border-r px-3 transition-colors",
        active ? "bg-background" : "bg-muted/20 hover:bg-muted/60",
      )}
    >
      {active && (
        <motion.div
          layoutId="editor-tab-indicator"
          className="absolute inset-x-0 top-0 h-0.5 bg-primary"
        />
      )}

      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />

      <span className="flex-1 truncate text-left text-sm">{file.name}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          closeFile(file.path);
        }}
        className={cn(
          "rounded p-0.5 opacity-0 transition",
          "hover:bg-muted",
          active && "opacity-100",
          "group-hover:opacity-100",
        )}
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </button>
  );
}
