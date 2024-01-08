import { initialContent } from "@/constants/initialContent";
import { createNotesDirIfNotExists } from "@/lib/files";
import { slugify } from "@/lib/slugify";
import { notesStore } from "@/stores/notesStore";
import { BaseDirectory, exists, writeTextFile } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { useEffect } from "react";

export default function useNote() {
  const addNote = notesStore((state) => state.addNote);

  useEffect(() => {
    createNotesDirIfNotExists();
  }, []);

  async function createNote(name: string) {
    const path = `notes\\${slugify(name)}.md`;

    if (await exists(path, { dir: BaseDirectory.Document })) {
      throw new Error("Note already exists");
    }

    await writeTextFile(`notes\\${slugify(name)}.md`, initialContent, {
      dir: BaseDirectory.Document,
    });

    const documentDirPath = await documentDir();

    const fullPath = `${documentDirPath}\\notes\\${slugify(name)}.md`;

    addNote({
      path: fullPath,
      title: name,
      description: "",
      slug: slugify(name),
      createdAt: new Date().toLocaleDateString(),
    });
  }

  return { createNote };
}
