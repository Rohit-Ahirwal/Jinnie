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
  default_branch: string,
  html_url: string,
  clone_url: string
  owner: {
    login: string
  }
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
  status: "completed" | "analyzing" | "pending" | "failed";
  default_branch: string,
  repo_url: string,
  owner: string,
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
  repositories: RepoDB[]
}