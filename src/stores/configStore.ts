import { createStore } from "@/lib/store";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";

const store = createStore(".config.dat");

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = (await store.get(name)) as string | null;
    return value;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await store.set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await store.delete(name);
  },
};

interface ConfigStore {
  theme: "light" | "dark";
  setTheme: (
    theme: "light" | "dark" | ((theme: "light" | "dark") => "light" | "dark"),
  ) => void;
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => {
        if (typeof theme === "function") {
          set((state) => ({ theme: theme(state.theme) }));
          return;
        }

        set({ theme });
      },
    }),
    {
      name: "config",
      storage: createJSONStorage(() => storage),
    },
  ),
);
