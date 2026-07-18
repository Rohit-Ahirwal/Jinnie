"use client";

import { motion } from "framer-motion";
import { GitBranch, MessageSquare, ShieldCheck, ArrowUpRight } from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "Repository Aware",
    description:
      "Understands project structure, dependencies, architecture, and coding patterns before answering.",
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description:
      "Ask questions in plain English and receive code-aware answers with relevant file references.",
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure",
    description:
      "Connect securely through GitHub OAuth. Your repositories stay under your control.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

export default function Features() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl">

        <div className="mb-14 max-w-2xl">
          <span className="text-sm font-medium text-primary">
            Why developers choose Jinnie
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Built for modern software engineering
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Every interaction is backed by repository context instead of generic
            AI responses.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                variants={item}
                whileHover={{
                  y: -8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                }}
                className="
                    h-full
                    flex-col
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-border/60
                    bg-card/70
                    p-8
                    backdrop-blur
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-primary/30
                    hover:shadow-xl
                    hover:shadow-primary/5
                  "
              >
                {/* Hover Glow */}

                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}

                <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 transition-all duration-300 group-hover:scale-110">
                    <Icon className="size-6 text-primary" />
                </div>

                {/* Content */}

                <h3 className="text-xl font-semibold tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-muted-foreground">
                  {feature.description}
                </p>

                {/* Footer */}

                <div className="mt-8 flex items-center gap-2 font-medium text-primary">
                  Learn more

                  <ArrowUpRight className="size-4" />
                </div>

                {/* Animated Border */}

                <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}