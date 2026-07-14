import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import SampleLogo from "../SampleLogo";
import ThemeSwitcher from "../theme-switcher";

export default function Header() {
  return (
    <div className="w-full pt-4">
      <header className="max-w-[1140px] mx-auto h-16 px-4 sm:px-6 flex items-center justify-between rounded-2xl border border-border bg-background/80 backdrop-blur shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <SampleLogo />

          <div className="leading-tight">
            <h1 className="font-semibold text-sm text-foreground">Jinnie</h1>

            <p className="text-xs text-muted-foreground">
              AI software engineering assistant
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <SignInButton>
            <Button variant="ghost" className="rounded-full px-4 h-9 text-sm">
              Log in
            </Button>
          </SignInButton>

          <SignUpButton>
            <Button className="rounded-full px-5 h-9 text-sm">
              Get started
            </Button>
          </SignUpButton>

          <ThemeSwitcher />
        </div>
      </header>
    </div>
  );
}
