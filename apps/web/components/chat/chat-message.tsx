"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

import { cn } from "@/lib/utils";
import Markdown from "./markdown";
import MessageActions from "./message-actions";
import { Message } from "@/app/types";

interface Props {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  const assistant = message.role === "assistant";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={cn("flex gap-4", assistant ? "justify-start" : "justify-end")}
    >
      {assistant && (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Bot className="size-5 text-primary" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[85%] rounded-3xl border px-5 py-4",
          assistant ? "bg-card" : "bg-primary text-primary-foreground",
        )}
      >
        <p className="leading-7 whitespace-pre-wrap">
          <Markdown>{message.content}</Markdown>

          <MessageActions />
        </p>
      </div>

      {!assistant && (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary">
          <User className="size-5 text-primary-foreground" />
        </div>
      )}
    </motion.div>
  );
}
