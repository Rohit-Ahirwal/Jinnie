"use client";

import { motion } from "framer-motion";

import RepositorySidebar from "./repository-sidebar";
import ChatPanel from "./chat-panel";
import ContextSidebar from "./context-sidebar";
import { Conversation, Message, MessageResponse, UserProfile } from "@/app/types";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api/auth-client";

type ChatLayoutParams = {
  token: string;
  user: UserProfile;
  conversation: Conversation;
  chatLoading: boolean
}

export default function ChatLayout({
  token,
  user,
  conversation,
  chatLoading
}: ChatLayoutParams) {
  const [messages, setMessages] = useState<Message[]>();
  const [newmessages, setNewMessages] = useState<MessageResponse[]>([]);

  useEffect(() => {
    async function getPrevMessages() {
      const response = await apiRequest<Message[]>(token, {
        method: "GET",
        url: `/messages/conversation/${conversation.id}`
      });

      setMessages(response.data);
    }

    getPrevMessages();
  }, [conversation.id, token])

  return (
    <div className="flex h-full overflow-hidden bg-background">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="grid h-full w-full overflow-hidden gap-6 p-6 xl:grid-cols-[320px_minmax(0,1fr)_360px]"
      >
        {/* Repository */}
        <aside className="hidden overflow-hidden rounded-3xl border bg-card xl:block">
          <RepositorySidebar />
        </aside>

        {/* Chat */}
        <main className="overflow-hidden rounded-3xl border bg-card">
          <ChatPanel messages={messages!} newMessages={newmessages} setNewMessages={setNewMessages} token={token} conversation={conversation} />
        </main>

        {/* Context */}
        <aside className="hidden overflow-hidden rounded-3xl border bg-card xl:block">
          <ContextSidebar />
        </aside>
      </motion.div>
    </div>
  );
}
