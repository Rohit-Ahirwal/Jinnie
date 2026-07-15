"use client";

import { motion } from "framer-motion";

import RepositorySidebar from "./repository-sidebar";
import ChatPanel from "./chat-panel";
import ContextSidebar from "./context-sidebar";

export default function ChatLayout() {
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
          <ChatPanel />
        </main>

        {/* Context */}
        <aside className="hidden overflow-hidden rounded-3xl border bg-card xl:block">
          <ContextSidebar />
        </aside>
      </motion.div>
    </div>
  );
}
