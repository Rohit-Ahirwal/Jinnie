"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const isDark = theme === "dark";

  function toggleTheme() {
    setIsAnimating(true);

    setTheme(isDark ? "light" : "dark");

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="relative size-11 overflow-hidden rounded-full border-neutral-200 bg-background"
    >
      <motion.div
        animate={{
          rotate: isAnimating ? 360 : 0,
          scale: isAnimating ? 1.15 : 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </motion.div>

      <motion.span
        initial={false}
        animate={{
          opacity: isAnimating ? 1 : 0,
          scale: isAnimating ? 1 : 0,
        }}
        className="absolute inset-0 rounded-full bg-primary/10"
      />
    </Button>
  );
}
