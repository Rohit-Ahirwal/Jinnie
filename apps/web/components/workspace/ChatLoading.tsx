"use client";

import { motion } from "motion/react";
import { Bot, FolderGit2 } from "lucide-react";

export default function ChatLoading() {
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="flex w-full max-w-md flex-col items-center">
        {/* Animated Logo */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, -6, 6, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border bg-card shadow-lg">
            <Bot className="size-10 text-primary" />
          </div>

          <motion.div
            animate={{
              scale: [1, 1.4, 1.8],
              opacity: [0.35, 0.15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-3xl border-2 border-primary"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-2xl font-semibold"
        >
          Loading conversations
        </motion.h2>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          Preparing your repository workspace...
        </p>

        {/* Loading steps */}
        <div className="mt-10 w-full space-y-4">
          {[
            "Fetching conversations",
            "Loading repository context",
            "Preparing AI workspace",
          ].map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: [0.4, 1, 0.4],
                x: 0,
              }}
              transition={{
                delay: index * 0.25,
                duration: 1.4,
                repeat: Infinity,
              }}
              className="flex items-center gap-3 rounded-xl border bg-card p-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <FolderGit2 className="size-5 text-primary" />
              </motion.div>

              <span className="text-sm">{step}</span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "250%" }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-1/3 rounded-full bg-primary"
          />
        </div>
      </div>
    </div>
  );
}
