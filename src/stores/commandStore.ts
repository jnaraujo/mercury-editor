import { create } from "zustand";

interface CommandStore {
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
}

export const useCommandStore = create<CommandStore>()((set) => ({
  open: false,
  setOpen: (open) => {
    if (typeof open === "function") {
      set((state) => ({ open: open(state.open) }));
      return;
    }

    set({ open });
  },
}));
