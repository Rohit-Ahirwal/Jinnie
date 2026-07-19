import {
  Conversation,
  FileResponse,
  Message,
  MessageResponse,
  RepositoryResponse,
  UserProfile,
  EditorStore,
} from "@/types";
import { create } from "zustand";

type WorkspaceData = {
  token: string;
  github_repo_id: string;
  user: UserProfile;
  selectedChatId: number;
  conversations: Conversation[];
  messages: Message[];
  chatLoading: boolean;
  newMessages: MessageResponse[];
  repository: RepositoryResponse;
  editorOpened: boolean;
};

interface WorkspaceStore extends WorkspaceData, EditorStore {
  setWorkspace: (workspace: Partial<WorkspaceData>) => void;

  setToken: (token: string) => void;

  setGithubRepoId: (github_repo_id: string) => void;

  setConversations: (
    updater: Conversation[] | ((prev: Conversation[]) => Conversation[]),
  ) => void;

  setMessages: (updater: Message[] | ((prev: Message[]) => Message[])) => void;

  setNewMessages: (
    updater:
      MessageResponse[] | ((prev: MessageResponse[]) => MessageResponse[]),
  ) => void;

  setRepository: (
    updater:
      RepositoryResponse | ((prev: RepositoryResponse) => RepositoryResponse),
  ) => void;

  setEditorOpened: (editorOpened: boolean) => void;

  setChatLoading: (chatLoading: boolean) => void;

  setSelectedChatId: (selectedChatId: number) => void;

  setUser: (user: UserProfile) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  token: "",
  github_repo_id: "",
  user: {} as UserProfile,
  selectedChatId: 0,
  chatLoading: false,
  editorOpened: false,
  tabs: [],
  activePath: null,

  conversations: [],
  messages: [],
  newMessages: [],
  repository: {} as RepositoryResponse,

  openFile(file) {
    const { tabs } = get();

    const existing = tabs.find((tab) => tab.path === file.path);

    if (existing) {
      set({
        activePath: file.path,
      });

      return;
    }

    set({
      tabs: [...tabs, file],
      activePath: file.path,
    });
  },

  closeFile(path) {
    const { tabs, activePath } = get();

    const index = tabs.findIndex((tab) => tab.path === path);

    if (index === -1) return;

    const nextTabs = tabs.filter((tab) => tab.path !== path);

    let nextActive = activePath;

    if (activePath === path) {
      if (nextTabs.length === 0) {
        nextActive = null;
      } else if (index < nextTabs.length) {
        nextActive = nextTabs[index].path;
      } else {
        nextActive = nextTabs[nextTabs.length - 1].path;
      }
    }

    set({
      tabs: nextTabs,
      activePath: nextActive,
    });
  },

  activeFile() {
    const { tabs, activePath } = get();

    return tabs.find((tab) => tab.path === activePath) ?? null;
  },

  setActive: (path) => {
    set((state) => ({
      ...state,
      activePath: path,
    }));
  },

  setWorkspace: (workspace) =>
    set((state) => ({
      ...state,
      ...workspace,
    })),

  setToken: (token) =>
    set((state) => ({
      ...state,
      token,
    })),

  setGithubRepoId: (github_repo_id) =>
    set((state) => ({
      ...state,
      github_repo_id,
    })),

  setConversations: (updater) =>
    set((state) => ({
      conversations:
        typeof updater === "function" ? updater(state.conversations) : updater,
    })),

  setMessages: (updater) =>
    set((state) => ({
      messages:
        typeof updater === "function" ? updater(state.messages) : updater,
    })),

  setNewMessages: (updater) =>
    set((state) => ({
      newMessages:
        typeof updater === "function" ? updater(state.newMessages) : updater,
    })),

  setRepository: (updater) =>
    set((state) => ({
      repository:
        typeof updater === "function" ? updater(state.repository) : updater,
    })),

  setSelectedChatId: (selectedChatId) =>
    set((state) => ({
      ...state,
      selectedChatId,
    })),

  setChatLoading: (chatLoading) =>
    set((state) => ({
      ...state,
      chatLoading,
    })),

  setUser: (user) =>
    set((state) => ({
      ...state,
      user,
    })),

  setEditorOpened: (editorOpened) =>
    set((state) => ({
      ...state,
      editorOpened,
    })),
}));
