"use client";

import { motion } from "framer-motion";
import { GitBranch, Sparkles, Code2 } from "lucide-react";

const NoRepositories = () => {
  return (
    <div className="flex min-h-[500px] items-center justify-center overflow-hidden rounded-3xl border border-border bg-background relative">
      {/* Background glow */}
      <motion.div
        className="absolute size-72 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating code particles */}
      {[...Array(12)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-muted-foreground/30"
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: -120,
          }}
          transition={{
            duration: 3 + index * 0.3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
          style={{
            left: `${10 + index * 7}%`,
            bottom: 20,
          }}
        >
          <Code2 className="size-4" />
        </motion.div>
      ))}

      <div className="relative z-10 flex max-w-md flex-col items-center text-center px-6">
        {/* Icon */}
        <motion.div
          className="relative flex size-20 items-center justify-center rounded-3xl bg-muted"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <GitBranch className="size-9 text-foreground" />

          <motion.div
            className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
            animate={{
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Sparkles className="size-4" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.h2
          className="mt-6 text-2xl font-semibold tracking-tight text-foreground"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          No repositories connected
        </motion.h2>

        <motion.p
          className="mt-3 text-sm leading-6 text-muted-foreground"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.2,
          }}
        >
          Connect your GitHub repository and let Jinnie analyze your code,
          detect issues, and become your AI coding assistant.
        </motion.p>
      </div>
    </div>
  );
};

export default NoRepositories;
