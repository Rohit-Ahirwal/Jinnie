"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

import ThinkingMessage from "./ThinkingMessage";
import StreamingMessage from "./StreamingMessage";

export default function AIMessage({
  content,
  streaming,
}: {
  content: string;
  streaming: boolean;
}) {
  const thinking = false;

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
        layout: {
          duration: 0.18,
        },
      }}
      className="flex items-start"
    >
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          delay: 0.05,
          duration: 0.18,
        }}
      >
        <Avatar className="mr-3">
          <AvatarFallback>
            <Bot className="size-4" />
          </AvatarFallback>
        </Avatar>
      </motion.div>

      <div className="max-w-3xl rounded-2xl border bg-card px-5 py-4">
        {thinking ? (
          <ThinkingMessage />
        ) : (
          <StreamingMessage content={content} streaming={streaming} />
        )}
      </div>
    </motion.div>
  );
}
