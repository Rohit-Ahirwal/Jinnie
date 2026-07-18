"use client";

import { motion } from "framer-motion";
import Timeline from "./Timeline";
import LivePreview from "./LivePreview";

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            How Jinnie Works
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            From repository to solution in seconds
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Connect your GitHub repository once. Jinnie understands your
            codebase, answers complex engineering questions, and suggests fixes
            with precise file references.
          </p>
        </motion.div>

        <div className="mt-20 grid items-center gap-20 lg:grid-cols-[420px_1fr]">
          <Timeline />

          <LivePreview />
        </div>
      </div>
    </section>
  );
}
