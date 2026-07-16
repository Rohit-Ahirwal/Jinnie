"use client";

import { motion } from "motion/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function UserMessage({ content }: { content: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-end"
    >
      <div className="flex max-w-3xl items-start gap-3">
        <div className="rounded-2xl bg-primary px-5 py-3 text-primary-foreground">
          {content}
        </div>

        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </motion.div>
  );
}
