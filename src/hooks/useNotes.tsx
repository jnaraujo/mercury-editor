import { NoteAlreadyExistsError } from "@/errors/note-already-exists";
import { createNotesDirIfNotExists } from "@/lib/files";
import { slugify } from "@/lib/slugify";
import { notesStore } from "@/stores/notesStore";
import {
  BaseDirectory,
  exists,
  removeFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { useCallback, useEffect, useMemo } from "react";

export function useNotes() {
  const addNote = notesStore((state) => state.addNote);
  const removeNote = notesStore((state) => state.removeNote);

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
        path: fullPath,
        title: name,
        description: content.slice(0, 100),
        slug: slugify(name),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
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

  return useMemo(() => ({ createNote, deleteNote }), [createNote, deleteNote]);
}
