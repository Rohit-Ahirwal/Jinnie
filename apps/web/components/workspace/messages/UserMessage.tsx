"use client";

import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useClerk } from "@clerk/nextjs";

export default function UserMessage({ content }: { content: string }) {

  const { user } = useClerk();
  const avatarUrl = user?.imageUrl ?? "https://github.com/shadcn.png";
  
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
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </motion.div>
  );
}
