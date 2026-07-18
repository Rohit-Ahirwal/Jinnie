"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Sparkles, ArrowRight } from "lucide-react";
import type { TimelineStage } from "./hooks/useTimeline";
import TypingText from "./TypingText";
import ThinkingIndicator from "./ThinkingIndicator";

interface Props {
  stage: TimelineStage;
}

const responses = {
  thinking: "",
  answering:
    "I found the issue. Authentication fails because the middleware matcher includes public routes.",
  complete:
    "I found the issue. Authentication fails because the middleware matcher includes public routes. Restrict the matcher and validate the session before redirecting.",
};

export default function ChatWindow({ stage }: Props) {
  const showThinking = stage === "thinking";

  const showAnswer = stage === "answering" || stage === "complete";

  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />

          <span className="font-medium">AI Conversation</span>
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Live
        </span>
      </div>

      <div className="space-y-6 p-5">
        {/* User */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="flex gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            <User className="size-4" />
          </div>

          <div className="flex-1 rounded-2xl bg-muted/50 p-4">
            <p className="font-medium">
              Why does authentication fail after login?
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Explain the root cause and suggest the safest fix.
            </p>
          </div>
        </motion.div>

        {/* AI */}

        <AnimatePresence mode="wait">
          {showThinking && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Bot className="size-4 text-primary" />
              </div>

              <ThinkingIndicator />
            </motion.div>
          )}

          {showAnswer && (
            <motion.div
              key="answer"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="flex gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Bot className="size-4 text-primary" />
              </div>

              <div className="flex-1 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                <TypingText text={responses[stage]} />

                {stage === "complete" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.5,
                    }}
                    className="mt-4 flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    Open middleware.ts
                    <ArrowRight className="size-4" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
