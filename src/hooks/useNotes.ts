import { NoteAlreadyExistsError } from "@/errors/note-already-exists";
import { NoteNotFoundError } from "@/errors/note-not-found";
import { randomUUID } from "@/lib/crypto";
import { useNotesStore } from "@/stores/notesStore";
import {
  exists,
  removeFile,
  renameFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { useCallback, useMemo } from "react";

export function useNotes() {
  const addNote = useNotesStore((state) => state.addNote);
  const updateNoteOnStore = useNotesStore((state) => state.updateNote);
  const removeNote = useNotesStore((state) => state.removeNote);
  const findNoteByPath = useNotesStore((state) => state.findNoteByPath);

  const createNote = useCallback(
    async (name: string, content: string = "") => {
      const documentDirPath = await documentDir();
      const fullPath = `${documentDirPath}\\notes\\${name}`;

      if ((await exists(fullPath)) || findNoteByPath(fullPath)) {
        throw new NoteAlreadyExistsError();
      }

      await writeTextFile(fullPath, content);

      addNote({
        id: randomUUID(),
        path: fullPath,
        title: name,
        description: content.slice(0, 100),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      return fullPath;
    },
    [addNote, findNoteByPath],
  );

  const deleteNote = useCallback(
    async (path: string) => {
      await removeFile(path);

      removeNote(path);
    },
    [removeNote],
  );

  const updateNote = useCallback(
    async (path: string, content: string) => {
      const note = findNoteByPath(path);
      if (!note) {
        throw new NoteNotFoundError();
      }

      await writeTextFile(path, content);

      const updatedNote = {
        ...note,
        updatedAt: Date.now(),
      };

      updateNoteOnStore(updatedNote.path, updatedNote);
    },
    [findNoteByPath, updateNoteOnStore],
  );

  const renameNote = useCallback(
    async (path: string, newName: string) => {
      const note = findNoteByPath(path);
      if (!note) {
        throw new NoteNotFoundError();
      }

      const newPath = path.replace(note.title, newName);

      if (newPath === path) return;

      if ((await exists(newPath)) || findNoteByPath(newPath)) {
        throw new NoteAlreadyExistsError();
      }

      renameFile(path, newPath);

      updateNoteOnStore(path, {
        ...note,
        path: newPath,
        title: newName,
        updatedAt: Date.now(),
      });
    },
    [findNoteByPath, updateNoteOnStore],
  );

  return useMemo(
    () => ({ createNote, deleteNote, updateNote, renameNote }),
    [createNote, deleteNote, updateNote, renameNote],
  );
}
