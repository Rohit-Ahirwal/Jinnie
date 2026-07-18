import { number } from "framer-motion";

export type Repo = {
  id: string;
  name: string;
  description: string;
  language: string;
  private: boolean;
  stars: number;
  issues: number;
  progress: number;
  analyzed_at: string | null;
  status: "completed" | "analyzing" | "pending" | "failed";
  default_branch: string;
  html_url: string;
  clone_url: string;
  owner: {
    login: string;
  };
};

export type RepoDB = {
  github_repo_id: string;
  repo_name: string;
  repo_description: string;
  language: string;
  private: boolean;
  stars: number;
  issues: number;
  progress: number;
  analyzed_at: string | null;
  status:
    | "pending"
    | "cloning"
    | "scanning"
    | "syncing"
    | "completed"
    | "failed";
  default_branch: string;
  repo_url: string;
  owner: string;
};

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  github_connected: boolean;
  connection?: {
    username: string;
  };
  repositories: RepoDB[];
}

export interface TreeNode {
  id: string;
  name: string;
  path: string;
  type: "file" | "folder";
  children?: TreeNode[];
}

export interface Conversation {
  id: number,
  repo_id: number,
  title: string,
  created_at: string,
  updated_at: string
}

export interface Message {
  id: number,
  role: "assistant" | "user" | "system",
  status: "pending" | "streaming" | "completed" | "failed",
  content: string,
  token_count: number,
  created_at: string
}

export interface Sources {
  path: string;
  filename: string;
  language: string;
  score: number;
  chunk_index: number;
}

export interface MessageResponse {
  conversation_id: number,
  message: Message,
  sources?: Sources[],
  streaming?: boolean
}