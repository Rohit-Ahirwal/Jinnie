"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

type CodeNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  code: string[];
};

const files = [
  "auth.ts",
  "api.ts",
  "server.ts",
  "database.ts",
  "middleware.ts",
  "hooks.ts",
  "config.ts",
  "worker.ts",
  "component.tsx",
  "schema.prisma",
  "utils.ts",
];

const snippets = [
  "await fetch('/api')",
  "export async function run()",
  "db.query()",
  "middleware.next()",
  "commit.save()",
  "queue.process()",
  "return response",
  "const data = await load()",
];

function generateEdges(nodes: CodeNode[]) {
  return nodes.slice(1).map((node, i) => {
    const parentIndex = Math.max(0, i - Math.floor(Math.random() * 5 + 1));

    return [nodes[parentIndex].id, node.id];
  });
}

function generateNodes(count = 150) {
  return Array.from({ length: count }, (_, i) => {
    const branch = Math.floor(Math.random() * 6);

    return {
      id: `node-${i}`,
      label: files[Math.floor(Math.random() * files.length)],
      x: 1800 + branch * 180 + Math.sin(i) * 100,
      y: 1800 + (i - count / 2) * 50,
      code: Array.from(
        { length: 4 },
        () => snippets[Math.floor(Math.random() * snippets.length)],
      ),
    };
  });
}

const randomCode = Array.from({ length: 300 }, (_, i) => ({
  id: i,
  text: snippets[Math.floor(Math.random() * snippets.length)],
  x: Math.random() * 100,
  y: Math.random() * 100,
}));

export function CodebaseBackground() {
  const [active, setActive] = useState<string | null>(null);
  const [nodes] = useState(() => generateNodes(500));
  const [scale, setScale] = useState(1);
  const [edges] = useState(() => generateEdges(nodes));

  return (
    <div
      onWheel={(e) => {
        if (!e.ctrlKey) return;

        setScale((s) => Math.min(2, Math.max(0.5, s - e.deltaY * 0.001)));
      }}
      className="absolute inset-0 overflow-hidden bg-background"
    >
      <motion.div
        drag
        dragConstraints={{
          left: -2000,
          right: 2000,
          top: -2000,
          bottom: 2000,
        }}
        style={{
          transform: `scale(${scale})`,
        }}
        className="
          absolute
          w-[4000px]
          h-[4000px]
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, #4f46e580 1px, transparent 1px),
              linear-gradient(to bottom, #4f46e580 1px, transparent 1px)
            `,
            backgroundSize: "45px 45px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "45px 45px"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, #6366f180, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <svg className="absolute inset-0 h-full w-full">
          {edges.map((edge, i) => {
            const a = nodes.find((n) => n.id === edge[0])!;
            const b = nodes.find((n) => n.id === edge[1])!;

            return (
              <motion.line
                key={i}
                initial={{
                  strokeDashoffset: 100,
                }}
                animate={{
                  strokeDashoffset: 0,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="currentColor"
                className="text-indigo-400"
                strokeWidth={active === a.id || active === b.id ? 3 : 1.2}
                strokeDasharray="6 8"
              />
            );
          })}

          {nodes.map((node) => (
            <motion.circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={active === node.id ? 12 : 7}
              className="
                fill-indigo-500
                stroke-background
                stroke-2
                cursor-pointer
              "
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              onMouseEnter={() => setActive(node.id)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </svg>

        {nodes.map((node) => {
          if (active !== node.id) return null;

          return (
            <motion.div
              key={node.id}
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                absolute
                z-30
                rounded-xl
                border
                border-border
                bg-card/90
                backdrop-blur
                shadow-xl
                p-4
                font-mono
                text-xs
                text-foreground
              "
              style={{
                left: node.x + 20,
                top: node.y + 20,
              }}
            >
              <div className="mb-2 font-semibold text-indigo-500">
                {node.label}
              </div>

              {node.code.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </motion.div>
          );
        })}

        <div
          className="
            absolute
            left-20
            top-20
            font-mono
            text-xs
            leading-6
            text-indigo-500
            opacity-30
          "
        >
          import &#123; AIAnalyzer &#125;
          <br />
          repository.scan()
          <br />
          dependency.graph()
          <br />
          await indexFiles()
        </div>

        <div
          className="
            absolute
            right-20
            top-32
            font-mono
            text-xs
            leading-6
            text-indigo-500
            opacity-30
          "
        >
          prisma.user.findMany()
          <br />
          middleware.auth()
          <br />
          route.handler()
        </div>

        <div
          className="
            absolute
            left-1/2
            top-[48%]
            -translate-x-1/2
            opacity-20
          "
        >
          <FaGithub size={42} />
        </div>

        {randomCode.map((code) => (
          <div
            key={code.id}
            className="absolute font-mono text-xs text-indigo-500 opacity-100"
            style={{
              left: `${code.x}%`,
              top: `${code.y}%`,
            }}
          >
            {code.text}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
