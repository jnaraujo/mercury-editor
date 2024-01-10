import { Note } from "@/@types/note";
import { createZustandStore } from "@/lib/store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const storage = createZustandStore(".notes.dat");

interface NotesStore {
  notes: Note[];
  addNote: (note: Note) => void;
  removeNote: (path: string) => void;
  findNoteByPath: (path: string) => Note | undefined;
  updateNote: (note: Note) => void;
  addNotesIfNotExists: (notes: Note[]) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: [],
      addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      removeNote: (path) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.path !== path),
        })),
      findNoteByPath: (path) => {
        return get().notes.find((n) => n.path === path);
      },
      updateNote: (newNote) => {
        get().removeNote(newNote.path);
        get().addNote(newNote);
      },
      addNotesIfNotExists: (notes) => {
        notes.forEach((note) => {
          if (get().findNoteByPath(note.path)) return;
          get().addNote(note);
        });
      },
    }),
    {
      version: 1,
      name: "notes-store",
      storage: createJSONStorage(() => storage),
    },
  ),
);
