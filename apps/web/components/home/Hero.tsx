import { Button } from "@/components/ui/button";
import { PlayCircle, Sparkles } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { GiMagicLamp } from "react-icons/gi";
import { redirect } from "next/navigation";

export default async function Hero() {

  const { isAuthenticated } = await auth();

  if (isAuthenticated) {
    redirect("/dashboard");
  }
  
  return (
    <section className="pt-20 pb-12">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground">
          <Sparkles className="size-4" />
          Analyze, debug, and ship faster with AI
        </div>

        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
          Your AI pair engineer for
          <br />
          GitHub repositories
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
          Connect a repo, ask questions in plain English, and get code-aware
          answers with referenced files, fixes, and next steps.
        </p>

        <div className="flex flex-wrap gap-3 mt-8">
          <SignInButton>
            <Button className="rounded-full font-bold px-6 h-12">
              <GiMagicLamp className="size-4 mr-2" />
              Rub the Jinnie&apos;s lamp
            </Button>
          </SignInButton>

          <Button variant="outline" className="rounded-full px-6 h-12">
            <PlayCircle className="size-4 mr-2" />
            Watch demo
          </Button>
        </div>
      </div>
    </section>
  );
}
