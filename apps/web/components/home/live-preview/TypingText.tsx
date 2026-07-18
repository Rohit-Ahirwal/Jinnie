"use client";

import { useEffect, useState } from "react";

interface Props {
  text: string;
}

export default function TypingText({ text }: Props) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    setDisplay("");

    let index = 0;

    const interval = setInterval(() => {
      index++;

      setDisplay(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="leading-7">
      {display}

      <span className="animate-pulse">|</span>
    </p>
  );
}
