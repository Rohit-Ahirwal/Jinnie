"use client";
import { Button } from "@/components/ui/button";
import SampleLogo from "./SampleLogo";
import ThemeSwitcher from "./theme-switcher";
import {
  CircleUserRound,
  GitBranch,
  Settings,
  LayoutDashboard,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header2 = () => {

  const { user } = useClerk();
  const avatarUrl = user?.imageUrl ?? "https://github.com/shadcn.png";
  
  return (
    <div className="bg-background border-border border-b border-solid w-full">
      <div className="max-w-[1140px] flex mx-auto px-4 sm:px-6 lg:px-8 justify-between items-center w-full h-16">
        <div className="flex items-center gap-4 lg:gap-8 min-w-0">
          <div className="flex items-center gap-3 shrink-0">
            <SampleLogo />
            <div className="leading-none flex flex-col">
              <span className="font-bold text-sm leading-5 tracking-tight text-foreground">
                Jinnie
              </span>
              <span className="text-muted-foreground text-xs leading-4 hidden sm:block">
                AI software engineering assistant
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              className="font-medium rounded-full bg-accent text-accent-foreground text-sm leading-5 px-4 h-10"
            >
              <LayoutDashboard className="size-4 mr-2" />
              Dashboard
            </Button>

            <Button
              variant="ghost"
              className="font-medium rounded-full text-muted-foreground text-sm leading-5 px-4 h-10"
            >
              <GitBranch className="size-4 mr-2" />
              Repositories
            </Button>

            <Button
              variant="ghost"
              className="font-medium rounded-full text-muted-foreground text-sm leading-5 px-4 h-10"
            >
              <MessageSquare className="size-4 mr-2" />
              Chat
            </Button>

            <Button
              variant="ghost"
              className="font-medium rounded-full text-muted-foreground text-sm leading-5 px-4 h-10"
            >
              <Settings className="size-4 mr-2" />
              Settings
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant={"ghost"}
                  className="size-10 rounded-full text-muted-foreground p-0 shrink-0"
                />
              }
            >
              <Avatar>
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>
                  <CircleUserRound className="size-5" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48 rounded-xl">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem className={"cursor-pointer rounded"}>
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className={"cursor-pointer rounded"}>
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-red-500 cursor-pointer rounded">
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Header2;
