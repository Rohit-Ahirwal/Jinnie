"use client";

import { motion } from "framer-motion";
import { ArrowUp, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageResponse } from "@/app/types";
import { Dispatch, SetStateAction, useState } from "react";
import { apiRequest } from "@/lib/api/auth-client";

export default function ChatInput({
  token,
  conversation_id,
  setNewMessages,
}: {
  token: string;
  conversation_id: number;
  setNewMessages: Dispatch<SetStateAction<MessageResponse[]>>;
}) {
  const [prompt, setPrompt] = useState<string>("");

  const submitPrompt = async () => {
    try {
      const tempPrompt = prompt;
      const tempMessage: MessageResponse = {
        conversation_id: conversation_id,
        message: {
          id: -Date.now(),
          role: "user",
          status: "completed",
          content: tempPrompt,
          token_count: 0,
          created_at: new Date().toISOString(),
        },
      };
      setNewMessages((prev) => [...prev, tempMessage])
      setPrompt("");
      const response = await apiRequest<MessageResponse>(token, {
        method: "POST",
        url: `/messages/conversation/${conversation_id}`,
        data: {
          content: tempPrompt,
        },
      });

      setNewMessages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to send prompt:", error);
    }
  };

  return (
    <div className="sticky bottom-0 z-20 border-t bg-background/80 backdrop-blur-xl">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-auto w-full max-w-5xl p-6"
      >
        <div className="rounded-3xl border bg-card shadow-sm transition-all focus-within:border-primary/50 focus-within:shadow-lg">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Jinnie anything about your repository..."
            className="max-h-60 min-h-28 resize-none border-0 bg-transparent px-5 pt-5 text-base shadow-none focus-visible:ring-0"
          />

          <div className="flex items-center justify-between px-4 pb-4">
            <Button variant="ghost" size="icon">
              <Paperclip className="size-5" />
            </Button>

            <Button
              onClick={() => {
                if (prompt) submitPrompt();
              }}
              size="icon"
              className="rounded-full"
            >
              <ArrowUp className="size-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
