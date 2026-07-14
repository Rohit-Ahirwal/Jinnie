"use client";

import { motion } from "framer-motion";
import { Cpu, GitBranch, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  "Initializing AI engine...",
  "Connecting secure environment...",
  "Loading code intelligence...",
  "Preparing workspace...",
];

export default function Loader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const [particles] = useState(() =>
    Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 500 - 250,
      y: Math.random() * 500 - 250,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 2,
      endY: Math.random() * -500,
    })),
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-neutral-300)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-neutral-300)_1px,transparent_1px)] bg-size-[45px_45px] opacity-30 dark:opacity-10" />

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary"
          initial={{
            opacity: 0,
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [particle.y, particle.endY],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      <div className="relative flex flex-col items-center gap-8">
        {/* Core */}
        <motion.div
          className="relative flex h-32 w-32 items-center justify-center rounded-full border border-primary/30 bg-primary/10 backdrop-blur-xl"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/40"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <Cpu className="h-12 w-12 text-primary" />
        </motion.div>

        {/* Icons */}
        <div className="flex gap-6 text-muted-foreground">
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <GitBranch />
          </motion.div>

          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <Sparkles />
          </motion.div>
        </div>

        {/* Text */}
        <div className="text-center">
          <motion.h1
            className="text-xl font-semibold text-neutral-950 dark:text-neutral-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Building Intelligence
          </motion.h1>

          <motion.p
            key={step}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-2 text-sm text-muted-foreground"
          >
            {steps[step]}
          </motion.p>
        </div>

        {/* Progress */}
        <div className="h-1 w-64 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full bg-primary"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
