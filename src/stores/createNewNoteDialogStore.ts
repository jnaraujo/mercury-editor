import { create } from "zustand";

interface CreateNewNoteDialogStore {
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
}

export const useCreateNewNoteDialogStore = create<CreateNewNoteDialogStore>()(
  (set) => ({
    open: false,
    setOpen: (open) => {
      if (typeof open === "function") {
        return set((state) => ({ open: open(state.open) }));
      }

      return set({ open });
    },
  }),
);
