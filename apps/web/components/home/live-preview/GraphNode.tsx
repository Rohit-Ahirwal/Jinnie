"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Props {
  title: string;
  x: number;
  y: number;
  active: boolean;
  current: boolean;
}

export default function GraphNode({ title, x, y, active, current }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
      }}

      animate={{
        opacity: active ? 1 : 0.2,
        scale: active ? 1 : 0.9,
      }}

      className="absolute"

      style={{
        left: x,
        top: y,
      }}
    >
      <motion.div
        animate={
          current
            ? {
                scale: [1, 1.15, 1],
              }
            : {}
        }

        transition={{
          repeat: Infinity,
          duration: 1.6,
        }}

        className={`
relative
flex
h-14
w-14
items-center
justify-center
rounded-full
border

${
  active
    ? "border-primary bg-primary text-primary-foreground"
    : "border-border bg-background"
}
`}
      >
        {active ? <Check className="size-5" /> : null}

        {current && (
          <motion.div
            animate={{
              scale: [1, 2.4],
              opacity: [0.6, 0],
            }}

            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}

            className="absolute inset-0 rounded-full bg-primary"
          />
        )}
      </motion.div>

      <p className="mt-3 w-24 -translate-x-5 text-center text-xs font-medium">
        {title}
      </p>
    </motion.div>
  );
}
