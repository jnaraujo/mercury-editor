import { BaseDirectory, createDir, exists } from "@tauri-apps/api/fs";

export async function createNotesDirIfNotExists() {
  const doesPathExists = await exists("notes", {
    dir: BaseDirectory.Document,
  });

  if (!doesPathExists) {
    await createDir("notes", {
      dir: BaseDirectory.Document,
    });
  }
}
