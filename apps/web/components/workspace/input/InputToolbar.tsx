"use client";

import { Paperclip, SendHorizonal, Globe, Folder, File } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InputToolbar({ onSubmit, submitting }: { onSubmit: () => void; submitting: boolean }) {

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  
  return (
    <div onKeyDown={handleKeyDown} className="flex items-center justify-between border-t px-3 py-2">
      <div className="flex gap-2">
        <Button size="sm" variant="ghost">
          <Paperclip className="mr-2 size-4" />
          Attach
        </Button>

        <Button size="sm" variant="ghost">
          <File className="mr-2 size-4" />
          File
        </Button>

        <Button size="sm" variant="ghost">
          <Folder className="mr-2 size-4" />
          Folder
        </Button>

        <Button size="sm" variant="ghost">
          <Globe className="mr-2 size-4" />
          Web
        </Button>
      </div>

      <Button disabled={submitting} onClick={onSubmit}>
        <SendHorizonal className="mr-2 size-4" />
        Send
      </Button>
    </div>
  );
}
