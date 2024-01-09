import { BaseDirectory, createDir, exists, readDir } from "@tauri-apps/api/fs";

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

export function normalizePath(path: string) {
  // remove multiple slashes
  path = path.replace(/\/+/g, "/");
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
