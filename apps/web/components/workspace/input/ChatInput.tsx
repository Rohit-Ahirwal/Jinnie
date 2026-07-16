"use client";

import PromptTextarea from "./PromptTextarea";
import InputToolbar from "./InputToolbar";
import { Dispatch, useState } from "react";
import { MessageResponse } from "@/app/types";
import { apiRequest } from "@/lib/api/auth-client";

export default function ChatInput({ selectedChatId, token, setNewMessages }: { selectedChatId: number; token: string; setNewMessages: Dispatch<React.SetStateAction<MessageResponse[]>> }) {
  const [prompt, setPrompt] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitPrompt = async () => {
    try {
      if (!prompt.trim()) return;
      setIsSubmitting(true);
      const tempPrompt = prompt;
      const tempMessage: MessageResponse = {
        conversation_id: selectedChatId!,
        message: {
          id: -Date.now(),
          role: "user",
          status: "completed",
          content: tempPrompt,
          token_count: 0,
          created_at: new Date().toISOString(),
        },
      };
      setNewMessages((prev) => [...prev, tempMessage]);
      setPrompt("");
      const response = await apiRequest<MessageResponse>(token, {
        method: "POST",
        url: `/messages/conversation/${selectedChatId}`,
        data: {
          content: tempPrompt,
        },
      });

      setNewMessages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to send prompt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="sticky bottom-0 border-t bg-background/90 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl p-4">
        <div className="overflow-hidden rounded-2xl border bg-card shadow-lg">
          <PromptTextarea prompt={prompt} setPrompt={setPrompt} />
          <InputToolbar onSubmit={submitPrompt} submitting={isSubmitting} />
        </div>
      </div>
    </div>
  );
}
