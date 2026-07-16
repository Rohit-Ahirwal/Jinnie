"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import ConversationList from "./ConversationList";
import { Search } from "lucide-react";
import { Conversation } from "@/app/types";


export default function ConversationSection({ conversations, github_repo_id, selectedChatId }: { conversations: Conversation[]; github_repo_id: string; selectedChatId: number | null }) {
  return (
    <section className="flex h-80 flex-col border-b">
      <div className="space-y-3 p-4">
        <h2 className="text-sm font-semibold">Conversations</h2>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input placeholder="Search conversations..." className="pl-9" />
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 pb-4">
        <ConversationList conversations={conversations} github_repo_id={github_repo_id} selectedChatId={selectedChatId} />
      </ScrollArea>
    </section>
  );
}
