"use client";

import { motion } from "framer-motion";
import { ArrowUp, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ChatInput() {
  return (
    <div className="sticky bottom-0 z-20 border-t bg-background/80 backdrop-blur-xl">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mx-auto w-full max-w-5xl p-6"
      >
        <div className="rounded-3xl border bg-card shadow-sm transition-all focus-within:border-primary/50 focus-within:shadow-lg">
          <Textarea
            placeholder="Ask Jinnie anything about your repository..."
            className="max-h-60 min-h-28 resize-none border-0 bg-transparent px-5 pt-5 text-base shadow-none focus-visible:ring-0"
          />

          <div className="flex items-center justify-between px-4 pb-4">
            <Button variant="ghost" size="icon">
              <Paperclip className="size-5" />
            </Button>

            <Button size="icon" className="rounded-full">
              <ArrowUp className="size-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
