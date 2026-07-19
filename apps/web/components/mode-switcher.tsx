"use client";

import { useWorkspaceStore } from "@/store/workspace-store";
import { motion } from "framer-motion";
import { Code2, MessageSquare } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

export default function ModeSwitcher() {

  const { editorOpened, setEditorOpened } = useWorkspaceStore(
    useShallow((state) => ({
      editorOpened: state.editorOpened,
      setEditorOpened: state.setEditorOpened,
    })),
  );
  
  return (
    <button
      type="button"
      onClick={() => setEditorOpened(!editorOpened)}
      aria-label={`Switch to ${editorOpened ? "chat" : "editor"} mode`}
      className="
        group
        relative
        flex
        h-11
        w-24
        items-center
        rounded-full
        border
        border-border/70
        bg-muted/60
        p-1
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-primary/30
        hover:bg-muted
        hover:shadow-md
        active:scale-[0.98]
      "
    >
      {/* Sliding Thumb */}
      <motion.div
        animate={{
          x: editorOpened ? 44 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
        }}
        className="
          absolute
          left-1
          top-1
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          bg-background
          shadow-sm
          ring-1
          ring-border/50
        "
      >
        <motion.div
          key={editorOpened ? "editor" : "chat"}
          initial={{ rotate: -25, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 25, scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {editorOpened ? (
            <Code2 className="size-4 text-primary" />
          ) : (
            <MessageSquare className="size-4 text-primary" />
          )}
        </motion.div>
      </motion.div>

      {/* Icons */}
      <div className="flex w-full items-center justify-between px-2">
        <MessageSquare
          className={`size-4 transition-all duration-300 ${
            !editorOpened ? "text-primary" : "text-muted-foreground/40"
          }`}
        />

        <Code2
          className={`size-4 transition-all duration-300 ${
            editorOpened ? "text-primary" : "text-muted-foreground/40"
          }`}
        />
      </div>
    </button>
  );
}
