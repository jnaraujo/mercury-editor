import { Note } from "@/@types/note";
import { NoteAlreadyExistsError } from "@/errors/note-already-exists";
import { NoteNotFoundError } from "@/errors/note-not-found";
import { useNotesStore } from "@/stores/notesStore";
import {
  exists,
  removeFile,
  renameFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { randomUUID } from "./crypto";

export function findNoteByPath(path: string) {
  return useNotesStore.getState().findNoteByPath(path);
}

export function addNote(note: Note) {
  return useNotesStore.getState().addNote(note);
}

export function getNotes() {
  return useNotesStore.getState().notes;
}

export function addNotesIfNotExists(notes: Note[]) {
  return useNotesStore.getState().addNotesIfNotExists(notes);
}

export async function updateNoteFile(path: string, content: string) {
  const note = findNoteByPath(path);
  if (!note) {
    throw new NoteNotFoundError();
  }

  return await writeTextFile(path, content);
}

export function updateNote(path: string, note: Note) {
  return useNotesStore.getState().updateNote(path, note);
}

export async function createNote(name: string, content: string = "") {
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
}

export async function deleteNoteFile(path: string) {
  return await removeFile(path);
}

export async function removeNote(path: string) {
  useNotesStore.getState().removeNote(path);
}

export async function deleteFileAndNote(path: string) {
  removeNote(path);
  await await removeFile(path);
}

export async function renameNoteFile(oldPath: string, newName: string) {
  const note = findNoteByPath(oldPath);
  if (!note) {
    throw new NoteNotFoundError();
  }

  const newPath = oldPath.replace(note.title, newName);

  if (newPath === oldPath) return;

  const fileExists = await exists(newPath);
  if (fileExists || findNoteByPath(newPath)) {
    throw new NoteAlreadyExistsError();
  }

  renameFile(oldPath, newPath);

  updateNote(oldPath, {
    ...note,
    path: newPath,
    title: newName,
    updatedAt: Date.now(),
  });
}
