"use client";

import { motion } from "framer-motion";

const particles = [
  { left: "8%", top: "12%", delay: 0 },
  { left: "22%", top: "72%", delay: 1.4 },
  { left: "48%", top: "20%", delay: 2.2 },
  { left: "61%", top: "83%", delay: 1.1 },
  { left: "78%", top: "36%", delay: 2.8 },
  { left: "91%", top: "18%", delay: 1.8 },
];

export default function HeroBackground() {
  return (
    <>
      {/* Grid */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,hsl(var(--border)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.25)_1px,transparent_1px)]
          bg-[size:42px_42px]
          [mask-image:radial-gradient(circle_at_center,black,transparent_90%)]
        "
      />

      {/* Primary Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-24
          h-[32rem]
          w-[32rem]
          -translate-x-1/2
          rounded-full
          bg-primary/15
          blur-[120px]
        "
      />

      {/* Secondary Glow */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-0
          top-1/3
          h-80
          w-80
          rounded-full
          bg-primary/5
          blur-[100px]
        "
      />

      {/* Floating particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [0, -18, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          style={{
            left: particle.left,
            top: particle.top,
          }}
          className="
            absolute
            size-1.5
            rounded-full
            bg-primary/40
          "
        />
      ))}

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </>
  );
}