"use client";

import { motion } from "motion/react";
import { MessageSquare, Trash, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { timeAgo } from "@/lib/timeAgo";
import { useWorkspaceStore } from "@/store/workspace-store";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/api/auth-client";
import { useState } from "react";

interface Props {
  conversation_id: number;
  github_repo_id: string;
  title: string;
  createdAt: string;
  active?: boolean;
  token: string;
}

export default function ConversationCard({
  title,
  createdAt,
  active,
  conversation_id,
  token,
}: Props) {
  const setSelectedChatId = useWorkspaceStore((s) => s.setSelectedChatId);
  const [deleting, setDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleting(true);
    const response = await apiRequest(token, {
      method: "DELETE",
      url: `/conversations/${conversation_id}`,
    });
    setDeleting(false);
  };

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

        <div
          onClick={() => setSelectedChatId(conversation_id)}
          className="min-w-0 flex-1"
        >
          <h3 className="truncate text-sm font-medium">{title}</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            {timeAgo(createdAt)}
          </p>
        </div>

        <Button
          disabled={deleting}
          onClick={handleDelete}
          variant="ghost"
          size="icon"
          className="
            h-8 w-8 rounded-lg
            text-muted-foreground
            opacity-0
            transition-all duration-200
            group-hover:opacity-100
            hover:bg-destructive/10
            hover:text-destructive
            active:scale-95
          "
        >
          <motion.div
            whileHover={{
              rotate: -12,
              y: -1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 12,
            }}
          >
            <Trash2 className="size-4" />
          </motion.div>
        </Button>
      </div>
    </motion.button>
  );
}
