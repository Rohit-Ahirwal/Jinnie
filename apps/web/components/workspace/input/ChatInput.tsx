"use client";

import PromptTextarea from "./PromptTextarea";
import InputToolbar from "./InputToolbar";
import { Dispatch, useState } from "react";
import { MessageResponse } from "@/app/types";
import { chatStream } from "@/lib/api/chat-stream";

export default function ChatInput({
  selectedChatId,
  token,
  setNewMessages,
}: {
  selectedChatId: number;
  token: string;
  setNewMessages: Dispatch<React.SetStateAction<MessageResponse[]>>;
}) {
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
      const assistantTempId = -Date.now() - 1;

      const assistantMessage: MessageResponse = {
        conversation_id: selectedChatId,
        message: {
          id: assistantTempId,
          role: "assistant",
          status: "completed",
          content: "",
          token_count: 0,
          created_at: new Date().toISOString(),
        },
        streaming: true,
      };

      setNewMessages((prev) => [...prev, assistantMessage]);
      setPrompt("");
      await chatStream({
        token,
        conversationId: selectedChatId,
        prompt: tempPrompt,
        onToken(token) {
          setNewMessages((prev) =>
            prev.map((msg) =>
              msg.message.id === assistantTempId
                ? {
                    ...msg,
                    message: {
                      ...msg.message,
                      content: msg.message.content + token,
                    },
                  }
                : msg,
            ),
          );
        },

        onDone(data) {
          setNewMessages((prev) =>
            prev.map((msg) =>
              msg.message.id === assistantTempId
                ? {
                    ...msg,
                    message: {
                      ...msg.message,
                      id: data.message.id,
                      token_count: data.message.token_count,
                      created_at: data.message.created_at,
                    },
                    sources: data.sources,
                    streaming: false,
                  }
                : msg,
            ),
          );
        },

        onError(error) {
          console.error(error);
        },
      });
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
