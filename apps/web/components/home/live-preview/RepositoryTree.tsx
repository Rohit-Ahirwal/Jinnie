"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, FileCode2, Folder } from "lucide-react";
import type { TimelineStage } from "./hooks/useTimeline";

interface Props {
  stage: TimelineStage;
}

const files = [
  {
    folder: "app",
    children: ["layout.tsx", "page.tsx", "api/login/route.ts"],
  },
  {
    folder: "lib",
    children: ["auth.ts", "db.ts"],
  },
  {
    folder: "middleware",
    children: ["middleware.ts"],
  },
];

const activeMap = {
  connecting: "",
  indexing: "layout.tsx",
  thinking: "auth.ts",
  answering: "middleware.ts",
  complete: "",
};

export default function RepositoryTree({ stage }: Props) {
  const active = activeMap[stage];

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h4 className="font-semibold">Repository Explorer</h4>

          <p className="text-sm text-muted-foreground">
            Files currently being analyzed
          </p>
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Live
        </span>
      </div>

      <div className="space-y-4">
        {files.map((folder) => (
          <div key={folder.folder}>
            {/* Folder */}

            <div className="mb-2 flex items-center gap-2">
              <ChevronRight className="size-4 text-muted-foreground" />

              <Folder className="size-4 text-primary" />

              <span className="font-medium">{folder.folder}</span>
            </div>

            <div className="ml-7 space-y-2 border-l border-border pl-4">
              {folder.children.map((file) => {
                const isActive = active === file;

                return (
                  <motion.div
                    key={file}
                    layout
                    animate={{
                      backgroundColor: isActive
                        ? "hsl(var(--primary) / .10)"
                        : "transparent",
                    }}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      px-3
                      py-2
                    "
                  >
                    <div className="flex items-center gap-3">
                      <FileCode2
                        className={`
                          size-4
                          ${isActive ? "text-primary" : "text-muted-foreground"}
                        `}
                      />

                      <span
                        className={`
                          text-sm
                          ${isActive ? "font-medium" : ""}
                        `}
                      >
                        {file}
                      </span>
                    </div>

                    {stage !== "connecting" && (
                      <motion.div
                        initial={{
                          scale: 0,
                        }}
                        animate={{
                          scale: 1,
                        }}
                      >
                        <CheckCircle2 className="size-4 text-emerald-500" />
                      </motion.div>
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="active-file"
                        className="
                          absolute
                          left-0
                          top-0
                          bottom-0
                          w-1
                          rounded-full
                          bg-primary
                        "
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
