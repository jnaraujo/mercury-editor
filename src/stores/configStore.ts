import { createZustandStore } from "@/lib/store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const storage = createZustandStore(".config.dat");

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
