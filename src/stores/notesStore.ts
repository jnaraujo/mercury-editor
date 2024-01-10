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
  updateNote: (path: string, note: Note) => void;
  addNotesIfNotExists: (notes: Note[]) => void;
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: [],
      addNote: (note) =>
        set((state) => ({
          notes: [...state.notes, note],
        })),
      removeNote: (path) =>
        set((state) => ({
          notes: state.notes.filter(
            (n) => normalizePath(n.path) !== normalizePath(path),
          ),
        })),
      findNoteByPath: (path) => {
        return get().notes.find(
          (n) => normalizePath(n.path) === normalizePath(path),
        );
      },
      updateNote: (path, note) => {
        get().removeNote(path);
        get().addNote(note);
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
