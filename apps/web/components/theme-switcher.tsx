"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="
        group
        relative
        flex
        h-11
        w-20
        items-center
        rounded-full
        border
        border-border/70
        bg-muted/60
        p-1
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-primary/30
        hover:bg-muted
        hover:shadow-md
        active:scale-[0.98]
      "
    >
      {/* Sliding Thumb */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
        }}
        animate={{
          x: isDark ? 36 : 0,
        }}
        className="
          absolute
          left-1
          top-1
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          bg-background
          shadow-sm
          ring-1
          ring-border/50
        "
      >
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -45, scale: 0.75, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 45, scale: 0.75, opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {isDark ? (
            <Moon className="size-4 text-blue-400" />
          ) : (
            <Sun className="size-4 text-amber-500" />
          )}
        </motion.div>
      </motion.div>

      {/* Left Icon */}
      <div className="flex w-full items-center justify-between px-2">
        <Sun
          className={`size-4 transition-all duration-300 ${
            isDark
              ? "text-muted-foreground/40"
              : "text-amber-500 opacity-100"
          }`}
        />

        <Moon
          className={`size-4 transition-all duration-300 ${
            isDark
              ? "text-blue-400 opacity-100"
              : "text-muted-foreground/40"
          }`}
        />
      </div>
    </button>
  );
}