import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { GiMagicLamp } from "react-icons/gi";

import { Button } from "@/components/ui/button";
import HeroBackground from "./HeroBackground";
import HeroPreview from "./HeroPreview";

export default async function Hero() {
  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <section className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden py-28">
      <HeroBackground />

      <div className="container relative z-10">
        <div className="grid items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT */}

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/70 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur">
              <Sparkles className="size-4 text-primary" />

              Trusted by developers building with AI
            </div>

            <h1 className="mt-8 max-w-4xl text-5xl font-black tracking-[-0.05em] text-balance sm:text-6xl lg:text-7xl">
              Your AI Software Engineer
              <span className="block text-primary">
                for GitHub repositories
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground lg:text-xl">
              Connect your repository once.
              <br />
              Ask questions, debug issues, understand unfamiliar code, review
              pull requests, and ship features faster with an AI that actually
              knows your codebase.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <SignInButton>
                <Button
                  size="lg"
                  className="group h-13 rounded-2xl px-7 text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                >
                  <GiMagicLamp className="mr-2 size-5 transition-transform duration-300 group-hover:rotate-12" />

                  Rub Jinnie's Lamp

                  <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </SignInButton>

              <Button
                size="lg"
                variant="outline"
                className="group h-13 rounded-2xl border-border/70 bg-background/60 px-7 text-base backdrop-blur transition-all duration-300 hover:bg-muted"
              >
                <PlayCircle className="mr-2 size-5 transition-transform group-hover:scale-110" />

                Watch Demo
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 text-sm text-muted-foreground">
              <div>
                <p className="text-2xl font-bold text-foreground">10x</p>
                Faster debugging
              </div>

              <div>
                <p className="text-2xl font-bold text-foreground">24/7</p>
                AI Engineer
              </div>

              <div>
                <p className="text-2xl font-bold text-foreground">∞</p>
                Repository Context
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <HeroPreview />
        </div>
      </div>
    </section>
  );
}