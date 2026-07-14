export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  github_connected: boolean;
  connection?: {
    username: string;
  };
}

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
};