import React from "react";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import SampleLogo from "./SampleLogo";

const Header = () => {
  return (
    <div className="w-full p-4">
      <div className="w-full bg-white shadow-xl border border-gray-300 rounded-2xl p-2">
        <div className="flex justify-between items-center align-middle p-2">
          <div className="flex justify-center items-center space-x-2">
            <SampleLogo />
            <div>
              <h1 className="flex flex-col">
                <span className="text-xl font-extrabold mb-0 text-primary italic">
                  Jinnie
                </span>
                <span className="text-xs mt-0">
                  AI software engineer assistance
                </span>
              </h1>
            </div>
          </div>
          <div className="flex space-x-2 justify-center">
            <SignInButton>
              <Button
                variant={"secondary"}
                className={"rounded-full px-10 font-bold"}
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                variant={"default"}
                className={"rounded-full px-10 font-bold"}
              >
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
