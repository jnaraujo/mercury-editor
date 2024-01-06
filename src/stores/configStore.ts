import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ConfigStore {
  theme: "light" | "dark";
  setTheme: (
    theme: "light" | "dark" | ((theme: "light" | "dark") => "light" | "dark"),
  ) => void;
}

export const useConfigStore = create<ConfigStore>()(
  devtools(
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
      },
    ),
  ),
);
