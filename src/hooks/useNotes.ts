import { NoteAlreadyExistsError } from "@/errors/note-already-exists";
import { NoteNotFoundError } from "@/errors/note-not-found";
import { randomUUID } from "@/lib/crypto";
import { createNotesDirIfNotExists } from "@/lib/files";
import { slugify } from "@/lib/slugify";
import { useNotesStore } from "@/stores/notesStore";
import {
  BaseDirectory,
  exists,
  removeFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { useCallback, useEffect, useMemo } from "react";

export function useNotes() {
  const addNote = useNotesStore((state) => state.addNote);
  const updateNoteOnStore = useNotesStore((state) => state.updateNote);
  const removeNote = useNotesStore((state) => state.removeNote);
  const findNoteByPath = useNotesStore((state) => state.findNoteByPath);

  useEffect(() => {
    createNotesDirIfNotExists();
  }, []);

  const createNote = useCallback(
    async (name: string, content: string = "") => {
      const path = `notes\\${slugify(name)}.md`;

      if (await exists(path, { dir: BaseDirectory.Document })) {
        throw new NoteAlreadyExistsError();
      }

      await writeTextFile(`notes\\${slugify(name)}.md`, content, {
        dir: BaseDirectory.Document,
      });

      const documentDirPath = await documentDir();

      const fullPath = `${documentDirPath}\\notes\\${slugify(name)}.md`;

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
    [addNote],
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

      updateNoteOnStore(updatedNote);
    },
    [findNoteByPath, updateNoteOnStore],
  );

  return useMemo(
    () => ({ createNote, deleteNote, updateNote }),
    [createNote, deleteNote, updateNote],
  );
}
