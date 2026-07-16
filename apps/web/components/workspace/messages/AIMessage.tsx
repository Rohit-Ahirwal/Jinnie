"use client";

import { motion } from "motion/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import ThinkingMessage from "./ThinkingMessage";
import StreamingMessage from "./StreamingMessage";

export default function AIMessage({ content, streaming }: { content: string; streaming: boolean }) {
  const thinking = false;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex"
    >
      <Avatar className="mr-3">
        <AvatarFallback>
          <Bot className="size-4" />
        </AvatarFallback>
      </Avatar>

      <div className="max-w-3xl rounded-2xl border bg-card px-5 py-4">
        <div className="flex-1">
          {thinking ? (
            <ThinkingMessage />
          ) : (
            <StreamingMessage
              content={content}
              streaming={streaming}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
