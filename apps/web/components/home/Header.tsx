import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import SampleLogo from "../SampleLogo";
import ThemeSwitcher from "../theme-switcher";

export default function Header() {
  return (
    <div className="w-full px-4 pt-4">
      <header
        className="
          max-w-[1200px]
          mx-auto
          h-16
          px-3
          sm:px-5
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-border/70
          bg-background/80
          backdrop-blur-xl
          shadow-sm
        "
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 min-w-0">
          <SampleLogo />

          <div className="leading-tight flex items-center gap-2 hidden xs:block">
            <p className="font-semibold text-sm">Jinnie</p>

            <p className="text-xs text-muted-foreground whitespace-nowrap">
              AI engineer for your codebase
            </p>
          </div>

          {/* Mobile brand */}
          <p className="font-semibold text-sm xs:hidden">Jinnie</p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="#features"
            className="hover:text-foreground transition-colors"
          >
            Features
          </a>

          <a
            href="#security"
            className="hover:text-foreground transition-colors"
          >
            Security
          </a>

          <a href="#docs" className="hover:text-foreground transition-colors">
            Docs
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />

          <SignInButton>
            <Button
              variant="ghost"
              className="
                rounded-full
                h-9
                px-3
                sm:px-4
                text-sm
              "
            >
              <span className="hidden sm:inline">Log in</span>

              <span className="sm:hidden">Sign in</span>
            </Button>
          </SignInButton>

          <SignUpButton>
            <Button
              className="
                rounded-full
                h-9
                px-4
                sm:px-5
                text-sm
              "
            >
              <span className="hidden sm:inline">Start building</span>

              <span className="sm:hidden">Start</span>
            </Button>
          </SignUpButton>
        </div>
      </header>
    </div>
  );
}
