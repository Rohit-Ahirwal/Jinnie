"use client";

import { motion } from "motion/react";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { timeAgo } from "@/lib/timeAgo";
import { useWorkspaceStore } from "@/store/workspace-store";

interface Props {
  conversation_id: number;
  github_repo_id: string;
  title: string;
  createdAt: string;
  active?: boolean;
}

export default function ConversationCard({
  title,
  createdAt,
  active,
  conversation_id,
}: Props) {

  const setSelectedChatId = useWorkspaceStore((s) => s.setSelectedChatId);
  
  return (
    <motion.button
      layout
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "group w-full rounded-xl border border-transparent p-3 text-left transition-all",
        "hover:border-border hover:bg-muted/60",
        active && "border-primary/40 bg-primary/10",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
          <MessageSquare className="size-4" />
        </div>

        <div onClick={() => setSelectedChatId(conversation_id)} className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium">{title}</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            {timeAgo(createdAt)}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
