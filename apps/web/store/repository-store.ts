import { MessageResponse } from "@/app/types";
import { create } from "zustand";

interface MessageStore {
  newMessages: MessageResponse[];
  setNewMessages: (
    updater:
      | MessageResponse[]
      | ((prev: MessageResponse[]) => MessageResponse[])
  ) => void;
}

export const useNewMessagesStore = create<MessageStore>((set) => ({
  newMessages: [],

  setNewMessages: (updater) =>
    set((state) => ({
      newMessages:
        typeof updater === "function"
          ? updater(state.newMessages)
          : updater,
    })),
}));