import { Bot } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
          <Bot className="size-6 text-primary" />
        </div>

        <div>
          <h2 className="font-semibold text-lg">Jinnie</h2>

          <p className="text-muted-foreground text-sm">
            Ask anything about your repository
          </p>
        </div>
      </div>

      <Badge variant="secondary">Repository AI</Badge>
    </div>
  );
}
