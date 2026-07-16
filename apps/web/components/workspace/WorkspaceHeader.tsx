"use client";

import { ChevronLeft } from "lucide-react";
import SampleLogo from "../SampleLogo";
import { Button } from "../ui/button";
import Link from "next/link";

export default function WorkspaceHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-xl">
      <div className="font-semibold flex items-center justify-start gap-2">
        <Link href={"/dashboard"}>
          <Button variant="ghost" className="rounded-2xl p-2">
            <ChevronLeft className="size-4" />
          </Button>
        </Link>
        <SampleLogo />
        <span>Jinnie</span>
      </div>

      <div>Header Actions</div>
    </header>
  );
}
