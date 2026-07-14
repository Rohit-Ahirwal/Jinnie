"use client";

import { motion } from "framer-motion";
import { FolderGit2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoReposFoundProps {
  search?: string;
  onReset?: () => void;
}

export default function NoReposFound({ search, onReset }: NoReposFoundProps) {
  return (
    <div className="flex min-h-[280px] w-full items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center"
      >
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900"
        >
          <FolderGit2 className="size-7 text-neutral-700 dark:text-neutral-300" />
        </motion.div>

        <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-50">
          No repositories found
        </h3>

        <p className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
          {search
            ? `We couldn't find any repository matching "${search}".`
            : "You don't have any available repositories to analyze."}
        </p>

        {search && onReset && (
          <Button
            onClick={onReset}
            variant="outline"
            className="mt-5 rounded-full dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <RefreshCcw className="mr-2 size-4" />
            Clear Search
          </Button>
        )}
      </motion.div>
    </div>
  );
}
