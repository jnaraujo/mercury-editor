import { Note } from "@/@types/note";
import { normalizePath } from "@/lib/files";
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
        return get().notes.find((n) => {
          console.log(normalizePath(n.path), normalizePath(path));

          return normalizePath(n.path) === normalizePath(path);
        });
      },
      updateNote: (newNote) => {
        get().removeNote(newNote.path);
        get().addNote(newNote);
      },
    }),
    {
      version: 1,
      name: "notes-store",
      storage: createJSONStorage(() => storage),
    },
  ),
);
