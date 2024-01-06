import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ConfigStore {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const useConfigStore = create<ConfigStore>()(
  devtools(
    persist(
      (set) => ({
        theme: "dark",
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: "config",
      },
    ),
  ),
);
