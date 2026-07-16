"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewChatButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="w-full gap-2 rounded-xl">
      <Sparkles className="size-4" />
      New Chat
    </Button>
  );
}
