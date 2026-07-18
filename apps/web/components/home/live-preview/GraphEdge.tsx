"use client";

import { motion } from "framer-motion";

interface Props {
  from: [number, number];
  to: [number, number];
}

export default function GraphEdge({ from, to }: Props) {
  return (
    <motion.line
      x1={from[0]}
      y1={from[1]}
      x2={to[0]}
      y2={to[1]}

      stroke="currentColor"

      className="text-border"

      strokeWidth="2"

      initial={{
        pathLength: 0,
      }}

      animate={{
        pathLength: 1,
      }}

      transition={{
        duration: 1.5,
      }}
    />
  );
}
