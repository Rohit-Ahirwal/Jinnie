"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  CheckCircle2,
  GitBranch,
  MessageSquareText,
} from "lucide-react";

const steps = [
  {
    icon: GitBranch,
    title: "Connect Repository",
    description: "Securely connect your GitHub repository in a few seconds.",
  },
  {
    icon: BrainCircuit,
    title: "AI Understands Everything",
    description:
      "Jinnie indexes your project, dependencies, architecture and code patterns.",
  },
  {
    icon: MessageSquareText,
    title: "Ask Naturally",
    description: "Ask questions exactly like you would ask a senior engineer.",
  },
  {
    icon: CheckCircle2,
    title: "Ship Faster",
    description: "Receive explanations, fixes and file references instantly.",
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* Vertical Line */}

      <div className="absolute left-6 top-4 bottom-4 w-px bg-border" />

      <div className="space-y-10">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.45,
              }}
              className="group relative flex gap-6"
            >
              {/* Circle */}

              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-background shadow-sm transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
                <Icon className="size-5 text-primary" />
              </div>

              {/* Content */}

              <div className="pt-1">
                <h3 className="text-lg font-semibold">{step.title}</h3>

                <p className="mt-2 leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
