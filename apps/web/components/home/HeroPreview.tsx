"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  CheckCircle2,
  FileCode2,
  FolderGit2,
  GitPullRequest,
  LoaderCircle,
  MessageSquareText,
} from "lucide-react";

export default function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      className="relative hidden lg:block"
    >
      {/* Glow */}
      <div className="absolute -inset-12 -z-10 rounded-full bg-primary/10 blur-[100px]" />

      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="overflow-hidden rounded-3xl border border-border/70 bg-background/70 shadow-2xl backdrop-blur-xl"
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-border/70 px-6 py-4">
          <div className="flex items-center gap-3">
            <FolderGit2 className="size-5 text-primary" />

            <div>
              <p className="font-semibold">jinnie-ai</p>
              <p className="text-xs text-muted-foreground">
                github.com/jinnie-ai
              </p>
            </div>
          </div>

          <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
            Repository Synced
          </div>
        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          {/* Progress */}

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Repository Analysis
              </span>

              <span className="font-medium">100%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2,
                }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </div>

          {/* Stats */}

          <div className="grid grid-cols-2 gap-3">

            <Card
              icon={<FileCode2 className="size-5 text-primary" />}
              title="Files Indexed"
              value="8,241"
            />

            <Card
              icon={<GitPullRequest className="size-5 text-primary" />}
              title="Pull Requests"
              value="146"
            />

          </div>

          {/* Chat */}

          <div className="space-y-4 rounded-2xl border border-border/60 bg-muted/40 p-4">

            <div className="flex gap-3">

              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
                <MessageSquareText className="size-4 text-primary" />
              </div>

              <div>
                <p className="font-medium">
                  Where is authentication handled?
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Search the repository and explain the authentication flow.
                </p>
              </div>

            </div>

            <div className="rounded-xl border border-border/60 bg-background p-4">

              <div className="flex items-center gap-2">

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <LoaderCircle className="size-4 text-primary" />
                </motion.div>

                <span className="text-sm font-medium">
                  Jinnie is reasoning...
                </span>

              </div>

              <div className="mt-4 space-y-3">

                <Answer file="middleware.ts" />
                <Answer file="lib/auth.ts" />
                <Answer file="app/api/login/route.ts" />

              </div>

            </div>

          </div>

          {/* Bottom */}

          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4"
          >
            <BrainCircuit className="size-5 text-primary" />

            <p className="text-sm">
              AI understands your entire codebase before answering.
            </p>

          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
      <div className="flex items-center justify-between">
        {icon}

        <p className="text-2xl font-bold">{value}</p>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {title}
      </p>
    </div>
  );
}

function Answer({ file }: { file: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: .35,
      }}
      className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2"
    >
      <CheckCircle2 className="size-4 text-emerald-500" />

      <span className="text-sm">{file}</span>
    </motion.div>
  );
}