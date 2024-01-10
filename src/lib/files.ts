import { useNotesStore } from "@/stores/notesStore";
import { open } from "@tauri-apps/api/dialog";
import { BaseDirectory, createDir, exists, readDir } from "@tauri-apps/api/fs";
import { randomUUID } from "./crypto";

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

export async function getNotesFromDir() {
  const files = await readDir("notes", {
    dir: BaseDirectory.Document,
  });

  return files;
}

export async function addNotesFromDirIfNotExists() {
  const files = await getNotesFromDir();
  const addNotesIfNotExists = useNotesStore.getState().addNotesIfNotExists;

  addNotesIfNotExists(
    files.map((file) => ({
      id: randomUUID(),
      title: file.name || randomUUID(),
      path: file.path,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      description: "",
    })),
  );
}

export function normalizePath(path: string) {
  // remove multiple slashes
  path = path.replace(/\\+/g, "\\");
  // remove leading slash, will be added further
  if (path.startsWith("/")) path = path.substring(1);
  // remove trailing slash
  if (path.endsWith("/")) path = path.slice(0, -1);
  const segments = path.split("/");
  let normalizedPath = "/";
  for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
    if (segments[segmentIndex] === "." || segments[segmentIndex] === "") {
      // skip single dots and empty segments
      continue;
    }
    if (segments[segmentIndex] === "..") {
      // go up one level if possible
      normalizedPath = normalizedPath.substring(
        0,
        normalizedPath.lastIndexOf("/") + 1,
      );
      continue;
    }
    // append path segment
    if (!normalizedPath.endsWith("/")) normalizedPath = normalizedPath + "/";
    normalizedPath = normalizedPath + segments[segmentIndex];
  }
  return normalizedPath;
}

export function filenameFromPath(path: string) {
  return path.replace(/^.*[\\/]/, "");
}

export async function requestNotesFromDisk() {
  const selected = await open({
    multiple: true,
    filters: [
      {
        name: "Texto",
        extensions: ["txt", "md"],
      },
    ],
  });

  if (!selected || typeof selected === "string") return [];

  return selected;
}
