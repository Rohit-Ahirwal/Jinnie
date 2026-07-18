"use client";

import RepositoryCard from "./RepositoryCard";
import NewChatButton from "./NewChatButton";
import ConversationSection from "./conversation/ConversationSection";
import { Conversation, UserProfile } from "@/app/types";
import { apiRequest } from "@/lib/api/auth-client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

interface LeftSidebarProps {
  token: string;
  github_repo_id: string;
  user: UserProfile;
  selectedChatId: number | null;
  conversations: Conversation[];
}

export default function LeftSidebar({
  token,
  github_repo_id,
  conversations,
  user,
  selectedChatId,
}: LeftSidebarProps) {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const handleNewChat = async () => {
    if (!title.trim()) return;

    const response = await apiRequest<Conversation>(token, {
      method: "POST",
      url: `conversations/repository/${github_repo_id}`,
      data: {
        title,
      },
    });

    const data = response.data;

    if (data) {
      redirect(`repository/${github_repo_id}/chat/${data.id}`)
    }

    setTitle("");
    setOpen(false);
  };

  return (
    <aside className="flex h-full flex-col border-r bg-card">
      <div className="space-y-3 border-b p-4">
        <RepositoryCard github_repo_id={github_repo_id} token={token} />

        <NewChatButton onClick={() => setOpen(true)} />
      </div>

      <ConversationSection
        github_repo_id={github_repo_id}
        conversations={conversations}
        selectedChatId={selectedChatId}
      />

      <div className="flex-1">Files</div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Chat</DialogTitle>

            <DialogDescription>
              Give your conversation a name so you can find it later.
            </DialogDescription>
          </DialogHeader>

          <Input
            placeholder="e.g. Authentication bug analysis"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNewChat();
              }
            }}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleNewChat} disabled={!title.trim()}>
              Create Chat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
