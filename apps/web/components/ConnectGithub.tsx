import { Button } from "./ui/button";
import { Steps } from "./ui/steps";
import { CodebaseBackground } from "./CodeGraph";
import {
  GitGraph,
  MessageSquare,
  Link as LinkIcon,
  Search,
} from "lucide-react";
import Link from "next/link";

const ConnectGithub = () => {
  const steps = [
    {
      title: "Authorize GitHub access",
      description:
        "Grant secure read access so the assistant can inspect your repository.",
    },
    {
      title: "Select a repository",
      description: "Choose the project you want analyzed and supported.",
    },
    {
      title: "AI analyzes your codebase",
      description:
        "We index files, routes, dependencies, and patterns to answer questions faster.",
    },
  ];

  return (
    <div className="w-full min-h-screen p-4 md:p-6 flex justify-center items-center bg-background">
      <div className="w-full max-w-7xl rounded-2xl shadow-md border border-border overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2fr]">
          <div className="bg-background p-5 md:p-8 flex flex-col justify-center items-center">
            <h1 className="text-center max-w-lg">
              <span className="block font-extrabold tracking-tight text-2xl md:text-3xl text-foreground">
                Connect Your Github Repository
              </span>

              <span className="block mt-2 text-sm md:text-base text-muted-foreground">
                Link your codebase to let AI analyze and assist you
              </span>
            </h1>

            <Link href="/api/github/connect">
              <Button className="rounded-full px-8 py-6 my-5 font-bold">
                Connect with Github
              </Button>
            </Link>

            <div className="border border-border p-4 rounded-2xl bg-muted w-full max-w-md">
              <Steps steps={steps} />
            </div>
          </div>

          <div className="relative min-h-[650px] lg:min-h-[750px] overflow-hidden">
            <CodebaseBackground />

            <div className="relative w-fit z-10 flex flex-col justify-center h-full p-5 md:p-8 gap-4">
              {[
                {
                  icon: (
                    <LinkIcon
                      size={36}
                      className="p-2 rounded-md text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-950"
                    />
                  ),
                  title: "Connected Workflow",
                  desc: "Scan, index and chat with your repo.",
                },

                {
                  icon: (
                    <Search
                      size={36}
                      className="p-2 rounded-md text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-950"
                    />
                  ),
                  title: "Find Issue",
                  desc: "Ask where auth lives or why a route fails.",
                },

                {
                  icon: (
                    <GitGraph
                      size={36}
                      className="p-2 rounded-md text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-950"
                    />
                  ),
                  title: "Map Structure",
                  desc: "Understand services, routes, and dependencies.",
                },

                {
                  icon: (
                    <MessageSquare
                      size={36}
                      className="p-2 rounded-md text-pink-700 bg-pink-100 dark:text-pink-300 dark:bg-pink-950"
                    />
                  ),
                  title: "Chat naturally",
                  desc: "Get fixes, explanations, and next steps.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-background/90 backdrop-blur shadow-md border border-border rounded-2xl p-4 md:p-5 w-full max-w-sm"
                >
                  <div className="flex gap-3 items-start">
                    {item.icon}

                    <div>
                      <h2 className="text-lg font-extrabold md:text-xl tracking-tight text-foreground">
                        {item.title}
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectGithub;
